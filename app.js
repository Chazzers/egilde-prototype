const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000

const renderIndex = require('./src/controllers/renderIndex')
const renderOmahaFilter = require('./src/controllers/renderOmahaFilter')
const postOmahaFilterForm = require('./src/controllers/postOmahaFilterForm')
const renderDomeinTagFilter = require('./src/controllers/renderDomeinTagFilter')
const renderProductDetails = require('./src/controllers/renderProductDetails')

app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())
	
	.get('/', renderIndex)
	.get('/omaha-filter', renderOmahaFilter)
	.get('/omaha-filter/:domein', renderDomeinTagFilter)
	.get('/products/:product', renderProductDetails)

	.post('/omaha-domein', postOmahaFilterForm)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})