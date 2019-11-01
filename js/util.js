'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var numIncline = function (n, string1, string2, string3) {
    var rest = n % 10;
    var str;
    if (rest === 0 || (rest >= 5 && rest <= 9) || (n >= 11 && n <= 14)) {
      str = string1;
    }
    if (rest === 1) {
      str = string2;
    }
    if (rest >= 2 && rest <= 4) {
      str = string3;
    }
    return n + ' ' + str;
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce,
    numIncline: numIncline
  };
})();
