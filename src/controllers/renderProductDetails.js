const contentful = require('contentful')

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
    console.log(currentEntry.fields.beschrijving)

    currentEntry.fields.beschrijving.content.forEach(element => {
        console.log(element.content)
    });
    
    res.render('product-details', {
		item: currentEntry
	})
}

module.exports = renderProductDetails