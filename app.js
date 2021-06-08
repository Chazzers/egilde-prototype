const express = require('express')
const app = express()
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const port = process.env.PORT || 3000

const renderIndex = require('./src/controllers/renderIndex')
const renderOmahaFilter = require('./src/controllers/renderOmahaFilter')
const postOmahaFilterForm = require('./src/controllers/postOmahaFilterForm')
const renderDomeinTagFilter = require('./src/controllers/renderDomeinTagFilter')
const renderProductDetails = require('./src/controllers/renderProductDetails')
const renderSearchPage = require('./src/controllers/renderSearchPage')
const renderVergelijken = require('./src/controllers/renderVergelijken')

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
					expires: new Date(Date.now() + 900000),
					overwrite: true
				})
			}
		next()
	})
	
	.get('/', renderIndex)
	.get('/omaha-filter', renderOmahaFilter)
	.get('/omaha-filter/:domein', renderDomeinTagFilter)
	.get('/products/:product', renderProductDetails)
	.get('/zoek', renderSearchPage)
	.get('/vergelijken', renderVergelijken)

	.post('/omaha-domein', postOmahaFilterForm)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})