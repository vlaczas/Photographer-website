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
