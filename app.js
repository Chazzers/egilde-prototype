const express = require('express')
const app = express()
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const port = process.env.PORT || 3000

const renderProducts = require('./src/controllers/render/renderProducts')
const renderOmahaFilter = require('./src/controllers/render/renderOmahaFilter')
const postOmahaFilterForm = require('./src/controllers/post/postOmahaFilterForm')
const renderDomainTagFilter = require('./src/controllers/render/renderDomainTagFilter')
const renderProductDetails = require('./src/controllers/render/renderProductDetails')
const renderSearchPage = require('./src/controllers/render/renderSearchPage')
const renderIndex = require('./src/controllers/render/renderIndex')
const renderCompare = require('./src/controllers/render/renderCompare')
const renderCompareItems = require('./src/controllers/render/renderCompareItems')
const postCompareForm = require('./src/controllers/post/postCompareForm')

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	dbName: 'egilde'
})
	.catch(error => console.error(error))

app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(cookieParser())
	.use(sassMiddleware({ 
		src: path.join(__dirname, './src'), 
		dest: path.join(__dirname, './src/static')
	}))
	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())
	.use((req, res, next) => {
		if(!req.cookies.recent_bekeken) {
			res.cookie('recent_bekeken', [],
				// cookie options
				{ 
					expires: new Date(Date.now() + 864000000),
					overwrite: true
				})
			}
		next()
	})
	
	.get('/producten', renderProducts)
	.get('/omaha-filter', renderOmahaFilter)
	.get('/omaha-filter/:domein', renderDomainTagFilter)
	.get('/producten/:product', renderProductDetails)
	.get('/zoeken', renderSearchPage)
	.get('/', renderIndex)
	.get('/vergelijken', renderCompare)
	.get('/vergelijken/:item_1/:item_2', renderCompareItems)

	.post('/omaha-domein', postOmahaFilterForm)
	.post('/vergelijken', postCompareForm)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})