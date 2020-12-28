import initImgs from '../modules/initImgs.js';

('use strict');
initImgs();

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

//anim of paragraphs
let animParas = document.querySelectorAll('.article');
let animObserver = new IntersectionObserver(parasAnim, {threshold: 1.0});
animParas.forEach(elem => animObserver.observe(elem));
function parasAnim(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let target = entry.target;
      let p = entry.target.querySelectorAll('p');
      animObserver.unobserve(target);
      anime({
        targets: p,
        easing: 'linear',
        duration: 500,
        delay: anime.stagger(300),
        opacity: 1,
      });
    }
  });
}