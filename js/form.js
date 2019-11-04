'use strict';


(function () {
  var adForm = document.querySelector('.ad-form');
  var typeRent = adForm.querySelector('#type');
  var priceNight = adForm.querySelector('#price');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var timeOut = adForm.querySelector('#timeout');
  var timeIn = adForm.querySelector('#timein');

  var ROOM_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '0': ['0'],
  };

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  var onPriceChange = function () {
    var minPrice = window.card.types[typeRent.value].min;
    priceNight.placeholder = minPrice;
    priceNight.min = minPrice;
    priceNight.value = minPrice;
  };

  var onRoomNumberSelect = function () {
    if (capacitySelect.options.length > 0) {
      Array.from(capacitySelect).forEach(function (option) {
        option.selected = (ROOM_CAPACITY[roomNumberSelect.value][0] === option.value);
        option.hidden = !(ROOM_CAPACITY[roomNumberSelect.value].indexOf(option.value) >= 0);
      });
    }
  };

  onRoomNumberSelect();
  onPriceChange();

  typeRent.addEventListener('change', onPriceChange);
  roomNumberSelect.addEventListener('change', onRoomNumberSelect);

  var onFormSuccess = function () {
    window.map.setPagePassive();
    var main = document.querySelector('main');
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var element = templateSuccess.cloneNode(true);
    main.appendChild(element);
    document.addEventListener('click', function () {
      main.removeChild(element);
    });
    document.addEventListener('keydown', function (docEvent) {
      if (docEvent.keyCode === window.util.ESC_KEYCODE) {
        main.removeChild(element);
      }
    });
  };
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save('https://js.dump.academy/keksobooking', 'POST', onFormSuccess, window.backend.onFormError, new FormData(adForm));
  });
  adFormReset.addEventListener('click', function () {
    window.map.setPagePassive();
  });
})();
