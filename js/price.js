import move3d from '../modules/mainButton.js';

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

let order = {
  'Вид съемки': 'Индивидуальная/Контент съемка',
  'Количество часов': 2,
};
//calculator logic
//type of ph
const typePhList = document.querySelectorAll(`input[name='type-ph']`);
const secondTabH2 = document.querySelector('.quest-tab:nth-of-type(2) .quest-tab__question');
const additionalServ = document.querySelector('.additionalServ-check');
const idea_check = additionalServ.querySelector('.idea-check');
const thirdTab = document.querySelector('.quest-tab:nth-of-type(3)');

const thirdTabQuests = document.querySelectorAll('.veriable-item');
const questForBrands = document.querySelectorAll('.for-brands');
const questForFamily = document.querySelectorAll('.for-family');
const questForReport = document.querySelectorAll('.for-report');

typePhList.forEach(element => {
  element.addEventListener('change', addNewQuestions);
});
function addNewQuestions(event) {
  order = {
    "Вид съемки": 'Индивидуальная/Контент съемка',
    "Количество часов": hours_number.value,
  };
  order['Вид съемки'] = event.target.value;
  if (event.target.value === 'Репортаж') {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = 'none';
  } else if (event.target.value === 'Съемка одежды') {
    secondTabH2.textContent = 'Количество луков';
    hours_number.setAttribute('name', 'number_of_looks');
    hours_number.setAttribute('min', '10');
    hours_number.setAttribute('max', '100');
    hours_number.setAttribute('step', '5');
    hours_number.setAttribute('value', '20');
    hours_number.nextElementSibling.textContent = hours_number.value;
    delete order['Количество часов'];
    order['Количество луков'] = hours_number.value;
    additionalServ.style.display = '';
    idea_check.parentElement.style.display = 'none';
  } else {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = '';
    idea_check.parentElement.style.display = '';
    order['Количество часов'] = hours_number.value;
  }

  thirdTab.style.display = 'none';
  thirdTabQuests.forEach(element => {
    element.style.display = 'none';
  }); 

  if (event.target.value === 'Репортаж') {
    thirdTab.style.display = 'block';
    questForReport.forEach(elem => elem.style.display = 'block');
    order['Количество человек для съемки'] = 2;
  }

  if (event.target.value === 'Съемка одежды') {
    thirdTab.style.display = 'block';
    questForBrands.forEach(elem => (elem.style.display = 'block'));
  }

  if (event.target.value === 'Cемейная') {
    thirdTab.style.display = 'block';
    questForFamily.forEach(elem => (elem.style.display = 'block'));
  }
  checkboxInput.forEach(elem => elem.checked = false);
}

//listen to range inputs
  const rangeInput = document.querySelectorAll(`input[type='range']`);
  rangeInput.forEach(elem => elem.addEventListener('input', changeRangeValue));
  function changeRangeValue(event) {
    event.target.nextElementSibling.textContent = event.target.value;
    order[`${event.target.previousElementSibling.textContent}`] = event.target.value;
  }
//listen to checkbox input 
  const checkboxInput = document.querySelectorAll(`input[type='checkbox']`);
  checkboxInput.forEach(elem => elem.addEventListener('change', changeCheckboxValue));
  function changeCheckboxValue(event) {
    order[`${event.target.value}`] = event.target.checked;
  }

//calculate button
calculate.addEventListener('click', doCalculation);
function doCalculation() { 
  alert(JSON.stringify(order));
}