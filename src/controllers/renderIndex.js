const contentful = require('contentful')

async function renderIndex(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const entries =  await client.getEntries({
		content_type: 'blog'
	})
		.then((response) => response.items)

	const { text } = entries[0].fields
	res.render('index', {
		title: text
	})
}

module.exports = renderIndex