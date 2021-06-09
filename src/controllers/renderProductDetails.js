const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString
const Page = require('../models/Page')

async function renderProductDetails(req, res){
    const { product } = req.params
	
	const currentDetailPage = await Page.findOne({
		slug: product
	})

	if(currentDetailPage) {
		let { visited } = currentDetailPage
		visited++
		await currentDetailPage.updateOne({ 
			visited: visited
		})
	} else {
		const newPage = new Page({
			slug: product,
			visited: 1
		})
		Page.create(newPage)
	}

	if(req.cookies.recent_bekeken) {
		if(!req.cookies.recent_bekeken.includes(product)) {
			req.cookies.recent_bekeken.unshift(product)
		}
		if(req.cookies.recent_bekeken.length > 5) {
			req.cookies.recent_bekeken.pop()
		}
		res.cookie('recent_bekeken', req.cookies.recent_bekeken, { 
			expires: new Date(Date.now() + 864000000),
			overwrite: true
		})
	}
	
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