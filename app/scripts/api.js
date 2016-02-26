var api = (function() {
  var getLocation = function(lat, lng, callback) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.GOOGLE_KEY}`).then(response => {
      return response.json();
    }).then(data => {
      var components = data.results[0].address_components;

      var postal = components.filter(component => {
        return component.types.indexOf('postal_code') >= 0;
      });

      postal = postal[0].long_name;

      var city = components.filter(component => {
        return component.types.indexOf('administrative_area_level_2') >= 0;
      });

      city = city[0].long_name;

      postal = postal.replace(' ', '');
      city = city.replace(' ', '-');

      callback(postal, city);
    });
  };

  var getObjects = function(postal, city, callback) {
    var min = store.get('PRICE_MIN');
    var max = store.get('PRICE_MAX');

    fetch(`${config.FUNDA_SEARCH_URL}/json/${config.FUNDA_KEY}/?type=koop&zo=/${city}/${postal}/+1km/${min}-${max}&page=1&pagesize=10`).then(response => {
      return response.json();
    }).then(data => {
      callback(data.Objects);
    });
  };

  var getObject = function(guid, callback) {
    fetch(`${config.FUNDA_SEARCH_URL}/json/detail/${config.FUNDA_KEY}/koop/${guid}`).then(response => {
      return response.json();
    }).then(data => {
      callback(data);
    });
  };

  var getDistanceAndTime = function(from, to, callback) {
    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
      origins: from,
      destinations: to,
      travelMode: google.maps.TravelMode[store.get('TRANSPORT')]
    }, (response, status) => {
      var distances = response.rows[0].elements.map(element => {
        if (element.status = 'OK') {
          return {
            distance: element.distance.text,
            duration: element.duration.text
          };
        } else {
          return {};
        }
      });

      callback(distances);
    });
  }

  return {
    getLocation: getLocation,
    getObjects: getObjects,
    getObject: getObject,
    getDistanceAndTime: getDistanceAndTime
  }
}());