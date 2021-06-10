const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString
const Page = require('../../models/Page')

async function renderProductDetails(req, res){
	// get product slug from url
    const { product } = req.params
	
	// try to find this slug in database
	const currentDetailPage = await Page.findOne({
		slug: product
	})

	// if current page exists update visited else create a new database entry with the slug and set visited to 1
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
	
	// check if req.cookies.recent_bekeken exists
	if(req.cookies.recent_bekeken) {
		// check if the cookie doesn't include the current slug,
		if(!req.cookies.recent_bekeken.includes(product)) {
			// add the slug at the front of the array for most recent visit
			req.cookies.recent_bekeken.unshift(product)
		}
		if(req.cookies.recent_bekeken.length > 5) {
			req.cookies.recent_bekeken.pop()
		}
		// update the cookie, add overwrite true to make it so the cookie can be updated
		res.cookie('recent_bekeken', req.cookies.recent_bekeken, { 
			expires: new Date(Date.now() + 864000000),
			overwrite: true
		})
	}

	// create contentful client with keys
    const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
    })

	// get current entry
    const entries =  await client.getEntries({
        content_type: "eHealthToepassing",
        "fields.slug[in]": product
    })

	// get entries.items which is one item since the fetch is already filtering most of the items
    const { items } = entries;
	// The only item in the entries
    const currentEntry = items[0];
	
	// For in loop to create an HTML string from the object of a rich text field in contentful
	for(property in currentEntry.fields) {
		if(currentEntry.fields[property].nodeType === 'document') {
			currentEntry.fields[property] = documentToHtmlString(currentEntry.fields[property])
		} else if(currentEntry.fields[property].sys) {
			if(currentEntry.fields[property].sys.type === 'Asset') {
				currentEntry.fields[property] = currentEntry.fields[property].fields.file.url
			}
		}
	}

	// render the page
    res.render('product-details', {
		item: currentEntry.fields,
		page: 'product-detail'
	})
}

module.exports = renderProductDetails