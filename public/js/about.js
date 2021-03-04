import initImgs from '../modules/initImgs.js';

('use strict');
initImgs();

//anim of paragraphs
let animParas = document.querySelectorAll('.article');
let animObserver = new IntersectionObserver(parasAnim, { threshold: 1.0 });
animParas.forEach((elem) => animObserver.observe(elem));
function parasAnim(entries) {
  entries.forEach((entry) => {
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
