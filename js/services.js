import WebglHover from '../modules/webglAnim.js';

document.querySelectorAll('.slide').forEach(slide => {
  const canvas = slide.querySelector('.canvas');
  const planeElement = slide.querySelector('.plane');
  new WebglHover({
    canvas,
    planeElement,
  });
});