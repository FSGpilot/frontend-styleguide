(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../delegate":13,"../delegateAll":12,"object-assign":9}],11:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],12:[function(require,module,exports){
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

},{"../compose":11,"../delegate":13}],13:[function(require,module,exports){
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

},{"element-closest":7}],14:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var filter = require('array-filter');
var forEach = require('array-foreach');
var toggle = require('../utils/toggle');
var isElementInViewport = require('../utils/is-in-viewport');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

// XXX match .accordion and .accordion-bordered
var ACCORDION = '.' + PREFIX + 'accordion, .' + PREFIX + 'accordion-bordered';
var BUTTON = '.' + PREFIX + 'accordion-button[aria-controls]';
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
  toggleButton(this);

  if (this.getAttribute(EXPANDED) === 'true') {
    // We were just expanded, but if another accordion was also just
    // collapsed, we may no longer be in the viewport. This ensures
    // that we are still visible, so the user isn't confused.
    if (!isElementInViewport(this)) this.scrollIntoView();
  }
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

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/is-in-viewport":36,"../utils/toggle":40,"array-filter":1,"array-foreach":2,"object-assign":9}],18:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggle = require('../utils/toggle');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var HEADER = '.' + PREFIX + 'banner-header';
var EXPANDED_CLASS = PREFIX + 'banner-header-expanded';

var toggleBanner = function toggleBanner(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, HEADER + ' [aria-controls]', toggleBanner)));

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/toggle":40}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pikaday = require("../../vendor/pikaday.js");
var behavior = require('../utils/behavior');
var select = require('../utils/select');
var closest = require('../utils/closest');

var jsDatepickerSelector = '.js-calendar-datepicker';
var jsDayInput = '.js-calendar-day-input';
var jsMonthInput = '.js-calendar-month-input';
var jsYearInput = '.js-calendar-year-input';

var datepickerGroup = function () {
  function datepickerGroup(el) {
    _classCallCheck(this, datepickerGroup);

    this.pikadayInstance = null;
    this.datepickerElement = select(jsDatepickerSelector, el);
    this.dateGroup = el;
    this.formGroup = closest(el, '.form-group');
    this.dayInputElement = null;
    this.monthInputElement = null;
    this.yearInputElement = null;

    this.initDateInputs();
    this.initDatepicker(this.datepickerElement[0]);
  }

  _createClass(datepickerGroup, [{
    key: 'initDateInputs',
    value: function initDateInputs() {
      this.dayInputElement = select(jsDayInput, this.dateGroup)[0];
      this.monthInputElement = select(jsMonthInput, this.dateGroup)[0];
      this.yearInputElement = select(jsYearInput, this.dateGroup)[0];

      var that = this;

      this.dayInputElement.addEventListener("blur", function () {
        that.validateInputs();
      });

      this.monthInputElement.addEventListener("blur", function () {
        that.validateInputs();
      });

      this.yearInputElement.addEventListener("blur", function () {
        that.validateInputs();
      });
    }
  }, {
    key: 'initDatepicker',
    value: function initDatepicker(el) {
      if (el) {
        //Note: el may not be a <svg>, IE11 does not add .blur() method to svg elements (--> esc and enter does not dismiss pikaday). 
        var that = this;

        this.pikadayInstance = new Pikaday({
          field: el,
          format: 'DD/MM/YYYY',
          firstDay: 1, //mandag
          i18n: {
            previousMonth: 'Forrige måned',
            nextMonth: 'Næste måned',
            months: ['Januar', 'Februar', 'Marth', 'April', 'Maj', 'Juni', 'July', 'August', 'September', 'Oktober', 'November', 'December'],
            weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
            weekdaysShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
          },
          onSelect: function onSelect(date) {
            //selected new date in pikaday, update input fields. 
            that.updateDateInputs(date);
            that.validateInputs();
          },
          onOpen: function onOpen() {
            //update pikaday with values from input fields
            var day = parseInt(that.dayInputElement.value);
            var month = parseInt(that.monthInputElement.value) - 1;
            var year = parseInt(that.yearInputElement.value);
            var newDate = new Date(year, month, day);
            if (that.validateInputs()) {
              that.updateDatepickerDate(newDate);
            }
          }
        });

        var initDate = new Date();
        this.pikadayInstance.setDate(initDate);
        this.updateDateInputs(initDate);
      }
    }
  }, {
    key: 'validateInputs',
    value: function validateInputs() {
      var day = parseInt(this.dayInputElement.value);
      var month = parseInt(this.monthInputElement.value);
      var year = parseInt(this.yearInputElement.value);
      var maxDay = new Date(year, month, 0).getDate();

      var msg = "";
      var isValid = true;
      if (day > maxDay) {
        isValid = false;
        msg = "Hov, den dag findes ikke i den valgte måned.";
        this.showError(msg);
      } else if (month > 12) {
        isValid = false;
        msg = "Hov, den måned findes ikke.";
        this.showError(msg);
      }

      if (isValid) {
        this.removeError();
      }

      return isValid;
    }
  }, {
    key: 'showError',
    value: function showError(msg) {
      this.formGroup.classList.add("input-error");
      select(".input-error-message", this.formGroup)[0].textContent = msg;
    }
  }, {
    key: 'removeError',
    value: function removeError() {
      this.formGroup.classList.remove("input-error");
      select(".input-error-message", this.formGroup)[0].textContent = "";
    }
  }, {
    key: 'updateDateInputs',
    value: function updateDateInputs(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      this.dayInputElement.value = day;
      this.monthInputElement.value = month;
      this.yearInputElement.value = year;
    }
  }, {
    key: 'updateDatepickerDate',
    value: function updateDatepickerDate(newDate) {
      this.pikadayInstance.setDate(newDate);
    }
  }]);

  return datepickerGroup;
}();

module.exports = datepickerGroup;

},{"../../vendor/pikaday.js":42,"../utils/behavior":34,"../utils/closest":35,"../utils/select":37}],20:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var accordion = require('./accordion');
var behavior = require('../utils/behavior');
var debounce = require('lodash.debounce');
var forEach = require('array-foreach');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix; //JJE: not used anymore 

var HIDDEN = 'hidden';
var SCOPE = '.footer'; //${PREFIX}-
var NAV = SCOPE + ' nav';
var BUTTON = NAV + ' .footer-primary-link'; //${PREFIX}-
var LIST = NAV + ' ul';

var HIDE_MAX_WIDTH = 600;
var DEBOUNCE_RATE = 180;

var showPanel = function showPanel() {
  var small_screen = window.innerWidth < HIDE_MAX_WIDTH;
  if (small_screen) {
    var list = this.closest(LIST);
    list.classList.toggle(HIDDEN);

    // NB: this *should* always succeed because the button
    // selector is scoped to ".{prefix}-footer-big nav"
    var lists = list.closest(NAV).querySelectorAll('ul');

    forEach(lists, function (el) {
      if (el !== list) {
        el.classList.add(HIDDEN);
      }
    });
  }
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

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/select":37,"./accordion":17,"array-foreach":2,"lodash.debounce":8}],21:[function(require,module,exports){
'use strict';

module.exports = {
  accordion: require('./accordion'),
  banner: require('./banner'),
  footer: require('./footer'),
  navigation: require('./navigation'),
  password: require('./password'),
  search: require('./search'),
  skipnav: require('./skipnav'),
  validator: require('./validator'),
  regexmask: require('./regex-input-mask')
  //table:      require('./table'),
  //overflow:   require('./overflow-menu'),
};

},{"./accordion":17,"./banner":18,"./footer":20,"./navigation":23,"./password":24,"./regex-input-mask":25,"./search":26,"./skipnav":27,"./validator":28}],22:[function(require,module,exports){
'use strict';

function Dialog(dialogEl, overlayEl) {

	this.dialogEl = dialogEl;
	this.overlayEl = overlayEl;
	this.focusedElBeforeOpen;

	var focusableEls = this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

	this.close(); // Reset
}

Dialog.prototype.open = function () {

	var Dialog = this;

	this.dialogEl.removeAttribute('aria-hidden');
	this.overlayEl.removeAttribute('aria-hidden');

	this.focusedElBeforeOpen = document.activeElement;

	this.dialogEl.addEventListener('keydown', function (e) {
		Dialog._handleKeyDown(e);
	});

	this.overlayEl.addEventListener('click', function () {
		Dialog.close();
	});

	this.firstFocusableEl.focus();
};

Dialog.prototype.close = function () {

	this.dialogEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);

	if (this.focusedElBeforeOpen) {
		this.focusedElBeforeOpen.focus();
	}
};

Dialog.prototype._handleKeyDown = function (e) {

	var Dialog = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if (document.activeElement === Dialog.firstFocusableEl) {
			e.preventDefault();
			Dialog.lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if (document.activeElement === Dialog.lastFocusableEl) {
			e.preventDefault();
			Dialog.firstFocusableEl.focus();
		}
	}

	switch (e.keyCode) {
		case KEY_TAB:
			if (Dialog.focusableEls.length === 1) {
				e.preventDefault();
				break;
			}
			if (e.shiftKey) {
				handleBackwardTab();
			} else {
				handleForwardTab();
			}
			break;
		case KEY_ESC:
			Dialog.close();
			break;
		default:
			break;
	}
};

Dialog.prototype.addEventListeners = function (openDialogSel, closeDialogSel) {

	var Dialog = this;

	var openDialogEls = document.querySelectorAll(openDialogSel);
	for (var i = 0; i < openDialogEls.length; i++) {
		openDialogEls[i].addEventListener('click', function () {
			Dialog.open();
		});
	}

	var closeDialogEls = document.querySelectorAll(closeDialogSel);
	for (var i = 0; i < closeDialogEls.length; i++) {
		closeDialogEls[i].addEventListener('click', function () {
			Dialog.close();
		});
	}
};

var navDialogEl = document.querySelector('.modal-js');
var dialogOverlay = document.querySelector('.modal-js-overlay');

var myDialog = new Dialog(navDialogEl, dialogOverlay);
myDialog.addEventListeners('.open-js-modal', '.close-js-modal');

},{}],23:[function(require,module,exports){
'use strict';

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var select = require('../utils/select');
var accordion = require('./accordion');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var NAV = '.' + PREFIX + '-nav';
var NAV_LINKS = NAV + ' a';
var OPENERS = '.' + PREFIX + '-menu-btn';
var CLOSE_BUTTON = '.' + PREFIX + '-nav-close';
var OVERLAY = '.' + PREFIX + '-overlay';
var CLOSERS = CLOSE_BUTTON + ', .' + PREFIX + '-overlay';
var TOGGLES = [NAV, OVERLAY].join(', ');

var ACTIVE_CLASS = 'usa-mobile_nav-active';
var VISIBLE_CLASS = 'is-visible';

var isActive = function isActive() {
  return document.body.classList.contains(ACTIVE_CLASS);
};

var _focusTrap = function _focusTrap(trapContainer) {
  // Find all focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = trapContainer.querySelectorAll(focusableElementsString);
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      toggleNav.call(this, false);
    }
  }

  // Focus first child
  firstTabStop.focus();

  return {
    enable: function enable() {
      // Listen for and trap the keyboard
      trapContainer.addEventListener('keydown', trapTabKey);
    },
    release: function release() {
      trapContainer.removeEventListener('keydown', trapTabKey);
    }
  };
};

var focusTrap = void 0;

var toggleNav = function toggleNav(active) {
  var body = document.body;
  if (typeof active !== 'boolean') {
    active = !isActive();
  }
  body.classList.toggle(ACTIVE_CLASS, active);

  forEach(select(TOGGLES), function (el) {
    el.classList.toggle(VISIBLE_CLASS, active);
  });

  if (active) {
    focusTrap.enable();
  } else {
    focusTrap.release();
  }

  var closeButton = body.querySelector(CLOSE_BUTTON);
  var menuButton = body.querySelector(OPENERS);

  if (active && closeButton) {
    // The mobile nav was just activated, so focus on the close button,
    // which is just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!active && document.activeElement === closeButton && menuButton) {
    // The mobile nav was just deactivated, and focus was on the close
    // button, which is no longer visible. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }

  return active;
};

var resize = function resize() {
  var closer = document.body.querySelector(CLOSE_BUTTON);

  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // The mobile nav is active, but the close box isn't visible, which
    // means the user's viewport has been resized so that it is no longer
    // in mobile mode. Let's make the page state consistent by
    // deactivating the mobile nav.
    toggleNav.call(closer, false);
  }
};

var navigation = behavior(_defineProperty({}, CLICK, (_CLICK = {}, _defineProperty(_CLICK, OPENERS, toggleNav), _defineProperty(_CLICK, CLOSERS, toggleNav), _defineProperty(_CLICK, NAV_LINKS, function () {
  // A navigation link has been clicked! We want to collapse any
  // hierarchical navigation UI it's a part of, so that the user
  // can focus on whatever they've just selected.

  // Some navigation links are inside accordions; when they're
  // clicked, we want to collapse those accordions.
  var acc = this.closest(accordion.ACCORDION);
  if (acc) {
    accordion.getButtons(acc).forEach(function (btn) {
      return accordion.hide(btn);
    });
  }

  // If the mobile navigation menu is active, we want to hide it.
  if (isActive()) {
    toggleNav.call(this, false);
  }
}), _CLICK)), {
  init: function init() {
    var trapContainer = document.querySelector(NAV);

    if (trapContainer) {
      focusTrap = _focusTrap(trapContainer);
    }

    resize();
    window.addEventListener('resize', resize, false);
  },
  teardown: function teardown() {
    window.removeEventListener('resize', resize, false);
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return navigation.on(el);
}, navigation);

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/select":37,"./accordion":17,"array-foreach":2,"object-assign":9}],24:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggleFormInput = require('../utils/toggle-form-input');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var LINK = '.' + PREFIX + 'show_password, .' + PREFIX + 'show_multipassword';

var toggle = function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/toggle-form-input":39}],25:[function(require,module,exports){

/*
* Prevents the user from inputting based on a regex.
* Does not work the same way af <input pattern="">, this pattern is only used for validation, not to prevent input. 
* Usecase: number input for date-component.
* Example - number only: <input type="text" data-input-regex="^\d*$">
*/
'use strict';

var behavior = require('../utils/behavior');

var modifierState = {
    shift: false,
    alt: false,
    ctrl: false,
    command: false
};

function inputRegexMask(event) {

    if (modifierState.ctrl || modifierState.command) {
        return;
    }
    var newChar = null;
    if (typeof event.key !== "undefined") {
        if (event.key.length === 1) {
            newChar = event.key;
        }
    } else {
        if (!event.charCode) {
            newChar = String.fromCharCode(event.keyCode);
        } else {
            newChar = String.fromCharCode(event.charCode);
        }
    }
    var element = null;
    if (event.target !== undefined) {
        element = event.target;
    }
    if (newChar !== null && element !== null) {
        if (newChar.length > 0) {
            if (element.type === "number") {
                var newValue = this.value; //Note input[type=number] does not have .selectionStart/End (Chrome).
            } else {
                var newValue = this.value.slice(0, element.selectionStart) + this.value.slice(element.selectionEnd) + newChar; //removes the numbers selected by the user, then adds new char. 
            }

            var regexStr = this.getAttribute("data-input-regex");
            var r = new RegExp(regexStr);
            if (r.exec(newValue) === null) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        }
    }
}

module.exports = behavior({
    'keypress paste': {
        'input[data-input-regex]': inputRegexMask
    }
});

},{"../utils/behavior":34}],26:[function(require,module,exports){
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
var VISUALLY_HIDDEN = PREFIX + 'sr-only';

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

    // Normally we would just run this code without a timeout, but
    // IE11 and Edge will actually call the listener *immediately* because
    // they are currently handling this exact type of event, so we'll
    // make sure the browser is done handling the current click event,
    // if any, before we attach the listener.
    setTimeout(function () {
      document.body.addEventListener(CLICK, listener);
    }, 0);
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

},{"../config":29,"../events":31,"../utils/behavior":34,"../utils/select":37,"array-foreach":2,"object-assign":9,"receptor/ignore":14}],27:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var once = require('receptor/once');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;
var LINK = '.' + PREFIX + 'skipnav[href^="#"]';

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

},{"../config":29,"../events":31,"../utils/behavior":34,"receptor/once":15}],28:[function(require,module,exports){
'use strict';

var behavior = require('../utils/behavior');
var validate = require('../utils/validate-input');
var debounce = require('lodash.debounce');

var change = function change(event) {
  return validate(this);
};

module.exports = behavior({
  'keyup change': {
    'input[data-validation-element]': change
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
/*const assign = require('object-assign');
module.exports = assign(
  el => validator.on(el),
  validator
);*/

},{"../utils/behavior":34,"../utils/validate-input":41,"lodash.debounce":8}],29:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: ''
};

},{}],30:[function(require,module,exports){
'use strict';

var domready = require('domready');
var forEach = require('array-foreach');
var select = require('./utils/select');
var datepicker = require('./components/datepicker');
var modal = require('./components/modal');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

var dkwds = require('./config');

var jsSelectorDatepicker = '.js-calendar-group';

var components = require('./components');
dkwds.components = components;

domready(function () {
  var target = document.body;
  for (var name in components) {
    var behavior = components[name];
    behavior.on(target);
  }

  //Init datepicker.  (Note: above 'behavior.on' does not work with pikaday -> seperate initialization)
  forEach(select(jsSelectorDatepicker), function (calendarGroupElement) {
    new datepicker(calendarGroupElement);
  });
});

module.exports = dkwds;

},{"./components":21,"./components/datepicker":19,"./components/modal":22,"./config":29,"./polyfills":33,"./utils/select":37,"array-foreach":2,"domready":5}],31:[function(require,module,exports){
'use strict';

module.exports = {
  // This used to be conditionally dependent on whether the
  // browser supported touch events; if it did, `CLICK` was set to
  // `touchstart`.  However, this had downsides:
  //
  // * It pre-empted mobile browsers' default behavior of detecting
  //   whether a touch turned into a scroll, thereby preventing
  //   users from using some of our components as scroll surfaces.
  //
  // * Some devices, such as the Microsoft Surface Pro, support *both*
  //   touch and clicks. This meant the conditional effectively dropped
  //   support for the user's mouse, frustrating users who preferred
  //   it on those systems.
  CLICK: 'click'
};

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

},{"./element-hidden":32,"classlist-polyfill":4}],34:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":9,"receptor/behavior":10}],35:[function(require,module,exports){
'use strict';

/**
 * @name closest
 * @desc get nearest parent element matching selector.
 * @param {HTMLElement} el - The HTML element where the search starts.
 * @param {string} selector - Selector to be found.
 * @return {HTMLElement} - Nearest parent element matching selector.
 */

module.exports = function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
};

},{}],36:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],37:[function(require,module,exports){
'use strict';

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isElement = function isElement(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 1;
};

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
module.exports = function select(selector, context) {

  if (typeof selector !== 'string') {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document;
  }

  var selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./select":37,"./toggle-field-mask":38,"array-foreach":2,"resolve-id-refs":16}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
'use strict';

var dataset = require('elem-dataset');

var PREFIX = require('../config').prefix;
var CHECKED = 'aria-checked';
var CHECKED_CLASS = PREFIX + 'checklist-checked';

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

},{"../config":29,"elem-dataset":6}],42:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory) {
    'use strict';

    var moment;
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try {
            moment = require('moment');
        } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req) {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try {
                moment = req(id);
            } catch (e) {}
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
})(undefined, function (moment) {
    'use strict';

    /**
     * feature detection and helper functions
     */

    var hasMoment = typeof moment === 'function',
        hasEventListeners = !!window.addEventListener,
        document = window.document,
        sto = window.setTimeout,
        addEvent = function addEvent(el, e, callback, capture) {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },
        removeEvent = function removeEvent(el, e, callback, capture) {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },
        trim = function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    },
        hasClass = function hasClass(el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },
        addClass = function addClass(el, cn) {
        if (!hasClass(el, cn)) {
            el.className = el.className === '' ? cn : el.className + ' ' + cn;
        }
    },
        removeClass = function removeClass(el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },
        isArray = function isArray(obj) {
        return (/Array/.test(Object.prototype.toString.call(obj))
        );
    },
        isDate = function isDate(obj) {
        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
        );
    },
        isWeekend = function isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    },
        isLeapYear = function isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
        getDaysInMonth = function getDaysInMonth(year, month) {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
        setToStartOfDay = function setToStartOfDay(date) {
        if (isDate(date)) date.setHours(0, 0, 0, 0);
    },
        compareDates = function compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },
        extend = function extend(to, from, overwrite) {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && _typeof(from[prop]) === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                } else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },
        fireEvent = function fireEvent(el, eventName, data) {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },
        adjustCalendar = function adjustCalendar(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month) / 12);
            calendar.month -= 12;
        }
        return calendar;
    },


    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the toString function which gets passed a current date object and format
        // and returns a string
        toString: null,

        // used to create date object from current input string
        parse: null,

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the default flag for moment's strict date parsing
        formatStrict: false,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // Week picker mode
        pickWholeWeek: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        startRange: null,
        endRange: null,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // Render days of the calendar grid that fall in the next or previous month
        showDaysInNextAndPreviousMonths: false,

        // Allows user to select days that fall in the next or previous month
        enableSelectionDaysInNextAndPreviousMonths: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // Blur field when date is selected
        blurFieldOnSelect: true,

        // internationalization
        i18n: {
            previousMonth: 'Previous Month',
            nextMonth: 'Next Month',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },

        // Theme Classname
        theme: null,

        // events array
        events: [],

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,

        // Enable keyboard input
        keyboardInput: true
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },
        renderDay = function renderDay(opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
            if (opts.showDaysInNextAndPreviousMonths) {
                arr.push('is-outside-current-month');

                if (!opts.enableSelectionDaysInNextAndPreviousMonths) {
                    arr.push('is-selection-disabled');
                }
            } else {
                return '<td class="is-empty"></td>';
            }
        }
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
            ariaSelected = 'true';
        }
        if (opts.hasEvent) {
            arr.push('has-event');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
    },
        renderWeek = function renderWeek(d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },
        renderRow = function renderRow(days, isRTL, pickWholeWeek, isRowSelected) {
        return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },
        renderBody = function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
    },
        renderHead = function renderHead(opts) {
        var i,
            arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    },
        renderTitle = function renderTitle(instance, c, year, month, refYear, randId) {
        var i,
            j,
            arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === instance._o.numberOfMonths - 1) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },
        renderTable = function renderTable(opts, data, randId) {
        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function Pikaday(options) {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function (e) {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function () {
                            self.hide();
                            if (opts.blurFieldOnSelect && opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                } else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                } else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                // if this is touch event prevent mouse events emulation
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            } else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onKeyChange = function (e) {
            e = e || window.event;

            if (self.isVisible()) {

                switch (e.keyCode) {
                    case 13:
                    case 27:
                        if (opts.field) {
                            opts.field.blur();
                        }
                        break;
                    case 37:
                        e.preventDefault();
                        self.adjustDate('subtract', 1);
                        break;
                    case 38:
                        self.adjustDate('subtract', 7);
                        break;
                    case 39:
                        self.adjustDate('add', 1);
                        break;
                    case 40:
                        self.adjustDate('add', 7);
                        break;
                }
            }
        };

        self._onInputChange = function (e) {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (opts.parse) {
                date = opts.parse(opts.field.value, opts.format);
            } else if (hasMoment) {
                date = moment(opts.field.value, opts.format, opts.formatStrict);
                date = date && date.isValid() ? date.toDate() : null;
            } else {
                date = new Date(Date.parse(opts.field.value));
            }
            if (isDate(date)) {
                self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function () {
            self.show();
        };

        self._onInputClick = function () {
            self.show();
        };

        self._onInputBlur = function () {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            } while (pEl = pEl.parentNode);

            if (!self._c) {
                self._b = sto(function () {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            } while (pEl = pEl.parentNode);
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'touchend', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.keyboardInput) {
            addEvent(document, 'keydown', self._onKeyChange);
        }

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };

    /**
     * public Pikaday API
     */
    Pikaday.prototype = {

        /**
         * configure functionality
         */
        config: function config(options) {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = opts.field && opts.field.nodeName ? opts.field : null;

            opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function toString(format) {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
                return this._o.toString(this._d, format);
            }
            if (hasMoment) {
                return moment(this._d).format(format);
            }
            return this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function getMoment() {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function setMoment(date, preventOnSelect) {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function getDate() {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function setDate(date, preventOnSelect) {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function gotoDate(date) {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function adjustDate(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days) * 24 * 60 * 60 * 1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            this.setDate(newDay);
        },

        adjustCalendars: function adjustCalendars() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function gotoToday() {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function gotoMonth(month) {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function nextMonth() {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function prevMonth() {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function gotoYear(year) {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function setMinDate(value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function setMaxDate(value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function setStartRange(value) {
            this._o.startRange = value;
        },

        setEndRange: function setEndRange(value) {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function draw(force) {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '',
                randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if (opts.field.type !== 'hidden') {
                    sto(function () {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function adjustPosition() {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top = pEl.offsetTop + pEl.offsetHeight;
                while (pEl = pEl.offsetParent) {
                    left += pEl.offsetLeft;
                    top += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
                left = left - width + field.offsetWidth;
            }
            if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function render(year, month, randId) {
            var opts = this._o,
                now = new Date(),
                days = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data = [],
                row = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
                nextMonth = month === 11 ? 0 : month + 1,
                yearOfPreviousMonth = month === 0 ? year - 1 : year,
                yearOfNextMonth = month === 11 ? year + 1 : year,
                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
                after = cells;
            while (after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++) {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                    isEmpty = i < before || i >= days + before,
                    dayNumber = 1 + (i - before),
                    monthNumber = month,
                    yearNumber = year,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                    day: dayNumber,
                    month: monthNumber,
                    year: yearNumber,
                    hasEvent: hasEvent,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange,
                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                    enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                };

                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function isVisible() {
            return this._v;
        },

        show: function show() {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function hide() {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function destroy() {
            var opts = this._o;

            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
});

},{"moment":3}]},{},[30])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvZWxlbS1kYXRhc2V0L2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9iZWhhdmlvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9jb21wb3NlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlQWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2lnbm9yZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2RhdGVwaWNrZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Bhc3N3b3JkLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcmVnZXgtaW5wdXQtbWFzay5qcyIsInNyYy9qcy9jb21wb25lbnRzL3NlYXJjaC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3NraXBuYXYuanMiLCJzcmMvanMvY29tcG9uZW50cy92YWxpZGF0b3IuanMiLCJzcmMvanMvY29uZmlnLmpzIiwic3JjL2pzL2Rrd2RzLmpzIiwic3JjL2pzL2V2ZW50cy5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvZWxlbWVudC1oaWRkZW4uanMiLCJzcmMvanMvcG9seWZpbGxzL2luZGV4LmpzIiwic3JjL2pzL3V0aWxzL2JlaGF2aW9yLmpzIiwic3JjL2pzL3V0aWxzL2Nsb3Nlc3QuanMiLCJzcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnQuanMiLCJzcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwic3JjL2pzL3V0aWxzL3RvZ2dsZS1maWVsZC1tYXNrLmpzIiwic3JjL2pzL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0LmpzIiwic3JjL2pzL3V0aWxzL3RvZ2dsZS5qcyIsInNyYy9qcy91dGlscy92YWxpZGF0ZS1pbnB1dC5qcyIsInNyYy92ZW5kb3IvcGlrYWRheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0E7Ozs7Ozs7Ozs7QUFVQSxPQUFPLE9BQVAsR0FBaUIsVUFBVSxHQUFWLEVBQWUsRUFBZixFQUFtQixJQUFuQixFQUF5QjtBQUN4QyxNQUFJLElBQUksTUFBUixFQUFnQixPQUFPLElBQUksTUFBSixDQUFXLEVBQVgsRUFBZSxJQUFmLENBQVA7QUFDaEIsTUFBSSxLQUFLLENBQUwsS0FBVyxHQUFYLElBQWtCLFNBQVMsR0FBL0IsRUFBb0MsTUFBTSxJQUFJLFNBQUosRUFBTjtBQUNwQyxNQUFJLGNBQWMsT0FBTyxFQUF6QixFQUE2QixNQUFNLElBQUksU0FBSixFQUFOO0FBQzdCLE1BQUksTUFB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LEVBQXdCLFFBQXhCLEVBQWtDLEtBQUssY0FBdkM7QUFDQSxvQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDWixnQ0FBWSxLQUFLLE9BQWpCLEVBQTBCLE9BQTFCLEVBQW1DLEtBQUssYUFBeEM7QUFDQSxnQ0FBWSxLQUFLLE9BQWpCLEVBQTBCLE9BQTFCLEVBQW1DLEtBQUssYUFBeEM7QUFDQSxnQ0FBWSxLQUFLLE9BQWpCLEVBQTBCLE1BQTFCLEVBQWtDLEtBQUssWUFBdkM7QUFDSDtBQUNKO0FBQ0QsZ0JBQUksS0FBSyxFQUFMLENBQVEsVUFBWixFQUF3QjtBQUNwQixxQkFBSyxFQUFMLENBQVEsVUFBUixDQUFtQixXQUFuQixDQUErQixLQUFLLEVBQXBDO0FBQ0g7QUFDSjs7QUFwakJlLEtBQXBCOztBQXdqQkEsV0FBTyxPQUFQO0FBQ0gsQ0F0dENBLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8qKlxuICogQXJyYXkjZmlsdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gc2VsZlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAdGhyb3cgVHlwZUVycm9yXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyLCBmbiwgc2VsZikge1xuICBpZiAoYXJyLmZpbHRlcikgcmV0dXJuIGFyci5maWx0ZXIoZm4sIHNlbGYpO1xuICBpZiAodm9pZCAwID09PSBhcnIgfHwgbnVsbCA9PT0gYXJyKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIHZhciByZXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKGFyciwgaSkpIGNvbnRpbnVlO1xuICAgIHZhciB2YWwgPSBhcnJbaV07XG4gICAgaWYgKGZuLmNhbGwoc2VsZiwgdmFsLCBpLCBhcnIpKSByZXQucHVzaCh2YWwpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiIsIi8qKlxuICogYXJyYXktZm9yZWFjaFxuICogICBBcnJheSNmb3JFYWNoIHBvbnlmaWxsIGZvciBvbGRlciBicm93c2Vyc1xuICogICAoUG9ueWZpbGw6IEEgcG9seWZpbGwgdGhhdCBkb2Vzbid0IG92ZXJ3cml0ZSB0aGUgbmF0aXZlIG1ldGhvZClcbiAqIFxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3YWRhL2FycmF5LWZvcmVhY2hcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBUYWt1dG8gV2FkYVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogICBodHRwczovL2dpdGh1Yi5jb20vdHdhZGEvYXJyYXktZm9yZWFjaC9ibG9iL21hc3Rlci9NSVQtTElDRU5TRVxuICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAoYXJ5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmIChhcnkuZm9yRWFjaCkge1xuICAgICAgICBhcnkuZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgYXJ5W2ldLCBpLCBhcnkpO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKZlpXMXdkSGt1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCIvKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAxLjEuMjAxNzA0MjdcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBEZWRpY2F0ZWQgdG8gdGhlIHB1YmxpYyBkb21haW4uXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMgKi9cblxuaWYgKFwiZG9jdW1lbnRcIiBpbiB3aW5kb3cuc2VsZikge1xuXG4vLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG4vLyBJbmNsdWRpbmcgSUUgPCBFZGdlIG1pc3NpbmcgU1ZHRWxlbWVudC5jbGFzc0xpc3RcbmlmICghKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikpIFxuXHR8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJnXCIpKSkge1xuXG4oZnVuY3Rpb24gKHZpZXcpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghKCdFbGVtZW50JyBpbiB2aWV3KSkgcmV0dXJuO1xuXG52YXJcblx0ICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuXHQsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcblx0LCBlbGVtQ3RyUHJvdG8gPSB2aWV3LkVsZW1lbnRbcHJvdG9Qcm9wXVxuXHQsIG9iakN0ciA9IE9iamVjdFxuXHQsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0fVxuXHQsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgaSA9IDBcblx0XHRcdCwgbGVuID0gdGhpcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0Ly8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG5cdCwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuXHRcdHRoaXMubmFtZSA9IHR5cGU7XG5cdFx0dGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH1cblx0LCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuXHRcdGlmICh0b2tlbiA9PT0gXCJcIikge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiU1lOVEFYX0VSUlwiXG5cdFx0XHRcdCwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuXHRcdFx0XHQsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG5cdH1cblx0LCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdHZhclxuXHRcdFx0ICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG5cdFx0XHQsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuXHRcdFx0LCBpID0gMFxuXHRcdFx0LCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy50b1N0cmluZygpKTtcblx0XHR9O1xuXHR9XG5cdCwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG5cdCwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuXHR9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG5cdHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG59O1xuY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcblx0dG9rZW4gKz0gXCJcIjtcblx0cmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG5cdFx0XHR0aGlzLnB1c2godG9rZW4pO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdFx0LCBpbmRleFxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdHdoaWxlIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbiwgZm9yY2UpIHtcblx0dG9rZW4gKz0gXCJcIjtcblxuXHR2YXJcblx0XHQgIHJlc3VsdCA9IHRoaXMuY29udGFpbnModG9rZW4pXG5cdFx0LCBtZXRob2QgPSByZXN1bHQgP1xuXHRcdFx0Zm9yY2UgIT09IHRydWUgJiYgXCJyZW1vdmVcIlxuXHRcdDpcblx0XHRcdGZvcmNlICE9PSBmYWxzZSAmJiBcImFkZFwiXG5cdDtcblxuXHRpZiAobWV0aG9kKSB7XG5cdFx0dGhpc1ttZXRob2RdKHRva2VuKTtcblx0fVxuXG5cdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gZm9yY2U7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICFyZXN1bHQ7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG59O1xuXG5pZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG5cdHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcblx0XHQgIGdldDogY2xhc3NMaXN0R2V0dGVyXG5cdFx0LCBlbnVtZXJhYmxlOiB0cnVlXG5cdFx0LCBjb25maWd1cmFibGU6IHRydWVcblx0fTtcblx0dHJ5IHtcblx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuXHRcdC8vIGFkZGluZyB1bmRlZmluZWQgdG8gZmlnaHQgdGhpcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvaXNzdWVzLzM2XG5cdFx0Ly8gbW9kZXJuaWUgSUU4LU1TVzcgbWFjaGluZSBoYXMgSUU4IDguMC42MDAxLjE4NzAyIGFuZCBpcyBhZmZlY3RlZFxuXHRcdGlmIChleC5udW1iZXIgPT09IHVuZGVmaW5lZCB8fCBleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG5cdFx0XHRjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG5cdFx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdFx0fVxuXHR9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcblx0ZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbn1cblxufSh3aW5kb3cuc2VsZikpO1xuXG59XG5cbi8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuLy8gdG8gbm9ybWFsaXplIHRoZSBhZGQvcmVtb3ZlIGFuZCB0b2dnbGUgQVBJcy5cblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcblx0Ly8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG5cdGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcblx0XHR2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cdFx0XHR2YXIgb3JpZ2luYWwgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cblx0XHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdFx0XHRcdHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdHRva2VuID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0XHRcdG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0Y3JlYXRlTWV0aG9kKCdhZGQnKTtcblx0XHRjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuXHR9XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImMzXCIsIGZhbHNlKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG5cdC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cblx0aWYgKHRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMzXCIpKSB7XG5cdFx0dmFyIF90b2dnbGUgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuXHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG5cdFx0XHRpZiAoMSBpbiBhcmd1bWVudHMgJiYgIXRoaXMuY29udGFpbnModG9rZW4pID09PSAhZm9yY2UpIHtcblx0XHRcdFx0cmV0dXJuIGZvcmNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIF90b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHR9XG5cblx0dGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcblxufVxuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyA8MyBNb2Rlcm5penJcbi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvZG9tL2RhdGFzZXQuanNcblxuZnVuY3Rpb24gdXNlTmF0aXZlKCkge1xuXHR2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRlbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1hLWInLCAnYycpO1xuXG5cdHJldHVybiBCb29sZWFuKGVsZW0uZGF0YXNldCAmJiBlbGVtLmRhdGFzZXQuYUIgPT09ICdjJyk7XG59XG5cbmZ1bmN0aW9uIG5hdGl2ZURhdGFzZXQoZWxlbWVudCkge1xuXHRyZXR1cm4gZWxlbWVudC5kYXRhc2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gbmF0aXZlRGF0YXNldCA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHZhciBtYXAgPSB7fTtcblx0dmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG5cblx0ZnVuY3Rpb24gZ2V0dGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0dGVyKG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDAsIGogPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdHZhciBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuXG5cdFx0aWYgKGF0dHJpYnV0ZSkge1xuXHRcdFx0dmFyIG5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcblxuXHRcdFx0aWYgKG5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuXHRcdFx0XHR2YXIgcHJvcCA9IG5hbWUuc2xpY2UoNSkucmVwbGFjZSgvLS4vZywgZnVuY3Rpb24gKHUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdS5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXAsIHByb3AsIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZ2V0dGVyLmJpbmQoeyB2YWx1ZTogdmFsdWUgfHwgJycgfSksXG5cdFx0XHRcdFx0c2V0OiBzZXR0ZXIuYmluZChlbGVtZW50LCBuYW1lKVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWFwO1xufTtcblxuIiwiLy8gZWxlbWVudC1jbG9zZXN0IHwgQ0MwLTEuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9jbG9zZXN0XG5cbihmdW5jdGlvbiAoRWxlbWVudFByb3RvKSB7XG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLm1hdGNoZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdCsraW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG5cdFx0fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLmNsb3Nlc3QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8uY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0fVxufSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBkZWxlZ2F0ZUFsbCA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlQWxsJyk7XG5cbmNvbnN0IERFTEVHQVRFX1BBVFRFUk4gPSAvXiguKyk6ZGVsZWdhdGVcXCgoLispXFwpJC87XG5jb25zdCBTUEFDRSA9ICcgJztcblxuY29uc3QgZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKERFTEVHQVRFX1BBVFRFUk4pO1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChtYXRjaCkge1xuICAgIHR5cGUgPSBtYXRjaFsxXTtcbiAgICBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICB9XG5cbiAgdmFyIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogcG9wS2V5KGhhbmRsZXIsICdjYXB0dXJlJyksXG4gICAgICBwYXNzaXZlOiBwb3BLZXkoaGFuZGxlciwgJ3Bhc3NpdmUnKVxuICAgIH07XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGRlbGVnYXRlOiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKVxuICAgICAgPyBkZWxlZ2F0ZUFsbChoYW5kbGVyKVxuICAgICAgOiBzZWxlY3RvclxuICAgICAgICA/IGRlbGVnYXRlKHNlbGVjdG9yLCBoYW5kbGVyKVxuICAgICAgICA6IGhhbmRsZXIsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuXG4gIGlmICh0eXBlLmluZGV4T2YoU1BBQ0UpID4gLTEpIHtcbiAgICByZXR1cm4gdHlwZS5zcGxpdChTUEFDRSkubWFwKGZ1bmN0aW9uKF90eXBlKSB7XG4gICAgICByZXR1cm4gYXNzaWduKHt0eXBlOiBfdHlwZX0sIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lci50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxudmFyIHBvcEtleSA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICBkZWxldGUgb2JqW2tleV07XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVoYXZpb3IoZXZlbnRzLCBwcm9wcykge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gICAgLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHR5cGUsIGV2ZW50c1t0eXBlXSk7XG4gICAgICByZXR1cm4gbWVtby5jb25jYXQobGlzdGVuZXJzKTtcbiAgICB9LCBbXSk7XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGRCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBwcm9wcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKGZ1bmN0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMuc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSkgPT09IGZhbHNlO1xuICAgIH0sIHRoaXMpO1xuICB9O1xufTtcbiIsImNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGNvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbmNvbnN0IFNQTEFUID0gJyonO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlQWxsKHNlbGVjdG9ycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKVxuXG4gIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZXJlIGlzIG9ubHkgb25lIGhhbmRsZXIgYW5kIGl0IGFwcGxpZXMgdG9cbiAgLy8gYWxsIGVsZW1lbnRzICh0aGUgXCIqXCIgQ1NTIHNlbGVjdG9yKSwgdGhlbiBqdXN0IHJldHVybiB0aGF0XG4gIC8vIGhhbmRsZXJcbiAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09IFNQTEFUKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yc1tTUExBVF07XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZXMgPSBrZXlzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBzZWxlY3Rvcikge1xuICAgIG1lbW8ucHVzaChkZWxlZ2F0ZShzZWxlY3Rvciwgc2VsZWN0b3JzW3NlbGVjdG9yXSkpO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCBbXSk7XG4gIHJldHVybiBjb21wb3NlKGRlbGVnYXRlcyk7XG59O1xuIiwiLy8gcG9seWZpbGwgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdFxucmVxdWlyZSgnZWxlbWVudC1jbG9zZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWxlZ2F0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZShlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JhbmNlKGUpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gZS50YXJnZXQgJiYgIWVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVfVFJJTSA9IC8oXlxccyspfChcXHMrJCkvZztcbnZhciBSRV9TUExJVCA9IC9cXHMrLztcblxudmFyIHRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgPyBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci5yZXBsYWNlKFJFX1RSSU0sICcnKTsgfTtcblxudmFyIHF1ZXJ5QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tpZD1cIicgKyBpZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlc29sdmVJZHMoaWRzLCBkb2MpIHtcbiAgaWYgKHR5cGVvZiBpZHMgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBidXQgZ290ICcgKyAodHlwZW9mIGlkcykpO1xuICB9XG5cbiAgaWYgKCFkb2MpIHtcbiAgICBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgZ2V0RWxlbWVudEJ5SWQgPSBkb2MuZ2V0RWxlbWVudEJ5SWRcbiAgICA/IGRvYy5nZXRFbGVtZW50QnlJZC5iaW5kKGRvYylcbiAgICA6IHF1ZXJ5QnlJZC5iaW5kKGRvYyk7XG5cbiAgaWRzID0gdHJpbShpZHMpLnNwbGl0KFJFX1NQTElUKTtcblxuICAvLyBYWFggd2UgY2FuIHNob3J0LWNpcmN1aXQgaGVyZSBiZWNhdXNlIHRyaW1taW5nIGFuZCBzcGxpdHRpbmcgYVxuICAvLyBzdHJpbmcgb2YganVzdCB3aGl0ZXNwYWNlIHByb2R1Y2VzIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzaW5nbGUsXG4gIC8vIGVtcHR5IHN0cmluZ1xuICBpZiAoaWRzLmxlbmd0aCA9PT0gMSAmJiBpZHNbMF0gPT09ICcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBlbCA9IGdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZmlsdGVyID0gcmVxdWlyZSgnYXJyYXktZmlsdGVyJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlJyk7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMtaW4tdmlld3BvcnQnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuLy8gWFhYIG1hdGNoIC5hY2NvcmRpb24gYW5kIC5hY2NvcmRpb24tYm9yZGVyZWRcbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9YWNjb3JkaW9uLCAuJHtQUkVGSVh9YWNjb3JkaW9uLWJvcmRlcmVkYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9YWNjb3JkaW9uLWJ1dHRvblthcmlhLWNvbnRyb2xzXWA7XG5jb25zdCBFWFBBTkRFRCA9ICdhcmlhLWV4cGFuZGVkJztcbmNvbnN0IE1VTFRJU0VMRUNUQUJMRSA9ICdhcmlhLW11bHRpc2VsZWN0YWJsZSc7XG5cbi8qKlxuICogVG9nZ2xlIGEgYnV0dG9uJ3MgXCJwcmVzc2VkXCIgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGV4cGFuZGVkIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSByZXN1bHRpbmcgc3RhdGVcbiAqL1xuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgdmFyIGFjY29yZGlvbiA9IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTik7XG4gIGlmICghYWNjb3JkaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0JVVFRPTn0gaXMgbWlzc2luZyBvdXRlciAke0FDQ09SRElPTn1gKTtcbiAgfVxuXG4gIGV4cGFuZGVkID0gdG9nZ2xlKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAvLyBYWFggbXVsdGlzZWxlY3RhYmxlIGlzIG9wdC1pbiwgdG8gcHJlc2VydmUgbGVnYWN5IGJlaGF2aW9yXG4gIGNvbnN0IG11bHRpc2VsZWN0YWJsZSA9IGFjY29yZGlvbi5nZXRBdHRyaWJ1dGUoTVVMVElTRUxFQ1RBQkxFKSA9PT0gJ3RydWUnO1xuXG4gIGlmIChleHBhbmRlZCAmJiAhbXVsdGlzZWxlY3RhYmxlKSB7XG4gICAgZm9yRWFjaChnZXRBY2NvcmRpb25CdXR0b25zKGFjY29yZGlvbiksIG90aGVyID0+IHtcbiAgICAgIGlmIChvdGhlciAhPT0gYnV0dG9uKSB7XG4gICAgICAgIHRvZ2dsZShvdGhlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzaG93QnV0dG9uID0gYnV0dG9uID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIHRydWUpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2VcbiAqL1xuY29uc3QgaGlkZUJ1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCBmYWxzZSk7XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGJ1dHRvbiBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBhY2NvcmRpb24gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFjY29yZGlvblxuICogQHJldHVybiB7YXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRBY2NvcmRpb25CdXR0b25zID0gYWNjb3JkaW9uID0+IHtcbiAgcmV0dXJuIGZpbHRlcihhY2NvcmRpb24ucXVlcnlTZWxlY3RvckFsbChCVVRUT04pLCBidXR0b24gPT4ge1xuICAgIHJldHVybiBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pID09PSBhY2NvcmRpb247XG4gIH0pO1xufTtcblxuY29uc3QgYWNjb3JkaW9uID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0b2dnbGVCdXR0b24odGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09ICd0cnVlJykge1xuICAgICAgICAvLyBXZSB3ZXJlIGp1c3QgZXhwYW5kZWQsIGJ1dCBpZiBhbm90aGVyIGFjY29yZGlvbiB3YXMgYWxzbyBqdXN0XG4gICAgICAgIC8vIGNvbGxhcHNlZCwgd2UgbWF5IG5vIGxvbmdlciBiZSBpbiB0aGUgdmlld3BvcnQuIFRoaXMgZW5zdXJlc1xuICAgICAgICAvLyB0aGF0IHdlIGFyZSBzdGlsbCB2aXNpYmxlLCBzbyB0aGUgdXNlciBpc24ndCBjb25mdXNlZC5cbiAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRoaXMpKSB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0sIHtcbiAgaW5pdDogcm9vdCA9PiB7XG4gICAgZm9yRWFjaChyb290LnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKSwgYnV0dG9uID0+IHtcbiAgICAgIGNvbnN0IGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09ICd0cnVlJztcbiAgICAgIHRvZ2dsZUJ1dHRvbihidXR0b24sIGV4cGFuZGVkKTtcbiAgICB9KTtcbiAgfSxcbiAgQUNDT1JESU9OLFxuICBCVVRUT04sXG4gIHNob3c6IHNob3dCdXR0b24sXG4gIGhpZGU6IGhpZGVCdXR0b24sXG4gIHRvZ2dsZTogdG9nZ2xlQnV0dG9uLFxuICBnZXRCdXR0b25zOiBnZXRBY2NvcmRpb25CdXR0b25zLFxufSk7XG5cbi8qKlxuICogVE9ETzogZm9yIDIuMCwgcmVtb3ZlIGV2ZXJ5dGhpbmcgYmVsb3cgdGhpcyBjb21tZW50IGFuZCBleHBvcnQgdGhlXG4gKiBiZWhhdmlvciBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgQWNjb3JkaW9uID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdGhpcy5yb290ID0gcm9vdDtcbiAgYWNjb3JkaW9uLm9uKHRoaXMucm9vdCk7XG59O1xuXG4vLyBjb3B5IGFsbCBvZiB0aGUgYmVoYXZpb3IgbWV0aG9kcyBhbmQgcHJvcHMgdG8gQWNjb3JkaW9uXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5hc3NpZ24oQWNjb3JkaW9uLCBhY2NvcmRpb24pO1xuXG5BY2NvcmRpb24ucHJvdG90eXBlLnNob3cgPSBzaG93QnV0dG9uO1xuQWNjb3JkaW9uLnByb3RvdHlwZS5oaWRlID0gaGlkZUJ1dHRvbjtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gIGFjY29yZGlvbi5vZmYodGhpcy5yb290KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWNjb3JkaW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IEhFQURFUiA9IGAuJHtQUkVGSVh9YmFubmVyLWhlYWRlcmA7XG5jb25zdCBFWFBBTkRFRF9DTEFTUyA9IGAke1BSRUZJWH1iYW5uZXItaGVhZGVyLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuY2xvc2VzdChIRUFERVIpLmNsYXNzTGlzdC50b2dnbGUoRVhQQU5ERURfQ0xBU1MpO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWAgXTogdG9nZ2xlQmFubmVyLFxuICB9LFxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgUGlrYWRheSA9IHJlcXVpcmUoXCIuLi8uLi92ZW5kb3IvcGlrYWRheS5qc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgY2xvc2VzdCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Nsb3Nlc3QnKTtcblxuY29uc3QganNEYXRlcGlja2VyU2VsZWN0b3IgPSAnLmpzLWNhbGVuZGFyLWRhdGVwaWNrZXInO1xuY29uc3QganNEYXlJbnB1dCA9ICcuanMtY2FsZW5kYXItZGF5LWlucHV0JztcbmNvbnN0IGpzTW9udGhJbnB1dCA9ICcuanMtY2FsZW5kYXItbW9udGgtaW5wdXQnO1xuY29uc3QganNZZWFySW5wdXQgPSAnLmpzLWNhbGVuZGFyLXllYXItaW5wdXQnO1xuXG5jbGFzcyBkYXRlcGlja2VyR3JvdXAge1xuICBjb25zdHJ1Y3RvcihlbCl7XG4gICAgXG4gICAgdGhpcy5waWthZGF5SW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuZGF0ZXBpY2tlckVsZW1lbnQgPSBzZWxlY3QoanNEYXRlcGlja2VyU2VsZWN0b3IsIGVsKTtcbiAgICB0aGlzLmRhdGVHcm91cCA9IGVsO1xuICAgIHRoaXMuZm9ybUdyb3VwID0gY2xvc2VzdChlbCwgJy5mb3JtLWdyb3VwJyk7XG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMueWVhcklucHV0RWxlbWVudCA9IG51bGw7ICAgXG5cbiAgICB0aGlzLmluaXREYXRlSW5wdXRzKCk7XG4gICAgdGhpcy5pbml0RGF0ZXBpY2tlcih0aGlzLmRhdGVwaWNrZXJFbGVtZW50WzBdKTtcbiAgfVxuXG4gIGluaXREYXRlSW5wdXRzKCl7XG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNEYXlJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdXG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudCA9IHNlbGVjdChqc01vbnRoSW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXTtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNZZWFySW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXTtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGF0LnZhbGlkYXRlSW5wdXRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0RGF0ZXBpY2tlcihlbCl7XG4gICAgaWYoZWwpe1xuICAgICAgLy9Ob3RlOiBlbCBtYXkgbm90IGJlIGEgPHN2Zz4sIElFMTEgZG9lcyBub3QgYWRkIC5ibHVyKCkgbWV0aG9kIHRvIHN2ZyBlbGVtZW50cyAoLS0+IGVzYyBhbmQgZW50ZXIgZG9lcyBub3QgZGlzbWlzcyBwaWthZGF5KS4gXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHRoaXMucGlrYWRheUluc3RhbmNlID0gbmV3IFBpa2FkYXkoe1xuICAgICAgICBmaWVsZDogZWwsXG4gICAgICAgIGZvcm1hdDogJ0REL01NL1lZWVknLFxuICAgICAgICBmaXJzdERheTogMSwgLy9tYW5kYWdcbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgIHByZXZpb3VzTW9udGggOiAnRm9ycmlnZSBtw6VuZWQnLFxuICAgICAgICAgIG5leHRNb250aCAgICAgOiAnTsOmc3RlIG3DpW5lZCcsXG4gICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyJywnRmVicnVhcicsJ01hcnRoJywnQXByaWwnLCdNYWonLCdKdW5pJywnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09rdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgd2Vla2RheXMgICAgICA6IFsnU8O4bmRhZycsJ01hbmRhZycsJ1RpcnNkYWcnLCdPbnNkYWcnLCdUb3JzZGFnJywnRnJlZGFnJywnTMO4cmRhZyddLFxuICAgICAgICAgIHdlZWtkYXlzU2hvcnQgOiBbJ1PDuG4nLCdNYW4nLCdUaXInLCdPbnMnLCdUb3InLCdGcmUnLCdMw7hyJ11cbiAgICAgICAgfSxcbiAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAvL3NlbGVjdGVkIG5ldyBkYXRlIGluIHBpa2FkYXksIHVwZGF0ZSBpbnB1dCBmaWVsZHMuIFxuICAgICAgICAgIHRoYXQudXBkYXRlRGF0ZUlucHV0cyhkYXRlKTtcbiAgICAgICAgICB0aGF0LnZhbGlkYXRlSW5wdXRzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAvL3VwZGF0ZSBwaWthZGF5IHdpdGggdmFsdWVzIGZyb20gaW5wdXQgZmllbGRzXG4gICAgICAgICAgdmFyIGRheSA9IHBhcnNlSW50KHRoYXQuZGF5SW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICB2YXIgbW9udGggPSBwYXJzZUludCh0aGF0Lm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlKSAtMTtcbiAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHRoYXQueWVhcklucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgICBpZih0aGF0LnZhbGlkYXRlSW5wdXRzKCkpe1xuICAgICAgICAgICAgdGhhdC51cGRhdGVEYXRlcGlja2VyRGF0ZShuZXdEYXRlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBpbml0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZS5zZXREYXRlKGluaXREYXRlKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZUlucHV0cyhpbml0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVJbnB1dHMoKXtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUpXG4gICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgdmFyIHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgIHZhciBtYXhEYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgdmFyIG1zZyA9IFwiXCI7XG4gICAgdmFyIGlzVmFsaWQgPSB0cnVlOyBcbiAgICBpZihkYXkgPiBtYXhEYXkpe1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgbXNnID0gXCJIb3YsIGRlbiBkYWcgZmluZGVzIGlra2UgaSBkZW4gdmFsZ3RlIG3DpW5lZC5cIlxuICAgICAgdGhpcy5zaG93RXJyb3IobXNnKTtcbiAgICB9ZWxzZSBpZihtb250aCA+IDEyKXtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIG1zZyA9IFwiSG92LCBkZW4gbcOlbmVkIGZpbmRlcyBpa2tlLlwiXG4gICAgICB0aGlzLnNob3dFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGlmKGlzVmFsaWQpe1xuICAgICAgdGhpcy5yZW1vdmVFcnJvcigpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9XG5cbiAgc2hvd0Vycm9yKG1zZyl7XG4gICAgdGhpcy5mb3JtR3JvdXAuY2xhc3NMaXN0LmFkZChcImlucHV0LWVycm9yXCIpO1xuICAgIHNlbGVjdChcIi5pbnB1dC1lcnJvci1tZXNzYWdlXCIsICB0aGlzLmZvcm1Hcm91cClbMF0udGV4dENvbnRlbnQgPSBtc2c7XG4gIH1cbiAgcmVtb3ZlRXJyb3IoKXtcbiAgICB0aGlzLmZvcm1Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5wdXQtZXJyb3JcIik7XG4gICAgc2VsZWN0KFwiLmlucHV0LWVycm9yLW1lc3NhZ2VcIiwgIHRoaXMuZm9ybUdyb3VwKVswXS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVEYXRlSW5wdXRzKGRhdGUpe1xuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIFxuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50LnZhbHVlID0gZGF5O1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUgPSBtb250aDtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQudmFsdWUgPSB5ZWFyO1xuICB9XG5cbiAgdXBkYXRlRGF0ZXBpY2tlckRhdGUobmV3RGF0ZSl7XG4gICAgdGhpcy5waWthZGF5SW5zdGFuY2Uuc2V0RGF0ZShuZXdEYXRlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVwaWNrZXJHcm91cDsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKCcuL2FjY29yZGlvbicpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDsgLy9KSkU6IG5vdCB1c2VkIGFueW1vcmUgXG5cbmNvbnN0IEhJRERFTiA9ICdoaWRkZW4nO1xuY29uc3QgU0NPUEUgPSBgLmZvb3RlcmA7IC8vJHtQUkVGSVh9LVxuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC5mb290ZXItcHJpbWFyeS1saW5rYDsgLy8ke1BSRUZJWH0tXG5jb25zdCBMSVNUID0gYCR7TkFWfSB1bGA7XG5cbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNjAwO1xuY29uc3QgREVCT1VOQ0VfUkFURSA9IDE4MDtcblxuY29uc3Qgc2hvd1BhbmVsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzbWFsbF9zY3JlZW4gPSB3aW5kb3cuaW5uZXJXaWR0aCA8IEhJREVfTUFYX1dJRFRIO1xuICBpZihzbWFsbF9zY3JlZW4pe1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNsb3Nlc3QoTElTVCk7XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTik7XG5cbiAgICAvLyBOQjogdGhpcyAqc2hvdWxkKiBhbHdheXMgc3VjY2VlZCBiZWNhdXNlIHRoZSBidXR0b25cbiAgICAvLyBzZWxlY3RvciBpcyBzY29wZWQgdG8gXCIue3ByZWZpeH0tZm9vdGVyLWJpZyBuYXZcIlxuICAgIGNvbnN0IGxpc3RzID0gbGlzdC5jbG9zZXN0KE5BVilcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuXG4gICAgZm9yRWFjaChsaXN0cywgZWwgPT4ge1xuICAgICAgaWYgKGVsICE9PSBsaXN0KSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSElEREVOKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgcmVzaXplID0gZGVib3VuY2UoKCkgPT4ge1xuICBjb25zdCBoaWRkZW4gPSB3aW5kb3cuaW5uZXJXaWR0aCA8IEhJREVfTUFYX1dJRFRIO1xuICBmb3JFYWNoKHNlbGVjdChMSVNUKSwgbGlzdCA9PiB7XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTiwgaGlkZGVuKTtcbiAgfSk7XG59LCBERUJPVU5DRV9SQVRFKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dQYW5lbCxcbiAgfSxcbn0sIHtcbiAgLy8gZXhwb3J0IGZvciB1c2UgZWxzZXdoZXJlXG4gIEhJREVfTUFYX1dJRFRILFxuICBERUJPVU5DRV9SQVRFLFxuXG4gIGluaXQ6IHRhcmdldCA9PiB7XG4gICAgcmVzaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG5cbiAgdGVhcmRvd246IHRhcmdldCA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb246ICByZXF1aXJlKCcuL2FjY29yZGlvbicpLFxuICBiYW5uZXI6ICAgICByZXF1aXJlKCcuL2Jhbm5lcicpLFxuICBmb290ZXI6ICAgICByZXF1aXJlKCcuL2Zvb3RlcicpLFxuICBuYXZpZ2F0aW9uOiByZXF1aXJlKCcuL25hdmlnYXRpb24nKSxcbiAgcGFzc3dvcmQ6ICAgcmVxdWlyZSgnLi9wYXNzd29yZCcpLFxuICBzZWFyY2g6ICAgICByZXF1aXJlKCcuL3NlYXJjaCcpLFxuICBza2lwbmF2OiAgICByZXF1aXJlKCcuL3NraXBuYXYnKSxcbiAgdmFsaWRhdG9yOiAgcmVxdWlyZSgnLi92YWxpZGF0b3InKSxcbiAgcmVnZXhtYXNrOiAgcmVxdWlyZSgnLi9yZWdleC1pbnB1dC1tYXNrJylcbiAgLy90YWJsZTogICAgICByZXF1aXJlKCcuL3RhYmxlJyksXG4gIC8vb3ZlcmZsb3c6ICAgcmVxdWlyZSgnLi9vdmVyZmxvdy1tZW51JyksXG59O1xuIiwiXG5mdW5jdGlvbiBEaWFsb2coZGlhbG9nRWwsIG92ZXJsYXlFbCkge1xuXG5cdHRoaXMuZGlhbG9nRWwgPSBkaWFsb2dFbDtcblx0dGhpcy5vdmVybGF5RWwgPSBvdmVybGF5RWw7XG5cdHRoaXMuZm9jdXNlZEVsQmVmb3JlT3BlbjtcblxuXHR2YXIgZm9jdXNhYmxlRWxzID0gdGhpcy5kaWFsb2dFbC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgW3RhYmluZGV4PVwiMFwiXScpO1xuXHR0aGlzLmZvY3VzYWJsZUVscyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZUVscyk7XG5cblx0dGhpcy5maXJzdEZvY3VzYWJsZUVsID0gdGhpcy5mb2N1c2FibGVFbHNbMF07XG5cdHRoaXMubGFzdEZvY3VzYWJsZUVsID0gdGhpcy5mb2N1c2FibGVFbHNbIHRoaXMuZm9jdXNhYmxlRWxzLmxlbmd0aCAtIDEgXTtcblxuXHR0aGlzLmNsb3NlKCk7IC8vIFJlc2V0XG59XG5cblxuRGlhbG9nLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIERpYWxvZyA9IHRoaXM7XG5cblx0dGhpcy5kaWFsb2dFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG5cdHRoaXMub3ZlcmxheUVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblxuXHR0aGlzLmZvY3VzZWRFbEJlZm9yZU9wZW4gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG5cdHRoaXMuZGlhbG9nRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblx0XHREaWFsb2cuX2hhbmRsZUtleURvd24oZSk7XG5cdH0pO1xuXG5cdHRoaXMub3ZlcmxheUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0RGlhbG9nLmNsb3NlKCk7XG5cdH0pO1xuXG5cdHRoaXMuZmlyc3RGb2N1c2FibGVFbC5mb2N1cygpO1xufTtcblxuRGlhbG9nLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuZGlhbG9nRWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHR0aGlzLm92ZXJsYXlFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cblx0aWYgKCB0aGlzLmZvY3VzZWRFbEJlZm9yZU9wZW4gKSB7XG5cdFx0dGhpcy5mb2N1c2VkRWxCZWZvcmVPcGVuLmZvY3VzKCk7XG5cdH1cbn07XG5cblxuRGlhbG9nLnByb3RvdHlwZS5faGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uKGUpIHtcblxuXHR2YXIgRGlhbG9nID0gdGhpcztcblx0dmFyIEtFWV9UQUIgPSA5O1xuXHR2YXIgS0VZX0VTQyA9IDI3O1xuXG5cdGZ1bmN0aW9uIGhhbmRsZUJhY2t3YXJkVGFiKCkge1xuXHRcdGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gRGlhbG9nLmZpcnN0Rm9jdXNhYmxlRWwgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHREaWFsb2cubGFzdEZvY3VzYWJsZUVsLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGhhbmRsZUZvcndhcmRUYWIoKSB7XG5cdFx0aWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBEaWFsb2cubGFzdEZvY3VzYWJsZUVsICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0RGlhbG9nLmZpcnN0Rm9jdXNhYmxlRWwuZm9jdXMoKTtcblx0XHR9XG5cdH1cblxuXHRzd2l0Y2goZS5rZXlDb2RlKSB7XG5cdGNhc2UgS0VZX1RBQjpcblx0XHRpZiAoIERpYWxvZy5mb2N1c2FibGVFbHMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fSBcblx0XHRpZiAoIGUuc2hpZnRLZXkgKSB7XG5cdFx0XHRoYW5kbGVCYWNrd2FyZFRhYigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoYW5kbGVGb3J3YXJkVGFiKCk7XG5cdFx0fVxuXHRcdGJyZWFrO1xuXHRjYXNlIEtFWV9FU0M6XG5cdFx0RGlhbG9nLmNsb3NlKCk7XG5cdFx0YnJlYWs7XG5cdGRlZmF1bHQ6XG5cdFx0YnJlYWs7XG5cdH1cblxuXG59O1xuXG5cbkRpYWxvZy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbihvcGVuRGlhbG9nU2VsLCBjbG9zZURpYWxvZ1NlbCkge1xuXG5cdHZhciBEaWFsb2cgPSB0aGlzO1xuXG5cdHZhciBvcGVuRGlhbG9nRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChvcGVuRGlhbG9nU2VsKTtcblx0Zm9yICggdmFyIGkgPSAwOyBpIDwgb3BlbkRpYWxvZ0Vscy5sZW5ndGg7IGkrKyApIHtcblx0XHRvcGVuRGlhbG9nRWxzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IFxuXHRcdFx0RGlhbG9nLm9wZW4oKTtcblx0XHR9KTtcblx0fVxuXG5cdHZhciBjbG9zZURpYWxvZ0VscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VEaWFsb2dTZWwpO1xuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjbG9zZURpYWxvZ0Vscy5sZW5ndGg7IGkrKyApIHtcblx0XHRjbG9zZURpYWxvZ0Vsc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0RGlhbG9nLmNsb3NlKCk7XG5cdFx0fSk7XG5cdH1cblxufTtcblxuXG52YXIgbmF2RGlhbG9nRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtanMnKTtcbnZhciBkaWFsb2dPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWpzLW92ZXJsYXknKTtcblxudmFyIG15RGlhbG9nID0gbmV3IERpYWxvZyhuYXZEaWFsb2dFbCwgZGlhbG9nT3ZlcmxheSk7XG5teURpYWxvZy5hZGRFdmVudExpc3RlbmVycygnLm9wZW4tanMtbW9kYWwnLCAnLmNsb3NlLWpzLW1vZGFsJyk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfTElOS1MgPSBgJHtOQVZ9IGFgO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdi1jbG9zZWA7XG5jb25zdCBPVkVSTEFZID0gYC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbIE5BViwgT1ZFUkxBWSBdLmpvaW4oJywgJyk7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICd1c2EtbW9iaWxlX25hdi1hY3RpdmUnO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9ICdpcy12aXNpYmxlJztcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuXG5jb25zdCBfZm9jdXNUcmFwID0gKHRyYXBDb250YWluZXIpID0+IHtcbiAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nID0gJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0cmFwQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1sgMCBdO1xuICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWyBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxIF07XG5cbiAgZnVuY3Rpb24gdHJhcFRhYktleSAoZSkge1xuICAgIC8vIENoZWNrIGZvciBUQUIga2V5IHByZXNzXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuXG4gICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIFRBQlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRVNDQVBFXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIHRvZ2dsZU5hdi5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBGb2N1cyBmaXJzdCBjaGlsZFxuICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcblxuICByZXR1cm4ge1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIGFuZCB0cmFwIHRoZSBrZXlib2FyZFxuICAgICAgdHJhcENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG4gICAgfSxcblxuICAgIHJlbGVhc2UgKCkge1xuICAgICAgdHJhcENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmxldCBmb2N1c1RyYXA7XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIGlmICh0eXBlb2YgYWN0aXZlICE9PSAnYm9vbGVhbicpIHtcbiAgICBhY3RpdmUgPSAhaXNBY3RpdmUoKTtcbiAgfVxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBhY3RpdmUpO1xuXG4gIGZvckVhY2goc2VsZWN0KFRPR0dMRVMpLCBlbCA9PiB7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBhY3RpdmUpO1xuICB9KTtcblxuICBpZiAoYWN0aXZlKSB7XG4gICAgZm9jdXNUcmFwLmVuYWJsZSgpO1xuICB9IGVsc2Uge1xuICAgIGZvY3VzVHJhcC5yZWxlYXNlKCk7XG4gIH1cblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuXG4gIGlmIChhY3RpdmUgJiYgY2xvc2VCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBhY3RpdmF0ZWQsIHNvIGZvY3VzIG9uIHRoZSBjbG9zZSBidXR0b24sXG4gICAgLy8gd2hpY2ggaXMganVzdCBiZWZvcmUgYWxsIHRoZSBuYXYgZWxlbWVudHMgaW4gdGhlIHRhYiBvcmRlci5cbiAgICBjbG9zZUJ1dHRvbi5mb2N1cygpO1xuICB9IGVsc2UgaWYgKCFhY3RpdmUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gY2xvc2VCdXR0b24gJiZcbiAgICAgICAgICAgICBtZW51QnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgZGVhY3RpdmF0ZWQsIGFuZCBmb2N1cyB3YXMgb24gdGhlIGNsb3NlXG4gICAgLy8gYnV0dG9uLCB3aGljaCBpcyBubyBsb25nZXIgdmlzaWJsZS4gV2UgZG9uJ3Qgd2FudCB0aGUgZm9jdXMgdG9cbiAgICAvLyBkaXNhcHBlYXIgaW50byB0aGUgdm9pZCwgc28gZm9jdXMgb24gdGhlIG1lbnUgYnV0dG9uIGlmIGl0J3NcbiAgICAvLyB2aXNpYmxlICh0aGlzIG1heSBoYXZlIGJlZW4gd2hhdCB0aGUgdXNlciB3YXMganVzdCBmb2N1c2VkIG9uLFxuICAgIC8vIGlmIHRoZXkgdHJpZ2dlcmVkIHRoZSBtb2JpbGUgbmF2IGJ5IG1pc3Rha2UpLlxuICAgIG1lbnVCdXR0b24uZm9jdXMoKTtcbiAgfVxuXG4gIHJldHVybiBhY3RpdmU7XG59O1xuXG5jb25zdCByZXNpemUgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlciA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuXG4gIGlmIChpc0FjdGl2ZSgpICYmIGNsb3NlciAmJiBjbG9zZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggPT09IDApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiBpcyBhY3RpdmUsIGJ1dCB0aGUgY2xvc2UgYm94IGlzbid0IHZpc2libGUsIHdoaWNoXG4gICAgLy8gbWVhbnMgdGhlIHVzZXIncyB2aWV3cG9ydCBoYXMgYmVlbiByZXNpemVkIHNvIHRoYXQgaXQgaXMgbm8gbG9uZ2VyXG4gICAgLy8gaW4gbW9iaWxlIG1vZGUuIExldCdzIG1ha2UgdGhlIHBhZ2Ugc3RhdGUgY29uc2lzdGVudCBieVxuICAgIC8vIGRlYWN0aXZhdGluZyB0aGUgbW9iaWxlIG5hdi5cbiAgICB0b2dnbGVOYXYuY2FsbChjbG9zZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuY29uc3QgbmF2aWdhdGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBPUEVORVJTIF06IHRvZ2dsZU5hdixcbiAgICBbIENMT1NFUlMgXTogdG9nZ2xlTmF2LFxuICAgIFsgTkFWX0xJTktTIF06IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEEgbmF2aWdhdGlvbiBsaW5rIGhhcyBiZWVuIGNsaWNrZWQhIFdlIHdhbnQgdG8gY29sbGFwc2UgYW55XG4gICAgICAvLyBoaWVyYXJjaGljYWwgbmF2aWdhdGlvbiBVSSBpdCdzIGEgcGFydCBvZiwgc28gdGhhdCB0aGUgdXNlclxuICAgICAgLy8gY2FuIGZvY3VzIG9uIHdoYXRldmVyIHRoZXkndmUganVzdCBzZWxlY3RlZC5cblxuICAgICAgLy8gU29tZSBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBpbnNpZGUgYWNjb3JkaW9uczsgd2hlbiB0aGV5J3JlXG4gICAgICAvLyBjbGlja2VkLCB3ZSB3YW50IHRvIGNvbGxhcHNlIHRob3NlIGFjY29yZGlvbnMuXG4gICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG4gICAgICBpZiAoYWNjKSB7XG4gICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaChidG4gPT4gYWNjb3JkaW9uLmhpZGUoYnRuKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgdG9nZ2xlTmF2LmNhbGwodGhpcywgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQgKCkge1xuICAgIGNvbnN0IHRyYXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgZm9jdXNUcmFwID0gX2ZvY3VzVHJhcCh0cmFwQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZXNpemUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplLCBmYWxzZSk7XG4gIH0sXG4gIHRlYXJkb3duICgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplLCBmYWxzZSk7XG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IG5hdmlnYXRpb24ub24oZWwpLFxuICBuYXZpZ2F0aW9uXG4pOyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfXNob3dfcGFzc3dvcmQsIC4ke1BSRUZJWH1zaG93X211bHRpcGFzc3dvcmRgO1xuXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdG9nZ2xlRm9ybUlucHV0KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgTElOSyBdOiB0b2dnbGUsXG4gIH0sXG59KTtcbiIsIlxuLypcbiogUHJldmVudHMgdGhlIHVzZXIgZnJvbSBpbnB1dHRpbmcgYmFzZWQgb24gYSByZWdleC5cbiogRG9lcyBub3Qgd29yayB0aGUgc2FtZSB3YXkgYWYgPGlucHV0IHBhdHRlcm49XCJcIj4sIHRoaXMgcGF0dGVybiBpcyBvbmx5IHVzZWQgZm9yIHZhbGlkYXRpb24sIG5vdCB0byBwcmV2ZW50IGlucHV0LiBcbiogVXNlY2FzZTogbnVtYmVyIGlucHV0IGZvciBkYXRlLWNvbXBvbmVudC5cbiogRXhhbXBsZSAtIG51bWJlciBvbmx5OiA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWlucHV0LXJlZ2V4PVwiXlxcZCokXCI+XG4qL1xuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuXG5jb25zdCBtb2RpZmllclN0YXRlID0ge1xuICBzaGlmdDogZmFsc2UsXG4gIGFsdDogZmFsc2UsXG4gIGN0cmw6IGZhbHNlLFxuICBjb21tYW5kOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gaW5wdXRSZWdleE1hc2soZXZlbnQpIHtcblxuICAgIGlmKG1vZGlmaWVyU3RhdGUuY3RybCB8fCBtb2RpZmllclN0YXRlLmNvbW1hbmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmV3Q2hhciA9IG51bGw7XG4gICAgaWYodHlwZW9mIGV2ZW50LmtleSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIGlmKGV2ZW50LmtleS5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgbmV3Q2hhciA9IGV2ZW50LmtleTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCFldmVudC5jaGFyQ29kZSl7XG4gICAgICAgICAgICBuZXdDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmNoYXJDb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZWxlbWVudCA9IG51bGw7XG4gICAgaWYoZXZlbnQudGFyZ2V0ICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpZihuZXdDaGFyICE9PSBudWxsICYmIGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgaWYobmV3Q2hhci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQudHlwZSA9PT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZTsvL05vdGUgaW5wdXRbdHlwZT1udW1iZXJdIGRvZXMgbm90IGhhdmUgLnNlbGVjdGlvblN0YXJ0L0VuZCAoQ2hyb21lKS5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMCwgZWxlbWVudC5zZWxlY3Rpb25TdGFydCkgKyB0aGlzLnZhbHVlLnNsaWNlKGVsZW1lbnQuc2VsZWN0aW9uRW5kKSArIG5ld0NoYXI7IC8vcmVtb3ZlcyB0aGUgbnVtYmVycyBzZWxlY3RlZCBieSB0aGUgdXNlciwgdGhlbiBhZGRzIG5ldyBjaGFyLiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlZ2V4U3RyID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlucHV0LXJlZ2V4XCIpO1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyKTtcbiAgICAgICAgICAgIGlmKHIuZXhlYyhuZXdWYWx1ZSkgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICAna2V5cHJlc3MgcGFzdGUnOiB7XG4gICAgJ2lucHV0W2RhdGEtaW5wdXQtcmVnZXhdJzogaW5wdXRSZWdleE1hc2ssXG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IGlnbm9yZSA9IHJlcXVpcmUoJ3JlY2VwdG9yL2lnbm9yZScpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IEJVVFRPTiA9ICcuanMtc2VhcmNoLWJ1dHRvbic7XG5jb25zdCBGT1JNID0gJy5qcy1zZWFyY2gtZm9ybSc7XG5jb25zdCBJTlBVVCA9ICdbdHlwZT1zZWFyY2hdJztcbmNvbnN0IENPTlRFWFQgPSAnaGVhZGVyJzsgLy8gWFhYXG5jb25zdCBWSVNVQUxMWV9ISURERU4gPSBgJHtQUkVGSVh9c3Itb25seWA7XG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBzaG93U2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59O1xuXG5jb25zdCBoaWRlU2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBnZXRGb3JtID0gYnV0dG9uID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dFxuICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEZPUk0pO1xufTtcblxuY29uc3QgdG9nZ2xlU2VhcmNoID0gKGJ1dHRvbiwgYWN0aXZlKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBnZXRGb3JtKGJ1dHRvbik7XG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFZJU1VBTExZX0hJRERFTiwgIWFjdGl2ZSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIF9vdXRzaWRlXyBvZiB0aGUgZm9ybSB3L2lnbm9yZSgpOiBoaWRlIHRoZVxuICAgIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgZSA9PiB7XG4gICAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9KTtcblxuICAgIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gICAgLy8gSUUxMSBhbmQgRWRnZSB3aWxsIGFjdHVhbGx5IGNhbGwgdGhlIGxpc3RlbmVyICppbW1lZGlhdGVseSogYmVjYXVzZVxuICAgIC8vIHRoZXkgYXJlIGN1cnJlbnRseSBoYW5kbGluZyB0aGlzIGV4YWN0IHR5cGUgb2YgZXZlbnQsIHNvIHdlJ2xsXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gICAgLy8gaWYgYW55LCBiZWZvcmUgd2UgYXR0YWNoIHRoZSBsaXN0ZW5lci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2ggPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dTZWFyY2gsXG4gIH0sXG59LCB7XG4gIGluaXQ6ICh0YXJnZXQpID0+IHtcbiAgICBmb3JFYWNoKHNlbGVjdChCVVRUT04sIHRhcmdldCksIGJ1dHRvbiA9PiB7XG4gICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgfSk7XG4gIH0sXG4gIHRlYXJkb3duOiAodGFyZ2V0KSA9PiB7XG4gICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gc2VhcmNoLm9uKGVsKSxcbiAgc2VhcmNoXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgb25jZSA9IHJlcXVpcmUoJ3JlY2VwdG9yL29uY2UnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfXNraXBuYXZbaHJlZl49XCIjXCJdYDtcblxuY29uc3Qgc2V0VGFiaW5kZXggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gTkI6IHdlIGtub3cgYmVjYXVzZSBvZiB0aGUgc2VsZWN0b3Igd2UncmUgZGVsZWdhdGluZyB0byBiZWxvdyB0aGF0IHRoZVxuICAvLyBocmVmIGFscmVhZHkgYmVnaW5zIHdpdGggJyMnXG4gIGNvbnN0IGlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uY2UoZXZlbnQgPT4ge1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgfSkpO1xuICB9IGVsc2Uge1xuICAgIC8vIHRocm93IGFuIGVycm9yP1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBMSU5LIF06IHNldFRhYmluZGV4LFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3ZhbGlkYXRlLWlucHV0Jyk7XG5jb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xuXG5jb25zdCBjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcmV0dXJuIHZhbGlkYXRlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gICdrZXl1cCBjaGFuZ2UnOiB7XG4gICAgJ2lucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XSc6IGNoYW5nZSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG4vKmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiB2YWxpZGF0b3Iub24oZWwpLFxuICB2YWxpZGF0b3Jcbik7Ki9cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwcmVmaXg6ICcnLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRvbXJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgZGF0ZXBpY2tlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9kYXRlcGlja2VyJyk7XG5jb25zdCBtb2RhbCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tb2RhbCcpO1xuXG4vKipcbiAqIFRoZSAncG9seWZpbGxzJyBkZWZpbmUga2V5IEVDTUFTY3JpcHQgNSBtZXRob2RzIHRoYXQgbWF5IGJlIG1pc3NpbmcgZnJvbVxuICogb2xkZXIgYnJvd3NlcnMsIHNvIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICovXG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCBka3dkcyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbmNvbnN0IGpzU2VsZWN0b3JEYXRlcGlja2VyID0gJy5qcy1jYWxlbmRhci1ncm91cCc7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcbmRrd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5kb21yZWFkeSgoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIGZvciAobGV0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1sgbmFtZSBdO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH1cblxuICAvL0luaXQgZGF0ZXBpY2tlci4gIChOb3RlOiBhYm92ZSAnYmVoYXZpb3Iub24nIGRvZXMgbm90IHdvcmsgd2l0aCBwaWthZGF5IC0+IHNlcGVyYXRlIGluaXRpYWxpemF0aW9uKVxuICBmb3JFYWNoKHNlbGVjdChqc1NlbGVjdG9yRGF0ZXBpY2tlciksIGNhbGVuZGFyR3JvdXBFbGVtZW50ID0+IHtcbiAgICBuZXcgZGF0ZXBpY2tlcihjYWxlbmRhckdyb3VwRWxlbWVudCk7XG4gIH0pO1xuICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRrd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogJ2NsaWNrJyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBlbHByb3RvID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IEhJRERFTiA9ICdoaWRkZW4nO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVscHJvdG8sIEhJRERFTiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEhJRERFTik7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoJ2NsYXNzbGlzdC1wb2x5ZmlsbCcpO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oaWRkZW5cbnJlcXVpcmUoJy4vZWxlbWVudC1oaWRkZW4nKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBCZWhhdmlvciA9IHJlcXVpcmUoJ3JlY2VwdG9yL2JlaGF2aW9yJyk7XG5cbmNvbnN0IHNlcXVlbmNlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzZXEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuICAgIGZvckVhY2goc2VxLCBtZXRob2QgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzWyBtZXRob2QgXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzWyBtZXRob2QgXS5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG4vKipcbiAqIEBuYW1lIGJlaGF2aW9yXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnRzXG4gKiBAcGFyYW0ge29iamVjdD99IHByb3BzXG4gKiBAcmV0dXJuIHtyZWNlcHRvci5iZWhhdmlvcn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZXZlbnRzLCBwcm9wcykgPT4ge1xuICByZXR1cm4gQmVoYXZpb3IoZXZlbnRzLCBhc3NpZ24oe1xuICAgIG9uOiAgIHNlcXVlbmNlKCdpbml0JywgJ2FkZCcpLFxuICAgIG9mZjogIHNlcXVlbmNlKCd0ZWFyZG93bicsICdyZW1vdmUnKSxcbiAgfSwgcHJvcHMpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5hbWUgY2xvc2VzdFxuICogQGRlc2MgZ2V0IG5lYXJlc3QgcGFyZW50IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBIVE1MIGVsZW1lbnQgd2hlcmUgdGhlIHNlYXJjaCBzdGFydHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBTZWxlY3RvciB0byBiZSBmb3VuZC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIE5lYXJlc3QgcGFyZW50IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2xvc2VzdCAoZWwsIHNlbGVjdG9yKSB7XG4gIHZhciBtYXRjaGVzU2VsZWN0b3IgPSBlbC5tYXRjaGVzIHx8IGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWwubXNNYXRjaGVzU2VsZWN0b3I7XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yLmNhbGwoZWwsIHNlbGVjdG9yKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBlbDtcbn07XG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1NzQzM1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydCAoZWwsIHdpbj13aW5kb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NFbD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4gKFxuICAgIHJlY3QudG9wID49IDAgJiZcbiAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgIHJlY3QuYm90dG9tIDw9ICh3aW4uaW5uZXJIZWlnaHQgfHwgZG9jRWwuY2xpZW50SGVpZ2h0KSAmJlxuICAgIHJlY3QucmlnaHQgPD0gKHdpbi5pbm5lcldpZHRoIHx8IGRvY0VsLmNsaWVudFdpZHRoKVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRWxlbWVudEluVmlld3BvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5hbWUgaXNFbGVtZW50XG4gKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VsZW1lbnQgPSB2YWx1ZSA9PiB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xufTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3QgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoIWNvbnRleHQgfHwgIWlzRWxlbWVudChjb250ZXh0KSkge1xuICAgIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICBjb25zdCBzZWxlY3Rpb24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZWN0aW9uKTtcbn07XG4iLCIvKipcbiAqIEZsaXBzIGdpdmVuIElOUFVUIGVsZW1lbnRzIGJldHdlZW4gbWFza2VkIChoaWRpbmcgdGhlIGZpZWxkIHZhbHVlKSBhbmQgdW5tYXNrZWRcbiAqIEBwYXJhbSB7QXJyYXkuSFRNTEVsZW1lbnR9IGZpZWxkcyAtIEFuIGFycmF5IG9mIElOUFVUIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgLSBXaGV0aGVyIHRoZSBtYXNrIHNob3VsZCBiZSBhcHBsaWVkLCBoaWRpbmcgdGhlIGZpZWxkIHZhbHVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZpZWxkLCBtYXNrKSA9PiB7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsIG1hc2sgPyAncGFzc3dvcmQnIDogJ3RleHQnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgcmVzb2x2ZUlkUmVmcyA9IHJlcXVpcmUoJ3Jlc29sdmUtaWQtcmVmcycpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi9zZWxlY3QnKTtcbmNvbnN0IHRvZ2dsZUZpZWxkTWFzayA9IHJlcXVpcmUoJy4vdG9nZ2xlLWZpZWxkLW1hc2snKTtcblxuY29uc3QgQ09OVFJPTFMgPSAnYXJpYS1jb250cm9scyc7XG5jb25zdCBQUkVTU0VEID0gJ2FyaWEtcHJlc3NlZCc7XG5jb25zdCBTSE9XX0FUVFIgPSAnZGF0YS1zaG93LXRleHQnO1xuY29uc3QgSElERV9BVFRSID0gJ2RhdGEtaGlkZS10ZXh0JztcblxuLyoqXG4gKiBSZXBsYWNlIHRoZSB3b3JkIFwiU2hvd1wiIChvciBcInNob3dcIikgd2l0aCBcIkhpZGVcIiAob3IgXCJoaWRlXCIpIGluIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dUZXh0XG4gKiBAcmV0dXJuIHtzdHJvbmd9IGhpZGVUZXh0XG4gKi9cbmNvbnN0IGdldEhpZGVUZXh0ID0gc2hvd1RleHQgPT4ge1xuICByZXR1cm4gc2hvd1RleHQucmVwbGFjZSgvXFxiU2hvd1xcYi9pLCBzaG93ID0+IHtcbiAgICByZXR1cm4gKCdTJyA9PT0gc2hvd1sgMCBdID8gJ0gnIDogJ2gnKSArICdpZGUnO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGVsID0+IHtcbiAgLy8gdGhpcyBpcyB0aGUgKnRhcmdldCogc3RhdGU6XG4gIC8vICogaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBhdHRyIGFuZCBpdCdzICE9PSBcInRydWVcIiwgcHJlc3NlZCBpcyB0cnVlXG4gIC8vICogb3RoZXJ3aXNlLCBwcmVzc2VkIGlzIGZhbHNlXG4gIGNvbnN0IHByZXNzZWQgPSBlbC5oYXNBdHRyaWJ1dGUoUFJFU1NFRClcbiAgICAmJiBlbC5nZXRBdHRyaWJ1dGUoUFJFU1NFRCkgIT09ICd0cnVlJztcblxuICBjb25zdCBmaWVsZHMgPSByZXNvbHZlSWRSZWZzKGVsLmdldEF0dHJpYnV0ZShDT05UUk9MUykpO1xuICBmb3JFYWNoKGZpZWxkcywgZmllbGQgPT4gdG9nZ2xlRmllbGRNYXNrKGZpZWxkLCBwcmVzc2VkKSk7XG5cbiAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoU0hPV19BVFRSKSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShTSE9XX0FUVFIsIGVsLnRleHRDb250ZW50KTtcbiAgfVxuXG4gIGNvbnN0IHNob3dUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKFNIT1dfQVRUUik7XG4gIGNvbnN0IGhpZGVUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKEhJREVfQVRUUikgfHwgZ2V0SGlkZVRleHQoc2hvd1RleHQpO1xuXG4gIGVsLnRleHRDb250ZW50ID0gcHJlc3NlZCA/IHNob3dUZXh0IDogaGlkZVRleHQ7XG4gIGVsLnNldEF0dHJpYnV0ZShQUkVTU0VELCBwcmVzc2VkKTtcbiAgcmV0dXJuIHByZXNzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBDT05UUk9MUyA9ICdhcmlhLWNvbnRyb2xzJztcbmNvbnN0IEhJRERFTiA9ICdhcmlhLWhpZGRlbic7XG5cbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcblxuICBpZiAodHlwZW9mIGV4cGFuZGVkICE9PSAnYm9vbGVhbicpIHtcbiAgICBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAnZmFsc2UnO1xuICB9XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoRVhQQU5ERUQsIGV4cGFuZGVkKTtcblxuICBjb25zdCBpZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpO1xuICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFjb250cm9scykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdObyB0b2dnbGUgdGFyZ2V0IGZvdW5kIHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJ1xuICAgICk7XG4gIH1cblxuICBjb250cm9scy5zZXRBdHRyaWJ1dGUoSElEREVOLCAhZXhwYW5kZWQpO1xuICByZXR1cm4gZXhwYW5kZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZGF0YXNldCA9IHJlcXVpcmUoJ2VsZW0tZGF0YXNldCcpO1xuXG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5jb25zdCBDSEVDS0VEID0gJ2FyaWEtY2hlY2tlZCc7XG5jb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7UFJFRklYfWNoZWNrbGlzdC1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZSAoZWwpIHtcbiAgY29uc3QgZGF0YSA9IGRhdGFzZXQoZWwpO1xuICBjb25zdCBpZCA9IGRhdGEudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9IGlkLmNoYXJBdCgwKSA9PT0gJyMnXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gIGlmICghY2hlY2tMaXN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgXG4gICAgKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ3ZhbGlkYXRlJykpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKCd2YWxpZGF0ZScubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGF0dGVybiA9IG5ldyBSZWdFeHAoZGF0YVsga2V5IF0pO1xuICAgICAgY29uc3QgdmFsaWRhdG9yU2VsZWN0b3IgPSBgW2RhdGEtdmFsaWRhdG9yPVwiJHt2YWxpZGF0b3JOYW1lfVwiXWA7XG4gICAgICBjb25zdCB2YWxpZGF0b3JDaGVja2JveCA9IGNoZWNrTGlzdC5xdWVyeVNlbGVjdG9yKHZhbGlkYXRvclNlbGVjdG9yKTtcbiAgICAgIGlmICghdmFsaWRhdG9yQ2hlY2tib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBObyB2YWxpZGF0b3IgY2hlY2tib3ggZm91bmQgZm9yOiBcIiR7dmFsaWRhdG9yTmFtZX1cImBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKENIRUNLRUQsIGNoZWNrZWQpO1xuICAgIH1cbiAgfVxufTsiLCIvKiFcbiAqIFBpa2FkYXlcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNCBEYXZpZCBCdXNoZWxsIHwgQlNEICYgTUlUIGxpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZGJ1c2hlbGwvUGlrYWRheVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSlcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbW9tZW50O1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlMgbW9kdWxlXG4gICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtb21lbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uIChyZXEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgICAgIHZhciBpZCA9ICdtb21lbnQnO1xuICAgICAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxKGlkKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KG1vbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuUGlrYWRheSA9IGZhY3Rvcnkocm9vdC5tb21lbnQpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKG1vbWVudClcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBmZWF0dXJlIGRldGVjdGlvbiBhbmQgaGVscGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHZhciBoYXNNb21lbnQgPSB0eXBlb2YgbW9tZW50ID09PSAnZnVuY3Rpb24nLFxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcnMgPSAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG5cbiAgICBzdG8gPSB3aW5kb3cuc2V0VGltZW91dCxcblxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJpbSA9IGZ1bmN0aW9uKHN0cilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywnJyk7XG4gICAgfSxcblxuICAgIGhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY24gKyAnICcpICE9PSAtMTtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbikpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IChlbC5jbGFzc05hbWUgPT09ICcnKSA/IGNuIDogZWwuY2xhc3NOYW1lICsgJyAnICsgY247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0cmltKCgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLnJlcGxhY2UoJyAnICsgY24gKyAnICcsICcgJykpO1xuICAgIH0sXG5cbiAgICBpc0FycmF5ID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvQXJyYXkvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKTtcbiAgICB9LFxuXG4gICAgaXNEYXRlID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvRGF0ZS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpICYmICFpc05hTihvYmouZ2V0VGltZSgpKTtcbiAgICB9LFxuXG4gICAgaXNXZWVrZW5kID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNjtcbiAgICB9LFxuXG4gICAgaXNMZWFwWWVhciA9IGZ1bmN0aW9uKHllYXIpXG4gICAge1xuICAgICAgICAvLyBzb2x1dGlvbiBieSBNYXR0aSBWaXJra3VuZW46IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4ODE5NTFcbiAgICAgICAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9LFxuXG4gICAgZ2V0RGF5c0luTW9udGggPSBmdW5jdGlvbih5ZWFyLCBtb250aClcbiAgICB7XG4gICAgICAgIHJldHVybiBbMzEsIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV1bbW9udGhdO1xuICAgIH0sXG5cbiAgICBzZXRUb1N0YXJ0T2ZEYXkgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkgZGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICB9LFxuXG4gICAgY29tcGFyZURhdGVzID0gZnVuY3Rpb24oYSxiKVxuICAgIHtcbiAgICAgICAgLy8gd2VhayBkYXRlIGNvbXBhcmlzb24gKHVzZSBzZXRUb1N0YXJ0T2ZEYXkoZGF0ZSkgdG8gZW5zdXJlIGNvcnJlY3QgcmVzdWx0KVxuICAgICAgICByZXR1cm4gYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpO1xuICAgIH0sXG5cbiAgICBleHRlbmQgPSBmdW5jdGlvbih0bywgZnJvbSwgb3ZlcndyaXRlKVxuICAgIHtcbiAgICAgICAgdmFyIHByb3AsIGhhc1Byb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBmcm9tKSB7XG4gICAgICAgICAgICBoYXNQcm9wID0gdG9bcHJvcF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wICYmIHR5cGVvZiBmcm9tW3Byb3BdID09PSAnb2JqZWN0JyAmJiBmcm9tW3Byb3BdICE9PSBudWxsICYmIGZyb21bcHJvcF0ubm9kZU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RhdGUoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBuZXcgRGF0ZShmcm9tW3Byb3BdLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGV4dGVuZCh7fSwgZnJvbVtwcm9wXSwgb3ZlcndyaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZSB8fCAhaGFzUHJvcCkge1xuICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG87XG4gICAgfSxcblxuICAgIGZpcmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBldmVudE5hbWUsIGRhdGEpXG4gICAge1xuICAgICAgICB2YXIgZXY7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgICBldi5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZmlyZUV2ZW50KCdvbicgKyBldmVudE5hbWUsIGV2KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGp1c3RDYWxlbmRhciA9IGZ1bmN0aW9uKGNhbGVuZGFyKSB7XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA8IDApIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgLT0gTWF0aC5jZWlsKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCArPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPiAxMSkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciArPSBNYXRoLmZsb29yKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCAtPSAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsZW5kYXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlZmF1bHRzIGFuZCBsb2NhbGlzYXRpb25cbiAgICAgKi9cbiAgICBkZWZhdWx0cyA9IHtcblxuICAgICAgICAvLyBiaW5kIHRoZSBwaWNrZXIgdG8gYSBmb3JtIGZpZWxkXG4gICAgICAgIGZpZWxkOiBudWxsLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgc2hvdy9oaWRlIHRoZSBwaWNrZXIgb24gYGZpZWxkYCBmb2N1cyAoZGVmYXVsdCBgdHJ1ZWAgaWYgYGZpZWxkYCBpcyBzZXQpXG4gICAgICAgIGJvdW5kOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2YgdGhlIGRhdGVwaWNrZXIsIHJlbGF0aXZlIHRvIHRoZSBmaWVsZCAoZGVmYXVsdCB0byBib3R0b20gJiBsZWZ0KVxuICAgICAgICAvLyAoJ2JvdHRvbScgJiAnbGVmdCcga2V5d29yZHMgYXJlIG5vdCB1c2VkLCAndG9wJyAmICdyaWdodCcgYXJlIG1vZGlmaWVyIG9uIHRoZSBib3R0b20vbGVmdCBwb3NpdGlvbilcbiAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBmaXQgaW4gdGhlIHZpZXdwb3J0IGV2ZW4gaWYgaXQgbWVhbnMgcmVwb3NpdGlvbmluZyBmcm9tIHRoZSBwb3NpdGlvbiBvcHRpb25cbiAgICAgICAgcmVwb3NpdGlvbjogdHJ1ZSxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBvdXRwdXQgZm9ybWF0IGZvciBgLnRvU3RyaW5nKClgIGFuZCBgZmllbGRgIHZhbHVlXG4gICAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQnLFxuXG4gICAgICAgIC8vIHRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aGljaCBnZXRzIHBhc3NlZCBhIGN1cnJlbnQgZGF0ZSBvYmplY3QgYW5kIGZvcm1hdFxuICAgICAgICAvLyBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICAgICAgICB0b1N0cmluZzogbnVsbCxcblxuICAgICAgICAvLyB1c2VkIHRvIGNyZWF0ZSBkYXRlIG9iamVjdCBmcm9tIGN1cnJlbnQgaW5wdXQgc3RyaW5nXG4gICAgICAgIHBhcnNlOiBudWxsLFxuXG4gICAgICAgIC8vIHRoZSBpbml0aWFsIGRhdGUgdG8gdmlldyB3aGVuIGZpcnN0IG9wZW5lZFxuICAgICAgICBkZWZhdWx0RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBtYWtlIHRoZSBgZGVmYXVsdERhdGVgIHRoZSBpbml0aWFsIHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIHNldERlZmF1bHREYXRlOiBmYWxzZSxcblxuICAgICAgICAvLyBmaXJzdCBkYXkgb2Ygd2VlayAoMDogU3VuZGF5LCAxOiBNb25kYXkgZXRjKVxuICAgICAgICBmaXJzdERheTogMCxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBmbGFnIGZvciBtb21lbnQncyBzdHJpY3QgZGF0ZSBwYXJzaW5nXG4gICAgICAgIGZvcm1hdFN0cmljdDogZmFsc2UsXG5cbiAgICAgICAgLy8gdGhlIG1pbmltdW0vZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtaW5EYXRlOiBudWxsLFxuICAgICAgICAvLyB0aGUgbWF4aW11bS9sYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtYXhEYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG51bWJlciBvZiB5ZWFycyBlaXRoZXIgc2lkZSwgb3IgYXJyYXkgb2YgdXBwZXIvbG93ZXIgcmFuZ2VcbiAgICAgICAgeWVhclJhbmdlOiAxMCxcblxuICAgICAgICAvLyBzaG93IHdlZWsgbnVtYmVycyBhdCBoZWFkIG9mIHJvd1xuICAgICAgICBzaG93V2Vla051bWJlcjogZmFsc2UsXG5cbiAgICAgICAgLy8gV2VlayBwaWNrZXIgbW9kZVxuICAgICAgICBwaWNrV2hvbGVXZWVrOiBmYWxzZSxcblxuICAgICAgICAvLyB1c2VkIGludGVybmFsbHkgKGRvbid0IGNvbmZpZyBvdXRzaWRlKVxuICAgICAgICBtaW5ZZWFyOiAwLFxuICAgICAgICBtYXhZZWFyOiA5OTk5LFxuICAgICAgICBtaW5Nb250aDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhNb250aDogdW5kZWZpbmVkLFxuXG4gICAgICAgIHN0YXJ0UmFuZ2U6IG51bGwsXG4gICAgICAgIGVuZFJhbmdlOiBudWxsLFxuXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcblxuICAgICAgICAvLyBBZGRpdGlvbmFsIHRleHQgdG8gYXBwZW5kIHRvIHRoZSB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICB5ZWFyU3VmZml4OiAnJyxcblxuICAgICAgICAvLyBSZW5kZXIgdGhlIG1vbnRoIGFmdGVyIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG5cbiAgICAgICAgLy8gUmVuZGVyIGRheXMgb2YgdGhlIGNhbGVuZGFyIGdyaWQgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIEFsbG93cyB1c2VyIHRvIHNlbGVjdCBkYXlzIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBlbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIGhvdyBtYW55IG1vbnRocyBhcmUgdmlzaWJsZVxuICAgICAgICBudW1iZXJPZk1vbnRoczogMSxcblxuICAgICAgICAvLyB3aGVuIG51bWJlck9mTW9udGhzIGlzIHVzZWQsIHRoaXMgd2lsbCBoZWxwIHlvdSB0byBjaG9vc2Ugd2hlcmUgdGhlIG1haW4gY2FsZW5kYXIgd2lsbCBiZSAoZGVmYXVsdCBgbGVmdGAsIGNhbiBiZSBzZXQgdG8gYHJpZ2h0YClcbiAgICAgICAgLy8gb25seSB1c2VkIGZvciB0aGUgZmlyc3QgZGlzcGxheSBvciB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBpcyBub3QgdmlzaWJsZVxuICAgICAgICBtYWluQ2FsZW5kYXI6ICdsZWZ0JyxcblxuICAgICAgICAvLyBTcGVjaWZ5IGEgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBjYWxlbmRhciBpblxuICAgICAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBCbHVyIGZpZWxkIHdoZW4gZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICBibHVyRmllbGRPblNlbGVjdCA6IHRydWUsXG5cbiAgICAgICAgLy8gaW50ZXJuYXRpb25hbGl6YXRpb25cbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgcHJldmlvdXNNb250aCA6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICAgICAgICBuZXh0TW9udGggICAgIDogJ05leHQgTW9udGgnLFxuICAgICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoZW1lIENsYXNzbmFtZVxuICAgICAgICB0aGVtZTogbnVsbCxcblxuICAgICAgICAvLyBldmVudHMgYXJyYXlcbiAgICAgICAgZXZlbnRzOiBbXSxcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBvblNlbGVjdDogbnVsbCxcbiAgICAgICAgb25PcGVuOiBudWxsLFxuICAgICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgICBvbkRyYXc6IG51bGwsXG5cbiAgICAgICAgLy8gRW5hYmxlIGtleWJvYXJkIGlucHV0XG4gICAgICAgIGtleWJvYXJkSW5wdXQ6IHRydWVcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0aW5nIGZ1bmN0aW9ucyB0byBhYnN0cmFjdCBIVE1MIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHJlbmRlckRheU5hbWUgPSBmdW5jdGlvbihvcHRzLCBkYXksIGFiYnIpXG4gICAge1xuICAgICAgICBkYXkgKz0gb3B0cy5maXJzdERheTtcbiAgICAgICAgd2hpbGUgKGRheSA+PSA3KSB7XG4gICAgICAgICAgICBkYXkgLT0gNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJiciA/IG9wdHMuaTE4bi53ZWVrZGF5c1Nob3J0W2RheV0gOiBvcHRzLmkxOG4ud2Vla2RheXNbZGF5XTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRGF5ID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdmFyIGFyaWFTZWxlY3RlZCA9ICdmYWxzZSc7XG4gICAgICAgIGlmIChvcHRzLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtb3V0c2lkZS1jdXJyZW50LW1vbnRoJyk7XG5cbiAgICAgICAgICAgICAgICBpZighb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cImlzLWVtcHR5XCI+PC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzVG9kYXkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy10b2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgYXJpYVNlbGVjdGVkID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmhhc0V2ZW50KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaGFzLWV2ZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNJblJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtaW5yYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU3RhcnRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXN0YXJ0cmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0VuZFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZW5kcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0ZCBkYXRhLWRheT1cIicgKyBvcHRzLmRheSArICdcIiBjbGFzcz1cIicgKyBhcnIuam9pbignICcpICsgJ1wiIGFyaWEtc2VsZWN0ZWQ9XCInICsgYXJpYVNlbGVjdGVkICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtYnV0dG9uIHBpa2EtZGF5XCIgdHlwZT1cImJ1dHRvblwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnZGF0YS1waWthLXllYXI9XCInICsgb3B0cy55ZWFyICsgJ1wiIGRhdGEtcGlrYS1tb250aD1cIicgKyBvcHRzLm1vbnRoICsgJ1wiIGRhdGEtcGlrYS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmRheSArXG4gICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlcldlZWsgPSBmdW5jdGlvbiAoZCwgbSwgeSkge1xuICAgICAgICAvLyBMaWZ0ZWQgZnJvbSBodHRwOi8vamF2YXNjcmlwdC5hYm91dC5jb20vbGlicmFyeS9ibHdlZWt5ZWFyLmh0bSwgbGlnaHRseSBtb2RpZmllZC5cbiAgICAgICAgdmFyIG9uZWphbiA9IG5ldyBEYXRlKHksIDAsIDEpLFxuICAgICAgICAgICAgd2Vla051bSA9IE1hdGguY2VpbCgoKChuZXcgRGF0ZSh5LCBtLCBkKSAtIG9uZWphbikgLyA4NjQwMDAwMCkgKyBvbmVqYW4uZ2V0RGF5KCkrMSkvNyk7XG4gICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwicGlrYS13ZWVrXCI+JyArIHdlZWtOdW0gKyAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJSb3cgPSBmdW5jdGlvbihkYXlzLCBpc1JUTCwgcGlja1dob2xlV2VlaywgaXNSb3dTZWxlY3RlZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRyIGNsYXNzPVwicGlrYS1yb3cnICsgKHBpY2tXaG9sZVdlZWsgPyAnIHBpY2std2hvbGUtd2VlaycgOiAnJykgKyAoaXNSb3dTZWxlY3RlZCA/ICcgaXMtc2VsZWN0ZWQnIDogJycpICsgJ1wiPicgKyAoaXNSVEwgPyBkYXlzLnJldmVyc2UoKSA6IGRheXMpLmpvaW4oJycpICsgJzwvdHI+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyQm9keSA9IGZ1bmN0aW9uKHJvd3MpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0Ym9keT4nICsgcm93cy5qb2luKCcnKSArICc8L3Rib2R5Pic7XG4gICAgfSxcblxuICAgIHJlbmRlckhlYWQgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGFyciA9IFtdO1xuICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aD48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGggc2NvcGU9XCJjb2xcIj48YWJiciB0aXRsZT1cIicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGkpICsgJ1wiPicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGksIHRydWUpICsgJzwvYWJicj48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRoZWFkPjx0cj4nICsgKG9wdHMuaXNSVEwgPyBhcnIucmV2ZXJzZSgpIDogYXJyKS5qb2luKCcnKSArICc8L3RyPjwvdGhlYWQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGl0bGUgPSBmdW5jdGlvbihpbnN0YW5jZSwgYywgeWVhciwgbW9udGgsIHJlZlllYXIsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHZhciBpLCBqLCBhcnIsXG4gICAgICAgICAgICBvcHRzID0gaW5zdGFuY2UuX28sXG4gICAgICAgICAgICBpc01pblllYXIgPSB5ZWFyID09PSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICBpc01heFllYXIgPSB5ZWFyID09PSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICBodG1sID0gJzxkaXYgaWQ9XCInICsgcmFuZElkICsgJ1wiIGNsYXNzPVwicGlrYS10aXRsZVwiIHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+JyxcbiAgICAgICAgICAgIG1vbnRoSHRtbCxcbiAgICAgICAgICAgIHllYXJIdG1sLFxuICAgICAgICAgICAgcHJldiA9IHRydWUsXG4gICAgICAgICAgICBuZXh0ID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGFyciA9IFtdLCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArICh5ZWFyID09PSByZWZZZWFyID8gaSAtIGMgOiAxMiArIGkgLSBjKSArICdcIicgK1xuICAgICAgICAgICAgICAgIChpID09PSBtb250aCA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICtcbiAgICAgICAgICAgICAgICAoKGlzTWluWWVhciAmJiBpIDwgb3B0cy5taW5Nb250aCkgfHwgKGlzTWF4WWVhciAmJiBpID4gb3B0cy5tYXhNb250aCkgPyAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJyA6ICcnKSArICc+JyArXG4gICAgICAgICAgICAgICAgb3B0cy5pMThuLm1vbnRoc1tpXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vbnRoSHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyBvcHRzLmkxOG4ubW9udGhzW21vbnRoXSArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QtbW9udGhcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgaSA9IG9wdHMueWVhclJhbmdlWzBdO1xuICAgICAgICAgICAgaiA9IG9wdHMueWVhclJhbmdlWzFdICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPSB5ZWFyIC0gb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICBqID0gMSArIHllYXIgKyBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYXJyID0gW107IGkgPCBqICYmIGkgPD0gb3B0cy5tYXhZZWFyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID49IG9wdHMubWluWWVhcikge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCInICsgKGkgPT09IHllYXIgPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArICc+JyArIChpKSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5ZWFySHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyB5ZWFyICsgb3B0cy55ZWFyU3VmZml4ICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC15ZWFyXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAob3B0cy5zaG93TW9udGhBZnRlclllYXIpIHtcbiAgICAgICAgICAgIGh0bWwgKz0geWVhckh0bWwgKyBtb250aEh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodG1sICs9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWluWWVhciAmJiAobW9udGggPT09IDAgfHwgb3B0cy5taW5Nb250aCA+PSBtb250aCkpIHtcbiAgICAgICAgICAgIHByZXYgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01heFllYXIgJiYgKG1vbnRoID09PSAxMSB8fCBvcHRzLm1heE1vbnRoIDw9IG1vbnRoKSkge1xuICAgICAgICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLXByZXYnICsgKHByZXYgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5wcmV2aW91c01vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09IChpbnN0YW5jZS5fby5udW1iZXJPZk1vbnRocyAtIDEpICkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtbmV4dCcgKyAobmV4dCA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLm5leHRNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgfSxcblxuICAgIHJlbmRlclRhYmxlID0gZnVuY3Rpb24ob3B0cywgZGF0YSwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJwaWthLXRhYmxlXCIgcm9sZT1cImdyaWRcIiBhcmlhLWxhYmVsbGVkYnk9XCInICsgcmFuZElkICsgJ1wiPicgKyByZW5kZXJIZWFkKG9wdHMpICsgcmVuZGVyQm9keShkYXRhKSArICc8L3RhYmxlPic7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUGlrYWRheSBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFBpa2FkYXkgPSBmdW5jdGlvbihvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgb3B0cyA9IHNlbGYuY29uZmlnKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlbGYuX29uTW91c2VEb3duID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1idXR0b24nKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZW1wdHknKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LnBhcmVudE5vZGUsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShuZXcgRGF0ZSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EteWVhcicpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtbW9udGgnKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLWRheScpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYmx1ckZpZWxkT25TZWxlY3QgJiYgb3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtcHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJldk1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV4dE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyB0b3VjaCBldmVudCBwcmV2ZW50IG1vdXNlIGV2ZW50cyBlbXVsYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC1tb250aCcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvTW9udGgodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LXllYXInKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b1llYXIodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbktleUNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgICAgICAgICAgaWYgKHNlbGYuaXNWaXNpYmxlKCkpIHtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChlLmtleUNvZGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkYXRlO1xuXG4gICAgICAgICAgICBpZiAoZS5maXJlZEJ5ID09PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMucGFyc2UpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gb3B0cy5wYXJzZShvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQsIG9wdHMuZm9ybWF0U3RyaWN0KTtcbiAgICAgICAgICAgICAgICBkYXRlID0gKGRhdGUgJiYgZGF0ZS5pc1ZhbGlkKCkpID8gZGF0ZS50b0RhdGUoKSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRGb2N1cyA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENsaWNrID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Qmx1ciA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSUUgYWxsb3dzIHBpa2EgZGl2IHRvIGdhaW4gZm9jdXM7IGNhdGNoIGJsdXIgdGhlIGlucHV0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcEVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2MpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9iID0gc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9jID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgcEVsID0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0V2ZW50TGlzdGVuZXJzICYmIGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5vbmNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KHRhcmdldCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykgfHwgcEVsID09PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLl92ICYmIHRhcmdldCAhPT0gb3B0cy50cmlnZ2VyICYmIHBFbCAhPT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZWxmLmVsLmNsYXNzTmFtZSA9ICdwaWthLXNpbmdsZScgKyAob3B0cy5pc1JUTCA/ICcgaXMtcnRsJyA6ICcnKSArIChvcHRzLnRoZW1lID8gJyAnICsgb3B0cy50aGVtZSA6ICcnKTtcblxuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnbW91c2Vkb3duJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAndG91Y2hlbmQnLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG5cbiAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgc2VsZi5fb25LZXlDaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIG9wdHMuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmVsLCBvcHRzLmZpZWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCBzZWxmLl9vbklucHV0Q2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKCFvcHRzLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBvcHRzLmZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5zZXREZWZhdWx0RGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmRGF0ZSA9IG9wdHMuZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKGlzRGF0ZShkZWZEYXRlKSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2V0RGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGVmRGF0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b0RhdGUoZGVmRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgKz0gJyBpcy1ib3VuZCc7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHNlbGYuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHNlbGYuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgc2VsZi5fb25JbnB1dEJsdXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBwdWJsaWMgUGlrYWRheSBBUElcbiAgICAgKi9cbiAgICBQaWthZGF5LnByb3RvdHlwZSA9IHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb25maWd1cmUgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgKi9cbiAgICAgICAgY29uZmlnOiBmdW5jdGlvbihvcHRpb25zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX28pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvcHRzID0gZXh0ZW5kKHRoaXMuX28sIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgICAgICAgICBvcHRzLmlzUlRMID0gISFvcHRzLmlzUlRMO1xuXG4gICAgICAgICAgICBvcHRzLmZpZWxkID0gKG9wdHMuZmllbGQgJiYgb3B0cy5maWVsZC5ub2RlTmFtZSkgPyBvcHRzLmZpZWxkIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy50aGVtZSA9ICh0eXBlb2Ygb3B0cy50aGVtZSkgPT09ICdzdHJpbmcnICYmIG9wdHMudGhlbWUgPyBvcHRzLnRoZW1lIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy5ib3VuZCA9ICEhKG9wdHMuYm91bmQgIT09IHVuZGVmaW5lZCA/IG9wdHMuZmllbGQgJiYgb3B0cy5ib3VuZCA6IG9wdHMuZmllbGQpO1xuXG4gICAgICAgICAgICBvcHRzLnRyaWdnZXIgPSAob3B0cy50cmlnZ2VyICYmIG9wdHMudHJpZ2dlci5ub2RlTmFtZSkgPyBvcHRzLnRyaWdnZXIgOiBvcHRzLmZpZWxkO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVXZWVrZW5kcyA9ICEhb3B0cy5kaXNhYmxlV2Vla2VuZHM7XG5cbiAgICAgICAgICAgIG9wdHMuZGlzYWJsZURheUZuID0gKHR5cGVvZiBvcHRzLmRpc2FibGVEYXlGbikgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRpc2FibGVEYXlGbiA6IG51bGw7XG5cbiAgICAgICAgICAgIHZhciBub20gPSBwYXJzZUludChvcHRzLm51bWJlck9mTW9udGhzLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIG9wdHMubnVtYmVyT2ZNb250aHMgPSBub20gPiA0ID8gNCA6IG5vbTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvcHRzLm1pbkRhdGUgJiYgb3B0cy5tYXhEYXRlKSAmJiBvcHRzLm1heERhdGUgPCBvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbkRhdGUob3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1heERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1heERhdGUob3B0cy5tYXhEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZhbGxiYWNrID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gMTA7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2VbMF0gPSBwYXJzZUludChvcHRzLnllYXJSYW5nZVswXSwgMTApIHx8IGZhbGxiYWNrO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzFdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMV0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2UgPSBNYXRoLmFicyhwYXJzZUludChvcHRzLnllYXJSYW5nZSwgMTApKSB8fCBkZWZhdWx0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMueWVhclJhbmdlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uICh1c2luZyBNb21lbnQuanMgaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuX28uZm9ybWF0O1xuICAgICAgICAgICAgaWYgKCFpc0RhdGUodGhpcy5fZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fby50b1N0cmluZykge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fby50b1N0cmluZyh0aGlzLl9kLCBmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuX2QpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2QudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIE1vbWVudC5qcyBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb21lbnQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGhhc01vbWVudCA/IG1vbWVudCh0aGlzLl9kKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gZnJvbSBhIE1vbWVudC5qcyBvYmplY3QgKGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHNldE1vbWVudDogZnVuY3Rpb24oZGF0ZSwgcHJldmVudE9uU2VsZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50ICYmIG1vbWVudC5pc01vbWVudChkYXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlLnRvRGF0ZSgpLCBwcmV2ZW50T25TZWxlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBEYXRlIG9iamVjdCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGdldERhdGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGlzRGF0ZSh0aGlzLl9kKSA/IG5ldyBEYXRlKHRoaXMuX2QuZ2V0VGltZSgpKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHNldERhdGU6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuX28ubWluRGF0ZSxcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLl9vLm1heERhdGU7XG5cbiAgICAgICAgICAgIGlmIChpc0RhdGUobWluKSAmJiBkYXRlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1pbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG1heCkgJiYgZGF0ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodGhpcy5fZCk7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKHRoaXMuX2QpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRPblNlbGVjdCAmJiB0eXBlb2YgdGhpcy5fby5vblNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLmdldERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b0RhdGU6IGZ1bmN0aW9uKGRhdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBuZXdDYWxlbmRhciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxlbmRhcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzWzBdLnllYXIsIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlID0gbmV3IERhdGUodGhpcy5jYWxlbmRhcnNbdGhpcy5jYWxlbmRhcnMubGVuZ3RoLTFdLnllYXIsIHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVEYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBlbmQgb2YgdGhlIG1vbnRoXG4gICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlLnNldE1vbnRoKGxhc3RWaXNpYmxlRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXREYXRlKGxhc3RWaXNpYmxlRGF0ZS5nZXREYXRlKCktMSk7XG4gICAgICAgICAgICAgICAgbmV3Q2FsZW5kYXIgPSAodmlzaWJsZURhdGUgPCBmaXJzdFZpc2libGVEYXRlLmdldFRpbWUoKSB8fCBsYXN0VmlzaWJsZURhdGUuZ2V0VGltZSgpIDwgdmlzaWJsZURhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3Q2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLm1haW5DYWxlbmRhciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCArPSAxIC0gdGhpcy5fby5udW1iZXJPZk1vbnRocztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0RGF0ZTogZnVuY3Rpb24oc2lnbiwgZGF5cykge1xuXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXREYXRlKCkgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gcGFyc2VJbnQoZGF5cykqMjQqNjAqNjAqMTAwMDtcblxuICAgICAgICAgICAgdmFyIG5ld0RheTtcblxuICAgICAgICAgICAgaWYgKHNpZ24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSArIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaWduID09PSAnc3VidHJhY3QnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSAtIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldERhdGUobmV3RGF5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0gPSBhZGp1c3RDYWxlbmRhcih0aGlzLmNhbGVuZGFyc1swXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMTsgYyA8IHRoaXMuX28ubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2NdID0gYWRqdXN0Q2FsZW5kYXIoe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKyBjLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiB0aGlzLmNhbGVuZGFyc1swXS55ZWFyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvVG9kYXk6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBtb250aCAoemVyby1pbmRleCwgZS5nLiAwOiBKYW51YXJ5KVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b01vbnRoOiBmdW5jdGlvbihtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTihtb250aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgrKztcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldk1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLS07XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGZ1bGwgeWVhciAoZS5nLiBcIjIwMTJcIilcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9ZZWFyOiBmdW5jdGlvbih5ZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHllYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1pbkRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1pbkRhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSBkZWZhdWx0cy5taW5EYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSBkZWZhdWx0cy5taW5ZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSBkZWZhdWx0cy5taW5Nb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSBkZWZhdWx0cy5zdGFydFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtYXhEYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNYXhEYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSBkZWZhdWx0cy5tYXhEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IGRlZmF1bHRzLm1heFllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IGRlZmF1bHRzLm1heE1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSBkZWZhdWx0cy5lbmRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U3RhcnRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEVuZFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZWZyZXNoIHRoZSBIVE1MXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3OiBmdW5jdGlvbihmb3JjZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92ICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBtaW5ZZWFyID0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgICAgIG1heFllYXIgPSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICAgICAgbWluTW9udGggPSBvcHRzLm1pbk1vbnRoLFxuICAgICAgICAgICAgICAgIG1heE1vbnRoID0gb3B0cy5tYXhNb250aCxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgcmFuZElkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5feSA8PSBtaW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1pblllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtaW5Nb250aCkgJiYgdGhpcy5fbSA8IG1pbk1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtaW5Nb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5feSA+PSBtYXhZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1heFllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtYXhNb250aCkgJiYgdGhpcy5fbSA+IG1heE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtYXhNb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJhbmRJZCA9ICdwaWthLXRpdGxlLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb3B0cy5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInBpa2EtbGVuZGFyXCI+JyArIHJlbmRlclRpdGxlKHRoaXMsIGMsIHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCB0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCByYW5kSWQpICsgdGhpcy5yZW5kZXIodGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHJhbmRJZCkgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGlmKG9wdHMuZmllbGQudHlwZSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy50cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uRHJhdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25EcmF3KHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgc2NyZWVuIHJlYWRlciB1c2VyIGtub3cgdG8gdXNlIGFycm93IGtleXNcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdVc2UgdGhlIGFycm93IGtleXMgdG8gcGljayBhIGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RQb3NpdGlvbjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmllbGQsIHBFbCwgd2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIHNjcm9sbFRvcCwgbGVmdCwgdG9wLCBjbGllbnRSZWN0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5jb250YWluZXIpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgICAgIGZpZWxkID0gdGhpcy5fby50cmlnZ2VyO1xuICAgICAgICAgICAgcEVsID0gZmllbGQ7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50UmVjdCA9IGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdG9wID0gY2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgID0gcEVsLm9mZnNldFRvcCArIHBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2hpbGUoKHBFbCA9IHBFbC5vZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgKz0gcEVsLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgcG9zaXRpb24gaXMgYm90dG9tICYgbGVmdFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgbGVmdCArIHdpZHRoID4gdmlld3BvcnRXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigncmlnaHQnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIHRvcCArIGhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICsgc2Nyb2xsVG9wKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCd0b3AnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW5kZXIgSFRNTCBmb3IgYSBwYXJ0aWN1bGFyIG1vbnRoXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCByYW5kSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzICAgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG5vdyAgICA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5cyAgID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFxuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXRhICAgPSBbXSxcbiAgICAgICAgICAgICAgICByb3cgICAgPSBbXTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheShub3cpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZmlyc3REYXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlIC09IG9wdHMuZmlyc3REYXk7XG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlICs9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSAxLFxuICAgICAgICAgICAgICAgIG5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIDEsXG4gICAgICAgICAgICAgICAgeWVhck9mUHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8geWVhciAtIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIHllYXJPZk5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IHllYXIgKyAxIDogeWVhcixcbiAgICAgICAgICAgICAgICBkYXlzSW5QcmV2aW91c01vbnRoID0gZ2V0RGF5c0luTW9udGgoeWVhck9mUHJldmlvdXNNb250aCwgcHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBkYXlzICsgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyID0gY2VsbHM7XG4gICAgICAgICAgICB3aGlsZShhZnRlciA+IDcpIHtcbiAgICAgICAgICAgICAgICBhZnRlciAtPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMgKz0gNyAtIGFmdGVyO1xuICAgICAgICAgICAgdmFyIGlzV2Vla1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgciA9IDA7IGkgPCBjZWxsczsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBkYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSArIChpIC0gYmVmb3JlKSksXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSBpc0RhdGUodGhpcy5fZCkgPyBjb21wYXJlRGF0ZXMoZGF5LCB0aGlzLl9kKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc1RvZGF5ID0gY29tcGFyZURhdGVzKGRheSwgbm93KSxcbiAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQgPSBvcHRzLmV2ZW50cy5pbmRleE9mKGRheS50b0RhdGVTdHJpbmcoKSkgIT09IC0xID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5ID0gaSA8IGJlZm9yZSB8fCBpID49IChkYXlzICsgYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gMSArIChpIC0gYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBtb250aCxcbiAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXIsXG4gICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5zdGFydFJhbmdlLCBkYXkpLFxuICAgICAgICAgICAgICAgICAgICBpc0VuZFJhbmdlID0gb3B0cy5lbmRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5lbmRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNJblJhbmdlID0gb3B0cy5zdGFydFJhbmdlICYmIG9wdHMuZW5kUmFuZ2UgJiYgb3B0cy5zdGFydFJhbmdlIDwgZGF5ICYmIGRheSA8IG9wdHMuZW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSAob3B0cy5taW5EYXRlICYmIGRheSA8IG9wdHMubWluRGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm1heERhdGUgJiYgZGF5ID4gb3B0cy5tYXhEYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZVdlZWtlbmRzICYmIGlzV2Vla2VuZChkYXkpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZURheUZuICYmIG9wdHMuZGlzYWJsZURheUZuKGRheSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheXNJblByZXZpb3VzTW9udGggKyBkYXlOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IHByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mUHJldmlvdXNNb250aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheU51bWJlciAtIGRheXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IG5leHRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyT2ZOZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF5Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogbW9udGhOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiB5ZWFyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQ6IGhhc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9kYXk6IGlzVG9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbXB0eTogaXNFbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZTogaXNTdGFydFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZTogaXNFbmRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZTogaXNJblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBvcHRzLmVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoc1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucGlja1dob2xlV2VlayAmJiBpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzV2Vla1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb3cucHVzaChyZW5kZXJEYXkoZGF5Q29uZmlnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKytyID09PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cudW5zaGlmdChyZW5kZXJXZWVrKGkgLSBiZWZvcmUsIG1vbnRoLCB5ZWFyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHJlbmRlclJvdyhyb3csIG9wdHMuaXNSVEwsIG9wdHMucGlja1dob2xlV2VlaywgaXNXZWVrU2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZW5kZXJUYWJsZShvcHRzLCBkYXRhLCByYW5kSWQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzVmlzaWJsZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdjtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsICdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uT3Blbi5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdjtcbiAgICAgICAgICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnOyAvLyByZXNldFxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRoaXMuX28ub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdBTUUgT1ZFUlxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX287XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICd0b3VjaGVuZCcsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICBpZiAob3B0cy5rZXlib2FyZElucHV0KSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fb25LZXlDaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgdGhpcy5fb25JbnB1dENoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCB0aGlzLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHRoaXMuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBQaWthZGF5O1xufSkpO1xuIl19
