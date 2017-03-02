(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SwiftClick"] = factory();
	else
		root["SwiftClick"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/*
 * @license MIT License (see license.txt)
 */



function SwiftClick(contextEl) {
    // if SwiftClick has already been initialised on this element then return the instance that's already in the Dictionary.
    if (typeof SwiftClick.swiftDictionary[contextEl] !== 'undefined') return SwiftClick.swiftDictionary[contextEl];

    // add this instance of SwiftClick to the dictionary using the contextEl as the key.
    SwiftClick.swiftDictionary[contextEl] = this;

    this.options = {
        elements: { a: 'a', div: 'div', span: 'span', button: 'button' },
        minTouchDrift: 4,
        maxTouchDrift: 16,
        useCssParser: false
    };

    var _self = this;
    var _swiftContextEl = contextEl;
    var _swiftContextElOriginalClick = _swiftContextEl.onclick;
    var _currentlyTrackingTouch = false;
    var _touchStartPoint = { x: 0, y: 0 };
    var _scrollStartPoint = { x: 0, y: 0 };
    var _clickedAlready = false;

    // SwiftClick is only initialised if both touch and orientationchange are supported.
    if ('onorientationchange' in window && 'ontouchstart' in window) {
        init();
    }

    function init() {
        // check if the swift el already has a click handler and if so hijack it so it get's fired after SwiftClick's, instead of beforehand.
        if (typeof _swiftContextElOriginalClick === 'function') {
            _swiftContextEl.addEventListener('click', hijackedSwiftElClickHandler, false);
            _swiftContextEl.onclick = null;
        }

        _swiftContextEl.addEventListener('touchstart', touchStartHandler, false);
        _swiftContextEl.addEventListener('click', clickHandler, true);
    }

    function hijackedSwiftElClickHandler(event) {
        _swiftContextElOriginalClick(event);
    }

    function touchStartHandler(event) {
        var targetEl = event.target;
        var nodeName = targetEl.nodeName.toLowerCase();
        var touch = event.changedTouches[0];

        // don't synthesize an event if the node is not an acceptable type (the type isn't in the dictionary).
        if (typeof _self.options.elements[nodeName] === 'undefined') {
            return true;
        }

        // don't synthesize an event if we are already tracking an element.
        if (_currentlyTrackingTouch) {
            return true;
        }

        // check parents for 'swiftclick-ignore' class name.
        if (_self.options.useCssParser && checkIfElementShouldBeIgnored(targetEl)) {
            _clickedAlready = false;
            return true;
        }

        event.stopPropagation();

        _currentlyTrackingTouch = true;

        // store touchstart positions so we can check for changes later (within touchend handler).
        _touchStartPoint.x = touch.pageX;
        _touchStartPoint.y = touch.pageY;
        _scrollStartPoint = getScrollPoint();

        // only add the 'touchend' listener now that we know the element should be tracked.
        targetEl.removeEventListener('touchend', touchEndHandler, false);
        targetEl.addEventListener('touchend', touchEndHandler, false);

        targetEl.removeEventListener('touchcancel', touchCancelHandler, false);
        targetEl.addEventListener('touchcancel', touchCancelHandler, false);
    }

    function touchEndHandler(event) {
        var targetEl = event.target;
        var touchend = event.changedTouches[0];

        targetEl.removeEventListener('touchend', touchEndHandler, false);

        _currentlyTrackingTouch = false;

        // don't synthesize a click event if the touchpoint position has drifted significantly, as the user is not trying to click.
        if (hasTouchDriftedTooFar(touchend)) {
            return true;
        }

        // prevent default actions and create a synthetic click event before returning false.
        event.stopPropagation();
        event.preventDefault();

        _clickedAlready = false;

        targetEl.focus();
        synthesizeClickEvent(targetEl, touchend);

        // return false in order to surpress the regular click event.
        return false;
    }

    function touchCancelHandler(event) {
        event.target.removeEventListener('touchcancel', touchCancelHandler, false);

        _currentlyTrackingTouch = false;
    }

    function clickHandler(event) {
        var targetEl = event.target;
        var nodeName = targetEl.nodeName.toLowerCase();

        if (typeof _self.options.elements[nodeName] !== 'undefined') {
            if (_clickedAlready) {
                _clickedAlready = false;

                event.stopPropagation();
                event.preventDefault();
                return false;
            }

            _clickedAlready = true;
        }
    }

    function synthesizeClickEvent(el, touchend) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('click', true, true, window, 1, touchend.screenX, touchend.screenY, touchend.clientX, touchend.clientY, false, false, false, false, 0, null);

        el.dispatchEvent(clickEvent);
    }

    function getScrollPoint() {
        var scrollPoint = {
            x: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0,
            y: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
        };

        return scrollPoint;
    }

    function checkIfElementShouldBeIgnored(el) {
        var classToIgnore = 'swiftclick-ignore';
        var classToForceClick = 'swiftclick-force';
        var parentEl = el.parentNode;
        var shouldIgnoreElement = false;

        // ignore the target el and return early if it has the 'swiftclick-ignore' class.
        if (hasClass(el, classToIgnore)) {
            return true;
        }

        // don't ignore the target el and return early if it has the 'swiftclick-force' class.
        if (hasClass(el, classToForceClick)) {
            return shouldIgnoreElement;
        }

        // the topmost element has been reached.
        if (parentEl === null) {
            return shouldIgnoreElement;
        }

        // ignore the target el if one of its parents has the 'swiftclick-ignore' class.
        while (parentEl) {
            if (hasClass(parentEl, classToIgnore)) {
                parentEl = null;
                shouldIgnoreElement = true;
            } else {
                parentEl = parentEl.parentNode;
            }
        }

        return shouldIgnoreElement;
    }

    function hasTouchDriftedTooFar(touchend) {
        var maxDrift = _self.options.maxTouchDrift;
        var scrollPoint = getScrollPoint();

        return Math.abs(touchend.pageX - _touchStartPoint.x) > maxDrift || Math.abs(touchend.pageY - _touchStartPoint.y) > maxDrift || Math.abs(scrollPoint.x - _scrollStartPoint.x) > maxDrift || Math.abs(scrollPoint.y - _scrollStartPoint.y) > maxDrift;
    }

    function hasClass(el, className) {

        var classExists = typeof el.className !== 'undefined' ? (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1 : false;

        return classExists;
    }
}

SwiftClick.swiftDictionary = {};

SwiftClick.prototype.setMaxTouchDrift = function (maxTouchDrift) {
    if (typeof maxTouchDrift !== 'number') {
        throw new TypeError('expected "maxTouchDrift" to be of type "number"');
    }

    if (maxTouchDrift < this.options.minTouchDrift) {
        maxTouchDrift = this.options.minTouchDrift;
    }

    this.options.maxTouchDrift = maxTouchDrift;
};

// add an array of node names (strings) for which swift clicks should be synthesized.
SwiftClick.prototype.addNodeNamesToTrack = function (nodeNamesArray) {
    var i = 0;
    var length = nodeNamesArray.length;
    var currentNodeName;

    for (i; i < length; i++) {
        if (typeof nodeNamesArray[i] !== 'string') {
            throw new TypeError('all values within the "nodeNames" array must be of type "string"');
        }

        currentNodeName = nodeNamesArray[i].toLowerCase();
        this.options.elements[currentNodeName] = currentNodeName;
    }
};

SwiftClick.prototype.replaceNodeNamesToTrack = function (nodeNamesArray) {
    this.options.elements = {};
    this.addNodeNamesToTrack(nodeNamesArray);
};

SwiftClick.prototype.useCssParser = function (useParser) {
    this.options.useCssParser = useParser;
};

// use a basic implementation of the composition pattern in order to create new instances of SwiftClick.
SwiftClick.attach = function (contextEl) {
    // if SwiftClick has already been initialised on this element then return the instance that's already in the Dictionary.
    if (typeof SwiftClick.swiftDictionary[contextEl] !== 'undefined') {
        return SwiftClick.swiftDictionary[contextEl];
    }

    return new SwiftClick(contextEl);
};

console.log('module:', module);
console.log('define:', __webpack_require__(0));

// module.exports = SwiftClick;

// check for AMD/Module support, otherwise define SwiftClick as a global variable.
// if (typeof define !== 'undefined' && define.amd)
// {
//     // AMD. Register as an anonymous module.
//     define (function()
//     {
//         return SwiftClick;
//     });

// }
// else if (typeof module !== 'undefined' && module.exports)
// {
//     module.exports = SwiftClick;
// }
// else
// {
//     window.SwiftClick = SwiftClick;
// }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=swiftclick.js.map