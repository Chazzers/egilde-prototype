const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
	slug: String,
	visited: Number
}, {
	timestamps: true
})

module.exports = mongoose.model('Page', pageSchema)