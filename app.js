const express = require('express')
const app = express()
const fetch = require('node-fetch')

require('dotenv').config()

const port = process.env.PORT || 3000

const renderIndex = require('./src/controllers/renderIndex')
const renderOmahaFilter = require('./src/controllers/renderOmahaFilter')
const renderProduct = require('./src/controllers/renderProduct')
const postOmahaFilterForm = require('./src/controllers/postOmahaFilterForm')

app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())
	
	.get('/', renderIndex)
	.get('/product/:id', renderProduct)
	.get('/omaha-filter', renderOmahaFilter)

	.post('/omaha-form', postOmahaFilterForm)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})