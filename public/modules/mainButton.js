//main-button anim
const mainButton = document.querySelectorAll('.main-button');
let currButton;
mainButton.forEach(elem => elem.addEventListener('mousemove', move3d));

export default function move3d(event) {
  currButton = event.target;
  //define middle of the button to contol the movement
  let width = currButton.clientWidth / 2;
  let height = currButton.clientHeight / 2;
  let x = event.clientX - currButton.getBoundingClientRect().left;
  let y = event.clientY - currButton.getBoundingClientRect().top;
  anime({
    targets: currButton,
    rotateY: (x - width) / 10,
    rotateX: -(y - height),
    translateZ: [20, 20],
    duration: 0,
  });
}

mainButton.forEach(elem =>
  //back to normal position
  elem.addEventListener('mouseleave', event => {
    currButton.style.transform = '';
    anime({
      targets: currButton,
      duration: 200,
      rotateY: 0,
      rotateX: 0,
      translateZ: [0, 0],
    });
  })
);
mainButton.forEach(elem =>
  elem.addEventListener('click', event => {
    anime({
      targets: currButton,
      duration: 100,
      direction: 'alternate',
      translateZ: 0,
    });
  })
);
