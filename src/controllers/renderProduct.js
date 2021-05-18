const contentful = require('contentful')

async function renderProduct(req, res) {
	const { id } = req.params
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	// 
	const entries =  await client.getEntries()
		.then((response) => response.items)

		console.log(entries)

	const { text } = entries[0].fields

	res.render('index', {
		title: text
	})
}

module.exports = renderProduct