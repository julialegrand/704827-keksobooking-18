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

  var render = function (param) {
    var templateCard = document
      .querySelector('#card')
      .content.querySelector('.map__card');

    var element = templateCard.cloneNode(true);
    if (param.offer.title) {
      element.querySelector('.popup__title').textContent = param.offer.title;
    } else {
      element.querySelector('.popup__title').classList.add('hidden');
    }
    if (param.offer.address) {
      element.querySelector('.popup__text--address').textContent = param.offer.address;
    } else {
      element.querySelector('.popup__text--address').classList.add('hidden');
    }
    if (param.offer.price + '₽/ночь') {
      element.querySelector('.popup__text--price').textContent = param.offer.price + '₽/ночь';
    } else {
      element.querySelector('.popup__text--price').classList.add('hidden');
    }
    if (types[param.offer.type].ru) {
      element.querySelector('.popup__type ').textContent = types[param.offer.type].ru;
    } else {
      element.querySelector('.popup__type ').classList.add('hidden');
    }
    if (window.util.numIncline(param.offer.rooms, 'комнат', 'комната', 'комнаты') + ' ' + 'для' + ' ' + param.offer.guests + ' ' + 'гостей.') {
      element.querySelector('.popup__text--capacity').textContent = window.util.numIncline(param.offer.rooms, 'комнат', 'комната', 'комнаты') + ' ' + 'для' + ' ' + param.offer.guests + ' ' + 'гостей.';
    } else {
      element.querySelector('.popup__text--capacity').classList.add('hidden');
    }
    if ('Заезд после' + param.offer.checkin + ',' + '' + 'выезд до' + param.offer.checkout + '.') {
      element.querySelector('.popup__text--time').textContent = 'Заезд после' + param.offer.checkin + ',' + '' + 'выезд до' + param.offer.checkout + '.';
    } else {
      element.querySelector('.popup__text--time').classList.add('hidden');
    }
    var featuresElement = element.querySelector('.popup__features');

    if (param.offer.features) {
      var featuresChildren = featuresElement.children;
      var cloneFeaturesChild = featuresChildren[0];
      Array.from(featuresChildren).forEach(function (item) {
        featuresElement.removeChild(item);
      });

      cloneFeaturesChild.classList.remove('popup__feature--wifi');

      var features = param.offer.features;
      features.forEach(function (item) {
        var foundClass = 'popup__feature--' + item;
        var newChild = cloneFeaturesChild.cloneNode(true);
        newChild.classList.add(foundClass);
        featuresElement.appendChild(newChild);
      });
    } else {
      featuresElement.classList.add('hidden');
    }
    if (param.offer.description) {
      element.querySelector('.popup__description').textContent = param.offer.description;
    } else {
      element.querySelector('.popup__description').classList.add('hidden');
    }
    if (param.offer.photos) {
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
    } else {
      element.querySelector('.popup__photos').classList.add('hidden');
    }
    if (param.author.avatar) {
      element.querySelector('.popup__avatar').src = param.author.avatar;
      var popupCloseEl = element.querySelector('.popup__close');
      popupCloseEl.addEventListener('click', function () {
        window.map.removeCard();
      });
    } else {
      element.querySelector('.popup__avatar').classList.add('hidden');
    }
    var mapFiltersElement = window.map.container.querySelector('.map__filters-container');

    window.map.container.insertBefore(element, mapFiltersElement);
  };
  window.card = {
    types: types,
    render: render
  };
})();

