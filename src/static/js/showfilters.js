const fieldset = document.querySelector("fieldset")
const text = document.getElementById("text")
const button  = document.getElementById("filterButton")
const allFormContainers = document.querySelectorAll('.indexPage form .container')
const allFormContainersArray = [...allFormContainers]
const ehealthItems = document.querySelectorAll('.ehealth-item')
const ehealthItemsArray = [...ehealthItems]
const allFilterCheckboxes = document.querySelectorAll('.filter-checkbox')
const allFilterCheckboxesArray = [...allFilterCheckboxes]
const filters = document.querySelectorAll(".hide")
const buttonshow  = document.querySelectorAll(".showmorebutton")
const buttonshowArray  = [...buttonshow]

button.addEventListener("click", function(){
    fieldset.classList.toggle("showclass")
})

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