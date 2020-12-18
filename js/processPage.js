import { footerAnim, leavePageDelayed } from '../modules/footerAnim.js';

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

//thread anim
const canvaThread = document.querySelector('.canvas-thread');
const container = document.querySelector('.container');
const c = canvaThread.getContext('2d');
canvaThread.width = window.innerWidth;
canvaThread.height = container.scrollHeight;
let x = window.innerWidth / 2;
let y = -10;
let counter = 0;
let increase = ((90 / 180) * Math.PI) / 10;
let scr = 0;

document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  let target = window.scrollY - scr;
  scr = window.scrollY;
  c.clearRect(0, 0, canvaThread.width, canvaThread.height);
  c.lineWidth = 3;
  c.lineCap = 'round';
  c.moveTo(x, y);
  x = window.innerWidth / 2 + Math.sin(counter) * window.innerWidth * 0.45;
  y += target * 1.3;
  counter += increase;
  c.lineTo(x, y);
  c.strokeStyle = 'rgb(155, 155, 155)';
  c.stroke();
});
