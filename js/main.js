import { footerAnim, leavePageDelayed } from '../modules/footerAnim.js';
import move3d from '../modules/mainButton.js';
import initImgs from '../modules/initImgs.js';

('use strict');

initImgs();

//consts
const BODY = document.querySelector('body');
const FIRST_PAGE = document.querySelector('.first-screen');
const SECOND_PAGE = document.querySelector('.second-screen');
const THIRD_PAGE = document.querySelector('.third-screen');
const FORTH_PAGE = document.querySelector('.forth-screen');
const FIFTH_PAGE = document.querySelector('.fifth-screen');
const SIXTH_PAGE = document.querySelector('.love-story');
const SEVENTH_PAGE = document.querySelector('.seventh-screen');
const LOGO = document.querySelector('.logo');
const SECTION_HEADERS = document.querySelectorAll('.section-header');

//to know the screen height
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false;

//mouse move anim
if (!mobileScreen) {
  let cursor = document.querySelectorAll('.cursor');
  cursor.forEach(item => (item.style.display = 'block'));
  document.addEventListener('mousemove', event => {
    cursor.forEach((item, index) => {
      anime({
        targets: item,
        duration: 0,
        easing: 'linear',
        left: event.clientX,
        top: event.clientY,
      });
    });
  });
}
//to leave the page with anim
document.querySelectorAll('.leave-page').forEach(elem =>
  elem.addEventListener('click', event => {
    event.preventDefault();
    leavePageDelayed(event.currentTarget);
  })
);

// LOGO animation
const logoAnim = anime({
  targets: '.logo path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1200,
  delay: anime.stagger(500, { start: 1200 }),
  begin: function (anim) {
    LOGO.style.opacity = '1';
  },
  complete: function (anim) {
    document.querySelectorAll('.logo path').forEach(element => {
      element.setAttribute('fill', 'white');
      let i = 0;
      let opacityFill = setInterval(() => {
        element.setAttribute('fill-opacity', `${i}`);
        i += 0.1;
        if (i > 1.1) clearInterval(opacityFill);
      }, 20);
    });
  },
  autoplay: false,
});

//Animation of first screen text
const titleAnim = anime({
  targets: '.header__text-video',
  translateY: [-100, 0],
  opacity: 1,
  duration: 500,
  delay: 500,
  easing: 'linear',
  autoplay: false,
});

window.addEventListener('load', () => {
  titleAnim.play();
  logoAnim.play();
});

//Scroll listener
//SCREEN 2 animation
let animDesktopQ1, animDesktopQ2, animDesktopQ3, animDesktopQ4, animDesktopQ5;
if (!mobileScreen) {
  animDesktopQ1 = anime({
    targets: '.q1',
    translateX: [-150, '-250px'],
    translateY: [0, -50],
    rotate: [-13, -33],
    duration: 1000,
    easing: 'linear',
    autoplay: false,
  });
  animDesktopQ2 = anime({
    targets: '.q2',
    translateX: [150, 250],
    translateY: [0, -90],
    rotate: [3, 33],
    duration: 1000,
    easing: 'linear',
    autoplay: false,
  });
  animDesktopQ3 = anime({
    targets: '.q3',
    translateX: [-150, -350],
    translateY: [0, 90],
    rotate: [-10, 13],
    duration: 1000,
    easing: 'linear',
    autoplay: false,
  });
  animDesktopQ4 = anime({
    targets: '.q4',
    translateX: [150, 300],
    translateY: [0, 50],
    rotate: [10, -33],
    duration: 1000,
    easing: 'linear',
    autoplay: false,
  });
  animDesktopQ5 = anime({
    targets: '.q5',
    translateX: [-50, 300],
    translateY: [120, 200],
    rotate: [-10, 33],
    duration: 1000,
    easing: 'linear',
    autoplay: false,
  });
}
document.addEventListener('scroll', questAnim);
function questAnim() {
  if (scrollY > SECOND_PAGE.offsetTop * 0.7) {
    document.addEventListener('scroll', backColorAnim);
    document.removeEventListener('scroll', questAnim);
    if (mobileScreen) {
      let animationOddQuest = anime({
        targets: ['.questions__question:nth-child(4n+1)', '.questions__answer:nth-child(4n-2)'],
        translateX: [100, 'calc(calc(-50vw + 50%) + 5vw)'],
        delay: anime.stagger(600),
        duration: 700,
        easing: 'cubicBezier(0.405, 0.510, 0.480, 1.150)',
      });
      let animationEvenQuest = anime({
        targets: ['.questions__question:nth-child(4n-1)', '.questions__answer:nth-child(4n)'],
        translateX: [-100, 'calc(calc(50vw - 50%) - 5vw)'],
        delay: anime.stagger(600, { start: 300 }),
        duration: 700,
        easing: 'cubicBezier(0.405, 0.510, 0.480, 1.150)',
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

let rgbColor = 0;
function backColorAnim() {
  //anim of BRANDS screen
  if (scrollY < FORTH_PAGE.offsetTop - 250) {
    BODY.style.backgroundColor = `rgb(0, 0, 0)`;
    SECTION_HEADERS.forEach(elem => (elem.style.color = `rgb(0, 0, 0)`));
  }
  //black after white
  if (scrollY > SIXTH_PAGE.offsetTop -100) {
    rgbColor < 0 ? (rgbColor = 0) : (rgbColor = 255 + (SIXTH_PAGE.offsetTop - 100 - scrollY)) * 1.5;
    BODY.style.backgroundColor = `rgb(${rgbColor},${rgbColor},${rgbColor})`;
    SECTION_HEADERS.forEach(elem => (elem.style.color = `rgb(${rgbColor},${rgbColor},${rgbColor})`));
    return;
  }
  //anim of background color white
  if (scrollY > FORTH_PAGE.offsetTop - 250) {
    rgbColor > 255 ? (rgbColor = 255) : (rgbColor = (scrollY - FORTH_PAGE.offsetTop + 250) * 1.5);
    BODY.style.backgroundColor = `rgb(${rgbColor},${rgbColor},${rgbColor})`;
    SECTION_HEADERS.forEach(elem => (elem.style.color = `rgb(${rgbColor},${rgbColor},${rgbColor})`));
  }
}
//SVG SCREEN 3
let photosession_svg = document.querySelector('.photosession-svg');
photosession_svg.addEventListener('click', () => {
  camera.setAttribute('fill-opacity', '1');
  cameraLight.setAttribute('fill-opacity', '1');
  setTimeout(() => {
    camera.setAttribute('fill-opacity', '0');
    cameraLight.setAttribute('fill-opacity', '0');
  }, 120);
});

//SCREEN 4
document.querySelectorAll('.hover-scale').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    anime({
      targets: elem,
      duration: 500,
      easing: 'linear',
      scaleX: 1.05,
      scaleY: 1.05,
    });
  });
  elem.addEventListener('mouseout', () => {
    anime({
      targets: elem,
      duration: 500,
      easing: 'linear',
      scaleX: 1,
      scaleY: 1,
    });
  });
});

//upward anim of images
let upwardAnimImages = document.querySelectorAll('.upward-anim');
let upwardObserver = new IntersectionObserver(upwardAnim, { rootMargin: '-50px' });
upwardAnimImages.forEach(elem => upwardObserver.observe(elem));
function upwardAnim(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let image = entry.target;
      image.classList.remove('lazy-load');
      upwardObserver.unobserve(image);
      anime({
        targets: image,
        easing: 'linear',
        duration: 300,
        translateY: [300, 0],
      });
    }
  });
}

//Screen 5 Iphone animation swipe
const leftArrow = document.querySelector('.fifth-screen__arrow-left');
const rightArrow = document.querySelector('.fifth-screen__arrow-right');
leftArrow.addEventListener('click', handleEndSwipe);
rightArrow.addEventListener('click', handleEndSwipe);
const iphoneImg = document.querySelector('.fifth-screen__iphone-pic');
iphoneImg.addEventListener('touchstart', handleStartSwipe);
iphoneImg.addEventListener('touchmove', handleMoveSwipe);
iphoneImg.addEventListener('touchend', handleEndSwipe);
let touchFirst;
let currentBackgroundPosX = 14;
const listNumberOfImg = 10;
function handleStartSwipe(event) {
  event.preventDefault();
  touchFirst = event.touches[0].clientX;
}
function handleMoveSwipe(event) {
  event.preventDefault();
  let touchActive = event.touches[0].clientX;
  let swiperPos = touchActive - touchFirst + currentBackgroundPosX;
  iphoneImg.style.backgroundPosition = `${swiperPos}px 50%`;
}
function handleEndSwipe(event) {
  let touchLast;
  try {
    touchLast = event.changedTouches[0].clientX;
    touchLast = touchFirst > touchLast;
  } catch (error) {
    event.target.classList.contains('arrow-left') ? (touchLast = false) : (touchLast = true);
  }

  if (touchLast) {
    currentBackgroundPosX -= iphoneImg.clientWidth * 0.91;
    if (currentBackgroundPosX < -(iphoneImg.clientWidth * 0.91 * (listNumberOfImg - 1)))
      currentBackgroundPosX += iphoneImg.clientWidth * 0.91;
    iphoneImg.style.backgroundPosition = `${currentBackgroundPosX}px 50%`;
  } else {
    currentBackgroundPosX += iphoneImg.clientWidth * 0.91;
    if (currentBackgroundPosX > 14) currentBackgroundPosX = 14;
    iphoneImg.style.backgroundPosition = `${currentBackgroundPosX}px 50%`;
  }
}

//SCREEN 6

//SCREEN 7
const postContentFiller = document.querySelectorAll('.insta-post__content-filler');
const postLikes = document.querySelectorAll('.insta-post__likes');
const postDate = document.querySelectorAll('.insta-post__date');
const postPhoto = document.querySelectorAll('.insta-post__photo > img');
const postLink = document.querySelectorAll('.postLink');
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
fetch('./js/jsons/data.json')
  .then(resp => resp.json())
  .then(opened => {
    for (let i = 0; i <= postContentFiller.length - 1; i++) {
      let postLinkCurrent = opened.last_post[i].shortcode;
      let date = new Date(opened.last_post[i].timestamp_taken * 1000);
      let dates = `${date.getDate()} ${months[date.getMonth()]}`;
      let likes = opened.last_post[i].like;
      let photo = opened.last_post[i].display_url;
      let str = opened.last_post[i].caption.replace(/\n/g, '<br>');
      let arr = str.split('');
      if (str.indexOf('<br>') > 0 && str.indexOf('<br>') < 50) {
        arr.splice(
          str.indexOf('<br>'),
          0,
          ' <span>...&nbsp;</span><button tabindex="0" class="insta-post__more noSelect focus-ring" type="button">ещё</button><span><br><br></span>'
        );
        str = arr.join('');
      } else {
        arr.splice(
          50,
          0,
          '<span>...&nbsp;</span><button tabindex="0" class="insta-post__more noSelect focus-ring" type="button">ещё</button><span><br><br></span>'
        );
        str = arr.join('');
      }
      postContentFiller[i].innerHTML = str;
      postLikes[i].innerHTML = likes;
      postDate[i].innerHTML = dates;
      postPhoto[i].setAttribute('src', photo);
      postLink[i].setAttribute('href', `https://www.instagram.com/p/${postLinkCurrent}/`);
    }
  })
  .then(() => {
    const moreButton = document.querySelectorAll('.insta-post__content');
    moreButton.forEach(elem =>
      elem.addEventListener('click', event => {
        if (!event.target.classList.contains('insta-post__more')) return;
        anime({
          targets: event.currentTarget,
          height: event.currentTarget.scrollHeight,
          duration: 1000,
          easing: 'easeInQuint',
          begin: () => {
            event.target.previousSibling.remove();
            event.target.nextSibling.remove();
            event.target.remove();
          },
        });
      })
    );
  });

