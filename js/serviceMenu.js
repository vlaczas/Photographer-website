import move3d from '../modules/mainButton.js';
import WebglHover from '../modules/webglAnim.js';

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

const services = document.querySelectorAll('.services');
let currentPos = 0;
let diffX;
let currentTab = services[1];

//listen arrows to translate tabs
const arrows = document.querySelector('.arrows');
arrows.addEventListener('click', arrowsMoveTab);

function arrowsMoveTab(event, numberOfTab) {
  let curr = 23;
  if (event?.target.classList.contains('arrow-left')) {
    diffX = 158 + currentPos;
  } else if (event?.target.classList.contains('arrow-right')) {
    diffX = -158 + currentPos;
  } else if (Number.isInteger(numberOfTab)) {
    diffX = 158 - 158 * numberOfTab;
    console.log(numberOfTab);
  } else {
    return;
  }

  services.forEach(elem => {
    if (diffX > 170) diffX = 160;
    else if (diffX < -170) diffX = -160;
    let leftPos = curr + diffX;
    elem.style.left = leftPos + 'px';
    //position to scale
    if (leftPos < 50) elem.style.transform = `translate(-50%) scale(1)`;
    else if (181 >= leftPos && leftPos > 50) {
      elem.style.transform = `translate(-50%) scale(${1 + (leftPos - 50) / 65})`;
      //define active Tab
      if (1 + (leftPos - 50) / 65 > 2.5) moveTab(elem);
    } else if (182 < leftPos && leftPos < 310) {
      elem.style.transform = `translate(-50%) scale(${3 - (leftPos - 181) / 65})`;
      if (3 - (leftPos - 181) / 65 > 2.5) moveTab(elem);
    } else elem.style.transform = `translate(-50%) scale(1)`;
    //add 158px for next elem in array
    curr += 158;
  });
  currentPos = diffX;
}

//render new tab
let timer;
const userAction = document.querySelector('.user-action')
function moveTab(elem) {
  if (currentTab === elem) {
    return;
  } else {
    currentTab = elem;
  }

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    const tabContainer = document.querySelector('.current-tab');
    const tabNewContainer = document.createElement('div');
    tabNewContainer.classList.add('current-tab');
    tabNewContainer.insertAdjacentHTML('afterbegin', renderNewTab(currentTab));
    const tabAnim = anime.timeline({
      duration: 250,
      easing: 'linear',
    });
    tabAnim.add({
      targets: tabContainer,
      opacity: 0,
      complete: () => {
        tabContainer.remove();
        arrWebGL.forEach(elem => elem.webGLCurtain.dispose());
        arrWebGL = [];
        userAction.after(tabNewContainer);
        initWebGL();
        timer = null;
      },
    });
    tabAnim.add(
      {
        targets: tabNewContainer,
        opacity: [0, 1],
      },
      350
    );
  }, 600);
}


//html template of the tab + new link for the button
const button = document.querySelector('.button-scene');
function renderNewTab(tab) {
  let index = [...services].indexOf(tab);
  switch (index) {
    case 0:
      return `
          <div data-text="Love Story" class="slide text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="../media/masha_artur1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="../media/masha_artur2-services.jpg" />
              <img data-sampler="map" crossorigin src="../media/glmap.jpg" />
            </div>
          </div>

          <div class="slide text-left">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="../media/dasha_sasha1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="../media/dasha_sasha2-services.jpg" />
              <img data-sampler="map" crossorigin src="../media/glmap.jpg" />
            </div>
          </div>

          <div data-text="Family" class="slide text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" src="../media/family1-services.jpg" />
              <img data-sampler="texture1" src="../media/family2-services.jpg" />
              <img data-sampler="map" src="../media/glmap.jpg" />
            </div>
          </div>
`;
    case 1:
      button.setAttribute('href', '/pages/services/portraits.html');
      return `
<div data-text="Personal" class="slide text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="../media/portrait1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="../media/portrait2-services.jpg" />
              <img data-sampler="map" crossorigin src="../media/glmap.jpg" />
            </div>
          </div>

          <div data-text="Street" class="slide text-left">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" src="../media/srteet1-services.jpg" />
              <img data-sampler="texture1" src="../media/srteet2-services.jpg" />
              <img data-sampler="map" src="../media/glmap.jpg" />
            </div>
          </div>
          <div data-text="Content" class="slide text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="../media/kontent1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="../media/kontent2-services.jpg" />
              <img data-sampler="map" crossorigin src="../media/glmap.jpg" />
            </div>
          </div>
`;
    case 2:
      return `
    <div data-text="Lookbook" class="slide text-right">
      <div class="canvas"></div>
      <div class="plane">
        <img data-sampler="texture0" crossorigin src="../media/katalog1-services.jpg" />
        <img data-sampler="texture1" crossorigin src="../media/katalog2-services.jpg" />
        <img data-sampler="map" crossorigin src="../media/glmap.jpg" />
      </div>
    </div>

    <div data-text="campaign" class="slide text-left">
      <div class="canvas"></div>
      <div class="plane">
        <img data-sampler="texture0" src="../media/lookbook1-services.jpg" />
        <img data-sampler="texture1" src="../media/lookbook2-services.jpg" />
        <img data-sampler="map" src="../media/glmap.jpg" />
      </div>
    </div>
`;
  }
}

let arrWebGL = [];
initWebGL();
function initWebGL() {
  //every slide webGL
  document.querySelectorAll('.slide').forEach(slide => {
    const canvas = slide.querySelector('.canvas');
    const planeElement = slide.querySelector('.plane');
    const webGL = new WebglHover({
      canvas,
      planeElement,
    });
    arrWebGL.push(webGL);
  });
}
