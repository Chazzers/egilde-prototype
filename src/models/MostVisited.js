const mongoose = require('mongoose')

const mostVisitedSchema = new mongoose.Schema({
	pages: Array
}, {
	timestamps: true
})

module.exports = mongoose.model('MostVisited', mostVisitedSchema)