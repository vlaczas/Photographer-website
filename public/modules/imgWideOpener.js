('use strict')

const modal = document.querySelector('.modal');
const imgs = document.querySelectorAll('.lazy-load');
const openedImg = document.querySelector('.wided');
imgs.forEach(elem => elem.addEventListener('click', openImg));

export function openImg(event) {
  event.preventDefault();
  const img = event.target;
  if(img.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.setAttribute('src', img.getAttribute('src'));
}

modal.addEventListener('click', closeImg);
export function closeImg(event) {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('wided')) return;
  modal.classList.toggle('flex');
  openedImg.removeAttribute('src'); 
}


//you need to attach this to the root of the page and uncomment in css 
/* <div class="modal">
<div>
  <img class="wided" alt="">
  <span class="noSelect">X</span>
</div>
</div> */