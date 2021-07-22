var close = document.querySelector('.close-button');
var over = document.querySelector('.overlay');
var popup = document.querySelector('.popup');

close.addEventListener('click', function () {
  popup.classList.remove('aactive');
  over.classList.remove('active');
});

over.addEventListener('click', function () {
  popup.classList.remove('aactive');
  over.classList.remove('active');
});

window.addEventListener('load', function () {
  setTimeout(function () {
    popup.classList.add('aactive');
    over.classList.add('active');
  }, 2000);
});
