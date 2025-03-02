/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./block/ppg.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







// Helper functions to sanitize inputs

const sanitizeNumber = num => Number.isInteger(num) ? num : 0;
const sanitizeArray = arr => Array.isArray(arr) ? arr : [];
const sanitizeString = str => typeof str === 'string' ? str : '';
const QUERY_DEFAULTS = {
  selectedCategories: [],
  categories: {},
  numberOfItems: 5,
  order: 'desc',
  orderBy: 'date'
};
wp.blocks.registerBlockType("pentaportfoliogrid/ppg", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Penta Portfolio Grid", "ppg"),
  icon: "grid-view",
  category: "media",
  attributes: {
    textColor: {
      type: "string",
      default: "#222"
    },
    tagName: {
      type: 'string',
      default: 'h4'
    },
    title: {
      type: "string",
      source: "text",
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default Title', 'pentaportfoliogrid')
    },
    paddingLeftRight: {
      type: "string",
      default: "30px"
    },
    paddingTop: {
      type: "string",
      default: "75px"
    },
    paddingBottom: {
      type: "string",
      default: "0px"
    },
    selectedCategories: {
      type: "array",
      default: []
    },
    numberOfItems: {
      type: "number",
      default: QUERY_DEFAULTS.numberOfItems
    },
    order: {
      type: "string",
      default: QUERY_DEFAULTS.order
    },
    orderBy: {
      type: "string",
      default: QUERY_DEFAULTS.orderBy
    },
    objectPositions: {
      type: "array",
      default: []
    }
  },
  edit: EditComponent,
  save: SaveComponent
});
function EditComponent({
  attributes,
  setAttributes
}) {
  const {
    tagName,
    textColor,
    paddingLeftRight,
    paddingTop,
    paddingBottom,
    selectedCategories,
    numberOfItems,
    order,
    orderBy,
    objectPositions
  } = attributes;
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [categoryError, setCategoryError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [selectedElementIndex, setSelectedElementIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [objectPositionX, setObjectPositionX] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(50);
  const [objectPositionY, setObjectPositionY] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(50);
  const imageRefs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
  const cacheRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)({}); // Cache object to store API responses

  const [query, setQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    selectedCategories: sanitizeArray(selectedCategories),
    categories: {},
    numberOfItems: sanitizeNumber(numberOfItems) || QUERY_DEFAULTS.numberOfItems,
    order: sanitizeString(order) || QUERY_DEFAULTS.order,
    orderBy: sanitizeString(orderBy) || QUERY_DEFAULTS.orderBy
  });

  // Fetch categories on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    wp.apiFetch({
      path: '/wp/v2/categories'
    }).then(categoryData => {
      const categorySuggestions = categoryData.reduce((acc, category) => {
        acc[category.name.toLowerCase()] = category;
        return acc;
      }, {});
      const initialSelectedCategories = selectedCategories.length ? selectedCategories : [categoryData[0]];
      setQuery(prevQuery => ({
        ...prevQuery,
        categories: categorySuggestions,
        selectedCategories: sanitizeArray(initialSelectedCategories)
      }));
    });
  }, [selectedCategories]);

  // Fetch posts based on query with caching to minimize API requests
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const categoryIds = query.selectedCategories.map(category => category.id);
    if (categoryIds.length === 0) {
      setPosts([]);
      setLoading(false);
      return;
    }
    const cacheKey = `${categoryIds.join(',')}-${query.numberOfItems}-${query.order}-${query.orderBy}`;
    if (cacheRef.current[cacheKey]) {
      setPosts(cacheRef.current[cacheKey]);
      setLoading(false);
    } else {
      setLoading(true);
      wp.apiFetch({
        path: `/custom/v1/all-posts?categories=${categoryIds.join(',')}&per_page=${query.numberOfItems}&orderby=${query.orderBy}&order=${query.order}&_embed`
      }).then(postsResponse => {
        cacheRef.current[cacheKey] = postsResponse; // Cache the response
        setPosts(postsResponse);
        setLoading(false);
        imageRefs.current = postsResponse.map(() => React.createRef());
        if (objectPositions.length === 0) {
          setAttributes({
            objectPositions: postsResponse.map(() => ({
              x: 50,
              y: 50
            }))
          });
        }
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, [query]);

  // Update attributes when the query changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      selectedCategories: sanitizeArray(query.selectedCategories),
      numberOfItems: sanitizeNumber(query.numberOfItems),
      order: sanitizeString(query.order),
      orderBy: sanitizeString(query.orderBy)
    });
  }, [query, setAttributes]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    style: {
      color: textColor
    }
  });
  if (loading) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {});
  if (error) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "error",
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("There was an error loading posts.", "pentablocktheme")
  });

  // Debounce query updates to reduce API requests
  const updateQuery = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.debounce)(newQuery => {
    setQuery(prevQuery => ({
      ...prevQuery,
      ...newQuery
    }));
  }, 300);
  const handleImageClick = index => {
    setSelectedElementIndex(index);
    if (objectPositions[index]) {
      setObjectPositionX(objectPositions[index].x);
      setObjectPositionY(objectPositions[index].y);
    }
  };
  const handleObjectPositionChange = (axis, value) => {
    if (selectedElementIndex !== null) {
      const updatedObjectPositions = [...objectPositions];
      if (axis === 'x') {
        setObjectPositionX(sanitizeNumber(value));
        updatedObjectPositions[selectedElementIndex] = {
          ...updatedObjectPositions[selectedElementIndex],
          x: sanitizeNumber(value)
        };
      } else if (axis === 'y') {
        setObjectPositionY(sanitizeNumber(value));
        updatedObjectPositions[selectedElementIndex] = {
          ...updatedObjectPositions[selectedElementIndex],
          y: sanitizeNumber(value)
        };
      }
      setAttributes({
        objectPositions: updatedObjectPositions
      });
    }
  };
  const handleTagChange = newTag => setAttributes({
    tagName: sanitizeString(newTag)
  });
  const getContainerClass = (containerIndex, itemCount, fiveItemContainersCount) => {
    switch (itemCount) {
      case 1:
        return "one-col";
      case 2:
        return "two-col";
      case 3:
        return "three-col";
      case 4:
        return "two-col";
      case 5:
        return fiveItemContainersCount % 2 === 1 ? "one-third-col-rev" : "one-third-col";
      default:
        return "";
    }
  };
  const renderFolioContainers = posts => {
    const containers = [];
    const itemsPerContainer = 5;
    let currentContainer = [];
    let fiveItemContainersCount = 0;
    posts.forEach((post, index) => {
      if (post.featured_img_src) {
        const objectPosition = objectPositions[index] || {
          x: 50,
          y: 50
        };
        currentContainer.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          ref: imageRefs.current[index],
          className: "item-folio",
          onClick: () => handleImageClick(index),
          style: {
            cursor: 'pointer',
            border: selectedElementIndex === index ? '2px solid blue' : 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "folio-snippet",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: post.link,
              className: "folio-els-container",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
                src: sanitizeString(post.featured_img_src),
                alt: sanitizeString(post.title.rendered),
                loading: "lazy" // Lazy load images
                ,
                style: {
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: `${objectPosition.x}% ${objectPosition.y}%`
                }
              }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(tagName, {
                style: {
                  color: textColor,
                  margin: '0'
                }
              }, sanitizeString(post.title) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default Title', 'pentaportfoliogrid'))]
            })
          })
        }, post.id));
      }
      if ((index + 1) % itemsPerContainer === 0 || index === posts.length - 1) {
        const containerClasses = getContainerClass(containers.length, currentContainer.length, fiveItemContainersCount);
        if (currentContainer.length === 5) fiveItemContainersCount++;
        containers.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: `folio-container nav-toggle ${containerClasses}`,
          children: renderContainerItems(currentContainer, fiveItemContainersCount)
        }, `container-${containers.length}`));
        currentContainer = [];
      }
    });
    return containers;
  };
  const renderContainerItems = (items, fiveItemContainersCount) => {
    return items.map((item, index) => {
      const isBig = items.length === 5 && index === 0;
      const isReverse = isBig && fiveItemContainersCount % 2 === 0;
      return React.cloneElement(item, {
        className: `item-folio ${isBig ? '--big' : ''} ${isReverse ? 'reverse' : ''}`
      });
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "settings",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Query Settings", "pentablocktheme"),
        initialOpen: true,
        children: [categoryError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
          status: "warning",
          children: categoryError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.QueryControls, {
          maxItems: 100,
          minItems: 1,
          numberOfItems: query.numberOfItems,
          order: query.order,
          orderBy: query.orderBy,
          categorySuggestions: query.categories,
          selectedCategories: query.selectedCategories,
          onOrderByChange: newOrderBy => updateQuery({
            orderBy: sanitizeString(newOrderBy)
          }),
          onOrderChange: newOrder => updateQuery({
            order: sanitizeString(newOrder)
          }),
          onCategoryChange: newCategories => {
            const updatedCategories = newCategories.map(cat => typeof cat === 'string' ? query.categories[cat.toLowerCase()] : cat).filter(Boolean);
            if (!updatedCategories.length) setCategoryError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Please select at least one valid category.', 'pentablocktheme'));else setCategoryError(null);
            updateQuery({
              selectedCategories: sanitizeArray(updatedCategories)
            });
          },
          onNumberOfItemsChange: newNumberOfItems => updateQuery({
            numberOfItems: sanitizeNumber(newNumberOfItems)
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Text Settings", "pentablocktheme"),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.PanelColorSettings, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Text Color", "pentablocktheme"),
          initialOpen: true,
          colorSettings: [{
            value: textColor,
            onChange: color => setAttributes({
              textColor: sanitizeString(color)
            }),
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Color', 'pentablocktheme')
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Change Heading Level", "pentablocktheme"),
          value: tagName,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading 1', 'pentablocktheme'),
            value: 'h1'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading 2', 'pentablocktheme'),
            value: 'h2'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading 3', 'pentablocktheme'),
            value: 'h3'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading 4', 'pentablocktheme'),
            value: 'h4'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading 5', 'pentablocktheme'),
            value: 'h5'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('div (p by default)', 'pentablocktheme'),
            value: 'div'
          }],
          onChange: handleTagChange
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Padding Settings", "pentablocktheme"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding Left/Right', 'pentablocktheme'),
          value: parseInt(paddingLeftRight),
          onChange: value => setAttributes({
            paddingLeftRight: `${sanitizeNumber(value)}px`
          }),
          min: 0,
          max: 200
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding Top', 'pentablocktheme'),
          value: parseInt(paddingTop),
          onChange: value => setAttributes({
            paddingTop: `${sanitizeNumber(value)}px`
          }),
          min: 0,
          max: 200
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding Bottom', 'pentablocktheme'),
          value: parseInt(paddingBottom),
          onChange: value => setAttributes({
            paddingBottom: `${sanitizeNumber(value)}px`
          }),
          min: 0,
          max: 200
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Crop Selected Image", "pentablocktheme"),
        initialOpen: true,
        children: selectedElementIndex !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            children: `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Editing Image', 'pentablocktheme')} #${selectedElementIndex + 1}`
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Horizontal Position (X)', 'pentablocktheme'),
            value: objectPositionX,
            onChange: value => handleObjectPositionChange('x', value),
            min: 0,
            max: 100
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Vertical Position (Y)', 'pentablocktheme'),
            value: objectPositionY,
            onChange: value => handleObjectPositionChange('y', value),
            min: 0,
            max: 100
          })]
        })
      })]
    }), posts.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("No posts found.", "pentablocktheme")
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "folio-wrapper",
      style: {
        paddingLeft: paddingLeftRight,
        paddingRight: paddingLeftRight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom
      },
      children: renderFolioContainers(posts)
    })]
  });
}
function SaveComponent() {
  return null; // Render handled on the server via PHP template
}
})();

/******/ })()
;
//# sourceMappingURL=ppg.js.map