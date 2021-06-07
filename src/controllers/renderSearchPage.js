const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString

async function renderSearchPage(req, res){
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const entries =  await client.getEntries()

	const { items } = entries

	res.render('zoek', {
		items: items
	})
}

module.exports = renderSearchPage