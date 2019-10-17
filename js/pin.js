'use strict';

(function () {
  var ads = [];

  var renderPin = function (param) {
    var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = templatePin.cloneNode(true);
    element.style =
      'left:' + param.location.x + 'px; top:' + param.location.y + 'px';
    element.querySelector('img').src = param.author.avatar;
    element.querySelector('img').alt = param.offer.title;

    element.addEventListener('keydown', window.map.closeCard);

    element.addEventListener('click', function () {
      window.map.removeCard();
      window.card.render(param);
    });
    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.render(param);
      }
    });
    return element;
  };

  var render = function (items) {
    var mapPinsContainer = document.querySelector('.map__pins');
    var mapOverlay = mapPinsContainer.querySelector('.map__overlay');
    var mapMainPin = mapPinsContainer.querySelector('.map__pin--main');
    mapPinsContainer.innerHTML = '';
    window.map.removeCard();
    var takeNumber = items.length > 5 ? 5 : items.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(items[i]));
    }
    mapPinsContainer.appendChild(fragment);
    mapPinsContainer.appendChild(mapOverlay);
    mapPinsContainer.appendChild(mapMainPin);
  };

  window.pin = {
    ads: ads,
    render: render
  };
})();
