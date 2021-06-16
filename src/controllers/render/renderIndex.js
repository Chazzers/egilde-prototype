const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')
const Page = require('../../models/Page')

const filteredData = [
	{
		domein: 'Fysiologisch',
		id: 'fysiologisch',
		color: 'dark-purple',
		domeinTags: [
			{
				tag:'Ademhaling',
				tagId: 'ademhaling'
			},
			{
				tag:'Besmettelijke / infectieuze conditie',
				tagId: 'besmettelijk'
			},
			{
				tag:'Bewustzijn',
				tagId: 'bewustzijn'
			},
			{
				tag:'Circulatie',
				tagId: 'circulatie'
			},
			{
				tag:'Cognitie',
				tagId: 'cognitie'
			},
			{
				tag:'Darmfunctie',
				tagId: 'darmfunctie'
			},
			{
				tag:'Gehoor',
				tagId: 'gehoor'
			},
			{
				tag:'Geslachtsorganen', 
				tagId: 'geslachtsorganen'
			},
			{
				tag:'Huid', 
				tagId: 'huid'
			},
			{
				tag:'Mondgezondheid', 
				tagId: 'mondgezondheid'
			},
			{
				tag:'Neuro/ musculaire/ skelet-functie', 
				tagId: 'neuro'
			},
			{
				tag:'Pijn Domein', 
				tagId: 'pijn'
			},
			{
				tag:'Postnataal', 
				tagId: 'postnataal'
			},
			{
				tag:'Spijsvertering - vochthuishouding', 
				tagId: 'spijsvertering'
			},
			{
				tag:'Spraak en taal domein', 
				tagId: 'spraak'
			},
			{
				tag:'Urineweg-functie', 
				tagId: 'urineweg'
			},
			{
				tag:'Zicht', 
				tagId: 'zicht'
			},
			{
				tag:'Zwangerschap',
				tagId: 'zwangerschap',
			}
		]
	}, {
		domein: 'Psychosociaal',
		id: 'psychosociaal',
		color: 'light-green',
		domeinTags: [
			{
				tag:'Communicatie met maatschappelijke voorzieningen',
				tagId: 'communicatie'
			},
			{
				tag:'Geestelijke gezondheid',
				tagId: 'geestelijk'
			},
			{
				tag:'Groei en ontwikkeling',
				tagId: 'groei'
			},
			{
				tag:'Interpersoonlijke relaties',
				tagId: 'interpersoonlijke'
			},
			{
				tag:'Mantelzorg / zorg voor kind of huisgenoot',
				tagId: 'mantelzorg'
			},
			{
				tag:'Mishandeling / misbruik',
				tagId: 'mishandeling'
			},
			{
				tag:'Rolverandering',
				tagId: 'rolverandering'
			},
			{
				tag:'Rouw',
				tagId: 'rouw'
			},
			{
				tag:'Seksualiteit',
				tagId: 'seksualiteit'
			},
			{
				tag:'Sociaal contact',
				tagId: 'sociaal'
			},
			{
				tag:'Spiritualiteit',
				tagId: 'spiritualiteit'
			},
			{
				tag:'Verwaarlozing',
				tagId: 'verwaarlozing'
			}
		]
	}, {
		domein: 'Omgeving',
		id: 'omgevings',
		color: 'orange',
		domeinTags: [
			{
				tag:'Buurt / werkplek veiligheid',
				tagId: 'buurt'
			},
			{
				tag:'Inkomen / financiën',
				tagId: 'inkomen'
			},
			{
				tag:'Omgevings-hygiëne',
				tagId: 'omgevings'
			},
			{
				tag:'Woning',
				tagId: 'woning'
			}
		]
	}, {
		domein: 'Gezondheids-gerelateerd Gedrag',
		id: 'gezondheidsgerelateerd',
		color: 'light-purple',
		domeinTags: [
			{
				tag:'Fysieke activiteit',
				tagId: 'fysieke'
			},
			{
				tag:'Gebruik van verslavende middelen',
				tagId: 'gebruik'
			},
			{
				tag:'Gezinsplanning',
				tagId: 'gezinsplanning'
			},
			{
				tag:'Gezondheidszorg supervisie',
				tagId: 'gezondheidszorg'
			},
			{
				tag:'Medicatie',
				tagId: 'medicatie'
			},
			{
				tag:'Voeding',
				tagId: 'voeding'
			}
		]
	}, {
		domein: 'Risicofactoren',
		id: 'risicofactoren',
		color: 'dark-green',
		domeinTags: [
			{
				tag:'Valpreventie',
				tagId: 'valpreventie'
			},
			{
				tag:'Ondervoeding',
				tagId: 'ondervoeding'
			},
			{
				tag:'Depressie',
				tagId: 'depressie'
			},
			{
				tag:'Incontinentie',
				tagId: 'incontinentie'
			},
			{
				tag:'Decubitus',
				tagId: 'decubitus'
			}
		]
	}
]

async function renderIndex(req, res) {
	// create contentful client with keys
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const pages = await Page.find({})

	// get recently visited cookies
	const cookies = req.cookies.recent_bekeken

	// get entries
	const entries =  await client.getEntries()

	// get items of entries
	const { items } = entries

	const transformedEntries = items.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	const newFilterData = filteredData.map(item => {
		replaceWhitespaceAndSlashWithHyphen(item.domeinTags, 'tag', 'slug')
		return item
	})
	
	const allTags = cleanTags(items)

	newFilterData.forEach(item => item.domeinTags = item.domeinTags.filter(tag => allTags.includes(tag.slug)))

	const newTransformedEntries = transformedEntries.map(item => {
		item.fields.tagObjects = item.fields.tags.map(tag => {
			const tagObject = {}
			
			newFilterData.forEach(filterDataItem => {
				const domainTags = filterDataItem.domeinTags.map(tag => tag.slug)
				// console.log(domainTags)
				if(domainTags.includes(tag)) {
					tagObject.domain = filterDataItem.id
					tagObject.color = filterDataItem.color
				}
			})
			tagObject.tag = tag
			return tagObject
		})
		return item
	})

	// store items of entries in variable
	let recentlyVisited = newTransformedEntries

	// filter items if recently visited cookies exist
	if(cookies) {
		recentlyVisited = newTransformedEntries.filter(item => cookies.includes(item.fields.slug))
	}

	const visitedPagesSlugs = pages.map(page => page.slug)
	const visitedEntries = newTransformedEntries.filter(item => visitedPagesSlugs.includes(item.fields.slug))

	const transformedVisitedEntries = visitedEntries.map(entry => {
		pages.forEach(item => {
			if(item.slug === entry.fields.slug) {
				entry.fields.visited = item.visited
			}
		})
		return entry
	})

	const fiveMostvisitedEntries = transformedVisitedEntries.sort((a, b) => b.fields.visited - a.fields.visited).slice(0, 5)

	const fiveMostvisitedEntriesTransformed = fiveMostvisitedEntries.map(item => {
		item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
		return item
	})

	const newFiveMostvisitedEntriesTransformed = fiveMostvisitedEntriesTransformed.map(item => {
		item.fields.tagObjects = item.fields.tags.map(tag => {
			const tagObject = {}
			newFilterData.forEach(filterDataItem => {
				const domainTags = filterDataItem.domeinTags.map(tag => tag.slug)
				if(domainTags.includes(tag)) {
					tagObject.domain = filterDataItem.id
					tagObject.color = filterDataItem.color
				}
			})
			tagObject.tag = tag
			return tagObject
		})
		return item
	})

	// render landingspage
	res.render('index', {
		title: "Home",
		items: recentlyVisited,
		page: 'landing-page',
		mostVisited: newFiveMostvisitedEntriesTransformed
	})
}

function cleanTags(array) {
	const tagArray = array.map(item => item.fields.tags)
	const deNestedTagArray = [].concat.apply([], tagArray)
	return [...new Set(deNestedTagArray)]
}

module.exports = renderIndex