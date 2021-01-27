"use strict";

var _mainButton = _interopRequireDefault(require("../modules/mainButton.js"));

var _initImgs = _interopRequireDefault(require("../modules/initImgs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

'use strict';

(0, _initImgs["default"])(); //consts

var BODY = document.querySelector('body');
var FIRST_PAGE = document.querySelector('.first-screen');
var SECOND_PAGE = document.querySelector('.second-screen');
var THIRD_PAGE = document.querySelector('.third-screen');
var FORTH_PAGE = document.querySelector('.forth-screen');
var FIFTH_PAGE = document.querySelector('.fifth-screen');
var SIXTH_PAGE = document.querySelector('.love-story');
var SEVENTH_PAGE = document.querySelector('.seventh-screen');
var LOGO = document.querySelector('.logo');
var SECTION_HEADERS = document.querySelectorAll('.section-header'); //to know the screen height

var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
var mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false; //mouse move anim

if (!mobileScreen) {
  var cursor = document.querySelectorAll('.cursor');
  cursor.forEach(function (item) {
    return item.style.display = 'block';
  });
  document.addEventListener('mousemove', function (event) {
    cursor.forEach(function (item) {
      anime({
        targets: item,
        duration: 0,
        easing: 'linear',
        left: event.clientX,
        top: event.clientY
      });
    });
  });
} // LOGO animation


var logoAnim = anime({
  targets: '.logo path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1200,
  delay: anime.stagger(500, {
    start: 1200
  }),
  begin: function begin(anim) {
    LOGO.style.opacity = '1';
  },
  complete: function complete(anim) {
    document.querySelectorAll('.logo path').forEach(function (element) {
      element.setAttribute('fill', 'white');
      var i = 0;
      var opacityFill = setInterval(function () {
        element.setAttribute('fill-opacity', "".concat(i));
        i += 0.1;
        if (i > 1.1) clearInterval(opacityFill);
      }, 20);
    });
  },
  autoplay: false
}); //Animation of first screen text

var titleAnim = anime({
  targets: '.header__text-video',
  translateY: [-100, 0],
  opacity: 1,
  duration: 500,
  delay: 500,
  easing: 'linear',
  autoplay: false
});
window.addEventListener('load', function () {
  titleAnim.play();
  logoAnim.play();
  iphoneImg.style.background = "url(media/brands-slider.jpg) 0 50% / 1135% no-repeat transparent";
}); //Scroll listener
//SCREEN 2 animation

var animDesktopQ1, animDesktopQ2, animDesktopQ3, animDesktopQ4, animDesktopQ5;

if (!mobileScreen) {
  animDesktopQ1 = anime({
    targets: '.q1',
    translateX: [-150, '-250px'],
    translateY: [0, -50],
    rotate: [-13, -33],
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });
  animDesktopQ2 = anime({
    targets: '.q2',
    translateX: [150, 250],
    translateY: [0, -90],
    rotate: [3, 33],
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });
  animDesktopQ3 = anime({
    targets: '.q3',
    translateX: [-150, -350],
    translateY: [0, 90],
    rotate: [-10, 13],
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });
  animDesktopQ4 = anime({
    targets: '.q4',
    translateX: [150, 300],
    translateY: [0, 50],
    rotate: [10, -33],
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });
  animDesktopQ5 = anime({
    targets: '.q5',
    translateX: [-50, 300],
    translateY: [120, 200],
    rotate: [-10, 33],
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });
}

document.addEventListener('scroll', questAnim);

function questAnim() {
  if (scrollY > SECOND_PAGE.offsetTop * 0.7) {
    document.addEventListener('scroll', backColorAnim);
    document.removeEventListener('scroll', questAnim);

    if (mobileScreen) {
      var animationOddQuest = anime({
        targets: ['.questions__question:nth-child(4n+1)', '.questions__answer:nth-child(4n-2)'],
        translateX: [100, 'calc(calc(-50vw + 50%) + 5vw)'],
        delay: anime.stagger(600),
        duration: 700,
        easing: 'cubicBezier(0.405, 0.510, 0.480, 1.150)'
      });
      var animationEvenQuest = anime({
        targets: ['.questions__question:nth-child(4n-1)', '.questions__answer:nth-child(4n)'],
        translateX: [-100, 'calc(calc(50vw - 50%) - 5vw)'],
        delay: anime.stagger(600, {
          start: 300
        }),
        duration: 700,
        easing: 'cubicBezier(0.405, 0.510, 0.480, 1.150)'
      });
    } else {
      animDesktopQ1.play();
      animDesktopQ2.play();
      animDesktopQ3.play();
      animDesktopQ4.play();
      animDesktopQ5.play();
    }
  }
}

var rgbColor = 0;

function backColorAnim() {
  //anim of BRANDS screen
  if (scrollY < FORTH_PAGE.offsetTop - 250) {
    BODY.style.backgroundColor = "rgb(0, 0, 0)";
    SECTION_HEADERS.forEach(function (elem) {
      return elem.style.color = "rgb(0, 0, 0)";
    });
  } //black after white


  if (scrollY > SIXTH_PAGE.offsetTop - 100) {
    rgbColor < 0 ? rgbColor = 0 : (rgbColor = 255 + (SIXTH_PAGE.offsetTop - 100 - scrollY)) * 1.5;
    BODY.style.backgroundColor = "rgb(".concat(rgbColor, ",").concat(rgbColor, ",").concat(rgbColor, ")");
    SECTION_HEADERS.forEach(function (elem) {
      return elem.style.color = "rgb(".concat(rgbColor, ",").concat(rgbColor, ",").concat(rgbColor, ")");
    });
    return;
  } //anim of background color white


  if (scrollY > FORTH_PAGE.offsetTop - 250) {
    rgbColor > 255 ? rgbColor = 255 : rgbColor = (scrollY - FORTH_PAGE.offsetTop + 250) * 1.5;
    BODY.style.backgroundColor = "rgb(".concat(rgbColor, ",").concat(rgbColor, ",").concat(rgbColor, ")");
    SECTION_HEADERS.forEach(function (elem) {
      return elem.style.color = "rgb(".concat(rgbColor, ",").concat(rgbColor, ",").concat(rgbColor, ")");
    });
  }
} //SVG SCREEN 3


var photosession_svg = document.querySelector('.photosession-svg');
photosession_svg.addEventListener('click', function () {
  camera.setAttribute('fill-opacity', '1');
  cameraLight.setAttribute('fill-opacity', '1');
  setTimeout(function () {
    camera.setAttribute('fill-opacity', '0');
    cameraLight.setAttribute('fill-opacity', '0');
  }, 120);
}); //SCREEN 4

document.querySelectorAll('.hover-scale').forEach(function (elem) {
  elem.addEventListener('mouseenter', function () {
    anime({
      targets: elem,
      duration: 500,
      easing: 'linear',
      scaleX: 1.05,
      scaleY: 1.05
    });
  });
  elem.addEventListener('mouseout', function () {
    anime({
      targets: elem,
      duration: 500,
      easing: 'linear',
      scaleX: 1,
      scaleY: 1
    });
  });
}); //upward anim of images

var upwardAnimImages = document.querySelectorAll('.upward-anim');
var upwardObserver = new IntersectionObserver(upwardAnim, {
  rootMargin: '-50px'
});
upwardAnimImages.forEach(function (elem) {
  return upwardObserver.observe(elem);
});

function upwardAnim(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var image = entry.target;
      image.classList.remove('lazy-load');
      upwardObserver.unobserve(image);
      anime({
        targets: image,
        easing: 'linear',
        duration: 300,
        translateY: [300, 0]
      });
    }
  });
} //Screen 5 Iphone animation swipe


var leftArrow = document.querySelector('.fifth-screen__arrow-left');
var rightArrow = document.querySelector('.fifth-screen__arrow-right');
leftArrow.addEventListener('click', handleEndSwipe);
rightArrow.addEventListener('click', handleEndSwipe);
var iphoneImg = document.querySelector('.fifth-screen__iphone-pic');
iphoneImg.addEventListener('touchstart', handleStartSwipe);
iphoneImg.addEventListener('touchmove', handleMoveSwipe);
iphoneImg.addEventListener('touchend', handleEndSwipe);
var touchFirst;
var currentBackgroundPosX = 0;
var numberOfImg = 12;

function handleStartSwipe(event) {
  event.preventDefault();
  touchFirst = event.touches[0].clientX;
}

function handleMoveSwipe(event) {
  event.preventDefault();
  var touchActive = event.touches[0].clientX;
  var swiperPos = touchActive - touchFirst + currentBackgroundPosX;
  iphoneImg.style.backgroundPosition = "".concat(swiperPos, "px 50%");
}

function handleEndSwipe(event) {
  var touchLast;

  try {
    touchLast = event.changedTouches[0].clientX;
    touchLast = touchFirst > touchLast;
  } catch (error) {
    event.target.classList.contains('arrow-left') ? touchLast = false : touchLast = true;
  }

  if (touchLast) {
    currentBackgroundPosX -= iphoneImg.clientWidth * 0.945;
    if (currentBackgroundPosX < -(iphoneImg.clientWidth * (numberOfImg - 1))) currentBackgroundPosX += iphoneImg.clientWidth * 0.945;
    iphoneImg.style.backgroundPosition = "".concat(currentBackgroundPosX, "px 50%");
  } else {
    currentBackgroundPosX += iphoneImg.clientWidth * 0.945;
    if (currentBackgroundPosX > 0) currentBackgroundPosX = 0;
    iphoneImg.style.backgroundPosition = "".concat(currentBackgroundPosX, "px 50%");
  }
} //SCREEN 7


var postContentFiller = document.querySelectorAll('.insta-post__content-filler');
var postLikes = document.querySelectorAll('.insta-post__likes');
var postDate = document.querySelectorAll('.insta-post__date');
var postPhoto = document.querySelectorAll('.insta-post__photo > img');
var postLink = document.querySelectorAll('.postLink');
var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
fetch('./js/jsons/data.json').then(function (resp) {
  return resp.json();
}).then(function (opened) {
  for (var i = 0; i <= postContentFiller.length - 1; i++) {
    var postLinkCurrent = opened.last_post[i].shortcode;
    var date = new Date(opened.last_post[i].timestamp_taken * 1000);
    var dates = "".concat(date.getDate(), " ").concat(months[date.getMonth()]);
    var likes = opened.last_post[i].like;
    var photo = opened.last_post[i].display_url;
    var str = opened.last_post[i].caption.replace(/\n/g, '<br>');
    var arr = str.split('');

    if (str.indexOf('<br>') > 0 && str.indexOf('<br>') < 50) {
      arr.splice(str.indexOf('<br>'), 0, ' <span>...&nbsp;</span><button tabindex="0" class="insta-post__more noSelect focus-ring" type="button">ещё</button><span><br><br></span>');
      str = arr.join('');
    } else {
      arr.splice(50, 0, '<span>...&nbsp;</span><button tabindex="0" class="insta-post__more noSelect focus-ring" type="button">ещё</button><span><br><br></span>');
      str = arr.join('');
    }

    postContentFiller[i].innerHTML = str;
    postLikes[i].innerHTML = likes;
    postDate[i].innerHTML = dates;
    postPhoto[i].setAttribute('src', photo);
    postLink[i].setAttribute('href', "https://www.instagram.com/p/".concat(postLinkCurrent, "/"));
  }
}).then(function () {
  var moreButton = document.querySelectorAll('.insta-post__content');
  moreButton.forEach(function (elem) {
    return elem.addEventListener('click', function (event) {
      if (!event.target.classList.contains('insta-post__more')) return;
      anime({
        targets: event.currentTarget,
        height: event.currentTarget.scrollHeight,
        duration: 1000,
        easing: 'easeInQuint',
        begin: function begin() {
          event.target.previousSibling.remove();
          event.target.nextSibling.remove();
          event.target.remove();
        }
      });
    });
  });
});