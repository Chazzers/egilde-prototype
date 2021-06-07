const express = require('express')
const app = express()
const sassMiddleware = require('node-sass-middleware')
const path = require('path')

require('dotenv').config()

const port = process.env.PORT || 3000

const renderIndex = require('./src/controllers/renderIndex')
const renderOmahaFilter = require('./src/controllers/renderOmahaFilter')
const postOmahaFilterForm = require('./src/controllers/postOmahaFilterForm')
const renderDomeinTagFilter = require('./src/controllers/renderDomeinTagFilter')
const renderProductDetails = require('./src/controllers/renderProductDetails')
const renderSearchPage = require('./src/controllers/renderSearchPage')

app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(sassMiddleware({ 
		src: path.join(__dirname, './src'), 
		dest: path.join(__dirname, './src/static')
	}))
	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())
	
	.get('/', renderIndex)
	.get('/omaha-filter', renderOmahaFilter)
	.get('/omaha-filter/:domein', renderDomeinTagFilter)
	.get('/products/:product', renderProductDetails)
	.get('/zoek', renderSearchPage)

	.post('/omaha-domein', postOmahaFilterForm)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})