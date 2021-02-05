import WebglHover from '../modules/webglAnim.js';

('use strict');

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
  } else {
    return;
  }

  services.forEach(elem => {
    if (diffX > 170) diffX = 160;
    else if (diffX < -316) diffX = -316;
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
        arrows.after(tabNewContainer);
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


//html template of the tab
function renderNewTab(tab) {
  let index = [...services].indexOf(tab);
  switch (index) {
    case 0:
      return `
          <div data-text="Love Story" class="slide text-aside text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="media/masha_artur1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="media/masha_artur2-services.jpg" />
              <img data-sampler="map" crossorigin src="media/glmap.jpg" />
            </div>
          </div>

          <div data-text="Family" class="slide text-left">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" src="media/family1-services.jpg" />
              <img data-sampler="texture1" src="media/family2-services.jpg" />
              <img data-sampler="map" src="media/glmap.jpg" />
            </div>
          </div>
`;
    case 1:
      return `
<div data-text="Studio" class="slide text-aside text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="media/portrait1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="media/portrait2-services.jpg" />
              <img data-sampler="map" crossorigin src="media/glmap.jpg" />
            </div>
          </div>

          <div data-text="Street" class="slide text-left">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" src="media/srteet1-services.jpg" />
              <img data-sampler="texture1" src="media/srteet2-services.jpg" />
              <img data-sampler="map" src="media/glmap.jpg" />
            </div>
          </div>
          <div data-text="Content" class="slide text-right">
            <div class="canvas"></div>
            <div class="plane">
              <img data-sampler="texture0" crossorigin src="media/kontent1-services.jpg" />
              <img data-sampler="texture1" crossorigin src="media/kontent2-services.jpg" />
              <img data-sampler="map" crossorigin src="media/glmap.jpg" />
            </div>
          </div>
`;
    case 2:
      return `
    <div data-text="Lookbook" class="slide text-aside text-right">
      <div class="canvas"></div>
      <div class="plane">
        <img data-sampler="texture0" crossorigin src="media/katalog1-services.jpg" />
        <img data-sampler="texture1" crossorigin src="media/katalog2-services.jpg" />
        <img data-sampler="map" crossorigin src="media/glmap.jpg" />
      </div>
    </div>

    <div data-text="campaign" class="slide text-aside text-left">
      <div class="canvas"></div>
      <div class="plane">
        <img data-sampler="texture0" src="media/lookbook1-services.jpg" />
        <img data-sampler="texture1" src="media/lookbook2-services.jpg" />
        <img data-sampler="map" src="media/glmap.jpg" />
      </div>
    </div>
`;
    case 3:
      return `
    <article class="article">
      <h2 class="article__main-header">energetic</h2>
    </article>
    <div class="videos">
      <video class="focus-ring" src="media/videos/glasses.mp4" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/glasses.jpg"></video>
      <video class="focus-ring" src="media/videos/energy1.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/watchAD.jpg"></video>
      <video class="focus-ring" src="media/videos/energy2.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/cameraAD.jpg"></video>
    </div>
    <article class="article">
      <h2 class="article__main-header">content</h2>
    </article>
    <div class="videos">
      <video class="focus-ring" src="media/videos/content3.mp4" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/glasses.jpg"></video>
      <video class="focus-ring" src="media/videos/content1.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/watchAD.jpg"></video>
      <video class="focus-ring" src="media/videos/content2.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/cameraAD.jpg"></video>
    </div>
    <article class="article">
      <h2 class="article__main-header">backstages</h2>
    </article>
    <div class="videos">
      <video class="focus-ring" src="media/videos/backstage1.mp4" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/glasses.jpg"></video>
      <video class="focus-ring" src="media/videos/backstage2.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/watchAD.jpg"></video>
      <video class="focus-ring" src="media/videos/backstage3.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/cameraAD.jpg"></video>
    </div>
    <article class="article">
    <h2 class="article__main-header">brands</h2>
  </article>
  <div class="videos">
    <video class="focus-ring" src="media/videos/brand1.mp4" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/glasses.jpg"></video>
    <video class="focus-ring" src="media/videos/brand2.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/watchAD.jpg"></video>
    <video class="focus-ring" src="media/videos/brand3.mp4" oncontextmenu="return false;" controlslist="nodownload" disablePictureInPicture controls="" poster="media/videos/cameraAD.jpg"></video>
  </div>
`;
  }
}

let arrWebGL = [];
initWebGL();
function initWebGL() {
  //every slide webGL
  const slides = document.querySelectorAll('.slide');
  if (!slides) return;
  slides.forEach(slide => {
    const canvas = slide.querySelector('.canvas');
    const planeElement = slide.querySelector('.plane');
    const webGL = new WebglHover({
      canvas,
      planeElement,
    });
    arrWebGL.push(webGL);
  });
}
