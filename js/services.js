

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 759) mobileScreen = false;
//to open screen with menu down blank
let open = true;
drawMenuWrapper(true, true);
window.addEventListener('load', drawMenuWrapper(false));

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
  if (document.querySelector('.menu').classList.contains('flex')) {
    document.querySelector('.menu').classList.toggle('flex');
    open = true;
    nav__buttonLine1.reverse();
    nav__buttonLine3.reverse();
    nav__buttonLine2.reverse();
    nav__buttonLine1.play();
    nav__buttonLine3.play();
    nav__buttonLine2.play();
    canva.height = '0';
  }
});

//menu drop-down animation
//drawing menu

const ctx = canva.getContext('2d');
function drawMenuWrapper(opened = true, instantly = false) {
  canva.width = document.documentElement.clientWidth;
  canva.height = document.documentElement.clientHeight * 1.2;
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

//drop down menu animation
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

const services = document.querySelectorAll('.services');
const services_scene = document.querySelector('.header-slider');
services_scene.addEventListener('touchstart', startSwipe);
services_scene.addEventListener('touchmove', moveSwipe);
services_scene.addEventListener('touchend', endSwipe);

let pointerType; 
let startX;
let currentPos = 0;
let diffX;
//define active tab to show
let activeTab = services[1];

//define start position
function startSwipe(event) {
  event.preventDefault();
  event.type === 'touchstart' ? pointerType = event.touches[0] : pointerType = event;
  startX = pointerType.clientX;
}
function moveSwipe(event) {
  event.preventDefault();
  event.type === 'touchmove' ? (pointerType = event.touches[0]) : (pointerType = event);
  diffX = pointerType.clientX - startX + currentPos;
  //initial left of the first elem
  let curr = 22;
  for (let elem of services) {
    if (diffX > 170) diffX = 160;
    else if (diffX < -490 ) diffX = -470;
      elem.style.transition = '';
    let leftPos = curr + diffX;
    elem.style.left = leftPos + 'px';
    //position to scale
        if (leftPos < 50) elem.style.transform = `translate(-50%) scale(1)`;
        else if (180 >= leftPos && leftPos > 50) {
          elem.style.transform = `translate(-50%) scale(${1 + (leftPos - 50) / 65})`;
          //define active Tab
          if (1 + (leftPos - 50) / 65 > 2.5) activeTab = elem;
        } else if (181 < leftPos && leftPos < 310) {
          elem.style.transform = `translate(-50%) scale(${3 - (leftPos - 181) / 65})`;
          if (3 - (leftPos - 181) / 65 > 2.5) activeTab = elem;
        } else elem.style.transform = `translate(-50%) scale(1)`;
    //add 158px for next elem in array
    curr += 158;
  }
  
}
//save end point to get the difference between old and new swipe
function endSwipe(event) {
  event.preventDefault();
  event.type === 'touchend' ? (pointerType = event.touches[0]) : (pointerType = event);
  currentPos = diffX;
}
//listen arrows to translate tabs
const arrows = document.querySelector('.arrows');
arrows.addEventListener('click', event => {

  let curr = 22;
  let diffX;
    if (event.target.classList.contains('arrow-left')) {
      diffX = 158 + currentPos;
    } else if (event.target.classList.contains('arrow-right')) {
      diffX = -158 + currentPos;
    } else {
      return;
    }
      services.forEach(elem => {
        if (diffX > 170) diffX = 160;
        else if (diffX < -490) diffX = -470;
        elem.style.transition = 'all 0.5s ease';
        let leftPos = curr + diffX;
        elem.style.left = leftPos + 'px';
        //position to scale
        if(leftPos<50) elem.style.transform = `translate(-50%) scale(1)`;
         else if (180 >= leftPos && leftPos > 50) {
          elem.style.transform = `translate(-50%) scale(${1 + (leftPos - 50) / 65})`;
          //define active Tab
          if (1 + (leftPos - 50) / 65 > 2.5) activeTab = elem;
          cont.innerHTML = activeTab.innerHTML;
        } else if (181 < leftPos && leftPos < 310) {
          elem.style.transform = `translate(-50%) scale(${3 - (leftPos - 181) / 65})`;
          if (3 - (leftPos - 181) / 65 > 2.5) activeTab = elem;
          cont.innerHTML = activeTab.innerHTML;
        }
        else elem.style.transform = `translate(-50%) scale(1)`;
        //add 158px for next elem in array
        curr += 158;
      });
    currentPos = diffX; 

})



//footer animation
document.querySelectorAll('.footer__button').forEach(elem => elem.addEventListener('click', animRect));
function animRect(event) {
  let target = event.target.parentElement;
  let animeRect = anime.timeline({
    targets: '.arrow-left',
    duration: 300,
    easing: 'easeInOutQuint'
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

