//drop down menu animation 3d
const mainMenu = document.querySelector('.menu');
const menuItems = document.querySelector('.menu__list');
const logoLoader = document.querySelector('.logo-loader');
//to open screen with menu down blank
const screenHeight = window.innerHeight;+

document.documentElement.style.setProperty('--vh100', `${screenHeight}px`);

let open = true;
drawMenuWrapper(true, true, true);
window.addEventListener('load', loaderScreen);
//logo loader anim
let logoLoaderAnim;
if (logoLoader) {
  logoLoader.style.opacity = '1';
  logoLoader.style.display = 'flex';
  logoLoaderAnim = anime({
    targets: black_white_grad1,
    duration: 5000,
    easing: 'linear',
    offset: '100%',
    direction: 'alternate',
    loop: true,
  });
}
function loaderScreen() {
  drawMenuWrapper(false, false, true);
  logoLoaderAnim.remove(black_white_grad1);
  anime({
    targets: logoLoader,
    opacity: 0,
    duration: 300,
    easing: 'linear',
    begin: () => black_white_grad1.setAttribute('offset', '100%'),
    complete: () => (logoLoader.style.display = 'none'),
  });
}

let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false;

if (!mobileScreen) {
  mainMenu.addEventListener('mousemove', move3dmenu);
  //define middle of the button to contol the movement
  let width = menuItems.clientWidth / 2;
  let height = menuItems.clientHeight / 2;
  function move3dmenu(event) {
    let x = event.clientX - menuItems.getBoundingClientRect().left;
    let y = event.clientY - menuItems.getBoundingClientRect().top;
    anime({
      targets: menuItems,
      rotateY: (x - width) / 400,
      rotateX: -(y - height) / 400,
      translateZ: [40, 40],
      duration: 100,
      easing: 'linear',
    });
  }
}
// MENU BUTTON ANIMATION start
let nav__buttonLine1 = anime({
  targets: '.nav__button-line:nth-of-type(1)',
  transformOrigin: 0,
  duration: 500,
  rotate: -67,
  translateX: -23,
  translateY: 15,
  easing: 'easeOutBack',
  autoplay: false,
});
let nav__buttonLine2 = anime({
  targets: '.nav__button-line:nth-of-type(2)',
  duration: 500,
  width: '33%',
  translateY: 5,
  translateX: 1,
  easing: 'easeOutBack',
  autoplay: false,
});
let nav__buttonLine3 = anime({
  targets: '.nav__button-line:nth-of-type(3)',
  duration: 500,
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
  delay: anime.stagger(100, { start: 300 }),
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
    setTimeout(() => mainMenu.classList.toggle('flex'), 300);
    menuCounterClicks++;
    drawMenuWrapper();
  } else {
    nav__buttonLine1.reverse();
    nav__buttonLine3.reverse();
    nav__buttonLine2.reverse();
    nav__buttonLine1.play();
    nav__buttonLine3.play();
    nav__buttonLine2.play();

    if (mainMenu.classList.contains('flex')) {
      setTimeout(() => mainMenu.classList.toggle('flex'), 450);
      header__menuListClosed.play();
    } else {
      header__menuListOpened.play();
      mainMenu.classList.toggle('flex');
    }
    drawMenuWrapper(open);
  }
});

//menu drop-down animation
//drawing menu
const ctx = canva.getContext('2d');
export default function drawMenuWrapper(opened = true, instantly = false, loadscreen = false) {
  canva.width = window.innerWidth;
  canva.height = window.innerHeight * 1.2;
  let contrPointY;
  if (!opened) contrPointY = canva.height;
  else contrPointY = 0;
  const capStart = canva.height / 5;
  const capEnd = canva.height + capStart / 2;
  let speedSlow = canva.height / 100;
  let speedFast = canva.height / 25;
  let menuY = contrPointY;
  if (instantly) {
    speedSlow = canva.height;
    speedFast = canva.height;
    menuY = canva.height;
  }
  if (loadscreen) {
    canva.style.zIndex = 1000;
  } else {
    canva.style.zIndex = 100;
  }
  
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
    ctx.lineWidth = 5;
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, menuY);
    ctx.quadraticCurveTo(canva.width / 2, contrPointY, canva.width, menuY);
    ctx.lineTo(canva.width, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgb(150, 150, 150)';
    ctx.stroke();
    if (menuY <= canva.height && menuY >= 0) {
      window.requestAnimationFrame(drawMenu);
    }
  }
  if (!open) {
    setTimeout(() => (canva.height = 0), 900);
  }
  open = !open;
}
