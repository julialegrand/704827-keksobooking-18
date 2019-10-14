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

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  function onPriceChange() {
    var typeValue = typeRent.value;
    if (typeValue === 'bungalo') {
      priceNight.placeholder = '0';
      priceNight.min = '0';
    } else if (typeValue === 'flat') {
      priceNight.placeholder = '1000';
      priceNight.min = '1000';
    } else if (typeValue === 'house') {
      priceNight.placeholder = '5000';
      priceNight.min = '5000';
    } else if (typeValue === 'palace') {
      priceNight.placeholder = '10000';
      priceNight.min = '10000';
    }
  }
  typeRent.addEventListener('change', onPriceChange);
  roomNumberSelect.addEventListener('change', function () {
    capacitySelect.value = roomNumberSelect.value;
  });
  capacitySelect.addEventListener('change', function () {
    roomNumberSelect.value = capacitySelect.value;
  });

  function onFormInput() {
    var roomNumber = roomNumberSelect.value;
    var bedNumber = capacitySelect.value;
    if (roomNumber === '0') {
      capacitySelect.setCustomValidity('Не для гостей');
    } else if (bedNumber > roomNumber) {
      capacitySelect.setCustomValidity('Колличество комнат должно быть больше');
    } else {
      capacitySelect.setCustomValidity('');
    }
  }
  capacitySelect.addEventListener('change', onFormInput);
  roomNumberSelect.addEventListener('change', onFormInput);

  function selectType() {
    var timeOutValue = timeOut.value;
    var timeInValue = timeIn.value;
    var typeValue = typeRent.value;
    var priceValue = priceNight.value;
    if (typeValue === 'bungalo' && priceValue < 0) {
      priceNight.setCustomValidity('Цена должна быть выше');
    } else if (typeValue === 'flat' && priceValue < 1000) {
      priceNight.setCustomValidity('Цена должна быть выше');
    } else if (typeValue === 'house' && priceValue < 5000) {
      priceNight.setCustomValidity('Цена должна быть выше');
    } else if (typeValue === 'palace' && priceValue < 10000) {
      priceNight.setCustomValidity('Цена должна быть выше');
    } else {
      priceNight.setCustomValidity('');
    }
    if (timeOutValue !== timeInValue) {
      timeOut.setCustomValidity('Укажите другое время');
    } else {
      timeOut.setCustomValidity('');
    }
  }

  var formSubmitButton = adForm.querySelector('.ad-form__submit');
  formSubmitButton.addEventListener('click', function () {
    selectType();
  });
  var formSuccessHandler = function () {
    window.map.setPagePassive();
    var main = document.querySelector('main');
    var shablonTemplate = document
      .querySelector('#success')
      .content.querySelector('.success');
    var element = shablonTemplate.cloneNode(true);
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
    window.backend.save('https://js.dump.academy/keksobooking', 'POST', new FormData(adForm), formSuccessHandler, window.backend.errorHandler);
  });
  adFormReset.addEventListener('click', function () {
    window.map.setPagePassive();
  });
})();
