# Browser Technologies 

## Geolocation fallback

- Fallback gemaakt voor als de gebruiker geen geolocatie heeft of geen toestemming hiervoor geeft.

[link naar gh-pages](https://dennis-van-bennekom.github.io/funda/)

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
