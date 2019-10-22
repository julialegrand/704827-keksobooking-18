'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var mapFilters = document.querySelector('.map__filters-container');
  var houseFilterType = mapFilters.querySelector('#housing-type');
  var houseFilterPrice = mapFilters.querySelector('#housing-price');
  var houseFilterRoom = mapFilters.querySelector('#housing-rooms');
  var houseFilterGuests = mapFilters.querySelector('#housing-guests');
  var houseFeatures = document.querySelectorAll('.map__features input');

  var selectedType = 'any';
  var selectedPrice = 'any';
  var selectedGuests = 'any';
  var selectedRoom = 'any';
  var selectedHouseFeatures = [];

  houseFilterType.addEventListener('change', function (evt) {
    selectedType = evt.target.value;
    update();
  });
  houseFilterPrice.addEventListener('change', function (evt) {
    selectedPrice = evt.target.value;
    update();
  });
  houseFilterRoom.addEventListener('change', function (evt) {
    selectedRoom = evt.target.value;
    update();
  });
  houseFilterGuests.addEventListener('change', function (evt) {
    selectedGuests = evt.target.value;
    update();
  });

  var inputChangeHandler = function (evt) {
    if (evt.target.checked) {
      selectedHouseFeatures.push(evt.target.value);
    } else {
      selectedHouseFeatures = selectedHouseFeatures.filter(function (item) {
        return item !== evt.target.value;
      });
    }
    update();
  };

  houseFeatures.forEach(function (input) {
    input.addEventListener('change', inputChangeHandler);
  });

  var update = function () {
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

    selectedHouseFeatures.forEach(function (feature) {
      filteredAds = filteredAds.filter(function (item) {
        return item.offer.features.indexOf(feature) > -1;
      });
    });

    window.pin.render(filteredAds);
  };

  window.filter = {
    update: update
  };
})();


