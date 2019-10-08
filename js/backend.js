'use strict';

window.load = function (onLoad, onError) {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
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
    xhr.timeout = 10000; // 10s
  });

  xhr.open('GET', URL);
  xhr.send();
};

window.errorHandler = function (errorMessage) {
  var main = document.querySelector('main');
  var shablonTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');
  var element = shablonTemplate.cloneNode(true);
  element.querySelector('.error__message').textContent = errorMessage;
  main.appendChild(element);
};
