"use strict";

var _initImgs = _interopRequireDefault(require("../modules/initImgs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

'use strict';

(0, _initImgs["default"])();
var screenHeight = window.innerHeight;
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
} //anim of paragraphs


var animParas = document.querySelectorAll('.article');
var animObserver = new IntersectionObserver(parasAnim, {
  threshold: 1.0
});
animParas.forEach(function (elem) {
  return animObserver.observe(elem);
});

function parasAnim(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var target = entry.target;
      var p = entry.target.querySelectorAll('p');
      animObserver.unobserve(target);
      anime({
        targets: p,
        easing: 'linear',
        duration: 500,
        delay: anime.stagger(300),
        opacity: 1
      });
    }
  });
}