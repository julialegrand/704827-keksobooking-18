'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var houseFilterType = mapFilters.querySelector('#housing-type');
  var houseFilterPrice = mapFilters.querySelector('#housing-price');
  var houseFilterRoom = mapFilters.querySelector('#housing-rooms');
  var houseFilterGuests = mapFilters.querySelector('#housing-guests');

  mapFilters.addEventListener('change', function () {
    update();
  });

  var update = window.util.debounce(function () {
    var selectedType = houseFilterType.value;
    var selectedPrice = houseFilterPrice.value;
    var selectedRoom = houseFilterRoom.value;
    var selectedGuests = houseFilterGuests.value;

    var filteredAds = selectedType === 'any' ? window.pin.ads : window.pin.ads.filter(function (item) {
      return item.offer.type === selectedType;
    });

    filteredAds = filteredAds.filter(function (item) {
      if (selectedPrice === 'low') {
        return item.offer.price < LOW_PRICE;
      }
      if (selectedPrice === 'middle') {
        return item.offer.price > LOW_PRICE && item.offer.price < HIGH_PRICE;
      }
      if (selectedPrice === 'high') {
        return item.offer.price > HIGH_PRICE;
      }
      return item;
    });

    filteredAds = selectedGuests === 'any' ? filteredAds : filteredAds.filter(function (item) {
      return item.offer.guests === parseInt(selectedGuests, 10);
    });

    filteredAds = selectedRoom === 'any' ? filteredAds : filteredAds.filter(function (item) {
      return item.offer.rooms === parseInt(selectedRoom, 10);
    });

    var houseFeatures = document.querySelectorAll('.map__features input:checked');

    var featureHandler = function (feature) {
      filteredAds = filteredAds.filter(function (item) {
        return item.offer.features.indexOf(feature.value) > -1;
      });
    };
    houseFeatures.forEach(featureHandler);

    window.pin.render(filteredAds);
  });

  window.filter = {
    update: update
  };
})();


