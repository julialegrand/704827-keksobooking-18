'use strict';

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
  'Вид на деревню'
];
var photosArray = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var ads = [];

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var pinWidth = document.querySelector('.map__pin').offsetWidth;
var pinHeight = document.querySelector('.map__pin').offsetHeight;

for (var i = 1; i < 9; i++) {
  var avatar = 'img/avatars/user0' + i + '.png';
  var locationX = Math.floor(Math.random() * mapWidth) + (pinWidth / 2);
  var locationY = Math.floor(Math.random() * (630 - 130 + 1) + 130) + pinHeight;
  var titleRan = Math.floor(Math.random() * titleArray.length);
  var priceRan = Math.floor(Math.random() * 1000) + 400;
  var typeRan = Math.floor(Math.random() * typeArray.length);
  var roomsRan = Math.floor(Math.random() * 6) + 1;
  var guestsRan = Math.floor(Math.random() * 4) + 1;
  var checkinRan = Math.floor(Math.random() * checkinArray.length);
  var checkoutRan = Math.floor(Math.random() * checkoutArray.length);
  var featuresRan = Math.floor(Math.random() * featuresArray.length);
  var descriptionRan = Math.floor(Math.random() * descriptionArray.length);
  var photoRan = Math.floor(Math.random() * photosArray.length);

  var objectRent = {
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
      features: featuresArray[featuresRan],
      description: descriptionArray[descriptionRan],
      photos: photosArray[photoRan]
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  ads.push(objectRent);
}

map.classList.remove('.map--faded');

var newElement = document.querySelector('.map__pins');
var shablonTemplate = document
  .querySelector('#pin')
  .content.querySelector('.map__pin');

var sahibinden = function (param) {
  var element = shablonTemplate.cloneNode(true);
  element.style =
    'left:' + param.location.x + 'px; top:' + param.location.y + 'px';
  element.querySelector('img').src = param.author.avatar;
  element.querySelector('img').alt = param.offer.title;

  return element;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < ads.length; i++) {
  fragment.appendChild(sahibinden(ads[i]));
}
newElement.appendChild(fragment);
