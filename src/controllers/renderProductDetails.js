const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString

async function renderProductDetails(req, res){
    const { product } = req.params
    const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
    })

    const entries =  await client.getEntries({
        content_type: "eHealthToepassing",
        "fields.slug[in]": product
    })

    const { items } = entries;
    const currentEntry = items[0];
	
	for(property in currentEntry.fields) {
		if(currentEntry.fields[property].nodeType === 'document') {
			currentEntry.fields[property] = documentToHtmlString(currentEntry.fields[property])
		} else if(currentEntry.fields[property].sys) {
			if(currentEntry.fields[property].sys.type === 'Asset') {
				currentEntry.fields[property] = currentEntry.fields[property].fields.file.url
			}
		}
	}

    res.render('product-details', {
		item: currentEntry.fields
	})
}

module.exports = renderProductDetails