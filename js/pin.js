'use strict';


(function () {
  window.generatePins = function () {
    var ads = window.generateAds();
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

      element.addEventListener('keydown', window.closeEl);

      element.addEventListener('click', function () {
        window.closeCard();
        window.renderCard(param);
        element.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.ENTER_KEYCODE) {
            window.renderCard(param);
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

})();
