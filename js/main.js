'use strict';

var titleArray = [
  'Продажа',
  'Покупка',
  'Аренда посуточная',
  'Аренда на длительный срок'
];
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkinArray = ['12:00', '13:00', '14:00'];
var checkoutArray = ['12:00', '13:00', '14:00'];
var featuresArray = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var descriptionArray = [
  'Вид на море',
  'Вид на горы',
  'Вид на поле',
  'Вид на город'
];
var photosArray = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

function random(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var pinWidth = document.querySelector('.map__pin').offsetWidth;
var pinHeight = document.querySelector('.map__pin').offsetHeight;

function generateRent() {
  var arrayLent = [];

  for (var i = 1; i < 9; i++) {
    var avatar = 'img/avatars/user0' + i + '.png';
    var locationX = random(50, mapWidth) + pinWidth / 2;
    var locationY = random(130, 630) + pinHeight;
    var titleRan = random(titleArray.length - 1);
    var priceRan = random(400, 600);
    var typeRan = random(typeArray.length - 1);
    var roomsRan = random(1, 4);
    var guestsRan = roomsRan * random(1, 2);
    var checkinRan = random(checkinArray.length - 1);
    var checkoutRan = random(checkoutArray.length - 1);
    var featuresRan = [];

    featuresArray.forEach(function (feature) {
      if (Math.floor(Math.random() * (1 - 0 + 1) + 0)) {
        featuresRan.push(feature);
      }
    });

    var descriptionRan = random(descriptionArray.length - 1);
    var photoRan = photosArray.slice(0, random(photosArray.length - 1));

    var objectRent = {
      author: {
        avatar: avatar
      },
      offer: {
        title: titleArray[titleRan],
        address: locationX + ',' + locationY,
        price: priceRan,
        type: typeArray[typeRan],
        rooms: roomsRan,
        guests: guestsRan,
        checkin: checkinArray[checkinRan],
        checkout: checkoutArray[checkoutRan],
        features: featuresRan,
        description: descriptionArray[descriptionRan],
        photos: photoRan
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    arrayLent.push(objectRent);
  }
  return arrayLent;
}

var ads = generateRent();

function generatePins() {
  var newElement = document.querySelector('.map__pins');
  var shablonTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  var sahibinden = function (param) {
    var element = shablonTemplate.cloneNode(true);
    element.style =
      'left:' + param.location.x + 'px; top:' + param.location.y + 'px';
    element.querySelector('img').src = param.author.avatar;
    element.querySelector('img').alt = param.offer.title;

    return element;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(sahibinden(ads[i]));
  }
  newElement.appendChild(fragment);
}

function generateCards() {
  var shablonCard = document
    .querySelector('#card')
    .content.querySelector('.map__card');
  var newCart = map.querySelector('.map__filters-container');

  var newSahibinden = function (param) {
    var element = shablonCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = param.offer.title;
    element.querySelector('.popup__text--address').textContent =
      param.offer.address;
    element.querySelector('.popup__text--price').textContent =
      param.offer.price + '₽/ночь';
    var typeApart = '';
    if (param.offer.type === 'palace') {
      typeApart = 'Дворец';
    }
    if (param.offer.type === 'flat') {
      typeApart = 'Квартира';
    }
    if (param.offer.type === 'house') {
      typeApart = 'Дом';
    }
    if (param.offer.type === 'bungalo') {
      typeApart = 'Бунгало';
    }
    element.querySelector('.popup__type ').textContent = typeApart;
    element.querySelector('.popup__text--capacity').textContent =
      param.offer.rooms + 'комнаты для' + param.offer.guests + 'гостей.';
    element.querySelector('.popup__text--time').textContent =
      'Заезд после' +
      param.offer.checkin +
      ',' +
      '' +
      'выезд до' +
      param.offer.checkout +
      '.';

    var blockUl = element.querySelector('.popup__features');

    var uLchildren = blockUl.children;
    var ulClone = uLchildren[0];
    for (var i = 0; i < uLchildren.length; i++) {
      blockUl.removeChild(uLchildren[i]);
    }

    ulClone.classList.remove('popup__feature--wifi');

    var features = param.offer.features;
    for (var j = 0; j < features.length; j++) {
      var foundClass = 'popup__feature--' + features[j];
      var newLi = ulClone.cloneNode(true);
      newLi.classList.add(foundClass);
      blockUl.appendChild(newLi);
    }

    element.querySelector('.popup__description').textContent =
      param.offer.description;

    var photos = param.offer.photos;
    if (photos.length === 0) {
      element
        .querySelector('.popup__photos')
        .removeChild(element.querySelector('.popup__photo'));
    }
    for (j = 0; j < photos.length; j++) {
      if (j === 0) {
        element.querySelector('.popup__photo').src = photos[j];
      } else {
        var clonedImg = element.querySelector('.popup__photo').cloneNode(true);
        clonedImg.src = photos[j];
        element.querySelector('.popup__photos').appendChild(clonedImg);
      }
    }
    element.querySelector('.popup__avatar').src = param.author.avatar;

    return element;
  };

  var newFragment = document.createDocumentFragment();

  for (var k = 0; k < ads.length; k++) {
    newFragment.appendChild(newSahibinden(ads[k]));
  }

  map.insertBefore(newFragment, newCart);
}

// Вернуть страницу в исходное состояние.

// Блок с картой .map содержит класс map--faded;
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
// добавленного на них или на их родительские блоки fieldset;
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
// Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main,
// являющейся контролом указания адреса объявления. Первое взаимодействие
// с меткой (mousedown) переводит страницу в активное состояние.
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinMainWidth = mapPinMain.offsetWidth;
var mapPinMainHeight = mapPinMain.offsetHeight;


function getMapPinMainPassivXY() {
  var x = Math.floor(mapPinMain.offsetLeft + (mapPinMainWidth / 2));
  var y = Math.floor(mapPinMain.offsetTop + (mapPinMainHeight / 2));
  return x + ',' + y;
}

function getMapPinMainActiveXY() {
  var x = Math.floor(mapPinMain.offsetLeft + (mapPinMainWidth / 2));
  var y = Math.floor(mapPinMain.offsetTop + mapPinMainHeight);
  return x + ',' + y;
}

var adForm = document.querySelector('.ad-form ');

var adFormInput = adForm.querySelectorAll('input');
var adFormSelect = adForm.querySelectorAll('select');
var addressInput = adForm.querySelector('#address');
var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

capacitySelect.addEventListener('change', function () {
  var roomNumberValue = roomNumberSelect.value;
  if (capacitySelect.value > roomNumberValue) {
    capacitySelect.setCustomValidity('gostey doljno byt menshe');
  } else {
    capacitySelect.setCustomValidity('');
  }
});

roomNumberSelect.addEventListener('change', function () {
  var capacityValue = capacitySelect.value;

  if (roomNumberSelect.value < capacityValue) {
    roomNumberSelect.setCustomValidity('gostey doljno byt menshe');
  } else {
    roomNumberSelect.setCustomValidity('');
  }
});

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

var ENTER_KEYCODE = 13;

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setPageActive();
  }
});
