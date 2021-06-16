const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString

async function renderCompareItems(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const { item_1, item_2 } = req.params

	// get current entry
    const entries = await client.getEntries()

	const { items } = entries

	const compareItems = items.filter(item => item.fields.slug === item_1 || item.fields.slug === item_2)
	
	// For in loop to create an HTML string from the object of a rich text field in contentful
	compareItems.forEach(item => {
		for(property in item.fields) {
			if(item.fields[property].nodeType === 'document') {
				item.fields[property] = documentToHtmlString(item.fields[property])
			} else if(item.fields[property].sys) {
				if(item.fields[property].sys.type === 'Asset') {
					item.fields[property] = item.fields[property].fields.file.url
				}
			}
		}
	})

	res.render('compare-items', {
		title: "Vergelijk items",
		items: compareItems,
		page: false
	})
}

module.exports = renderCompareItems