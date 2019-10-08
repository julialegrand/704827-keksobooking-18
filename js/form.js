'use strict';


(function () {

  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');

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
    var typeRent = adForm.querySelector('#type');
    var priceNight = adForm.querySelector('#price');
    var priceValue = priceNight.value;
    var typeValue = typeRent.value;
    var timeOut = adForm.querySelector('#timeout');
    var timeIn = adForm.querySelector('#timein');
    var timeOutValue = timeOut.value;
    var timeInValue = timeIn.value;

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
  adFormReset.addEventListener('click', function () {
    window.setPagePassive();
  });
})();
