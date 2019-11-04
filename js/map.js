'use strict';


(function () {
  var container = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainStyle = mapPinMain.getAttribute('style');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var homePreview = document.querySelector('.ad-form__photo');
  var defaultAvatarImage = avatarPreview.src;

  var addressInput = adForm.querySelector('#address');
  var mapPinsParent = document.querySelector('.map__pins');

  var removeCard = function () {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      container.removeChild(activeCard);
    }
  };

  var closeCard = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      removeCard();
    }
  };

  var getPinMainXY = function (isActive) {
    var x = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
    var y = Math.floor(mapPinMain.offsetTop + (isActive ? mapPinMainHeight : mapPinMainHeight / 2));
    return x + ',' + y;
  };

  var toggleFieldset = function () {
    adFormFieldset.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  var setPagePassive = function () {
    var mapFilters = document.querySelector('.map__filters');
    container.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    mapFilters.reset();
    toggleFieldset();
    avatarPreview.src = defaultAvatarImage;
    homePreview.innerHTML = '';
    addressInput.value = getPinMainXY(false);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (item) {
      mapPinsParent.removeChild(item);
    });

    removeCard();
    mapPinMain.style = mapPinMainStyle;

    mapPinMain.addEventListener('mousedown', onMainPinMouseDownn);
    mapPinMain.addEventListener('keydown', onMainPinKeyDown);
  };
  var onDataLoad = function (data) {
    window.pin.ads = data;
    window.filter.onFormChange();
  };
  var setPageActive = function () {
    container.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleFieldset();
    window.backend.load('https://js.dump.academy/keksobooking/data', 'GET', onDataLoad, window.backend.onFormError);

  };

  setPagePassive();


  var onMainPinMouseDownn = function () {
    setPageActive();
    addressInput.value = getPinMainXY(true);

    mapPinMain.removeEventListener('mousedown', onMainPinMouseDownn);
    mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      setPageActive();
      mapPinMain.removeEventListener('mousedown', onMainPinMouseDownn);
      mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
    }
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDownn);
  mapPinMain.addEventListener('keydown', onMainPinKeyDown);

  window.map = {
    container: container,
    removeCard: removeCard,
    closeCard: closeCard,
    getPinMainXY: getPinMainXY,
    setPagePassive: setPagePassive,
    setPageActive: setPageActive
  };
})();
