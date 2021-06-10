const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')

async function renderLandingPage(req, res) {
	// create contentful client with keys
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

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

	// create new slugs for data-id
	const transformedEntries = recentlyVisited.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	// render landingspage
	res.render('landing-page', {
		items: transformedEntries,
		index: false
	})
}

module.exports = renderLandingPage