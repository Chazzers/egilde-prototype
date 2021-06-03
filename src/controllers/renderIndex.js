const contentful = require('contentful')
const replaceWhitespaceAndSlashWithHyphen = require('./helpers/replaceWhitespaceAndSlashWithHyphen')

const filteredData = [
	{
		domein: 'Fysiologisch',
		id: 'fysiologisch',
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

const filterData = [
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
	},
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
	},
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
	},
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
	},
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
		tag: 'Decubitus',
		tagId: 'decubitus'
	}
]


async function renderIndex(req, res) {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		environment: process.env.ENV_ID,
		accessToken: process.env.API_KEY
	})

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

	res.render('index', {
		items: transformedEntries,
		filteredData: newFilterData
	})
}

module.exports = renderIndex