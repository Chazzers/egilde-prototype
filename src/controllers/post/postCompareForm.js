function postCompareForm(req, res) {
	const { compare } = req.body

	console.log(compare)

	res.end()
}

module.exports = postCompareForm