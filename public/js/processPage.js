import move3d from '../modules/mainButton.js';

('use strict');

const slider = document.querySelector('.before-after__slider');
const imgUp = document.querySelector('.imgUp');
const sliderButton = document.querySelector('.slider-button');
slider.addEventListener('input', (event) => {
  const sliderPos = event.target.value;
  imgUp.style.width = `${sliderPos}%`;
  sliderButton.style.left = `calc(${sliderPos}% - 18px)`;
});
