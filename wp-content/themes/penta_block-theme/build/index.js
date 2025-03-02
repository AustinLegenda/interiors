/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/penta_editor_functions.js":
/*!*******************************************!*\
  !*** ./scripts/penta_editor_functions.js ***!
  \*******************************************/
/***/ (() => {

/**
 *Nav Menu Magic
 window resize event functions
https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/matches
**/
//Constructors

/*var control = Array.from(document.getElementsByClassName("nav-control-btns"));
var color = Array.from(document.getElementsByClassName("mobile-nav"));
var footer = document.querySelector("footer");
var navItems = document.getElementById("menu-main-menu");
var nav = document.getElementsByTagName("nav")[0];

function MobileNav() {
  //set nav control buttons
  control[0].classList.remove("hide");
  control[1].classList.add("hide");
  //check for white and remove
  if (color[0].classList.contains("white")) {
    color.forEach((i) => {
      i.classList.remove("white");
    });
  } else {}
  //check for footer and remove
  if (footer.classList.contains("out-of-step")) {
    footer.classList.remove("out-of-step");
  } else {}
  //hide open close elements
  navItems.classList.add("hide");
  nav.classList.remove("open", "nav-overlay");
}

function killMobileNav() {
  //reset nav items
  nav.classList.remove("nav-overlay", "open");
  navItems.classList.remove("hide");
  //hide all control buttons
  control.forEach((i) => {
    i.classList.add("hide");
  });
  //remove white classes
  color.forEach((i) => {
    i.classList.remove("white");
  });
  //remove footer class
  footer.classList.remove("out-of-step");
}

function openMobileNav() {
  navItems.classList.remove("hide");
  nav.classList.add("nav-overlay", "open");
  //add white classes
  color.forEach((i) => {
    i.classList.add("white");
  });
  //toggle control buttons
  control.forEach((i) => {
    i.classList.toggle("hide");
  });
  //add footer class
  footer.classList.add("out-of-step");

}

//click event
control.forEach((i) => {
  i.addEventListener("click", () => {
    if (control[0].classList.contains("hide")) {
      MobileNav();
    } else {
      openMobileNav();
    }
  });
});

//setup listener and callback
function addMQListener(mq, callback) {
  if (mq.addEventListener) {
    mq.addEventListener("change", callback);
  } else {
    mq.addListener(callback);
  }
}

//window-size-change event
addMQListener(window.matchMedia("(max-width:750px)"), (event) => {
  if (event.matches) {
    MobileNav();
  } else {
    killMobileNav();
  }
});*/
/**
 * killing landscape function for mobile nav. Is source of glitch on med-lg screens. 
 */
//window-orientation-change event
// addMQListener(window.matchMedia("(orientation:landscape)"),
//   event => {
//     if (event.matches) {
//       killMobileNav();
//     } else {
//       MobileNav();
//     }
//   }
// );

//window-size event for devices and page load at or below 750px
/*if (window.innerWidth <= 750) {
  MobileNav();
} else {

}*/

/**
 *Folio scroll behavior
 **/
//constructors 
var btns = Array.from(document.getElementsByClassName("btns"));
var container = Array.from(document.getElementsByClassName("work-cat-container"));

//utility functions 
btns.forEach(i => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    i.style.display = "none";
  }
  var x = i.parentNode;
  var y = Array.from(x.querySelectorAll(".work-feed-container"));
  y.forEach(n => {
    n.addEventListener("mouseenter", () => {
      i.classList.toggle("transparent");
    });
    container.forEach(d => {
      d.addEventListener("mouseleave", () => {
        if (i.classList.contains("transparent")) {
          //don't do shit
        } else {
          i.classList.toggle("transparent");
        }
      });
    });
    btns.forEach(e => {
      e.addEventListener("mouseleave", () => {
        i.classList.add("transparent");
      });
    });
    i.addEventListener("click", () => {
      if (i.classList.contains("slide-left")) {
        n.scrollLeft -= 200;
      } else {
        n.scrollLeft += 200;
      }
    });
  });
});

/**
 *front-page folio section 
 **/
var b = Array.from(document.getElementsByClassName("folio-container"));
var c = Array.from(document.getElementsByClassName("item-folio"));
let y = document.querySelector(".folio-wrapper");
b.forEach(i => {
  if (i.children.length == 1) {
    i.classList.add("one-col");
  } else if (i.children.length == 2) {
    i.classList.add("two-col");
  } else if (i.children.length == 3) {
    i.classList.add("three-col");
  } else if (i.children.length == 4) {
    i.classList.add("two-col");
  } else if (i.children.length == 5) {
    i.classList.add("full");
    let z = Array.from(y.children);
    z[0].classList.add("one-third-col");
    if (y.children.length > 1) {
      z[1].classList.add("one-third-col-rev");
    }
    for (var i = 5; i < c.length; i += 6) {
      if (c.length > 9) {
        c[i].classList.add("--big");
        c[i].classList.add("reverse");
        //if length of item-folio is greater than add "reverse" and "big" classes to "every 6th element"
      }
    }
  } else {}
  var x = Array.from(document.getElementsByClassName("full"));
  x.forEach(d => {
    var foo = d.querySelector(".item-folio");
    foo.classList.add("--big");
    //add big class to first child of every container that has 5 elements
  });
});

//idk what this is

Array.from(document.querySelectorAll('a[href^="#work"]')).forEach(anchor => {
  anchor.addEventListener('click', function () {
    document.getElementById("work").scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/**
 *gallery image - should probably make this a plug in
 **/
// Array.from(document.getElementsByClassName('has-nested-images')).forEach(i => {
//   if (i.children.length == 1) {
//     i.classList.add("one-col");
//   } else if (i.children.length == 2) {
//     i.classList.add("two-col");
//   } else if (i.children.length == 3) {
//     i.classList.add("three-col");
//   } else if (i.children.length == 4) {
//     i.classList.add("two-col");
//   } else if (i.children.length == 5){
//     i.classList.add("three-col");
//   } 
// else if (i.children.length == 6){
//   i.classList.add("three-col");
// } 
// });

//new fig elements to adjust for WP block markup

// function newFigEle() {
//   const block = Array.from(document.getElementsByClassName("wp-block-image"));

//   block.forEach(i => {
//     var x = i.parentNode; 
//       const org_html = i.innerHTML;
//       const new_html = "<div class='fig-container'>" + "<div class='fig-wrapper'>" + org_html + "</div>" + "</div>";
//       i.innerHTML = new_html;
//   });
// }
// newFigEle();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _scripts_penta_editor_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/penta_editor_functions.js */ "./scripts/penta_editor_functions.js");
/* harmony import */ var _scripts_penta_editor_functions_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_penta_editor_functions_js__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkpenta_block_theme"] = globalThis["webpackChunkpenta_block_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map