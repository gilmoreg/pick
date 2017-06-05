/* globals $, btoa, fetch, Clipboard */
require('./bling.js');

(() => {
  const user = $('#mal-username');
  const pass = $('#mal-password');
  const submit = $('#submitForm');
  const credentials = $('#credentials');
  const clipboard = new Clipboard('.copy');

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

  const apiCall = (url, body) =>
    fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json());

  const checkCredentials = debounce(() => {
    const malUser = user.value.trim();
    const malPass = pass.value.trim();
    submit.disabled = true;

    // MAL uses HTTP Basic Auth, btoa generates the required string
    // This is all that is sent to the server
    apiCall('/mal/check', { auth: btoa(`${malUser}:${malPass}`) })
    .then((res) => {
      if (res && res.message && res.message === 'valid') {
        // Currently entered credentials are valid
        submit.disabled = false;
        submit.classList.add('is-primary');
      }
    })
    .catch(err => console.error(Error(err)));
  }, 250);

  function showList(poll) {
    const url = `https://pick.moe/${poll.user}`;
    $('#link').innerHTML = `<a href="${url}" rel="noopener noreferrer" target="_blank">${url}</a>`;
    $('#reddit').value = `Pick something from my PTW list! [pick.moe/${poll.user}](${url})`;
    $('.twitter-share-button').setAttribute('data-text', `Pick something from my PTW list! ${url}`);
    $('#newList').classList.remove('hidden');
  }

  function submitForm(e) {
    e.preventDefault();
    if (!submit.disabled) {
      const malUser = user.value.trim();
      const malPass = pass.value.trim();
      submit.classList.add('is-loading');
      apiCall('/mal/create', { auth: btoa(`${malUser}:${malPass}`) })
      .then((res) => {
        submit.classList.remove('is-loading');
        if (res.poll) showList(res.poll);
      })
      .catch(err => console.error(Error(err)));
    }
  }

  // Event listeners
  user.on('keyup', checkCredentials);
  pass.on('keyup', checkCredentials);
  credentials.on('submit', submitForm);
  clipboard.on('success', () => {
    // show a tooltip
  });

  // Open the help modal
  $('#help').on('click', () => {
    $('#helpModal').classList.add('is-active');
  });
  // Close the help modal
  $('.modal-background').on('click', () => {
    $('.is-active').classList.remove('is-active');
  });
  $('.modal-close').on('click', () => {
    $('.is-active').classList.remove('is-active');
  });
})();
