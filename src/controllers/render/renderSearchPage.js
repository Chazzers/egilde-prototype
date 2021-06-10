const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')

async function renderSearchPage(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const cookies = req.cookies.recent_bekeken

	const entries =  await client.getEntries()

	const { items } = entries

	const recentlyVisited = cookies ? items.filter(item => cookies.includes(item.fields.slug)) : items

	const recentEntries = recentlyVisited.map(item => {
		item.fields.newTags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	const allEntries = items.map(item => {
		item.fields.newTags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	const allTags = cleanTags(items)

	res.render('search', {
		recentItems: recentEntries,
		allItems: allEntries,
		allTags: allTags,
		page: 'zoeken'
	})
}

function cleanTags(array) {
	const tagArray = array.map(item => item.fields.tags)
	const deNestedTagArray = [].concat.apply([], tagArray)
	return [...new Set(deNestedTagArray)]
}

module.exports = renderSearchPage
