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
        content_type:"eHealthToepassing",
        "fields.slug[in]":product
    })

    const { items } = entries;
    const currentEntry = items[0];
	
	for(property in currentEntry.fields) {
		currentEntry.fields[property] = documentToHtmlString(currentEntry.fields[property])
	}
    
    res.render('product-details', {
		item: currentEntry
	})
}

module.exports = renderProductDetails