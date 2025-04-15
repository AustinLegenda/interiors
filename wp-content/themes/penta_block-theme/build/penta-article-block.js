/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./penta-blocks/penta-nav.js":
/*!***********************************!*\
  !*** ./penta-blocks/penta-nav.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const PentaNav = () => {
  const [blogName, setBlogName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(siteInfo.blogName);
  const [homeUrl, setHomeUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(siteInfo.homeUrl);
  const [menuItems, setMenuItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const controlRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const colorRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const navItemsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const navRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Fetch menu items using the custom REST API endpoint
    wp.apiFetch({
      path: '/mytheme/v1/menu-items/mainNav'
    }).then(items => setMenuItems(items)).catch(error => console.error('Error fetching menu items:', error));
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // After the component mounts, you can access the refs
    const controlElems = document.getElementsByClassName("nav-control-btns");
    const navItemsElem = document.getElementById("menu-main-menu");
    const navElem = document.getElementsByTagName("nav")[0];
    const logoElem = document.getElementById("LogoType");

    // Assign refs only when the elements exist
    if (controlElems.length) {
      controlRef.current = Array.from(controlElems);
    }
    if (navItemsElem) {
      navItemsRef.current = navItemsElem;
    }
    if (navElem) {
      navRef.current = navElem;
      colorRef.current.push(navElem); // Add nav element to colorRef
    }
    if (logoElem) {
      colorRef.current.push(logoElem); // Add logo element to colorRef
    }

    // Add control elements to colorRef
    controlRef.current.forEach(control => {
      if (control) {
        colorRef.current.push(control);
      }
    });

    // Log the refs to ensure they are correctly assigned
    console.log('Refs:', {
      control: controlRef.current,
      color: colorRef.current,
      navItems: navItemsRef.current,
      nav: navRef.current
    });

    // Add event listeners for control buttons
    controlRef.current.forEach(button => {
      if (button) {
        button.addEventListener("click", handleNavToggle);
      }
    });

    // Clean up the event listeners on unmount
    return () => {
      controlRef.current.forEach(button => {
        if (button) {
          button.removeEventListener("click", handleNavToggle);
        }
      });
    };
  }, [menuItems]);
  const handleNavToggle = () => {
    if (controlRef.current[0] && controlRef.current[0].classList.contains("hide")) {
      mobileNav();
    } else {
      openMobileNav();
    }
  };
  const mobileNav = () => {
    if (controlRef.current[0]) {
      controlRef.current[0].classList.remove("hide");
    }
    if (controlRef.current[1]) {
      controlRef.current[1].classList.add("hide");
    }

    // Remove "white" class from all colorRef elements
    colorRef.current.forEach(el => {
      if (el && el.classList.contains("white")) {
        el.classList.remove("white");
      }
    });
    if (navItemsRef.current) {
      navItemsRef.current.classList.add("hide");
    }
    if (navRef.current) {
      navRef.current.classList.remove("open", "nav-overlay");
    }
  };
  const killMobileNav = () => {
    if (navRef.current) {
      navRef.current.classList.remove("nav-overlay", "open");
    }
    if (navItemsRef.current) {
      navItemsRef.current.classList.remove("hide");
    }
    controlRef.current.forEach(i => {
      if (i) {
        i.classList.add("hide");
      }
    });
    colorRef.current.forEach(i => {
      if (i) {
        i.classList.remove("white");
      }
    });
  };
  const openMobileNav = () => {
    if (navItemsRef.current) {
      navItemsRef.current.classList.remove("hide");
    }
    if (navRef.current) {
      navRef.current.classList.add("nav-overlay", "open");
    }

    // Add "white" class to all colorRef elements
    colorRef.current.forEach(el => {
      if (el) {
        el.classList.add("white");
      }
    });
    controlRef.current.forEach(i => {
      if (i) {
        i.classList.toggle("hide");
      }
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const mqListener = window.matchMedia("(max-width:750px)");
    const handleMediaChange = event => {
      if (event.matches) {
        mobileNav();
      } else {
        killMobileNav();
      }
    };
    handleMediaChange(mqListener);
    mqListener.addEventListener('change', handleMediaChange);
    return () => {
      mqListener.removeEventListener('change', handleMediaChange);
    };
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: homeUrl,
    className: "grid-top grid-left mobile-nav logo-type targets",
    id: "LogoType",
    ref: el => colorRef.current.push(el)
  }, blogName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    id: "mainNav",
    className: "mobile-nav targets",
    ref: el => {
      navRef.current = el; // Assign to navRef
      colorRef.current.push(el); // Add nav element to colorRef
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    id: "menu-main-menu",
    className: "nav-items",
    ref: navItemsRef
  }, menuItems.length > 0 ? menuItems.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: item.id,
    ref: el => colorRef.current.push(el)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.url
  }, item.title))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "No menu items found."))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nav-control-btns grid-top grid-right mobile-nav hide targets",
    ref: el => controlRef.current[0] = el
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h6", null, "=")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nav-control-btns grid-top grid-right mobile-nav hide",
    ref: el => controlRef.current[1] = el
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h6", null, "x")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PentaNav);

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./penta-blocks/penta-article-block.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _penta_nav_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./penta-nav.js */ "./penta-blocks/penta-nav.js");






wp.blocks.registerBlockType("pentablocktheme/penta-article-block", {
  title: "Penta Article Block",
  edit: EditComponent,
  save: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null);
  }
});
function EditComponent() {
  const post = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core/editor').getCurrentPost()); // Get current post data
  const [categoryNames, setCategoryNames] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // State for category names
  const [previousPost, setPreviousPost] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null); // State for the previous post
  const [nextPost, setNextPost] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null); // State for the next post

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (post && Array.isArray(post.categories) && post.categories.length > 0) {
      // Fetch category details from REST API based on category IDs
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: `/wp/v2/categories?include=${post.categories.join(',')}`
      }).then(categories => {
        const names = categories.map(category => category.name); // Get the category names
        setCategoryNames(names); // Store them in state
      });

      // Fetch previous and next posts using the REST API
      const currentPostId = post.id;
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: `/wp/v2/posts?per_page=1&exclude=${currentPostId}&orderby=date&order=asc`
      }).then(posts => {
        if (posts.length > 0) {
          setNextPost(posts[0]);
        }
      });
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: `/wp/v2/posts?per_page=1&exclude=${currentPostId}&orderby=date&order=desc`
      }).then(posts => {
        if (posts.length > 0) {
          setPreviousPost(posts[0]);
        }
      });
    }
  }, [post]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "main-grid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_penta_nav_js__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "main-grid-full"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "penta-article-group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "penta-article-column"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, post?.title?.rendered || 'Post Title'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, categoryNames.length > 0 ? categoryNames.join(', ') : 'Categories'), " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "penta-article-column"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, post?.excerpt?.rendered || 'The post excerpt will be here.')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pagination"
  }, previousPost ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: previousPost.link,
    rel: "prev"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "  \xAB ", previousPost.title.rendered, " ")) : 'No previous post', nextPost ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: nextPost.link,
    rel: "next"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, " ", nextPost.title.rendered, " \xBB   ")) : 'No next post')));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditComponent);
/******/ })()
;
//# sourceMappingURL=penta-article-block.js.map