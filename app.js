const express = require('express')
const app = express()
const fetch = require('node-fetch')

require('dotenv').config()

const port = process.env.PORT || 3000

const renderIndex = require('./src/controllers/renderIndex')

app
	.set('view engine', 'ejs')
	.set('views', './src/views')

	.use(express.static('src/static'))
	.use(express.urlencoded({
		extended: true 
	}))
	.use(express.json())
	
	.get('/', renderIndex)

	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})