const replaceWhitespaceAndSlashWithHyphen = require('../helpers/replaceWhitespaceAndSlashWithHyphen')

const filterData = [
	{
		domein: 'Fysiologisch Domein',
		id: 'fysiologisch',
		domeinTags: [
			{
				tag:'Ademhaling',
				image: "/images/ademhaling.png"
			},
			{
				tag:'Besmettelijke / infectieuze conditie',
				image: "/images/besmettelijk.png"
			},
			{
				tag:'Bewustzijn',
				image: "/images/bewust.png"
			},
			{
				tag:'Circulatie',
				image: "/images/circulatie.png"
			},
			{
				tag:'Cognitie',
				image: "/images/cognitie.png"
			},
			{
				tag:'Darmfunctie',
				image: "/images/darm.png"
			},
			{
				tag:'Gehoor',
				image: "/images/gehoor.png"
			},
			{
				tag:'Geslachtsorganen',
				image: "/images/geslacht.png"
			},
			{
				tag:'Huid',
				image: "/images/huid.png"
			},
			{
				tag:'Mondgezondheid',
				image: "/images/mond.png"
			},
			{
				tag:'Neuro/ musculaire/ skelet-functie',
				image: "/images/skelet.png"
			},
			{
				tag:'Pijn Domein',
				image: "/images/pijn.png"
			},
			{
				tag:'Postnataal',
				image: "/images/postnataal.png"
			},
			{
				tag:'Spijsvertering - vochthuishouding',
				image: "/images/spijsvertering.png"
			},
			{
				tag:'Spraak en taal domein',
				image: "/images/spraak.png"
			},
			{
				tag:'Urineweg-functie',
				image: "/images/urine.png"
			},
			{
				tag:'Zicht',
				image: "/images/zicht.png"
			},
			{
				tag:'Zwangerschap',
				image: "/images/zwangerschap.png"
			}
		]
	}, {
		domein: 'Psychosociaal Domein',
		id: 'psychosociaal',
		domeinTags: [
			{
				tag:'Communicatie met maatschappelijke voorzieningen',
				image: "/images/communicatie.png"
			},
			{
				tag:'Geestelijke gezondheid',
				image: "/images/geestelijk.png"
			},
			{
				tag:'Groei en ontwikkeling',
				image: "/images/groei.png"
			},
			{
				tag:'Interpersoonlijke relaties',
				image: "/images/relaties.png"
			},
			{
				tag:'Mantelzorg / zorg voor kind of huisgenoot',
				image: "/images/zorg.png"
			},
			{
				tag:'Mishandeling / misbruik',
				image: "/images/mishandeling.png"
			},
			{
				tag:'Rolverandering',
				image: "/images/rolverandering.png"
			},
			{
				tag:'Rouw',
				image: "/images/rouw.png"
			},
			{
				tag:'Seksualiteit',
				image: "/images/geslacht.png"
			},
			{
				tag:'Sociaal contact',
				image: "/images/contact.png"
			},
			{
				tag:'Spiritualiteit',
				image: "/images/spiritualiteit.png"
			},
			{
				tag:'Verwaarlozing',
				image: "/images/verwaarlozing.png"
			}
		]
	}, {
		domein: 'Omgevings-Domein',
		id: 'omgevings',
		domeinTags: [
			{
				tag:'Buurt / werkplek veiligheid',
				image: "/images/buurt.png"
			},
			{
				tag:'Inkomen / financiën',
				image: "/images/inkomen.png"
			},
			{
				tag:'Omgevings-hygiëne',
				image: "/images/hygiene.png"
			},
			{
				tag:'Woning',
				image: "/images/woning.png"
			}
		]
	}, {
		domein: 'Gezondheids-gerelateerd Gedrags-Domein',
		id: 'gezondheidsgerelateerd',
		domeinTags: [
			{
				tag:'Fysieke activiteit',
				image: "/images/activiteit.png"
			},
			{
				tag:'Gebruik van verslavende middelen',
				image: "/images/verslaving.png"
			},
			{
				tag:'Gezinsplanning',
				image: "/images/gezin.png"
			},
			{
				tag:'Gezondheidszorg supervisie',
				image: "/images/zorg.png"
			},
			{
				tag:'Medicatie',
				image: "/images/medicatie.png"
			},
			{
				tag:'Voeding',
				image: "/images/voeding.png"
			}
		]
	}, {
		domein: 'Risicofactoren',
		id: 'risicofactoren',
		domeinTags: [
			{
				tag:'Valpreventie',
				image: "/images/valpreventie.png"
			},
			{
				tag:'Ondervoeding',
				image: "/images/ondervoeding.png"
			},
			{
				tag:'Depressie',
				image: "/images/depressie.png"
			},
			{
				tag:'Incontinentie',
				image: "/images/urine.png"
			},
			{
				tag:'Decubitus',
				image: "/images/decubitus.png"
			}
		]
	}
]

function renderDomainTagFilter(req, res) {
	const { domein } = req.params
	const newFilterData = filterData.map(item => {
		replaceWhitespaceAndSlashWithHyphen(item.domeinTags, 'tag', 'slug')
		return item
	})
	const filteredDomainData = newFilterData.filter(item => item.id === domein)
	res.render('omaha-domain', {
		filterData: filteredDomainData,
		index: false
	})
}

module.exports = renderDomainTagFilter