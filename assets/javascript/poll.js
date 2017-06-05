/* globals $, $$, window */
require('./bling.js');

const Poll = (() => {
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

      window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') closeModal(e);
      });
    },
  };
})();

(() => {
  Poll.init();
})();
