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

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

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
/*!*******************************************!*\
  !*** ./penta-blocks/penta-header-hero.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _penta_nav_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./penta-nav.js */ "./penta-blocks/penta-nav.js");




wp.blocks.registerBlockType('pentablocktheme/penta-header-hero', {
  title: 'Penta Header Hero',
  attributes: {
    textColor: {
      type: 'string',
      default: '#222'
    },
    title: {
      type: 'string',
      default: ''
    },
    // no source/selector
    excerpt: {
      type: 'string',
      default: ''
    },
    // no source/selector
    gridClass: {
      type: 'string',
      default: 'grid-bottom grid-bottom-right'
    },
    heroImage: {
      type: 'object',
      default: null
    },
    linkURL: {
      type: 'string',
      default: ''
    }
  },
  edit: EditComponent,
  save: SaveComponent
});
function EditComponent({
  attributes,
  setAttributes
}) {
  // Destructure ALL attributes at once:
  const {
    textColor,
    title,
    excerpt,
    gridClass,
    heroImage,
    linkURL
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    style: {
      color: textColor
    }
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: "Text & Layout",
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
    title: "Text Color",
    initialOpen: false,
    colorSettings: [{
      value: textColor,
      onChange: color => setAttributes({
        textColor: color
      }),
      label: 'Text Color'
    }]
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: "Grid Position",
    value: gridClass,
    options: [{
      label: 'Bottom Left',
      value: 'grid-bottom grid-left'
    }, {
      label: 'Bottom Center',
      value: 'grid-bottom-center'
    }, {
      label: 'Bottom Right',
      value: 'grid-bottom grid-bottom-right'
    }, {
      label: 'Center Left',
      value: 'grid-center-left'
    }, {
      label: 'Center Center',
      value: 'grid-center-center'
    }, {
      label: 'Center Right',
      value: 'grid-center-right'
    }],
    onChange: newGrid => setAttributes({
      gridClass: newGrid
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: "Hero Image",
    initialOpen: !heroImage // auto‑open only when no image
    ,
    className: heroImage ? 'has-image' : ''
  }, heroImage ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: heroImage.url,
    alt: heroImage.alt || '',
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      marginBottom: '8px'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSecondary: true,
    onClick: () => setAttributes({
      heroImage: null
    })
  }, "Remove Image"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: media => setAttributes({
      heroImage: {
        id: media.id,
        url: media.url,
        alt: media.alt
      }
    }),
    allowedTypes: ['image'],
    value: heroImage.id,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      style: {
        marginLeft: '8px'
      },
      isSecondary: true,
      onClick: open
    }, "Replace Image")
  })))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: media => setAttributes({
      heroImage: {
        id: media.id,
        url: media.url,
        alt: media.alt
      }
    }),
    allowedTypes: ['image'],
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: open,
      isSecondary: true
    }, "Upload/Select Image")
  })))), "                ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: "Link Settings",
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.URLInputButton, {
    label: "Hero Link URL",
    url: linkURL,
    onChange: newUrl => setAttributes({
      linkURL: newUrl
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wrapper",
    id: "PentaHeader"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "header-container main-grid",
    style: {
      color: textColor
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_penta_nav_js__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tag-and-title ${gridClass}`,
    id: "TagAndTitle"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
    tagName: "h3",
    className: "title",
    value: title || '',
    onChange: newText => setAttributes({
      title: newText
    }),
    placeholder: "Add Title Here"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
    tagName: "h3",
    className: "tag",
    value: excerpt || '',
    onChange: newText => setAttributes({
      excerpt: newText
    }),
    placeholder: "Add excerpt here"
  })), heroImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: attributes.linkURL || '#',
    target: "_blank",
    className: "main-grid-bleed"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: heroImage.url,
    alt: heroImage.alt || title,
    style: {
      height: '100vh',
      width: '100%',
      objectFit: 'cover'
    }
  })))));
}
function SaveComponent() {
  return null;
}
/******/ })()
;
//# sourceMappingURL=penta-header-hero.js.map