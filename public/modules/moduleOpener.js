import initImgs from '../modules/initImgs.js';

('use strict');

const modalOpenerButtons = document.querySelectorAll('.modal-opener');
const modalCompContainer = document.querySelector('.modal-comp__container');
const modalComp = document.querySelector('.modal-comp');
modalOpenerButtons.forEach(button => button.addEventListener('click', modalOpener));
let animModal;
let btnInModal;
export function modalOpener(event) {
  const target = event.target.closest('.modal-container');
  modalCompContainer.insertAdjacentHTML('afterbegin', target.innerHTML);
  if (window.innerWidth > window.innerHeight) {
    const modalHeaderImg = modalCompContainer.querySelector('.services-bundles__header-img');
    modalHeaderImg.src = modalHeaderImg.dataset.opened;
    const h2 = modalCompContainer.querySelector('h2');
    h2.style.display = 'none';
  } 
  modalComp.style.display = 'block';
  const main = modalCompContainer.querySelector('.services-bundles__main');
  main.style.display = 'block';
  btnInModal = modalCompContainer.querySelector('.modal-opener');
  btnInModal.style.transform = '';
  btnInModal.textContent = 'СВЕРНУТЬ';
  btnInModal.addEventListener('click', closeModal, { once: true });
  document.body.style.overflow = 'hidden';
  modalOpenerButtons.forEach(btn => (btn.disabled = true));

  animModal = anime({
    targets: modalComp,
    height: '90%',
    easing: 'easeInQuad',
    duration: 500,
    complete() {
      this.reverse();
    },
  });
  initImgs();
}

export function closeModal(event) {
  const target = event.target.closest('.modal-comp__container');
  animModal.play();
  animModal.finished.then(() => (target.innerHTML = ''));
  document.body.style.overflow = '';
  modalOpenerButtons.forEach(btn => (btn.disabled = false));
}
