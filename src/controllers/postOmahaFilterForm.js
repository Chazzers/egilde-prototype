function postOmahaFilterForm(req, res) {
	const { domeinTags } = req.body

	const searchParams = new URLSearchParams({
		domeinTags: domeinTags,
	})

	const url = `/?${searchParams}`

	res.redirect(url)
	res.end()
}

module.exports = postOmahaFilterForm