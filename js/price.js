import move3d from '../modules/mainButton.js';

('use strict');

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false;

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

//calculator logic
//type of ph
const typePhList = document.querySelectorAll(`input[name='type-ph']`);
typePhList.forEach(element => {
  element.addEventListener('change', addSecondQuestion);
});
hours_number.oninput = () => console.log(hours_number.value);

function addSecondQuestion(event) {
   
}