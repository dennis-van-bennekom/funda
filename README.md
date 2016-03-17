# Browser Technologies 

## Fallback

- Fallback gemaakt voor als de gebruiker geen geolocatie heeft of geen toestemming hiervoor geeft.

[link naar gh-pages](https://dennis-van-bennekom.github.io/funda/)

Ik heb een functie gemaakt die ervoor zorgt dat de fallback template geladen wordt. Deze wordt aangeroepen op deze manier:

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    data => {
      // Doe leuke dingen met de geolocatie
    },
    () => { // Error callback
      fallback();
    }
  )
} else {
  fallback();
}
```

Voor meer info bekijk de source code van `controller.js`.
