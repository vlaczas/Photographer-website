import initImgs from '../modules/initImgs.js';

('use strict');
initImgs();

let screenWidth = window.innerWidth;

const modal = document.querySelector('.modal');
const imgs = document.querySelectorAll('img');
const openedImg = document.querySelector('.wided');
imgs.forEach(elem => elem.addEventListener('click', openImg));

function openImg(event) {
  event.preventDefault();
  const img = event.target;
  if(img.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.setAttribute('src', img.getAttribute('src'));
}

modal.addEventListener('click', closeImg);
function closeImg(event) {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.removeAttribute('src'); 
}