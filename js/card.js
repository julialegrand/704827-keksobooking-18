'use strict';


(function () {
  var renderCard = function (param) {
    var map = document.querySelector('.map');
    var shablonCard = document
      .querySelector('#card')
      .content.querySelector('.map__card');

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
    var popupCloseEl = element.querySelector('.popup__close');
    popupCloseEl.addEventListener('click', function () {
      window.map.closeCard();
    });
    var newCart = map.querySelector('.map__filters-container');

    var newFragment = document.createDocumentFragment();
    newFragment.appendChild(element);
    map.insertBefore(newFragment, newCart);
  };
  window.card = {
    renderCard: renderCard
  };
})();

