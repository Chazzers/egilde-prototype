// Selectors
const next = document.getElementById('next')
const omahaDomeinInput = document.querySelectorAll('.omaha-domein-input')
const omahaFieldsets = document.querySelectorAll('.omaha-form fieldset')
const omahaSubmit = document.getElementById('omaha-submit')
const ehealthItems = document.querySelectorAll('.ehealth-item')
const zoekForm = document.getElementById('zoek-form')
const search = document.getElementById('search')
// Spread operator, can be used to transform a node list to an array, this way you can use all the array methods like: array.filter, array.map, array.forEach etc.
if(next) {
	const omahaDomeinInputArray = [...omahaDomeinInput]

	function filterChecked(array) {
		return array.filter(item => item.checked)
	}
	
	function nextToDomainTags() {
		const checkedOmahaDomeinInput = filterChecked(omahaDomeinInputArray)
		if(checkedOmahaDomeinInput[0]) {
			const inputValue = checkedOmahaDomeinInput[0].value
			const currentFieldset = [...omahaFieldsets].filter(fieldset => fieldset.dataset.id === inputValue)[0]
			const domeinFieldset = [...omahaFieldsets].filter(fieldset => fieldset.dataset.id === 'domein')[0]
			domeinFieldset.style.display = 'none'
			currentFieldset.style.display = 'block'
			next.style.display = 'none'
			omahaSubmit.style.display = 'block'
		}
		
		return
	}
	next.addEventListener('click', nextToDomainTags)
}

function filterEHealthToepassing() {
	if(window.location.search) {
		const searchParams = new URLSearchParams(window.location.search.split('?')[1])
		const entries = searchParams.entries()
		const params = {}
		for(let entry of entries) {
			params[entry[0]] = entry[1]
		}
		const eHealthItemsArray = [...ehealthItems]
	
		const hideEhealthItems = eHealthItemsArray.filter(item => !item.dataset.id.split(',').includes(params.domeinTags))
	
		eHealthItemsArray.forEach(item => item.classList.remove('hide-ehealth'))
		hideEhealthItems.forEach(item => item.classList.add('hide-ehealth'))
	}
}
if(ehealthItems) {
	filterEHealthToepassing()
}
if(zoekForm) {
	zoekForm.addEventListener('submit', async (event) => {
		event.preventDefault()

		const eHealthItemsArray = [...ehealthItems]
		const searchValue = cleanUp(search.value).toLowerCase()
		const titles = eHealthItemsArray.map(item => item.dataset.title)
		const tags = eHealthItemsArray.map(item => item.dataset.id.split(','))

		console.log(tags)

		if(titles.includes(searchValue)) {
			eHealthItemsArray.forEach(item => item.classList.remove('hide-ehealth'))
			const filteredItems = filterOnTitle(eHealthItemsArray, searchValue)
			filteredItems.forEach(item => item.classList.add('hide-ehealth'))
		} else {
			eHealthItemsArray.forEach(item => item.classList.remove('hide-ehealth'))
			eHealthItemsArray.forEach(item => item.classList.add('hide-ehealth'))
		}
		tags.forEach(tag => {
			if(tag.includes(searchValue)) {
				eHealthItemsArray.forEach(item => item.classList.remove('hide-ehealth'))
				const filteredItems = filterOnTag(eHealthItemsArray, searchValue)
				filteredItems.forEach(item => item.classList.add('hide-ehealth'))
			}
		})
	})
}

function filterOnTitle(array, filterValue) {
	return array.filter(item => item.dataset.title !== filterValue)
}

function filterOnTag(array, filterValue) {
	return array.filter(item => !item.dataset.id.split(',').includes(filterValue))
}

function replaceWhitespaceAndSlashWithHyphen(array, property, storeProperty) {
	if(property) {
		return array.map(item => 
			item[storeProperty] = item[property]
				.replace(/(\s\/\s)|(\/\s)|(\s\-\s)|\s+|[,\/]/g, "-")
				.toLowerCase())
	}
	return array.map(item => item.replace(/(\s\/\s)|(\/\s)|(\s\-\s)|\s+|[,\/]/g, "-").toLowerCase())
}

function cleanUp(st) {
	return st.
	   replace(/[^a-z0-9]+/gi, '-').
	   replace(/^-+/, '').
	   replace(/-+$/, '');
  }
  

function filterAllTagsNecessary(array) {
	const checkedArray = allFilterCheckboxesArray.filter(item => item.checked)
	const checkedValueArray = checkedArray.map(item => item.value)
	return array.filter(item => {
		const itemValues = item.dataset.id.split(',')
		const newCheckedValueArray = checkedValueArray.map(value => itemValues.includes(value))
		return newCheckedValueArray.includes(false)
	})
}