/* globals $, $$, window, fetch */
require('./bling.js');

const Poll = (() => {
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

  const closeModal = () => {
    const modal = $('.is-active');
    if (modal) modal.classList.remove('is-active');
  };

  const openModal = function (e) { // eslint-disable-line func-names
    // So that the anchors aren't circumvented by preventDefault
    if (e.target.tagName === 'A') return;
    e.preventDefault();
    // Open the modal
    const modal = $(`#modal-${this.dataset.animeid}`);
    if (modal) modal.classList.add('is-active');
  };

  const vote = function () { // eslint-disable-line func-names
    this.classList.add('is-loading');
    const id = $('.is-active').id.split('-')[1];
    apiCall(`${window.location.pathname}/vote`, { id })
    .then(() => {
      window.location.assign(window.location.pathname);
    })
    .catch((err) => {
      this.classList.remove('is-loading');
      // Have we voted already?
      if (err.includes('429')) {
        // TODO error
      }
      console.error(err);
    });
  };

  return {
    init: () => {
      Array.from($$('[data-animeid]')).forEach((li) => {
        li.on('click', openModal);
      });
      Array.from($$('.modal-close')).forEach((closer) => {
        closer.on('click', closeModal);
      });
      Array.from($$('.modal-background')).forEach((background) => {
        background.on('click', closeModal);
      });
      Array.from($$('.vote-button')).forEach((button) => {
        button.on('click', vote);
      });

      window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') closeModal(e);
      });
    },
  };
})();

(() => {
  Poll.init();
})();
