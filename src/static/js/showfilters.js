const formDomeinFilters = document.getElementById("form-domein-filters")
const closeBtn = document.getElementById("close-btn")
const text = document.getElementById("text")
const filterButton  = document.getElementById("filterButton")
const allFormContainers = document.querySelectorAll('.indexPage form .container')
const allFormContainersArray = [...allFormContainers]
const ehealthItems = document.querySelectorAll('.ehealth-item')
const ehealthItemsArray = [...ehealthItems]
const allFilterCheckboxes = document.querySelectorAll('.filter-checkbox')
const allFilterCheckboxesArray = [...allFilterCheckboxes]
const filters = document.querySelectorAll(".hide")
const buttonshow  = document.querySelectorAll(".showmorebutton")
const buttonshowArray  = [...buttonshow]
const errorMsg = document.querySelector('.error-msg')
const ehealthItemsOverview = document.getElementById('ehealth-items-overview')
const ehealthItemsFirstAnchor = document.querySelector('.ehealthitemscontainer a')


if(filterButton) {
	filterButton.addEventListener("click", function(){
		formDomeinFilters.classList.add('showclass')
		document.body.classList.add('noscroll')
	})
	closeBtn.addEventListener('click', () => {
		formDomeinFilters.classList.remove('showclass')
		document.body.classList.remove('noscroll')
	})
}

if(buttonshowArray) {
	buttonshowArray.forEach(item => item.addEventListener('click', () => {
		filters[item.dataset.id].classList.toggle('showmore')
		if(filters[item.dataset.id].classList.contains('showmore')) {
			buttonshow[item.dataset.id].innerHTML = 'Toon minder'
		} else {
			buttonshow[item.dataset.id].innerHTML = 'Toon meer'
		}
	}))
}

if(allFilterCheckboxes) {
	allFilterCheckboxesArray.forEach(item => item.addEventListener('click', () => {
		ehealthItemsArray.forEach(item => item.classList.remove('hide-ehealth'))
		const hideEhealthItems = filterAllTagsNecessary(ehealthItemsArray)
		hideEhealthItems.forEach(item => item.classList.add('hide-ehealth'))

		const errorMsg = document.querySelector('.error-msg')
		
		if(hideEhealthItems.length === ehealthItemsArray.length && !errorMsg) {
			const errorDiv = document.createElement('div')
			const errorParagraph = document.createElement('p')
			errorParagraph.innerHTML = 'Met uw huidige filters kunnen geen e-Health toepassingen gevonden worden'
			errorDiv.appendChild(errorParagraph)
			errorDiv.classList.add('error-msg')
			ehealthItemsOverview.insertBefore(errorDiv, ehealthItemsFirstAnchor)
		} else if(hideEhealthItems.length !== ehealthItemsArray.length && errorMsg) {
			ehealthItemsOverview.removeChild(errorMsg)
		}
	}))
}

function filterOneTagIncluded(array) {
	const checkedArray = allFilterCheckboxesArray.filter(item => item.checked)
	const checkedValueArray = checkedArray.map(item => item.value)
	return array.filter(item => {
		const itemValues = item.dataset.id.split(',')
		const newCheckedValueArray = checkedValueArray.map(value => itemValues.includes(value))
		if(newCheckedValueArray.length) {
			return newCheckedValueArray.includes(true) ? false : true
		}
		return false
	})
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