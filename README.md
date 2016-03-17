# Browser Technologies 
Mijn core feature voor mijn funda app is de zoekfunctie gebaseerd op de locatie van de gebruiker.

## Geolocation fallback

- Fallback gemaakt voor als de gebruiker geen geolocatie heeft of geen toestemming hiervoor geeft.

## Browser support:
http://caniuse.com/#feat=geolocation

## Live
[link naar gh-pages](https://dennis-van-bennekom.github.io/funda/)

## Voorbeeld
Ik heb een functie gemaakt die ervoor zorgt dat de fallback template geladen wordt. Deze wordt aangeroepen op deze manier:

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      // Doe leuke dingen met de geolocatie
    },
    () => { // Error callback
      showFallback();
    }
  )
} else {
  showFallback();
}
```

Voor meer info bekijk de source code van [funda/app/scripts/controller.js](https://github.com/dennis-van-bennekom/funda/blob/browser-tech/avv2/app/scripts/controller.js#L5).
