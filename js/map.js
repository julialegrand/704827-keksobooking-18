'use strict';


(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var adForm = document.querySelector('.ad-form');
  var adFormInput = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var addressInput = adForm.querySelector('#address');

  window.closeCard = function () {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      map.removeChild(activeCard);
    }
  };

  window.closeEl = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.closeCard();
    }
  };


  function getMapPinMainPassivXY() {
    var x = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
    var y = Math.floor(mapPinMain.offsetTop + mapPinMainHeight / 2);
    return x + ',' + y;
  }

  function getMapPinMainActiveXY() {
    var x = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
    var y = Math.floor(mapPinMain.offsetTop + mapPinMainHeight);
    return x + ',' + y;
  }

  // Вернуть страницу в исходное состояние.
  // Блок с картой .map содержит класс map--faded;
  // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main,
  // являющейся контролом указания адреса объявления. Первое взаимодействие
  // с меткой (mousedown) переводит страницу в активное состояние.


  function setPagePassive() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    for (var v = 0; v < adFormInput.length; v++) {
      adFormInput[v].disabled = true;
    }

    for (var m = 0; m < adFormSelect.length; m++) {
      adFormSelect[m].disabled = true;
    }
    addressInput.value = getMapPinMainPassivXY();
  }

  function setPageActive() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var v = 0; v < adFormInput.length; v++) {
      adFormInput[v].disabled = false;
    }

    for (var m = 0; m < adFormSelect.length; m++) {
      adFormSelect[m].disabled = false;
    }
    window.generatePins();
  }

  setPagePassive();

  // Добавьте обработчик события mousedown на элемент .map__pin--main
  // Обработчик события mousedown должен вызывать функцию, которая будет отменять изменения DOM-элементов,
  // описанные в пункте «Неактивное состояние» технического задания.

  mapPinMain.addEventListener('mousedown', function () {
    setPageActive();
    addressInput.value = getMapPinMainActiveXY();
  });

  // Установить обработчик keydown для метки.
  // При наступлении события мы должны проверить нажатую клавишу и
  //  если пользователь нажал Enter — перевести страницу в активный режим.

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      setPageActive();
    }
  });

})();
