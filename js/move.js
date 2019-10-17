'use strict';

(function () {
  var doc = document.documentElement;
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapHeight = window.map.container.offsetHeight;
  var mapWidth = window.map.container.offsetWidth;
  var mapLeft = window.map.container.offsetLeft;
  var MIN_Y = 130;
  var MAX_Y = 630;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if ((moveEvt.clientX < mapLeft + mapPinMainWidth) || (moveEvt.clientY < mapPinMainHeight)) {
        return;
      }

      if ((moveEvt.clientX > (mapWidth + mapLeft - mapPinMainWidth)) || ((moveEvt.clientY + scrollTop) > (mapHeight - mapPinMainHeight))) {
        return;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainY = mapPinMain.offsetTop - shift.y;
      if (mapPinMainY < (MIN_Y - mapPinMainHeight)) {
        mapPinMainY = MIN_Y - mapPinMainHeight;
      }
      if (mapPinMainY > (MAX_Y - mapPinMainHeight)) {
        mapPinMainY = MAX_Y - mapPinMainHeight;
      }

      mapPinMain.style.top = mapPinMainY + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      addressInput.value = window.map.getPinMainActiveXY();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

