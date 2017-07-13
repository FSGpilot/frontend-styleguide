(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError();
  if ('function' != typeof fn) throw new TypeError();
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;

},{}],2:[function(require,module,exports){
/**
 * array-foreach
 *   Array#forEach ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-foreach
 *
 * Copyright (c) 2015-2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/array-foreach/blob/master/MIT-LICENSE
 */
'use strict';

module.exports = function forEach(ary, callback, thisArg) {
    if (ary.forEach) {
        ary.forEach(callback, thisArg);
        return;
    }
    for (var i = 0; i < ary.length; i += 1) {
        callback.call(thisArg, ary[i], i, ary);
    }
};

},{}],3:[function(require,module,exports){
"use strict";

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(window.self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition();else if (typeof define == 'function' && _typeof(define.amd) == 'object') define(definition);else this[name] = definition();
}('domready', function () {

  var fns = [],
      _listener,
      doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
    doc.removeEventListener(domContentLoaded, _listener);
    loaded = 1;
    while (_listener = fns.shift()) {
      _listener();
    }
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],5:[function(require,module,exports){
'use strict';

// <3 Modernizr
// https://raw.githubusercontent.com/Modernizr/Modernizr/master/feature-detects/dom/dataset.js

function useNative() {
	var elem = document.createElement('div');
	elem.setAttribute('data-a-b', 'c');

	return Boolean(elem.dataset && elem.dataset.aB === 'c');
}

function nativeDataset(element) {
	return element.dataset;
}

module.exports = useNative() ? nativeDataset : function (element) {
	var map = {};
	var attributes = element.attributes;

	function getter() {
		return this.value;
	}

	function setter(name, value) {
		if (typeof value === 'undefined') {
			this.removeAttribute(name);
		} else {
			this.setAttribute(name, value);
		}
	}

	for (var i = 0, j = attributes.length; i < j; i++) {
		var attribute = attributes[i];

		if (attribute) {
			var name = attribute.name;

			if (name.indexOf('data-') === 0) {
				var prop = name.slice(5).replace(/-./g, function (u) {
					return u.charAt(1).toUpperCase();
				});

				var value = attribute.value;

				Object.defineProperty(map, prop, {
					enumerable: true,
					get: getter.bind({ value: value || '' }),
					set: setter.bind(element, name)
				});
			}
		}
	}

	return map;
};

},{}],6:[function(require,module,exports){
'use strict';

// element-closest | CC0-1.0 | github.com/jonathantneal/closest

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = require('object-assign');
var delegate = require('../delegate');
var delegateAll = require('../delegateAll');

var DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
var SPACE = ' ';

var getListeners = function getListeners(type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;
  if (match) {
    type = match[1];
    selector = match[2];
  }

  var options;
  if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var listener = {
    selector: selector,
    delegate: (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler,
    options: options
  };

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(function (_type) {
      return assign({ type: _type }, listener);
    });
  } else {
    listener.type = type;
    return [listener];
  }
};

var popKey = function popKey(obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};

module.exports = function behavior(events, props) {
  var listeners = Object.keys(events).reduce(function (memo, type) {
    var listeners = getListeners(type, events[type]);
    return memo.concat(listeners);
  }, []);

  return assign({
    add: function addBehavior(element) {
      listeners.forEach(function (listener) {
        element.addEventListener(listener.type, listener.delegate, listener.options);
      });
    },
    remove: function removeBehavior(element) {
      listeners.forEach(function (listener) {
        element.removeEventListener(listener.type, listener.delegate, listener.options);
      });
    }
  }, props);
};

},{"../delegate":12,"../delegateAll":11,"object-assign":8}],10:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],11:[function(require,module,exports){
'use strict';

var delegate = require('../delegate');
var compose = require('../compose');

var SPLAT = '*';

module.exports = function delegateAll(selectors) {
  var keys = Object.keys(selectors);

  // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler
  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT];
  }

  var delegates = keys.reduce(function (memo, selector) {
    memo.push(delegate(selector, selectors[selector]));
    return memo;
  }, []);
  return compose(delegates);
};

},{"../compose":10,"../delegate":12}],12:[function(require,module,exports){
'use strict';

// polyfill Element.prototype.closest
require('element-closest');

module.exports = function delegate(selector, fn) {
  return function delegation(event) {
    var target = event.target.closest(selector);
    if (target) {
      return fn.call(target, event);
    }
  };
};

},{"element-closest":6}],13:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var RE_TRIM = /(^\s+)|(\s+$)/g;
var RE_SPLIT = /\s+/;

var trim = String.prototype.trim ? function (str) {
  return str.trim();
} : function (str) {
  return str.replace(RE_TRIM, '');
};

var queryById = function queryById(id) {
  return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
};

module.exports = function resolveIds(ids, doc) {
  if (typeof ids !== 'string') {
    throw new Error('Expected a string but got ' + (typeof ids === 'undefined' ? 'undefined' : _typeof(ids)));
  }

  if (!doc) {
    doc = window.document;
  }

  var getElementById = doc.getElementById ? doc.getElementById.bind(doc) : queryById.bind(doc);

  ids = trim(ids).split(RE_SPLIT);

  // XXX we can short-circuit here because trimming and splitting a
  // string of just whitespace produces an array containing a single,
  // empty string
  if (ids.length === 1 && ids[0] === '') {
    return [];
  }

  return ids.map(function (id) {
    var el = getElementById(id);
    if (!el) {
      throw new Error('no element with id: "' + id + '"');
    }
    return el;
  });
};

},{}],16:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var filter = require('array-filter');
var forEach = require('array-foreach');
var toggle = require('../utils/toggle');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

// XXX match .usa-accordion and .usa-accordion-bordered
var ACCORDION = '.' + PREFIX + '-accordion, .' + PREFIX + '-accordion-bordered';
var BUTTON = '.' + PREFIX + '-accordion-button[aria-controls]';
var EXPANDED = 'aria-expanded';
var MULTISELECTABLE = 'aria-multiselectable';

/**
 * Toggle a button's "pressed" state, optionally providing a target
 * state.
 *
 * @param {HTMLButtonElement} button
 * @param {boolean?} expanded If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 * @return {boolean} the resulting state
 */
var toggleButton = function toggleButton(button, expanded) {
  var accordion = button.closest(ACCORDION);
  if (!accordion) {
    throw new Error(BUTTON + ' is missing outer ' + ACCORDION);
  }

  expanded = toggle(button, expanded);
  // XXX multiselectable is opt-in, to preserve legacy behavior
  var multiselectable = accordion.getAttribute(MULTISELECTABLE) === 'true';

  if (expanded && !multiselectable) {
    forEach(getAccordionButtons(accordion), function (other) {
      if (other !== button) {
        toggle(other, false);
      }
    });
  }
};

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} true
 */
var showButton = function showButton(button) {
  return toggleButton(button, true);
};

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} false
 */
var hideButton = function hideButton(button) {
  return toggleButton(button, false);
};

/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */
var getAccordionButtons = function getAccordionButtons(accordion) {
  return filter(accordion.querySelectorAll(BUTTON), function (button) {
    return button.closest(ACCORDION) === accordion;
  });
};

var accordion = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, function (event) {
  event.preventDefault();
  return toggleButton(this);
})), {
  init: function init(root) {
    forEach(root.querySelectorAll(BUTTON), function (button) {
      var expanded = button.getAttribute(EXPANDED) === 'true';
      toggleButton(button, expanded);
    });
  },
  ACCORDION: ACCORDION,
  BUTTON: BUTTON,
  show: showButton,
  hide: hideButton,
  toggle: toggleButton,
  getButtons: getAccordionButtons
});

/**
 * TODO: for 2.0, remove everything below this comment and export the
 * behavior directly:
 *
 * module.exports = behavior({...});
 */
var Accordion = function Accordion(root) {
  this.root = root;
  accordion.on(this.root);
};

// copy all of the behavior methods and props to Accordion
var assign = require('object-assign');
assign(Accordion, accordion);

Accordion.prototype.show = showButton;
Accordion.prototype.hide = hideButton;

Accordion.prototype.remove = function () {
  accordion.off(this.root);
};

module.exports = Accordion;

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/toggle":34,"array-filter":1,"array-foreach":2,"object-assign":8}],17:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggle = require('../utils/toggle');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var HEADER = '.' + PREFIX + '-banner-header';
var EXPANDED_CLASS = PREFIX + '-banner-header-expanded';

var toggleBanner = function toggleBanner(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, HEADER + ' [aria-controls]', toggleBanner)));

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/toggle":34}],18:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var accordion = require('./accordion');
var behavior = require('../utils/behavior');
var debounce = require('lodash.debounce');
var forEach = require('array-foreach');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var HIDDEN = 'hidden';
var SCOPE = '.' + PREFIX + '-footer-big';
var NAV = SCOPE + ' nav';
var BUTTON = NAV + ' .' + PREFIX + '-footer-primary-link';
var LIST = NAV + ' ul';

var HIDE_MAX_WIDTH = 600;
var DEBOUNCE_RATE = 180;

var showPanel = function showPanel() {
  var list = this.closest(LIST);
  list.classList.remove(HIDDEN);

  // NB: this *should* always succeed because the button
  // selector is scoped to ".{prefix}-footer-big nav"
  var lists = list.closest(NAV).querySelectorAll('ul');

  forEach(lists, function (el) {
    if (el !== list) {
      el.classList.add(HIDDEN);
    }
  });
};

var resize = debounce(function () {
  var hidden = window.innerWidth < HIDE_MAX_WIDTH;
  forEach(select(LIST), function (list) {
    list.classList.toggle(HIDDEN, hidden);
  });
}, DEBOUNCE_RATE);

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showPanel)), {
  // export for use elsewhere
  HIDE_MAX_WIDTH: HIDE_MAX_WIDTH,
  DEBOUNCE_RATE: DEBOUNCE_RATE,

  init: function init(target) {
    resize();
    window.addEventListener('resize', resize);
  },

  teardown: function teardown(target) {
    window.removeEventListener('resize', resize);
  }
});

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":31,"./accordion":16,"array-foreach":2,"lodash.debounce":7}],19:[function(require,module,exports){
'use strict';

module.exports = {
  accordion: require('./accordion'),
  banner: require('./banner'),
  footer: require('./footer'),
  navigation: require('./navigation'),
  password: require('./password'),
  search: require('./search'),
  skipnav: require('./skipnav'),
  validator: require('./validator')
};

},{"./accordion":16,"./banner":17,"./footer":18,"./navigation":20,"./password":21,"./search":22,"./skipnav":23,"./validator":24}],20:[function(require,module,exports){
'use strict';

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var CONTEXT = 'header';
var NAV = '.' + PREFIX + '-nav';
var OPENERS = '.' + PREFIX + '-menu-btn';
var CLOSE_BUTTON = '.' + PREFIX + '-nav-close';
var OVERLAY = '.' + PREFIX + '-overlay';
var CLOSERS = CLOSE_BUTTON + ', .' + PREFIX + '-overlay';
var TOGGLES = [NAV, OVERLAY].join(', ');

var ACTIVE_CLASS = 'usa-mobile_nav-active';
var VISIBLE_CLASS = 'is-visible';

var toggleNav = function toggleNav(active) {
  var body = document.body;
  if (typeof active !== 'boolean') {
    active = !body.classList.contains(ACTIVE_CLASS);
  }
  body.classList.toggle(ACTIVE_CLASS, active);

  var context = this.closest(CONTEXT);
  forEach(select(TOGGLES), function (el) {
    el.classList.toggle(VISIBLE_CLASS);
  });

  if (active && context) {
    var closeButton = context.querySelector(CLOSE_BUTTON);
    if (closeButton) {
      closeButton.focus();
    }
  }
  return active;
};

var navigation = behavior(_defineProperty({}, CLICK, (_CLICK = {}, _defineProperty(_CLICK, OPENERS, toggleNav), _defineProperty(_CLICK, CLOSERS, toggleNav), _CLICK)));

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return navigation.on(el);
}, navigation);

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":31,"array-foreach":2,"object-assign":8}],21:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggleFormInput = require('../utils/toggle-form-input');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var LINK = '.' + PREFIX + '-show_password, .' + PREFIX + '-show_multipassword';

var toggle = function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/toggle-form-input":33}],22:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var ignore = require('receptor/ignore');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var BUTTON = '.js-search-button';
var FORM = '.js-search-form';
var INPUT = '[type=search]';
var CONTEXT = 'header'; // XXX
var VISUALLY_HIDDEN = PREFIX + '-sr-only';

var lastButton = void 0;

var showSearch = function showSearch(event) {
  toggleSearch(this, true);
  lastButton = this;
};

var hideSearch = function hideSearch(event) {
  toggleSearch(this, false);
  lastButton = undefined;
};

var getForm = function getForm(button) {
  var context = button.closest(CONTEXT);
  return context ? context.querySelector(FORM) : document.querySelector(FORM);
};

var toggleSearch = function toggleSearch(button, active) {
  var form = getForm(button);
  if (!form) {
    throw new Error('No ' + FORM + ' found for search toggle in ' + CONTEXT + '!');
  }

  button.hidden = active;
  form.classList.toggle(VISUALLY_HIDDEN, !active);

  if (active) {
    var input = form.querySelector(INPUT);
    if (input) {
      input.focus();
    }
    // when the user clicks _outside_ of the form w/ignore(): hide the
    // search, then remove the listener
    var listener = ignore(form, function (e) {
      if (lastButton) {
        hideSearch.call(lastButton);
      }
      document.body.removeEventListener(CLICK, listener);
    });
    document.body.addEventListener(CLICK, listener);
  }
};

var search = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showSearch)), {
  init: function init(target) {
    forEach(select(BUTTON, target), function (button) {
      toggleSearch(button, false);
    });
  },
  teardown: function teardown(target) {
    // forget the last button clicked
    lastButton = undefined;
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return search.on(el);
}, search);

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":31,"array-foreach":2,"object-assign":8,"receptor/ignore":13}],23:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var once = require('receptor/once');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;
var LINK = '.' + PREFIX + '-skipnav[href^="#"]';

var setTabindex = function setTabindex(event) {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  var id = this.getAttribute('href').slice(1);
  var target = document.getElementById(id);
  if (target) {
    target.setAttribute('tabindex', 0);
    target.addEventListener('blur', once(function (event) {
      target.setAttribute('tabindex', -1);
    }));
  } else {
    // throw an error?
  }
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, setTabindex)));

},{"../config":25,"../events":26,"../utils/behavior":30,"receptor/once":14}],24:[function(require,module,exports){
'use strict';

var behavior = require('../utils/behavior');
var validate = require('../utils/validate-input');
var debounce = require('lodash.debounce');

var change = function change(event) {
  return validate(this);
};

var validator = behavior({
  'keyup change': {
    'input[data-validation-element]': change
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return validator.on(el);
}, validator);

},{"../utils/behavior":30,"../utils/validate-input":35,"lodash.debounce":7,"object-assign":8}],25:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: 'usa'
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = {
  CLICK: 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
};

},{}],27:[function(require,module,exports){
'use strict';

var elproto = window.HTMLElement.prototype;
var HIDDEN = 'hidden';

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function get() {
      return this.hasAttribute(HIDDEN);
    },
    set: function set(value) {
      if (value) {
        this.setAttribute(HIDDEN, '');
      } else {
        this.removeAttribute(HIDDEN);
      }
    }
  });
}

},{}],28:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

},{"./element-hidden":27,"classlist-polyfill":3}],29:[function(require,module,exports){
'use strict';

var domready = require('domready');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

var uswds = require('./config');

var components = require('./components');
uswds.components = components;

domready(function () {
  var target = document.body;
  for (var name in components) {
    var behavior = components[name];
    behavior.on(target);
  }
});

module.exports = uswds;

},{"./components":19,"./config":25,"./polyfills":28,"domready":4}],30:[function(require,module,exports){
'use strict';

var assign = require('object-assign');
var forEach = require('array-foreach');
var Behavior = require('receptor/behavior');

var sequence = function sequence() {
  var seq = [].slice.call(arguments);
  return function (target) {
    var _this = this;

    if (!target) {
      target = document.body;
    }
    forEach(seq, function (method) {
      if (typeof _this[method] === 'function') {
        _this[method].call(_this, target);
      }
    });
  };
};

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
module.exports = function (events, props) {
  return Behavior(events, assign({
    on: sequence('init', 'add'),
    off: sequence('teardown', 'remove')
  }, props));
};

},{"array-foreach":2,"object-assign":8,"receptor/behavior":9}],31:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isElement = function isElement(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 1;
};

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {HTMLElement} context - The context to traverse the DOM in.
 * @return {Array.HTMLElement} - An array of DOM nodes or an empty array.
 */
module.exports = function select(selector, context) {

  if (typeof selector !== 'string') {
    return [];
  }

  if (context === undefined || !isElement(context)) {
    context = window.document;
  }

  var selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],32:[function(require,module,exports){
'use strict';

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = function (field, mask) {
  field.setAttribute('autocapitalize', 'off');
  field.setAttribute('autocorrect', 'off');
  field.setAttribute('type', mask ? 'password' : 'text');
};

},{}],33:[function(require,module,exports){
'use strict';

var forEach = require('array-foreach');
var resolveIdRefs = require('resolve-id-refs');
var select = require('./select');
var toggleFieldMask = require('./toggle-field-mask');

var CONTROLS = 'aria-controls';
var PRESSED = 'aria-pressed';
var SHOW_ATTR = 'data-show-text';
var HIDE_ATTR = 'data-hide-text';

/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */
var getHideText = function getHideText(showText) {
  return showText.replace(/\bShow\b/i, function (show) {
    return ('S' === show[0] ? 'H' : 'h') + 'ide';
  });
};

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */
module.exports = function (el) {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  var pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== 'true';

  var fields = resolveIdRefs(el.getAttribute(CONTROLS));
  forEach(fields, function (field) {
    return toggleFieldMask(field, pressed);
  });

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }

  var showText = el.getAttribute(SHOW_ATTR);
  var hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);

  el.textContent = pressed ? showText : hideText;
  el.setAttribute(PRESSED, pressed);
  return pressed;
};

},{"./select":31,"./toggle-field-mask":32,"array-foreach":2,"resolve-id-refs":15}],34:[function(require,module,exports){
'use strict';

var EXPANDED = 'aria-expanded';
var CONTROLS = 'aria-controls';
var HIDDEN = 'aria-hidden';

module.exports = function (button, expanded) {

  if (typeof expanded !== 'boolean') {
    expanded = button.getAttribute(EXPANDED) === 'false';
  }
  button.setAttribute(EXPANDED, expanded);

  var id = button.getAttribute(CONTROLS);
  var controls = document.getElementById(id);
  if (!controls) {
    throw new Error('No toggle target found with id: "' + id + '"');
  }

  controls.setAttribute(HIDDEN, !expanded);
  return expanded;
};

},{}],35:[function(require,module,exports){
'use strict';

var dataset = require('elem-dataset');

var PREFIX = require('../config').prefix;
var CHECKED = 'aria-checked';
var CHECKED_CLASS = PREFIX + '-checklist-checked';

module.exports = function validate(el) {
  var data = dataset(el);
  var id = data.validationElement;
  var checkList = id.charAt(0) === '#' ? document.querySelector(id) : document.getElementById(id);

  if (!checkList) {
    throw new Error('No validation element found with id: "' + id + '"');
  }

  for (var key in data) {
    if (key.startsWith('validate')) {
      var validatorName = key.substr('validate'.length).toLowerCase();
      var validatorPattern = new RegExp(data[key]);
      var validatorSelector = '[data-validator="' + validatorName + '"]';
      var validatorCheckbox = checkList.querySelector(validatorSelector);
      if (!validatorCheckbox) {
        throw new Error('No validator checkbox found for: "' + validatorName + '"');
      }

      var checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      validatorCheckbox.setAttribute(CHECKED, checked);
    }
  }
};

},{"../config":25,"elem-dataset":5}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXGFycmF5LWZpbHRlclxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXGFycmF5LWZvcmVhY2hcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxjbGFzc2xpc3QtcG9seWZpbGxcXHNyY1xcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXGRvbXJlYWR5XFxyZWFkeS5qcyIsIm5vZGVfbW9kdWxlc1xcZWxlbS1kYXRhc2V0XFxkaXN0XFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xcZWxlbWVudC1jbG9zZXN0XFxlbGVtZW50LWNsb3Nlc3QuanMiLCJub2RlX21vZHVsZXNcXGxvZGFzaC5kZWJvdW5jZVxcbm9kZV9tb2R1bGVzXFxsb2Rhc2guZGVib3VuY2VcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxvYmplY3QtYXNzaWduXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccmVjZXB0b3JcXGJlaGF2aW9yXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccmVjZXB0b3JcXGNvbXBvc2VcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxyZWNlcHRvclxcZGVsZWdhdGVBbGxcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxyZWNlcHRvclxcZGVsZWdhdGVcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxyZWNlcHRvclxcaWdub3JlXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccmVjZXB0b3JcXG9uY2VcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxyZXNvbHZlLWlkLXJlZnNcXGluZGV4LmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcYWNjb3JkaW9uLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcYmFubmVyLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcZm9vdGVyLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcaW5kZXguanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxuYXZpZ2F0aW9uLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xccGFzc3dvcmQuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxzZWFyY2guanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxza2lwbmF2LmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcdmFsaWRhdG9yLmpzIiwic3JjXFxqc1xcY29uZmlnLmpzIiwic3JjXFxqc1xcZXZlbnRzLmpzIiwic3JjXFxqc1xccG9seWZpbGxzXFxlbGVtZW50LWhpZGRlbi5qcyIsInNyY1xcanNcXHBvbHlmaWxsc1xcaW5kZXguanMiLCJzcmNcXGpzXFxzdGFydC5qcyIsInNyY1xcanNcXHV0aWxzXFxiZWhhdmlvci5qcyIsInNyY1xcanNcXHV0aWxzXFxzZWxlY3QuanMiLCJzcmNcXGpzXFx1dGlsc1xcdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmNcXGpzXFx1dGlsc1xcdG9nZ2xlLWZvcm0taW5wdXQuanMiLCJzcmNcXGpzXFx1dGlsc1xcdG9nZ2xlLmpzIiwic3JjXFxqc1xcdXRpbHNcXHZhbGlkYXRlLWlucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7Ozs7Ozs7OztBQVVBLE9BQU8sT0FBUCxHQUFpQixVQUFVLEdBQVYsRUFBZSxFQUFmLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3hDLE1BQUksSUFBSSxNQUFSLEVBQWdCLE9BQU8sSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLElBQWYsQ0FBUDtBQUNoQixNQUFJLEtBQUssQ0FBTCxLQUFXLEdBQVgsSUFBa0IsU0FBUyxHQUEvQixFQUFvQyxNQUFNLElBQUksU0FBSixFQUFOO0FBQ3BDLE1BQUksY0FBYyxPQUFPLEVBQXpCLEVBQTZCLE1BQU0sSUFBSSxTQUFKLEVBQU47QUFDN0IsTUFBSSxNQUFNLEVBQVY7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksSUFBSSxNQUF4QixFQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxRQUFJLENBQUMsT0FBTyxJQUFQLENB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T0FBUCxHQUFpQixTQUFTLFFBQVQsQ0FBbUIsRUFBbkIsRUFBdUI7QUFDdEMsTUFBTSxPQUFPLFFBQVEsRUFBUixDQUFiO0FBQ0EsTUFBTSxLQUFLLEtBQUssaUJBQWhCO0FBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBSCxDQUFVLENBQVYsTUFBaUIsR0FBakIsR0FDZCxTQUFTLGFBQVQsQ0FBdUIsRUFBdkIsQ0FEYyxHQUVkLFNBQVMsY0FBVCxDQUF3QixFQUF4QixDQUZKOztBQUlBLE1BQUksQ0FBQyxTQUFMLEVBQWdCO0FBQ2QsVUFBTSxJQUFJLEtBQUosNENBQ3FDLEVBRHJDLE9BQU47QUFHRDs7QUFFRCxPQUFLLElBQU0sR0FBWCxJQUFrQixJQUFsQixFQUF3QjtBQUN0QixRQUFJLElBQUksVUFBSixDQUFlLFVBQWYsQ0FBSixFQUFnQztBQUM5QixVQUFNLGdCQUFnQixJQUFJLE1BQUosQ0FBVyxXQUFXLE1BQXRCLEVBQThCLFdBQTlCLEVBQXRCO0FBQ0EsVUFBTSxtQkFBbUIsSUFBSSxNQUFKLENBQVcsS0FBTSxHQUFOLENBQVgsQ0FBekI7QUFDQSxVQUFNLDBDQUF3QyxhQUF4QyxPQUFOO0FBQ0EsVUFBTSxvQkFBb0IsVUFBVSxhQUFWLENBQXdCLGlCQUF4QixDQUExQjtBQUNBLFVBQUksQ0FBQyxpQkFBTCxFQUF3QjtBQUN0QixjQUFNLElBQUksS0FBSix3Q0FDaUMsYUFEakMsT0FBTjtBQUdEOztBQUVELFVBQU0sVUFBVSxpQkFBaUIsSUFBakIsQ0FBc0IsR0FBRyxLQUF6QixDQUFoQjtBQUNBLHdCQUFrQixTQUFsQixDQUE0QixNQUE1QixDQUFtQyxhQUFuQyxFQUFrRCxPQUFsRDtBQUNBLHdCQUFrQixZQUFsQixDQUErQixPQUEvQixFQUF3QyxPQUF4QztBQUNEO0FBQ0Y7QUFDRixDQTlCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qKlxuICogQXJyYXkjZmlsdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gc2VsZlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAdGhyb3cgVHlwZUVycm9yXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyLCBmbiwgc2VsZikge1xuICBpZiAoYXJyLmZpbHRlcikgcmV0dXJuIGFyci5maWx0ZXIoZm4sIHNlbGYpO1xuICBpZiAodm9pZCAwID09PSBhcnIgfHwgbnVsbCA9PT0gYXJyKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIHZhciByZXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKGFyciwgaSkpIGNvbnRpbnVlO1xuICAgIHZhciB2YWwgPSBhcnJbaV07XG4gICAgaWYgKGZuLmNhbGwoc2VsZiwgdmFsLCBpLCBhcnIpKSByZXQucHVzaCh2YWwpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiIsIi8qKlxuICogYXJyYXktZm9yZWFjaFxuICogICBBcnJheSNmb3JFYWNoIHBvbnlmaWxsIGZvciBvbGRlciBicm93c2Vyc1xuICogICAoUG9ueWZpbGw6IEEgcG9seWZpbGwgdGhhdCBkb2Vzbid0IG92ZXJ3cml0ZSB0aGUgbmF0aXZlIG1ldGhvZClcbiAqIFxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3YWRhL2FycmF5LWZvcmVhY2hcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBUYWt1dG8gV2FkYVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogICBodHRwczovL2dpdGh1Yi5jb20vdHdhZGEvYXJyYXktZm9yZWFjaC9ibG9iL21hc3Rlci9NSVQtTElDRU5TRVxuICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAoYXJ5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmIChhcnkuZm9yRWFjaCkge1xuICAgICAgICBhcnkuZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgYXJ5W2ldLCBpLCBhcnkpO1xuICAgIH1cbn07XG4iLCIvKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAxLjEuMjAxNzA0MjdcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBEZWRpY2F0ZWQgdG8gdGhlIHB1YmxpYyBkb21haW4uXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMgKi9cblxuaWYgKFwiZG9jdW1lbnRcIiBpbiB3aW5kb3cuc2VsZikge1xuXG4vLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG4vLyBJbmNsdWRpbmcgSUUgPCBFZGdlIG1pc3NpbmcgU1ZHRWxlbWVudC5jbGFzc0xpc3RcbmlmICghKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikpIFxuXHR8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJnXCIpKSkge1xuXG4oZnVuY3Rpb24gKHZpZXcpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghKCdFbGVtZW50JyBpbiB2aWV3KSkgcmV0dXJuO1xuXG52YXJcblx0ICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuXHQsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcblx0LCBlbGVtQ3RyUHJvdG8gPSB2aWV3LkVsZW1lbnRbcHJvdG9Qcm9wXVxuXHQsIG9iakN0ciA9IE9iamVjdFxuXHQsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0fVxuXHQsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgaSA9IDBcblx0XHRcdCwgbGVuID0gdGhpcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0Ly8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG5cdCwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuXHRcdHRoaXMubmFtZSA9IHR5cGU7XG5cdFx0dGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH1cblx0LCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuXHRcdGlmICh0b2tlbiA9PT0gXCJcIikge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiU1lOVEFYX0VSUlwiXG5cdFx0XHRcdCwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuXHRcdFx0XHQsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG5cdH1cblx0LCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdHZhclxuXHRcdFx0ICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG5cdFx0XHQsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuXHRcdFx0LCBpID0gMFxuXHRcdFx0LCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy50b1N0cmluZygpKTtcblx0XHR9O1xuXHR9XG5cdCwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG5cdCwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuXHR9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG5cdHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG59O1xuY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcblx0dG9rZW4gKz0gXCJcIjtcblx0cmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG5cdFx0XHR0aGlzLnB1c2godG9rZW4pO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdFx0LCBpbmRleFxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdHdoaWxlIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbiwgZm9yY2UpIHtcblx0dG9rZW4gKz0gXCJcIjtcblxuXHR2YXJcblx0XHQgIHJlc3VsdCA9IHRoaXMuY29udGFpbnModG9rZW4pXG5cdFx0LCBtZXRob2QgPSByZXN1bHQgP1xuXHRcdFx0Zm9yY2UgIT09IHRydWUgJiYgXCJyZW1vdmVcIlxuXHRcdDpcblx0XHRcdGZvcmNlICE9PSBmYWxzZSAmJiBcImFkZFwiXG5cdDtcblxuXHRpZiAobWV0aG9kKSB7XG5cdFx0dGhpc1ttZXRob2RdKHRva2VuKTtcblx0fVxuXG5cdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gZm9yY2U7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICFyZXN1bHQ7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG59O1xuXG5pZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG5cdHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcblx0XHQgIGdldDogY2xhc3NMaXN0R2V0dGVyXG5cdFx0LCBlbnVtZXJhYmxlOiB0cnVlXG5cdFx0LCBjb25maWd1cmFibGU6IHRydWVcblx0fTtcblx0dHJ5IHtcblx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuXHRcdC8vIGFkZGluZyB1bmRlZmluZWQgdG8gZmlnaHQgdGhpcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvaXNzdWVzLzM2XG5cdFx0Ly8gbW9kZXJuaWUgSUU4LU1TVzcgbWFjaGluZSBoYXMgSUU4IDguMC42MDAxLjE4NzAyIGFuZCBpcyBhZmZlY3RlZFxuXHRcdGlmIChleC5udW1iZXIgPT09IHVuZGVmaW5lZCB8fCBleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG5cdFx0XHRjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG5cdFx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdFx0fVxuXHR9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcblx0ZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbn1cblxufSh3aW5kb3cuc2VsZikpO1xuXG59XG5cbi8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuLy8gdG8gbm9ybWFsaXplIHRoZSBhZGQvcmVtb3ZlIGFuZCB0b2dnbGUgQVBJcy5cblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcblx0Ly8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG5cdGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcblx0XHR2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cdFx0XHR2YXIgb3JpZ2luYWwgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cblx0XHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdFx0XHRcdHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdHRva2VuID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0XHRcdG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0Y3JlYXRlTWV0aG9kKCdhZGQnKTtcblx0XHRjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuXHR9XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImMzXCIsIGZhbHNlKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG5cdC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cblx0aWYgKHRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMzXCIpKSB7XG5cdFx0dmFyIF90b2dnbGUgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuXHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG5cdFx0XHRpZiAoMSBpbiBhcmd1bWVudHMgJiYgIXRoaXMuY29udGFpbnModG9rZW4pID09PSAhZm9yY2UpIHtcblx0XHRcdFx0cmV0dXJuIGZvcmNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIF90b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHR9XG5cblx0dGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcblxufVxuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyA8MyBNb2Rlcm5penJcbi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvZG9tL2RhdGFzZXQuanNcblxuZnVuY3Rpb24gdXNlTmF0aXZlKCkge1xuXHR2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRlbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1hLWInLCAnYycpO1xuXG5cdHJldHVybiBCb29sZWFuKGVsZW0uZGF0YXNldCAmJiBlbGVtLmRhdGFzZXQuYUIgPT09ICdjJyk7XG59XG5cbmZ1bmN0aW9uIG5hdGl2ZURhdGFzZXQoZWxlbWVudCkge1xuXHRyZXR1cm4gZWxlbWVudC5kYXRhc2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gbmF0aXZlRGF0YXNldCA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHZhciBtYXAgPSB7fTtcblx0dmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG5cblx0ZnVuY3Rpb24gZ2V0dGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0dGVyKG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDAsIGogPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdHZhciBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuXG5cdFx0aWYgKGF0dHJpYnV0ZSkge1xuXHRcdFx0dmFyIG5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcblxuXHRcdFx0aWYgKG5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuXHRcdFx0XHR2YXIgcHJvcCA9IG5hbWUuc2xpY2UoNSkucmVwbGFjZSgvLS4vZywgZnVuY3Rpb24gKHUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdS5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXAsIHByb3AsIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZ2V0dGVyLmJpbmQoeyB2YWx1ZTogdmFsdWUgfHwgJycgfSksXG5cdFx0XHRcdFx0c2V0OiBzZXR0ZXIuYmluZChlbGVtZW50LCBuYW1lKVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWFwO1xufTtcblxuIiwiLy8gZWxlbWVudC1jbG9zZXN0IHwgQ0MwLTEuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9jbG9zZXN0XG5cbihmdW5jdGlvbiAoRWxlbWVudFByb3RvKSB7XG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLm1hdGNoZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdCsraW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG5cdFx0fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLmNsb3Nlc3QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8uY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0fVxufSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBkZWxlZ2F0ZUFsbCA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlQWxsJyk7XG5cbmNvbnN0IERFTEVHQVRFX1BBVFRFUk4gPSAvXiguKyk6ZGVsZWdhdGVcXCgoLispXFwpJC87XG5jb25zdCBTUEFDRSA9ICcgJztcblxuY29uc3QgZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKERFTEVHQVRFX1BBVFRFUk4pO1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChtYXRjaCkge1xuICAgIHR5cGUgPSBtYXRjaFsxXTtcbiAgICBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICB9XG5cbiAgdmFyIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogcG9wS2V5KGhhbmRsZXIsICdjYXB0dXJlJyksXG4gICAgICBwYXNzaXZlOiBwb3BLZXkoaGFuZGxlciwgJ3Bhc3NpdmUnKVxuICAgIH07XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGRlbGVnYXRlOiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKVxuICAgICAgPyBkZWxlZ2F0ZUFsbChoYW5kbGVyKVxuICAgICAgOiBzZWxlY3RvclxuICAgICAgICA/IGRlbGVnYXRlKHNlbGVjdG9yLCBoYW5kbGVyKVxuICAgICAgICA6IGhhbmRsZXIsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuXG4gIGlmICh0eXBlLmluZGV4T2YoU1BBQ0UpID4gLTEpIHtcbiAgICByZXR1cm4gdHlwZS5zcGxpdChTUEFDRSkubWFwKGZ1bmN0aW9uKF90eXBlKSB7XG4gICAgICByZXR1cm4gYXNzaWduKHt0eXBlOiBfdHlwZX0sIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lci50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxudmFyIHBvcEtleSA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICBkZWxldGUgb2JqW2tleV07XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVoYXZpb3IoZXZlbnRzLCBwcm9wcykge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gICAgLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHR5cGUsIGV2ZW50c1t0eXBlXSk7XG4gICAgICByZXR1cm4gbWVtby5jb25jYXQobGlzdGVuZXJzKTtcbiAgICB9LCBbXSk7XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGRCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBwcm9wcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKGZ1bmN0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMuc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSkgPT09IGZhbHNlO1xuICAgIH0sIHRoaXMpO1xuICB9O1xufTtcbiIsImNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGNvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbmNvbnN0IFNQTEFUID0gJyonO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlQWxsKHNlbGVjdG9ycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKVxuXG4gIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZXJlIGlzIG9ubHkgb25lIGhhbmRsZXIgYW5kIGl0IGFwcGxpZXMgdG9cbiAgLy8gYWxsIGVsZW1lbnRzICh0aGUgXCIqXCIgQ1NTIHNlbGVjdG9yKSwgdGhlbiBqdXN0IHJldHVybiB0aGF0XG4gIC8vIGhhbmRsZXJcbiAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09IFNQTEFUKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yc1tTUExBVF07XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZXMgPSBrZXlzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBzZWxlY3Rvcikge1xuICAgIG1lbW8ucHVzaChkZWxlZ2F0ZShzZWxlY3Rvciwgc2VsZWN0b3JzW3NlbGVjdG9yXSkpO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCBbXSk7XG4gIHJldHVybiBjb21wb3NlKGRlbGVnYXRlcyk7XG59O1xuIiwiLy8gcG9seWZpbGwgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdFxucmVxdWlyZSgnZWxlbWVudC1jbG9zZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWxlZ2F0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZShlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JhbmNlKGUpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gZS50YXJnZXQgJiYgIWVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVfVFJJTSA9IC8oXlxccyspfChcXHMrJCkvZztcbnZhciBSRV9TUExJVCA9IC9cXHMrLztcblxudmFyIHRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgPyBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci5yZXBsYWNlKFJFX1RSSU0sICcnKTsgfTtcblxudmFyIHF1ZXJ5QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tpZD1cIicgKyBpZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlc29sdmVJZHMoaWRzLCBkb2MpIHtcbiAgaWYgKHR5cGVvZiBpZHMgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBidXQgZ290ICcgKyAodHlwZW9mIGlkcykpO1xuICB9XG5cbiAgaWYgKCFkb2MpIHtcbiAgICBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgZ2V0RWxlbWVudEJ5SWQgPSBkb2MuZ2V0RWxlbWVudEJ5SWRcbiAgICA/IGRvYy5nZXRFbGVtZW50QnlJZC5iaW5kKGRvYylcbiAgICA6IHF1ZXJ5QnlJZC5iaW5kKGRvYyk7XG5cbiAgaWRzID0gdHJpbShpZHMpLnNwbGl0KFJFX1NQTElUKTtcblxuICAvLyBYWFggd2UgY2FuIHNob3J0LWNpcmN1aXQgaGVyZSBiZWNhdXNlIHRyaW1taW5nIGFuZCBzcGxpdHRpbmcgYVxuICAvLyBzdHJpbmcgb2YganVzdCB3aGl0ZXNwYWNlIHByb2R1Y2VzIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzaW5nbGUsXG4gIC8vIGVtcHR5IHN0cmluZ1xuICBpZiAoaWRzLmxlbmd0aCA9PT0gMSAmJiBpZHNbMF0gPT09ICcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBlbCA9IGdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZmlsdGVyID0gcmVxdWlyZSgnYXJyYXktZmlsdGVyJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbi8vIFhYWCBtYXRjaCAudXNhLWFjY29yZGlvbiBhbmQgLnVzYS1hY2NvcmRpb24tYm9yZGVyZWRcbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbiwgLiR7UFJFRklYfS1hY2NvcmRpb24tYm9yZGVyZWRgO1xuY29uc3QgQlVUVE9OID0gYC4ke1BSRUZJWH0tYWNjb3JkaW9uLWJ1dHRvblthcmlhLWNvbnRyb2xzXWA7XG5jb25zdCBFWFBBTkRFRCA9ICdhcmlhLWV4cGFuZGVkJztcbmNvbnN0IE1VTFRJU0VMRUNUQUJMRSA9ICdhcmlhLW11bHRpc2VsZWN0YWJsZSc7XG5cbi8qKlxuICogVG9nZ2xlIGEgYnV0dG9uJ3MgXCJwcmVzc2VkXCIgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGV4cGFuZGVkIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSByZXN1bHRpbmcgc3RhdGVcbiAqL1xuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgdmFyIGFjY29yZGlvbiA9IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTik7XG4gIGlmICghYWNjb3JkaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0JVVFRPTn0gaXMgbWlzc2luZyBvdXRlciAke0FDQ09SRElPTn1gKTtcbiAgfVxuXG4gIGV4cGFuZGVkID0gdG9nZ2xlKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAvLyBYWFggbXVsdGlzZWxlY3RhYmxlIGlzIG9wdC1pbiwgdG8gcHJlc2VydmUgbGVnYWN5IGJlaGF2aW9yXG4gIGNvbnN0IG11bHRpc2VsZWN0YWJsZSA9IGFjY29yZGlvbi5nZXRBdHRyaWJ1dGUoTVVMVElTRUxFQ1RBQkxFKSA9PT0gJ3RydWUnO1xuXG4gIGlmIChleHBhbmRlZCAmJiAhbXVsdGlzZWxlY3RhYmxlKSB7XG4gICAgZm9yRWFjaChnZXRBY2NvcmRpb25CdXR0b25zKGFjY29yZGlvbiksIG90aGVyID0+IHtcbiAgICAgIGlmIChvdGhlciAhPT0gYnV0dG9uKSB7XG4gICAgICAgIHRvZ2dsZShvdGhlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzaG93QnV0dG9uID0gYnV0dG9uID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIHRydWUpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2VcbiAqL1xuY29uc3QgaGlkZUJ1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCBmYWxzZSk7XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGJ1dHRvbiBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBhY2NvcmRpb24gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFjY29yZGlvblxuICogQHJldHVybiB7YXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRBY2NvcmRpb25CdXR0b25zID0gYWNjb3JkaW9uID0+IHtcbiAgcmV0dXJuIGZpbHRlcihhY2NvcmRpb24ucXVlcnlTZWxlY3RvckFsbChCVVRUT04pLCBidXR0b24gPT4ge1xuICAgIHJldHVybiBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pID09PSBhY2NvcmRpb247XG4gIH0pO1xufTtcblxuY29uc3QgYWNjb3JkaW9uID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdG9nZ2xlQnV0dG9uKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQ6IHJvb3QgPT4ge1xuICAgIGZvckVhY2gocm9vdC5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZSc7XG4gICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgfSk7XG4gIH0sXG4gIEFDQ09SRElPTixcbiAgQlVUVE9OLFxuICBzaG93OiBzaG93QnV0dG9uLFxuICBoaWRlOiBoaWRlQnV0dG9uLFxuICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbn0pO1xuXG4vKipcbiAqIFRPRE86IGZvciAyLjAsIHJlbW92ZSBldmVyeXRoaW5nIGJlbG93IHRoaXMgY29tbWVudCBhbmQgZXhwb3J0IHRoZVxuICogYmVoYXZpb3IgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IEFjY29yZGlvbiA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHRoaXMucm9vdCA9IHJvb3Q7XG4gIGFjY29yZGlvbi5vbih0aGlzLnJvb3QpO1xufTtcblxuLy8gY29weSBhbGwgb2YgdGhlIGJlaGF2aW9yIG1ldGhvZHMgYW5kIHByb3BzIHRvIEFjY29yZGlvblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuYXNzaWduKEFjY29yZGlvbiwgYWNjb3JkaW9uKTtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gc2hvd0J1dHRvbjtcbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGhpZGVCdXR0b247XG5cbkFjY29yZGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICBhY2NvcmRpb24ub2ZmKHRoaXMucm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1iYW5uZXItaGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfS1iYW5uZXItaGVhZGVyLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuY2xvc2VzdChIRUFERVIpLmNsYXNzTGlzdC50b2dnbGUoRVhQQU5ERURfQ0xBU1MpO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWAgXTogdG9nZ2xlQmFubmVyLFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKCcuL2FjY29yZGlvbicpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5jb25zdCBTQ09QRSA9IGAuJHtQUkVGSVh9LWZvb3Rlci1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyLXByaW1hcnktbGlua2A7XG5jb25zdCBMSVNUID0gYCR7TkFWfSB1bGA7XG5cbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNjAwO1xuY29uc3QgREVCT1VOQ0VfUkFURSA9IDE4MDtcblxuY29uc3Qgc2hvd1BhbmVsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBsaXN0ID0gdGhpcy5jbG9zZXN0KExJU1QpO1xuICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOKTtcblxuICAvLyBOQjogdGhpcyAqc2hvdWxkKiBhbHdheXMgc3VjY2VlZCBiZWNhdXNlIHRoZSBidXR0b25cbiAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgY29uc3QgbGlzdHMgPSBsaXN0LmNsb3Nlc3QoTkFWKVxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuXG4gIGZvckVhY2gobGlzdHMsIGVsID0+IHtcbiAgICBpZiAoZWwgIT09IGxpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSElEREVOKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVzaXplID0gZGVib3VuY2UoKCkgPT4ge1xuICBjb25zdCBoaWRkZW4gPSB3aW5kb3cuaW5uZXJXaWR0aCA8IEhJREVfTUFYX1dJRFRIO1xuICBmb3JFYWNoKHNlbGVjdChMSVNUKSwgbGlzdCA9PiB7XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTiwgaGlkZGVuKTtcbiAgfSk7XG59LCBERUJPVU5DRV9SQVRFKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dQYW5lbCxcbiAgfSxcbn0sIHtcbiAgLy8gZXhwb3J0IGZvciB1c2UgZWxzZXdoZXJlXG4gIEhJREVfTUFYX1dJRFRILFxuICBERUJPVU5DRV9SQVRFLFxuXG4gIGluaXQ6IHRhcmdldCA9PiB7XG4gICAgcmVzaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG5cbiAgdGVhcmRvd246IHRhcmdldCA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb246ICByZXF1aXJlKCcuL2FjY29yZGlvbicpLFxuICBiYW5uZXI6ICAgICByZXF1aXJlKCcuL2Jhbm5lcicpLFxuICBmb290ZXI6ICAgICByZXF1aXJlKCcuL2Zvb3RlcicpLFxuICBuYXZpZ2F0aW9uOiByZXF1aXJlKCcuL25hdmlnYXRpb24nKSxcbiAgcGFzc3dvcmQ6ICAgcmVxdWlyZSgnLi9wYXNzd29yZCcpLFxuICBzZWFyY2g6ICAgICByZXF1aXJlKCcuL3NlYXJjaCcpLFxuICBza2lwbmF2OiAgICByZXF1aXJlKCcuL3NraXBuYXYnKSxcbiAgdmFsaWRhdG9yOiAgcmVxdWlyZSgnLi92YWxpZGF0b3InKSxcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgQ09OVEVYVCA9ICdoZWFkZXInO1xuY29uc3QgTkFWID0gYC4ke1BSRUZJWH0tbmF2YDtcbmNvbnN0IE9QRU5FUlMgPSBgLiR7UFJFRklYfS1tZW51LWJ0bmA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgLiR7UFJFRklYfS1uYXYtY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBUT0dHTEVTID0gWyBOQVYsIE9WRVJMQVkgXS5qb2luKCcsICcpO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSAndXNhLW1vYmlsZV9uYXYtYWN0aXZlJztcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnaXMtdmlzaWJsZSc7XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIGlmICh0eXBlb2YgYWN0aXZlICE9PSAnYm9vbGVhbicpIHtcbiAgICBhY3RpdmUgPSAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcbiAgfVxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBhY3RpdmUpO1xuXG4gIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNsb3Nlc3QoQ09OVEVYVCk7XG4gIGZvckVhY2goc2VsZWN0KFRPR0dMRVMpLCBlbCA9PiB7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTKTtcbiAgfSk7XG5cbiAgaWYgKGFjdGl2ZSAmJiBjb250ZXh0KSB7XG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcbiAgICAgIGNsb3NlQnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhY3RpdmU7XG59O1xuXG5jb25zdCBuYXZpZ2F0aW9uID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIE9QRU5FUlMgXTogdG9nZ2xlTmF2LFxuICAgIFsgQ0xPU0VSUyBdOiB0b2dnbGVOYXYsXG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IG5hdmlnYXRpb24ub24oZWwpLFxuICBuYXZpZ2F0aW9uXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNob3dfcGFzc3dvcmQsIC4ke1BSRUZJWH0tc2hvd19tdWx0aXBhc3N3b3JkYDtcblxuY29uc3QgdG9nZ2xlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRvZ2dsZUZvcm1JbnB1dCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogdG9nZ2xlLFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgaWdub3JlID0gcmVxdWlyZSgncmVjZXB0b3IvaWdub3JlJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgQlVUVE9OID0gJy5qcy1zZWFyY2gtYnV0dG9uJztcbmNvbnN0IEZPUk0gPSAnLmpzLXNlYXJjaC1mb3JtJztcbmNvbnN0IElOUFVUID0gJ1t0eXBlPXNlYXJjaF0nO1xuY29uc3QgQ09OVEVYVCA9ICdoZWFkZXInOyAvLyBYWFhcbmNvbnN0IFZJU1VBTExZX0hJRERFTiA9IGAke1BSRUZJWH0tc3Itb25seWA7XG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBzaG93U2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59O1xuXG5jb25zdCBoaWRlU2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBnZXRGb3JtID0gYnV0dG9uID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dFxuICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEZPUk0pO1xufTtcblxuY29uc3QgdG9nZ2xlU2VhcmNoID0gKGJ1dHRvbiwgYWN0aXZlKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBnZXRGb3JtKGJ1dHRvbik7XG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFZJU1VBTExZX0hJRERFTiwgIWFjdGl2ZSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIF9vdXRzaWRlXyBvZiB0aGUgZm9ybSB3L2lnbm9yZSgpOiBoaWRlIHRoZVxuICAgIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgZSA9PiB7XG4gICAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBzaG93U2VhcmNoLFxuICB9LFxufSwge1xuICBpbml0OiAodGFyZ2V0KSA9PiB7XG4gICAgZm9yRWFjaChzZWxlY3QoQlVUVE9OLCB0YXJnZXQpLCBidXR0b24gPT4ge1xuICAgICAgdG9nZ2xlU2VhcmNoKGJ1dHRvbiwgZmFsc2UpO1xuICAgIH0pO1xuICB9LFxuICB0ZWFyZG93bjogKHRhcmdldCkgPT4ge1xuICAgIC8vIGZvcmdldCB0aGUgbGFzdCBidXR0b24gY2xpY2tlZFxuICAgIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IHNlYXJjaC5vbihlbCksXG4gIHNlYXJjaFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IG9uY2UgPSByZXF1aXJlKCdyZWNlcHRvci9vbmNlJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH0tc2tpcG5hdltocmVmXj1cIiNcIl1gO1xuXG5jb25zdCBzZXRUYWJpbmRleCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25jZShldmVudCA9PiB7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICB9KSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhyb3cgYW4gZXJyb3I/XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSgnLi4vdXRpbHMvdmFsaWRhdGUtaW5wdXQnKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5cbmNvbnN0IGNoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICByZXR1cm4gdmFsaWRhdGUodGhpcyk7XG59O1xuXG5jb25zdCB2YWxpZGF0b3IgPSBiZWhhdmlvcih7XG4gICdrZXl1cCBjaGFuZ2UnOiB7XG4gICAgJ2lucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XSc6IGNoYW5nZSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gdmFsaWRhdG9yLm9uKGVsKSxcbiAgdmFsaWRhdG9yXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByZWZpeDogJ3VzYScsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENMSUNLOiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgID8gJ3RvdWNoc3RhcnQnXG4gICAgOiAnY2xpY2snLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5cbmlmICghKEhJRERFTiBpbiBlbHByb3RvKSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxwcm90bywgSElEREVOLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoSElEREVOLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZSgnY2xhc3NsaXN0LXBvbHlmaWxsJyk7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhpZGRlblxucmVxdWlyZSgnLi9lbGVtZW50LWhpZGRlbicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZG9tcmVhZHkgPSByZXF1aXJlKCdkb21yZWFkeScpO1xuXG4vKipcbiAqIFRoZSAncG9seWZpbGxzJyBkZWZpbmUga2V5IEVDTUFTY3JpcHQgNSBtZXRob2RzIHRoYXQgbWF5IGJlIG1pc3NpbmcgZnJvbVxuICogb2xkZXIgYnJvd3NlcnMsIHNvIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICovXG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcbnVzd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5kb21yZWFkeSgoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIGZvciAobGV0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1sgbmFtZSBdO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzd2RzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IEJlaGF2aW9yID0gcmVxdWlyZSgncmVjZXB0b3IvYmVoYXZpb3InKTtcblxuY29uc3Qgc2VxdWVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlcSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gICAgZm9yRWFjaChzZXEsIG1ldGhvZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbIG1ldGhvZCBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXNbIG1ldGhvZCBdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQG5hbWUgYmVoYXZpb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0P30gcHJvcHNcbiAqIEByZXR1cm4ge3JlY2VwdG9yLmJlaGF2aW9yfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChldmVudHMsIHByb3BzKSA9PiB7XG4gIHJldHVybiBCZWhhdmlvcihldmVudHMsIGFzc2lnbih7XG4gICAgb246ICAgc2VxdWVuY2UoJ2luaXQnLCAnYWRkJyksXG4gICAgb2ZmOiAgc2VxdWVuY2UoJ3RlYXJkb3duJywgJ3JlbW92ZScpLFxuICB9LCBwcm9wcykpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNFbGVtZW50ID0gdmFsdWUgPT4ge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTSBpbi5cbiAqIEByZXR1cm4ge0FycmF5LkhUTUxFbGVtZW50fSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3QgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkIHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKCdyZXNvbHZlLWlkLXJlZnMnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vc2VsZWN0Jyk7XG5jb25zdCB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG5cbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgUFJFU1NFRCA9ICdhcmlhLXByZXNzZWQnO1xuY29uc3QgU0hPV19BVFRSID0gJ2RhdGEtc2hvdy10ZXh0JztcbmNvbnN0IEhJREVfQVRUUiA9ICdkYXRhLWhpZGUtdGV4dCc7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IHNob3dUZXh0ID0+IHtcbiAgcmV0dXJuIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgc2hvdyA9PiB7XG4gICAgcmV0dXJuICgnUycgPT09IHNob3dbIDAgXSA/ICdIJyA6ICdoJykgKyAnaWRlJztcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBlbCA9PiB7XG4gIC8vIHRoaXMgaXMgdGhlICp0YXJnZXQqIHN0YXRlOlxuICAvLyAqIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgYXR0ciBhbmQgaXQncyAhPT0gXCJ0cnVlXCIsIHByZXNzZWQgaXMgdHJ1ZVxuICAvLyAqIG90aGVyd2lzZSwgcHJlc3NlZCBpcyBmYWxzZVxuICBjb25zdCBwcmVzc2VkID0gZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpXG4gICAgJiYgZWwuZ2V0QXR0cmlidXRlKFBSRVNTRUQpICE9PSAndHJ1ZSc7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZm9yRWFjaChmaWVsZHMsIGZpZWxkID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0O1xuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgQ09OVFJPTFMgPSAnYXJpYS1jb250cm9scyc7XG5jb25zdCBISURERU4gPSAnYXJpYS1oaWRkZW4nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG5cbiAgaWYgKHR5cGVvZiBleHBhbmRlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ2ZhbHNlJztcbiAgfVxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBleHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIicgKyBpZCArICdcIidcbiAgICApO1xuICB9XG5cbiAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgIWV4cGFuZGVkKTtcbiAgcmV0dXJuIGV4cGFuZGVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRhdGFzZXQgPSByZXF1aXJlKCdlbGVtLWRhdGFzZXQnKTtcblxuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgQ0hFQ0tFRCA9ICdhcmlhLWNoZWNrZWQnO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hlY2tsaXN0LWNoZWNrZWRgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRlIChlbCkge1xuICBjb25zdCBkYXRhID0gZGF0YXNldChlbCk7XG4gIGNvbnN0IGlkID0gZGF0YS52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID0gaWQuY2hhckF0KDApID09PSAnIydcbiAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgaWYgKCFjaGVja0xpc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImBcbiAgICApO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgIGlmIChrZXkuc3RhcnRzV2l0aCgndmFsaWRhdGUnKSkge1xuICAgICAgY29uc3QgdmFsaWRhdG9yTmFtZSA9IGtleS5zdWJzdHIoJ3ZhbGlkYXRlJy5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cChkYXRhWyBrZXkgXSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuICAgICAgaWYgKCF2YWxpZGF0b3JDaGVja2JveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYE5vIHZhbGlkYXRvciBjaGVja2JveCBmb3VuZCBmb3I6IFwiJHt2YWxpZGF0b3JOYW1lfVwiYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGVja2VkID0gdmFsaWRhdG9yUGF0dGVybi50ZXN0KGVsLnZhbHVlKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LmNsYXNzTGlzdC50b2dnbGUoQ0hFQ0tFRF9DTEFTUywgY2hlY2tlZCk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5zZXRBdHRyaWJ1dGUoQ0hFQ0tFRCwgY2hlY2tlZCk7XG4gICAgfVxuICB9XG59O1xuIl19
