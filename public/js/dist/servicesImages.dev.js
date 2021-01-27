"use strict";

var _initImgs = _interopRequireDefault(require("../modules/initImgs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

'use strict';

(0, _initImgs["default"])();
var screenWidth = window.innerWidth;
var mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false; //mouse move anim

if (!mobileScreen) {
  var cursor = document.querySelector('.cursor');
  cursor.style.display = 'block';
  document.addEventListener('mousemove', function (event) {
    anime({
      targets: cursor,
      duration: 0,
      easing: 'linear',
      left: event.clientX,
      top: event.clientY
    });
  });
}

var modal = document.querySelector('.modal');
var imgs = document.querySelectorAll('img');
var openedImg = document.querySelector('.wided');
imgs.forEach(function (elem) {
  return elem.addEventListener('click', openImg);
});

function openImg(event) {
  event.preventDefault();
  var img = event.target;
  if (img.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.setAttribute('src', img.getAttribute('src'));
}

modal.addEventListener('click', closeImg);

function closeImg(event) {
  event.preventDefault();
  var target = event.target;
  if (target.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.removeAttribute('src');
}