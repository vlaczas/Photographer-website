import { footerAnim, leavePageDelayed } from '../modules/footerAnim.js';
import move3d from '../modules/mainButton.js';
import WebglHover from '../modules/webglAnim.js';

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false;

//to leave the page with anim
document.querySelectorAll('.leave-page').forEach(elem =>
  elem.addEventListener('click', event => {
    event.preventDefault();
    leavePageDelayed(event.currentTarget);
  })
);

//mouse move anim
if (!mobileScreen) {
  const cursor = document.querySelector('.cursor');
  cursor.style.display = 'block';
  document.addEventListener('mousemove', event => {
    anime({
      targets: cursor,
      duration: 0,
      easing: 'linear',
      left: event.clientX,
      top: event.clientY,
    });
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
  event.type === 'touchstart' ? (pointerType = event.touches[0]) : (pointerType = event);
  startX = pointerType.clientX;
}
function moveSwipe(event) {
  event.preventDefault();
  event.type === 'touchmove' ? (pointerType = event.touches[0]) : (pointerType = event);
  diffX = pointerType.clientX - startX + currentPos;
  //initial left of the first elem
  let curr = 23;
  for (let elem of services) {
    if (diffX > 170) diffX = 160;
    else if (diffX < -170) diffX = -160;
    elem.style.transition = '';
    let leftPos = curr + diffX;
    elem.style.left = leftPos + 'px';
    //position to scale
    if (leftPos < 50) elem.style.transform = `translate(-50%) scale(1)`;
    else if (181 >= leftPos && leftPos > 50) {
      elem.style.transform = `translate(-50%) scale(${1 + (leftPos - 50) / 65})`;
      //define active Tab
      if (1 + (leftPos - 50) / 65 > 2.5) activeTab = elem;
    } else if (182 < leftPos && leftPos < 310) {
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
arrows.addEventListener('click', arrowsMoveTab);

function arrowsMoveTab(event, numberOfTab) {
  let curr = 23;
  if (event?.target.classList.contains('arrow-left')) {
    diffX = 158 + currentPos;
  } else if (event?.target.classList.contains('arrow-right')) {
    diffX = -158 + currentPos;
  } else if (Number.isInteger(numberOfTab)) {
    diffX = 158 - 158 * numberOfTab;
    console.log(numberOfTab);
  } else {
    return;
  }

  services.forEach(elem => {
    if (diffX > 170) diffX = 160;
    else if (diffX < -170) diffX = -160;
    elem.style.transition = 'all 0.5s ease';
    let leftPos = curr + diffX;
    elem.style.left = leftPos + 'px';
    //position to scale
    if (leftPos < 50) elem.style.transform = `translate(-50%) scale(1)`;
    else if (181 >= leftPos && leftPos > 50) {
      elem.style.transform = `translate(-50%) scale(${1 + (leftPos - 50) / 65})`;
      //define active Tab
      if (1 + (leftPos - 50) / 65 > 2.5) activeTab = elem;
    } else if (182 < leftPos && leftPos < 310) {
      elem.style.transform = `translate(-50%) scale(${3 - (leftPos - 181) / 65})`;
      if (3 - (leftPos - 181) / 65 > 2.5) activeTab = elem;
    } else elem.style.transform = `translate(-50%) scale(1)`;
    //add 158px for next elem in array
    curr += 158;
  });
  currentPos = diffX;
};




//every slide webGL
document.querySelectorAll('.slide').forEach(slide => {
  const canvas = slide.querySelector('.canvas');
  const planeElement = slide.querySelector('.plane');
  new WebglHover({
    canvas,
    planeElement,
  });
});