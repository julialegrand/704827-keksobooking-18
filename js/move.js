'use strict';

(function () {
  var doc = document.documentElement;
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapHeight = map.offsetHeight;
  var mapWidth = map.offsetWidth;
  var mapLeft = map.offsetLeft;


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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
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

      addressInput.value = window.map.getMapPinMainActiveXY();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

