/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* bling.js */

// Modified to make $ querySelector and $$ qSA
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};
NodeList.prototype.__proto__ = Array.prototype;
NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* globals $, $$, btoa, fetch, Clipboard, twttr */
__webpack_require__(0);

(() => {
  const user = $('#mal-username');
  const pass = $('#mal-password');
  const submit = $('#submitForm');
  const credentials = $('#credentials');
  const clipboard = new Clipboard('.copy');

  const apiCall = (url, body) => fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  function showList(poll) {
    const url = `https://pick.moe/${poll.user}`;
    $('#link').innerHTML = `<a href="${url}" rel="noopener noreferrer" target="_blank">${url}</a>`;
    $('#reddit-md').value = `Pick something from my PTW list! [pick.moe/${poll.user}](${url})`;
    twttr.widgets.createShareButton('/', $('#twitter'), { size: 'large', text: `Pick something from my PTW list! ${url}` });
    $('#newList').classList.remove('hidden');
  }

  function submitForm(e) {
    e.preventDefault();
    if (!submit.disabled) {
      const malUser = user.value.trim();
      const malPass = pass.value.trim();
      submit.classList.add('is-loading');
      apiCall('/mal/create', { auth: btoa(`${malUser}:${malPass}`) }).then(res => {
        submit.classList.remove('is-loading');
        if (res.poll) showList(res.poll);
      }).catch(err => console.error(Error(err)));
    }
  }

  // Event listeners
  credentials.on('submit', submitForm);
  clipboard.on('success', () => {
    // TODO show a tooltip
    console.log('copied');
  });

  // Open the help modal
  $('#help').on('click', () => {
    $('#helpModal').classList.add('is-active');
  });
  // Open the reddit modal
  $('#reddit').on('click', () => {
    $('#redditModal').classList.add('is-active');
  });
  // Close modals
  Array.from($$('.modal-background')).forEach(e => {
    e.on('click', () => $('.is-active').classList.remove('is-active'));
  });
  Array.from($$('.modal-close')).forEach(e => {
    e.on('click', () => $('.is-active').classList.remove('is-active'));
  });
})();

/***/ })
/******/ ]);
//# sourceMappingURL=home.js.map