'use strict';

(function () {
  var TIME_OUT = 10000;
  var CASE_200 = 200;
  var xhrHandler = function (url, method, formData, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CASE_200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIME_OUT;
    });

    xhr.open(method, url);
    xhr.send(formData);
  };
  var errorHandler = function (errorMessage) {
    var main = document.querySelector('main');
    var shablonTemplate = document
      .querySelector('#error')
      .content.querySelector('.error');
    var element = shablonTemplate.cloneNode(true);
    element.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(element);
    element.querySelector('.error__button').addEventListener('click', function () {
      main.removeChild(element);
    });
    document.addEventListener('click', function () {
      main.removeChild(element);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        main.removeChild(element);
      }
    });
  };

  window.backend = {
    load: xhrHandler,
    save: xhrHandler,
    errorHandler: errorHandler
  };
})();
