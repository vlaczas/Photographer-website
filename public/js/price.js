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
const secondTabH2 = document.querySelector(
  '.quest-tab:nth-of-type(4) .quest-tab__question'
);
const additionalServ = document.querySelector('.additionalServ-check');
const idea_check = additionalServ.querySelector('.idea-check');
const stylist_check = additionalServ.querySelector('.stylist-check');
const thirdTab = document.querySelector('.quest-tab:nth-of-type(5)');

const thirdTabQuests = document.querySelectorAll('.veriable-item');
const questForBrands = document.querySelectorAll('.for-brands');
const questForFamily = document.querySelectorAll('.for-family');
const questForReport = document.querySelectorAll('.for-report');

typePhList.forEach((element) => {
  element.addEventListener('change', addNewQuestions);
});
function addNewQuestions(event) {
  order = {
    'Вид съемки': 'Personal/Content',
    'Количество часов': hours_number.value,
  };
  order['Вид съемки'] = event.target.value;
  checkboxInput.forEach((elem) => (elem.checked = false));

  if (event.target.value === 'Reportage') {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = 'none';
    if (retouch_number.value > 0)
      order['Количество кадров для обработки'] = retouch_number.value;
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
    if (retouch_number.value > 0)
      order['Количество кадров для обработки'] = retouch_number.value;
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
  thirdTabQuests.forEach((element) => {
    element.style.display = 'none';
  });

  if (event.target.value === 'Reportage') {
    thirdTab.style.display = 'block';
    questForReport.forEach((elem) => (elem.style.display = 'block'));
    order['Количество часов'] = hours_number.value;
  }

  if (event.target.value === 'Brand') {
    thirdTab.style.display = 'block';
    questForBrands.forEach((elem) => (elem.style.display = 'block'));
  }
  if (event.target.value === 'Family') {
    thirdTab.style.display = 'block';
    questForFamily.forEach((elem) => (elem.style.display = 'block'));
    order['Количество человек на съемке'] = people_number.value;
  }
}

//listen to range inputs
const rangeInput = document.querySelectorAll(`input[type='range']`);
rangeInput.forEach((elem) => elem.addEventListener('input', changeRangeValue));
function changeRangeValue(event) {
  event.target.nextElementSibling.textContent = event.target.value;
  order[`${event.target.previousElementSibling.textContent}`] =
    event.target.value;
}
//listen to checkbox input
const checkboxInput = document.querySelectorAll(`input[type='checkbox']`);
checkboxInput.forEach((elem) =>
  elem.addEventListener('change', changeCheckboxValue)
);
function changeCheckboxValue(event) {
  order[`${event.target.value}`] = event.target.checked;
}
//listen to event radio
const eventInput = document.querySelectorAll('input[name="type-event"]');
eventInput.forEach((elem) => elem.addEventListener('change', saveEventType));
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
  const StudioHourCost = 600;
  const MakeUpCost = 500;
  const BarberCost = 500;
  const StylistCost = 1600;
  const OnePhotoRetouch = 50;
  const NumOfPeopleAddCost = 100;
  const ArrOfServices = new Map();
  let studioCost,
    makeUpCost,
    barberCost,
    stylistCost,
    photoRetouchCost,
    numOfPeopleCost;

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
    studioCost = hours * StudioHourCost;
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

  if (
    order['Количество человек на съемке'] > 2 &&
    order['Вид съемки'] === 'Family'
  ) {
    numOfPeopleCost =
      (order['Количество человек на съемке'] - 2) * NumOfPeopleAddCost;
    ArrOfServices.set('Количество человек на съемке', numOfPeopleCost);
  }

  ArrOfServices.forEach((val) => (totalSum += val));
  createModal(ArrOfServices, totalSum, hours);
}

//modal window init
const modal = document.querySelector('.modal-window');

function createModal(map, total, hours) {
  if (
    order['Вид съемки'] === 'Personal/Content' &&
    order['Количество часов'] == 1 &&
    order['Макияж'] &&
    order['Прическа'] &&
    !order['Студия'] &&
    !order['2 образа от стилиста']
  ) {
    const button = document.querySelectorAll('.modal-opener')[1];
    button.click();
    totalSum = 0;
    return;
  }
  const table = modal.querySelector('table');
  const tBody = document.createElement('tbody');
  const [
    paragToChange1,
    paragToChange2,
    paragToChange3,
  ] = modal.querySelectorAll('.article__main-parag');
  map.forEach((val, key) => {
    const tr = document.createElement('tr');
    const thKey = document.createElement('th');
    const tdVal = document.createElement('td');
    if (!val) val = '—';
    tdVal.textContent = val + ' грн.';
    thKey.textContent = key + ':';
    tr.append(thKey, tdVal);
    tBody.append(tr);
  });
  table.append(tBody);
  const th = document.createElement('th');
  th.textContent = 'Итого:';
  const td = document.createElement('td');

  if (!total) total = '—';
  td.textContent = total + ' грн.';
  const tr = document.createElement('tr');
  tr.append(th, td);
  const tfoot = document.createElement('tfoot');
  tfoot.append(tr);
  tBody.after(tfoot);

  if (
    order['Вид съемки'] === 'Personal/Content' ||
    order['Вид съемки'] === 'Family' ||
    order['Вид съемки'] === 'Love Story'
  ) {
    paragToChange1.innerHTML = `
    В стоимость входит:`;
    paragToChange2.innerHTML = `
    ✅ Встреча-знакомство с фотографом <br>
    ✅ Референс (визуализация идеи) <br>
    ✅ Все исходники на следующий день<br>
    ✅ <strong>${retouchedPhotosNumber(
      hours
    )}</strong> в ретуши (два из которых, на выбор фотографа, вы получаете на следующий день после съемки; остальные снимки вы можете выбрать сами) <br>
    ✅ Фото моментальной печати Instax в ПОДАРОК <br>
    ✅ Видеоклип-бекстейдж <br>
    ✅ Обсуждение и помощь в подборе образов, выборе локации и позировании <br>`;
    if (
      order['Вид съемки'] === 'Family' ||
      order['Вид съемки'] === 'Love Story'
    ) {
      paragToChange2.innerHTML = `
    ✅ Встреча-знакомство с фотографом <br>
    ✅ Референс (визуализация идеи) <br>
    ✅ Все исходники <br>
    ✅ Серия из <strong>${retouchedPhotosNumber(hours)}</strong> в ретуши <br>
    ✅ Фото моментальной печати Instax в ПОДАРОК <br>
    ✅ Видеоклип-бекстейдж <br>
    ✅ Обсуждение и помощь в подборе образов, выборе локации и позировании <br>`;
    }
    paragToChange3.innerHTML = `
    Дополнительные фотографии для обработки можно дозаказать!`;
  }
  if (order['Вид съемки'] === 'Brand') {
    paragToChange1.innerHTML = `
    Цена фотографа обсуждается лично, так как она зависит от вида съемки (каталог, lookbook, кампейн), а также от сложности реализации желаемой идеи. <br>
    В стоимость входит:`;
    paragToChange2.innerHTML = `
    ✅ Встреча-знакомство с фотографом <br>
    ✅ Все исходники в цветокоррекции в течении 2-х дней после съемки <br>
    ✅ Обсуждение и помощь в выборе локации и позировании модели <br>`;
    if (order['Студия']) {
      paragToChange3.innerHTML = `
      *Время студии бралось из расчета, что в среднем мы будем тратить до 6 минут на 1 образ. Данное время зависит от количества моделей и кадров, которые вы хотите получить с каждого лука. 
      После уточнения всех деталей, оно может измениться!`;
    } else paragToChange3.innerHTML = '';
  }
  if (order['Вид съемки'] === 'Reportage') {
    paragToChange1.innerHTML = `
    В стоимость входит:`;
    paragToChange2.innerHTML = `
    ✅ Встреча-знакомство с фотографом <br>
    ✅ Все исходники в цветокоррекции в течении недели<br>
    ✅ Выезд фотографа на локацию перед съемкой для просмотра места проведения мероприятия<br>`;
    paragToChange3.innerHTML = '';
  }
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  windowAnim.play();
}

function retouchedPhotosNumber(hours) {
  return order['Вид съемки'] === 'Family' ||
    order['Вид съемки'] === 'Love Story'
    ? hours * 25
    : hours * 12;
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
  document.body.style.overflow = '';
  setTimeout(() => {
    tBody.remove();
    tfoot.remove();
    modal.style.display = '';
  }, 500);
  totalSum = 0;
});

function qwe() {
  const asd = 1;

  const as = 212;
}
