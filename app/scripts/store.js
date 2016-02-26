var store = (function() {
  var set = function(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  var get = function(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  return {
    set: set,
    get: get
  }
}());