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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/news.js":
/*!******************************!*\
  !*** ./resources/js/news.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  currentPage = 1;
  interval = 30000;
  var template = $('#newsTemplate').html();

  function get() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var url = 'https://newsapi.org/v2/top-headlines?' + 'country=ph&' + // 'apiKey=e8f43388480f45dd8e297078121879fa&' +
    'apiKey=07d358e9363049169c3ee8f7a9579f27&' + 'page=' + currentPage + '&' + 'pageSize=' + size;
    $.get(url).done(function (data) {
      console.log('data received', currentPage);

      if (data.articles.length == 0) {
        currentPage = 0;
        get();
        return;
      } // process the data


      $('.news').children().first().slideUp(1000, function () {
        $(this).remove();
        $('.news').append(toHtmlArticles(data.articles));
      }); // set currentpage to number of articles (1 to 5)

      currentPage += data.articles.length; // do it again

      setTimeout(function () {
        get();
      }, interval);
    });
  }

  function toHtmlArticles(articles) {
    var html = '';
    articles.forEach(function (article) {
      html += template.replace(/{{img}}/, article.urlToImage).replace(/{{title}}/, article.title).replace(/{{description}}/, article.description);
    });
    return html;
  } // initial get


  get(5);
  return; // let template = $('#newsTemplate').html();
  // let articles = [];
  // let interval = 1000;
  // let counter = 0;
  // function get() {
  //     console.log('initialized');
  //     var url = 'https://newsapi.org/v2/top-headlines?' +
  //         'country=ph&' +
  //         'apiKey=e8f43388480f45dd8e297078121879fa';
  //     $.get(url).done(function(data) {
  //         console.log('request received');
  //         // get the first 5
  //         articles = data.articles;
  //         initialArticles = articles.splice(0, 5);
  //         appendArticles(initialArticles);
  //         // let html = '';
  //         // initialArticles.forEach(news => {
  //         //     html += toHtmlArticle(news);
  //         //     // html += template.replace(/{{img}}/, news.urlToImage)
  //         //     //     .replace(/{{title}}/, news.title)
  //         //     //     .replace(/{{description}}/, news.description);
  //         // });
  //         // $('.news').html(html);
  //     }).catch(err => {
  //         console.log('Error occured', err);
  //         console.log('Retrying...');
  //         get();
  //     });
  // }
  // function getArticle() {
  //     return articles[++counter];
  // }
  // function appendArticles(_articles) {
  //     if(_articles.length == 5) {
  //         // initial append
  //         let html = '';
  //         _articles.forEach(article => {
  //             html += toHtmlArticle(article);
  //         });
  //         $('.news').html(html);
  //         setTimeout(appendArticle, interval);
  //     }
  // }
  // function appendArticle() {
  //     console.log(counter);
  //     $('.news').append(toHtmlArticle(getArticle()));
  //     removeArticle();
  // }
  // function removeArticle() {
  //     $('.news').children().first().slideUp(1000, function() {
  //         $(this).remove();
  //         setTimeout(appendArticle, interval);
  //     });
  // }
  // function toHtmlArticle(article) {
  //     return template.replace(/{{img}}/, article.urlToImage)
  //         .replace(/{{title}}/, article.title)
  //         .replace(/{{description}}/, article.description);
  // }
  // get();
  // function get() {
  //     console.log('request sent');
  //     $.get(url).done(function(data) {
  //         let html = '';
  //         data.articles.forEach(news => {
  //             html += template.replace(/{{img}}/, news.urlToImage)
  //                 .replace(/{{title}}/, news.title)
  //                 .replace(/{{description}}/, news.description);
  //             });
  //         $('.news').html(html);
  //         setTimeout(get, 60000);
  //     }).catch(err => {
  //         console.log('Error occured', err);
  //         console.log('Retrying...');
  //         get();
  //     });
  // }
  // function appendNews() {
  // }
  // get();
});

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/news.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\laravel\els-news\resources\js\news.js */"./resources/js/news.js");


/***/ })

/******/ });