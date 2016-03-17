# Funda AVV1
  		  
## Verbeteringen
  		  
- **Afbeeldingen:** fallback gemaakt met ```::before``` en ```::after```.		 +- Fallback gemaakt voor als de gebruiker geen geolocatie heeft of geen toestemming hiervoor geeft.
- **Custom fonts:** gebruik ik niet.		
- **Kleur:** getest met Sim Daltonism, kleuren zijn goed.		
- **Breedband internet:** 3 seconden laadtijd op 3G zonder afbeeldingen. TODO: Afbeeldingen lazy loaden.		
- **Muis/Trackpad doet het niet...:** alles is goed te tabben, bij sommige elementen moest ik een ```tabindex="0"``` toevoegen, omdat het geen standaart input elementen waren.		
- **Javascript (volledig):** de website werkt niet zonder javascript dus ik heb een ```<noscript>``` toegevoegd met een melding daarover.		
- **Cookies:** gebruik ik niet.		
- **Local storage:** defaults zetten in de code ```var min = store.get('PRICE_MIN') || 0;```.
- **Geolocation fallback:** geen geolocation? handmatige input.
