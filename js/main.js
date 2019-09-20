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
  'Вид на город'
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
  var roomsRan = Math.floor(Math.random() * 4) + 1;
  var guestsRan = Math.floor(Math.random() * 4) + 1;
  var checkinRan = Math.floor(Math.random() * checkinArray.length);
  var checkoutRan = Math.floor(Math.random() * checkoutArray.length);
  var featuresRan = featuresArray.slice(0,(Math.floor(Math.random() * featuresArray.length)));
  var descriptionRan = Math.floor(Math.random() * descriptionArray.length);
  var photoRan = photosArray.slice(0,(Math.floor(Math.random() * photosArray.length)));

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
      features: featuresRan,
      description: descriptionArray[descriptionRan],
      photos: photoRan
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  ads.push(objectRent);
}
console.log(ads);
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

var shablonCart = document.querySelector('#cart').content.querySelector('.map__card popup');
var newCart = map.querySelector('.map__filters-container');



var newSahibinden = function(param) {
  var element = shablonCart.cloneNode(true);
  element.querySelector('.popup__title').textContent = param.offer.title;
  element.querySelector('.popup__text--address').textContent = param.offer.address;
  element.querySelector('.popup__text--price').textContent = param.offer.price + '₽/ночь';
  var typeApart = '';
  if (param.offer.type === 'palace') {
    typeApart ='Дворец'};
  if (param.offer.type === 'flat') {
    typeApart = 'Квартира'};
  if (param.offer.type === 'house') {
    typeApart = 'Дом'};
  if (param.offer.type === 'bungalo') {
    typeApart = 'Бунгало'};
element.querySelector('.popup__type ').textContent = typeApart;
element.querySelector('.popup__text--capacity').textContent = param.offer.rooms + 'комнаты для' + param.offer.guests + 'гостей.'
element.querySelector('.popup__text--time').textContent = 'Заезд после' + param.offer.checking + ',' + '' +  'выезд до' + param.offer.checkout +'.';
element.querySelector('.popup__features').
element.querySelector('.popup__description').textContent = param.offer.description;

for (var j = 0; j < photosArray; j ++ ){
  element.querySelector('.popup__photos').src = photoArray[j];
}
element.querySelector('popup__avatar').src = param.author.avatar


return element;
}

// var newFragment = document.createDocumentFragment() {

//   for (var i = 0; i < ads.length; i ++) {

//     newFragment.appendChild( newSahibinden(ads[i]));
// };






newCart.insertAdjacentHTML('afterend', newFragment);
