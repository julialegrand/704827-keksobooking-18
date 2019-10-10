'use strict';

(function () {
  var TIME_OUT = 10000;
  var CASE_200 = 200;

  window.backend = {
    load: function (url, method, onLoad, onError) {
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
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      var main = document.querySelector('main');
      var shablonTemplate = document
        .querySelector('#error')
        .content.querySelector('.error');
      var element = shablonTemplate.cloneNode(true);
      element.querySelector('.error__message').textContent = errorMessage;
      main.appendChild(element);
    },
  };
})();
