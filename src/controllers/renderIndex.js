const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('./helpers/replaceWhitespaceAndSlashWithHyphen')

async function renderIndex(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const entries =  await client.getEntries()

	const { items } = entries

	const transformedEntries = items.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	res.render('index', {
		items: transformedEntries
	})
}

module.exports = renderIndex