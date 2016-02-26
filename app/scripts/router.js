var router = (function() {
  var init = function() {
    routie({
      '': function() {
        controller.home();
      },
      'settings': function() {
        controller.settings();
      },
      'object/:guid': function(guid) {
        controller.object(guid);
      },
      'saved': function() {
        controller.saved();
      }
    });
  };

  return {
    init: init
  };
}());