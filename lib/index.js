(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("js-table-print", [], factory);
	else if(typeof exports === 'object')
		exports["js-table-print"] = factory();
	else
		root["js-table-print"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@page {\n  margin: 0; }\n\n.A4landscape {\n  height: 171mm;\n  width: 297mm;\n  position: relative;\n  padding: 30mm 15mm 30mm 15mm; }\n\n.A4 {\n  height: 294mm;\n  width: 210mm;\n  position: relative;\n  padding: 30mm 15mm 15mm 15mm; }\n\n@media print {\n  body > *:not(.table-print-root) {\n    display: none !important; }\n  html, body {\n    margin: 0 !important;\n    padding: 0 !important;\n    border: 0 !important;\n    outline: 0 !important; } }\n\n@media screen {\n  .table-print-src {\n    position: relative;\n    margin: 20px; }\n  .A4,\n  .A4landscape {\n    border: 1px dashed red; } }\n\n.table-print-dialog {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 99;\n  left: 0;\n  top: 10px;\n  width: 70%;\n  height: 720px;\n  background-color: white;\n  overflow: scroll;\n  transform: translateX(25%);\n  box-shadow: 0px 0px 10px 2px #555;\n  padding: 24px 4px; }\n  .table-print-dialog .table-print-dialog-title {\n    padding: 8px 0; }\n  .table-print-dialog .table-print-dialog-btn-group {\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .table-print-dialog .table-print-dialog-btn-group .table-print-dialog-btn-ok,\n    .table-print-dialog .table-print-dialog-btn-group .table-print-dialog-btn-cancel {\n      min-width: 32px;\n      height: 32px;\n      padding: 0 15px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1890ff;\n      color: white;\n      border-radius: 4px;\n      font-size: 14px; }\n      .table-print-dialog .table-print-dialog-btn-group .table-print-dialog-btn-ok:not(:last-child),\n      .table-print-dialog .table-print-dialog-btn-group .table-print-dialog-btn-cancel:not(:last-child) {\n        margin-right: 4px; }\n\n.table-print-src .table-print-src-content {\n  width: 100%;\n  height: 100%; }\n\n.table-print-root {\n  position: relative; }\n  .table-print-root table {\n    width: 100%;\n    border: 3px solid #888;\n    border-collapse: collapse;\n    border-spacing: 0; }\n    .table-print-root table + table {\n      border-top: 0; }\n    .table-print-root table th,\n    .table-print-root table td {\n      padding: 10px;\n      border-bottom: 1px solid #888; }\n    .table-print-root table th:not(:last-child),\n    .table-print-root table td:not(:last-child) {\n      border-right: 1px solid #888; }\n\n.table-print-frame {\n  position: absolute;\n  width: 0;\n  height: 0;\n  left: -600px;\n  top: -600px; }\n\n.table-print-header {\n  position: absolute;\n  top: .5cm;\n  left: 0;\n  width: 100%;\n  box-sizing: border-box; }\n\n.table-print-footer {\n  position: absolute;\n  bottom: 2cm;\n  left: 0;\n  width: 100%;\n  box-sizing: border-box; }\n\n.table-print-footer-content {\n  text-align: center;\n  font-size: 12px;\n  width: 100%; }\n\n.table-print-header-content {\n  text-align: center;\n  font-size: 12px;\n  width: 100%;\n  border-bottom: 1px solid #888; }\n\n.table-print-water-box {\n  position: absolute;\n  z-index: 999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 1px;\n  height: 1px;\n  transform-origin: center;\n  left: 0;\n  bottom: 0; }\n\n.table-print-water {\n  width: 200px;\n  height: 80px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 28px;\n  color: #ccc;\n  opacity: .8;\n  border: 4px solid #ccc;\n  position: absolute; }\n  .table-print-water span {\n    font-size: inherit;\n    color: inherit; }\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(1);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss
var loader_js_src = __webpack_require__(0);

// CONCATENATED MODULE: ./src/index.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(loader_js_src["a" /* default */], options);



/* harmony default export */ var src = (loader_js_src["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/index.js

const __PAGE_W = 210;
const __PAGE_H = 294;
const __PAGE_LAND_W = 297;
const __PAGE_LAND_H = 171;
const A4_HEIGHT = __PAGE_H;
const A4_WIDTH = __PAGE_W;
const A4_LANDSCAPE_WIDTH = __PAGE_LAND_W;
const A4_LANDSCAPE_HEIGHT = __PAGE_LAND_H;
const DOM_ROOT = 'table-print-root';
const DOM_SRC_TABLE = 'table-print-src';
const DOM_HEADER = 'table-print-header';
const DOM_FOOTER = 'table-print-footer';

class TablePrint {
  constructor({
    landscape = false,
    footer = null,
    header = null,
    targetDom = document.body,
    children = [],
    water = null,
    debug = false,
    waterHeight = 0
  }) {
    this.state = {
      landscape,
      children,
      footer,
      header,
      targetDom,
      water,
      waterHeight,
      PAGE_HEIGHT: landscape ? A4_LANDSCAPE_HEIGHT : A4_HEIGHT,
      PAGE_WIDTH: landscape ? A4_LANDSCAPE_WIDTH : A4_WIDTH,
      debug
    };
    this.footer_default = document.createElement('footer');
    this.footer_default.className = "table-print-footer-content";
    this.footer_default.innerHTML = `@page/@total`;
    this.dialog = null;
  }

  mm2px(mm) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);
    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `width:1mm;height:${mm}mm;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    targetDom.appendChild(tmpNode);
    let h = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
    console.log(`${mm}->${h}px`);
    return h;
  }

  preRenderGetHeight(dom) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);
    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    tmpNode.appendChild(dom);
    targetDom.appendChild(tmpNode);
    let h = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
    return h;
  }

  getThead(dom) {
    if (dom.children[0].nodeName.toLocaleLowerCase() === 'thead') {
      return dom.children[0];
    }

    return null;
  }

  getTBody(dom) {
    if (dom.children[1].nodeName.toLocaleLowerCase() === 'tbody') {
      return dom.children[1];
    }

    return null;
  }

  getAllTr(tbody) {
    return tbody.children;
  }

  moveDom(dom, pageList, maxHeight) {
    let height = dom.offsetHeight;
    let page = pageList[pageList.length - 1];

    const addNewPage = (pageList, dom, height, maxHeight) => {
      let newPage = {
        children: [],
        curHeight: 0,
        maxHeight: maxHeight
      };
      pageList.push(newPage);
      newPage.children.push(dom);
      newPage.curHeight += height;
    };

    if (dom.style.pageBreakBefore === 'always') {
      addNewPage(pageList, dom, height, maxHeight);
      return;
    }

    if (page.curHeight + height < maxHeight) {
      page.children.push(dom);
      page.curHeight += height;
      return;
    }

    if (dom.nodeName.toLocaleLowerCase() === 'table') {
      let thead = this.getThead(dom);
      let tbody = this.getTBody(dom);

      const createNewTable = () => {
        let newTable = dom.cloneNode();
        let newTBody = tbody.cloneNode();
        newTable.appendChild(thead.cloneNode(true));
        newTable.appendChild(newTBody);
        return {
          table: newTable,
          tbody: newTBody
        };
      };

      let curTable = createNewTable();

      for (let i = 0; i < tbody.children.length; i++) {
        let tr = tbody.children[i].cloneNode(true);
        curTable.tbody.appendChild(tr);
        let curH = this.preRenderGetHeight(curTable.table);

        if (page.curHeight + curH > maxHeight) {
          if (tbody.children.length > 1) {
            curTable.tbody.removeChild(tr);
            page.children.push(curTable.table);
            let newPage = {
              children: [],
              curHeight: 0,
              maxHeight: maxHeight
            };
            pageList.push(newPage);
            page = newPage;
            curTable = createNewTable();
            i--;
          } else {
            let newPage = {
              children: [],
              curHeight: 0,
              maxHeight: maxHeight
            };
            pageList.push(newPage);
            page = newPage;
            page.children.push(curTable.table);
            page.curHeight += curH;
            curTable = createNewTable();
          }
        }
      }

      if (curTable.tbody.children.length > 0) {
        let curH = this.preRenderGetHeight(curTable.table);
        page.children.push(curTable.table);
        page.curHeight += curH;
      }
    } else {
      addNewPage(pageList, dom, height, maxHeight);
    }
  }

  debugPrint() {
    let root = document.createElement('section');
    root.className = DOM_ROOT;
    root.id = DOM_ROOT;
    this.state.targetDom.appendChild(root);
    const borderConfig = [['red', 'green'], ['blue', 'black']]; // let ref = this.state.targetDom.querySelector(`#${DOM_SRC_TABLE}`);
    // let {landscape}=this.state;

    let landscape = false;
    const pageClass = landscape ? 'A4landscape' : 'A4';

    for (let i = 0; i < 3; i++) {
      let page = document.createElement('section');
      page.className = `${DOM_SRC_TABLE} ${pageClass}`; // page.style.border=`5mm solid ${borderConfig[i%2][0]}`;

      page.style.padding = "5mm";
      let content = document.createElement('div'); // content.style.border=`1px solid ${borderConfig[i%2][1]}`;
      // content.style.width='100%';
      // content.style.height='100%';
      // content.className='content';
      // content.innerText = `${i}:5mm bottom 5mm`;
      // page.append(content);

      page.innerText = '1231';
      root.appendChild(page);
    }

    window.print(); // ref.style.display='none';
  }

  print(review = false) {
    let printRoot = this.createPrintRootDom(review);
    this.showDialog(printRoot, review);
    let {
      PAGE_HEIGHT,
      landscape
    } = this.state;
    let ref = document.querySelector(`#${DOM_SRC_TABLE}`);
    let pageHeight = landscape ? this.mm2px(PAGE_HEIGHT - 30 - 30) : this.mm2px(PAGE_HEIGHT - 30 - 15);
    let pageList = [{
      children: [],
      curHeight: 0,
      maxHeight: pageHeight
    }];

    for (let i = 0; i < ref.children.length; i++) {
      this.moveDom(ref.children[i], pageList, pageHeight);
    }

    let water = this.state.water;
    let waterBox;

    if (water) {
      if (water === true) {
        water = document.createElement('div');
        water.className = 'table-print-water';
        water.innerHTML = `<span>还有下一页</span>`;
      } else {
        water = water.children[0].cloneNode(true);
      }

      waterBox = document.createElement('section');
      waterBox.className = 'table-print-water-box';
      waterBox.appendChild(water);
      let deg = this.rand(35, 89);
      let x = this.rand(15, 60);
      let y = this.rand(0, 50) - 25;
      waterBox.style.transform = `rotate3d(0,0,1,${deg}deg)`;
      waterBox.style.left = `${x}%`;
      waterBox.style.bottom = '-' + y + 'px';
    }

    const pageClass = landscape ? 'A4landscape' : 'A4';

    for (let i = 0; i < pageList.length; i++) {
      let page = document.createElement('section');
      page.className = `${DOM_SRC_TABLE} ${pageClass}`;
      let headerBox = document.createElement('div');
      headerBox.className = `${DOM_HEADER}`;
      let footerBox = document.createElement('div');
      footerBox.className = `${DOM_FOOTER}`;
      page.appendChild(headerBox);
      page.appendChild(footerBox);

      if (this.state.header) {
        let domHeader = this.state.header.cloneNode(true);
        headerBox.appendChild(domHeader);
      }

      pageList[i].children.forEach(child => {
        page.appendChild(child);
      }); // render footer

      if (this.state.footer) {
        if (this.state.footer === true) {
          this.state.footer = this.footer_default;
        }

        let domFooter = this.state.footer.cloneNode(true);
        let innerText = domFooter.innerText;
        innerText = innerText.replace('@page', i + 1);
        innerText = innerText.replace('@total', pageList.length);
        domFooter.innerText = innerText;
        footerBox.appendChild(domFooter);
      }

      if (i != pageList.length - 1) {
        if (water) {
          page.appendChild(waterBox.cloneNode(true));
        }
      }

      this.dialog.querySelector(`#${DOM_ROOT}`).appendChild(page);
    }

    ref.style.display = 'none';

    if (!review) {
      this.doPrint();
      return;
    }
  }

  rand(min, max, seed) {
    if (!seed) {
      seed = Math.random();
    }

    var ret = Math.ceil(seed * (max - min + 1) - 1) + min;
    return ret;
  }

  closeDialog() {
    if (!this.dialog) return;
    document.body.removeChild(this.dialog);
    this.dialog = null;
  }

  doPrint() {
    let printDom = document.querySelector('#table-print-root');
    document.body.appendChild(printDom);
    this.closeDialog();
    window.print();
    document.body.removeChild(printDom);
  }

  showDialog(dom, review) {
    let root = document.createElement('section');
    root.className = 'table-print-dialog';
    root.id = 'table-print-dialog';
    this.dialog = root;
    var btnGroup = document.createElement('hgroup');
    btnGroup.className = "table-print-dialog-btn-group";
    var btnCancel = document.createElement('div');
    btnCancel.className = 'table-print-dialog-btn-cancel';
    btnCancel.innerText = '取消';
    var btnOk = document.createElement('div');
    btnOk.className = 'table-print-dialog-btn-ok';
    btnOk.innerText = '打印';
    var btnCancel = document.createElement('div');
    btnCancel.className = 'table-print-dialog-btn-cancel';
    btnCancel.innerText = '取消';
    btnGroup.appendChild(btnOk);
    btnGroup.appendChild(btnCancel);
    var title = document.createElement('div');
    title.className = 'table-print-dialog-title';
    title.innerText = '打印预览';
    root.appendChild(title);
    root.appendChild(btnGroup);
    root.appendChild(dom);

    btnOk.onclick = () => {
      this.doPrint();
    };

    btnCancel.onclick = () => {
      this.closeDialog();
    };

    document.body.appendChild(root);
  }

  createPrintRootDom() {
    const {
      landscape,
      children
    } = this.state;
    const pageClass = landscape ? 'A4landscape' : 'A4';
    let root = document.createElement('section');
    root.className = DOM_ROOT;
    root.id = DOM_ROOT;
    let printSrc = document.createElement('section');
    printSrc.className = `${DOM_SRC_TABLE} ${pageClass}`;
    printSrc.id = DOM_SRC_TABLE;

    for (let i = 0; i < children.length; i++) {
      printSrc.appendChild(children[i].cloneNode(true));
    }

    root.appendChild(printSrc);
    return root; // this.state.targetDom.appendChild(root);
  }

}

/* harmony default export */ var src_0 = __webpack_exports__["default"] = (TablePrint);

/***/ })
/******/ ]);
});