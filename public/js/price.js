import move3d from '../modules/mainButton.js';
import * as moduleOpener from '../modules/moduleOpener.js';

('use strict');

let totalSum = 0;
let order = {
  'Вид съемки': 'Personal/Content',
  'Количество часов': 2,
};
//calculator logic
//type of ph
const typePhList = document.querySelectorAll(`input[name='type-ph']`);
const secondTabH2 = document.querySelector('.quest-tab:nth-of-type(4) .quest-tab__question');
const additionalServ = document.querySelector('.additionalServ-check');
const idea_check = additionalServ.querySelector('.idea-check');
const stylist_check = additionalServ.querySelector('.stylist-check');
const thirdTab = document.querySelector('.quest-tab:nth-of-type(5)');

const thirdTabQuests = document.querySelectorAll('.veriable-item');
const questForBrands = document.querySelectorAll('.for-brands');
const questForFamily = document.querySelectorAll('.for-family');
const questForReport = document.querySelectorAll('.for-report');

typePhList.forEach(element => {
  element.addEventListener('change', addNewQuestions);
});
function addNewQuestions(event) {
  order = {
    'Вид съемки': 'Personal/Content',
    'Количество часов': hours_number.value,
  };
  order['Вид съемки'] = event.target.value;
  checkboxInput.forEach(elem => (elem.checked = false));

  if (event.target.value === 'Reportage') {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = 'none';
    if (retouch_number.value > 0) order['Количество кадров для обработки'] = retouch_number.value;
    delete order['Количество человек на съемке'];

  } else if (event.target.value === 'Brand') {
    secondTabH2.textContent = 'Количество луков';
    hours_number.setAttribute('name', 'number_of_looks');
    hours_number.setAttribute('min', '10');
    hours_number.setAttribute('max', '100');
    hours_number.setAttribute('step', '5');
    hours_number.setAttribute('value', '20');
    hours_number.nextElementSibling.textContent = hours_number.value;
    delete order['Количество человек на съемке'];
    delete order['Количество часов'];
    order['Количество луков'] = hours_number.value;
    if (retouch_number.value > 0) order['Количество кадров для обработки'] = retouch_number.value;
    idea_check.style.display = 'none';
    idea_check.previousElementSibling.style.display = 'none';
    stylist_check.style.display = 'none';
    additionalServ.style.display = '';
  } else {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = '';
    stylist_check.style.display = '';
    idea_check.style.display = '';
    idea_check.previousElementSibling.style.display = '';
    order['Количество часов'] = hours_number.value;
    delete order['Количество человек на съемке'];
  }

  thirdTab.style.display = 'none';
  thirdTabQuests.forEach(element => {
    element.style.display = 'none';
  });

  if (event.target.value === 'Reportage') {
    thirdTab.style.display = 'block';
    questForReport.forEach(elem => (elem.style.display = 'block'));
    order['Количество часов'] = hours_number.value;
  }

  if (event.target.value === 'Brand') {
    thirdTab.style.display = 'block';
    questForBrands.forEach(elem => (elem.style.display = 'block'));
  }
  if (event.target.value === 'Family') {
    thirdTab.style.display = 'block';
    questForFamily.forEach(elem => (elem.style.display = 'block'));
    order['Количество человек на съемке'] = people_number.value;
  }
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
//listen to event radio
const eventInput = document.querySelectorAll('input[name="type-event"]');
eventInput.forEach(elem => elem.addEventListener('change', saveEventType));
function saveEventType(event) {
  order['Вид мероприятия'] = event.target.value;
}

//calculate button
calculate.addEventListener('click', doCalculation);
function doCalculation() {
  const oneBrandCost = 0;
  const oneHourIndividCost = 1800;
  const oneHourIndividAddCost = 1200;
  const oneHourReportCost = 800;
  const oneHourLoveCost = 2000;
  const StudioHourCost = 500;
  const MakeUpCost = 500;
  const BarberCost = 500;
  const StylistCost = 1600;
  const OnePhotoRetouch = 50;
  const NumOfPeopleAddCost = 100;
  const ArrOfServices = new Map();
  let studioCost, makeUpCost, barberCost, stylistCost, photoRetouchCost, numOfPeopleCost;

  const hours = order['Количество луков'] / 10 || order['Количество часов'];
  const PhotographerCost =
    order['Вид съемки'] === 'Brand'
      ? hours * oneBrandCost
      : order['Вид съемки'] === 'Personal/Content'
        ? oneHourIndividCost + (hours - 1) * oneHourIndividAddCost
        : order['Вид съемки'] === 'Reportage'
          ? hours * oneHourReportCost
          : order['Вид съемки'] === 'Love Story' || order['Вид съемки'] === 'Family'
            ? oneHourLoveCost + (hours - 1) * oneHourIndividAddCost
            : false;
  ArrOfServices.set('Стоимость фотографа', PhotographerCost);

  if (order['Студия']) {
    studioCost = hours > 5 ? (hours / 10) * StudioHourCost : hours * StudioHourCost;
    ArrOfServices.set('Студия', studioCost);
  }

  if (order['Макияж']) {
    makeUpCost = MakeUpCost;
    ArrOfServices.set('Макияж', makeUpCost);
  }

  if (order['2 образа от стилиста']) {
    stylistCost = StylistCost;
    ArrOfServices.set('Стилист', stylistCost);
  }

  if (order['Прическа']) {
    barberCost = BarberCost;
    ArrOfServices.set('Прическа', barberCost);
  }

  if (order['Количество кадров для обработки']) {
    photoRetouchCost =
      order['Количество кадров для обработки'] > 9
        ? order['Количество кадров для обработки'] * OnePhotoRetouch * 0.8
        : order['Количество кадров для обработки'] * OnePhotoRetouch;
    ArrOfServices.set('Количество кадров для обработки', photoRetouchCost);
  }

  if (order['Количество человек на съемке'] > 2 && order['Вид съемки'] === 'Family') {
    numOfPeopleCost = (order['Количество человек на съемке'] - 2) * NumOfPeopleAddCost;
    ArrOfServices.set('Количество человек на съемке', numOfPeopleCost);
  }

  ArrOfServices.forEach(val => (totalSum += val));
  createModal(ArrOfServices, totalSum, hours);
}

//modal window init
const modal = document.querySelector('.modal-window');

function createModal(map, totalSum, hours) {
  console.log(order);
  const table = modal.querySelector('table');
  const tBody = document.createElement('tbody');
  const span = modal.querySelector('p span');
  map.forEach((val, key) => {
    const tr = document.createElement('tr');
    const thKey = document.createElement('th');
    const tdVal = document.createElement('td');
    if (!val) val = "—";

    tdVal.textContent = val + ' грн.';
    thKey.textContent = key + ':';

    tr.append(thKey, tdVal);
    tBody.append(tr);
  });
  table.append(tBody);
  const th = document.createElement('th');
  th.textContent = 'Итого:';
  const td = document.createElement('td');

  if (!totalSum) totalSum = "—";
  td.textContent = totalSum + ' грн.';
  const tr = document.createElement('tr');
  tr.append(th, td);
  const tfoot = document.createElement('tfoot');
  tfoot.append(tr);
  tBody.after(tfoot);
  if (!(order['Вид съемки'] === 'Brand' || order['Вид съемки'] === 'Reportage')) {
    span.innerHTML = `
    , а главное это количество кадров в полной ретуше — <strong>${retouchedPhotosNumber(
      hours
    )}</strong>, два из которых вы получите уже на следующий день после съемки`;
  }
  modal.style.display = 'block';
  windowAnim.play();
}

function retouchedPhotosNumber(hours) {
  return order['Вид съемки'] === 'Family' || order['Вид съемки'] === 'Love Story' ? hours * 30 : hours * 12;
}

//modal window anim
const windowAnim = anime({
  targets: modal,
  opacity: [0, 1],
  scaleX: [0.8, 1],
  scaleY: [0.8, 1],
  translateY: ['-150%', '-50%'],
  easing: 'easeOutQuint',
  duration: 500,
  autoplay: false,
  complete() {
    this.reverse();
  },
});

document.querySelector('.modal-window__cross').addEventListener('click', () => {
  windowAnim.play();
  const tBody = modal.querySelector('tbody');
  const tfoot = modal.querySelector('tfoot');
  const span = modal.querySelector('p span');
  setTimeout(() => {
    tBody.remove();
    tfoot.remove();
    span.innerHTML = '';
    modal.style.display = '';
  }, 500);
  totalSum = 0;
});