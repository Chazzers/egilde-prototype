function postOmahaFilterForm(req, res) {
	console.log(req.body)
	const { domeinTags } = req.body

	const searchParams = new URLSearchParams({
		domeinTags: domeinTags,
	})

	const url = `/?${searchParams}`

	res.redirect(url)
	res.end()
}

module.exports = postOmahaFilterForm