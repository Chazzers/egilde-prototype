function replaceWhitespaceAndSlashWithHyphen(array, property, storeProperty) {
	if(property) {
		return array.map(item => 
			item[storeProperty] = cleanUp(item[property]))
	}
	return array.map(item => cleanUp(item))
}


function cleanUp(st) {
	return st
	   .replace(/[^a-z0-9]+/gi, '-')
	   .replace(/^-+/, '')
	   .replace(/-+$/, '')
	   .toLowerCase()
}

module.exports = replaceWhitespaceAndSlashWithHyphen