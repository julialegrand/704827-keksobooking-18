'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var fileChooserHome = document.querySelector('.ad-form__upload input[type=file]');
  var previewHome = document.querySelector('.ad-form__photo');
  var defaultAvatar = fileChooserAvatar.src;
  var defaultHome = fileChooserHome.src;

  var isImage = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  var onImageLoad = function (file, load) {
    file.addEventListener('change', function () {
      var fileImage = file.files[0];
      if (isImage(fileImage)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          load.src = reader.result;
        });
        reader.readAsDataURL(fileImage);
      }
    });
  };
  onImageLoad(fileChooserAvatar, preview);

  var onImageHomeLoad = function (file, loadFoto) {
    file.addEventListener('change', function () {
      var fileImage = file.files[0];
      if (isImage(fileImage)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var img = document.createElement('img');
          img.width = '60';
          img.height = '60';
          img.src = reader.result;
          loadFoto.appendChild(img);
        });
        reader.readAsDataURL(fileImage);
      }
    });
  };
  onImageHomeLoad(fileChooserHome, previewHome);
  window.images = {
    defaultAvatar: defaultAvatar,
    defaultHome: defaultHome
  };
})();
