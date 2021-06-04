// Selectors
const next = document.getElementById('next')
const omahaDomeinInput = document.querySelectorAll('.omaha-domein-input')
const omahaFieldsets = document.querySelectorAll('.omaha-form fieldset')
const omahaSubmit = document.getElementById('omaha-submit')
const ehealthItems = document.querySelectorAll('.ehealth-item')
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
