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

/* globals $, btoa, fetch */
__webpack_require__(0);

(() => {
  const user = $('#mal-username');
  const pass = $('#mal-password');
  const submit = $('#submitForm');
  const credentials = $('#credentials');

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

  const apiCall = (url, body) => fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  const checkCredentials = debounce(() => {
    const malUser = user.value.trim();
    const malPass = pass.value.trim();
    submit.disabled = true;

    // MAL uses HTTP Basic Auth, btoa generates the required string
    // This is all that is sent to the server
    apiCall('/mal/check', { auth: btoa(`${malUser}:${malPass}`) }).then(res => {
      if (res && res.message && res.message === 'valid') {
        // Currently entered credentials are valid
        submit.disabled = false;
        submit.classList.add('is-primary');
      }
    }).catch(err => console.error(Error(err)));
  }, 250);

  function showList() {
    // console.log(newList);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!submit.disabled) {
      const malUser = user.value.trim();
      const malPass = pass.value.trim();
      submit.classList.add('is-loading');
      apiCall('/mal/create', { auth: btoa(`${malUser}:${malPass}`) }).then(res => {
        console.log('newList', res);
        showList();
      }).catch(err => console.error(Error(err)));
    }
  }

  user.on('keyup', checkCredentials);
  pass.on('keyup', checkCredentials);
  credentials.on('submit', submitForm);
})();

/***/ })
/******/ ]);
//# sourceMappingURL=home.js.map