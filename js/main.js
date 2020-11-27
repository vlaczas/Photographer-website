'use strict';
//consts
const BODY = document.querySelector('body');
const FIRST_PAGE = document.querySelector('.first-screen');
const SECOND_PAGE = document.querySelector('.second-screen');
const FORTH_PAGE = document.querySelector('.forth-screen');
const FIFTH_PAGE = document.querySelector('.fifth-screen');
const SIXTH_PAGE = document.querySelector('.sixth-screen');
const SEVENTH_PAGE = document.querySelector('.seventh-screen');
const LOGO = document.querySelector('.logo');
const swipablePics = document.querySelectorAll('.swipe-scene__photo-left');

//to know the screen height
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 769) mobileScreen = false;
//to open screen with menu down blank
let open = true;
drawMenuWrapper(true, true);
window.addEventListener('load', () => drawMenuWrapper(false));

//to leave the page with anim
document.querySelectorAll('.leave-page').forEach(elem =>
  elem.addEventListener('click', event => {
    event.preventDefault();
    leavePageDelayed(event.currentTarget);
  })
);
function leavePageDelayed(element) {
  let targetURL = element.getAttribute('href');
  drawMenuWrapper(true);
  setTimeout(() => (window.location = targetURL), 900);
}
// LOGO animation
anime({
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
});
// MENU BUTTON ANIMATION start
let nav__buttonLine1 = anime({
  targets: '.nav__button-line:nth-of-type(1)',
  transformOrigin: 0,
  duration: 500,
  backgroundColor: 'rgb(255, 255, 255)',
  rotate: -67,
  translateX: -23,
  translateY: 15,
  easing: 'easeOutBack',
  autoplay: false,
});
let nav__buttonLine2 = anime({
  targets: '.nav__button-line:nth-of-type(2)',
  duration: 500,
  backgroundColor: 'rgb(255, 255, 255)',
  width: '33%',
  translateY: 5,
  translateX: 1,
  easing: 'easeOutBack',
  autoplay: false,
});
let nav__buttonLine3 = anime({
  targets: '.nav__button-line:nth-of-type(3)',
  duration: 500,
  backgroundColor: 'rgb(255, 255, 255)',
  rotate: 67,
  translateX: 7,
  translateY: 7,
  easing: 'easeOutBack',
  autoplay: false,
});
// MENU BUTTON ANIMATION end

//Menu list animation
document.querySelectorAll('.another-page-link').forEach(elem =>
  elem.addEventListener('click', event => {
    event.preventDefault();
    let current = event.currentTarget;
    nav__button.click();
    setTimeout(() => {
      window.location.href = `${current.getAttribute('href')}`;
    }, 850);
  })
);

let header__menuListOpened = anime({
  targets: ['.menu li', '.menu__contacts img'],
  duration: 550,
  delay: anime.stagger(100, { start: 100 }),
  translateY: [150, 0],
  opacity: [0, 1],
  autoplay: false,
  easing: 'easeOutCubic',
});
let header__menuListClosed = anime({
  targets: ['.menu li', '.menu__contacts img'],
  duration: 350,
  delay: anime.stagger(40),
  translateY: [0, -50],
  opacity: [1, 0],
  autoplay: false,
  easing: 'easeOutCubic',
});

// MENU BUTTON LISTENER
let nav__button = document.querySelector('.nav__button');
let header__menu = document.querySelector('.header__menu');
let menuCounterClicks = 0;
nav__button.addEventListener('click', () => {
  if (menuCounterClicks == 0) {
    nav__buttonLine1.play();
    nav__buttonLine3.play();
    nav__buttonLine2.play();
    header__menuListOpened.play();
    setTimeout(() => document.querySelector('.menu').classList.toggle('flex'), 300);
    menuCounterClicks++;
    drawMenuWrapper();
  } else {
    nav__buttonLine1.reverse();
    nav__buttonLine3.reverse();
    nav__buttonLine2.reverse();
    nav__buttonLine1.play();
    nav__buttonLine3.play();
    nav__buttonLine2.play();

    if (document.querySelector('.menu').classList.contains('flex')) {
      setTimeout(() => document.querySelector('.menu').classList.toggle('flex'), 450);
      header__menuListClosed.play();
    } else {
      header__menuListOpened.play();
      document.querySelector('.menu').classList.toggle('flex');
    }
    drawMenuWrapper(open);
  }
});

//screen size change
window.addEventListener('orientationchange', () => {
  window.location.reload();
});

//menu drop-down animation
//drawing menu

const ctx = canva.getContext('2d');
function drawMenuWrapper(opened = true, instantly = false) {
  canva.width = window.innerWidth;
  canva.height = window.innerHeight * 1.2;
  let contrPointY;
  if (!opened) contrPointY = canva.height;
  else contrPointY = 0;
  const capStart = canva.height / 5;
  const capEnd = canva.height + capStart / 2;
  let speedSlow = canva.height / 100;
  let speedFast = canva.height / 25;
  if (instantly) {
    speedSlow = canva.height;
    speedFast = canva.height;
  }
  let menuY = contrPointY;
  window.requestAnimationFrame(drawMenu);
  function drawMenu() {
    // open menu canvas
    switch (opened) {
      case true:
        if (contrPointY <= capStart) contrPointY += speedSlow;
        else if (contrPointY < capEnd) {
          contrPointY += speedFast;
          menuY += speedFast;
        } else {
          menuY += speedSlow;
        }
        break;
      //close menu canvas
      case false:
        if (contrPointY >= canva.height - capStart) contrPointY -= speedSlow;
        else if (contrPointY >= -capStart / 2) {
          contrPointY -= speedFast;
          menuY -= speedFast;
        } else {
          menuY -= speedSlow;
        }
        break;
    }
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.fillStyle = 'rgb(239, 209, 174)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, menuY);
    ctx.quadraticCurveTo(canva.width / 2, contrPointY, canva.width, menuY);
    ctx.lineTo(canva.width, 0);
    ctx.fill();
    if (menuY <= canva.height && menuY >= 0) {
      window.requestAnimationFrame(drawMenu);
    }
  }
  if (!open) {
    setTimeout(() => (canva.height = 0), 900);
  }
  open = !open;
}

//Animation of first screen text
anime({
  targets: '.header__text-video',
  translateY: [-100, 0],
  opacity: 1,
  duration: 500,
  delay: 500,
  easing: 'linear',
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

let iPhoneLeftPos;
let rgbColor = 0;
let rgbColorRedBlue = 255;
let rgbColorRed = 255;
let rgbColorGreen = 255;
let backgroundColorChangeY;
let screenFiveMoveEnd;
function backColorAnim() {
  //anim of BRANDS screen
  if (scrollY < FORTH_PAGE.offsetTop) BODY.style.backgroundColor = `rgb(0, 0, 0)`;

  //black after white
  if (scrollY > SEVENTH_PAGE.offsetTop - 100) {
    rgbColorRedBlue = (SEVENTH_PAGE.offsetTop - 100 - scrollY) * 2 + 209;
    rgbColorRedBlue < 0 ? (rgbColorRedBlue = 0) : false;
    rgbColorRed = (SEVENTH_PAGE.offsetTop - 100 - scrollY) * 2.5 + 238;
    rgbColorRed < 0 ? (rgbColorRed = 0) : false;
    rgbColorGreen = (SEVENTH_PAGE.offsetTop - 100 - scrollY) * 1.7 + 174;
    rgbColorGreen < 0 ? (rgbColorGreen = 0) : false;
    BODY.style.backgroundColor = `rgb(${rgbColorRed},${rgbColorRedBlue},${rgbColorGreen})`;
    return;
  }
  //white
  if (scrollY > SIXTH_PAGE.offsetTop - 100) {
    rgbColorRedBlue = (SIXTH_PAGE.offsetTop - 100 - scrollY) / 2 + 255;
    rgbColorRedBlue < 209 ? (rgbColorRedBlue = 209) : false;
    rgbColorRed = (SIXTH_PAGE.offsetTop - 100 - scrollY) / 4 + 255;
    rgbColorRed < 239 ? (rgbColorRed = 239) : false;
    rgbColorGreen = SIXTH_PAGE.offsetTop - 100 - scrollY + 255;
    rgbColorGreen < 174 ? (rgbColorGreen = 174) : false;
    BODY.style.backgroundColor = `rgb(${rgbColorRed},${rgbColorRedBlue},${rgbColorGreen})`;
    return;
  }
  //anim of backgroud color white
  if (scrollY > FORTH_PAGE.offsetTop - 100) {
    rgbColor > 255 ? (rgbColor = 255) : (rgbColor = (scrollY - FORTH_PAGE.offsetTop - 100) * 1.5);
    BODY.style.backgroundColor = `rgb(${rgbColor},${rgbColor},${rgbColor})`;
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

//SCREEN 4 SWIPE
let targetOfSwipe;
let diffX;
let mainDiffY;
let diffY;
let zIndexIterator = 4;

let anchorPic = document.querySelector('.swipe-scene__photo-right');
const anchorPicTop = window.getComputedStyle(anchorPic).getPropertyValue('top');
anchorPic.addEventListener('click', moveBack, { once: true });

swipablePics.forEach(elem => {
  elem.addEventListener('touchend', endSwipe, { once: true });
  elem.addEventListener('touchmove', moveSwipe);
  elem.addEventListener('touchstart', startSwipe, { once: true });
});
document
  .querySelector('.swipe-scene__photo:nth-last-of-type(2)')
  .addEventListener('pointerdown', () => fadeout.play(), { once: true });
let fadeout = anime({
  targets: '.swipe-call',
  opacity: 0,
  easing: 'linear',
  autoplay: false,
  complete: anime => (anime.animatables[0].target.style.display = 'none'),
});

function startSwipe(event) {
  event.preventDefault();
  targetOfSwipe = event.target;
  targetOfSwipe.style.zIndex = ++zIndexIterator;
  diffY = event.changedTouches[0].clientY - targetOfSwipe.getBoundingClientRect().top;
  diffX =
    event.changedTouches[0].clientX - targetOfSwipe.getBoundingClientRect().left - event.changedTouches[0].radiusX;
}
function moveSwipe(event) {
  event.preventDefault();
  mainDiffY = event.changedTouches[0].pageY - FORTH_PAGE.offsetTop;
  targetOfSwipe.style.top = mainDiffY - diffY + 'px';
  if (event.changedTouches[0].clientX - diffX + targetOfSwipe.width > window.innerWidth - 25) {
    return;
  }
  targetOfSwipe.style.left = event.changedTouches[0].clientX - diffX + 'px';
}

function endSwipe(event) {
  event.preventDefault();
  anime({
    targets: targetOfSwipe,
    left: '65%',
    top: `${anchorPicTop}`,
    duration: 300,
    easing: 'linear',
    width: '25%',
    rotate: 10,
    complete: anim => {
      anim.animatables[0].target.removeEventListener('touchmove', moveSwipe);
      anim.animatables[0].target.addEventListener('click', moveBack, {
        once: true,
      });
    },
  });
}

function moveBack(event) {
  event.target.style.zIndex = ++zIndexIterator;
  anime({
    targets: event.target,
    left: '5%',
    top: FORTH_PAGE.clientHeight * 0.55,
    width: '50%',
    rotate: -5,
    duration: 300,
    easing: 'linear',
    complete: anim => {
      anim.animatables[0].target.addEventListener('touchend', endSwipe, {
        once: true,
      });
      anim.animatables[0].target.addEventListener('touchmove', moveSwipe);
      anim.animatables[0].target.addEventListener('touchstart', startSwipe, {
        once: true,
      });
    },
  });
}
//Screen 5 Iphone animation swipe
let iphoneImg = document.querySelector('.fifth-screen__iphone-pic');
iphoneImg.addEventListener('touchstart', handleStartSwipe);
iphoneImg.addEventListener('touchmove', handleMoveSwipe);
iphoneImg.addEventListener('touchend', handleEndSwipe);
let touchFirst;
let currentBackgroundPosX = window.innerWidth * 0.03;
let listNumberOfImg = 2;
function handleStartSwipe(event) {
  event.preventDefault();
  touchFirst = event.touches[0].clientX;
}
function handleMoveSwipe(event) {
  event.preventDefault();
  let touchActive = event.touches[0].clientX;
  let swiperPos = touchActive - touchFirst + currentBackgroundPosX;
  iphoneImg.style.backgroundPosition = `${swiperPos}px 1vh`;
}
function handleEndSwipe(event) {
  let touchLast = event.changedTouches[0].clientX;

  if (touchFirst > touchLast) {
    currentBackgroundPosX -= iphoneImg.clientWidth * 0.9;
    if (currentBackgroundPosX < -(iphoneImg.clientWidth * 0.9 * (listNumberOfImg - 1)))
      currentBackgroundPosX += iphoneImg.clientWidth * 0.9;
    iphoneImg.style.backgroundPosition = `${currentBackgroundPosX}px 1vh`;
  } else {
    currentBackgroundPosX += iphoneImg.clientWidth * 0.9;
    if (currentBackgroundPosX > window.innerWidth * 0.03) currentBackgroundPosX = window.innerWidth * 0.03;
    iphoneImg.style.backgroundPosition = `${currentBackgroundPosX}px 1vh`;
  }
}

//SCREEN 6 Grid anim

let flipper;

let anchor = document.querySelectorAll('.anchor');
anchor.forEach(elem => {
  elem.addEventListener('click', flipImg);
});
let arrow_back = document.querySelector('.arrow-back');
arrow_back.onclick = () => {
  flipper.reverse();
  flipper.play();
  anchor.forEach(elem => {
    elem.addEventListener('click', flipImg);
  });
};
function flipImg(event) {
  let targetSessionClass = [...event.currentTarget.classList].find(elem => elem.includes('session'));

  anchor.forEach(elem => {
    elem.removeEventListener('click', flipImg);
  });

  flipper = anime.timeline({
    delay: anime.stagger(70),
    duration: 200,
    easing: 'linear',
  });
  flipper.add({
    targets: '.anchor',
    rotateY: [0, 90],
  });
  flipper.add({
    targets: `img.${targetSessionClass}`,
    rotateY: [90, 180],
    begin: function (anim) {
      for (let item of anim.animatables) {
        item.target.classList.add('onTop');
      }
    },
  });
  flipper.add(
    {
      targets: arrow_back,
      translateX: [-50, 0],
      translateY: ['-50%', '-50%'],
      duration: 300,
    },
    '-=300'
  );
}

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
      if (str.indexOf('<br>') > 0 && str.indexOf('<br>') < 60) {
        arr.splice(
          str.indexOf('<br>'),
          0,
          ' <span>...&nbsp;</span><button class="insta-post__more" type="button">ещё</button>'
        );
        str = arr.join('');
      } else {
        arr.splice(60, 0, '<span>...&nbsp;</span><button class="insta-post__more" type="button">ещё</button>');
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
            event.target.remove();
          },
        });
      })
    );
  });

//main-button anim
const mainButton = document.querySelectorAll('.main-button');
let currButton;
mainButton.forEach(elem => elem.addEventListener('mousemove', move3d));

function move3d(event) {
  currButton = event.target;
  //define middle of the button to contol the movement
  let width = currButton.clientWidth / 2;
  let height = currButton.clientHeight / 2;
  let x = event.clientX - currButton.getBoundingClientRect().left;
  let y = event.clientY - currButton.getBoundingClientRect().top;
  anime({
    targets: currButton,
    rotateY: (x - width) / 10,
    rotateX: -(y - height),
    translateZ: [-10, -10],
    duration: 0,
  });
}

mainButton.forEach(elem =>
  //back to normal position
  elem.addEventListener('mouseleave', event => {
    currButton.style.transform = '';
    anime({
      targets: currButton,
      duration: 200,
      rotateY: 0,
      rotateX: 0,
      translateZ: [-10, -10],
    });
  })
);
mainButton.forEach(elem =>
  elem.addEventListener('click', event => {
    anime({
      targets: currButton,
      duration: 100,
      direction: 'alternate',
      translateZ: -30,
    });
  })
);

//drop down menu animation 3d
const mainMenu = document.querySelector('.menu');
const menuItems = document.querySelector('.menu__list');
mainMenu.addEventListener('mousemove', move3dmenu);

function move3dmenu(event) {
  //define middle of the button to contol the movement
  let width = menuItems.clientWidth / 2;
  let height = menuItems.clientHeight / 2;
  let x = event.clientX - menuItems.getBoundingClientRect().left;
  let y = event.clientY - menuItems.getBoundingClientRect().top;
  anime({
    targets: menuItems,
    rotateY: (x - width) / 400,
    rotateX: -(y - height) / 400,
    translateZ: [-20, -20],
    duration: 100,
    easing: 'linear',
  });
}

//footer animation
document.querySelectorAll('.footer__button').forEach(elem => elem.addEventListener('click', animRect));
function animRect(event) {
  let target = event.target.parentElement;
  let animeRect = anime.timeline({
    targets: '.arrow-left',
    duration: 300,
    easing: 'easeInOutQuint',
  });
  animeRect.add({
    right: [10, -10],
  });
  animeRect.add(
    {
      targets: '.arrow-right',
      left: [10, -10],
    },
    0
  );
  animeRect.add({
    targets: '.arrow-left',
    translateX: 10,
    translateY: -10,
    rotate: 90,
  });
  animeRect.add(
    {
      targets: '.arrow-right',
      rotate: [180, 270],
      translateX: -10,
      translateY: -10,
      complete: () => leavePageDelayed(target),
    },
    300
  );
}

//lazy loading for images class
// let lazyImgs = document.querySelectorAll('.lazy-load');
// let lazyObserver = new IntersectionObserver(lazyLoad, {rootMargin: '100px'});
// lazyImgs.forEach(elem => lazyObserver.observe(elem));
// function lazyLoad(entries, observer) {
//   entries.forEach(entry => {
//     if(entry.isIntersecting) {
//     let image = entry.target;
//     image.src = image.dataset.src;
//     image.classList.remove('lazy-load');
//     image.unobserve(image);
//   }});
// };
