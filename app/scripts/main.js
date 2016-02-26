(function() {
  store.set('PRICE_MIN',  store.get('PRICE_MIN')  || 0);
  store.set('PRICE_MAX',  store.get('PRICE_MAX')  || 1000000);
  store.set('TRANSPORT',  store.get('TRANSPORT')  || 'WALKING');
  store.set('SAVED',      store.get('SAVED')      || []);
  store.set('SAVED_SORT', store.get('SAVED_SORT') || 'recent');

  router.init();
}());