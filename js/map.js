'use strict';


(function () {
  var isPageActive = false;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainStyle = mapPinMain.getAttribute('style');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var adForm = document.querySelector('.ad-form');
  var adFormInput = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var addressInput = adForm.querySelector('#address');
  var mapPinsParent = document.querySelector('.map__pins');

  var closeCard = function () {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      map.removeChild(activeCard);
    }
  };

  var closeEl = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  var getMapPinMainPassivXY = function () {
    var x = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
    var y = Math.floor(mapPinMain.offsetTop + mapPinMainHeight / 2);
    return x + ',' + y;
  };

  var getMapPinMainActiveXY = function () {
    var x = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
    var y = Math.floor(mapPinMain.offsetTop + mapPinMainHeight);
    return x + ',' + y;
  };

  var setPagePassive = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    for (var v = 0; v < adFormInput.length; v++) {
      adFormInput[v].disabled = true;
    }

    for (var m = 0; m < adFormSelect.length; m++) {
      adFormSelect[m].disabled = true;
    }
    addressInput.value = getMapPinMainPassivXY();
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPinsParent.removeChild(mapPins[i]);
    }
    closeCard();
    mapPinMain.style = mapPinMainStyle;
    isPageActive = false;
  };

  var setPageActive = function () {
    if (isPageActive) {
      return;
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var v = 0; v < adFormInput.length; v++) {
      adFormInput[v].disabled = false;
    }

    for (var m = 0; m < adFormSelect.length; m++) {
      adFormSelect[m].disabled = false;
    }

    window.backend.load('https://js.dump.academy/keksobooking/data', 'GET', '', window.pin.renderPins, window.backend.errorHandler);

    isPageActive = true;
  };

  setPagePassive();


  mapPinMain.addEventListener('mousedown', function () {
    setPageActive();
    addressInput.value = getMapPinMainActiveXY();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      setPageActive();
    }
  });

  window.map = {
    closeCard: closeCard,
    closeEl: closeEl,
    getMapPinMainPassivXY: getMapPinMainPassivXY,
    getMapPinMainActiveXY: getMapPinMainActiveXY,
    setPagePassive: setPagePassive,
    setPageActive: setPageActive
  };
})();
