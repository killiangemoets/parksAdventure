// import '@babel/polyfill'; // We include it to polufill some of the features of JavaScript (to make it works on old browsers)
import { login, logout } from './login.js';
import { signup } from './signup.js';
import { displayMap } from './mapbox.js';
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';
import { renderNumPeopleInput } from './reservation.js';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const confirmReservationBtn = document.getElementById('confirm-reservation');
const popup = document.querySelector('.popup-blur');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('newemail').value;
    const password = document.getElementById('newpassword').value;
    const passwordConfirm = document.getElementById('confirmpassword').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // updateSettings({ name, email }, 'data');

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    // e.target.textContent = 'Processing...';
    // const { tourId } = e.target.dataset;
    // bookTour(tourId);
    popup.classList.remove('hidden');
  });
}

if (confirmReservationBtn) {
  confirmReservationBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    const date = document.querySelector('#dates').value;
    const numPeople = document.querySelector('#number-of-hikers').value;

    bookTour(tourId, date, numPeople);
  });
}

if (popup) {
  popup.addEventListener('click', (e) => {
    if (e.target.className === 'popup-blur') popup.classList.add('hidden');
  });
  const { bookingsStr, maxGroupSize } = popup.dataset;
  const selectedDate = document.querySelector('#dates').value;
  renderNumPeopleInput(selectedDate, JSON.parse(bookingsStr), maxGroupSize);
  document.querySelector('#dates').addEventListener('input', function () {
    const selectedDate = document.querySelector('#dates').value;
    renderNumPeopleInput(selectedDate, JSON.parse(bookingsStr), maxGroupSize);
  });
}
