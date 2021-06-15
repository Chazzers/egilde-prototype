const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')

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

async function renderSearchPage(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

	const cookies = req.cookies.recent_bekeken

	const entries =  await client.getEntries()

	const { items } = entries

	const newFilterData = filteredData.map(item => {
		replaceWhitespaceAndSlashWithHyphen(item.domeinTags, 'tag', 'slug')
		return item
	})

	const transformedEntries = items.map(item => {
			item.fields.tags = replaceWhitespaceAndSlashWithHyphen(item.fields.tags)
			return item
	})

	const newTransformedEntries = transformedEntries.map(item => {
		item.fields.tagObjects = item.fields.tags.map(tag => {
			const tagObject = {}
			newFilterData.forEach(filterDataItem => {
				const domainTags = filterDataItem.domeinTags.map(tag => tag.slug)
				// console.log(domainTags)
				// console.log(tag)
				if(domainTags.includes(tag)) {
					// console.log('hi')
					tagObject.domain = filterDataItem.id
					tagObject.color = filterDataItem.color
				}
			})
			tagObject.tag = tag
			return tagObject
		})
		return item
	})

	const recentlyVisited = cookies ? newTransformedEntries.filter(item => cookies.includes(item.fields.slug)) : newTransformedEntries

	const allTags = cleanTags(items)

	res.render('search', {
		recentItems: recentlyVisited,
		allItems: newTransformedEntries,
		allTags: allTags,
		page: 'zoeken'
	})
}

function cleanTags(array) {
	const tagArray = array.map(item => item.fields.tags)
	const deNestedTagArray = [].concat.apply([], tagArray)
	return [...new Set(deNestedTagArray)]
}

module.exports = renderSearchPage
