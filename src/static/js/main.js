// Selectors
const next = document.getElementById('next')
const omahaDomeinInput = document.querySelectorAll('.omaha-domein-input')
const omahaFieldsets = document.querySelectorAll('.omaha-form fieldset')
const omahaSubmit = document.getElementById('omaha-submit')
const ehealthItems = document.querySelectorAll('.ehealthitemscontainer .ehealth-item')
const zoekForm = document.getElementById('zoek-form')
const searchInput = document.getElementById('search-choice')
const searchDatalist = document.getElementById('search')
const vergelijkBtn = document.getElementById('vergelijk-btn')
const compareContainer = document.getElementById('ehealth-items-compare')
const ehealthContainer = document.getElementById('ehealth-items-overview')
const vergelijkSubmit = document.getElementById('vergelijk-submit')
const vergelijkCheckboxes = document.querySelectorAll('.vergelijken-checkbox')
const vergelijkCheckboxesLabel = document.querySelectorAll('.vergelijken-label')
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
		const searchValue = cleanUp(searchInput.value).toLowerCase()
		const titles = eHealthItemsArray.map(item => item.dataset.title)
		const tags = eHealthItemsArray.map(item => item.dataset.id.split(','))

		console.log(searchValue)

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

if(vergelijkBtn) {
	vergelijkBtn.addEventListener('click',() => {
		compareContainer.classList.toggle('hide-container')
		ehealthContainer.classList.toggle('hide-container')
	})
}

if(vergelijkCheckboxes) {
	const vergelijkCheckboxesArray = [...vergelijkCheckboxes]
	const vergelijkCheckboxesLabelArray = [...vergelijkCheckboxesLabel]
	const vergelijkSubmitBtn = document.createElement('button')
	vergelijkSubmitBtn.classList.add('vergelijken-submit')
	vergelijkSubmitBtn.classList.add('active')
	vergelijkSubmitBtn.type = 'submit'
	vergelijkSubmitBtn.innerHTML = 'Vergelijken'
	vergelijkSubmitBtn.id = 'vergelijk-submit'
	const vergelijkSubmitDiv = document.createElement('div')
	vergelijkSubmitDiv.classList.add('vergelijken-submit')
	vergelijkSubmitDiv.innerHTML = 'Vergelijken'
	vergelijkSubmitDiv.id = 'vergelijk-submit'
	

	vergelijkCheckboxesArray.forEach(checkbox => checkbox.addEventListener('click', () => {
		const checkedCheckboxes = vergelijkCheckboxesArray.filter(checkbox => checkbox.checked)

		const unCheckedCheckboxes = vergelijkCheckboxesArray.filter(checkbox => !checkbox.checked)

		const checkedCheckboxesLength = checkedCheckboxes.length

		if(checkedCheckboxesLength === 2) {
			const vergelijkSubmitContainer = document.getElementById('vergelijk-submit')
			vergelijkSubmitContainer.parentNode.replaceChild(vergelijkSubmitBtn, vergelijkSubmitContainer)
			unCheckedCheckboxes.forEach(checkbox => checkbox.classList.add('inactive-checkbox'))
		} else if(checkedCheckboxesLength < 2) {
			const vergelijkSubmitContainer = document.getElementById('vergelijk-submit')
			vergelijkSubmitContainer.parentNode.replaceChild(vergelijkSubmitDiv, vergelijkSubmitContainer)
			unCheckedCheckboxes.forEach(checkbox => checkbox.classList.remove('inactive-checkbox'))
		} 
	}))
}

function filterOnTitle(array, filterValue) {
	return array.filter(item => item.dataset.title !== filterValue)
}

function filterOnTag(array, filterValue) {
	return array.filter(item => !item.dataset.id.split(',').includes(filterValue))
}

function cleanUp(st) {
	return st
	   .replace(/[^a-z0-9]+/gi, '-')
	   .replace(/^-+/, '')
	   .replace(/-+$/, '')
	   .toLowerCase()
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