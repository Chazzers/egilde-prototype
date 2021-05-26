const contentful = require('contentful')

async function renderIndex(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	// 
	const entries =  await client.getEntries()
		.then((response) => response.items)

		console.log(entries[0].fields.afbeelding.fields.file.url)

	res.render('index', {
		items: entries
	})
}

module.exports = renderIndex