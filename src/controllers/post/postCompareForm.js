function postCompareForm(req, res) {
	const { compare } = req.body

	const compareUrlString = compare.join('/')

	console.log(compareUrlString)

	const url = `/vergelijken/${compareUrlString}`

	res.redirect(url)

	res.end()
}

module.exports = postCompareForm