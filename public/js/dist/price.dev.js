"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _mainButton = _interopRequireDefault(require("../modules/mainButton.js"));

var moduleOpener = _interopRequireWildcard(require("../modules/moduleOpener.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

'use strict';

var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;

window.onload = function () {
  document.querySelector('.gif').src = 'media/zac.gif';
};

var totalSum = 0;
var mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false; //mouse move anim

if (!mobileScreen) {
  var cursor = document.querySelector('.cursor');
  cursor.style.display = 'block';
  document.addEventListener('mousemove', function (event) {
    anime({
      targets: cursor,
      duration: 0,
      easing: 'linear',
      left: event.clientX,
      top: event.clientY
    });
  });
}

var order = {
  'Вид съемки': 'Personal/Content',
  'Количество часов': 2
}; //calculator logic
//type of ph

var typePhList = document.querySelectorAll("input[name='type-ph']");
var secondTabH2 = document.querySelector('.quest-tab:nth-of-type(4) .quest-tab__question');
var additionalServ = document.querySelector('.additionalServ-check');
var idea_check = additionalServ.querySelector('.idea-check');
var stylist_check = additionalServ.querySelector('.stylist-check');
var thirdTab = document.querySelector('.quest-tab:nth-of-type(5)');
var thirdTabQuests = document.querySelectorAll('.veriable-item');
var questForBrands = document.querySelectorAll('.for-brands');
var questForFamily = document.querySelectorAll('.for-family');
var questForReport = document.querySelectorAll('.for-report');
typePhList.forEach(function (element) {
  element.addEventListener('change', addNewQuestions);
});

function addNewQuestions(event) {
  order = {
    'Вид съемки': 'Personal/Content',
    'Количество часов': hours_number.value
  };
  order['Вид съемки'] = event.target.value;
  checkboxInput.forEach(function (elem) {
    return elem.checked = false;
  });

  if (event.target.value === 'Reportage') {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = 'none';
    order['Количество кадров для обработки'] = retouch_number.value;
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
  thirdTabQuests.forEach(function (element) {
    element.style.display = 'none';
  });

  if (event.target.value === 'Reportage') {
    thirdTab.style.display = 'block';
    questForReport.forEach(function (elem) {
      return elem.style.display = 'block';
    });
    order['Количество часов'] = hours_number.value;
    order['Количество человек на съемке'] = people_number.value;
  }

  if (event.target.value === 'Brand') {
    thirdTab.style.display = 'block';
    questForBrands.forEach(function (elem) {
      return elem.style.display = 'block';
    });
  }

  if (event.target.value === 'Family') {
    thirdTab.style.display = 'block';
    questForFamily.forEach(function (elem) {
      return elem.style.display = 'block';
    });
    order['Количество человек на съемке'] = people_number.value;
  }
} //listen to range inputs


var rangeInput = document.querySelectorAll("input[type='range']");
rangeInput.forEach(function (elem) {
  return elem.addEventListener('input', changeRangeValue);
});

function changeRangeValue(event) {
  event.target.nextElementSibling.textContent = event.target.value;
  order["".concat(event.target.previousElementSibling.textContent)] = event.target.value;
} //listen to checkbox input


var checkboxInput = document.querySelectorAll("input[type='checkbox']");
checkboxInput.forEach(function (elem) {
  return elem.addEventListener('change', changeCheckboxValue);
});

function changeCheckboxValue(event) {
  order["".concat(event.target.value)] = event.target.checked;
} //listen to event radio


var eventInput = document.querySelectorAll('input[name="type-event"]');
eventInput.forEach(function (elem) {
  return elem.addEventListener('change', saveEventType);
});

function saveEventType(event) {
  order['Вид мероприятия'] = event.target.value;
} //calculate button


calculate.addEventListener('click', doCalculation);

function doCalculation() {
  var oneBrandCost = 700;
  var oneHourIndividCost = 1500;
  var oneHourIndividAddCost = 1000;
  var oneHourReportCost = 700;
  var oneHourLoveCost = 2000;
  var StudioHourCost = 500;
  var MakeUpCost = 400;
  var BarberCost = 500;
  var StylistCost = 1200;
  var OnePhotoRetouch = 50;
  var NumOfPeopleAddCost = 100;
  var ArrOfServices = new Map();
  var studioCost, makeUpCost, barberCost, stylistCost, photoRetouchCost, numOfPeopleCost;
  var hours = order['Количество луков'] / 10 || order['Количество часов'];
  var PhotographerCost = order['Вид съемки'] === 'Brand' ? hours * oneBrandCost : order['Вид съемки'] === 'Personal/Content' ? oneHourIndividCost + (hours - 1) * oneHourIndividAddCost : order['Вид съемки'] === 'Reportage' ? hours * oneHourReportCost : order['Вид съемки'] === 'Love Story' || order['Вид съемки'] === 'Family' ? oneHourLoveCost + (hours - 1) * oneHourIndividAddCost : false;
  ArrOfServices.set('Стоимость фотографа', PhotographerCost);

  if (order['Студия']) {
    studioCost = hours > 5 ? hours / 10 * StudioHourCost : hours * StudioHourCost;
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
    photoRetouchCost = order['Количество кадров для обработки'] > 5 ? order['Количество кадров для обработки'] * OnePhotoRetouch * 0.8 : order['Количество кадров для обработки'] * OnePhotoRetouch;
    ArrOfServices.set('Количество кадров для обработки', photoRetouchCost);
  }

  if (order['Количество человек на съемке'] > 2 && order['Вид съемки'] === 'Family') {
    numOfPeopleCost = (order['Количество человек на съемке'] - 2) * NumOfPeopleAddCost;
    ArrOfServices.set('Количество человек на съемке', numOfPeopleCost);
  }

  ArrOfServices.forEach(function (val) {
    return totalSum += val;
  });
  createModal(ArrOfServices, totalSum, hours);
} //modal window init


var modal = document.querySelector('.modal-window');

function createModal(map, totalSum, hours) {
  var table = modal.querySelector('table');
  var tBody = document.createElement('tbody');
  var span = modal.querySelector('p span');
  map.forEach(function (val, key) {
    var tr = document.createElement('tr');
    var thKey = document.createElement('th');
    var tdVal = document.createElement('td');
    tdVal.textContent = val + ' грн.';
    thKey.textContent = key + ':';
    tr.append(thKey, tdVal);
    tBody.append(tr);
  });
  table.append(tBody);
  var th = document.createElement('th');
  th.textContent = 'Итого:';
  var td = document.createElement('td');
  td.textContent = totalSum + ' грн.';
  var tr = document.createElement('tr');
  tr.append(th, td);
  var tfoot = document.createElement('tfoot');
  tfoot.append(tr);
  tBody.after(tfoot);

  if (!(order['Вид съемки'] === 'Brand' || order['Вид съемки'] === 'Reportage')) {
    span.innerHTML = "\n    , \u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u044D\u0442\u043E \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u0430\u0434\u0440\u043E\u0432 \u0432 \u043F\u043E\u043B\u043D\u043E\u0439 \u0440\u0435\u0442\u0443\u0448\u0435 \u2014 <strong>".concat(retouchedPhotosNumber(hours), "</strong>, \u0434\u0432\u0430 \u0438\u0437 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0443\u0436\u0435 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0434\u0435\u043D\u044C \u043F\u043E\u0441\u043B\u0435 \u0441\u044A\u0435\u043C\u043A\u0438");
  }

  modal.style.display = 'block';
  windowAnim.play();
}

function retouchedPhotosNumber(hours) {
  return order['Вид съемки'] === 'Family' || order['Вид съемки'] === 'Love Story' ? hours * 30 : hours * 12;
} //modal window anim


var windowAnim = anime({
  targets: modal,
  opacity: [0, 1],
  scaleX: [0.8, 1],
  scaleY: [0.8, 1],
  translateY: ['-150%', '-50%'],
  easing: 'easeOutQuint',
  duration: 500,
  autoplay: false,
  complete: function complete() {
    this.reverse();
  }
});
document.querySelector('.modal-window__cross').addEventListener('click', function () {
  windowAnim.play();
  var tBody = modal.querySelector('tbody');
  var tfoot = modal.querySelector('tfoot');
  var span = modal.querySelector('p span');
  setTimeout(function () {
    tBody.remove();
    tfoot.remove();
    span.innerHTML = '';
    modal.style.display = '';
  }, 500);
  totalSum = 0;
});