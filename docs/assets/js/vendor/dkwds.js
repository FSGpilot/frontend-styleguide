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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/is-in-viewport":38,"../utils/toggle":42,"array-filter":1,"array-foreach":2,"object-assign":9}],18:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/toggle":42}],19:[function(require,module,exports){
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

},{"../../vendor/pikaday.js":44,"../utils/behavior":36,"../utils/closest":37,"../utils/select":39}],20:[function(require,module,exports){
'use strict';

var _click;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var select = require('../utils/select');
var closest = require('../utils/closest');
var forEach = require('array-foreach');

var jsDropdownTrigger = ".js-dropdown";
var jsDropdownTarget = "data-js-target";

var toggleDropdown = function toggleDropdown(triggerEl, forceClose) {
    if (triggerEl !== null && triggerEl !== undefined) {
        var targetAttr = triggerEl.getAttribute(jsDropdownTarget);
        if (targetAttr !== null && targetAttr !== undefined) {
            var targetEl = select(targetAttr, 'body');
            if (targetEl !== null && targetEl !== undefined && targetEl.length > 0) {
                //target found, check state
                targetEl = targetEl[0];
                //change state
                if (triggerEl.getAttribute("aria-expanded") == "true" || forceClose) {
                    //close
                    triggerEl.setAttribute("aria-expanded", "false");
                    targetEl.classList.add("collapsed");
                    targetEl.setAttribute("aria-hidden", "true");
                } else {
                    //open
                    triggerEl.setAttribute("aria-expanded", "true");
                    targetEl.classList.remove("collapsed");
                    targetEl.setAttribute("aria-hidden", "false");
                }
            }
        }
    }
};

var toggle = function toggle(event) {
    event.preventDefault();
    var dropdownElm = closest(event.target, jsDropdownTrigger);
    if (dropdownElm !== null && dropdownElm !== undefined) {
        //Close all existing open dropdowns
        forEach(select(jsDropdownTrigger, 'body'), function (dropdownInstance) {
            if (dropdownInstance !== dropdownElm) {
                toggleDropdown(dropdownInstance, true);
            }
        });
        //Open new dropdown
        toggleDropdown(dropdownElm);
    }
};

var outsideClose = function outsideClose(event) {
    //closes dropdown when clicked outside. 
    var dropdownElm = closest(event.target, jsDropdownTrigger);
    if (dropdownElm === null || dropdownElm === undefined) {
        //clicked outside trigger, force close all
        forEach(select(jsDropdownTrigger), function (dropdownInstance) {
            toggleDropdown(dropdownInstance, true);
        });
    }
};

module.exports = behavior(_defineProperty({}, 'click', (_click = {}, _defineProperty(_click, jsDropdownTrigger, toggle), _defineProperty(_click, 'body', outsideClose), _click)));

},{"../utils/behavior":36,"../utils/closest":37,"../utils/select":39,"array-foreach":2}],21:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/select":39,"./accordion":17,"array-foreach":2,"lodash.debounce":8}],22:[function(require,module,exports){
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
  regexmask: require('./regex-input-mask'),
  dropdown: require('./dropdown'),
  navsubmenu: require('./nav-submenu')
  //table:      require('./table'),

};

},{"./accordion":17,"./banner":18,"./dropdown":20,"./footer":21,"./nav-submenu":24,"./navigation":25,"./password":26,"./regex-input-mask":27,"./search":28,"./skipnav":29,"./validator":30}],23:[function(require,module,exports){
'use strict';

function Modal(modalEl, overlayEl) {
	this.modalEl = modalEl;
	this.overlayEl = overlayEl;
	this.focusedElBeforeOpen;

	var focusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

	this.close(); // Reset
}

Modal.prototype.open = function () {

	var Modal = this;

	this.modalEl.removeAttribute('aria-hidden');
	this.overlayEl.removeAttribute('aria-hidden');

	this.focusedElBeforeOpen = document.activeElement;

	this.modalEl.addEventListener('keydown', function (e) {
		Modal._handleKeyDown(e);
	});

	this.overlayEl.addEventListener('click', function () {
		Modal.close();
	});

	this.firstFocusableEl.focus();
};

Modal.prototype.close = function () {

	this.modalEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);

	if (this.focusedElBeforeOpen) {
		this.focusedElBeforeOpen.focus();
	}
};

Modal.prototype._handleKeyDown = function (e) {

	var Modal = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if (document.activeElement === Modal.firstFocusableEl) {
			e.preventDefault();
			Modal.lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if (document.activeElement === Modal.lastFocusableEl) {
			e.preventDefault();
			Modal.firstFocusableEl.focus();
		}
	}

	switch (e.keyCode) {
		case KEY_TAB:
			if (Modal.focusableEls.length === 1) {
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
			Modal.close();
			break;
		default:
			break;
	}
};

Modal.prototype.addEventListeners = function (openModalSel, closeModalSel) {

	var Modal = this;

	var openModalEls = document.querySelectorAll(openModalSel);
	for (var i = 0; i < openModalEls.length; i++) {
		openModalEls[i].addEventListener('click', function () {
			Modal.open();
		});
	}

	var closeModalEls = document.querySelectorAll(closeModalSel);
	for (var i = 0; i < closeModalEls.length; i++) {
		closeModalEls[i].addEventListener('click', function () {
			Modal.close();
		});
	}
};

var navModalEl = document.querySelector('.js-modal-passive');
var modalOverlay = document.querySelector('.js-modal-overlay-passive');
if (navModalEl !== null && modalOverlay !== null && navModalEl !== undefined && modalOverlay !== undefined) {
	var myModal = new Modal(navModalEl, modalOverlay);
	myModal.addEventListeners('.js-open-modal-passive', '.js-close-modal-passive');
}

var navModalEl11 = document.querySelector('.js-modal-interactive');
var modalOverlay11 = document.querySelector('.js-modal-overlay-interactive');
if (navModalEl11 !== null && modalOverlay11 !== null && navModalEl11 !== undefined && modalOverlay11 !== undefined) {
	var myModal = new Modal(navModalEl11, modalOverlay11);
	myModal.addEventListeners('.js-open-modal-interactive', '.js-close-modal-interactive');
}

},{}],24:[function(require,module,exports){
/**
 * Collapse/expand for navigation submenues.
 * Behaves like a dropdown on desktop (closes when clicked outside).
 * And behaves like an accordion (multiselect) on mobile.
 */

'use strict';

var _click;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var select = require('../utils/select');
var closest = require('../utils/closest');
var forEach = require('array-foreach');

var jsNavSubmenuTrigger = ".js-nav-submenu";
var jsNavSubmenuTarget = "data-js-target";

var navResponsiveBreakpoint = 992; //same as $nav-responsive-breakpoint from the scss.

var toggleNavSubmenu = function toggleNavSubmenu(triggerEl, forceClose) {
    if (triggerEl !== null && triggerEl !== undefined) {
        var targetAttr = triggerEl.getAttribute(jsNavSubmenuTarget);
        if (targetAttr !== null && targetAttr !== undefined) {
            var targetEl = select(targetAttr, 'body');
            if (targetEl !== null && targetEl !== undefined && targetEl.length > 0) {
                //target found, check state
                targetEl = targetEl[0];
                //change state
                if (triggerEl.getAttribute("aria-expanded") == "true" || forceClose) {
                    //close
                    triggerEl.setAttribute("aria-expanded", "false");
                    targetEl.classList.add("collapsed");
                    targetEl.setAttribute("aria-hidden", "true");
                } else {
                    //open
                    triggerEl.setAttribute("aria-expanded", "true");
                    targetEl.classList.remove("collapsed");
                    targetEl.setAttribute("aria-hidden", "false");
                }
            }
        }
    }
};

var toggle = function toggle(event) {
    event.preventDefault();
    var NavSubmenuElm = closest(event.target, jsNavSubmenuTrigger);
    if (NavSubmenuElm !== null && NavSubmenuElm !== undefined) {
        //Close all existing open NavSubmenus (on desktop).
        if (window.innerWidth > navResponsiveBreakpoint) {
            forEach(select(jsNavSubmenuTrigger, 'body'), function (NavSubmenuInstance) {
                if (NavSubmenuInstance !== NavSubmenuElm) {
                    toggleNavSubmenu(NavSubmenuInstance, true);
                }
            });
        }

        //Open new NavSubmenu
        toggleNavSubmenu(NavSubmenuElm);
    }
};

var outsideClose = function outsideClose(event) {
    //closes NavSubmenu when clicked outside (on desktop) 
    if (window.innerWidth > navResponsiveBreakpoint) {
        var NavSubmenuElm = closest(event.target, jsNavSubmenuTrigger);
        if (NavSubmenuElm === null || NavSubmenuElm === undefined) {
            //clicked outside trigger, force close all
            forEach(select(jsNavSubmenuTrigger), function (NavSubmenuInstance) {
                toggleNavSubmenu(NavSubmenuInstance, true);
            });
        }
    }
};

module.exports = behavior(_defineProperty({}, 'click', (_click = {}, _defineProperty(_click, jsNavSubmenuTrigger, toggle), _defineProperty(_click, 'body', outsideClose), _click)));

},{"../utils/behavior":36,"../utils/closest":37,"../utils/select":39,"array-foreach":2}],25:[function(require,module,exports){
'use strict';

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var select = require('../utils/select');
var accordion = require('./accordion');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var NAV = '.nav';
var NAV_LINKS = NAV + ' a';
var OPENERS = '.js-menu-open';
var CLOSE_BUTTON = '.js-menu-close';
var OVERLAY = '.overlay';
var CLOSERS = CLOSE_BUTTON + ', .overlay';
var TOGGLES = [NAV, OVERLAY].join(', ');

var ACTIVE_CLASS = 'mobile_nav-active';
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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/select":39,"./accordion":17,"array-foreach":2,"object-assign":9}],26:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/toggle-form-input":41}],27:[function(require,module,exports){

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

},{"../utils/behavior":36}],28:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":36,"../utils/select":39,"array-foreach":2,"object-assign":9,"receptor/ignore":14}],29:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":36,"receptor/once":15}],30:[function(require,module,exports){
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

},{"../utils/behavior":36,"../utils/validate-input":43,"lodash.debounce":8}],31:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: ''
};

},{}],32:[function(require,module,exports){
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

},{"./components":22,"./components/datepicker":19,"./components/modal":23,"./config":31,"./polyfills":35,"./utils/select":39,"array-foreach":2,"domready":5}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

},{"./element-hidden":34,"classlist-polyfill":4}],36:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":9,"receptor/behavior":10}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./select":39,"./toggle-field-mask":40,"array-foreach":2,"resolve-id-refs":16}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"../config":31,"elem-dataset":6}],44:[function(require,module,exports){
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

},{"moment":3}]},{},[32])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvZWxlbS1kYXRhc2V0L2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9iZWhhdmlvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9jb21wb3NlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlQWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2lnbm9yZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2RhdGVwaWNrZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9kcm9wZG93bi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2luZGV4LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXYtc3VibWVudS5qcyIsInNyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9wYXNzd29yZC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JlZ2V4LWlucHV0LW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvanMvY29tcG9uZW50cy9za2lwbmF2LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmFsaWRhdG9yLmpzIiwic3JjL2pzL2NvbmZpZy5qcyIsInNyYy9qcy9ka3dkcy5qcyIsInNyYy9qcy9ldmVudHMuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9jbG9zZXN0LmpzIiwic3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUuanMiLCJzcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiLCJzcmMvdmVuZG9yL3Bpa2FkYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7Ozs7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsSUFBbkIsRUFBeUI7QUFDeEMsTUFBSSxJQUFJLE1BQVIsRUFBZ0IsT0FBTyxJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsSUFBZixDQUFQO0FBQ2hCLE1BQUksS0FBSyxDQUFMLEtBQVcsR0FBWCxJQUFrQixTQUFTLEdBQS9CLEVBQW9DLE1BQU0sSUFBSSxTQUFKLEVBQU47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O0FBQ0QsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osNEJBQVksS0FBSyxLQUFqQixFQUF3QixRQUF4QixFQUFrQyxLQUFLLGNBQXZDO0FBQ0Esb0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixNQUExQixFQUFrQyxLQUFLLFlBQXZDO0FBQ0g7QUFDSjtBQUNELGdCQUFJLEtBQUssRUFBTCxDQUFRLFVBQVosRUFBd0I7QUFDcEIscUJBQUssRUFBTCxDQUFRLFVBQVIsQ0FBbUIsV0FBbkIsQ0FBK0IsS0FBSyxFQUFwQztBQUNIO0FBQ0o7O0FBcGpCZSxLQUFwQjs7QUF3akJBLFdBQU8sT0FBUDtBQUNILENBdHRDQSxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4vKipcbiAqIEFycmF5I2ZpbHRlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdD19IHNlbGZcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93IFR5cGVFcnJvclxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgZm4sIHNlbGYpIHtcbiAgaWYgKGFyci5maWx0ZXIpIHJldHVybiBhcnIuZmlsdGVyKGZuLCBzZWxmKTtcbiAgaWYgKHZvaWQgMCA9PT0gYXJyIHx8IG51bGwgPT09IGFycikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChhcnIsIGkpKSBjb250aW51ZTtcbiAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgIGlmIChmbi5jYWxsKHNlbGYsIHZhbCwgaSwgYXJyKSkgcmV0LnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4iLCIvKipcbiAqIGFycmF5LWZvcmVhY2hcbiAqICAgQXJyYXkjZm9yRWFjaCBwb255ZmlsbCBmb3Igb2xkZXIgYnJvd3NlcnNcbiAqICAgKFBvbnlmaWxsOiBBIHBvbHlmaWxsIHRoYXQgZG9lc24ndCBvdmVyd3JpdGUgdGhlIG5hdGl2ZSBtZXRob2QpXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LTIwMTYgVGFrdXRvIFdhZGFcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL3R3YWRhL2FycmF5LWZvcmVhY2gvYmxvYi9tYXN0ZXIvTUlULUxJQ0VOU0VcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvckVhY2ggKGFyeSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAoYXJ5LmZvckVhY2gpIHtcbiAgICAgICAgYXJ5LmZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGFyeVtpXSwgaSwgYXJ5KTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSmZaVzF3ZEhrdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTcwNDI3XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogRGVkaWNhdGVkIHRvIHRoZSBwdWJsaWMgZG9tYWluLlxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuLy8gSW5jbHVkaW5nIElFIDwgRWRnZSBtaXNzaW5nIFNWR0VsZW1lbnQuY2xhc3NMaXN0XG5pZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKSBcblx0fHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxudmFyXG5cdCAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcblx0LCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG5cdCwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cblx0LCBvYmpDdHIgPSBPYmplY3Rcblx0LCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdH1cblx0LCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIGkgPSAwXG5cdFx0XHQsIGxlbiA9IHRoaXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cdC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuXHQsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcblx0XHR0aGlzLm5hbWUgPSB0eXBlO1xuXHRcdHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9XG5cdCwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcblx0XHRpZiAodG9rZW4gPT09IFwiXCIpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIlNZTlRBWF9FUlJcIlxuXHRcdFx0XHQsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcblx0XHRcdFx0LCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuXHR9XG5cdCwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKVxuXHRcdFx0LCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cblx0XHRcdCwgaSA9IDBcblx0XHRcdCwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuXHRcdH1cblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMudG9TdHJpbmcoKSk7XG5cdFx0fTtcblx0fVxuXHQsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuXHQsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcblx0fVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuXHRyZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cdHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuXHRcdFx0dGhpcy5wdXNoKHRva2VuKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHRcdCwgaW5kZXhcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR3aGlsZSAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHR0aGlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cblx0dmFyXG5cdFx0ICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuXHRcdCwgbWV0aG9kID0gcmVzdWx0ID9cblx0XHRcdGZvcmNlICE9PSB0cnVlICYmIFwicmVtb3ZlXCJcblx0XHQ6XG5cdFx0XHRmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuXHQ7XG5cblx0aWYgKG1ldGhvZCkge1xuXHRcdHRoaXNbbWV0aG9kXSh0b2tlbik7XG5cdH1cblxuXHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGZvcmNlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAhcmVzdWx0O1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuXHR2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG5cdFx0ICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuXHRcdCwgZW51bWVyYWJsZTogdHJ1ZVxuXHRcdCwgY29uZmlndXJhYmxlOiB0cnVlXG5cdH07XG5cdHRyeSB7XG5cdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHR9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcblx0XHQvLyBhZGRpbmcgdW5kZWZpbmVkIHRvIGZpZ2h0IHRoaXMgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2lzc3Vlcy8zNlxuXHRcdC8vIG1vZGVybmllIElFOC1NU1c3IG1hY2hpbmUgaGFzIElFOCA4LjAuNjAwMS4xODcwMiBhbmQgaXMgYWZmZWN0ZWRcblx0XHRpZiAoZXgubnVtYmVyID09PSB1bmRlZmluZWQgfHwgZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuXHRcdFx0Y2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuXHRcdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHRcdH1cblx0fVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG5cdGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0od2luZG93LnNlbGYpKTtcblxufVxuXG4vLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbi8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjMVwiLCBcImMyXCIpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG5cdC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuXHRpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKSB7XG5cdFx0dmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG5cdFx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0XHR2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHR0b2tlbiA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHRvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG5cdFx0Y3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcblx0fVxuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuXHQvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuXHRcdHZhciBfdG9nZ2xlID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cblx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuXHRcdFx0aWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG5cdFx0XHRcdHJldHVybiBmb3JjZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0fVxuXG5cdHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG5cbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gPDMgTW9kZXJuaXpyXG4vLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTW9kZXJuaXpyL01vZGVybml6ci9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2RvbS9kYXRhc2V0LmpzXG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSgpIHtcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYS1iJywgJ2MnKTtcblxuXHRyZXR1cm4gQm9vbGVhbihlbGVtLmRhdGFzZXQgJiYgZWxlbS5kYXRhc2V0LmFCID09PSAnYycpO1xufVxuXG5mdW5jdGlvbiBuYXRpdmVEYXRhc2V0KGVsZW1lbnQpIHtcblx0cmV0dXJuIGVsZW1lbnQuZGF0YXNldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IG5hdGl2ZURhdGFzZXQgOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHR2YXIgbWFwID0ge307XG5cdHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuXG5cdGZ1bmN0aW9uIGdldHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldHRlcihuYW1lLCB2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGZvciAodmFyIGkgPSAwLCBqID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHR2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcblxuXHRcdGlmIChhdHRyaWJ1dGUpIHtcblx0XHRcdHZhciBuYW1lID0gYXR0cmlidXRlLm5hbWU7XG5cblx0XHRcdGlmIChuYW1lLmluZGV4T2YoJ2RhdGEtJykgPT09IDApIHtcblx0XHRcdFx0dmFyIHByb3AgPSBuYW1lLnNsaWNlKDUpLnJlcGxhY2UoLy0uL2csIGZ1bmN0aW9uICh1KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHUuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBwcm9wLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGdldHRlci5iaW5kKHsgdmFsdWU6IHZhbHVlIHx8ICcnIH0pLFxuXHRcdFx0XHRcdHNldDogc2V0dGVyLmJpbmQoZWxlbWVudCwgbmFtZSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hcDtcbn07XG5cbiIsIi8vIGVsZW1lbnQtY2xvc2VzdCB8IENDMC0xLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvY2xvc2VzdFxuXG4oZnVuY3Rpb24gKEVsZW1lbnRQcm90bykge1xuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLm1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblx0XHRcdHZhciBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuXHRcdH07XG5cdH1cblxuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLmNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdH1cbn0pKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSk7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgZGVsZWdhdGVBbGwgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZUFsbCcpO1xuXG5jb25zdCBERUxFR0FURV9QQVRURVJOID0gL14oLispOmRlbGVnYXRlXFwoKC4rKVxcKSQvO1xuY29uc3QgU1BBQ0UgPSAnICc7XG5cbmNvbnN0IGdldExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgdmFyIG1hdGNoID0gdHlwZS5tYXRjaChERUxFR0FURV9QQVRURVJOKTtcbiAgdmFyIHNlbGVjdG9yO1xuICBpZiAobWF0Y2gpIHtcbiAgICB0eXBlID0gbWF0Y2hbMV07XG4gICAgc2VsZWN0b3IgPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHZhciBvcHRpb25zO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IHBvcEtleShoYW5kbGVyLCAnY2FwdHVyZScpLFxuICAgICAgcGFzc2l2ZTogcG9wS2V5KGhhbmRsZXIsICdwYXNzaXZlJylcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0ge1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBkZWxlZ2F0ZTogKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0JylcbiAgICAgID8gZGVsZWdhdGVBbGwoaGFuZGxlcilcbiAgICAgIDogc2VsZWN0b3JcbiAgICAgICAgPyBkZWxlZ2F0ZShzZWxlY3RvciwgaGFuZGxlcilcbiAgICAgICAgOiBoYW5kbGVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICBpZiAodHlwZS5pbmRleE9mKFNQQUNFKSA+IC0xKSB7XG4gICAgcmV0dXJuIHR5cGUuc3BsaXQoU1BBQ0UpLm1hcChmdW5jdGlvbihfdHlwZSkge1xuICAgICAgcmV0dXJuIGFzc2lnbih7dHlwZTogX3R5cGV9LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbnZhciBwb3BLZXkgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlaGF2aW9yKGV2ZW50cywgcHJvcHMpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24obWVtbywgdHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0eXBlLCBldmVudHNbdHlwZV0pO1xuICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KGxpc3RlbmVycyk7XG4gICAgfSwgW10pO1xuXG4gIHJldHVybiBhc3NpZ24oe1xuICAgIGFkZDogZnVuY3Rpb24gYWRkQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZUJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgcHJvcHMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZShmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnNvbWUoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpID09PSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmUoZWxlbWVudCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlnbm9yYW5jZShlKSB7XG4gICAgaWYgKGVsZW1lbnQgIT09IGUudGFyZ2V0ICYmICFlbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25jZShsaXN0ZW5lciwgb3B0aW9ucykge1xuICB2YXIgd3JhcHBlZCA9IGZ1bmN0aW9uIHdyYXBwZWRPbmNlKGUpIHtcbiAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIHdyYXBwZWQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xuICB9O1xuICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJFX1RSSU0gPSAvKF5cXHMrKXwoXFxzKyQpL2c7XG52YXIgUkVfU1BMSVQgPSAvXFxzKy87XG5cbnZhciB0cmltID0gU3RyaW5nLnByb3RvdHlwZS50cmltXG4gID8gZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZShSRV9UUklNLCAnJyk7IH07XG5cbnZhciBxdWVyeUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbaWQ9XCInICsgaWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNvbHZlSWRzKGlkcywgZG9jKSB7XG4gIGlmICh0eXBlb2YgaWRzICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYnV0IGdvdCAnICsgKHR5cGVvZiBpZHMpKTtcbiAgfVxuXG4gIGlmICghZG9jKSB7XG4gICAgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGdldEVsZW1lbnRCeUlkID0gZG9jLmdldEVsZW1lbnRCeUlkXG4gICAgPyBkb2MuZ2V0RWxlbWVudEJ5SWQuYmluZChkb2MpXG4gICAgOiBxdWVyeUJ5SWQuYmluZChkb2MpO1xuXG4gIGlkcyA9IHRyaW0oaWRzKS5zcGxpdChSRV9TUExJVCk7XG5cbiAgLy8gWFhYIHdlIGNhbiBzaG9ydC1jaXJjdWl0IGhlcmUgYmVjYXVzZSB0cmltbWluZyBhbmQgc3BsaXR0aW5nIGFcbiAgLy8gc3RyaW5nIG9mIGp1c3Qgd2hpdGVzcGFjZSBwcm9kdWNlcyBhbiBhcnJheSBjb250YWluaW5nIGEgc2luZ2xlLFxuICAvLyBlbXB0eSBzdHJpbmdcbiAgaWYgKGlkcy5sZW5ndGggPT09IDEgJiYgaWRzWzBdID09PSAnJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBpZHNcbiAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgZWwgPSBnZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCB3aXRoIGlkOiBcIicgKyBpZCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoJ2FycmF5LWZpbHRlcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuY29uc3QgaXNFbGVtZW50SW5WaWV3cG9ydCA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzLWluLXZpZXdwb3J0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbi8vIFhYWCBtYXRjaCAuYWNjb3JkaW9uIGFuZCAuYWNjb3JkaW9uLWJvcmRlcmVkXG5jb25zdCBBQ0NPUkRJT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbiwgLiR7UFJFRklYfWFjY29yZGlvbi1ib3JkZXJlZGA7XG5jb25zdCBCVVRUT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbi1idXR0b25bYXJpYS1jb250cm9sc11gO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSAnYXJpYS1tdWx0aXNlbGVjdGFibGUnO1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIHZhciBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBleHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uZ2V0QXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSkgPT09ICd0cnVlJztcblxuICBpZiAoZXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGZvckVhY2goZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLCBvdGhlciA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBidXR0b24gZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogYWNjb3JkaW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY2NvcmRpb25cbiAqIEByZXR1cm4ge2FycmF5PEhUTUxCdXR0b25FbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0QWNjb3JkaW9uQnV0dG9ucyA9IGFjY29yZGlvbiA9PiB7XG4gIHJldHVybiBmaWx0ZXIoYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKSwgYnV0dG9uID0+IHtcbiAgICByZXR1cm4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uO1xuICB9KTtcbn07XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdG9nZ2xlQnV0dG9uKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZScpIHtcbiAgICAgICAgLy8gV2Ugd2VyZSBqdXN0IGV4cGFuZGVkLCBidXQgaWYgYW5vdGhlciBhY2NvcmRpb24gd2FzIGFsc28ganVzdFxuICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzKSkgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQ6IHJvb3QgPT4ge1xuICAgIGZvckVhY2gocm9vdC5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZSc7XG4gICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgfSk7XG4gIH0sXG4gIEFDQ09SRElPTixcbiAgQlVUVE9OLFxuICBzaG93OiBzaG93QnV0dG9uLFxuICBoaWRlOiBoaWRlQnV0dG9uLFxuICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbn0pO1xuXG4vKipcbiAqIFRPRE86IGZvciAyLjAsIHJlbW92ZSBldmVyeXRoaW5nIGJlbG93IHRoaXMgY29tbWVudCBhbmQgZXhwb3J0IHRoZVxuICogYmVoYXZpb3IgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IEFjY29yZGlvbiA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHRoaXMucm9vdCA9IHJvb3Q7XG4gIGFjY29yZGlvbi5vbih0aGlzLnJvb3QpO1xufTtcblxuLy8gY29weSBhbGwgb2YgdGhlIGJlaGF2aW9yIG1ldGhvZHMgYW5kIHByb3BzIHRvIEFjY29yZGlvblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuYXNzaWduKEFjY29yZGlvbiwgYWNjb3JkaW9uKTtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gc2hvd0J1dHRvbjtcbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGhpZGVCdXR0b247XG5cbkFjY29yZGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICBhY2NvcmRpb24ub2ZmKHRoaXMucm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfWJhbm5lci1oZWFkZXJgO1xuY29uc3QgRVhQQU5ERURfQ0xBU1MgPSBgJHtQUkVGSVh9YmFubmVyLWhlYWRlci1leHBhbmRlZGA7XG5cbmNvbnN0IHRvZ2dsZUJhbm5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmNsb3Nlc3QoSEVBREVSKS5jbGFzc0xpc3QudG9nZ2xlKEVYUEFOREVEX0NMQVNTKTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgYCR7SEVBREVSfSBbYXJpYS1jb250cm9sc11gIF06IHRvZ2dsZUJhbm5lcixcbiAgfSxcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IFBpa2FkYXkgPSByZXF1aXJlKFwiLi4vLi4vdmVuZG9yL3Bpa2FkYXkuanNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XG5cbmNvbnN0IGpzRGF0ZXBpY2tlclNlbGVjdG9yID0gJy5qcy1jYWxlbmRhci1kYXRlcGlja2VyJztcbmNvbnN0IGpzRGF5SW5wdXQgPSAnLmpzLWNhbGVuZGFyLWRheS1pbnB1dCc7XG5jb25zdCBqc01vbnRoSW5wdXQgPSAnLmpzLWNhbGVuZGFyLW1vbnRoLWlucHV0JztcbmNvbnN0IGpzWWVhcklucHV0ID0gJy5qcy1jYWxlbmRhci15ZWFyLWlucHV0JztcblxuY2xhc3MgZGF0ZXBpY2tlckdyb3VwIHtcbiAgY29uc3RydWN0b3IoZWwpe1xuICAgIFxuICAgIHRoaXMucGlrYWRheUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLmRhdGVwaWNrZXJFbGVtZW50ID0gc2VsZWN0KGpzRGF0ZXBpY2tlclNlbGVjdG9yLCBlbCk7XG4gICAgdGhpcy5kYXRlR3JvdXAgPSBlbDtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IGNsb3Nlc3QoZWwsICcuZm9ybS1ncm91cCcpO1xuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQgPSBudWxsOyAgIFxuXG4gICAgdGhpcy5pbml0RGF0ZUlucHV0cygpO1xuICAgIHRoaXMuaW5pdERhdGVwaWNrZXIodGhpcy5kYXRlcGlja2VyRWxlbWVudFswXSk7XG4gIH1cblxuICBpbml0RGF0ZUlucHV0cygpe1xuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzRGF5SW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXVxuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNNb250aElucHV0LCB0aGlzLmRhdGVHcm91cClbMF07XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzWWVhcklucHV0LCB0aGlzLmRhdGVHcm91cClbMF07XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMueWVhcklucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdERhdGVwaWNrZXIoZWwpe1xuICAgIGlmKGVsKXtcbiAgICAgIC8vTm90ZTogZWwgbWF5IG5vdCBiZSBhIDxzdmc+LCBJRTExIGRvZXMgbm90IGFkZCAuYmx1cigpIG1ldGhvZCB0byBzdmcgZWxlbWVudHMgKC0tPiBlc2MgYW5kIGVudGVyIGRvZXMgbm90IGRpc21pc3MgcGlrYWRheSkuIFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZSA9IG5ldyBQaWthZGF5KHtcbiAgICAgICAgZmllbGQ6IGVsLFxuICAgICAgICBmb3JtYXQ6ICdERC9NTS9ZWVlZJyxcbiAgICAgICAgZmlyc3REYXk6IDEsIC8vbWFuZGFnXG4gICAgICAgIGkxOG46IHtcbiAgICAgICAgICBwcmV2aW91c01vbnRoIDogJ0ZvcnJpZ2UgbcOlbmVkJyxcbiAgICAgICAgICBuZXh0TW9udGggICAgIDogJ07DpnN0ZSBtw6VuZWQnLFxuICAgICAgICAgIG1vbnRocyAgICAgICAgOiBbJ0phbnVhcicsJ0ZlYnJ1YXInLCdNYXJ0aCcsJ0FwcmlsJywnTWFqJywnSnVuaScsJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPa3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxuICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1PDuG5kYWcnLCdNYW5kYWcnLCdUaXJzZGFnJywnT25zZGFnJywnVG9yc2RhZycsJ0ZyZWRhZycsJ0zDuHJkYWcnXSxcbiAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTw7huJywnTWFuJywnVGlyJywnT25zJywnVG9yJywnRnJlJywnTMO4ciddXG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgLy9zZWxlY3RlZCBuZXcgZGF0ZSBpbiBwaWthZGF5LCB1cGRhdGUgaW5wdXQgZmllbGRzLiBcbiAgICAgICAgICB0aGF0LnVwZGF0ZURhdGVJbnB1dHMoZGF0ZSk7XG4gICAgICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgICAgICB9LFxuICAgICAgICBvbk9wZW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy91cGRhdGUgcGlrYWRheSB3aXRoIHZhbHVlcyBmcm9tIGlucHV0IGZpZWxkc1xuICAgICAgICAgIHZhciBkYXkgPSBwYXJzZUludCh0aGF0LmRheUlucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhhdC5tb250aElucHV0RWxlbWVudC52YWx1ZSkgLTE7XG4gICAgICAgICAgdmFyIHllYXIgPSBwYXJzZUludCh0aGF0LnllYXJJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgICAgaWYodGhhdC52YWxpZGF0ZUlucHV0cygpKXtcbiAgICAgICAgICAgIHRoYXQudXBkYXRlRGF0ZXBpY2tlckRhdGUobmV3RGF0ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgaW5pdERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5waWthZGF5SW5zdGFuY2Uuc2V0RGF0ZShpbml0RGF0ZSk7XG4gICAgICB0aGlzLnVwZGF0ZURhdGVJbnB1dHMoaW5pdERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRzKCl7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRoaXMuZGF5SW5wdXRFbGVtZW50LnZhbHVlKVxuICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgIHZhciB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFySW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB2YXIgbWF4RGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcblxuICAgIHZhciBtc2cgPSBcIlwiO1xuICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTsgXG4gICAgaWYoZGF5ID4gbWF4RGF5KXtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIG1zZyA9IFwiSG92LCBkZW4gZGFnIGZpbmRlcyBpa2tlIGkgZGVuIHZhbGd0ZSBtw6VuZWQuXCJcbiAgICAgIHRoaXMuc2hvd0Vycm9yKG1zZyk7XG4gICAgfWVsc2UgaWYobW9udGggPiAxMil7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBtc2cgPSBcIkhvdiwgZGVuIG3DpW5lZCBmaW5kZXMgaWtrZS5cIlxuICAgICAgdGhpcy5zaG93RXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZhbGlkKXtcbiAgICAgIHRoaXMucmVtb3ZlRXJyb3IoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfVxuXG4gIHNob3dFcnJvcihtc2cpe1xuICAgIHRoaXMuZm9ybUdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1lcnJvclwiKTtcbiAgICBzZWxlY3QoXCIuaW5wdXQtZXJyb3ItbWVzc2FnZVwiLCAgdGhpcy5mb3JtR3JvdXApWzBdLnRleHRDb250ZW50ID0gbXNnO1xuICB9XG4gIHJlbW92ZUVycm9yKCl7XG4gICAgdGhpcy5mb3JtR3JvdXAuY2xhc3NMaXN0LnJlbW92ZShcImlucHV0LWVycm9yXCIpO1xuICAgIHNlbGVjdChcIi5pbnB1dC1lcnJvci1tZXNzYWdlXCIsICB0aGlzLmZvcm1Hcm91cClbMF0udGV4dENvbnRlbnQgPSBcIlwiO1xuICB9XG5cbiAgdXBkYXRlRGF0ZUlucHV0cyhkYXRlKXtcbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSA9IGRheTtcbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlID0gbW9udGg7XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50LnZhbHVlID0geWVhcjtcbiAgfVxuXG4gIHVwZGF0ZURhdGVwaWNrZXJEYXRlKG5ld0RhdGUpe1xuICAgIHRoaXMucGlrYWRheUluc3RhbmNlLnNldERhdGUobmV3RGF0ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlcGlja2VyR3JvdXA7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBjbG9zZXN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2xvc2VzdCcpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcblxuY29uc3QganNEcm9wZG93blRyaWdnZXIgPSBcIi5qcy1kcm9wZG93blwiO1xuY29uc3QganNEcm9wZG93blRhcmdldCA9IFwiZGF0YS1qcy10YXJnZXRcIjtcblxuY29uc3QgdG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlckVsLCBmb3JjZUNsb3NlKSB7XG4gICAgaWYodHJpZ2dlckVsICE9PSBudWxsICYmIHRyaWdnZXJFbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgdmFyIHRhcmdldEF0dHIgPSB0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKGpzRHJvcGRvd25UYXJnZXQpXG4gICAgICAgIGlmKHRhcmdldEF0dHIgIT09IG51bGwgJiYgdGFyZ2V0QXR0ciAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHZhciB0YXJnZXRFbCA9IHNlbGVjdCh0YXJnZXRBdHRyLCAnYm9keScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0RWwgIT09IG51bGwgJiYgdGFyZ2V0RWwgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXRFbC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAvL3RhcmdldCBmb3VuZCwgY2hlY2sgc3RhdGVcbiAgICAgICAgICAgICAgICB0YXJnZXRFbCA9IHRhcmdldEVsWzBdO1xuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHN0YXRlXG4gICAgICAgICAgICAgICAgaWYodHJpZ2dlckVsLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIgfHwgZm9yY2VDbG9zZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vY2xvc2VcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL29wZW5cbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICBcbiAgICB9XG59O1xuXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBkcm9wZG93bkVsbSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBqc0Ryb3Bkb3duVHJpZ2dlcik7XG4gICAgaWYoZHJvcGRvd25FbG0gIT09IG51bGwgJiYgZHJvcGRvd25FbG0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIC8vQ2xvc2UgYWxsIGV4aXN0aW5nIG9wZW4gZHJvcGRvd25zXG4gICAgICAgIGZvckVhY2goc2VsZWN0KGpzRHJvcGRvd25UcmlnZ2VyLCAnYm9keScpLCBkcm9wZG93bkluc3RhbmNlID0+IHtcbiAgICAgICAgICAgIGlmKGRyb3Bkb3duSW5zdGFuY2UgIT09IGRyb3Bkb3duRWxtKXtcbiAgICAgICAgICAgICAgICB0b2dnbGVEcm9wZG93bihkcm9wZG93bkluc3RhbmNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vT3BlbiBuZXcgZHJvcGRvd25cbiAgICAgICAgdG9nZ2xlRHJvcGRvd24oZHJvcGRvd25FbG0pO1xuICAgIH1cbn07XG5cbmNvbnN0IG91dHNpZGVDbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAvL2Nsb3NlcyBkcm9wZG93biB3aGVuIGNsaWNrZWQgb3V0c2lkZS4gXG4gICAgdmFyIGRyb3Bkb3duRWxtID0gY2xvc2VzdChldmVudC50YXJnZXQsIGpzRHJvcGRvd25UcmlnZ2VyKTtcbiAgICBpZihkcm9wZG93bkVsbSA9PT0gbnVsbCB8fCBkcm9wZG93bkVsbSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy9jbGlja2VkIG91dHNpZGUgdHJpZ2dlciwgZm9yY2UgY2xvc2UgYWxsXG4gICAgICAgIGZvckVhY2goc2VsZWN0KGpzRHJvcGRvd25UcmlnZ2VyKSwgZHJvcGRvd25JbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVEcm9wZG93bihkcm9wZG93bkluc3RhbmNlLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsnY2xpY2snXToge1xuICAgIFsganNEcm9wZG93blRyaWdnZXIgXTogdG9nZ2xlLFxuICAgIFsnYm9keSddOiBvdXRzaWRlQ2xvc2UsXG4gIH0sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4OyAvL0pKRTogbm90IHVzZWQgYW55bW9yZSBcblxuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5jb25zdCBTQ09QRSA9IGAuZm9vdGVyYDsgLy8ke1BSRUZJWH0tXG5jb25zdCBOQVYgPSBgJHtTQ09QRX0gbmF2YDtcbmNvbnN0IEJVVFRPTiA9IGAke05BVn0gLmZvb3Rlci1wcmltYXJ5LWxpbmtgOyAvLyR7UFJFRklYfS1cbmNvbnN0IExJU1QgPSBgJHtOQVZ9IHVsYDtcblxuY29uc3QgSElERV9NQVhfV0lEVEggPSA2MDA7XG5jb25zdCBERUJPVU5DRV9SQVRFID0gMTgwO1xuXG5jb25zdCBzaG93UGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNtYWxsX3NjcmVlbiA9IHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEg7XG4gIGlmKHNtYWxsX3NjcmVlbil7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY2xvc2VzdChMSVNUKTtcbiAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoSElEREVOKTtcblxuICAgIC8vIE5COiB0aGlzICpzaG91bGQqIGFsd2F5cyBzdWNjZWVkIGJlY2F1c2UgdGhlIGJ1dHRvblxuICAgIC8vIHNlbGVjdG9yIGlzIHNjb3BlZCB0byBcIi57cHJlZml4fS1mb290ZXItYmlnIG5hdlwiXG4gICAgY29uc3QgbGlzdHMgPSBsaXN0LmNsb3Nlc3QoTkFWKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJyk7XG5cbiAgICBmb3JFYWNoKGxpc3RzLCBlbCA9PiB7XG4gICAgICBpZiAoZWwgIT09IGxpc3QpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChISURERU4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCByZXNpemUgPSBkZWJvdW5jZSgoKSA9PiB7XG4gIGNvbnN0IGhpZGRlbiA9IHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEg7XG4gIGZvckVhY2goc2VsZWN0KExJU1QpLCBsaXN0ID0+IHtcbiAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoSElEREVOLCBoaWRkZW4pO1xuICB9KTtcbn0sIERFQk9VTkNFX1JBVEUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogc2hvd1BhbmVsLFxuICB9LFxufSwge1xuICAvLyBleHBvcnQgZm9yIHVzZSBlbHNld2hlcmVcbiAgSElERV9NQVhfV0lEVEgsXG4gIERFQk9VTkNFX1JBVEUsXG5cbiAgaW5pdDogdGFyZ2V0ID0+IHtcbiAgICByZXNpemUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgfSxcblxuICB0ZWFyZG93bjogdGFyZ2V0ID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgfSxcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjY29yZGlvbjogIHJlcXVpcmUoJy4vYWNjb3JkaW9uJyksXG4gIGJhbm5lcjogICAgIHJlcXVpcmUoJy4vYmFubmVyJyksXG4gIGZvb3RlcjogICAgIHJlcXVpcmUoJy4vZm9vdGVyJyksXG4gIG5hdmlnYXRpb246IHJlcXVpcmUoJy4vbmF2aWdhdGlvbicpLFxuICBwYXNzd29yZDogICByZXF1aXJlKCcuL3Bhc3N3b3JkJyksXG4gIHNlYXJjaDogICAgIHJlcXVpcmUoJy4vc2VhcmNoJyksXG4gIHNraXBuYXY6ICAgIHJlcXVpcmUoJy4vc2tpcG5hdicpLFxuICB2YWxpZGF0b3I6ICByZXF1aXJlKCcuL3ZhbGlkYXRvcicpLFxuICByZWdleG1hc2s6ICByZXF1aXJlKCcuL3JlZ2V4LWlucHV0LW1hc2snKSxcbiAgZHJvcGRvd246ICAgcmVxdWlyZSgnLi9kcm9wZG93bicpLFxuICBuYXZzdWJtZW51OiAgIHJlcXVpcmUoJy4vbmF2LXN1Ym1lbnUnKSxcbiAgLy90YWJsZTogICAgICByZXF1aXJlKCcuL3RhYmxlJyksXG4gIFxufTtcbiIsIlxuZnVuY3Rpb24gTW9kYWwobW9kYWxFbCwgb3ZlcmxheUVsKSB7XG5cdHRoaXMubW9kYWxFbCA9IG1vZGFsRWw7XG5cdHRoaXMub3ZlcmxheUVsID0gb3ZlcmxheUVsO1xuXHR0aGlzLmZvY3VzZWRFbEJlZm9yZU9wZW47XG5cblx0dmFyIGZvY3VzYWJsZUVscyA9IHRoaXMubW9kYWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgW3RhYmluZGV4PVwiMFwiXScpO1xuXHR0aGlzLmZvY3VzYWJsZUVscyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZUVscyk7XG5cblx0dGhpcy5maXJzdEZvY3VzYWJsZUVsID0gdGhpcy5mb2N1c2FibGVFbHNbMF07XG5cdHRoaXMubGFzdEZvY3VzYWJsZUVsID0gdGhpcy5mb2N1c2FibGVFbHNbIHRoaXMuZm9jdXNhYmxlRWxzLmxlbmd0aCAtIDEgXTtcblxuXHR0aGlzLmNsb3NlKCk7IC8vIFJlc2V0XG59XG5cblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgTW9kYWwgPSB0aGlzO1xuXG5cdHRoaXMubW9kYWxFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG5cdHRoaXMub3ZlcmxheUVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblxuXHR0aGlzLmZvY3VzZWRFbEJlZm9yZU9wZW4gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG5cdHRoaXMubW9kYWxFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHRcdE1vZGFsLl9oYW5kbGVLZXlEb3duKGUpO1xuXHR9KTtcblxuXHR0aGlzLm92ZXJsYXlFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdE1vZGFsLmNsb3NlKCk7XG5cdH0pO1xuXG5cdHRoaXMuZmlyc3RGb2N1c2FibGVFbC5mb2N1cygpO1xufTtcblxuTW9kYWwucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5tb2RhbEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0dGhpcy5vdmVybGF5RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG5cdGlmICggdGhpcy5mb2N1c2VkRWxCZWZvcmVPcGVuICkge1xuXHRcdHRoaXMuZm9jdXNlZEVsQmVmb3JlT3Blbi5mb2N1cygpO1xuXHR9XG59O1xuXG5cbk1vZGFsLnByb3RvdHlwZS5faGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uKGUpIHtcblxuXHR2YXIgTW9kYWwgPSB0aGlzO1xuXHR2YXIgS0VZX1RBQiA9IDk7XG5cdHZhciBLRVlfRVNDID0gMjc7XG5cblx0ZnVuY3Rpb24gaGFuZGxlQmFja3dhcmRUYWIoKSB7XG5cdFx0aWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBNb2RhbC5maXJzdEZvY3VzYWJsZUVsICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0TW9kYWwubGFzdEZvY3VzYWJsZUVsLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGhhbmRsZUZvcndhcmRUYWIoKSB7XG5cdFx0aWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBNb2RhbC5sYXN0Rm9jdXNhYmxlRWwgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRNb2RhbC5maXJzdEZvY3VzYWJsZUVsLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cblx0c3dpdGNoKGUua2V5Q29kZSkge1xuXHRjYXNlIEtFWV9UQUI6XG5cdFx0aWYgKCBNb2RhbC5mb2N1c2FibGVFbHMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fSBcblx0XHRpZiAoIGUuc2hpZnRLZXkgKSB7XG5cdFx0XHRoYW5kbGVCYWNrd2FyZFRhYigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoYW5kbGVGb3J3YXJkVGFiKCk7XG5cdFx0fVxuXHRcdGJyZWFrO1xuXHRjYXNlIEtFWV9FU0M6XG4gICAgTW9kYWwuY2xvc2UoKTtcblx0XHRicmVhaztcblx0ZGVmYXVsdDpcblx0XHRicmVhaztcblx0fVxuXG5cbn07XG5cblxuTW9kYWwucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24ob3Blbk1vZGFsU2VsLCBjbG9zZU1vZGFsU2VsKSB7XG5cblx0dmFyIE1vZGFsID0gdGhpcztcblxuXHR2YXIgb3Blbk1vZGFsRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChvcGVuTW9kYWxTZWwpO1xuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBvcGVuTW9kYWxFbHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0b3Blbk1vZGFsRWxzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IFxuXHRcdFx0TW9kYWwub3BlbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGNsb3NlTW9kYWxFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsb3NlTW9kYWxTZWwpO1xuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjbG9zZU1vZGFsRWxzLmxlbmd0aDsgaSsrICkge1xuXHRcdGNsb3NlTW9kYWxFbHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdE1vZGFsLmNsb3NlKCk7XG5cdFx0fSk7XG5cdH1cblxufTtcblxuXG52YXIgbmF2TW9kYWxFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2RhbC1wYXNzaXZlJywgKTtcbnZhciBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9kYWwtb3ZlcmxheS1wYXNzaXZlJyk7XG5pZihuYXZNb2RhbEVsICE9PSBudWxsICYmIG1vZGFsT3ZlcmxheSAhPT0gbnVsbCAmJiBuYXZNb2RhbEVsICE9PSB1bmRlZmluZWQgJiYgbW9kYWxPdmVybGF5ICE9PSB1bmRlZmluZWQpe1xuICAgIHZhciBteU1vZGFsID0gbmV3IE1vZGFsKG5hdk1vZGFsRWwsIG1vZGFsT3ZlcmxheSk7XG4gICAgbXlNb2RhbC5hZGRFdmVudExpc3RlbmVycygnLmpzLW9wZW4tbW9kYWwtcGFzc2l2ZScsICcuanMtY2xvc2UtbW9kYWwtcGFzc2l2ZScpO1xuICAgIFxufVxuXG52YXIgbmF2TW9kYWxFbDExID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLWludGVyYWN0aXZlJywgKTtcbnZhciBtb2RhbE92ZXJsYXkxMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2RhbC1vdmVybGF5LWludGVyYWN0aXZlJyk7XG5pZihuYXZNb2RhbEVsMTEgIT09IG51bGwgJiYgbW9kYWxPdmVybGF5MTEgIT09IG51bGwgJiYgbmF2TW9kYWxFbDExICE9PSB1bmRlZmluZWQgJiYgbW9kYWxPdmVybGF5MTEgIT09IHVuZGVmaW5lZCl7XG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwobmF2TW9kYWxFbDExLCBtb2RhbE92ZXJsYXkxMSk7XG4gICAgbXlNb2RhbC5hZGRFdmVudExpc3RlbmVycygnLmpzLW9wZW4tbW9kYWwtaW50ZXJhY3RpdmUnLCAnLmpzLWNsb3NlLW1vZGFsLWludGVyYWN0aXZlJyk7XG4gICAgXG59XG5cblxuIiwiLyoqXHJcbiAqIENvbGxhcHNlL2V4cGFuZCBmb3IgbmF2aWdhdGlvbiBzdWJtZW51ZXMuXHJcbiAqIEJlaGF2ZXMgbGlrZSBhIGRyb3Bkb3duIG9uIGRlc2t0b3AgKGNsb3NlcyB3aGVuIGNsaWNrZWQgb3V0c2lkZSkuXHJcbiAqIEFuZCBiZWhhdmVzIGxpa2UgYW4gYWNjb3JkaW9uIChtdWx0aXNlbGVjdCkgb24gbW9iaWxlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xyXG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcclxuY29uc3QgY2xvc2VzdCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Nsb3Nlc3QnKTtcclxuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcclxuXHJcbmNvbnN0IGpzTmF2U3VibWVudVRyaWdnZXIgPSBcIi5qcy1uYXYtc3VibWVudVwiO1xyXG5jb25zdCBqc05hdlN1Ym1lbnVUYXJnZXQgPSBcImRhdGEtanMtdGFyZ2V0XCI7XHJcblxyXG5jb25zdCBuYXZSZXNwb25zaXZlQnJlYWtwb2ludCA9IDk5MjsgLy9zYW1lIGFzICRuYXYtcmVzcG9uc2l2ZS1icmVha3BvaW50IGZyb20gdGhlIHNjc3MuXHJcblxyXG5jb25zdCB0b2dnbGVOYXZTdWJtZW51ID0gZnVuY3Rpb24gKHRyaWdnZXJFbCwgZm9yY2VDbG9zZSkge1xyXG4gICAgaWYodHJpZ2dlckVsICE9PSBudWxsICYmIHRyaWdnZXJFbCAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICB2YXIgdGFyZ2V0QXR0ciA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoanNOYXZTdWJtZW51VGFyZ2V0KVxyXG4gICAgICAgIGlmKHRhcmdldEF0dHIgIT09IG51bGwgJiYgdGFyZ2V0QXR0ciAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEVsID0gc2VsZWN0KHRhcmdldEF0dHIsICdib2R5Jyk7XHJcbiAgICAgICAgICAgIGlmKHRhcmdldEVsICE9PSBudWxsICYmIHRhcmdldEVsICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0RWwubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvL3RhcmdldCBmb3VuZCwgY2hlY2sgc3RhdGVcclxuICAgICAgICAgICAgICAgIHRhcmdldEVsID0gdGFyZ2V0RWxbMF07XHJcbiAgICAgICAgICAgICAgICAvL2NoYW5nZSBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYodHJpZ2dlckVsLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIgfHwgZm9yY2VDbG9zZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL29wZW5cclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBOYXZTdWJtZW51RWxtID0gY2xvc2VzdChldmVudC50YXJnZXQsIGpzTmF2U3VibWVudVRyaWdnZXIpO1xyXG4gICAgaWYoTmF2U3VibWVudUVsbSAhPT0gbnVsbCAmJiBOYXZTdWJtZW51RWxtICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIC8vQ2xvc2UgYWxsIGV4aXN0aW5nIG9wZW4gTmF2U3VibWVudXMgKG9uIGRlc2t0b3ApLlxyXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoID4gbmF2UmVzcG9uc2l2ZUJyZWFrcG9pbnQpe1xyXG4gICAgICAgICAgICBmb3JFYWNoKHNlbGVjdChqc05hdlN1Ym1lbnVUcmlnZ2VyLCAnYm9keScpLCBOYXZTdWJtZW51SW5zdGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoTmF2U3VibWVudUluc3RhbmNlICE9PSBOYXZTdWJtZW51RWxtKXtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVOYXZTdWJtZW51KE5hdlN1Ym1lbnVJbnN0YW5jZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL09wZW4gbmV3IE5hdlN1Ym1lbnVcclxuICAgICAgICB0b2dnbGVOYXZTdWJtZW51KE5hdlN1Ym1lbnVFbG0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgb3V0c2lkZUNsb3NlID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgLy9jbG9zZXMgTmF2U3VibWVudSB3aGVuIGNsaWNrZWQgb3V0c2lkZSAob24gZGVza3RvcCkgXHJcbiAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IG5hdlJlc3BvbnNpdmVCcmVha3BvaW50KXtcclxuICAgICAgICB2YXIgTmF2U3VibWVudUVsbSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBqc05hdlN1Ym1lbnVUcmlnZ2VyKTtcclxuICAgICAgICBpZihOYXZTdWJtZW51RWxtID09PSBudWxsIHx8IE5hdlN1Ym1lbnVFbG0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vY2xpY2tlZCBvdXRzaWRlIHRyaWdnZXIsIGZvcmNlIGNsb3NlIGFsbFxyXG4gICAgICAgICAgICBmb3JFYWNoKHNlbGVjdChqc05hdlN1Ym1lbnVUcmlnZ2VyKSwgTmF2U3VibWVudUluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZU5hdlN1Ym1lbnUoTmF2U3VibWVudUluc3RhbmNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XHJcbiAgWydjbGljayddOiB7XHJcbiAgICBbIGpzTmF2U3VibWVudVRyaWdnZXIgXTogdG9nZ2xlLFxyXG4gICAgWydib2R5J106IG91dHNpZGVDbG9zZSxcclxuICB9LFxyXG59KTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi9hY2NvcmRpb24nKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTkFWID0gYC5uYXZgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE9QRU5FUlMgPSBgLmpzLW1lbnUtb3BlbmA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgLmpzLW1lbnUtY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAub3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLm92ZXJsYXlgO1xuY29uc3QgVE9HR0xFUyA9IFsgTkFWLCBPVkVSTEFZIF0uam9pbignLCAnKTtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gJ21vYmlsZV9uYXYtYWN0aXZlJztcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnaXMtdmlzaWJsZSc7XG5cbmNvbnN0IGlzQWN0aXZlID0gKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcblxuY29uc3QgX2ZvY3VzVHJhcCA9ICh0cmFwQ29udGFpbmVyKSA9PiB7XG4gIC8vIEZpbmQgYWxsIGZvY3VzYWJsZSBjaGlsZHJlblxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50c1N0cmluZyA9ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdHJhcENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nKTtcbiAgY29uc3QgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbIDAgXTtcbiAgY29uc3QgbGFzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1sgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSBdO1xuXG4gIGZ1bmN0aW9uIHRyYXBUYWJLZXkgKGUpIHtcbiAgICAvLyBDaGVjayBmb3IgVEFCIGtleSBwcmVzc1xuICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcblxuICAgICAgLy8gU0hJRlQgKyBUQUJcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAvLyBUQUJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVTQ0FQRVxuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICB0b2dnbGVOYXYuY2FsbCh0aGlzLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRm9jdXMgZmlyc3QgY2hpbGRcbiAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbmFibGUgKCkge1xuICAgICAgLy8gTGlzdGVuIGZvciBhbmQgdHJhcCB0aGUga2V5Ym9hcmRcbiAgICAgIHRyYXBDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuICAgIH0sXG5cbiAgICByZWxlYXNlICgpIHtcbiAgICAgIHRyYXBDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5sZXQgZm9jdXNUcmFwO1xuXG5jb25zdCB0b2dnbGVOYXYgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICBpZiAodHlwZW9mIGFjdGl2ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgYWN0aXZlID0gIWlzQWN0aXZlKCk7XG4gIH1cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgYWN0aXZlKTtcblxuICBmb3JFYWNoKHNlbGVjdChUT0dHTEVTKSwgZWwgPT4ge1xuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgYWN0aXZlKTtcbiAgfSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGZvY3VzVHJhcC5lbmFibGUoKTtcbiAgfSBlbHNlIHtcbiAgICBmb2N1c1RyYXAucmVsZWFzZSgpO1xuICB9XG5cbiAgY29uc3QgY2xvc2VCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcblxuICBpZiAoYWN0aXZlICYmIGNsb3NlQnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgYWN0aXZhdGVkLCBzbyBmb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uLFxuICAgIC8vIHdoaWNoIGlzIGp1c3QgYmVmb3JlIGFsbCB0aGUgbmF2IGVsZW1lbnRzIGluIHRoZSB0YWIgb3JkZXIuXG4gICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgfSBlbHNlIGlmICghYWN0aXZlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNsb3NlQnV0dG9uICYmXG4gICAgICAgICAgICAgbWVudUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGRlYWN0aXZhdGVkLCBhbmQgZm9jdXMgd2FzIG9uIHRoZSBjbG9zZVxuICAgIC8vIGJ1dHRvbiwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZpc2libGUuIFdlIGRvbid0IHdhbnQgdGhlIGZvY3VzIHRvXG4gICAgLy8gZGlzYXBwZWFyIGludG8gdGhlIHZvaWQsIHNvIGZvY3VzIG9uIHRoZSBtZW51IGJ1dHRvbiBpZiBpdCdzXG4gICAgLy8gdmlzaWJsZSAodGhpcyBtYXkgaGF2ZSBiZWVuIHdoYXQgdGhlIHVzZXIgd2FzIGp1c3QgZm9jdXNlZCBvbixcbiAgICAvLyBpZiB0aGV5IHRyaWdnZXJlZCB0aGUgbW9iaWxlIG5hdiBieSBtaXN0YWtlKS5cbiAgICBtZW51QnV0dG9uLmZvY3VzKCk7XG4gIH1cblxuICByZXR1cm4gYWN0aXZlO1xufTtcblxuY29uc3QgcmVzaXplID0gKCkgPT4ge1xuICBjb25zdCBjbG9zZXIgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcblxuICBpZiAoaXNBY3RpdmUoKSAmJiBjbG9zZXIgJiYgY2xvc2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoID09PSAwKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgaXMgYWN0aXZlLCBidXQgdGhlIGNsb3NlIGJveCBpc24ndCB2aXNpYmxlLCB3aGljaFxuICAgIC8vIG1lYW5zIHRoZSB1c2VyJ3Mgdmlld3BvcnQgaGFzIGJlZW4gcmVzaXplZCBzbyB0aGF0IGl0IGlzIG5vIGxvbmdlclxuICAgIC8vIGluIG1vYmlsZSBtb2RlLiBMZXQncyBtYWtlIHRoZSBwYWdlIHN0YXRlIGNvbnNpc3RlbnQgYnlcbiAgICAvLyBkZWFjdGl2YXRpbmcgdGhlIG1vYmlsZSBuYXYuXG4gICAgdG9nZ2xlTmF2LmNhbGwoY2xvc2VyLCBmYWxzZSk7XG4gIH1cbn07XG5cbmNvbnN0IG5hdmlnYXRpb24gPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgT1BFTkVSUyBdOiB0b2dnbGVOYXYsXG4gICAgWyBDTE9TRVJTIF06IHRvZ2dsZU5hdixcbiAgICBbIE5BVl9MSU5LUyBdOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBBIG5hdmlnYXRpb24gbGluayBoYXMgYmVlbiBjbGlja2VkISBXZSB3YW50IHRvIGNvbGxhcHNlIGFueVxuICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgIC8vIGNhbiBmb2N1cyBvbiB3aGF0ZXZlciB0aGV5J3ZlIGp1c3Qgc2VsZWN0ZWQuXG5cbiAgICAgIC8vIFNvbWUgbmF2aWdhdGlvbiBsaW5rcyBhcmUgaW5zaWRlIGFjY29yZGlvbnM7IHdoZW4gdGhleSdyZVxuICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuICAgICAgaWYgKGFjYykge1xuICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goYnRuID0+IGFjY29yZGlvbi5oaWRlKGJ0bikpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgbW9iaWxlIG5hdmlnYXRpb24gbWVudSBpcyBhY3RpdmUsIHdlIHdhbnQgdG8gaGlkZSBpdC5cbiAgICAgIGlmIChpc0FjdGl2ZSgpKSB7XG4gICAgICAgIHRvZ2dsZU5hdi5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSwge1xuICBpbml0ICgpIHtcbiAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihOQVYpO1xuXG4gICAgaWYgKHRyYXBDb250YWluZXIpIHtcbiAgICAgIGZvY3VzVHJhcCA9IF9mb2N1c1RyYXAodHJhcENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVzaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xuICB9LFxuICB0ZWFyZG93biAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiBuYXZpZ2F0aW9uLm9uKGVsKSxcbiAgbmF2aWdhdGlvblxuKTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB0b2dnbGVGb3JtSW5wdXQgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUtZm9ybS1pbnB1dCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH1zaG93X3Bhc3N3b3JkLCAuJHtQUkVGSVh9c2hvd19tdWx0aXBhc3N3b3JkYDtcblxuY29uc3QgdG9nZ2xlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRvZ2dsZUZvcm1JbnB1dCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogdG9nZ2xlLFxuICB9LFxufSk7XG4iLCJcbi8qXG4qIFByZXZlbnRzIHRoZSB1c2VyIGZyb20gaW5wdXR0aW5nIGJhc2VkIG9uIGEgcmVnZXguXG4qIERvZXMgbm90IHdvcmsgdGhlIHNhbWUgd2F5IGFmIDxpbnB1dCBwYXR0ZXJuPVwiXCI+LCB0aGlzIHBhdHRlcm4gaXMgb25seSB1c2VkIGZvciB2YWxpZGF0aW9uLCBub3QgdG8gcHJldmVudCBpbnB1dC4gXG4qIFVzZWNhc2U6IG51bWJlciBpbnB1dCBmb3IgZGF0ZS1jb21wb25lbnQuXG4qIEV4YW1wbGUgLSBudW1iZXIgb25seTogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1pbnB1dC1yZWdleD1cIl5cXGQqJFwiPlxuKi9cbid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcblxuY29uc3QgbW9kaWZpZXJTdGF0ZSA9IHtcbiAgc2hpZnQ6IGZhbHNlLFxuICBhbHQ6IGZhbHNlLFxuICBjdHJsOiBmYWxzZSxcbiAgY29tbWFuZDogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlucHV0UmVnZXhNYXNrKGV2ZW50KSB7XG5cbiAgICBpZihtb2RpZmllclN0YXRlLmN0cmwgfHwgbW9kaWZpZXJTdGF0ZS5jb21tYW5kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5ld0NoYXIgPSBudWxsO1xuICAgIGlmKHR5cGVvZiBldmVudC5rZXkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICBpZihldmVudC5rZXkubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBldmVudC5rZXk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZighZXZlbnQuY2hhckNvZGUpe1xuICAgICAgICAgICAgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5jaGFyQ29kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVsZW1lbnQgPSBudWxsO1xuICAgIGlmKGV2ZW50LnRhcmdldCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaWYobmV3Q2hhciAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGlmKG5ld0NoYXIubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBpZihlbGVtZW50LnR5cGUgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7Ly9Ob3RlIGlucHV0W3R5cGU9bnVtYmVyXSBkb2VzIG5vdCBoYXZlIC5zZWxlY3Rpb25TdGFydC9FbmQgKENocm9tZSkuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQpICsgdGhpcy52YWx1ZS5zbGljZShlbGVtZW50LnNlbGVjdGlvbkVuZCkgKyBuZXdDaGFyOyAvL3JlbW92ZXMgdGhlIG51bWJlcnMgc2VsZWN0ZWQgYnkgdGhlIHVzZXIsIHRoZW4gYWRkcyBuZXcgY2hhci4gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByZWdleFN0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbnB1dC1yZWdleFwiKTtcbiAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cChyZWdleFN0cik7XG4gICAgICAgICAgICBpZihyLmV4ZWMobmV3VmFsdWUpID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgJ2tleXByZXNzIHBhc3RlJzoge1xuICAgICdpbnB1dFtkYXRhLWlucHV0LXJlZ2V4XSc6IGlucHV0UmVnZXhNYXNrLFxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBpZ25vcmUgPSByZXF1aXJlKCdyZWNlcHRvci9pZ25vcmUnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBCVVRUT04gPSAnLmpzLXNlYXJjaC1idXR0b24nO1xuY29uc3QgRk9STSA9ICcuanMtc2VhcmNoLWZvcm0nO1xuY29uc3QgSU5QVVQgPSAnW3R5cGU9c2VhcmNoXSc7XG5jb25zdCBDT05URVhUID0gJ2hlYWRlcic7IC8vIFhYWFxuY29uc3QgVklTVUFMTFlfSElEREVOID0gYCR7UFJFRklYfXNyLW9ubHlgO1xuXG5sZXQgbGFzdEJ1dHRvbjtcblxuY29uc3Qgc2hvd1NlYXJjaCA9IGZ1bmN0aW9uIChldmVudCkge1xuICB0b2dnbGVTZWFyY2godGhpcywgdHJ1ZSk7XG4gIGxhc3RCdXR0b24gPSB0aGlzO1xufTtcblxuY29uc3QgaGlkZVNlYXJjaCA9IGZ1bmN0aW9uIChldmVudCkge1xuICB0b2dnbGVTZWFyY2godGhpcywgZmFsc2UpO1xuICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgZ2V0Rm9ybSA9IGJ1dHRvbiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBidXR0b24uY2xvc2VzdChDT05URVhUKTtcbiAgcmV0dXJuIGNvbnRleHRcbiAgICA/IGNvbnRleHQucXVlcnlTZWxlY3RvcihGT1JNKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihGT1JNKTtcbn07XG5cbmNvbnN0IHRvZ2dsZVNlYXJjaCA9IChidXR0b24sIGFjdGl2ZSkgPT4ge1xuICBjb25zdCBmb3JtID0gZ2V0Rm9ybShidXR0b24pO1xuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICR7Rk9STX0gZm91bmQgZm9yIHNlYXJjaCB0b2dnbGUgaW4gJHtDT05URVhUfSFgKTtcbiAgfVxuXG4gIGJ1dHRvbi5oaWRkZW4gPSBhY3RpdmU7XG4gIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZShWSVNVQUxMWV9ISURERU4sICFhY3RpdmUpO1xuXG4gIGlmIChhY3RpdmUpIHtcbiAgICBjb25zdCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihJTlBVVCk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICBpbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgICAvLyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBfb3V0c2lkZV8gb2YgdGhlIGZvcm0gdy9pZ25vcmUoKTogaGlkZSB0aGVcbiAgICAvLyBzZWFyY2gsIHRoZW4gcmVtb3ZlIHRoZSBsaXN0ZW5lclxuICAgIGNvbnN0IGxpc3RlbmVyID0gaWdub3JlKGZvcm0sIGUgPT4ge1xuICAgICAgaWYgKGxhc3RCdXR0b24pIHtcbiAgICAgICAgaGlkZVNlYXJjaC5jYWxsKGxhc3RCdXR0b24pO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gICAgfSk7XG5cbiAgICAvLyBOb3JtYWxseSB3ZSB3b3VsZCBqdXN0IHJ1biB0aGlzIGNvZGUgd2l0aG91dCBhIHRpbWVvdXQsIGJ1dFxuICAgIC8vIElFMTEgYW5kIEVkZ2Ugd2lsbCBhY3R1YWxseSBjYWxsIHRoZSBsaXN0ZW5lciAqaW1tZWRpYXRlbHkqIGJlY2F1c2VcbiAgICAvLyB0aGV5IGFyZSBjdXJyZW50bHkgaGFuZGxpbmcgdGhpcyBleGFjdCB0eXBlIG9mIGV2ZW50LCBzbyB3ZSdsbFxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgYnJvd3NlciBpcyBkb25lIGhhbmRsaW5nIHRoZSBjdXJyZW50IGNsaWNrIGV2ZW50LFxuICAgIC8vIGlmIGFueSwgYmVmb3JlIHdlIGF0dGFjaCB0aGUgbGlzdGVuZXIuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBzaG93U2VhcmNoLFxuICB9LFxufSwge1xuICBpbml0OiAodGFyZ2V0KSA9PiB7XG4gICAgZm9yRWFjaChzZWxlY3QoQlVUVE9OLCB0YXJnZXQpLCBidXR0b24gPT4ge1xuICAgICAgdG9nZ2xlU2VhcmNoKGJ1dHRvbiwgZmFsc2UpO1xuICAgIH0pO1xuICB9LFxuICB0ZWFyZG93bjogKHRhcmdldCkgPT4ge1xuICAgIC8vIGZvcmdldCB0aGUgbGFzdCBidXR0b24gY2xpY2tlZFxuICAgIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IHNlYXJjaC5vbihlbCksXG4gIHNlYXJjaFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IG9uY2UgPSByZXF1aXJlKCdyZWNlcHRvci9vbmNlJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH1za2lwbmF2W2hyZWZePVwiI1wiXWA7XG5cbmNvbnN0IHNldFRhYmluZGV4ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbmNlKGV2ZW50ID0+IHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgTElOSyBdOiBzZXRUYWJpbmRleCxcbiAgfSxcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKCcuLi91dGlscy92YWxpZGF0ZS1pbnB1dCcpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcblxuY29uc3QgY2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJldHVybiB2YWxpZGF0ZSh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICAna2V5dXAgY2hhbmdlJzoge1xuICAgICdpbnB1dFtkYXRhLXZhbGlkYXRpb24tZWxlbWVudF0nOiBjaGFuZ2UsXG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuLypjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gdmFsaWRhdG9yLm9uKGVsKSxcbiAgdmFsaWRhdG9yXG4pOyovXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiAnJyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGRhdGVwaWNrZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZGF0ZXBpY2tlcicpO1xuY29uc3QgbW9kYWwgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9kYWwnKTtcblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZGVmaW5lIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZSBtaXNzaW5nIGZyb21cbiAqIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcblxuY29uc3QgZGt3ZHMgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuXG5jb25zdCBqc1NlbGVjdG9yRGF0ZXBpY2tlciA9ICcuanMtY2FsZW5kYXItZ3JvdXAnO1xuXG5jb25zdCBjb21wb25lbnRzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzJyk7XG5ka3dkcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcblxuZG9tcmVhZHkoKCkgPT4ge1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICBmb3IgKGxldCBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICBjb25zdCBiZWhhdmlvciA9IGNvbXBvbmVudHNbIG5hbWUgXTtcbiAgICBiZWhhdmlvci5vbih0YXJnZXQpO1xuICB9XG5cbiAgLy9Jbml0IGRhdGVwaWNrZXIuICAoTm90ZTogYWJvdmUgJ2JlaGF2aW9yLm9uJyBkb2VzIG5vdCB3b3JrIHdpdGggcGlrYWRheSAtPiBzZXBlcmF0ZSBpbml0aWFsaXphdGlvbilcbiAgZm9yRWFjaChzZWxlY3QoanNTZWxlY3RvckRhdGVwaWNrZXIpLCBjYWxlbmRhckdyb3VwRWxlbWVudCA9PiB7XG4gICAgbmV3IGRhdGVwaWNrZXIoY2FsZW5kYXJHcm91cEVsZW1lbnQpO1xuICB9KTtcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGt3ZHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gVGhpcyB1c2VkIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGVwZW5kZW50IG9uIHdoZXRoZXIgdGhlXG4gIC8vIGJyb3dzZXIgc3VwcG9ydGVkIHRvdWNoIGV2ZW50czsgaWYgaXQgZGlkLCBgQ0xJQ0tgIHdhcyBzZXQgdG9cbiAgLy8gYHRvdWNoc3RhcnRgLiAgSG93ZXZlciwgdGhpcyBoYWQgZG93bnNpZGVzOlxuICAvL1xuICAvLyAqIEl0IHByZS1lbXB0ZWQgbW9iaWxlIGJyb3dzZXJzJyBkZWZhdWx0IGJlaGF2aW9yIG9mIGRldGVjdGluZ1xuICAvLyAgIHdoZXRoZXIgYSB0b3VjaCB0dXJuZWQgaW50byBhIHNjcm9sbCwgdGhlcmVieSBwcmV2ZW50aW5nXG4gIC8vICAgdXNlcnMgZnJvbSB1c2luZyBzb21lIG9mIG91ciBjb21wb25lbnRzIGFzIHNjcm9sbCBzdXJmYWNlcy5cbiAgLy9cbiAgLy8gKiBTb21lIGRldmljZXMsIHN1Y2ggYXMgdGhlIE1pY3Jvc29mdCBTdXJmYWNlIFBybywgc3VwcG9ydCAqYm90aCpcbiAgLy8gICB0b3VjaCBhbmQgY2xpY2tzLiBUaGlzIG1lYW50IHRoZSBjb25kaXRpb25hbCBlZmZlY3RpdmVseSBkcm9wcGVkXG4gIC8vICAgc3VwcG9ydCBmb3IgdGhlIHVzZXIncyBtb3VzZSwgZnJ1c3RyYXRpbmcgdXNlcnMgd2hvIHByZWZlcnJlZFxuICAvLyAgIGl0IG9uIHRob3NlIHN5c3RlbXMuXG4gIENMSUNLOiAnY2xpY2snLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5cbmlmICghKEhJRERFTiBpbiBlbHByb3RvKSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxwcm90bywgSElEREVOLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoSElEREVOLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZSgnY2xhc3NsaXN0LXBvbHlmaWxsJyk7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhpZGRlblxucmVxdWlyZSgnLi9lbGVtZW50LWhpZGRlbicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IEJlaGF2aW9yID0gcmVxdWlyZSgncmVjZXB0b3IvYmVoYXZpb3InKTtcblxuY29uc3Qgc2VxdWVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlcSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gICAgZm9yRWFjaChzZXEsIG1ldGhvZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbIG1ldGhvZCBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXNbIG1ldGhvZCBdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQG5hbWUgYmVoYXZpb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0P30gcHJvcHNcbiAqIEByZXR1cm4ge3JlY2VwdG9yLmJlaGF2aW9yfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChldmVudHMsIHByb3BzKSA9PiB7XG4gIHJldHVybiBCZWhhdmlvcihldmVudHMsIGFzc2lnbih7XG4gICAgb246ICAgc2VxdWVuY2UoJ2luaXQnLCAnYWRkJyksXG4gICAgb2ZmOiAgc2VxdWVuY2UoJ3RlYXJkb3duJywgJ3JlbW92ZScpLFxuICB9LCBwcm9wcykpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmFtZSBjbG9zZXN0XG4gKiBAZGVzYyBnZXQgbmVhcmVzdCBwYXJlbnQgZWxlbWVudCBtYXRjaGluZyBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIEhUTUwgZWxlbWVudCB3aGVyZSB0aGUgc2VhcmNoIHN0YXJ0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFNlbGVjdG9yIHRvIGJlIGZvdW5kLlxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gTmVhcmVzdCBwYXJlbnQgZWxlbWVudCBtYXRjaGluZyBzZWxlY3Rvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbG9zZXN0IChlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIG1hdGNoZXNTZWxlY3RvciA9IGVsLm1hdGNoZXMgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvcjtcblxuICB3aGlsZSAoZWwpIHtcbiAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IuY2FsbChlbCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGVsO1xufTtcbiIsIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzXG5mdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0IChlbCwgd2luPXdpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY0VsPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiAoXG4gICAgcmVjdC50b3AgPj0gMCAmJlxuICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgcmVjdC5ib3R0b20gPD0gKHdpbi5pbm5lckhlaWdodCB8fCBkb2NFbC5jbGllbnRIZWlnaHQpICYmXG4gICAgcmVjdC5yaWdodCA8PSAod2luLmlubmVyV2lkdGggfHwgZG9jRWwuY2xpZW50V2lkdGgpXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50SW5WaWV3cG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9IHZhbHVlID0+IHtcbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59O1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlbGVjdCAoc2VsZWN0b3IsIGNvbnRleHQpIHtcblxuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICghY29udGV4dCB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGlvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxlY3Rpb24pO1xufTtcbiIsIi8qKlxuICogRmxpcHMgZ2l2ZW4gSU5QVVQgZWxlbWVudHMgYmV0d2VlbiBtYXNrZWQgKGhpZGluZyB0aGUgZmllbGQgdmFsdWUpIGFuZCB1bm1hc2tlZFxuICogQHBhcmFtIHtBcnJheS5IVE1MRWxlbWVudH0gZmllbGRzIC0gQW4gYXJyYXkgb2YgSU5QVVQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayAtIFdoZXRoZXIgdGhlIG1hc2sgc2hvdWxkIGJlIGFwcGxpZWQsIGhpZGluZyB0aGUgZmllbGQgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZmllbGQsIG1hc2spID0+IHtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgbWFzayA/ICdwYXNzd29yZCcgOiAndGV4dCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCByZXNvbHZlSWRSZWZzID0gcmVxdWlyZSgncmVzb2x2ZS1pZC1yZWZzJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuL3NlbGVjdCcpO1xuY29uc3QgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZSgnLi90b2dnbGUtZmllbGQtbWFzaycpO1xuXG5jb25zdCBDT05UUk9MUyA9ICdhcmlhLWNvbnRyb2xzJztcbmNvbnN0IFBSRVNTRUQgPSAnYXJpYS1wcmVzc2VkJztcbmNvbnN0IFNIT1dfQVRUUiA9ICdkYXRhLXNob3ctdGV4dCc7XG5jb25zdCBISURFX0FUVFIgPSAnZGF0YS1oaWRlLXRleHQnO1xuXG4vKipcbiAqIFJlcGxhY2UgdGhlIHdvcmQgXCJTaG93XCIgKG9yIFwic2hvd1wiKSB3aXRoIFwiSGlkZVwiIChvciBcImhpZGVcIikgaW4gYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hvd1RleHRcbiAqIEByZXR1cm4ge3N0cm9uZ30gaGlkZVRleHRcbiAqL1xuY29uc3QgZ2V0SGlkZVRleHQgPSBzaG93VGV4dCA9PiB7XG4gIHJldHVybiBzaG93VGV4dC5yZXBsYWNlKC9cXGJTaG93XFxiL2ksIHNob3cgPT4ge1xuICAgIHJldHVybiAoJ1MnID09PSBzaG93WyAwIF0gPyAnSCcgOiAnaCcpICsgJ2lkZSc7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBkZWNvcmF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGFiaWxpdHkgdG8gdG9nZ2xlIHRoZVxuICogbWFza2VkIHN0YXRlIG9mIGFuIGlucHV0IGZpZWxkIChsaWtlIGEgcGFzc3dvcmQpIHdoZW4gY2xpY2tlZC5cbiAqIFRoZSBpZHMgb2YgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWQgd2lsbCBiZSBwdWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgYnV0dG9uJ3NcbiAqIGBhcmlhLWNvbnRyb2xzYCBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgIFBhcmVudCBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZWwgPT4ge1xuICAvLyB0aGlzIGlzIHRoZSAqdGFyZ2V0KiBzdGF0ZTpcbiAgLy8gKiBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGF0dHIgYW5kIGl0J3MgIT09IFwidHJ1ZVwiLCBwcmVzc2VkIGlzIHRydWVcbiAgLy8gKiBvdGhlcndpc2UsIHByZXNzZWQgaXMgZmFsc2VcbiAgY29uc3QgcHJlc3NlZCA9IGVsLmhhc0F0dHJpYnV0ZShQUkVTU0VEKVxuICAgICYmIGVsLmdldEF0dHJpYnV0ZShQUkVTU0VEKSAhPT0gJ3RydWUnO1xuXG4gIGNvbnN0IGZpZWxkcyA9IHJlc29sdmVJZFJlZnMoZWwuZ2V0QXR0cmlidXRlKENPTlRST0xTKSk7XG4gIGZvckVhY2goZmllbGRzLCBmaWVsZCA9PiB0b2dnbGVGaWVsZE1hc2soZmllbGQsIHByZXNzZWQpKTtcblxuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShTSE9XX0FUVFIpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFNIT1dfQVRUUiwgZWwudGV4dENvbnRlbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hvd1RleHQgPSBlbC5nZXRBdHRyaWJ1dGUoU0hPV19BVFRSKTtcbiAgY29uc3QgaGlkZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoSElERV9BVFRSKSB8fCBnZXRIaWRlVGV4dChzaG93VGV4dCk7XG5cbiAgZWwudGV4dENvbnRlbnQgPSBwcmVzc2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDtcbiAgZWwuc2V0QXR0cmlidXRlKFBSRVNTRUQsIHByZXNzZWQpO1xuICByZXR1cm4gcHJlc3NlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBFWFBBTkRFRCA9ICdhcmlhLWV4cGFuZGVkJztcbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgSElEREVOID0gJ2FyaWEtaGlkZGVuJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuXG4gIGlmICh0eXBlb2YgZXhwYW5kZWQgIT09ICdib29sZWFuJykge1xuICAgIGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09ICdmYWxzZSc7XG4gIH1cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShFWFBBTkRFRCwgZXhwYW5kZWQpO1xuXG4gIGNvbnN0IGlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShDT05UUk9MUyk7XG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ05vIHRvZ2dsZSB0YXJnZXQgZm91bmQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInXG4gICAgKTtcbiAgfVxuXG4gIGNvbnRyb2xzLnNldEF0dHJpYnV0ZShISURERU4sICFleHBhbmRlZCk7XG4gIHJldHVybiBleHBhbmRlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBkYXRhc2V0ID0gcmVxdWlyZSgnZWxlbS1kYXRhc2V0Jyk7XG5cbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcbmNvbnN0IENIRUNLRUQgPSAnYXJpYS1jaGVja2VkJztcbmNvbnN0IENIRUNLRURfQ0xBU1MgPSBgJHtQUkVGSVh9Y2hlY2tsaXN0LWNoZWNrZWRgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRlIChlbCkge1xuICBjb25zdCBkYXRhID0gZGF0YXNldChlbCk7XG4gIGNvbnN0IGlkID0gZGF0YS52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID0gaWQuY2hhckF0KDApID09PSAnIydcbiAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgaWYgKCFjaGVja0xpc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImBcbiAgICApO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgIGlmIChrZXkuc3RhcnRzV2l0aCgndmFsaWRhdGUnKSkge1xuICAgICAgY29uc3QgdmFsaWRhdG9yTmFtZSA9IGtleS5zdWJzdHIoJ3ZhbGlkYXRlJy5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cChkYXRhWyBrZXkgXSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuICAgICAgaWYgKCF2YWxpZGF0b3JDaGVja2JveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYE5vIHZhbGlkYXRvciBjaGVja2JveCBmb3VuZCBmb3I6IFwiJHt2YWxpZGF0b3JOYW1lfVwiYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGVja2VkID0gdmFsaWRhdG9yUGF0dGVybi50ZXN0KGVsLnZhbHVlKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LmNsYXNzTGlzdC50b2dnbGUoQ0hFQ0tFRF9DTEFTUywgY2hlY2tlZCk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5zZXRBdHRyaWJ1dGUoQ0hFQ0tFRCwgY2hlY2tlZCk7XG4gICAgfVxuICB9XG59OyIsIi8qIVxuICogUGlrYWRheVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0IERhdmlkIEJ1c2hlbGwgfCBCU0QgJiBNSVQgbGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9kYnVzaGVsbC9QaWthZGF5XG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBtb21lbnQ7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBDb21tb25KUyBtb2R1bGVcbiAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICB0cnkgeyBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KG1vbWVudCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKHJlcSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICAgICAgdmFyIGlkID0gJ21vbWVudCc7XG4gICAgICAgICAgICB0cnkgeyBtb21lbnQgPSByZXEoaWQpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkobW9tZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5QaWthZGF5ID0gZmFjdG9yeShyb290Lm1vbWVudCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIGZlYXR1cmUgZGV0ZWN0aW9uIGFuZCBoZWxwZXIgZnVuY3Rpb25zXG4gICAgICovXG4gICAgdmFyIGhhc01vbWVudCA9IHR5cGVvZiBtb21lbnQgPT09ICdmdW5jdGlvbicsXG5cbiAgICBoYXNFdmVudExpc3RlbmVycyA9ICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAgIHN0byA9IHdpbmRvdy5zZXRUaW1lb3V0LFxuXG4gICAgYWRkRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmltID0gZnVuY3Rpb24oc3RyKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCcnKTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICByZXR1cm4gKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbiArICcgJykgIT09IC0xO1xuICAgIH0sXG5cbiAgICBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIGlmICghaGFzQ2xhc3MoZWwsIGNuKSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKGVsLmNsYXNzTmFtZSA9PT0gJycpID8gY24gOiBlbC5jbGFzc05hbWUgKyAnICcgKyBjbjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRyaW0oKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykucmVwbGFjZSgnICcgKyBjbiArICcgJywgJyAnKSk7XG4gICAgfSxcblxuICAgIGlzQXJyYXkgPSBmdW5jdGlvbihvYmopXG4gICAge1xuICAgICAgICByZXR1cm4gKC9BcnJheS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpO1xuICAgIH0sXG5cbiAgICBpc0RhdGUgPSBmdW5jdGlvbihvYmopXG4gICAge1xuICAgICAgICByZXR1cm4gKC9EYXRlLykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgJiYgIWlzTmFOKG9iai5nZXRUaW1lKCkpO1xuICAgIH0sXG5cbiAgICBpc1dlZWtlbmQgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgIHJldHVybiBkYXkgPT09IDAgfHwgZGF5ID09PSA2O1xuICAgIH0sXG5cbiAgICBpc0xlYXBZZWFyID0gZnVuY3Rpb24oeWVhcilcbiAgICB7XG4gICAgICAgIC8vIHNvbHV0aW9uIGJ5IE1hdHRpIFZpcmtrdW5lbjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDg4MTk1MVxuICAgICAgICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xuICAgIH0sXG5cbiAgICBnZXREYXlzSW5Nb250aCA9IGZ1bmN0aW9uKHllYXIsIG1vbnRoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFszMSwgaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVttb250aF07XG4gICAgfSxcblxuICAgIHNldFRvU3RhcnRPZkRheSA9IGZ1bmN0aW9uKGRhdGUpXG4gICAge1xuICAgICAgICBpZiAoaXNEYXRlKGRhdGUpKSBkYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICAgIH0sXG5cbiAgICBjb21wYXJlRGF0ZXMgPSBmdW5jdGlvbihhLGIpXG4gICAge1xuICAgICAgICAvLyB3ZWFrIGRhdGUgY29tcGFyaXNvbiAodXNlIHNldFRvU3RhcnRPZkRheShkYXRlKSB0byBlbnN1cmUgY29ycmVjdCByZXN1bHQpXG4gICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XG4gICAgfSxcblxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKHRvLCBmcm9tLCBvdmVyd3JpdGUpXG4gICAge1xuICAgICAgICB2YXIgcHJvcCwgaGFzUHJvcDtcbiAgICAgICAgZm9yIChwcm9wIGluIGZyb20pIHtcbiAgICAgICAgICAgIGhhc1Byb3AgPSB0b1twcm9wXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGhhc1Byb3AgJiYgdHlwZW9mIGZyb21bcHJvcF0gPT09ICdvYmplY3QnICYmIGZyb21bcHJvcF0gIT09IG51bGwgJiYgZnJvbVtwcm9wXS5ub2RlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGF0ZShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IG5ldyBEYXRlKGZyb21bcHJvcF0uZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZXh0ZW5kKHt9LCBmcm9tW3Byb3BdLCBvdmVyd3JpdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlIHx8ICFoYXNQcm9wKSB7XG4gICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0bztcbiAgICB9LFxuXG4gICAgZmlyZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGV2ZW50TmFtZSwgZGF0YSlcbiAgICB7XG4gICAgICAgIHZhciBldjtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5maXJlRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZXYpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkanVzdENhbGVuZGFyID0gZnVuY3Rpb24oY2FsZW5kYXIpIHtcbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoIDwgMCkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciAtPSBNYXRoLmNlaWwoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoICs9IDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA+IDExKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyICs9IE1hdGguZmxvb3IoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoIC09IDEyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxlbmRhcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVmYXVsdHMgYW5kIGxvY2FsaXNhdGlvblxuICAgICAqL1xuICAgIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIC8vIGJpbmQgdGhlIHBpY2tlciB0byBhIGZvcm0gZmllbGRcbiAgICAgICAgZmllbGQ6IG51bGwsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBzaG93L2hpZGUgdGhlIHBpY2tlciBvbiBgZmllbGRgIGZvY3VzIChkZWZhdWx0IGB0cnVlYCBpZiBgZmllbGRgIGlzIHNldClcbiAgICAgICAgYm91bmQ6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZGF0ZXBpY2tlciwgcmVsYXRpdmUgdG8gdGhlIGZpZWxkIChkZWZhdWx0IHRvIGJvdHRvbSAmIGxlZnQpXG4gICAgICAgIC8vICgnYm90dG9tJyAmICdsZWZ0JyBrZXl3b3JkcyBhcmUgbm90IHVzZWQsICd0b3AnICYgJ3JpZ2h0JyBhcmUgbW9kaWZpZXIgb24gdGhlIGJvdHRvbS9sZWZ0IHBvc2l0aW9uKVxuICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbSBsZWZ0JyxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGZpdCBpbiB0aGUgdmlld3BvcnQgZXZlbiBpZiBpdCBtZWFucyByZXBvc2l0aW9uaW5nIGZyb20gdGhlIHBvc2l0aW9uIG9wdGlvblxuICAgICAgICByZXBvc2l0aW9uOiB0cnVlLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IG91dHB1dCBmb3JtYXQgZm9yIGAudG9TdHJpbmcoKWAgYW5kIGBmaWVsZGAgdmFsdWVcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCcsXG5cbiAgICAgICAgLy8gdGhlIHRvU3RyaW5nIGZ1bmN0aW9uIHdoaWNoIGdldHMgcGFzc2VkIGEgY3VycmVudCBkYXRlIG9iamVjdCBhbmQgZm9ybWF0XG4gICAgICAgIC8vIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gICAgICAgIHRvU3RyaW5nOiBudWxsLFxuXG4gICAgICAgIC8vIHVzZWQgdG8gY3JlYXRlIGRhdGUgb2JqZWN0IGZyb20gY3VycmVudCBpbnB1dCBzdHJpbmdcbiAgICAgICAgcGFyc2U6IG51bGwsXG5cbiAgICAgICAgLy8gdGhlIGluaXRpYWwgZGF0ZSB0byB2aWV3IHdoZW4gZmlyc3Qgb3BlbmVkXG4gICAgICAgIGRlZmF1bHREYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGBkZWZhdWx0RGF0ZWAgdGhlIGluaXRpYWwgc2VsZWN0ZWQgdmFsdWVcbiAgICAgICAgc2V0RGVmYXVsdERhdGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIGZpcnN0IGRheSBvZiB3ZWVrICgwOiBTdW5kYXksIDE6IE1vbmRheSBldGMpXG4gICAgICAgIGZpcnN0RGF5OiAwLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IGZsYWcgZm9yIG1vbWVudCdzIHN0cmljdCBkYXRlIHBhcnNpbmdcbiAgICAgICAgZm9ybWF0U3RyaWN0OiBmYWxzZSxcblxuICAgICAgICAvLyB0aGUgbWluaW11bS9lYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1pbkRhdGU6IG51bGwsXG4gICAgICAgIC8vIHRoZSBtYXhpbXVtL2xhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1heERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbnVtYmVyIG9mIHllYXJzIGVpdGhlciBzaWRlLCBvciBhcnJheSBvZiB1cHBlci9sb3dlciByYW5nZVxuICAgICAgICB5ZWFyUmFuZ2U6IDEwLFxuXG4gICAgICAgIC8vIHNob3cgd2VlayBudW1iZXJzIGF0IGhlYWQgb2Ygcm93XG4gICAgICAgIHNob3dXZWVrTnVtYmVyOiBmYWxzZSxcblxuICAgICAgICAvLyBXZWVrIHBpY2tlciBtb2RlXG4gICAgICAgIHBpY2tXaG9sZVdlZWs6IGZhbHNlLFxuXG4gICAgICAgIC8vIHVzZWQgaW50ZXJuYWxseSAoZG9uJ3QgY29uZmlnIG91dHNpZGUpXG4gICAgICAgIG1pblllYXI6IDAsXG4gICAgICAgIG1heFllYXI6IDk5OTksXG4gICAgICAgIG1pbk1vbnRoOiB1bmRlZmluZWQsXG4gICAgICAgIG1heE1vbnRoOiB1bmRlZmluZWQsXG5cbiAgICAgICAgc3RhcnRSYW5nZTogbnVsbCxcbiAgICAgICAgZW5kUmFuZ2U6IG51bGwsXG5cbiAgICAgICAgaXNSVEw6IGZhbHNlLFxuXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgdGV4dCB0byBhcHBlbmQgdG8gdGhlIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHllYXJTdWZmaXg6ICcnLFxuXG4gICAgICAgIC8vIFJlbmRlciB0aGUgbW9udGggYWZ0ZXIgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgc2hvd01vbnRoQWZ0ZXJZZWFyOiBmYWxzZSxcblxuICAgICAgICAvLyBSZW5kZXIgZGF5cyBvZiB0aGUgY2FsZW5kYXIgZ3JpZCB0aGF0IGZhbGwgaW4gdGhlIG5leHQgb3IgcHJldmlvdXMgbW9udGhcbiAgICAgICAgc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogZmFsc2UsXG5cbiAgICAgICAgLy8gQWxsb3dzIHVzZXIgdG8gc2VsZWN0IGRheXMgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIGVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogZmFsc2UsXG5cbiAgICAgICAgLy8gaG93IG1hbnkgbW9udGhzIGFyZSB2aXNpYmxlXG4gICAgICAgIG51bWJlck9mTW9udGhzOiAxLFxuXG4gICAgICAgIC8vIHdoZW4gbnVtYmVyT2ZNb250aHMgaXMgdXNlZCwgdGhpcyB3aWxsIGhlbHAgeW91IHRvIGNob29zZSB3aGVyZSB0aGUgbWFpbiBjYWxlbmRhciB3aWxsIGJlIChkZWZhdWx0IGBsZWZ0YCwgY2FuIGJlIHNldCB0byBgcmlnaHRgKVxuICAgICAgICAvLyBvbmx5IHVzZWQgZm9yIHRoZSBmaXJzdCBkaXNwbGF5IG9yIHdoZW4gYSBzZWxlY3RlZCBkYXRlIGlzIG5vdCB2aXNpYmxlXG4gICAgICAgIG1haW5DYWxlbmRhcjogJ2xlZnQnLFxuXG4gICAgICAgIC8vIFNwZWNpZnkgYSBET00gZWxlbWVudCB0byByZW5kZXIgdGhlIGNhbGVuZGFyIGluXG4gICAgICAgIGNvbnRhaW5lcjogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIEJsdXIgZmllbGQgd2hlbiBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIGJsdXJGaWVsZE9uU2VsZWN0IDogdHJ1ZSxcblxuICAgICAgICAvLyBpbnRlcm5hdGlvbmFsaXphdGlvblxuICAgICAgICBpMThuOiB7XG4gICAgICAgICAgICBwcmV2aW91c01vbnRoIDogJ1ByZXZpb3VzIE1vbnRoJyxcbiAgICAgICAgICAgIG5leHRNb250aCAgICAgOiAnTmV4dCBNb250aCcsXG4gICAgICAgICAgICBtb250aHMgICAgICAgIDogWydKYW51YXJ5JywnRmVicnVhcnknLCdNYXJjaCcsJ0FwcmlsJywnTWF5JywnSnVuZScsJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxuICAgICAgICAgICAgd2Vla2RheXMgICAgICA6IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXSxcbiAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQgOiBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhlbWUgQ2xhc3NuYW1lXG4gICAgICAgIHRoZW1lOiBudWxsLFxuXG4gICAgICAgIC8vIGV2ZW50cyBhcnJheVxuICAgICAgICBldmVudHM6IFtdLFxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIG9uU2VsZWN0OiBudWxsLFxuICAgICAgICBvbk9wZW46IG51bGwsXG4gICAgICAgIG9uQ2xvc2U6IG51bGwsXG4gICAgICAgIG9uRHJhdzogbnVsbCxcblxuICAgICAgICAvLyBFbmFibGUga2V5Ym9hcmQgaW5wdXRcbiAgICAgICAga2V5Ym9hcmRJbnB1dDogdHJ1ZVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIHRlbXBsYXRpbmcgZnVuY3Rpb25zIHRvIGFic3RyYWN0IEhUTUwgcmVuZGVyaW5nXG4gICAgICovXG4gICAgcmVuZGVyRGF5TmFtZSA9IGZ1bmN0aW9uKG9wdHMsIGRheSwgYWJicilcbiAgICB7XG4gICAgICAgIGRheSArPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICB3aGlsZSAoZGF5ID49IDcpIHtcbiAgICAgICAgICAgIGRheSAtPSA3O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhYmJyID8gb3B0cy5pMThuLndlZWtkYXlzU2hvcnRbZGF5XSA6IG9wdHMuaTE4bi53ZWVrZGF5c1tkYXldO1xuICAgIH0sXG5cbiAgICByZW5kZXJEYXkgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICB2YXIgYXJpYVNlbGVjdGVkID0gJ2ZhbHNlJztcbiAgICAgICAgaWYgKG9wdHMuaXNFbXB0eSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRocykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKCdpcy1vdXRzaWRlLWN1cnJlbnQtbW9udGgnKTtcblxuICAgICAgICAgICAgICAgIGlmKCFvcHRzLmVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRocykge1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwiaXMtZW1wdHlcIj48L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNUb2RheSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXRvZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBhcmlhU2VsZWN0ZWQgPSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaGFzRXZlbnQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdoYXMtZXZlbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0luUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1pbnJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc3RhcnRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRW5kUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1lbmRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRkIGRhdGEtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiIGNsYXNzPVwiJyArIGFyci5qb2luKCcgJykgKyAnXCIgYXJpYS1zZWxlY3RlZD1cIicgKyBhcmlhU2VsZWN0ZWQgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwicGlrYS1idXR0b24gcGlrYS1kYXlcIiB0eXBlPVwiYnV0dG9uXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLXBpa2EteWVhcj1cIicgKyBvcHRzLnllYXIgKyAnXCIgZGF0YS1waWthLW1vbnRoPVwiJyArIG9wdHMubW9udGggKyAnXCIgZGF0YS1waWthLWRheT1cIicgKyBvcHRzLmRheSArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZGF5ICtcbiAgICAgICAgICAgICAgICAgJzwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyV2VlayA9IGZ1bmN0aW9uIChkLCBtLCB5KSB7XG4gICAgICAgIC8vIExpZnRlZCBmcm9tIGh0dHA6Ly9qYXZhc2NyaXB0LmFib3V0LmNvbS9saWJyYXJ5L2Jsd2Vla3llYXIuaHRtLCBsaWdodGx5IG1vZGlmaWVkLlxuICAgICAgICB2YXIgb25lamFuID0gbmV3IERhdGUoeSwgMCwgMSksXG4gICAgICAgICAgICB3ZWVrTnVtID0gTWF0aC5jZWlsKCgoKG5ldyBEYXRlKHksIG0sIGQpIC0gb25lamFuKSAvIDg2NDAwMDAwKSArIG9uZWphbi5nZXREYXkoKSsxKS83KTtcbiAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJwaWthLXdlZWtcIj4nICsgd2Vla051bSArICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclJvdyA9IGZ1bmN0aW9uKGRheXMsIGlzUlRMLCBwaWNrV2hvbGVXZWVrLCBpc1Jvd1NlbGVjdGVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dHIgY2xhc3M9XCJwaWthLXJvdycgKyAocGlja1dob2xlV2VlayA/ICcgcGljay13aG9sZS13ZWVrJyA6ICcnKSArIChpc1Jvd1NlbGVjdGVkID8gJyBpcy1zZWxlY3RlZCcgOiAnJykgKyAnXCI+JyArIChpc1JUTCA/IGRheXMucmV2ZXJzZSgpIDogZGF5cykuam9pbignJykgKyAnPC90cj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJCb2R5ID0gZnVuY3Rpb24ocm93cylcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRib2R5PicgKyByb3dzLmpvaW4oJycpICsgJzwvdGJvZHk+JztcbiAgICB9LFxuXG4gICAgcmVuZGVySGVhZCA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgaSwgYXJyID0gW107XG4gICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aCBzY29wZT1cImNvbFwiPjxhYmJyIHRpdGxlPVwiJyArIHJlbmRlckRheU5hbWUob3B0cywgaSkgKyAnXCI+JyArIHJlbmRlckRheU5hbWUob3B0cywgaSwgdHJ1ZSkgKyAnPC9hYmJyPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGhlYWQ+PHRyPicgKyAob3B0cy5pc1JUTCA/IGFyci5yZXZlcnNlKCkgOiBhcnIpLmpvaW4oJycpICsgJzwvdHI+PC90aGVhZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUaXRsZSA9IGZ1bmN0aW9uKGluc3RhbmNlLCBjLCB5ZWFyLCBtb250aCwgcmVmWWVhciwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGosIGFycixcbiAgICAgICAgICAgIG9wdHMgPSBpbnN0YW5jZS5fbyxcbiAgICAgICAgICAgIGlzTWluWWVhciA9IHllYXIgPT09IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgIGlzTWF4WWVhciA9IHllYXIgPT09IG9wdHMubWF4WWVhcixcbiAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBpZD1cIicgKyByYW5kSWQgKyAnXCIgY2xhc3M9XCJwaWthLXRpdGxlXCIgcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIj4nLFxuICAgICAgICAgICAgbW9udGhIdG1sLFxuICAgICAgICAgICAgeWVhckh0bWwsXG4gICAgICAgICAgICBwcmV2ID0gdHJ1ZSxcbiAgICAgICAgICAgIG5leHQgPSB0cnVlO1xuXG4gICAgICAgIGZvciAoYXJyID0gW10sIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgKHllYXIgPT09IHJlZlllYXIgPyBpIC0gYyA6IDEyICsgaSAtIGMpICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgKGkgPT09IG1vbnRoID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgK1xuICAgICAgICAgICAgICAgICgoaXNNaW5ZZWFyICYmIGkgPCBvcHRzLm1pbk1vbnRoKSB8fCAoaXNNYXhZZWFyICYmIGkgPiBvcHRzLm1heE1vbnRoKSA/ICdkaXNhYmxlZD1cImRpc2FibGVkXCInIDogJycpICsgJz4nICtcbiAgICAgICAgICAgICAgICBvcHRzLmkxOG4ubW9udGhzW2ldICsgJzwvb3B0aW9uPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9udGhIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIG9wdHMuaTE4bi5tb250aHNbbW9udGhdICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC1tb250aFwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICBpID0gb3B0cy55ZWFyUmFuZ2VbMF07XG4gICAgICAgICAgICBqID0gb3B0cy55ZWFyUmFuZ2VbMV0gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IHllYXIgLSBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgIGogPSAxICsgeWVhciArIG9wdHMueWVhclJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXTsgaSA8IGogJiYgaSA8PSBvcHRzLm1heFllYXI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gb3B0cy5taW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIicgKyAoaSA9PT0geWVhciA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICsgJz4nICsgKGkpICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHllYXJIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIHllYXIgKyBvcHRzLnllYXJTdWZmaXggKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LXllYXJcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChvcHRzLnNob3dNb250aEFmdGVyWWVhcikge1xuICAgICAgICAgICAgaHRtbCArPSB5ZWFySHRtbCArIG1vbnRoSHRtbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh0bWwgKz0gbW9udGhIdG1sICsgeWVhckh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNaW5ZZWFyICYmIChtb250aCA9PT0gMCB8fCBvcHRzLm1pbk1vbnRoID49IG1vbnRoKSkge1xuICAgICAgICAgICAgcHJldiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWF4WWVhciAmJiAobW9udGggPT09IDExIHx8IG9wdHMubWF4TW9udGggPD0gbW9udGgpKSB7XG4gICAgICAgICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtcHJldicgKyAocHJldiA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLnByZXZpb3VzTW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gKGluc3RhbmNlLl9vLm51bWJlck9mTW9udGhzIC0gMSkgKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1uZXh0JyArIChuZXh0ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ubmV4dE1vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbCArPSAnPC9kaXY+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGFibGUgPSBmdW5jdGlvbihvcHRzLCBkYXRhLCByYW5kSWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInBpa2EtdGFibGVcIiByb2xlPVwiZ3JpZFwiIGFyaWEtbGFiZWxsZWRieT1cIicgKyByYW5kSWQgKyAnXCI+JyArIHJlbmRlckhlYWQob3B0cykgKyByZW5kZXJCb2R5KGRhdGEpICsgJzwvdGFibGU+JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBQaWthZGF5IGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgUGlrYWRheSA9IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBvcHRzID0gc2VsZi5jb25maWcob3B0aW9ucyk7XG5cbiAgICAgICAgc2VsZi5fb25Nb3VzZURvd24gPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLWJ1dHRvbicpICYmICFoYXNDbGFzcyh0YXJnZXQsICdpcy1lbXB0eScpICYmICFoYXNDbGFzcyh0YXJnZXQucGFyZW50Tm9kZSwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKG5ldyBEYXRlKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS15ZWFyJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1tb250aCcpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtZGF5JykpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ibHVyRmllbGRPblNlbGVjdCAmJiBvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1wcmV2JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcmV2TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1uZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXh0TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRvdWNoIGV2ZW50IHByZXZlbnQgbW91c2UgZXZlbnRzIGVtdWxhdGlvblxuICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LW1vbnRoJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9Nb250aCh0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QteWVhcicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvWWVhcih0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uS2V5Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5pc1Zpc2libGUoKSkge1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGRhdGU7XG5cbiAgICAgICAgICAgIGlmIChlLmZpcmVkQnkgPT09IHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5wYXJzZSkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBvcHRzLnBhcnNlKG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzTW9tZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1vbWVudChvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCwgb3B0cy5mb3JtYXRTdHJpY3QpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAoZGF0ZSAmJiBkYXRlLmlzVmFsaWQoKSkgPyBkYXRlLnRvRGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEZvY3VzID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2xpY2sgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRCbHVyID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJRSBhbGxvd3MgcGlrYSBkaXYgdG8gZ2FpbiBmb2N1czsgY2F0Y2ggYmx1ciB0aGUgaW5wdXQgZmllbGRcbiAgICAgICAgICAgIHZhciBwRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5fYykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2IgPSBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2MgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNsaWNrID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgICAgICBwRWwgPSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzRXZlbnRMaXN0ZW5lcnMgJiYgaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Lm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQodGFyZ2V0LCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSB8fCBwRWwgPT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuX3YgJiYgdGFyZ2V0ICE9PSBvcHRzLnRyaWdnZXIgJiYgcEVsICE9PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lID0gJ3Bpa2Etc2luZ2xlJyArIChvcHRzLmlzUlRMID8gJyBpcy1ydGwnIDogJycpICsgKG9wdHMudGhlbWUgPyAnICcgKyBvcHRzLnRoZW1lIDogJycpO1xuXG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdtb3VzZWRvd24nLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICd0b3VjaGVuZCcsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcblxuICAgICAgICBpZiAob3B0cy5rZXlib2FyZElucHV0KSB7XG4gICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2tleWRvd24nLCBzZWxmLl9vbktleUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYuZWwsIG9wdHMuZmllbGQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy5maWVsZCwgJ2NoYW5nZScsIHNlbGYuX29uSW5wdXRDaGFuZ2UpO1xuXG4gICAgICAgICAgICBpZiAoIW9wdHMuZGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9tZW50ICYmIG9wdHMuZmllbGQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kZWZhdWx0RGF0ZSA9IG1vbWVudChvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCkudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uob3B0cy5maWVsZC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRzLnNldERlZmF1bHREYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWZEYXRlID0gb3B0cy5kZWZhdWx0RGF0ZTtcblxuICAgICAgICBpZiAoaXNEYXRlKGRlZkRhdGUpKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5zZXREZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShkZWZEYXRlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShkZWZEYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZ290b0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBzZWxmLmVsLmNsYXNzTmFtZSArPSAnIGlzLWJvdW5kJztcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2NsaWNrJywgc2VsZi5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2ZvY3VzJywgc2VsZi5fb25JbnB1dEZvY3VzKTtcbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMudHJpZ2dlciwgJ2JsdXInLCBzZWxmLl9vbklucHV0Qmx1cik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIHB1YmxpYyBQaWthZGF5IEFQSVxuICAgICAqL1xuICAgIFBpa2FkYXkucHJvdG90eXBlID0ge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbmZpZ3VyZSBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAqL1xuICAgICAgICBjb25maWc6IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28gPSBleHRlbmQoe30sIGRlZmF1bHRzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9wdHMgPSBleHRlbmQodGhpcy5fbywgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIG9wdHMuaXNSVEwgPSAhIW9wdHMuaXNSVEw7XG5cbiAgICAgICAgICAgIG9wdHMuZmllbGQgPSAob3B0cy5maWVsZCAmJiBvcHRzLmZpZWxkLm5vZGVOYW1lKSA/IG9wdHMuZmllbGQgOiBudWxsO1xuXG4gICAgICAgICAgICBvcHRzLnRoZW1lID0gKHR5cGVvZiBvcHRzLnRoZW1lKSA9PT0gJ3N0cmluZycgJiYgb3B0cy50aGVtZSA/IG9wdHMudGhlbWUgOiBudWxsO1xuXG4gICAgICAgICAgICBvcHRzLmJvdW5kID0gISEob3B0cy5ib3VuZCAhPT0gdW5kZWZpbmVkID8gb3B0cy5maWVsZCAmJiBvcHRzLmJvdW5kIDogb3B0cy5maWVsZCk7XG5cbiAgICAgICAgICAgIG9wdHMudHJpZ2dlciA9IChvcHRzLnRyaWdnZXIgJiYgb3B0cy50cmlnZ2VyLm5vZGVOYW1lKSA/IG9wdHMudHJpZ2dlciA6IG9wdHMuZmllbGQ7XG5cbiAgICAgICAgICAgIG9wdHMuZGlzYWJsZVdlZWtlbmRzID0gISFvcHRzLmRpc2FibGVXZWVrZW5kcztcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlRGF5Rm4gPSAodHlwZW9mIG9wdHMuZGlzYWJsZURheUZuKSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGlzYWJsZURheUZuIDogbnVsbDtcblxuICAgICAgICAgICAgdmFyIG5vbSA9IHBhcnNlSW50KG9wdHMubnVtYmVyT2ZNb250aHMsIDEwKSB8fCAxO1xuICAgICAgICAgICAgb3B0cy5udW1iZXJPZk1vbnRocyA9IG5vbSA+IDQgPyA0IDogbm9tO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvcHRzLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvcHRzLm1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9wdHMubWluRGF0ZSAmJiBvcHRzLm1heERhdGUpICYmIG9wdHMubWF4RGF0ZSA8IG9wdHMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWluRGF0ZShvcHRzLm1pbkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMubWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGF0ZShvcHRzLm1heERhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShvcHRzLnllYXJSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmFsbGJhY2sgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAxMDtcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVswXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzBdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2VbMV0gPSBwYXJzZUludChvcHRzLnllYXJSYW5nZVsxXSwgMTApIHx8IGZhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IE1hdGguYWJzKHBhcnNlSW50KG9wdHMueWVhclJhbmdlLCAxMCkpIHx8IGRlZmF1bHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy55ZWFyUmFuZ2UgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2UgPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gKHVzaW5nIE1vbWVudC5qcyBpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oZm9ybWF0KVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5fby5mb3JtYXQ7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZSh0aGlzLl9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vLnRvU3RyaW5nKHRoaXMuX2QsIGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy5fZCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZC50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgTW9tZW50LmpzIG9iamVjdCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gKGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIGdldE1vbWVudDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gaGFzTW9tZW50ID8gbW9tZW50KHRoaXMuX2QpIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0IHRoZSBjdXJyZW50IHNlbGVjdGlvbiBmcm9tIGEgTW9tZW50LmpzIG9iamVjdCAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TW9tZW50OiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgbW9tZW50LmlzTW9tZW50KGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUudG9EYXRlKCksIHByZXZlbnRPblNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIERhdGUgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGF0ZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gaXNEYXRlKHRoaXMuX2QpID8gbmV3IERhdGUodGhpcy5fZC5nZXRUaW1lKCkpIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0IHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgc2V0RGF0ZTogZnVuY3Rpb24oZGF0ZSwgcHJldmVudE9uU2VsZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGRhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWluID0gdGhpcy5fby5taW5EYXRlLFxuICAgICAgICAgICAgICAgIG1heCA9IHRoaXMuX28ubWF4RGF0ZTtcblxuICAgICAgICAgICAgaWYgKGlzRGF0ZShtaW4pICYmIGRhdGUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWluO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobWF4KSAmJiBkYXRlID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1heDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh0aGlzLl9kKTtcbiAgICAgICAgICAgIHRoaXMuZ290b0RhdGUodGhpcy5fZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcHJldmVudE9uU2VsZWN0ICYmIHR5cGVvZiB0aGlzLl9vLm9uU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5vblNlbGVjdC5jYWxsKHRoaXMsIHRoaXMuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBkYXRlXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvRGF0ZTogZnVuY3Rpb24oZGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG5ld0NhbGVuZGFyID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGVuZGFycykge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdFZpc2libGVEYXRlID0gbmV3IERhdGUodGhpcy5jYWxlbmRhcnNbMF0ueWVhciwgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ueWVhciwgdGhpcy5jYWxlbmRhcnNbdGhpcy5jYWxlbmRhcnMubGVuZ3RoLTFdLm1vbnRoLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZURhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGVuZCBvZiB0aGUgbW9udGhcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0TW9udGgobGFzdFZpc2libGVEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlLnNldERhdGUobGFzdFZpc2libGVEYXRlLmdldERhdGUoKS0xKTtcbiAgICAgICAgICAgICAgICBuZXdDYWxlbmRhciA9ICh2aXNpYmxlRGF0ZSA8IGZpcnN0VmlzaWJsZURhdGUuZ2V0VGltZSgpIHx8IGxhc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgPCB2aXNpYmxlRGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdDYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28ubWFpbkNhbGVuZGFyID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoICs9IDEgLSB0aGlzLl9vLm51bWJlck9mTW9udGhzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3REYXRlOiBmdW5jdGlvbihzaWduLCBkYXlzKSB7XG5cbiAgICAgICAgICAgIHZhciBkYXkgPSB0aGlzLmdldERhdGUoKSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBwYXJzZUludChkYXlzKSoyNCo2MCo2MCoxMDAwO1xuXG4gICAgICAgICAgICB2YXIgbmV3RGF5O1xuXG4gICAgICAgICAgICBpZiAoc2lnbiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXkgPSBuZXcgRGF0ZShkYXkudmFsdWVPZigpICsgZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNpZ24gPT09ICdzdWJ0cmFjdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXkgPSBuZXcgRGF0ZShkYXkudmFsdWVPZigpIC0gZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShuZXdEYXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdENhbGVuZGFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXSA9IGFkanVzdENhbGVuZGFyKHRoaXMuY2FsZW5kYXJzWzBdKTtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAxOyBjIDwgdGhpcy5fby5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbY10gPSBhZGp1c3RDYWxlbmRhcih7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiB0aGlzLmNhbGVuZGFyc1swXS5tb250aCArIGMsXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IHRoaXMuY2FsZW5kYXJzWzBdLnllYXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdvdG9Ub2RheTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIG1vbnRoICh6ZXJvLWluZGV4LCBlLmcuIDA6IEphbnVhcnkpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvTW9udGg6IGZ1bmN0aW9uKG1vbnRoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1vbnRoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHRNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCsrO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwcmV2TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgtLTtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZnVsbCB5ZWFyIChlLmcuIFwiMjAxMlwiKVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b1llYXI6IGZ1bmN0aW9uKHllYXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oeWVhcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS55ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWluRGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWluRGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5EYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5ZZWFyICA9IHZhbHVlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5Nb250aCA9IHZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IGRlZmF1bHRzLm1pbkRhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5ZZWFyICA9IGRlZmF1bHRzLm1pblllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5Nb250aCA9IGRlZmF1bHRzLm1pbk1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IGRlZmF1bHRzLnN0YXJ0UmFuZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1heERhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1heERhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4RGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IHZhbHVlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IHZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4RGF0ZSA9IGRlZmF1bHRzLm1heERhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhZZWFyID0gZGVmYXVsdHMubWF4WWVhcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heE1vbnRoID0gZGVmYXVsdHMubWF4TW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IGRlZmF1bHRzLmVuZFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTdGFydFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5zdGFydFJhbmdlID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0RW5kUmFuZ2U6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLmVuZFJhbmdlID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlZnJlc2ggdGhlIEhUTUxcbiAgICAgICAgICovXG4gICAgICAgIGRyYXc6IGZ1bmN0aW9uKGZvcmNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3YgJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG1pblllYXIgPSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICAgICAgbWF4WWVhciA9IG9wdHMubWF4WWVhcixcbiAgICAgICAgICAgICAgICBtaW5Nb250aCA9IG9wdHMubWluTW9udGgsXG4gICAgICAgICAgICAgICAgbWF4TW9udGggPSBvcHRzLm1heE1vbnRoLFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJyxcbiAgICAgICAgICAgICAgICByYW5kSWQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl95IDw9IG1pblllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWluWWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1pbk1vbnRoKSAmJiB0aGlzLl9tIDwgbWluTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1pbk1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl95ID49IG1heFllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWF4WWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1heE1vbnRoKSAmJiB0aGlzLl9tID4gbWF4TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1heE1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZElkID0gJ3Bpa2EtdGl0bGUtJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoL1teYS16XSsvZywgJycpLnN1YnN0cigwLCAyKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBvcHRzLm51bWJlck9mTW9udGhzOyBjKyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicGlrYS1sZW5kYXJcIj4nICsgcmVuZGVyVGl0bGUodGhpcywgYywgdGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHRoaXMuY2FsZW5kYXJzWzBdLnllYXIsIHJhbmRJZCkgKyB0aGlzLnJlbmRlcih0aGlzLmNhbGVuZGFyc1tjXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1tjXS5tb250aCwgcmFuZElkKSArICc8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0cy5maWVsZC50eXBlICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX28ub25EcmF3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5vbkRyYXcodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHRoZSBzY3JlZW4gcmVhZGVyIHVzZXIga25vdyB0byB1c2UgYXJyb3cga2V5c1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzZSB0aGUgYXJyb3cga2V5cyB0byBwaWNrIGEgZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdFBvc2l0aW9uOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCwgcEVsLCB3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgc2Nyb2xsVG9wLCBsZWZ0LCB0b3AsIGNsaWVudFJlY3Q7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgICAgICAgZmllbGQgPSB0aGlzLl9vLnRyaWdnZXI7XG4gICAgICAgICAgICBwRWwgPSBmaWVsZDtcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5lbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjbGllbnRSZWN0ID0gZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGNsaWVudFJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgICAgICAgICB0b3AgPSBjbGllbnRSZWN0LmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCAgPSBwRWwub2Zmc2V0VG9wICsgcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aGlsZSgocEVsID0gcEVsLm9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCArPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICArPSBwRWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCBwb3NpdGlvbiBpcyBib3R0b20gJiBsZWZ0XG4gICAgICAgICAgICBpZiAoKHRoaXMuX28ucmVwb3NpdGlvbiAmJiBsZWZ0ICsgd2lkdGggPiB2aWV3cG9ydFdpZHRoKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCdyaWdodCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgdG9wICsgaGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgKyBzY3JvbGxUb3ApIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3RvcCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0ID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRvcCA9IHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlbmRlciBIVE1MIGZvciBhIHBhcnRpY3VsYXIgbW9udGhcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIHJhbmRJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgICA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbm93ICAgID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXlzICAgPSBnZXREYXlzSW5Nb250aCh5ZWFyLCBtb250aCksXG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGRhdGEgICA9IFtdLFxuICAgICAgICAgICAgICAgIHJvdyAgICA9IFtdO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KG5vdyk7XG4gICAgICAgICAgICBpZiAob3B0cy5maXJzdERheSA+IDApIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgLT0gb3B0cy5maXJzdERheTtcbiAgICAgICAgICAgICAgICBpZiAoYmVmb3JlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBiZWZvcmUgKz0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIDEsXG4gICAgICAgICAgICAgICAgbmV4dE1vbnRoID0gbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgMSxcbiAgICAgICAgICAgICAgICB5ZWFyT2ZQcmV2aW91c01vbnRoID0gbW9udGggPT09IDAgPyB5ZWFyIC0gMSA6IHllYXIsXG4gICAgICAgICAgICAgICAgeWVhck9mTmV4dE1vbnRoID0gbW9udGggPT09IDExID8geWVhciArIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIGRheXNJblByZXZpb3VzTW9udGggPSBnZXREYXlzSW5Nb250aCh5ZWFyT2ZQcmV2aW91c01vbnRoLCBwcmV2aW91c01vbnRoKTtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IGRheXMgKyBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSBjZWxscztcbiAgICAgICAgICAgIHdoaWxlKGFmdGVyID4gNykge1xuICAgICAgICAgICAgICAgIGFmdGVyIC09IDc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscyArPSA3IC0gYWZ0ZXI7XG4gICAgICAgICAgICB2YXIgaXNXZWVrU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByID0gMDsgaSA8IGNlbGxzOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxICsgKGkgLSBiZWZvcmUpKSxcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IGlzRGF0ZSh0aGlzLl9kKSA/IGNvbXBhcmVEYXRlcyhkYXksIHRoaXMuX2QpIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPSBjb21wYXJlRGF0ZXMoZGF5LCBub3cpLFxuICAgICAgICAgICAgICAgICAgICBoYXNFdmVudCA9IG9wdHMuZXZlbnRzLmluZGV4T2YoZGF5LnRvRGF0ZVN0cmluZygpKSAhPT0gLTEgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlzRW1wdHkgPSBpIDwgYmVmb3JlIHx8IGkgPj0gKGRheXMgKyBiZWZvcmUpLFxuICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSAxICsgKGkgLSBiZWZvcmUpLFxuICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IG1vbnRoLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhcixcbiAgICAgICAgICAgICAgICAgICAgaXNTdGFydFJhbmdlID0gb3B0cy5zdGFydFJhbmdlICYmIGNvbXBhcmVEYXRlcyhvcHRzLnN0YXJ0UmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2UgPSBvcHRzLmVuZFJhbmdlICYmIGNvbXBhcmVEYXRlcyhvcHRzLmVuZFJhbmdlLCBkYXkpLFxuICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgb3B0cy5lbmRSYW5nZSAmJiBvcHRzLnN0YXJ0UmFuZ2UgPCBkYXkgJiYgZGF5IDwgb3B0cy5lbmRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZCA9IChvcHRzLm1pbkRhdGUgJiYgZGF5IDwgb3B0cy5taW5EYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMubWF4RGF0ZSAmJiBkYXkgPiBvcHRzLm1heERhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5kaXNhYmxlV2Vla2VuZHMgJiYgaXNXZWVrZW5kKGRheSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5kaXNhYmxlRGF5Rm4gJiYgb3B0cy5kaXNhYmxlRGF5Rm4oZGF5KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGJlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gZGF5c0luUHJldmlvdXNNb250aCArIGRheU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gcHJldmlvdXNNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyT2ZQcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gZGF5TnVtYmVyIC0gZGF5cztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZk5leHRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkYXlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6IGRheU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHllYXJOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFdmVudDogaGFzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBpc1NlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb2RheTogaXNUb2RheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VtcHR5OiBpc0VtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdGFydFJhbmdlOiBpc1N0YXJ0UmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VuZFJhbmdlOiBpc0VuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNJblJhbmdlOiBpc0luUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5waWNrV2hvbGVXZWVrICYmIGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNXZWVrU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHJlbmRlckRheShkYXlDb25maWcpKTtcblxuICAgICAgICAgICAgICAgIGlmICgrK3IgPT09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy51bnNoaWZ0KHJlbmRlcldlZWsoaSAtIGJlZm9yZSwgbW9udGgsIHllYXIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2gocmVuZGVyUm93KHJvdywgb3B0cy5pc1JUTCwgb3B0cy5waWNrV2hvbGVXZWVrLCBpc1dlZWtTZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlzV2Vla1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlclRhYmxlKG9wdHMsIGRhdGEsIHJhbmRJZCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNWaXNpYmxlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX28ub25PcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ub25PcGVuLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHYgPSB0aGlzLl92O1xuICAgICAgICAgICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7IC8vIHJlc2V0XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWwsICdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdGhpcy5fby5vbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR0FNRSBPVkVSXG4gICAgICAgICAqL1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbztcblxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChvcHRzLmtleWJvYXJkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleUNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCB0aGlzLl9vbklucHV0Q2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHRoaXMuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2ZvY3VzJywgdGhpcy5fb25JbnB1dEZvY3VzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHRoaXMuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5lbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIFBpa2FkYXk7XG59KSk7XG4iXX0=
