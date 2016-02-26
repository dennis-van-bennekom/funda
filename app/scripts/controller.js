var controller = (function() {
  var home = function() {
    render('loading', { message: 'Wachten op locatie...' });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        api.getLocation(lat, lng, (postal, city) => {
          render('loading', { message: 'Woningen zoeken...' });

          api.getObjects(postal, city, (objects) => {
            var currentPosition = new google.maps.LatLng(lat, lng);

            var from = [];
            var to = [];

            objects.forEach(object => {
              from.push(currentPosition);
              to.push(object.Woonplaats + ' ' + object.Adres);
            });

            api.getDistanceAndTime(from, to, (data) => {
              objects = objects.map((object, index) => {
                object.Distance = data[index].distance;
                object.Duration = data[index].duration;

                return object;
              });

              render('home', objects);
            });
          });
        });
      });
    };
  };

  var settings = function() {
    var min = store.get('PRICE_MIN');
    var max = store.get('PRICE_MAX');
    var transport = store.get('TRANSPORT');

    render('settings', {
      min: min,
      max: max
    }, () => {
      var form = document.getElementById('form');
      var activeInput = document.getElementById(transport.toLowerCase());
      activeInput.checked = true;

      form.addEventListener('submit', event => {
        event.preventDefault();

        var elements = event.target.elements;
        [].forEach.call(elements, element => {
          if (element.name === 'min') {
            min = parseInt(element.value);
          } else if (element.name === 'max') {
            max = parseInt(element.value);
          }

          if (element.type === 'radio' && element.checked) {
            store.set('TRANSPORT', element.id.toUpperCase());
          }
        });

        if (max > min) {
          store.set('PRICE_MIN', min);
          store.set('PRICE_MAX', max);
        }
      });
    });
  };

  var object = function(guid) {
    render('loading', { message: 'Woning ophalen...' });

    api.getObject(guid, data => {
      render('object', data, () => {
        var save = document.getElementById('save');
        var saved = store.get('SAVED');

        var isSaved = false;

        saved.forEach(object => {
          if (object.InternalId === guid) {
            isSaved = true;
          }
        });

        if (isSaved) {
          save.classList.add('liked');
        }

        save.addEventListener('click', () => {
          if (isSaved) {
            isSaved = false;
            save.classList.remove('liked');

            saved.forEach((object, index) => {
              if (object.InternalId === guid) {
                saved.splice(index, 1);
              }
            });
            store.set('SAVED', saved);
          } else {
            isSaved = true;
            save.classList.add('liked');

            saved.push(data);
            store.set('SAVED', saved);
          }
        });

        // Create map
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            var from = new google.maps.LatLng(lat, lng);
            var to = data.Plaats + ' ' + data.Adres;

            var mapOptions = {
              zoom: 16,
              center: from
            }

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('panel'));

            var request = {
              origin: from,
              destination: to,
              travelMode: google.maps.TravelMode[store.get('TRANSPORT')]
            };

            directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                directionsDisplay.setDirections(result);
              }
            });
          });
        }
      });
    });
  };

  var saved = function() {
    var saved = store.get('SAVED');
    var sort = store.get('SAVED_SORT');

    var _render = function () {
      render('saved', saved, () => {
        var sortButtons = document.querySelectorAll('.sort');
        var activeButton = document.getElementById(sort);

        activeButton.classList.add('selected');

        [].forEach.call(sortButtons, sortButton => {
          sortButton.addEventListener('click', event => {
            store.set('SAVED_SORT', event.target.id);
            sort = event.target.id;

            [].forEach.call(sortButtons, sortButton => {
              sortButton.classList.remove('selected');
            });

            sortButton.classList.add('selected');

            _sort();
          });
        });
      });
    }

    var _sort = function() {
      switch(sort) {
        case 'prijs_aflopend':
          saved = store.get('SAVED');
          saved = _.sortBy(saved, 'KoopPrijs').reverse();
          _render();
          break;
        case 'prijs_oplopend':
          saved = store.get('SAVED');
          saved = _.sortBy(saved, 'KoopPrijs');
          _render();
          break;
        case 'recent':
          saved = store.get('SAVED');
          _render();
          break;
      }
    }

    _sort();
  };

  var render = function(template, data, callback) {
    var target = document.getElementById('render-target');

    fetch(`scripts/templates/${template}.mst`).then(response => {
        return response.text();
    }).then(template => {
        target.innerHTML = Mustache.render(template, data);

        if (callback) {
          callback();
        }
    });
  };

  return {
    home: home,
    settings: settings,
    object: object,
    saved: saved
  };
}());