/* globals $, $$ */
require('./bling.js');

function debounce(func, wait, immediate, ...args) {
  let timeout;
  return () => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function verifyForm(e) {
  console.log('verifying form');
  return null;
  // Debounce call to API to check creds

  // If valid, enable the submit button
}

function submitForm(e) {
  e.preventDefault();
  console.log('submitting form');
  return null;
}

(() => {
  $$('.control').on('change', verifyForm);
  $('#credentials').on('submit', submitForm);
})();
