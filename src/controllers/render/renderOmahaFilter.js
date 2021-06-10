const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')

const filterData = [
	{
		domein: 'Fysiologisch Domein',
		id: 'fysiologisch',
		img: "/images/bodyicon.png",
		domeinTags: [
			{
				tag:'Ademhaling',
			},
			{
				tag:'Besmettelijke / infectieuze conditie'
			},
			{
				tag:'Bewustzijn'
			},
			{
				tag:'Circulatie'
			},
			{
				tag:'Cognitie'
			},
			{
				tag:'Darmfunctie'
			},
			{
				tag:'Gehoor'
			},
			{
				tag:'Geslachtsorganen',
			},
			{
				tag:'Huid',
			},
			{
				tag:'Mondgezondheid',
			},
			{
				tag:'Neuro/ musculaire/ skelet-functie',
			},
			{
				tag:'Pijn Domein',
			},
			{
				tag:'Postnataal',
			},
			{
				tag:'Spijsvertering - vochthuishouding',
			},
			{
				tag:'Spraak en taal domein',
			},
			{
				tag:'Urineweg-functie',
			},
			{
				tag:'Zicht',
			},
			{
				tag:'Zwangerschap'
			}
		]
	}, {
		domein: 'Psychosociaal Domein',
		id: 'psychosociaal',
		img: "/images/logo-brain.png",
		domeinTags: [
			{
				tag:'Communicatie met maatschappelijke voorzieningen'
			},
			{
				tag:'Geestelijke gezondheid'
			},
			{
				tag:'Groei en ontwikkeling'
			},
			{
				tag:'Interpersoonlijke relaties'
			},
			{
				tag:'Mantelzorg / zorg voor kind of huisgenoot'
			},
			{
				tag:'Mishandeling / misbruik'
			},
			{
				tag:'Rolverandering'
			},
			{
				tag:'Rouw'
			},
			{
				tag:'Seksualiteit'
			},
			{
				tag:'Sociaal contact'
			},
			{
				tag:'Spiritualiteit'
			},
			{
				tag:'Verwaarlozing'
			}
		]
	}, {
		domein: 'Omgevings-Domein',
		id: 'omgevings',
		img: "/images/world.icon.png",
		domeinTags: [
			{
				tag:'Buurt / werkplek veiligheid'
			},
			{
				tag:'Inkomen / financiën'
			},
			{
				tag:'Omgevings-hygiëne'
			},
			{
				tag:'Woning'
			}
		]
	}, {
		domein: 'Gezondheids-gerelateerd Gedrags-Domein',
		id: 'gezondheidsgerelateerd',
		img: "/images/healthIcon.png",
		domeinTags: [
			{
				tag:'Fysieke activiteit'
			},
			{
				tag:'Gebruik van verslavende middelen'
			},
			{
				tag:'Gezinsplanning'
			},
			{
				tag:'Gezondheidszorg supervisie'
			},
			{
				tag:'Medicatie'
			},
			{
				tag:'Voeding'
			}
		]
	}, {
		domein: 'Risicofactoren',
		id: 'risicofactoren',
		img: "/images/icon.risk.png",
		domeinTags: [
			{
				tag:'Valpreventie'
			},
			{
				tag:'Ondervoeding'
			},
			{
				tag:'Depressie'
			},
			{
				tag:'Incontinentie'
			},
			{
				tag:'Decubitus'
			}
		]
	}
]

function renderOmahaFilter(req, res) {
	// create new property slug for each domeinTag array item
	const newFilterData = filterData.map(item => {
		replaceWhitespaceAndSlashWithHyphen(item.domeinTags, 'tag', 'slug')
		return item
	})

	// render this filter data
	res.render('omaha-filter', {
		filterData: newFilterData,
		page: 'omaha-filter'
	})
}

module.exports = renderOmahaFilter