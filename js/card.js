'use strict';


(function () {

  var types = {
    bungalo: {
      ru: 'Бунгало',
      min: 0
    },
    flat: {
      ru: 'квартира',
      min: 1000
    },
    house: {
      ru: 'Дом',
      min: 5000
    },
    palace: {
      ru: 'Дворец',
      min: 10000
    }
  };

  var numIncline = function (n, str1, str2, str3) {
    var rest = n % 10;
    var str;
    if (rest === 0 || (rest >= 5 && rest <= 9) || (n >= 11 && n <= 14)) {
      str = str1;
    }
    if (rest === 1) {
      str = str2;
    }
    if (rest >= 2 && rest <= 4) {
      str = str3;
    }
    return n + ' ' + str;
  };


  var render = function (param) {
    var templateCard = document
      .querySelector('#card')
      .content.querySelector('.map__card');

    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = param.offer.title;
    element.querySelector('.popup__text--address').textContent = param.offer.address;
    element.querySelector('.popup__text--price').textContent = param.offer.price + '₽/ночь';
    element.querySelector('.popup__type ').textContent = types[param.offer.type].ru;
    element.querySelector('.popup__text--capacity').textContent = numIncline(param.offer.rooms, 'комнат', 'комната', 'комнаты') + ' ' + 'для' + ' ' + param.offer.guests + ' ' + 'гостей.';
    element.querySelector('.popup__text--time').textContent = 'Заезд после' + param.offer.checkin + ',' + '' + 'выезд до' + param.offer.checkout + '.';

    var featuresElement = element.querySelector('.popup__features');

    var featuresChildren = featuresElement.children;
    var cloneFeaturesChild = featuresChildren[0];
    Array.from(featuresChildren).forEach(function (item) {
      featuresElement.removeChild(item);
    });

    cloneFeaturesChild.classList.remove('popup__feature--wifi');

    var features = param.offer.features;
    features.forEach(function (item) {
      var foundClass = 'popup__feature--' + item;
      var newChild = cloneFeaturesChild .cloneNode(true);
      newChild.classList.add(foundClass);
      featuresElement.appendChild(newChild);
    });

    element.querySelector('.popup__description').textContent = param.offer.description;

    var photos = param.offer.photos;
    if (photos.length === 0) {
      element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
    }
    photos.forEach(function (item, index) {
      if (index === 0) {
        element.querySelector('.popup__photo').src = item;
      } else {
        var clonedImg = element.querySelector('.popup__photo').cloneNode(true);
        clonedImg.src = item;
        element.querySelector('.popup__photos').appendChild(clonedImg);
      }
    });
    element.querySelector('.popup__avatar').src = param.author.avatar;
    var popupCloseEl = element.querySelector('.popup__close');
    popupCloseEl.addEventListener('click', function () {
      window.map.removeCard();
    });
    var mapFiltersElement = window.map.container.querySelector('.map__filters-container');

    window.map.container.insertBefore(element, mapFiltersElement);
  };
  window.card = {
    types: types,
    render: render
  };
})();

