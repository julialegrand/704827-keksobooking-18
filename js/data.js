'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;
  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;

  var titleArray = [
    'Продажа',
    'Покупка',
    'Аренда посуточная',
    'Аренда на длительный срок'
  ];
  var typeArray = ['palace', 'flat', 'house', 'bungalo'];
  var checkinArray = ['12:00', '13:00', '14:00'];
  var checkoutArray = ['12:00', '13:00', '14:00'];
  var featuresArray = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var descriptionArray = [
    'Вид на море',
    'Вид на горы',
    'Вид на поле',
    'Вид на город'
  ];
  var photosArray = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  function random(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  window.fakeData = (function () {
    var arrayLent = [];
    for (var i = 1; i < 9; i++) {
      var avatar = 'img/avatars/user0' + i + '.png';
      var locationX = random(50, mapWidth) + pinWidth / 2;
      var locationY = random(130, 630) + pinHeight;
      var titleRan = random(titleArray.length - 1);
      var priceRan = random(400, 600);
      var typeRan = random(typeArray.length - 1);
      var roomsRan = random(1, 4);
      var guestsRan = roomsRan * random(1, 2);
      var checkinRan = random(checkinArray.length - 1);
      var checkoutRan = random(checkoutArray.length - 1);
      var featuresRan = [];

      featuresArray.forEach(function (feature) {
        if (Math.floor(Math.random() * (1 - 0 + 1) + 0)) {
          featuresRan.push(feature);
        }
      });

      var descriptionRan = random(descriptionArray.length - 1);
      var photoRan = photosArray.slice(0, random(photosArray.length - 1));

      var objectRent = {
        id: i,
        author: {
          avatar: avatar
        },
        offer: {
          title: titleArray[titleRan],
          address: locationX + ',' + locationY,
          price: priceRan,
          type: typeArray[typeRan],
          rooms: roomsRan,
          guests: guestsRan,
          checkin: checkinArray[checkinRan],
          checkout: checkoutArray[checkoutRan],
          features: featuresRan,
          description: descriptionArray[descriptionRan],
          photos: photoRan
        },
        location: {
          x: locationX,
          y: locationY
        }
      };

      arrayLent.push(objectRent);
    }
    return arrayLent;
  })();

})();
