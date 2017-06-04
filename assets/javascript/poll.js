/* globals $, $$, window */
require('./bling.js');

(() => {
  function closeModal(e) {
    const modal = $('.is-active');
    modal.classList.remove('is-active');
    console.log('close', e);
  }

  function closeParentModal(e) {
    const modal = e.target.parentElement;
    modal.classList.remove('is-active');
    console.log('close parent', modal.classList);
  }

  function openModal(e) {
    // So that the anchors aren't circumvented by preventDefault
    if (e.target.tagName === 'A') return;
    e.preventDefault();
    // Open the modal
    const modal = $(`#modal-${this.dataset.animeid}`);
    if (modal) modal.classList.add('is-active');
  }

  const lis = Array.from($$('[data-animeID]'));
  lis.forEach((li) => {
    li.on('click', openModal);
  });
  const closers = Array.from($$('.modal-close'));
  closers.forEach((closer) => {
    closer.on('click', closeModal);
  });
  const backgrounds = Array.from($$('.modal-background'));
  backgrounds.forEach((background) => {
    background.on('click', closeModal);
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      // const modal = $('.is-active');
      // if (modal) modal.classList.remove('is-active');
      closeModal(e);
    }
  });
})();
