function replaceWhitespaceAndSlashWithHyphen(array, property, storeProperty) {
	if(property) {
		return array.map(item => 
			item[storeProperty] = item[property]
				.replace(/(\s\/\s)|(\/\s)|(\s\-\s)|\s+|[,\/]/g, "-")
				.toLowerCase())
	}
	return array.map(item => item.replace(/(\s\/\s)|(\/\s)|(\s\-\s)|\s+|[,\/]/g, "-").toLowerCase())
}

module.exports = replaceWhitespaceAndSlashWithHyphen