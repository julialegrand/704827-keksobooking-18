'use strict';

(function () {
  var houseType = 'any';

  var mapFilters = document.querySelector('.map__filters-container');
  var houseTypeFilter = mapFilters.querySelector('#housing-type');

  houseTypeFilter.addEventListener('change', function (evt) {
    houseType = evt.target.value;
    update();
  });

  var update = function () {
    var filteredAds = houseType === 'any' ? window.pin.ads : window.pin.ads.filter(function (item) {
      return item.offer.type === houseType;
    });

    window.pin.render(filteredAds);
  };

  window.filter = {
    update: update
  };
})();


