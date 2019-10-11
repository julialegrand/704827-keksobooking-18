'use strict';


(function () {
  var renderPins = function (ads) {
    var newElement = document.querySelector('.map__pins');
    var shablonTemplate = document
      .querySelector('#pin')
      .content.querySelector('.map__pin');

    var renderPin = function (param) {
      var element = shablonTemplate.cloneNode(true);
      element.style =
        'left:' + param.location.x + 'px; top:' + param.location.y + 'px';
      element.querySelector('img').src = param.author.avatar;
      element.querySelector('img').alt = param.offer.title;

      element.addEventListener('keydown', window.map.closeEl);

      element.addEventListener('click', function () {
        window.map.closeCard();
        window.card.renderCard(param);
        element.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.ENTER_KEYCODE) {
            window.card.renderCard(param);
          }
        });
      });
      return element;
    };

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    newElement.appendChild(fragment);
  };
  window.pin = {
    renderPins: renderPins
  };

})();
