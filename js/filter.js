'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };
  var filterRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return data.offer.rooms === parseInt(filter.value, 10);
    },
    'housing-guests': function (data, filter) {
      return data.offer.guests === parseInt(filter.value, 10);
    },
    'housing-features': function (data, filter) {
      var houseFeatures = Array.from(filter.querySelectorAll('.map__features input:checked'));
      return houseFeatures.every(function (item) {
        return data.offer.features.some(function (feature) {
          return feature === item.value;
        });
      });
    }
  };
  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (element) {
        return (element.value === 'any') ? true : filterRules[element.id](item, element);
      });
    });
  };

  var onFormChange = window.util.debounce(function () {
    var filterElements = Array.from(mapFilters.children);
    window.pin.render(getFilterData(window.pin.ads, filterElements));
  });
  mapFilters.addEventListener('change', onFormChange);

  window.filter = {
    onFormChange: onFormChange
  };
})();


