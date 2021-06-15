# Meesterproef egilde-prototype · 2020/21
Een dashboard voor e-health toepassingen

## Live link:
https://egilde.herokuapp.com/

## Table of Contents
- Beschrijving 
- Concept
- Moscow
- Headless CMS
  - Welke API hebben wij gebruikt
  - API Inhoud
  - Hoe gebruikt
  - API key
- Resources
- Used Packages
- Install project


## Beschrijving
De opdrachtgever van het project eGilde van de meesterproef 2021 is de Gezondheidsfabriek samen met Digital Life Center. Veel technologische innovaties worden in de zorg niet gebruikt, omdat het implementatie proces niet soepel verloopt. In het eGilde project proberen ze dit te verbeteren door middel van een productklapper. In deze productklapper staan 17 eHealth toepassingen die cliënten moeten helpen in het dagelijkse leven. Denk aan kleine sensoren die geplaatst worden om vallen bij ouderen te voorkomen of bijvoorbeeld een smartwatch met agenda die ouderen met geheugen moet helpen. 

## Concept
![](./static/public/img/spel.png)

### Hoe te bouwen:
- CMS inrichten
- Content plaatsen
- Begin van de HTML, CSS en JS opzetten
- CMS call
- Maken van producten en detailpage
- Filter en zoek maken

### Features:
- Slim filteren
- Snel zoeken
- Toepassingen vergelijken
- Recent bekeken
- Populair

## Moscow
### Must have:
- [x] 17 ehealth toepassingen digitaliseren
- [x] Filter
- [x] Zoeken
- [x] Onderzoek naar gebruiker

### Should have:
- [x] Testen met gebruikers
- [x] OMAHA stappen filter

### Could have:
- [x] Recent bekeken
- [x] Vergelijk functie

### Would have but won't right now:
- [ ] Like functie
- [ ] Populairste items
- [ ] Nieuwste items
- [ ] User feedback laten geven
- [ ] Verschillende browser ondersteuningen. Uit test bleek dat website niet werkt op Internet Explorer, zouden ook andere browsers moeten testen.
- [ ] App ipv website

## Headless CMS
### Welke API:
Contentful

### API Inhoud:
```
"artObjects": [
  {
    "links": {}                     // link naar item op rijkmuseum website en in de api
    "id":                           // combinatie van collectie en objectnummer 
    "objectNumber":                 // nummer en cijfer combinatie
    "title": "Bureau",              // korte titel     
    "principalOrFirstMaker":        // orginele kunstenaar
    "longTitle":                    // lange titel van het kunstwerk
    "webImage": {}                  // Image met url en afmetingen
    "headerImage": {}               // Image in header grootte met url en afmetingen
    "productionPlaces": []          // Plek(ken) waar het kunstwerk gemaakt is
  }
```

### Hoe gebruikt:
- getData function: 
```
const getData = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(_ => null)

   module.exports = getData
}
```
- filterData function:
```
const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel']
const filteredData = data.artObjects.filter(artObject => {
  return artists.includes(artObject.principalOrFirstMaker)
 })
  return filteredData
```
- sortData function:
```
const sortedArtObjects = data.sort(() => .5 - Math.random())
 return sortedArtObjects
```
- socket.io filteredData sturen naar alle users:
```
socket.on('image', (textandimage) => { 
  text.innerText = textandimage.text;
  picture.src = textandimage.image;
})
```


### API key:
Je kunt op de website van het rijksmuseum een account aanmaken en dan wordt de API key naar je opgestuurd in een mail.

Gebruik hiervoor deze twee websites: 
- Algemene API info: https://data.rijksmuseum.nl/object-metadata/api/
- Account aanmaken voor API key: https://www.rijksmuseum.nl/nl/registreer
Nadat je een account hebt aangemaakt, ga je naar je account, naar instellingen en onderaan staat een kopje Rijksmuseum API. Hier kun je de Key aanvragen.


## Resources

- [Contentful entries](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/content-type/query-entries/console/js)

## Used Packages
- @contentful/rich-text-html-renderer
- contentful
- cookie-parser
- dotenv
- ejs
- express
- mongoose
- node-fetch
- node-sass-middleware
- node-sass
- nodemon


## Install project
1. clone repo: 
``` 
https://github.com/Chazzers/egilde-prototype.git
```
2. Install used packages: 
```
npm install
```
3. Start op het web: 
```
npm run dev
```
4. Te vinden op: http://localhost:3000/



<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->


<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- How about a license here? 📜  -->