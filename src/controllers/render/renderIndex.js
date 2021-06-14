const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')
const Page = require('../../models/Page')

async function renderIndex(req, res) {
	// create contentful client with keys
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const pages = await Page.find({})

	// get recently visited cookies
	const cookies = req.cookies.recent_bekeken

	// get entries
	const entries =  await client.getEntries()

	// get items of entries
	const { items } = entries

	// store items of entries in variable
	let recentlyVisited = items

	// filter items if recently visited cookies exist
	if(cookies) {
		recentlyVisited = items.filter(item => cookies.includes(item.fields.slug))
	}
	const visitedPagesSlugs = pages.map(page => page.slug)
	const visitedEntries = items.filter(item => visitedPagesSlugs.includes(item.fields.slug))
	const transformedVisitedEntries = visitedEntries.map(entry => {
		pages.forEach(item => {
			if(item.slug === entry.fields.slug) {
				entry.fields.visited = item.visited
			}
		})
		return entry
	})

	const fiveMostvisitedEntries = transformedVisitedEntries.sort((a, b) => b.fields.visited - a.fields.visited).slice(0, 5)

	// create new slugs for data-id
	const transformedEntries = recentlyVisited.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	const fiveMostvisitedEntriesTransformed = fiveMostvisitedEntries.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	// render landingspage
	res.render('index', {
		items: transformedEntries,
		page: 'landing-page',
		mostVisited: fiveMostvisitedEntriesTransformed
	})
}

module.exports = renderIndex