import '../../node_modules/choices.js/public/assets/styles/choices.min.css';
import { choice } from './render/multiselect';
// import { table } from './render/render-calendar';

const form = document.querySelectorAll('.event__form');
const submit = document.querySelector('.event__btn--submit');
const errorBody = document.querySelector('.event__error');
const closeBtn = document.querySelector('.event__btn--error');

function isEmpty(obj, exclude = null) {
  // eslint-disable-next-line no-param-reassign
  obj = Object.assign({}, obj);
  // eslint-disable-next-line no-restricted-syntax
  for (let key in obj) {
    // eslint-disable-next-line no-continue
    if (exclude && exclude.includes(key)) continue;
    if (obj[key] == null || obj[key] === '') return false;
  }
  return true;
}

function showError() {
  errorBody.style.display = 'flex';
  closeBtn.addEventListener('click', () => {
    errorBody.style.display = 'none';
  });
}

function saveData(obj) {
  let values = JSON.parse(localStorage.getItem('data'));
  if (values === null) {
    values = [];
  }
  values.push(obj);
  localStorage.setItem('data', JSON.stringify(values));
  console.log(localStorage.getItem('data'));
}

function getData(e) {
  e.preventDefault();
  let inputData = new FormData(form[0]);
  const participants = choice.getValue();
  let data = {
    time: inputData.get('time'),
    user: participants,
    title: inputData.get('nameEvent'),
    day: inputData.get('days')
  };

  if (isEmpty(data)) {
    saveData(data);
    console.log('done');
  } else {
    showError();
  }
}

submit.addEventListener('click', getData, false);
