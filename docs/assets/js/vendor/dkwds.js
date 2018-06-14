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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/is-in-viewport":39,"../utils/toggle":43,"array-filter":1,"array-foreach":2,"object-assign":9}],18:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/toggle":43}],19:[function(require,module,exports){
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
        that.formatInputs();
        that.validateInputs();
      });

      this.monthInputElement.addEventListener("blur", function () {
        that.formatInputs();
        that.validateInputs();
      });

      this.yearInputElement.addEventListener("blur", function () {
        that.formatInputs();
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

      this.dayInputElement.value = this.dayFormat(day);
      this.monthInputElement.value = this.monthFormat(month);
      this.yearInputElement.value = year;
    }

    //adds 0 at the front of day number

  }, {
    key: 'dayFormat',
    value: function dayFormat(day) {
      return ("0" + day).slice(-2);
    }
  }, {
    key: 'monthFormat',
    value: function monthFormat(month) {
      return ("0" + month).slice(-2);
    }
  }, {
    key: 'formatInputs',
    value: function formatInputs() {
      var day = parseInt(this.dayInputElement.value);
      var month = parseInt(this.monthInputElement.value);

      this.dayInputElement.value = this.dayFormat(day);
      this.monthInputElement.value = this.monthFormat(month);
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

},{"../../vendor/pikaday.js":46,"../utils/behavior":37,"../utils/closest":38,"../utils/select":40}],20:[function(require,module,exports){
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

},{"../utils/behavior":37,"../utils/closest":38,"../utils/select":40,"array-foreach":2}],21:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/select":40,"./accordion":17,"array-foreach":2,"lodash.debounce":8}],22:[function(require,module,exports){
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
"use strict";

var domready = require('domready');

/**
 * Import modal lib.
 * https://micromodal.now.sh
 */
var microModal = require("../../vendor/micromodal.js");
domready(function () {
  microModal.init(); //init all modals
});

},{"../../vendor/micromodal.js":45,"domready":5}],24:[function(require,module,exports){
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

},{"../utils/behavior":37,"../utils/closest":38,"../utils/select":40,"array-foreach":2}],25:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/select":40,"./accordion":17,"array-foreach":2,"object-assign":9}],26:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/toggle-form-input":42}],27:[function(require,module,exports){

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

},{"../utils/behavior":37}],28:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"../utils/select":40,"array-foreach":2,"object-assign":9,"receptor/ignore":14}],29:[function(require,module,exports){
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

},{"../config":31,"../events":33,"../utils/behavior":37,"receptor/once":15}],30:[function(require,module,exports){
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

},{"../utils/behavior":37,"../utils/validate-input":44,"lodash.debounce":8}],31:[function(require,module,exports){
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

},{"./components":22,"./components/datepicker":19,"./components/modal":23,"./config":31,"./polyfills":35,"./utils/select":40,"array-foreach":2,"domready":5}],33:[function(require,module,exports){
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
require('./object-assign');

},{"./element-hidden":34,"./object-assign":36,"classlist-polyfill":4}],36:[function(require,module,exports){
'use strict';

//Object assign not implemented in IE11, polyfill below: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) {
			// .length of function is 2
			'use strict';

			if (target == null) {
				// TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) {
					// Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}

},{}],37:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":9,"receptor/behavior":10}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"./select":40,"./toggle-field-mask":41,"array-foreach":2,"resolve-id-refs":16}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"../config":31,"elem-dataset":6}],45:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.MicroModal = factory();
})(undefined, function () {
  'use strict';

  var version = "0.3.1";

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var toConsumableArray = function toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var MicroModal = function () {

    var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

    var Modal = function () {
      function Modal(_ref) {
        var targetModal = _ref.targetModal,
            _ref$triggers = _ref.triggers,
            triggers = _ref$triggers === undefined ? [] : _ref$triggers,
            _ref$onShow = _ref.onShow,
            onShow = _ref$onShow === undefined ? function () {} : _ref$onShow,
            _ref$onClose = _ref.onClose,
            onClose = _ref$onClose === undefined ? function () {} : _ref$onClose,
            _ref$openTrigger = _ref.openTrigger,
            openTrigger = _ref$openTrigger === undefined ? 'data-micromodal-trigger' : _ref$openTrigger,
            _ref$closeTrigger = _ref.closeTrigger,
            closeTrigger = _ref$closeTrigger === undefined ? 'data-micromodal-close' : _ref$closeTrigger,
            _ref$disableScroll = _ref.disableScroll,
            disableScroll = _ref$disableScroll === undefined ? false : _ref$disableScroll,
            _ref$disableFocus = _ref.disableFocus,
            disableFocus = _ref$disableFocus === undefined ? false : _ref$disableFocus,
            _ref$awaitCloseAnimat = _ref.awaitCloseAnimation,
            awaitCloseAnimation = _ref$awaitCloseAnimat === undefined ? false : _ref$awaitCloseAnimat,
            _ref$debugMode = _ref.debugMode,
            debugMode = _ref$debugMode === undefined ? false : _ref$debugMode;
        classCallCheck(this, Modal);

        // Save a reference of the modal
        this.modal = document.getElementById(targetModal);

        // Save a reference to the passed config
        this.config = { debugMode: debugMode, disableScroll: disableScroll, openTrigger: openTrigger, closeTrigger: closeTrigger, onShow: onShow, onClose: onClose, awaitCloseAnimation: awaitCloseAnimation, disableFocus: disableFocus

          // Register click events only if prebinding eventListeners
        };if (triggers.length > 0) this.registerTriggers.apply(this, toConsumableArray(triggers));

        // prebind functions for event listeners
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
      }

      /**
       * Loops through all openTriggers and binds click event
       * @param  {array} triggers [Array of node elements]
       * @return {void}
       */

      createClass(Modal, [{
        key: 'registerTriggers',
        value: function registerTriggers() {
          var _this = this;

          for (var _len = arguments.length, triggers = Array(_len), _key = 0; _key < _len; _key++) {
            triggers[_key] = arguments[_key];
          }

          triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
              return _this.showModal();
            });
          });
        }
      }, {
        key: 'showModal',
        value: function showModal() {
          this.activeElement = document.activeElement;
          this.modal.setAttribute('aria-hidden', 'false');
          this.modal.classList.add('is-open');
          this.setFocusToFirstNode();
          this.scrollBehaviour('disable');
          this.addEventListeners();
          this.config.onShow(this.modal);
        }
      }, {
        key: 'closeModal',
        value: function closeModal() {
          var modal = this.modal;
          this.modal.setAttribute('aria-hidden', 'true');
          this.removeEventListeners();
          this.scrollBehaviour('enable');
          this.activeElement.focus();
          this.config.onClose(this.modal);

          if (this.config.awaitCloseAnimation) {
            this.modal.addEventListener('animationend', function handler() {
              modal.classList.remove('is-open');
              modal.removeEventListener('animationend', handler, false);
            }, false);
          } else {
            modal.classList.remove('is-open');
          }
        }
      }, {
        key: 'scrollBehaviour',
        value: function scrollBehaviour(toggle) {
          if (!this.config.disableScroll) return;
          var body = document.querySelector('body');
          switch (toggle) {
            case 'enable':
              Object.assign(body.style, { overflow: 'initial', height: 'initial' });
              break;
            case 'disable':
              Object.assign(body.style, { overflow: 'hidden', height: '100vh' });
              break;
            default:
          }
        }
      }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
          this.modal.addEventListener('touchstart', this.onClick);
          this.modal.addEventListener('click', this.onClick);
          document.addEventListener('keydown', this.onKeydown);
        }
      }, {
        key: 'removeEventListeners',
        value: function removeEventListeners() {
          this.modal.removeEventListener('touchstart', this.onClick);
          this.modal.removeEventListener('click', this.onClick);
          document.removeEventListener('keydown', this.onKeydown);
        }
      }, {
        key: 'onClick',
        value: function onClick(event) {
          if (event.target.hasAttribute(this.config.closeTrigger)) {
            this.closeModal();
            event.preventDefault();
          }
        }
      }, {
        key: 'onKeydown',
        value: function onKeydown(event) {
          if (event.keyCode === 27) this.closeModal(event);
          if (event.keyCode === 9) this.maintainFocus(event);
        }
      }, {
        key: 'getFocusableNodes',
        value: function getFocusableNodes() {
          var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
          return Object.keys(nodes).map(function (key) {
            return nodes[key];
          });
        }
      }, {
        key: 'setFocusToFirstNode',
        value: function setFocusToFirstNode() {
          if (this.config.disableFocus) return;
          var focusableNodes = this.getFocusableNodes();
          if (focusableNodes.length) focusableNodes[0].focus();
        }
      }, {
        key: 'maintainFocus',
        value: function maintainFocus(event) {
          var focusableNodes = this.getFocusableNodes();

          // if disableFocus is true
          if (!this.modal.contains(document.activeElement)) {
            focusableNodes[0].focus();
          } else {
            var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

            if (event.shiftKey && focusedItemIndex === 0) {
              focusableNodes[focusableNodes.length - 1].focus();
              event.preventDefault();
            }

            if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
              focusableNodes[0].focus();
              event.preventDefault();
            }
          }
        }
      }]);
      return Modal;
    }();

    /**
     * Modal prototype ends.
     * Here on code is reposible for detecting and
     * autobinding event handlers on modal triggers
     */

    // Keep a reference to the opened modal


    var activeModal = null;

    /**
     * Generates an associative array of modals and it's
     * respective triggers
     * @param  {array} triggers     An array of all triggers
     * @param  {string} triggerAttr The data-attribute which triggers the module
     * @return {array}
     */
    var generateTriggerMap = function generateTriggerMap(triggers, triggerAttr) {
      var triggerMap = [];

      triggers.forEach(function (trigger) {
        var targetModal = trigger.attributes[triggerAttr].value;
        if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
        triggerMap[targetModal].push(trigger);
      });

      return triggerMap;
    };

    /**
     * Validates whether a modal of the given id exists
     * in the DOM
     * @param  {number} id  The id of the modal
     * @return {boolean}
     */
    var validateModalPresence = function validateModalPresence(id) {
      if (!document.getElementById(id)) {
        console.warn('MicroModal v' + version + ': \u2757Seems like you have missed %c\'' + id + '\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
        console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<div class="modal" id="' + id + '"></div>');
        return false;
      }
    };

    /**
     * Validates if there are modal triggers present
     * in the DOM
     * @param  {array} triggers An array of data-triggers
     * @return {boolean}
     */
    var validateTriggerPresence = function validateTriggerPresence(triggers) {
      if (triggers.length <= 0) {
        console.warn('MicroModal v' + version + ': \u2757Please specify at least one %c\'micromodal-trigger\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
        console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<a href="#" data-micromodal-trigger="my-modal"></a>');
        return false;
      }
    };

    /**
     * Checks if triggers and their corresponding modals
     * are present in the DOM
     * @param  {array} triggers   Array of DOM nodes which have data-triggers
     * @param  {array} triggerMap Associative array of modals and thier triggers
     * @return {boolean}
     */
    var validateArgs = function validateArgs(triggers, triggerMap) {
      validateTriggerPresence(triggers);
      if (!triggerMap) return true;
      for (var id in triggerMap) {
        validateModalPresence(id);
      }return true;
    };

    /**
     * Binds click handlers to all modal triggers
     * @param  {object} config [description]
     * @return void
     */
    var init = function init(config) {
      // Create an config object with default openTrigger
      var options = Object.assign({}, { openTrigger: 'data-micromodal-trigger' }, config);

      // Collects all the nodes with the trigger
      var triggers = [].concat(toConsumableArray(document.querySelectorAll('[' + options.openTrigger + ']')));

      // Makes a mappings of modals with their trigger nodes
      var triggerMap = generateTriggerMap(triggers, options.openTrigger);

      // Checks if modals and triggers exist in dom
      if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return;

      // For every target modal creates a new instance
      for (var key in triggerMap) {
        var value = triggerMap[key];
        options.targetModal = key;
        options.triggers = [].concat(toConsumableArray(value));
        new Modal(options); // eslint-disable-line no-new
      }
    };

    /**
     * Shows a particular modal
     * @param  {string} targetModal [The id of the modal to display]
     * @param  {object} config [The configuration object to pass]
     * @return {void}
     */
    var show = function show(targetModal, config) {
      var options = config || {};
      options.targetModal = targetModal;

      // Checks if modals and triggers exist in dom
      if (options.debugMode === true && validateModalPresence(targetModal) === false) return;

      // stores reference to active modal
      activeModal = new Modal(options); // eslint-disable-line no-new
      activeModal.showModal();
    };

    /**
     * Closes the active modal
     * @return {void}
     */
    var close = function close() {
      activeModal.closeModal();
    };

    return { init: init, show: show, close: close };
  }();

  return MicroModal;
});

},{}],46:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvZWxlbS1kYXRhc2V0L2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9iZWhhdmlvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9jb21wb3NlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlQWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2lnbm9yZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2RhdGVwaWNrZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9kcm9wZG93bi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2luZGV4LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXYtc3VibWVudS5qcyIsInNyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9wYXNzd29yZC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JlZ2V4LWlucHV0LW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvanMvY29tcG9uZW50cy9za2lwbmF2LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmFsaWRhdG9yLmpzIiwic3JjL2pzL2NvbmZpZy5qcyIsInNyYy9qcy9ka3dkcy5qcyIsInNyYy9qcy9ldmVudHMuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvb2JqZWN0LWFzc2lnbi5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9jbG9zZXN0LmpzIiwic3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUuanMiLCJzcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiLCJzcmMvdmVuZG9yL21pY3JvbW9kYWwuanMiLCJzcmMvdmVuZG9yL3Bpa2FkYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7Ozs7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsSUFBbkIsRUFBeUI7QUFDeEMsTUFBSSxJQUFJLE1BQVIsRUFBZ0IsT0FBTyxJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsSUFBZixDQUFQO0FBQ2hCLE1BQUks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T0FBakIsRUFBMEIsT0FBMUIsRUFBbUMsS0FBSyxhQUF4QztBQUNBLGdDQUFZLEtBQUssT0FBakIsRUFBMEIsT0FBMUIsRUFBbUMsS0FBSyxhQUF4QztBQUNBLGdDQUFZLEtBQUssT0FBakIsRUFBMEIsTUFBMUIsRUFBa0MsS0FBSyxZQUF2QztBQUNIO0FBQ0o7QUFDRCxnQkFBSSxLQUFLLEVBQUwsQ0FBUSxVQUFaLEVBQXdCO0FBQ3BCLHFCQUFLLEVBQUwsQ0FBUSxVQUFSLENBQW1CLFdBQW5CLENBQStCLEtBQUssRUFBcEM7QUFDSDtBQUNKOztBQXBqQmUsS0FBcEI7O0FBd2pCQSxXQUFPLE9BQVA7QUFDSCxDQXR0Q0EsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuLyoqXG4gKiBBcnJheSNmaWx0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3Q9fSBzZWxmXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvdyBUeXBlRXJyb3JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBzZWxmKSB7XG4gIGlmIChhcnIuZmlsdGVyKSByZXR1cm4gYXJyLmZpbHRlcihmbiwgc2VsZik7XG4gIGlmICh2b2lkIDAgPT09IGFyciB8fCBudWxsID09PSBhcnIpIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgdmFyIHJldCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwoYXJyLCBpKSkgY29udGludWU7XG4gICAgdmFyIHZhbCA9IGFycltpXTtcbiAgICBpZiAoZm4uY2FsbChzZWxmLCB2YWwsIGksIGFycikpIHJldC5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuIiwiLyoqXG4gKiBhcnJheS1mb3JlYWNoXG4gKiAgIEFycmF5I2ZvckVhY2ggcG9ueWZpbGwgZm9yIG9sZGVyIGJyb3dzZXJzXG4gKiAgIChQb255ZmlsbDogQSBwb2x5ZmlsbCB0aGF0IGRvZXNuJ3Qgb3ZlcndyaXRlIHRoZSBuYXRpdmUgbWV0aG9kKVxuICogXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdhZGEvYXJyYXktZm9yZWFjaFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDE2IFRha3V0byBXYWRhXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoL2Jsb2IvbWFzdGVyL01JVC1MSUNFTlNFXG4gKi9cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JFYWNoIChhcnksIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgaWYgKGFyeS5mb3JFYWNoKSB7XG4gICAgICAgIGFyeS5mb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBhcnlbaV0sIGksIGFyeSk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpmWlcxd2RIa3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE3MDQyN1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IERlZGljYXRlZCB0byB0aGUgcHVibGljIGRvbWFpbi5cbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbi8vIEZ1bGwgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHdpdGggbm8gY2xhc3NMaXN0IHN1cHBvcnRcbi8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSkgXG5cdHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCEoJ0VsZW1lbnQnIGluIHZpZXcpKSByZXR1cm47XG5cbnZhclxuXHQgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG5cdCwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuXHQsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG5cdCwgb2JqQ3RyID0gT2JqZWN0XG5cdCwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHR9XG5cdCwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuXHRcdHZhclxuXHRcdFx0ICBpID0gMFxuXHRcdFx0LCBsZW4gPSB0aGlzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXHQvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcblx0LCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy5uYW1lID0gdHlwZTtcblx0XHR0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXHQsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG5cdFx0aWYgKHRva2VuID09PSBcIlwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJTWU5UQVhfRVJSXCJcblx0XHRcdFx0LCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG5cdFx0XHRcdCwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcblx0fVxuXHQsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcblx0XHRcdCwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG5cdFx0XHQsIGkgPSAwXG5cdFx0XHQsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChjbGFzc2VzW2ldKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuXHRcdH07XG5cdH1cblx0LCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cblx0LCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG5cdH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcblx0cmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHR0b2tlbiArPSBcIlwiO1xuXHRyZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcblx0XHRcdHRoaXMucHVzaCh0b2tlbik7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0XHQsIGluZGV4XG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0d2hpbGUgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuLCBmb3JjZSkge1xuXHR0b2tlbiArPSBcIlwiO1xuXG5cdHZhclxuXHRcdCAgcmVzdWx0ID0gdGhpcy5jb250YWlucyh0b2tlbilcblx0XHQsIG1ldGhvZCA9IHJlc3VsdCA/XG5cdFx0XHRmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG5cdFx0OlxuXHRcdFx0Zm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcblx0O1xuXG5cdGlmIChtZXRob2QpIHtcblx0XHR0aGlzW21ldGhvZF0odG9rZW4pO1xuXHR9XG5cblx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGZvcmNlID09PSBmYWxzZSkge1xuXHRcdHJldHVybiBmb3JjZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gIXJlc3VsdDtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcblx0dmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuXHRcdCAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcblx0XHQsIGVudW1lcmFibGU6IHRydWVcblx0XHQsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9O1xuXHR0cnkge1xuXHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0fSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG5cdFx0Ly8gYWRkaW5nIHVuZGVmaW5lZCB0byBmaWdodCB0aGlzIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9pc3N1ZXMvMzZcblx0XHQvLyBtb2Rlcm5pZSBJRTgtTVNXNyBtYWNoaW5lIGhhcyBJRTggOC4wLjYwMDEuMTg3MDIgYW5kIGlzIGFmZmVjdGVkXG5cdFx0aWYgKGV4Lm51bWJlciA9PT0gdW5kZWZpbmVkIHx8IGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcblx0XHRcdGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcblx0XHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0XHR9XG5cdH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuXHRlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHdpbmRvdy5zZWxmKSk7XG5cbn1cblxuLy8gVGhlcmUgaXMgZnVsbCBvciBwYXJ0aWFsIG5hdGl2ZSBjbGFzc0xpc3Qgc3VwcG9ydCwgc28ganVzdCBjaGVjayBpZiB3ZSBuZWVkXG4vLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuXHQvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cblx0aWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuXHRcdHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcblx0XHRcdHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuXHRcdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdFx0dmFyIGksIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dG9rZW4gPSBhcmd1bWVudHNbaV07XG5cdFx0XHRcdFx0b3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fTtcblx0XHRjcmVhdGVNZXRob2QoJ2FkZCcpO1xuXHRcdGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG5cdH1cblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3Rcblx0Ly8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHRpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcblx0XHR2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG5cdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcblx0XHRcdGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuXHRcdFx0XHRyZXR1cm4gZm9yY2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdH1cblxuXHR0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuXG59XG4iLCIvKiFcbiAgKiBkb21yZWFkeSAoYykgRHVzdGluIERpYXogMjAxNCAtIExpY2Vuc2UgTUlUXG4gICovXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG5cbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmbnMgPSBbXSwgbGlzdGVuZXJcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoYWNrID0gZG9jLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpXG5cblxuICBpZiAoIWxvYWRlZClcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIpXG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGZucy5zaGlmdCgpKSBsaXN0ZW5lcigpXG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXG4gIH1cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIDwzIE1vZGVybml6clxuLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL01vZGVybml6ci9Nb2Rlcm5penIvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9kb20vZGF0YXNldC5qc1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUoKSB7XG5cdHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWEtYicsICdjJyk7XG5cblx0cmV0dXJuIEJvb2xlYW4oZWxlbS5kYXRhc2V0ICYmIGVsZW0uZGF0YXNldC5hQiA9PT0gJ2MnKTtcbn1cblxuZnVuY3Rpb24gbmF0aXZlRGF0YXNldChlbGVtZW50KSB7XG5cdHJldHVybiBlbGVtZW50LmRhdGFzZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBuYXRpdmVEYXRhc2V0IDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIG1hcCA9IHt9O1xuXHR2YXIgYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlcztcblxuXHRmdW5jdGlvbiBnZXR0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWU7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXR0ZXIobmFtZSwgdmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMCwgaiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0dmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG5cblx0XHRpZiAoYXR0cmlidXRlKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuXG5cdFx0XHRpZiAobmFtZS5pbmRleE9mKCdkYXRhLScpID09PSAwKSB7XG5cdFx0XHRcdHZhciBwcm9wID0gbmFtZS5zbGljZSg1KS5yZXBsYWNlKC8tLi9nLCBmdW5jdGlvbiAodSkge1xuXHRcdFx0XHRcdHJldHVybiB1LmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgdmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwgcHJvcCwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBnZXR0ZXIuYmluZCh7IHZhbHVlOiB2YWx1ZSB8fCAnJyB9KSxcblx0XHRcdFx0XHRzZXQ6IHNldHRlci5iaW5kKGVsZW1lbnQsIG5hbWUpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXA7XG59O1xuXG4iLCIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcblxuKGZ1bmN0aW9uIChFbGVtZW50UHJvdG8pIHtcblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8ubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gRWxlbWVudFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiBtYXRjaGVzKHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIGluZGV4ID0gMDtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0KytpbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudHNbaW5kZXhdKTtcblx0XHR9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8uY2xvc2VzdCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXHR9XG59KSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGRlbGVnYXRlQWxsID0gcmVxdWlyZSgnLi4vZGVsZWdhdGVBbGwnKTtcblxuY29uc3QgREVMRUdBVEVfUEFUVEVSTiA9IC9eKC4rKTpkZWxlZ2F0ZVxcKCguKylcXCkkLztcbmNvbnN0IFNQQUNFID0gJyAnO1xuXG5jb25zdCBnZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gIHZhciBtYXRjaCA9IHR5cGUubWF0Y2goREVMRUdBVEVfUEFUVEVSTik7XG4gIHZhciBzZWxlY3RvcjtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdHlwZSA9IG1hdGNoWzFdO1xuICAgIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gIH1cblxuICB2YXIgb3B0aW9ucztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBjYXB0dXJlOiBwb3BLZXkoaGFuZGxlciwgJ2NhcHR1cmUnKSxcbiAgICAgIHBhc3NpdmU6IHBvcEtleShoYW5kbGVyLCAncGFzc2l2ZScpXG4gICAgfTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZGVsZWdhdGU6ICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpXG4gICAgICA/IGRlbGVnYXRlQWxsKGhhbmRsZXIpXG4gICAgICA6IHNlbGVjdG9yXG4gICAgICAgID8gZGVsZWdhdGUoc2VsZWN0b3IsIGhhbmRsZXIpXG4gICAgICAgIDogaGFuZGxlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgaWYgKHR5cGUuaW5kZXhPZihTUEFDRSkgPiAtMSkge1xuICAgIHJldHVybiB0eXBlLnNwbGl0KFNQQUNFKS5tYXAoZnVuY3Rpb24oX3R5cGUpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe3R5cGU6IF90eXBlfSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG52YXIgcG9wS2V5ID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGRlbGV0ZSBvYmpba2V5XTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWhhdmlvcihldmVudHMsIHByb3BzKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgICAucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModHlwZSwgZXZlbnRzW3R5cGVdKTtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChsaXN0ZW5lcnMpO1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZEJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmVCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHByb3BzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoZnVuY3Rpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5zb21lKGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKSA9PT0gZmFsc2U7XG4gICAgfSwgdGhpcyk7XG4gIH07XG59O1xuIiwiY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgY29tcG9zZSA9IHJlcXVpcmUoJy4uL2NvbXBvc2UnKTtcblxuY29uc3QgU1BMQVQgPSAnKic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGVBbGwoc2VsZWN0b3JzKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpXG5cbiAgLy8gWFhYIG9wdGltaXphdGlvbjogaWYgdGhlcmUgaXMgb25seSBvbmUgaGFuZGxlciBhbmQgaXQgYXBwbGllcyB0b1xuICAvLyBhbGwgZWxlbWVudHMgKHRoZSBcIipcIiBDU1Mgc2VsZWN0b3IpLCB0aGVuIGp1c3QgcmV0dXJuIHRoYXRcbiAgLy8gaGFuZGxlclxuICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gU1BMQVQpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW1NQTEFUXTtcbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHNlbGVjdG9yKSB7XG4gICAgbWVtby5wdXNoKGRlbGVnYXRlKHNlbGVjdG9yLCBzZWxlY3RvcnNbc2VsZWN0b3JdKSk7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGNvbXBvc2UoZGVsZWdhdGVzKTtcbn07XG4iLCIvLyBwb2x5ZmlsbCBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0XG5yZXF1aXJlKCdlbGVtZW50LWNsb3Nlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZShzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlbGVnYXRpb24oZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRhcmdldCwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpZ25vcmFuY2UoZSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBlLnRhcmdldCAmJiAhZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uY2UobGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbiB3cmFwcGVkT25jZShlKSB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCB3cmFwcGVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzLCBlKTtcbiAgfTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSRV9UUklNID0gLyheXFxzKyl8KFxccyskKS9nO1xudmFyIFJFX1NQTElUID0gL1xccysvO1xuXG52YXIgdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbVxuICA/IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoUkVfVFJJTSwgJycpOyB9O1xuXG52YXIgcXVlcnlCeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZUlkcyhpZHMsIGRvYykge1xuICBpZiAodHlwZW9mIGlkcyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBnb3QgJyArICh0eXBlb2YgaWRzKSk7XG4gIH1cblxuICBpZiAoIWRvYykge1xuICAgIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBnZXRFbGVtZW50QnlJZCA9IGRvYy5nZXRFbGVtZW50QnlJZFxuICAgID8gZG9jLmdldEVsZW1lbnRCeUlkLmJpbmQoZG9jKVxuICAgIDogcXVlcnlCeUlkLmJpbmQoZG9jKTtcblxuICBpZHMgPSB0cmltKGlkcykuc3BsaXQoUkVfU1BMSVQpO1xuXG4gIC8vIFhYWCB3ZSBjYW4gc2hvcnQtY2lyY3VpdCBoZXJlIGJlY2F1c2UgdHJpbW1pbmcgYW5kIHNwbGl0dGluZyBhXG4gIC8vIHN0cmluZyBvZiBqdXN0IHdoaXRlc3BhY2UgcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSxcbiAgLy8gZW1wdHkgc3RyaW5nXG4gIGlmIChpZHMubGVuZ3RoID09PSAxICYmIGlkc1swXSA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gaWRzXG4gICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGVsID0gZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmaWx0ZXIgPSByZXF1aXJlKCdhcnJheS1maWx0ZXInKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUnKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKCcuLi91dGlscy9pcy1pbi12aWV3cG9ydCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG4vLyBYWFggbWF0Y2ggLmFjY29yZGlvbiBhbmQgLmFjY29yZGlvbi1ib3JkZXJlZFxuY29uc3QgQUNDT1JESU9OID0gYC4ke1BSRUZJWH1hY2NvcmRpb24sIC4ke1BSRUZJWH1hY2NvcmRpb24tYm9yZGVyZWRgO1xuY29uc3QgQlVUVE9OID0gYC4ke1BSRUZJWH1hY2NvcmRpb24tYnV0dG9uW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgTVVMVElTRUxFQ1RBQkxFID0gJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJztcblxuLyoqXG4gKiBUb2dnbGUgYSBidXR0b24ncyBcInByZXNzZWRcIiBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtib29sZWFuP30gZXhwYW5kZWQgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICovXG5jb25zdCB0b2dnbGVCdXR0b24gPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICB2YXIgYWNjb3JkaW9uID0gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKTtcbiAgaWYgKCFhY2NvcmRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7QlVUVE9OfSBpcyBtaXNzaW5nIG91dGVyICR7QUNDT1JESU9OfWApO1xuICB9XG5cbiAgZXhwYW5kZWQgPSB0b2dnbGUoYnV0dG9uLCBleHBhbmRlZCk7XG4gIC8vIFhYWCBtdWx0aXNlbGVjdGFibGUgaXMgb3B0LWluLCB0byBwcmVzZXJ2ZSBsZWdhY3kgYmVoYXZpb3JcbiAgY29uc3QgbXVsdGlzZWxlY3RhYmxlID0gYWNjb3JkaW9uLmdldEF0dHJpYnV0ZShNVUxUSVNFTEVDVEFCTEUpID09PSAndHJ1ZSc7XG5cbiAgaWYgKGV4cGFuZGVkICYmICFtdWx0aXNlbGVjdGFibGUpIHtcbiAgICBmb3JFYWNoKGdldEFjY29yZGlvbkJ1dHRvbnMoYWNjb3JkaW9uKSwgb3RoZXIgPT4ge1xuICAgICAgaWYgKG90aGVyICE9PSBidXR0b24pIHtcbiAgICAgICAgdG9nZ2xlKG90aGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNob3dCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgdHJ1ZSk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZVxuICovXG5jb25zdCBoaWRlQnV0dG9uID0gYnV0dG9uID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIGZhbHNlKTtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgYnV0dG9uIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGFjY29yZGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYWNjb3JkaW9uXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MQnV0dG9uRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldEFjY29yZGlvbkJ1dHRvbnMgPSBhY2NvcmRpb24gPT4ge1xuICByZXR1cm4gZmlsdGVyKGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgcmV0dXJuIGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTikgPT09IGFjY29yZGlvbjtcbiAgfSk7XG59O1xuXG5jb25zdCBhY2NvcmRpb24gPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbih0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIC8vIFdlIHdlcmUganVzdCBleHBhbmRlZCwgYnV0IGlmIGFub3RoZXIgYWNjb3JkaW9uIHdhcyBhbHNvIGp1c3RcbiAgICAgICAgLy8gY29sbGFwc2VkLCB3ZSBtYXkgbm8gbG9uZ2VyIGJlIGluIHRoZSB2aWV3cG9ydC4gVGhpcyBlbnN1cmVzXG4gICAgICAgIC8vIHRoYXQgd2UgYXJlIHN0aWxsIHZpc2libGUsIHNvIHRoZSB1c2VyIGlzbid0IGNvbmZ1c2VkLlxuICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcykpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSwge1xuICBpbml0OiByb290ID0+IHtcbiAgICBmb3JFYWNoKHJvb3QucXVlcnlTZWxlY3RvckFsbChCVVRUT04pLCBidXR0b24gPT4ge1xuICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ3RydWUnO1xuICAgICAgdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAgIH0pO1xuICB9LFxuICBBQ0NPUkRJT04sXG4gIEJVVFRPTixcbiAgc2hvdzogc2hvd0J1dHRvbixcbiAgaGlkZTogaGlkZUJ1dHRvbixcbiAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gIGdldEJ1dHRvbnM6IGdldEFjY29yZGlvbkJ1dHRvbnMsXG59KTtcblxuLyoqXG4gKiBUT0RPOiBmb3IgMi4wLCByZW1vdmUgZXZlcnl0aGluZyBiZWxvdyB0aGlzIGNvbW1lbnQgYW5kIGV4cG9ydCB0aGVcbiAqIGJlaGF2aW9yIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBBY2NvcmRpb24gPSBmdW5jdGlvbiAocm9vdCkge1xuICB0aGlzLnJvb3QgPSByb290O1xuICBhY2NvcmRpb24ub24odGhpcy5yb290KTtcbn07XG5cbi8vIGNvcHkgYWxsIG9mIHRoZSBiZWhhdmlvciBtZXRob2RzIGFuZCBwcm9wcyB0byBBY2NvcmRpb25cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmFzc2lnbihBY2NvcmRpb24sIGFjY29yZGlvbik7XG5cbkFjY29yZGlvbi5wcm90b3R5cGUuc2hvdyA9IHNob3dCdXR0b247XG5BY2NvcmRpb24ucHJvdG90eXBlLmhpZGUgPSBoaWRlQnV0dG9uO1xuXG5BY2NvcmRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgYWNjb3JkaW9uLm9mZih0aGlzLnJvb3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH1iYW5uZXItaGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfWJhbm5lci1oZWFkZXItZXhwYW5kZWRgO1xuXG5jb25zdCB0b2dnbGVCYW5uZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIGAke0hFQURFUn0gW2FyaWEtY29udHJvbHNdYCBdOiB0b2dnbGVCYW5uZXIsXG4gIH0sXG59KTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBQaWthZGF5ID0gcmVxdWlyZShcIi4uLy4uL3ZlbmRvci9waWthZGF5LmpzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBjbG9zZXN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2xvc2VzdCcpO1xuXG5jb25zdCBqc0RhdGVwaWNrZXJTZWxlY3RvciA9ICcuanMtY2FsZW5kYXItZGF0ZXBpY2tlcic7XG5jb25zdCBqc0RheUlucHV0ID0gJy5qcy1jYWxlbmRhci1kYXktaW5wdXQnO1xuY29uc3QganNNb250aElucHV0ID0gJy5qcy1jYWxlbmRhci1tb250aC1pbnB1dCc7XG5jb25zdCBqc1llYXJJbnB1dCA9ICcuanMtY2FsZW5kYXIteWVhci1pbnB1dCc7XG5cbmNsYXNzIGRhdGVwaWNrZXJHcm91cCB7XG4gIGNvbnN0cnVjdG9yKGVsKXtcbiAgICBcbiAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5kYXRlcGlja2VyRWxlbWVudCA9IHNlbGVjdChqc0RhdGVwaWNrZXJTZWxlY3RvciwgZWwpO1xuICAgIHRoaXMuZGF0ZUdyb3VwID0gZWw7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBjbG9zZXN0KGVsLCAnLmZvcm0tZ3JvdXAnKTtcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50ID0gbnVsbDsgICBcblxuICAgIHRoaXMuaW5pdERhdGVJbnB1dHMoKTtcbiAgICB0aGlzLmluaXREYXRlcGlja2VyKHRoaXMuZGF0ZXBpY2tlckVsZW1lbnRbMF0pO1xuICB9XG5cbiAgaW5pdERhdGVJbnB1dHMoKXtcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudCA9IHNlbGVjdChqc0RheUlucHV0LCB0aGlzLmRhdGVHcm91cClbMF1cbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzTW9udGhJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdO1xuICAgIHRoaXMueWVhcklucHV0RWxlbWVudCA9IHNlbGVjdChqc1llYXJJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGF0LmZvcm1hdElucHV0cygpO1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC5mb3JtYXRJbnB1dHMoKTtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMueWVhcklucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC5mb3JtYXRJbnB1dHMoKTtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXREYXRlcGlja2VyKGVsKXtcbiAgICBpZihlbCl7XG4gICAgICAvL05vdGU6IGVsIG1heSBub3QgYmUgYSA8c3ZnPiwgSUUxMSBkb2VzIG5vdCBhZGQgLmJsdXIoKSBtZXRob2QgdG8gc3ZnIGVsZW1lbnRzICgtLT4gZXNjIGFuZCBlbnRlciBkb2VzIG5vdCBkaXNtaXNzIHBpa2FkYXkpLiBcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdGhpcy5waWthZGF5SW5zdGFuY2UgPSBuZXcgUGlrYWRheSh7XG4gICAgICAgIGZpZWxkOiBlbCxcbiAgICAgICAgZm9ybWF0OiAnREQvTU0vWVlZWScsXG4gICAgICAgIGZpcnN0RGF5OiAxLCAvL21hbmRhZ1xuICAgICAgICBpMThuOiB7XG4gICAgICAgICAgcHJldmlvdXNNb250aCA6ICdGb3JyaWdlIG3DpW5lZCcsXG4gICAgICAgICAgbmV4dE1vbnRoICAgICA6ICdOw6ZzdGUgbcOlbmVkJyxcbiAgICAgICAgICBtb250aHMgICAgICAgIDogWydKYW51YXInLCdGZWJydWFyJywnTWFydGgnLCdBcHJpbCcsJ01haicsJ0p1bmknLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2t0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICB3ZWVrZGF5cyAgICAgIDogWydTw7huZGFnJywnTWFuZGFnJywnVGlyc2RhZycsJ09uc2RhZycsJ1RvcnNkYWcnLCdGcmVkYWcnLCdMw7hyZGFnJ10sXG4gICAgICAgICAgd2Vla2RheXNTaG9ydCA6IFsnU8O4bicsJ01hbicsJ1RpcicsJ09ucycsJ1RvcicsJ0ZyZScsJ0zDuHInXVxuICAgICAgICB9LFxuICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgIC8vc2VsZWN0ZWQgbmV3IGRhdGUgaW4gcGlrYWRheSwgdXBkYXRlIGlucHV0IGZpZWxkcy4gXG4gICAgICAgICAgdGhhdC51cGRhdGVEYXRlSW5wdXRzKGRhdGUpO1xuICAgICAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PcGVuOiBmdW5jdGlvbigpe1xuICAgICAgICAgIC8vdXBkYXRlIHBpa2FkYXkgd2l0aCB2YWx1ZXMgZnJvbSBpbnB1dCBmaWVsZHNcbiAgICAgICAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhhdC5kYXlJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRoYXQubW9udGhJbnB1dEVsZW1lbnQudmFsdWUpIC0xO1xuICAgICAgICAgIHZhciB5ZWFyID0gcGFyc2VJbnQodGhhdC55ZWFySW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgIGlmKHRoYXQudmFsaWRhdGVJbnB1dHMoKSl7XG4gICAgICAgICAgICB0aGF0LnVwZGF0ZURhdGVwaWNrZXJEYXRlKG5ld0RhdGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIGluaXREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMucGlrYWRheUluc3RhbmNlLnNldERhdGUoaW5pdERhdGUpO1xuICAgICAgdGhpcy51cGRhdGVEYXRlSW5wdXRzKGluaXREYXRlKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0cygpe1xuICAgIHZhciBkYXkgPSBwYXJzZUludCh0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSlcbiAgICB2YXIgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB2YXIgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcklucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgdmFyIG1heERheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XG5cbiAgICB2YXIgbXNnID0gXCJcIjtcbiAgICB2YXIgaXNWYWxpZCA9IHRydWU7IFxuICAgIGlmKGRheSA+IG1heERheSl7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBtc2cgPSBcIkhvdiwgZGVuIGRhZyBmaW5kZXMgaWtrZSBpIGRlbiB2YWxndGUgbcOlbmVkLlwiXG4gICAgICB0aGlzLnNob3dFcnJvcihtc2cpO1xuICAgIH1lbHNlIGlmKG1vbnRoID4gMTIpe1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgbXNnID0gXCJIb3YsIGRlbiBtw6VuZWQgZmluZGVzIGlra2UuXCJcbiAgICAgIHRoaXMuc2hvd0Vycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgaWYoaXNWYWxpZCl7XG4gICAgICB0aGlzLnJlbW92ZUVycm9yKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH1cblxuICBzaG93RXJyb3IobXNnKXtcbiAgICB0aGlzLmZvcm1Hcm91cC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZXJyb3JcIik7XG4gICAgc2VsZWN0KFwiLmlucHV0LWVycm9yLW1lc3NhZ2VcIiwgIHRoaXMuZm9ybUdyb3VwKVswXS50ZXh0Q29udGVudCA9IG1zZztcbiAgfVxuICByZW1vdmVFcnJvcigpe1xuICAgIHRoaXMuZm9ybUdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnB1dC1lcnJvclwiKTtcbiAgICBzZWxlY3QoXCIuaW5wdXQtZXJyb3ItbWVzc2FnZVwiLCAgdGhpcy5mb3JtR3JvdXApWzBdLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIHVwZGF0ZURhdGVJbnB1dHMoZGF0ZSl7XG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgXG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmRheUZvcm1hdChkYXkpO1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLm1vbnRoRm9ybWF0KG1vbnRoKTtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQudmFsdWUgPSB5ZWFyO1xuICB9XG5cbiAgLy9hZGRzIDAgYXQgdGhlIGZyb250IG9mIGRheSBudW1iZXJcbiAgZGF5Rm9ybWF0KGRheSl7XG4gICAgcmV0dXJuIChcIjBcIiArIGRheSkuc2xpY2UoLTIpO1xuICB9XG4gIG1vbnRoRm9ybWF0KG1vbnRoKXtcbiAgICByZXR1cm4gKFwiMFwiICsgbW9udGgpLnNsaWNlKC0yKTtcbiAgfVxuICBmb3JtYXRJbnB1dHMoKXtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUpXG4gICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSk7XG5cbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMuZGF5Rm9ybWF0KGRheSk7XG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMubW9udGhGb3JtYXQobW9udGgpO1xuICB9XG5cbiAgdXBkYXRlRGF0ZXBpY2tlckRhdGUobmV3RGF0ZSl7XG4gICAgdGhpcy5waWthZGF5SW5zdGFuY2Uuc2V0RGF0ZShuZXdEYXRlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVwaWNrZXJHcm91cDsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuXG5jb25zdCBqc0Ryb3Bkb3duVHJpZ2dlciA9IFwiLmpzLWRyb3Bkb3duXCI7XG5jb25zdCBqc0Ryb3Bkb3duVGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xuXG5jb25zdCB0b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyRWwsIGZvcmNlQ2xvc2UpIHtcbiAgICBpZih0cmlnZ2VyRWwgIT09IG51bGwgJiYgdHJpZ2dlckVsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICB2YXIgdGFyZ2V0QXR0ciA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoanNEcm9wZG93blRhcmdldClcbiAgICAgICAgaWYodGFyZ2V0QXR0ciAhPT0gbnVsbCAmJiB0YXJnZXRBdHRyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdmFyIHRhcmdldEVsID0gc2VsZWN0KHRhcmdldEF0dHIsICdib2R5Jyk7XG4gICAgICAgICAgICBpZih0YXJnZXRFbCAhPT0gbnVsbCAmJiB0YXJnZXRFbCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldEVsLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIC8vdGFyZ2V0IGZvdW5kLCBjaGVjayBzdGF0ZVxuICAgICAgICAgICAgICAgIHRhcmdldEVsID0gdGFyZ2V0RWxbMF07XG4gICAgICAgICAgICAgICAgLy9jaGFuZ2Ugc3RhdGVcbiAgICAgICAgICAgICAgICBpZih0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIiB8fCBmb3JjZUNsb3NlKXtcbiAgICAgICAgICAgICAgICAgICAgLy9jbG9zZVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vb3BlblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgIFxuICAgIH1cbn07XG5cbmNvbnN0IHRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRyb3Bkb3duRWxtID0gY2xvc2VzdChldmVudC50YXJnZXQsIGpzRHJvcGRvd25UcmlnZ2VyKTtcbiAgICBpZihkcm9wZG93bkVsbSAhPT0gbnVsbCAmJiBkcm9wZG93bkVsbSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy9DbG9zZSBhbGwgZXhpc3Rpbmcgb3BlbiBkcm9wZG93bnNcbiAgICAgICAgZm9yRWFjaChzZWxlY3QoanNEcm9wZG93blRyaWdnZXIsICdib2R5JyksIGRyb3Bkb3duSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgaWYoZHJvcGRvd25JbnN0YW5jZSAhPT0gZHJvcGRvd25FbG0pe1xuICAgICAgICAgICAgICAgIHRvZ2dsZURyb3Bkb3duKGRyb3Bkb3duSW5zdGFuY2UsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9PcGVuIG5ldyBkcm9wZG93blxuICAgICAgICB0b2dnbGVEcm9wZG93bihkcm9wZG93bkVsbSk7XG4gICAgfVxufTtcblxuY29uc3Qgb3V0c2lkZUNsb3NlID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgIC8vY2xvc2VzIGRyb3Bkb3duIHdoZW4gY2xpY2tlZCBvdXRzaWRlLiBcbiAgICB2YXIgZHJvcGRvd25FbG0gPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwganNEcm9wZG93blRyaWdnZXIpO1xuICAgIGlmKGRyb3Bkb3duRWxtID09PSBudWxsIHx8IGRyb3Bkb3duRWxtID09PSB1bmRlZmluZWQpe1xuICAgICAgICAvL2NsaWNrZWQgb3V0c2lkZSB0cmlnZ2VyLCBmb3JjZSBjbG9zZSBhbGxcbiAgICAgICAgZm9yRWFjaChzZWxlY3QoanNEcm9wZG93blRyaWdnZXIpLCBkcm9wZG93bkluc3RhbmNlID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZURyb3Bkb3duKGRyb3Bkb3duSW5zdGFuY2UsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWydjbGljayddOiB7XG4gICAgWyBqc0Ryb3Bkb3duVHJpZ2dlciBdOiB0b2dnbGUsXG4gICAgWydib2R5J106IG91dHNpZGVDbG9zZSxcbiAgfSxcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi9hY2NvcmRpb24nKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7IC8vSkpFOiBub3QgdXNlZCBhbnltb3JlIFxuXG5jb25zdCBISURERU4gPSAnaGlkZGVuJztcbmNvbnN0IFNDT1BFID0gYC5mb290ZXJgOyAvLyR7UFJFRklYfS1cbmNvbnN0IE5BViA9IGAke1NDT1BFfSBuYXZgO1xuY29uc3QgQlVUVE9OID0gYCR7TkFWfSAuZm9vdGVyLXByaW1hcnktbGlua2A7IC8vJHtQUkVGSVh9LVxuY29uc3QgTElTVCA9IGAke05BVn0gdWxgO1xuXG5jb25zdCBISURFX01BWF9XSURUSCA9IDYwMDtcbmNvbnN0IERFQk9VTkNFX1JBVEUgPSAxODA7XG5cbmNvbnN0IHNob3dQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc21hbGxfc2NyZWVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgaWYoc21hbGxfc2NyZWVuKXtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5jbG9zZXN0KExJU1QpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4pO1xuXG4gICAgLy8gTkI6IHRoaXMgKnNob3VsZCogYWx3YXlzIHN1Y2NlZWQgYmVjYXVzZSB0aGUgYnV0dG9uXG4gICAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgICBjb25zdCBsaXN0cyA9IGxpc3QuY2xvc2VzdChOQVYpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcblxuICAgIGZvckVhY2gobGlzdHMsIGVsID0+IHtcbiAgICAgIGlmIChlbCAhPT0gbGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhJRERFTik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2l6ZSA9IGRlYm91bmNlKCgpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgZm9yRWFjaChzZWxlY3QoTElTVCksIGxpc3QgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4sIGhpZGRlbik7XG4gIH0pO1xufSwgREVCT1VOQ0VfUkFURSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBzaG93UGFuZWwsXG4gIH0sXG59LCB7XG4gIC8vIGV4cG9ydCBmb3IgdXNlIGVsc2V3aGVyZVxuICBISURFX01BWF9XSURUSCxcbiAgREVCT1VOQ0VfUkFURSxcblxuICBpbml0OiB0YXJnZXQgPT4ge1xuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxuXG4gIHRlYXJkb3duOiB0YXJnZXQgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWNjb3JkaW9uOiAgcmVxdWlyZSgnLi9hY2NvcmRpb24nKSxcbiAgYmFubmVyOiAgICAgcmVxdWlyZSgnLi9iYW5uZXInKSxcbiAgZm9vdGVyOiAgICAgcmVxdWlyZSgnLi9mb290ZXInKSxcbiAgbmF2aWdhdGlvbjogcmVxdWlyZSgnLi9uYXZpZ2F0aW9uJyksXG4gIHBhc3N3b3JkOiAgIHJlcXVpcmUoJy4vcGFzc3dvcmQnKSxcbiAgc2VhcmNoOiAgICAgcmVxdWlyZSgnLi9zZWFyY2gnKSxcbiAgc2tpcG5hdjogICAgcmVxdWlyZSgnLi9za2lwbmF2JyksXG4gIHZhbGlkYXRvcjogIHJlcXVpcmUoJy4vdmFsaWRhdG9yJyksXG4gIHJlZ2V4bWFzazogIHJlcXVpcmUoJy4vcmVnZXgtaW5wdXQtbWFzaycpLFxuICBkcm9wZG93bjogICByZXF1aXJlKCcuL2Ryb3Bkb3duJyksXG4gIG5hdnN1Ym1lbnU6ICAgcmVxdWlyZSgnLi9uYXYtc3VibWVudScpLFxuICAvL3RhYmxlOiAgICAgIHJlcXVpcmUoJy4vdGFibGUnKSxcbiAgXG59O1xuIiwiXG5jb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XG5cbi8qKlxuICogSW1wb3J0IG1vZGFsIGxpYi5cbiAqIGh0dHBzOi8vbWljcm9tb2RhbC5ub3cuc2hcbiAqL1xuY29uc3QgbWljcm9Nb2RhbCA9IHJlcXVpcmUoXCIuLi8uLi92ZW5kb3IvbWljcm9tb2RhbC5qc1wiKTtcbmRvbXJlYWR5KCgpID0+IHtcblx0bWljcm9Nb2RhbC5pbml0KCk7IC8vaW5pdCBhbGwgbW9kYWxzXG59KTtcbiIsIi8qKlxyXG4gKiBDb2xsYXBzZS9leHBhbmQgZm9yIG5hdmlnYXRpb24gc3VibWVudWVzLlxyXG4gKiBCZWhhdmVzIGxpa2UgYSBkcm9wZG93biBvbiBkZXNrdG9wIChjbG9zZXMgd2hlbiBjbGlja2VkIG91dHNpZGUpLlxyXG4gKiBBbmQgYmVoYXZlcyBsaWtlIGFuIGFjY29yZGlvbiAobXVsdGlzZWxlY3QpIG9uIG1vYmlsZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcclxuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XHJcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XHJcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XHJcblxyXG5jb25zdCBqc05hdlN1Ym1lbnVUcmlnZ2VyID0gXCIuanMtbmF2LXN1Ym1lbnVcIjtcclxuY29uc3QganNOYXZTdWJtZW51VGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xyXG5cclxuY29uc3QgbmF2UmVzcG9uc2l2ZUJyZWFrcG9pbnQgPSA5OTI7IC8vc2FtZSBhcyAkbmF2LXJlc3BvbnNpdmUtYnJlYWtwb2ludCBmcm9tIHRoZSBzY3NzLlxyXG5cclxuY29uc3QgdG9nZ2xlTmF2U3VibWVudSA9IGZ1bmN0aW9uICh0cmlnZ2VyRWwsIGZvcmNlQ2xvc2UpIHtcclxuICAgIGlmKHRyaWdnZXJFbCAhPT0gbnVsbCAmJiB0cmlnZ2VyRWwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdmFyIHRhcmdldEF0dHIgPSB0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKGpzTmF2U3VibWVudVRhcmdldClcclxuICAgICAgICBpZih0YXJnZXRBdHRyICE9PSBudWxsICYmIHRhcmdldEF0dHIgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRFbCA9IHNlbGVjdCh0YXJnZXRBdHRyLCAnYm9keScpO1xyXG4gICAgICAgICAgICBpZih0YXJnZXRFbCAhPT0gbnVsbCAmJiB0YXJnZXRFbCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldEVsLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy90YXJnZXQgZm91bmQsIGNoZWNrIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFbCA9IHRhcmdldEVsWzBdO1xyXG4gICAgICAgICAgICAgICAgLy9jaGFuZ2Ugc3RhdGVcclxuICAgICAgICAgICAgICAgIGlmKHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiIHx8IGZvcmNlQ2xvc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgTmF2U3VibWVudUVsbSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBqc05hdlN1Ym1lbnVUcmlnZ2VyKTtcclxuICAgIGlmKE5hdlN1Ym1lbnVFbG0gIT09IG51bGwgJiYgTmF2U3VibWVudUVsbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAvL0Nsb3NlIGFsbCBleGlzdGluZyBvcGVuIE5hdlN1Ym1lbnVzIChvbiBkZXNrdG9wKS5cclxuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IG5hdlJlc3BvbnNpdmVCcmVha3BvaW50KXtcclxuICAgICAgICAgICAgZm9yRWFjaChzZWxlY3QoanNOYXZTdWJtZW51VHJpZ2dlciwgJ2JvZHknKSwgTmF2U3VibWVudUluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKE5hdlN1Ym1lbnVJbnN0YW5jZSAhPT0gTmF2U3VibWVudUVsbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTmF2U3VibWVudShOYXZTdWJtZW51SW5zdGFuY2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9PcGVuIG5ldyBOYXZTdWJtZW51XHJcbiAgICAgICAgdG9nZ2xlTmF2U3VibWVudShOYXZTdWJtZW51RWxtKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG91dHNpZGVDbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIC8vY2xvc2VzIE5hdlN1Ym1lbnUgd2hlbiBjbGlja2VkIG91dHNpZGUgKG9uIGRlc2t0b3ApIFxyXG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPiBuYXZSZXNwb25zaXZlQnJlYWtwb2ludCl7XHJcbiAgICAgICAgdmFyIE5hdlN1Ym1lbnVFbG0gPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwganNOYXZTdWJtZW51VHJpZ2dlcik7XHJcbiAgICAgICAgaWYoTmF2U3VibWVudUVsbSA9PT0gbnVsbCB8fCBOYXZTdWJtZW51RWxtID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvL2NsaWNrZWQgb3V0c2lkZSB0cmlnZ2VyLCBmb3JjZSBjbG9zZSBhbGxcclxuICAgICAgICAgICAgZm9yRWFjaChzZWxlY3QoanNOYXZTdWJtZW51VHJpZ2dlciksIE5hdlN1Ym1lbnVJbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVOYXZTdWJtZW51KE5hdlN1Ym1lbnVJbnN0YW5jZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xyXG4gIFsnY2xpY2snXToge1xyXG4gICAgWyBqc05hdlN1Ym1lbnVUcmlnZ2VyIF06IHRvZ2dsZSxcclxuICAgIFsnYm9keSddOiBvdXRzaWRlQ2xvc2UsXHJcbiAgfSxcclxufSk7XHJcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IE5BViA9IGAubmF2YDtcbmNvbnN0IE5BVl9MSU5LUyA9IGAke05BVn0gYWA7XG5jb25zdCBPUEVORVJTID0gYC5qcy1tZW51LW9wZW5gO1xuY29uc3QgQ0xPU0VfQlVUVE9OID0gYC5qcy1tZW51LWNsb3NlYDtcbmNvbnN0IE9WRVJMQVkgPSBgLm92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC5vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbIE5BViwgT1ZFUkxBWSBdLmpvaW4oJywgJyk7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICdtb2JpbGVfbmF2LWFjdGl2ZSc7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gJ2lzLXZpc2libGUnO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG5cbmNvbnN0IF9mb2N1c1RyYXAgPSAodHJhcENvbnRhaW5lcikgPT4ge1xuICAvLyBGaW5kIGFsbCBmb2N1c2FibGUgY2hpbGRyZW5cbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHRyYXBDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1N0cmluZyk7XG4gIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWyAwIF07XG4gIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEgXTtcblxuICBmdW5jdGlvbiB0cmFwVGFiS2V5IChlKSB7XG4gICAgLy8gQ2hlY2sgZm9yIFRBQiBrZXkgcHJlc3NcbiAgICBpZiAoZS5rZXlDb2RlID09PSA5KSB7XG5cbiAgICAgIC8vIFNISUZUICsgVEFCXG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgLy8gVEFCXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdFRhYlN0b3ApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFU0NBUEVcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgdG9nZ2xlTmF2LmNhbGwodGhpcywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvY3VzIGZpcnN0IGNoaWxkXG4gIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuXG4gIHJldHVybiB7XG4gICAgZW5hYmxlICgpIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgYW5kIHRyYXAgdGhlIGtleWJvYXJkXG4gICAgICB0cmFwQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcbiAgICB9LFxuXG4gICAgcmVsZWFzZSAoKSB7XG4gICAgICB0cmFwQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcbiAgICB9LFxuICB9O1xufTtcblxubGV0IGZvY3VzVHJhcDtcblxuY29uc3QgdG9nZ2xlTmF2ID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKHR5cGVvZiBhY3RpdmUgIT09ICdib29sZWFuJykge1xuICAgIGFjdGl2ZSA9ICFpc0FjdGl2ZSgpO1xuICB9XG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIGFjdGl2ZSk7XG5cbiAgZm9yRWFjaChzZWxlY3QoVE9HR0xFUyksIGVsID0+IHtcbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFZJU0lCTEVfQ0xBU1MsIGFjdGl2ZSk7XG4gIH0pO1xuXG4gIGlmIChhY3RpdmUpIHtcbiAgICBmb2N1c1RyYXAuZW5hYmxlKCk7XG4gIH0gZWxzZSB7XG4gICAgZm9jdXNUcmFwLnJlbGVhc2UoKTtcbiAgfVxuXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG5cbiAgaWYgKGFjdGl2ZSAmJiBjbG9zZUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGFjdGl2YXRlZCwgc28gZm9jdXMgb24gdGhlIGNsb3NlIGJ1dHRvbixcbiAgICAvLyB3aGljaCBpcyBqdXN0IGJlZm9yZSBhbGwgdGhlIG5hdiBlbGVtZW50cyBpbiB0aGUgdGFiIG9yZGVyLlxuICAgIGNsb3NlQnV0dG9uLmZvY3VzKCk7XG4gIH0gZWxzZSBpZiAoIWFjdGl2ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBjbG9zZUJ1dHRvbiAmJlxuICAgICAgICAgICAgIG1lbnVCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZCwgYW5kIGZvY3VzIHdhcyBvbiB0aGUgY2xvc2VcbiAgICAvLyBidXR0b24sIHdoaWNoIGlzIG5vIGxvbmdlciB2aXNpYmxlLiBXZSBkb24ndCB3YW50IHRoZSBmb2N1cyB0b1xuICAgIC8vIGRpc2FwcGVhciBpbnRvIHRoZSB2b2lkLCBzbyBmb2N1cyBvbiB0aGUgbWVudSBidXR0b24gaWYgaXQnc1xuICAgIC8vIHZpc2libGUgKHRoaXMgbWF5IGhhdmUgYmVlbiB3aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGZvY3VzZWQgb24sXG4gICAgLy8gaWYgdGhleSB0cmlnZ2VyZWQgdGhlIG1vYmlsZSBuYXYgYnkgbWlzdGFrZSkuXG4gICAgbWVudUJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgcmV0dXJuIGFjdGl2ZTtcbn07XG5cbmNvbnN0IHJlc2l6ZSA9ICgpID0+IHtcbiAgY29uc3QgY2xvc2VyID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG5cbiAgaWYgKGlzQWN0aXZlKCkgJiYgY2xvc2VyICYmIGNsb3Nlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA9PT0gMCkge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IGlzIGFjdGl2ZSwgYnV0IHRoZSBjbG9zZSBib3ggaXNuJ3QgdmlzaWJsZSwgd2hpY2hcbiAgICAvLyBtZWFucyB0aGUgdXNlcidzIHZpZXdwb3J0IGhhcyBiZWVuIHJlc2l6ZWQgc28gdGhhdCBpdCBpcyBubyBsb25nZXJcbiAgICAvLyBpbiBtb2JpbGUgbW9kZS4gTGV0J3MgbWFrZSB0aGUgcGFnZSBzdGF0ZSBjb25zaXN0ZW50IGJ5XG4gICAgLy8gZGVhY3RpdmF0aW5nIHRoZSBtb2JpbGUgbmF2LlxuICAgIHRvZ2dsZU5hdi5jYWxsKGNsb3NlciwgZmFsc2UpO1xuICB9XG59O1xuXG5jb25zdCBuYXZpZ2F0aW9uID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIE9QRU5FUlMgXTogdG9nZ2xlTmF2LFxuICAgIFsgQ0xPU0VSUyBdOiB0b2dnbGVOYXYsXG4gICAgWyBOQVZfTElOS1MgXTogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gQSBuYXZpZ2F0aW9uIGxpbmsgaGFzIGJlZW4gY2xpY2tlZCEgV2Ugd2FudCB0byBjb2xsYXBzZSBhbnlcbiAgICAgIC8vIGhpZXJhcmNoaWNhbCBuYXZpZ2F0aW9uIFVJIGl0J3MgYSBwYXJ0IG9mLCBzbyB0aGF0IHRoZSB1c2VyXG4gICAgICAvLyBjYW4gZm9jdXMgb24gd2hhdGV2ZXIgdGhleSd2ZSBqdXN0IHNlbGVjdGVkLlxuXG4gICAgICAvLyBTb21lIG5hdmlnYXRpb24gbGlua3MgYXJlIGluc2lkZSBhY2NvcmRpb25zOyB3aGVuIHRoZXkncmVcbiAgICAgIC8vIGNsaWNrZWQsIHdlIHdhbnQgdG8gY29sbGFwc2UgdGhvc2UgYWNjb3JkaW9ucy5cbiAgICAgIGNvbnN0IGFjYyA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb24uQUNDT1JESU9OKTtcbiAgICAgIGlmIChhY2MpIHtcbiAgICAgICAgYWNjb3JkaW9uLmdldEJ1dHRvbnMoYWNjKS5mb3JFYWNoKGJ0biA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIG1vYmlsZSBuYXZpZ2F0aW9uIG1lbnUgaXMgYWN0aXZlLCB3ZSB3YW50IHRvIGhpZGUgaXQuXG4gICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICB0b2dnbGVOYXYuY2FsbCh0aGlzLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0sIHtcbiAgaW5pdCAoKSB7XG4gICAgY29uc3QgdHJhcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTkFWKTtcblxuICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICBmb2N1c1RyYXAgPSBfZm9jdXNUcmFwKHRyYXBDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbiAgfSxcbiAgdGVhcmRvd24gKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gbmF2aWdhdGlvbi5vbihlbCksXG4gIG5hdmlnYXRpb25cbik7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9c2hvd19wYXNzd29yZCwgLiR7UFJFRklYfXNob3dfbXVsdGlwYXNzd29yZGA7XG5cbmNvbnN0IHRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBMSU5LIF06IHRvZ2dsZSxcbiAgfSxcbn0pO1xuIiwiXG4vKlxuKiBQcmV2ZW50cyB0aGUgdXNlciBmcm9tIGlucHV0dGluZyBiYXNlZCBvbiBhIHJlZ2V4LlxuKiBEb2VzIG5vdCB3b3JrIHRoZSBzYW1lIHdheSBhZiA8aW5wdXQgcGF0dGVybj1cIlwiPiwgdGhpcyBwYXR0ZXJuIGlzIG9ubHkgdXNlZCBmb3IgdmFsaWRhdGlvbiwgbm90IHRvIHByZXZlbnQgaW5wdXQuIFxuKiBVc2VjYXNlOiBudW1iZXIgaW5wdXQgZm9yIGRhdGUtY29tcG9uZW50LlxuKiBFeGFtcGxlIC0gbnVtYmVyIG9ubHk6IDxpbnB1dCB0eXBlPVwidGV4dFwiIGRhdGEtaW5wdXQtcmVnZXg9XCJeXFxkKiRcIj5cbiovXG4ndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5cbmNvbnN0IG1vZGlmaWVyU3RhdGUgPSB7XG4gIHNoaWZ0OiBmYWxzZSxcbiAgYWx0OiBmYWxzZSxcbiAgY3RybDogZmFsc2UsXG4gIGNvbW1hbmQ6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpbnB1dFJlZ2V4TWFzayhldmVudCkge1xuXG4gICAgaWYobW9kaWZpZXJTdGF0ZS5jdHJsIHx8IG1vZGlmaWVyU3RhdGUuY29tbWFuZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBuZXdDaGFyID0gbnVsbDtcbiAgICBpZih0eXBlb2YgZXZlbnQua2V5ICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgaWYoZXZlbnQua2V5Lmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICBuZXdDaGFyID0gZXZlbnQua2V5O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIWV2ZW50LmNoYXJDb2RlKXtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmtleUNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQuY2hhckNvZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgICBpZihldmVudC50YXJnZXQgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlmKG5ld0NoYXIgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBpZihuZXdDaGFyLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaWYoZWxlbWVudC50eXBlID09PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLnZhbHVlOy8vTm90ZSBpbnB1dFt0eXBlPW51bWJlcl0gZG9lcyBub3QgaGF2ZSAuc2VsZWN0aW9uU3RhcnQvRW5kIChDaHJvbWUpLlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgwLCBlbGVtZW50LnNlbGVjdGlvblN0YXJ0KSArIHRoaXMudmFsdWUuc2xpY2UoZWxlbWVudC5zZWxlY3Rpb25FbmQpICsgbmV3Q2hhcjsgLy9yZW1vdmVzIHRoZSBudW1iZXJzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLCB0aGVuIGFkZHMgbmV3IGNoYXIuIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVnZXhTdHIgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtaW5wdXQtcmVnZXhcIik7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAocmVnZXhTdHIpO1xuICAgICAgICAgICAgaWYoci5leGVjKG5ld1ZhbHVlKSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gICdrZXlwcmVzcyBwYXN0ZSc6IHtcbiAgICAnaW5wdXRbZGF0YS1pbnB1dC1yZWdleF0nOiBpbnB1dFJlZ2V4TWFzayxcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgaWdub3JlID0gcmVxdWlyZSgncmVjZXB0b3IvaWdub3JlJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgQlVUVE9OID0gJy5qcy1zZWFyY2gtYnV0dG9uJztcbmNvbnN0IEZPUk0gPSAnLmpzLXNlYXJjaC1mb3JtJztcbmNvbnN0IElOUFVUID0gJ1t0eXBlPXNlYXJjaF0nO1xuY29uc3QgQ09OVEVYVCA9ICdoZWFkZXInOyAvLyBYWFhcbmNvbnN0IFZJU1VBTExZX0hJRERFTiA9IGAke1BSRUZJWH1zci1vbmx5YDtcblxubGV0IGxhc3RCdXR0b247XG5cbmNvbnN0IHNob3dTZWFyY2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIHRydWUpO1xuICBsYXN0QnV0dG9uID0gdGhpcztcbn07XG5cbmNvbnN0IGhpZGVTZWFyY2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIGZhbHNlKTtcbiAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IGdldEZvcm0gPSBidXR0b24gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYnV0dG9uLmNsb3Nlc3QoQ09OVEVYVCk7XG4gIHJldHVybiBjb250ZXh0XG4gICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoRk9STSlcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcbiAgaWYgKCFmb3JtKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyAke0ZPUk19IGZvdW5kIGZvciBzZWFyY2ggdG9nZ2xlIGluICR7Q09OVEVYVH0hYCk7XG4gIH1cblxuICBidXR0b24uaGlkZGVuID0gYWN0aXZlO1xuICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoVklTVUFMTFlfSElEREVOLCAhYWN0aXZlKTtcblxuICBpZiAoYWN0aXZlKSB7XG4gICAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gICAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gICAgLy8gc2VhcmNoLCB0aGVuIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICBjb25zdCBsaXN0ZW5lciA9IGlnbm9yZShmb3JtLCBlID0+IHtcbiAgICAgIGlmIChsYXN0QnV0dG9uKSB7XG4gICAgICAgIGhpZGVTZWFyY2guY2FsbChsYXN0QnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICAgIH0pO1xuXG4gICAgLy8gTm9ybWFsbHkgd2Ugd291bGQganVzdCBydW4gdGhpcyBjb2RlIHdpdGhvdXQgYSB0aW1lb3V0LCBidXRcbiAgICAvLyBJRTExIGFuZCBFZGdlIHdpbGwgYWN0dWFsbHkgY2FsbCB0aGUgbGlzdGVuZXIgKmltbWVkaWF0ZWx5KiBiZWNhdXNlXG4gICAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgICAvLyBtYWtlIHN1cmUgdGhlIGJyb3dzZXIgaXMgZG9uZSBoYW5kbGluZyB0aGUgY3VycmVudCBjbGljayBldmVudCxcbiAgICAvLyBpZiBhbnksIGJlZm9yZSB3ZSBhdHRhY2ggdGhlIGxpc3RlbmVyLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogc2hvd1NlYXJjaCxcbiAgfSxcbn0sIHtcbiAgaW5pdDogKHRhcmdldCkgPT4ge1xuICAgIGZvckVhY2goc2VsZWN0KEJVVFRPTiwgdGFyZ2V0KSwgYnV0dG9uID0+IHtcbiAgICAgIHRvZ2dsZVNlYXJjaChidXR0b24sIGZhbHNlKTtcbiAgICB9KTtcbiAgfSxcbiAgdGVhcmRvd246ICh0YXJnZXQpID0+IHtcbiAgICAvLyBmb3JnZXQgdGhlIGxhc3QgYnV0dG9uIGNsaWNrZWRcbiAgICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiBzZWFyY2gub24oZWwpLFxuICBzZWFyY2hcbik7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBvbmNlID0gcmVxdWlyZSgncmVjZXB0b3Ivb25jZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9c2tpcG5hdltocmVmXj1cIiNcIl1gO1xuXG5jb25zdCBzZXRUYWJpbmRleCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25jZShldmVudCA9PiB7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICB9KSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhyb3cgYW4gZXJyb3I/XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSgnLi4vdXRpbHMvdmFsaWRhdGUtaW5wdXQnKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5cbmNvbnN0IGNoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICByZXR1cm4gdmFsaWRhdGUodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgJ2tleXVwIGNoYW5nZSc6IHtcbiAgICAnaW5wdXRbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdJzogY2hhbmdlLFxuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbi8qY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IHZhbGlkYXRvci5vbihlbCksXG4gIHZhbGlkYXRvclxuKTsqL1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByZWZpeDogJycsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZG9tcmVhZHkgPSByZXF1aXJlKCdkb21yZWFkeScpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBkYXRlcGlja2VyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2RhdGVwaWNrZXInKTtcbmNvbnN0IG1vZGFsID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsJyk7XG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGRlZmluZSBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmUgbWlzc2luZyBmcm9tXG4gKiBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoJy4vcG9seWZpbGxzJyk7XG5cbmNvbnN0IGRrd2RzID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuY29uc3QganNTZWxlY3RvckRhdGVwaWNrZXIgPSAnLmpzLWNhbGVuZGFyLWdyb3VwJztcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpO1xuZGt3ZHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbmRvbXJlYWR5KCgpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgZm9yIChsZXQgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgY29uc3QgYmVoYXZpb3IgPSBjb21wb25lbnRzWyBuYW1lIF07XG4gICAgYmVoYXZpb3Iub24odGFyZ2V0KTtcbiAgfVxuXG4gIC8vSW5pdCBkYXRlcGlja2VyLiAgKE5vdGU6IGFib3ZlICdiZWhhdmlvci5vbicgZG9lcyBub3Qgd29yayB3aXRoIHBpa2FkYXkgLT4gc2VwZXJhdGUgaW5pdGlhbGl6YXRpb24pXG4gIGZvckVhY2goc2VsZWN0KGpzU2VsZWN0b3JEYXRlcGlja2VyKSwgY2FsZW5kYXJHcm91cEVsZW1lbnQgPT4ge1xuICAgIG5ldyBkYXRlcGlja2VyKGNhbGVuZGFyR3JvdXBFbGVtZW50KTtcbiAgfSk7XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRrd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogJ2NsaWNrJyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBlbHByb3RvID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IEhJRERFTiA9ICdoaWRkZW4nO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVscHJvdG8sIEhJRERFTiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEhJRERFTik7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoJ2NsYXNzbGlzdC1wb2x5ZmlsbCcpO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oaWRkZW5cbnJlcXVpcmUoJy4vZWxlbWVudC1oaWRkZW4nKTtcbnJlcXVpcmUoJy4vb2JqZWN0LWFzc2lnbicpO1xuIiwiLy9PYmplY3QgYXNzaWduIG5vdCBpbXBsZW1lbnRlZCBpbiBJRTExLCBwb2x5ZmlsbCBiZWxvdzogXG4vL2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG5cdC8vIE11c3QgYmUgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgXCJhc3NpZ25cIiwge1xuXHQgIHZhbHVlOiBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCB2YXJBcmdzKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuXHRcdCd1c2Ugc3RyaWN0Jztcblx0XHRpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0ICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcblx0XHR9XG4gIFxuXHRcdHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICBcblx0XHRmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdCAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICBcblx0XHQgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0XHRmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcblx0XHRcdCAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG5cdFx0XHQgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcblx0XHRcdFx0dG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuXHRcdFx0ICB9XG5cdFx0XHR9XG5cdFx0ICB9XG5cdFx0fVxuXHRcdHJldHVybiB0bztcblx0ICB9LFxuXHQgIHdyaXRhYmxlOiB0cnVlLFxuXHQgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKCdyZWNlcHRvci9iZWhhdmlvcicpO1xuXG5jb25zdCBzZXF1ZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VxID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBmb3JFYWNoKHNlcSwgbWV0aG9kID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1sgbWV0aG9kIF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1sgbWV0aG9kIF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+IHtcbiAgcmV0dXJuIEJlaGF2aW9yKGV2ZW50cywgYXNzaWduKHtcbiAgICBvbjogICBzZXF1ZW5jZSgnaW5pdCcsICdhZGQnKSxcbiAgICBvZmY6ICBzZXF1ZW5jZSgndGVhcmRvd24nLCAncmVtb3ZlJyksXG4gIH0sIHByb3BzKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGNsb3Nlc3RcbiAqIEBkZXNjIGdldCBuZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBzZWFyY2ggc3RhcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gU2VsZWN0b3IgdG8gYmUgZm91bmQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBOZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb3Nlc3QgKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG4gIHdoaWxlIChlbCkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWw7XG59O1xuIiwiLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzNcbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQgKGVsLCB3aW49d2luZG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gdmFsdWUgPT4ge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKCdyZXNvbHZlLWlkLXJlZnMnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vc2VsZWN0Jyk7XG5jb25zdCB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG5cbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgUFJFU1NFRCA9ICdhcmlhLXByZXNzZWQnO1xuY29uc3QgU0hPV19BVFRSID0gJ2RhdGEtc2hvdy10ZXh0JztcbmNvbnN0IEhJREVfQVRUUiA9ICdkYXRhLWhpZGUtdGV4dCc7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IHNob3dUZXh0ID0+IHtcbiAgcmV0dXJuIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgc2hvdyA9PiB7XG4gICAgcmV0dXJuICgnUycgPT09IHNob3dbIDAgXSA/ICdIJyA6ICdoJykgKyAnaWRlJztcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBlbCA9PiB7XG4gIC8vIHRoaXMgaXMgdGhlICp0YXJnZXQqIHN0YXRlOlxuICAvLyAqIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgYXR0ciBhbmQgaXQncyAhPT0gXCJ0cnVlXCIsIHByZXNzZWQgaXMgdHJ1ZVxuICAvLyAqIG90aGVyd2lzZSwgcHJlc3NlZCBpcyBmYWxzZVxuICBjb25zdCBwcmVzc2VkID0gZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpXG4gICAgJiYgZWwuZ2V0QXR0cmlidXRlKFBSRVNTRUQpICE9PSAndHJ1ZSc7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZm9yRWFjaChmaWVsZHMsIGZpZWxkID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0O1xuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgQ09OVFJPTFMgPSAnYXJpYS1jb250cm9scyc7XG5jb25zdCBISURERU4gPSAnYXJpYS1oaWRkZW4nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG5cbiAgaWYgKHR5cGVvZiBleHBhbmRlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ2ZhbHNlJztcbiAgfVxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBleHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIicgKyBpZCArICdcIidcbiAgICApO1xuICB9XG5cbiAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgIWV4cGFuZGVkKTtcbiAgcmV0dXJuIGV4cGFuZGVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRhdGFzZXQgPSByZXF1aXJlKCdlbGVtLWRhdGFzZXQnKTtcblxuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgQ0hFQ0tFRCA9ICdhcmlhLWNoZWNrZWQnO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH1jaGVja2xpc3QtY2hlY2tlZGA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdGUgKGVsKSB7XG4gIGNvbnN0IGRhdGEgPSBkYXRhc2V0KGVsKTtcbiAgY29uc3QgaWQgPSBkYXRhLnZhbGlkYXRpb25FbGVtZW50O1xuICBjb25zdCBjaGVja0xpc3QgPSBpZC5jaGFyQXQoMCkgPT09ICcjJ1xuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZClcbiAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBObyB2YWxpZGF0aW9uIGVsZW1lbnQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCd2YWxpZGF0ZScpKSB7XG4gICAgICBjb25zdCB2YWxpZGF0b3JOYW1lID0ga2V5LnN1YnN0cigndmFsaWRhdGUnLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKGRhdGFbIGtleSBdKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclNlbGVjdG9yID0gYFtkYXRhLXZhbGlkYXRvcj1cIiR7dmFsaWRhdG9yTmFtZX1cIl1gO1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ2hlY2tib3ggPSBjaGVja0xpc3QucXVlcnlTZWxlY3Rvcih2YWxpZGF0b3JTZWxlY3Rvcik7XG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LnNldEF0dHJpYnV0ZShDSEVDS0VELCBjaGVja2VkKTtcbiAgICB9XG4gIH1cbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLk1pY3JvTW9kYWwgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciB2ZXJzaW9uID0gXCIwLjMuMVwiO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxudmFyIE1pY3JvTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIEZPQ1VTQUJMRV9FTEVNRU5UUyA9IFsnYVtocmVmXScsICdhcmVhW2hyZWZdJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2lmcmFtZScsICdvYmplY3QnLCAnZW1iZWQnLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJ107XG5cbiAgdmFyIE1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsKF9yZWYpIHtcbiAgICAgIHZhciB0YXJnZXRNb2RhbCA9IF9yZWYudGFyZ2V0TW9kYWwsXG4gICAgICAgICAgX3JlZiR0cmlnZ2VycyA9IF9yZWYudHJpZ2dlcnMsXG4gICAgICAgICAgdHJpZ2dlcnMgPSBfcmVmJHRyaWdnZXJzID09PSB1bmRlZmluZWQgPyBbXSA6IF9yZWYkdHJpZ2dlcnMsXG4gICAgICAgICAgX3JlZiRvblNob3cgPSBfcmVmLm9uU2hvdyxcbiAgICAgICAgICBvblNob3cgPSBfcmVmJG9uU2hvdyA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uU2hvdyxcbiAgICAgICAgICBfcmVmJG9uQ2xvc2UgPSBfcmVmLm9uQ2xvc2UsXG4gICAgICAgICAgb25DbG9zZSA9IF9yZWYkb25DbG9zZSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uQ2xvc2UsXG4gICAgICAgICAgX3JlZiRvcGVuVHJpZ2dlciA9IF9yZWYub3BlblRyaWdnZXIsXG4gICAgICAgICAgb3BlblRyaWdnZXIgPSBfcmVmJG9wZW5UcmlnZ2VyID09PSB1bmRlZmluZWQgPyAnZGF0YS1taWNyb21vZGFsLXRyaWdnZXInIDogX3JlZiRvcGVuVHJpZ2dlcixcbiAgICAgICAgICBfcmVmJGNsb3NlVHJpZ2dlciA9IF9yZWYuY2xvc2VUcmlnZ2VyLFxuICAgICAgICAgIGNsb3NlVHJpZ2dlciA9IF9yZWYkY2xvc2VUcmlnZ2VyID09PSB1bmRlZmluZWQgPyAnZGF0YS1taWNyb21vZGFsLWNsb3NlJyA6IF9yZWYkY2xvc2VUcmlnZ2VyLFxuICAgICAgICAgIF9yZWYkZGlzYWJsZVNjcm9sbCA9IF9yZWYuZGlzYWJsZVNjcm9sbCxcbiAgICAgICAgICBkaXNhYmxlU2Nyb2xsID0gX3JlZiRkaXNhYmxlU2Nyb2xsID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGlzYWJsZVNjcm9sbCxcbiAgICAgICAgICBfcmVmJGRpc2FibGVGb2N1cyA9IF9yZWYuZGlzYWJsZUZvY3VzLFxuICAgICAgICAgIGRpc2FibGVGb2N1cyA9IF9yZWYkZGlzYWJsZUZvY3VzID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGlzYWJsZUZvY3VzLFxuICAgICAgICAgIF9yZWYkYXdhaXRDbG9zZUFuaW1hdCA9IF9yZWYuYXdhaXRDbG9zZUFuaW1hdGlvbixcbiAgICAgICAgICBhd2FpdENsb3NlQW5pbWF0aW9uID0gX3JlZiRhd2FpdENsb3NlQW5pbWF0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkYXdhaXRDbG9zZUFuaW1hdCxcbiAgICAgICAgICBfcmVmJGRlYnVnTW9kZSA9IF9yZWYuZGVidWdNb2RlLFxuICAgICAgICAgIGRlYnVnTW9kZSA9IF9yZWYkZGVidWdNb2RlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGVidWdNb2RlO1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIG9mIHRoZSBtb2RhbFxuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldE1vZGFsKTtcblxuICAgICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgcGFzc2VkIGNvbmZpZ1xuICAgICAgdGhpcy5jb25maWcgPSB7IGRlYnVnTW9kZTogZGVidWdNb2RlLCBkaXNhYmxlU2Nyb2xsOiBkaXNhYmxlU2Nyb2xsLCBvcGVuVHJpZ2dlcjogb3BlblRyaWdnZXIsIGNsb3NlVHJpZ2dlcjogY2xvc2VUcmlnZ2VyLCBvblNob3c6IG9uU2hvdywgb25DbG9zZTogb25DbG9zZSwgYXdhaXRDbG9zZUFuaW1hdGlvbjogYXdhaXRDbG9zZUFuaW1hdGlvbiwgZGlzYWJsZUZvY3VzOiBkaXNhYmxlRm9jdXNcblxuICAgICAgICAvLyBSZWdpc3RlciBjbGljayBldmVudHMgb25seSBpZiBwcmViaW5kaW5nIGV2ZW50TGlzdGVuZXJzXG4gICAgICB9O2lmICh0cmlnZ2Vycy5sZW5ndGggPiAwKSB0aGlzLnJlZ2lzdGVyVHJpZ2dlcnMuYXBwbHkodGhpcywgdG9Db25zdW1hYmxlQXJyYXkodHJpZ2dlcnMpKTtcblxuICAgICAgLy8gcHJlYmluZCBmdW5jdGlvbnMgZm9yIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLm9uS2V5ZG93biA9IHRoaXMub25LZXlkb3duLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgdGhyb3VnaCBhbGwgb3BlblRyaWdnZXJzIGFuZCBiaW5kcyBjbGljayBldmVudFxuICAgICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VycyBbQXJyYXkgb2Ygbm9kZSBlbGVtZW50c11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuXG5cbiAgICBjcmVhdGVDbGFzcyhNb2RhbCwgW3tcbiAgICAgIGtleTogJ3JlZ2lzdGVyVHJpZ2dlcnMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyVHJpZ2dlcnMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHRyaWdnZXJzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgdHJpZ2dlcnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaG93TW9kYWwoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2hvd01vZGFsJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c1RvRmlyc3ROb2RlKCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsQmVoYXZpb3VyKCdkaXNhYmxlJyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5jb25maWcub25TaG93KHRoaXMubW9kYWwpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2Nsb3NlTW9kYWwnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHZhciBtb2RhbCA9IHRoaXMubW9kYWw7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxCZWhhdmlvdXIoJ2VuYWJsZScpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5jb25maWcub25DbG9zZSh0aGlzLm1vZGFsKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXdhaXRDbG9zZUFuaW1hdGlvbikge1xuICAgICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIG1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2Nyb2xsQmVoYXZpb3VyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzY3JvbGxCZWhhdmlvdXIodG9nZ2xlKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZVNjcm9sbCkgcmV0dXJuO1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgc3dpdGNoICh0b2dnbGUpIHtcbiAgICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihib2R5LnN0eWxlLCB7IG92ZXJmbG93OiAnaW5pdGlhbCcsIGhlaWdodDogJ2luaXRpYWwnIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGlzYWJsZSc6XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHkuc3R5bGUsIHsgb3ZlcmZsb3c6ICdoaWRkZW4nLCBoZWlnaHQ6ICcxMDB2aCcgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnYWRkRXZlbnRMaXN0ZW5lcnMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW1vdmVFdmVudExpc3RlbmVycycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25DbGljayk7XG4gICAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uQ2xpY2snLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5jb25maWcuY2xvc2VUcmlnZ2VyKSkge1xuICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbktleWRvd24nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHRoaXMuY2xvc2VNb2RhbChldmVudCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5KSB0aGlzLm1haW50YWluRm9jdXMoZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2dldEZvY3VzYWJsZU5vZGVzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGb2N1c2FibGVOb2RlcygpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUyk7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhub2RlcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2V0Rm9jdXNUb0ZpcnN0Tm9kZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Rm9jdXNUb0ZpcnN0Tm9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRpc2FibGVGb2N1cykgcmV0dXJuO1xuICAgICAgICB2YXIgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7XG4gICAgICAgIGlmIChmb2N1c2FibGVOb2Rlcy5sZW5ndGgpIGZvY3VzYWJsZU5vZGVzWzBdLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbWFpbnRhaW5Gb2N1cycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbWFpbnRhaW5Gb2N1cyhldmVudCkge1xuICAgICAgICB2YXIgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7XG5cbiAgICAgICAgLy8gaWYgZGlzYWJsZUZvY3VzIGlzIHRydWVcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgZm9jdXNhYmxlTm9kZXNbMF0uZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZm9jdXNlZEl0ZW1JbmRleCA9IGZvY3VzYWJsZU5vZGVzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZm9jdXNhYmxlTm9kZXNbZm9jdXNhYmxlTm9kZXMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBmb2N1c2FibGVOb2Rlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIE1vZGFsO1xuICB9KCk7XG5cbiAgLyoqXG4gICAqIE1vZGFsIHByb3RvdHlwZSBlbmRzLlxuICAgKiBIZXJlIG9uIGNvZGUgaXMgcmVwb3NpYmxlIGZvciBkZXRlY3RpbmcgYW5kXG4gICAqIGF1dG9iaW5kaW5nIGV2ZW50IGhhbmRsZXJzIG9uIG1vZGFsIHRyaWdnZXJzXG4gICAqL1xuXG4gIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG9wZW5lZCBtb2RhbFxuXG5cbiAgdmFyIGFjdGl2ZU1vZGFsID0gbnVsbDtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFzc29jaWF0aXZlIGFycmF5IG9mIG1vZGFscyBhbmQgaXQnc1xuICAgKiByZXNwZWN0aXZlIHRyaWdnZXJzXG4gICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VycyAgICAgQW4gYXJyYXkgb2YgYWxsIHRyaWdnZXJzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdHJpZ2dlckF0dHIgVGhlIGRhdGEtYXR0cmlidXRlIHdoaWNoIHRyaWdnZXJzIHRoZSBtb2R1bGVcbiAgICogQHJldHVybiB7YXJyYXl9XG4gICAqL1xuICB2YXIgZ2VuZXJhdGVUcmlnZ2VyTWFwID0gZnVuY3Rpb24gZ2VuZXJhdGVUcmlnZ2VyTWFwKHRyaWdnZXJzLCB0cmlnZ2VyQXR0cikge1xuICAgIHZhciB0cmlnZ2VyTWFwID0gW107XG5cbiAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICB2YXIgdGFyZ2V0TW9kYWwgPSB0cmlnZ2VyLmF0dHJpYnV0ZXNbdHJpZ2dlckF0dHJdLnZhbHVlO1xuICAgICAgaWYgKHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID09PSB1bmRlZmluZWQpIHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID0gW107XG4gICAgICB0cmlnZ2VyTWFwW3RhcmdldE1vZGFsXS5wdXNoKHRyaWdnZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJNYXA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB3aGV0aGVyIGEgbW9kYWwgb2YgdGhlIGdpdmVuIGlkIGV4aXN0c1xuICAgKiBpbiB0aGUgRE9NXG4gICAqIEBwYXJhbSAge251bWJlcn0gaWQgIFRoZSBpZCBvZiB0aGUgbW9kYWxcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UgPSBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UoaWQpIHtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkge1xuICAgICAgY29uc29sZS53YXJuKCdNaWNyb01vZGFsIHYnICsgdmVyc2lvbiArICc6IFxcdTI3NTdTZWVtcyBsaWtlIHlvdSBoYXZlIG1pc3NlZCAlY1xcJycgKyBpZCArICdcXCcnLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCAnSUQgc29tZXdoZXJlIGluIHlvdXIgY29kZS4gUmVmZXIgZXhhbXBsZSBiZWxvdyB0byByZXNvbHZlIGl0LicpO1xuICAgICAgY29uc29sZS53YXJuKCclY0V4YW1wbGU6JywgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJzxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwiJyArIGlkICsgJ1wiPjwvZGl2PicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZXJlIGFyZSBtb2RhbCB0cmlnZ2VycyBwcmVzZW50XG4gICAqIGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzIEFuIGFycmF5IG9mIGRhdGEtdHJpZ2dlcnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciB2YWxpZGF0ZVRyaWdnZXJQcmVzZW5jZSA9IGZ1bmN0aW9uIHZhbGlkYXRlVHJpZ2dlclByZXNlbmNlKHRyaWdnZXJzKSB7XG4gICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA8PSAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ01pY3JvTW9kYWwgdicgKyB2ZXJzaW9uICsgJzogXFx1Mjc1N1BsZWFzZSBzcGVjaWZ5IGF0IGxlYXN0IG9uZSAlY1xcJ21pY3JvbW9kYWwtdHJpZ2dlclxcJycsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsICdkYXRhIGF0dHJpYnV0ZS4nKTtcbiAgICAgIGNvbnNvbGUud2FybignJWNFeGFtcGxlOicsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsICc8YSBocmVmPVwiI1wiIGRhdGEtbWljcm9tb2RhbC10cmlnZ2VyPVwibXktbW9kYWxcIj48L2E+Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHJpZ2dlcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgbW9kYWxzXG4gICAqIGFyZSBwcmVzZW50IGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzICAgQXJyYXkgb2YgRE9NIG5vZGVzIHdoaWNoIGhhdmUgZGF0YS10cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlck1hcCBBc3NvY2lhdGl2ZSBhcnJheSBvZiBtb2RhbHMgYW5kIHRoaWVyIHRyaWdnZXJzXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICB2YXIgdmFsaWRhdGVBcmdzID0gZnVuY3Rpb24gdmFsaWRhdGVBcmdzKHRyaWdnZXJzLCB0cmlnZ2VyTWFwKSB7XG4gICAgdmFsaWRhdGVUcmlnZ2VyUHJlc2VuY2UodHJpZ2dlcnMpO1xuICAgIGlmICghdHJpZ2dlck1hcCkgcmV0dXJuIHRydWU7XG4gICAgZm9yICh2YXIgaWQgaW4gdHJpZ2dlck1hcCkge1xuICAgICAgdmFsaWRhdGVNb2RhbFByZXNlbmNlKGlkKTtcbiAgICB9cmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmRzIGNsaWNrIGhhbmRsZXJzIHRvIGFsbCBtb2RhbCB0cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgdmFyIGluaXQgPSBmdW5jdGlvbiBpbml0KGNvbmZpZykge1xuICAgIC8vIENyZWF0ZSBhbiBjb25maWcgb2JqZWN0IHdpdGggZGVmYXVsdCBvcGVuVHJpZ2dlclxuICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgeyBvcGVuVHJpZ2dlcjogJ2RhdGEtbWljcm9tb2RhbC10cmlnZ2VyJyB9LCBjb25maWcpO1xuXG4gICAgLy8gQ29sbGVjdHMgYWxsIHRoZSBub2RlcyB3aXRoIHRoZSB0cmlnZ2VyXG4gICAgdmFyIHRyaWdnZXJzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgb3B0aW9ucy5vcGVuVHJpZ2dlciArICddJykpKTtcblxuICAgIC8vIE1ha2VzIGEgbWFwcGluZ3Mgb2YgbW9kYWxzIHdpdGggdGhlaXIgdHJpZ2dlciBub2Rlc1xuICAgIHZhciB0cmlnZ2VyTWFwID0gZ2VuZXJhdGVUcmlnZ2VyTWFwKHRyaWdnZXJzLCBvcHRpb25zLm9wZW5UcmlnZ2VyKTtcblxuICAgIC8vIENoZWNrcyBpZiBtb2RhbHMgYW5kIHRyaWdnZXJzIGV4aXN0IGluIGRvbVxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZUFyZ3ModHJpZ2dlcnMsIHRyaWdnZXJNYXApID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHRhcmdldCBtb2RhbCBjcmVhdGVzIGEgbmV3IGluc3RhbmNlXG4gICAgZm9yICh2YXIga2V5IGluIHRyaWdnZXJNYXApIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRyaWdnZXJNYXBba2V5XTtcbiAgICAgIG9wdGlvbnMudGFyZ2V0TW9kYWwgPSBrZXk7XG4gICAgICBvcHRpb25zLnRyaWdnZXJzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KHZhbHVlKSk7XG4gICAgICBuZXcgTW9kYWwob3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTaG93cyBhIHBhcnRpY3VsYXIgbW9kYWxcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0YXJnZXRNb2RhbCBbVGhlIGlkIG9mIHRoZSBtb2RhbCB0byBkaXNwbGF5XVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIHBhc3NdXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB2YXIgc2hvdyA9IGZ1bmN0aW9uIHNob3codGFyZ2V0TW9kYWwsIGNvbmZpZykge1xuICAgIHZhciBvcHRpb25zID0gY29uZmlnIHx8IHt9O1xuICAgIG9wdGlvbnMudGFyZ2V0TW9kYWwgPSB0YXJnZXRNb2RhbDtcblxuICAgIC8vIENoZWNrcyBpZiBtb2RhbHMgYW5kIHRyaWdnZXJzIGV4aXN0IGluIGRvbVxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UodGFyZ2V0TW9kYWwpID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gc3RvcmVzIHJlZmVyZW5jZSB0byBhY3RpdmUgbW9kYWxcbiAgICBhY3RpdmVNb2RhbCA9IG5ldyBNb2RhbChvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBhY3RpdmVNb2RhbC5zaG93TW9kYWwoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBhY3RpdmUgbW9kYWxcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBjbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGFjdGl2ZU1vZGFsLmNsb3NlTW9kYWwoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0OiBpbml0LCBzaG93OiBzaG93LCBjbG9zZTogY2xvc2UgfTtcbn0oKTtcblxucmV0dXJuIE1pY3JvTW9kYWw7XG5cbn0pKSk7XG4iLCIvKiFcbiAqIFBpa2FkYXlcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNCBEYXZpZCBCdXNoZWxsIHwgQlNEICYgTUlUIGxpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZGJ1c2hlbGwvUGlrYWRheVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSlcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbW9tZW50O1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlMgbW9kdWxlXG4gICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtb21lbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uIChyZXEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgICAgIHZhciBpZCA9ICdtb21lbnQnO1xuICAgICAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxKGlkKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KG1vbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuUGlrYWRheSA9IGZhY3Rvcnkocm9vdC5tb21lbnQpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKG1vbWVudClcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBmZWF0dXJlIGRldGVjdGlvbiBhbmQgaGVscGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHZhciBoYXNNb21lbnQgPSB0eXBlb2YgbW9tZW50ID09PSAnZnVuY3Rpb24nLFxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcnMgPSAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG5cbiAgICBzdG8gPSB3aW5kb3cuc2V0VGltZW91dCxcblxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJpbSA9IGZ1bmN0aW9uKHN0cilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywnJyk7XG4gICAgfSxcblxuICAgIGhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY24gKyAnICcpICE9PSAtMTtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbikpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IChlbC5jbGFzc05hbWUgPT09ICcnKSA/IGNuIDogZWwuY2xhc3NOYW1lICsgJyAnICsgY247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0cmltKCgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLnJlcGxhY2UoJyAnICsgY24gKyAnICcsICcgJykpO1xuICAgIH0sXG5cbiAgICBpc0FycmF5ID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvQXJyYXkvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKTtcbiAgICB9LFxuXG4gICAgaXNEYXRlID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvRGF0ZS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpICYmICFpc05hTihvYmouZ2V0VGltZSgpKTtcbiAgICB9LFxuXG4gICAgaXNXZWVrZW5kID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNjtcbiAgICB9LFxuXG4gICAgaXNMZWFwWWVhciA9IGZ1bmN0aW9uKHllYXIpXG4gICAge1xuICAgICAgICAvLyBzb2x1dGlvbiBieSBNYXR0aSBWaXJra3VuZW46IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4ODE5NTFcbiAgICAgICAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9LFxuXG4gICAgZ2V0RGF5c0luTW9udGggPSBmdW5jdGlvbih5ZWFyLCBtb250aClcbiAgICB7XG4gICAgICAgIHJldHVybiBbMzEsIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV1bbW9udGhdO1xuICAgIH0sXG5cbiAgICBzZXRUb1N0YXJ0T2ZEYXkgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkgZGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICB9LFxuXG4gICAgY29tcGFyZURhdGVzID0gZnVuY3Rpb24oYSxiKVxuICAgIHtcbiAgICAgICAgLy8gd2VhayBkYXRlIGNvbXBhcmlzb24gKHVzZSBzZXRUb1N0YXJ0T2ZEYXkoZGF0ZSkgdG8gZW5zdXJlIGNvcnJlY3QgcmVzdWx0KVxuICAgICAgICByZXR1cm4gYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpO1xuICAgIH0sXG5cbiAgICBleHRlbmQgPSBmdW5jdGlvbih0bywgZnJvbSwgb3ZlcndyaXRlKVxuICAgIHtcbiAgICAgICAgdmFyIHByb3AsIGhhc1Byb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBmcm9tKSB7XG4gICAgICAgICAgICBoYXNQcm9wID0gdG9bcHJvcF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wICYmIHR5cGVvZiBmcm9tW3Byb3BdID09PSAnb2JqZWN0JyAmJiBmcm9tW3Byb3BdICE9PSBudWxsICYmIGZyb21bcHJvcF0ubm9kZU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RhdGUoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBuZXcgRGF0ZShmcm9tW3Byb3BdLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGV4dGVuZCh7fSwgZnJvbVtwcm9wXSwgb3ZlcndyaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZSB8fCAhaGFzUHJvcCkge1xuICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG87XG4gICAgfSxcblxuICAgIGZpcmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBldmVudE5hbWUsIGRhdGEpXG4gICAge1xuICAgICAgICB2YXIgZXY7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgICBldi5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZmlyZUV2ZW50KCdvbicgKyBldmVudE5hbWUsIGV2KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGp1c3RDYWxlbmRhciA9IGZ1bmN0aW9uKGNhbGVuZGFyKSB7XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA8IDApIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgLT0gTWF0aC5jZWlsKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCArPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPiAxMSkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciArPSBNYXRoLmZsb29yKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCAtPSAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsZW5kYXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlZmF1bHRzIGFuZCBsb2NhbGlzYXRpb25cbiAgICAgKi9cbiAgICBkZWZhdWx0cyA9IHtcblxuICAgICAgICAvLyBiaW5kIHRoZSBwaWNrZXIgdG8gYSBmb3JtIGZpZWxkXG4gICAgICAgIGZpZWxkOiBudWxsLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgc2hvdy9oaWRlIHRoZSBwaWNrZXIgb24gYGZpZWxkYCBmb2N1cyAoZGVmYXVsdCBgdHJ1ZWAgaWYgYGZpZWxkYCBpcyBzZXQpXG4gICAgICAgIGJvdW5kOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2YgdGhlIGRhdGVwaWNrZXIsIHJlbGF0aXZlIHRvIHRoZSBmaWVsZCAoZGVmYXVsdCB0byBib3R0b20gJiBsZWZ0KVxuICAgICAgICAvLyAoJ2JvdHRvbScgJiAnbGVmdCcga2V5d29yZHMgYXJlIG5vdCB1c2VkLCAndG9wJyAmICdyaWdodCcgYXJlIG1vZGlmaWVyIG9uIHRoZSBib3R0b20vbGVmdCBwb3NpdGlvbilcbiAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBmaXQgaW4gdGhlIHZpZXdwb3J0IGV2ZW4gaWYgaXQgbWVhbnMgcmVwb3NpdGlvbmluZyBmcm9tIHRoZSBwb3NpdGlvbiBvcHRpb25cbiAgICAgICAgcmVwb3NpdGlvbjogdHJ1ZSxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBvdXRwdXQgZm9ybWF0IGZvciBgLnRvU3RyaW5nKClgIGFuZCBgZmllbGRgIHZhbHVlXG4gICAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQnLFxuXG4gICAgICAgIC8vIHRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aGljaCBnZXRzIHBhc3NlZCBhIGN1cnJlbnQgZGF0ZSBvYmplY3QgYW5kIGZvcm1hdFxuICAgICAgICAvLyBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICAgICAgICB0b1N0cmluZzogbnVsbCxcblxuICAgICAgICAvLyB1c2VkIHRvIGNyZWF0ZSBkYXRlIG9iamVjdCBmcm9tIGN1cnJlbnQgaW5wdXQgc3RyaW5nXG4gICAgICAgIHBhcnNlOiBudWxsLFxuXG4gICAgICAgIC8vIHRoZSBpbml0aWFsIGRhdGUgdG8gdmlldyB3aGVuIGZpcnN0IG9wZW5lZFxuICAgICAgICBkZWZhdWx0RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBtYWtlIHRoZSBgZGVmYXVsdERhdGVgIHRoZSBpbml0aWFsIHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIHNldERlZmF1bHREYXRlOiBmYWxzZSxcblxuICAgICAgICAvLyBmaXJzdCBkYXkgb2Ygd2VlayAoMDogU3VuZGF5LCAxOiBNb25kYXkgZXRjKVxuICAgICAgICBmaXJzdERheTogMCxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBmbGFnIGZvciBtb21lbnQncyBzdHJpY3QgZGF0ZSBwYXJzaW5nXG4gICAgICAgIGZvcm1hdFN0cmljdDogZmFsc2UsXG5cbiAgICAgICAgLy8gdGhlIG1pbmltdW0vZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtaW5EYXRlOiBudWxsLFxuICAgICAgICAvLyB0aGUgbWF4aW11bS9sYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtYXhEYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG51bWJlciBvZiB5ZWFycyBlaXRoZXIgc2lkZSwgb3IgYXJyYXkgb2YgdXBwZXIvbG93ZXIgcmFuZ2VcbiAgICAgICAgeWVhclJhbmdlOiAxMCxcblxuICAgICAgICAvLyBzaG93IHdlZWsgbnVtYmVycyBhdCBoZWFkIG9mIHJvd1xuICAgICAgICBzaG93V2Vla051bWJlcjogZmFsc2UsXG5cbiAgICAgICAgLy8gV2VlayBwaWNrZXIgbW9kZVxuICAgICAgICBwaWNrV2hvbGVXZWVrOiBmYWxzZSxcblxuICAgICAgICAvLyB1c2VkIGludGVybmFsbHkgKGRvbid0IGNvbmZpZyBvdXRzaWRlKVxuICAgICAgICBtaW5ZZWFyOiAwLFxuICAgICAgICBtYXhZZWFyOiA5OTk5LFxuICAgICAgICBtaW5Nb250aDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhNb250aDogdW5kZWZpbmVkLFxuXG4gICAgICAgIHN0YXJ0UmFuZ2U6IG51bGwsXG4gICAgICAgIGVuZFJhbmdlOiBudWxsLFxuXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcblxuICAgICAgICAvLyBBZGRpdGlvbmFsIHRleHQgdG8gYXBwZW5kIHRvIHRoZSB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICB5ZWFyU3VmZml4OiAnJyxcblxuICAgICAgICAvLyBSZW5kZXIgdGhlIG1vbnRoIGFmdGVyIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG5cbiAgICAgICAgLy8gUmVuZGVyIGRheXMgb2YgdGhlIGNhbGVuZGFyIGdyaWQgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIEFsbG93cyB1c2VyIHRvIHNlbGVjdCBkYXlzIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBlbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIGhvdyBtYW55IG1vbnRocyBhcmUgdmlzaWJsZVxuICAgICAgICBudW1iZXJPZk1vbnRoczogMSxcblxuICAgICAgICAvLyB3aGVuIG51bWJlck9mTW9udGhzIGlzIHVzZWQsIHRoaXMgd2lsbCBoZWxwIHlvdSB0byBjaG9vc2Ugd2hlcmUgdGhlIG1haW4gY2FsZW5kYXIgd2lsbCBiZSAoZGVmYXVsdCBgbGVmdGAsIGNhbiBiZSBzZXQgdG8gYHJpZ2h0YClcbiAgICAgICAgLy8gb25seSB1c2VkIGZvciB0aGUgZmlyc3QgZGlzcGxheSBvciB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBpcyBub3QgdmlzaWJsZVxuICAgICAgICBtYWluQ2FsZW5kYXI6ICdsZWZ0JyxcblxuICAgICAgICAvLyBTcGVjaWZ5IGEgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBjYWxlbmRhciBpblxuICAgICAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBCbHVyIGZpZWxkIHdoZW4gZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICBibHVyRmllbGRPblNlbGVjdCA6IHRydWUsXG5cbiAgICAgICAgLy8gaW50ZXJuYXRpb25hbGl6YXRpb25cbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgcHJldmlvdXNNb250aCA6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICAgICAgICBuZXh0TW9udGggICAgIDogJ05leHQgTW9udGgnLFxuICAgICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoZW1lIENsYXNzbmFtZVxuICAgICAgICB0aGVtZTogbnVsbCxcblxuICAgICAgICAvLyBldmVudHMgYXJyYXlcbiAgICAgICAgZXZlbnRzOiBbXSxcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBvblNlbGVjdDogbnVsbCxcbiAgICAgICAgb25PcGVuOiBudWxsLFxuICAgICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgICBvbkRyYXc6IG51bGwsXG5cbiAgICAgICAgLy8gRW5hYmxlIGtleWJvYXJkIGlucHV0XG4gICAgICAgIGtleWJvYXJkSW5wdXQ6IHRydWVcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0aW5nIGZ1bmN0aW9ucyB0byBhYnN0cmFjdCBIVE1MIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHJlbmRlckRheU5hbWUgPSBmdW5jdGlvbihvcHRzLCBkYXksIGFiYnIpXG4gICAge1xuICAgICAgICBkYXkgKz0gb3B0cy5maXJzdERheTtcbiAgICAgICAgd2hpbGUgKGRheSA+PSA3KSB7XG4gICAgICAgICAgICBkYXkgLT0gNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJiciA/IG9wdHMuaTE4bi53ZWVrZGF5c1Nob3J0W2RheV0gOiBvcHRzLmkxOG4ud2Vla2RheXNbZGF5XTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRGF5ID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdmFyIGFyaWFTZWxlY3RlZCA9ICdmYWxzZSc7XG4gICAgICAgIGlmIChvcHRzLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtb3V0c2lkZS1jdXJyZW50LW1vbnRoJyk7XG5cbiAgICAgICAgICAgICAgICBpZighb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cImlzLWVtcHR5XCI+PC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzVG9kYXkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy10b2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgYXJpYVNlbGVjdGVkID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmhhc0V2ZW50KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaGFzLWV2ZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNJblJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtaW5yYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU3RhcnRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXN0YXJ0cmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0VuZFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZW5kcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0ZCBkYXRhLWRheT1cIicgKyBvcHRzLmRheSArICdcIiBjbGFzcz1cIicgKyBhcnIuam9pbignICcpICsgJ1wiIGFyaWEtc2VsZWN0ZWQ9XCInICsgYXJpYVNlbGVjdGVkICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtYnV0dG9uIHBpa2EtZGF5XCIgdHlwZT1cImJ1dHRvblwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnZGF0YS1waWthLXllYXI9XCInICsgb3B0cy55ZWFyICsgJ1wiIGRhdGEtcGlrYS1tb250aD1cIicgKyBvcHRzLm1vbnRoICsgJ1wiIGRhdGEtcGlrYS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmRheSArXG4gICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlcldlZWsgPSBmdW5jdGlvbiAoZCwgbSwgeSkge1xuICAgICAgICAvLyBMaWZ0ZWQgZnJvbSBodHRwOi8vamF2YXNjcmlwdC5hYm91dC5jb20vbGlicmFyeS9ibHdlZWt5ZWFyLmh0bSwgbGlnaHRseSBtb2RpZmllZC5cbiAgICAgICAgdmFyIG9uZWphbiA9IG5ldyBEYXRlKHksIDAsIDEpLFxuICAgICAgICAgICAgd2Vla051bSA9IE1hdGguY2VpbCgoKChuZXcgRGF0ZSh5LCBtLCBkKSAtIG9uZWphbikgLyA4NjQwMDAwMCkgKyBvbmVqYW4uZ2V0RGF5KCkrMSkvNyk7XG4gICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwicGlrYS13ZWVrXCI+JyArIHdlZWtOdW0gKyAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJSb3cgPSBmdW5jdGlvbihkYXlzLCBpc1JUTCwgcGlja1dob2xlV2VlaywgaXNSb3dTZWxlY3RlZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRyIGNsYXNzPVwicGlrYS1yb3cnICsgKHBpY2tXaG9sZVdlZWsgPyAnIHBpY2std2hvbGUtd2VlaycgOiAnJykgKyAoaXNSb3dTZWxlY3RlZCA/ICcgaXMtc2VsZWN0ZWQnIDogJycpICsgJ1wiPicgKyAoaXNSVEwgPyBkYXlzLnJldmVyc2UoKSA6IGRheXMpLmpvaW4oJycpICsgJzwvdHI+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyQm9keSA9IGZ1bmN0aW9uKHJvd3MpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0Ym9keT4nICsgcm93cy5qb2luKCcnKSArICc8L3Rib2R5Pic7XG4gICAgfSxcblxuICAgIHJlbmRlckhlYWQgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGFyciA9IFtdO1xuICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aD48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGggc2NvcGU9XCJjb2xcIj48YWJiciB0aXRsZT1cIicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGkpICsgJ1wiPicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGksIHRydWUpICsgJzwvYWJicj48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRoZWFkPjx0cj4nICsgKG9wdHMuaXNSVEwgPyBhcnIucmV2ZXJzZSgpIDogYXJyKS5qb2luKCcnKSArICc8L3RyPjwvdGhlYWQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGl0bGUgPSBmdW5jdGlvbihpbnN0YW5jZSwgYywgeWVhciwgbW9udGgsIHJlZlllYXIsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHZhciBpLCBqLCBhcnIsXG4gICAgICAgICAgICBvcHRzID0gaW5zdGFuY2UuX28sXG4gICAgICAgICAgICBpc01pblllYXIgPSB5ZWFyID09PSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICBpc01heFllYXIgPSB5ZWFyID09PSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICBodG1sID0gJzxkaXYgaWQ9XCInICsgcmFuZElkICsgJ1wiIGNsYXNzPVwicGlrYS10aXRsZVwiIHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+JyxcbiAgICAgICAgICAgIG1vbnRoSHRtbCxcbiAgICAgICAgICAgIHllYXJIdG1sLFxuICAgICAgICAgICAgcHJldiA9IHRydWUsXG4gICAgICAgICAgICBuZXh0ID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGFyciA9IFtdLCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArICh5ZWFyID09PSByZWZZZWFyID8gaSAtIGMgOiAxMiArIGkgLSBjKSArICdcIicgK1xuICAgICAgICAgICAgICAgIChpID09PSBtb250aCA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICtcbiAgICAgICAgICAgICAgICAoKGlzTWluWWVhciAmJiBpIDwgb3B0cy5taW5Nb250aCkgfHwgKGlzTWF4WWVhciAmJiBpID4gb3B0cy5tYXhNb250aCkgPyAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJyA6ICcnKSArICc+JyArXG4gICAgICAgICAgICAgICAgb3B0cy5pMThuLm1vbnRoc1tpXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vbnRoSHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyBvcHRzLmkxOG4ubW9udGhzW21vbnRoXSArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QtbW9udGhcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgaSA9IG9wdHMueWVhclJhbmdlWzBdO1xuICAgICAgICAgICAgaiA9IG9wdHMueWVhclJhbmdlWzFdICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPSB5ZWFyIC0gb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICBqID0gMSArIHllYXIgKyBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYXJyID0gW107IGkgPCBqICYmIGkgPD0gb3B0cy5tYXhZZWFyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID49IG9wdHMubWluWWVhcikge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCInICsgKGkgPT09IHllYXIgPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArICc+JyArIChpKSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5ZWFySHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyB5ZWFyICsgb3B0cy55ZWFyU3VmZml4ICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC15ZWFyXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAob3B0cy5zaG93TW9udGhBZnRlclllYXIpIHtcbiAgICAgICAgICAgIGh0bWwgKz0geWVhckh0bWwgKyBtb250aEh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodG1sICs9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWluWWVhciAmJiAobW9udGggPT09IDAgfHwgb3B0cy5taW5Nb250aCA+PSBtb250aCkpIHtcbiAgICAgICAgICAgIHByZXYgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01heFllYXIgJiYgKG1vbnRoID09PSAxMSB8fCBvcHRzLm1heE1vbnRoIDw9IG1vbnRoKSkge1xuICAgICAgICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLXByZXYnICsgKHByZXYgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5wcmV2aW91c01vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09IChpbnN0YW5jZS5fby5udW1iZXJPZk1vbnRocyAtIDEpICkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtbmV4dCcgKyAobmV4dCA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLm5leHRNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgfSxcblxuICAgIHJlbmRlclRhYmxlID0gZnVuY3Rpb24ob3B0cywgZGF0YSwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJwaWthLXRhYmxlXCIgcm9sZT1cImdyaWRcIiBhcmlhLWxhYmVsbGVkYnk9XCInICsgcmFuZElkICsgJ1wiPicgKyByZW5kZXJIZWFkKG9wdHMpICsgcmVuZGVyQm9keShkYXRhKSArICc8L3RhYmxlPic7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUGlrYWRheSBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFBpa2FkYXkgPSBmdW5jdGlvbihvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgb3B0cyA9IHNlbGYuY29uZmlnKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlbGYuX29uTW91c2VEb3duID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1idXR0b24nKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZW1wdHknKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LnBhcmVudE5vZGUsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShuZXcgRGF0ZSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EteWVhcicpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtbW9udGgnKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLWRheScpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYmx1ckZpZWxkT25TZWxlY3QgJiYgb3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtcHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJldk1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV4dE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyB0b3VjaCBldmVudCBwcmV2ZW50IG1vdXNlIGV2ZW50cyBlbXVsYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC1tb250aCcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvTW9udGgodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LXllYXInKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b1llYXIodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbktleUNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgICAgICAgICAgaWYgKHNlbGYuaXNWaXNpYmxlKCkpIHtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChlLmtleUNvZGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkYXRlO1xuXG4gICAgICAgICAgICBpZiAoZS5maXJlZEJ5ID09PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMucGFyc2UpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gb3B0cy5wYXJzZShvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQsIG9wdHMuZm9ybWF0U3RyaWN0KTtcbiAgICAgICAgICAgICAgICBkYXRlID0gKGRhdGUgJiYgZGF0ZS5pc1ZhbGlkKCkpID8gZGF0ZS50b0RhdGUoKSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRGb2N1cyA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENsaWNrID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Qmx1ciA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSUUgYWxsb3dzIHBpa2EgZGl2IHRvIGdhaW4gZm9jdXM7IGNhdGNoIGJsdXIgdGhlIGlucHV0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcEVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2MpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9iID0gc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9jID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgcEVsID0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0V2ZW50TGlzdGVuZXJzICYmIGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5vbmNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KHRhcmdldCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykgfHwgcEVsID09PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLl92ICYmIHRhcmdldCAhPT0gb3B0cy50cmlnZ2VyICYmIHBFbCAhPT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZWxmLmVsLmNsYXNzTmFtZSA9ICdwaWthLXNpbmdsZScgKyAob3B0cy5pc1JUTCA/ICcgaXMtcnRsJyA6ICcnKSArIChvcHRzLnRoZW1lID8gJyAnICsgb3B0cy50aGVtZSA6ICcnKTtcblxuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnbW91c2Vkb3duJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAndG91Y2hlbmQnLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG5cbiAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgc2VsZi5fb25LZXlDaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIG9wdHMuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmVsLCBvcHRzLmZpZWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCBzZWxmLl9vbklucHV0Q2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKCFvcHRzLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBvcHRzLmZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5zZXREZWZhdWx0RGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmRGF0ZSA9IG9wdHMuZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKGlzRGF0ZShkZWZEYXRlKSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2V0RGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGVmRGF0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b0RhdGUoZGVmRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgKz0gJyBpcy1ib3VuZCc7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHNlbGYuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHNlbGYuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgc2VsZi5fb25JbnB1dEJsdXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBwdWJsaWMgUGlrYWRheSBBUElcbiAgICAgKi9cbiAgICBQaWthZGF5LnByb3RvdHlwZSA9IHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb25maWd1cmUgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgKi9cbiAgICAgICAgY29uZmlnOiBmdW5jdGlvbihvcHRpb25zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX28pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvcHRzID0gZXh0ZW5kKHRoaXMuX28sIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgICAgICAgICBvcHRzLmlzUlRMID0gISFvcHRzLmlzUlRMO1xuXG4gICAgICAgICAgICBvcHRzLmZpZWxkID0gKG9wdHMuZmllbGQgJiYgb3B0cy5maWVsZC5ub2RlTmFtZSkgPyBvcHRzLmZpZWxkIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy50aGVtZSA9ICh0eXBlb2Ygb3B0cy50aGVtZSkgPT09ICdzdHJpbmcnICYmIG9wdHMudGhlbWUgPyBvcHRzLnRoZW1lIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy5ib3VuZCA9ICEhKG9wdHMuYm91bmQgIT09IHVuZGVmaW5lZCA/IG9wdHMuZmllbGQgJiYgb3B0cy5ib3VuZCA6IG9wdHMuZmllbGQpO1xuXG4gICAgICAgICAgICBvcHRzLnRyaWdnZXIgPSAob3B0cy50cmlnZ2VyICYmIG9wdHMudHJpZ2dlci5ub2RlTmFtZSkgPyBvcHRzLnRyaWdnZXIgOiBvcHRzLmZpZWxkO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVXZWVrZW5kcyA9ICEhb3B0cy5kaXNhYmxlV2Vla2VuZHM7XG5cbiAgICAgICAgICAgIG9wdHMuZGlzYWJsZURheUZuID0gKHR5cGVvZiBvcHRzLmRpc2FibGVEYXlGbikgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRpc2FibGVEYXlGbiA6IG51bGw7XG5cbiAgICAgICAgICAgIHZhciBub20gPSBwYXJzZUludChvcHRzLm51bWJlck9mTW9udGhzLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIG9wdHMubnVtYmVyT2ZNb250aHMgPSBub20gPiA0ID8gNCA6IG5vbTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvcHRzLm1pbkRhdGUgJiYgb3B0cy5tYXhEYXRlKSAmJiBvcHRzLm1heERhdGUgPCBvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbkRhdGUob3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1heERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1heERhdGUob3B0cy5tYXhEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZhbGxiYWNrID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gMTA7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2VbMF0gPSBwYXJzZUludChvcHRzLnllYXJSYW5nZVswXSwgMTApIHx8IGZhbGxiYWNrO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzFdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMV0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2UgPSBNYXRoLmFicyhwYXJzZUludChvcHRzLnllYXJSYW5nZSwgMTApKSB8fCBkZWZhdWx0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMueWVhclJhbmdlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uICh1c2luZyBNb21lbnQuanMgaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuX28uZm9ybWF0O1xuICAgICAgICAgICAgaWYgKCFpc0RhdGUodGhpcy5fZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fby50b1N0cmluZykge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fby50b1N0cmluZyh0aGlzLl9kLCBmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuX2QpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2QudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIE1vbWVudC5qcyBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb21lbnQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGhhc01vbWVudCA/IG1vbWVudCh0aGlzLl9kKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gZnJvbSBhIE1vbWVudC5qcyBvYmplY3QgKGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHNldE1vbWVudDogZnVuY3Rpb24oZGF0ZSwgcHJldmVudE9uU2VsZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50ICYmIG1vbWVudC5pc01vbWVudChkYXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlLnRvRGF0ZSgpLCBwcmV2ZW50T25TZWxlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBEYXRlIG9iamVjdCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGdldERhdGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGlzRGF0ZSh0aGlzLl9kKSA/IG5ldyBEYXRlKHRoaXMuX2QuZ2V0VGltZSgpKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHNldERhdGU6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuX28ubWluRGF0ZSxcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLl9vLm1heERhdGU7XG5cbiAgICAgICAgICAgIGlmIChpc0RhdGUobWluKSAmJiBkYXRlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1pbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG1heCkgJiYgZGF0ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodGhpcy5fZCk7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKHRoaXMuX2QpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRPblNlbGVjdCAmJiB0eXBlb2YgdGhpcy5fby5vblNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLmdldERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b0RhdGU6IGZ1bmN0aW9uKGRhdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBuZXdDYWxlbmRhciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxlbmRhcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzWzBdLnllYXIsIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlID0gbmV3IERhdGUodGhpcy5jYWxlbmRhcnNbdGhpcy5jYWxlbmRhcnMubGVuZ3RoLTFdLnllYXIsIHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVEYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBlbmQgb2YgdGhlIG1vbnRoXG4gICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlLnNldE1vbnRoKGxhc3RWaXNpYmxlRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXREYXRlKGxhc3RWaXNpYmxlRGF0ZS5nZXREYXRlKCktMSk7XG4gICAgICAgICAgICAgICAgbmV3Q2FsZW5kYXIgPSAodmlzaWJsZURhdGUgPCBmaXJzdFZpc2libGVEYXRlLmdldFRpbWUoKSB8fCBsYXN0VmlzaWJsZURhdGUuZ2V0VGltZSgpIDwgdmlzaWJsZURhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3Q2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLm1haW5DYWxlbmRhciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCArPSAxIC0gdGhpcy5fby5udW1iZXJPZk1vbnRocztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0RGF0ZTogZnVuY3Rpb24oc2lnbiwgZGF5cykge1xuXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXREYXRlKCkgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gcGFyc2VJbnQoZGF5cykqMjQqNjAqNjAqMTAwMDtcblxuICAgICAgICAgICAgdmFyIG5ld0RheTtcblxuICAgICAgICAgICAgaWYgKHNpZ24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSArIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaWduID09PSAnc3VidHJhY3QnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSAtIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldERhdGUobmV3RGF5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0gPSBhZGp1c3RDYWxlbmRhcih0aGlzLmNhbGVuZGFyc1swXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMTsgYyA8IHRoaXMuX28ubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2NdID0gYWRqdXN0Q2FsZW5kYXIoe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKyBjLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiB0aGlzLmNhbGVuZGFyc1swXS55ZWFyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvVG9kYXk6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBtb250aCAoemVyby1pbmRleCwgZS5nLiAwOiBKYW51YXJ5KVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b01vbnRoOiBmdW5jdGlvbihtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTihtb250aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgrKztcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldk1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLS07XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGZ1bGwgeWVhciAoZS5nLiBcIjIwMTJcIilcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9ZZWFyOiBmdW5jdGlvbih5ZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHllYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1pbkRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1pbkRhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSBkZWZhdWx0cy5taW5EYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSBkZWZhdWx0cy5taW5ZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSBkZWZhdWx0cy5taW5Nb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSBkZWZhdWx0cy5zdGFydFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtYXhEYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNYXhEYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSBkZWZhdWx0cy5tYXhEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IGRlZmF1bHRzLm1heFllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IGRlZmF1bHRzLm1heE1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSBkZWZhdWx0cy5lbmRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U3RhcnRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEVuZFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZWZyZXNoIHRoZSBIVE1MXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3OiBmdW5jdGlvbihmb3JjZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92ICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBtaW5ZZWFyID0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgICAgIG1heFllYXIgPSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICAgICAgbWluTW9udGggPSBvcHRzLm1pbk1vbnRoLFxuICAgICAgICAgICAgICAgIG1heE1vbnRoID0gb3B0cy5tYXhNb250aCxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgcmFuZElkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5feSA8PSBtaW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1pblllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtaW5Nb250aCkgJiYgdGhpcy5fbSA8IG1pbk1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtaW5Nb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5feSA+PSBtYXhZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1heFllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtYXhNb250aCkgJiYgdGhpcy5fbSA+IG1heE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtYXhNb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJhbmRJZCA9ICdwaWthLXRpdGxlLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb3B0cy5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInBpa2EtbGVuZGFyXCI+JyArIHJlbmRlclRpdGxlKHRoaXMsIGMsIHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCB0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCByYW5kSWQpICsgdGhpcy5yZW5kZXIodGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHJhbmRJZCkgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGlmKG9wdHMuZmllbGQudHlwZSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy50cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uRHJhdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25EcmF3KHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgc2NyZWVuIHJlYWRlciB1c2VyIGtub3cgdG8gdXNlIGFycm93IGtleXNcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdVc2UgdGhlIGFycm93IGtleXMgdG8gcGljayBhIGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RQb3NpdGlvbjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmllbGQsIHBFbCwgd2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIHNjcm9sbFRvcCwgbGVmdCwgdG9wLCBjbGllbnRSZWN0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5jb250YWluZXIpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgICAgIGZpZWxkID0gdGhpcy5fby50cmlnZ2VyO1xuICAgICAgICAgICAgcEVsID0gZmllbGQ7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50UmVjdCA9IGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdG9wID0gY2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgID0gcEVsLm9mZnNldFRvcCArIHBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2hpbGUoKHBFbCA9IHBFbC5vZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgKz0gcEVsLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgcG9zaXRpb24gaXMgYm90dG9tICYgbGVmdFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgbGVmdCArIHdpZHRoID4gdmlld3BvcnRXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigncmlnaHQnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIHRvcCArIGhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICsgc2Nyb2xsVG9wKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCd0b3AnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW5kZXIgSFRNTCBmb3IgYSBwYXJ0aWN1bGFyIG1vbnRoXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCByYW5kSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzICAgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG5vdyAgICA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5cyAgID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFxuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXRhICAgPSBbXSxcbiAgICAgICAgICAgICAgICByb3cgICAgPSBbXTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheShub3cpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZmlyc3REYXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlIC09IG9wdHMuZmlyc3REYXk7XG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlICs9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSAxLFxuICAgICAgICAgICAgICAgIG5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIDEsXG4gICAgICAgICAgICAgICAgeWVhck9mUHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8geWVhciAtIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIHllYXJPZk5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IHllYXIgKyAxIDogeWVhcixcbiAgICAgICAgICAgICAgICBkYXlzSW5QcmV2aW91c01vbnRoID0gZ2V0RGF5c0luTW9udGgoeWVhck9mUHJldmlvdXNNb250aCwgcHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBkYXlzICsgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyID0gY2VsbHM7XG4gICAgICAgICAgICB3aGlsZShhZnRlciA+IDcpIHtcbiAgICAgICAgICAgICAgICBhZnRlciAtPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMgKz0gNyAtIGFmdGVyO1xuICAgICAgICAgICAgdmFyIGlzV2Vla1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgciA9IDA7IGkgPCBjZWxsczsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBkYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSArIChpIC0gYmVmb3JlKSksXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSBpc0RhdGUodGhpcy5fZCkgPyBjb21wYXJlRGF0ZXMoZGF5LCB0aGlzLl9kKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc1RvZGF5ID0gY29tcGFyZURhdGVzKGRheSwgbm93KSxcbiAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQgPSBvcHRzLmV2ZW50cy5pbmRleE9mKGRheS50b0RhdGVTdHJpbmcoKSkgIT09IC0xID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5ID0gaSA8IGJlZm9yZSB8fCBpID49IChkYXlzICsgYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gMSArIChpIC0gYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBtb250aCxcbiAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXIsXG4gICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5zdGFydFJhbmdlLCBkYXkpLFxuICAgICAgICAgICAgICAgICAgICBpc0VuZFJhbmdlID0gb3B0cy5lbmRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5lbmRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNJblJhbmdlID0gb3B0cy5zdGFydFJhbmdlICYmIG9wdHMuZW5kUmFuZ2UgJiYgb3B0cy5zdGFydFJhbmdlIDwgZGF5ICYmIGRheSA8IG9wdHMuZW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSAob3B0cy5taW5EYXRlICYmIGRheSA8IG9wdHMubWluRGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm1heERhdGUgJiYgZGF5ID4gb3B0cy5tYXhEYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZVdlZWtlbmRzICYmIGlzV2Vla2VuZChkYXkpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZURheUZuICYmIG9wdHMuZGlzYWJsZURheUZuKGRheSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheXNJblByZXZpb3VzTW9udGggKyBkYXlOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IHByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mUHJldmlvdXNNb250aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheU51bWJlciAtIGRheXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IG5leHRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyT2ZOZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF5Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogbW9udGhOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiB5ZWFyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQ6IGhhc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9kYXk6IGlzVG9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbXB0eTogaXNFbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZTogaXNTdGFydFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZTogaXNFbmRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZTogaXNJblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBvcHRzLmVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoc1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucGlja1dob2xlV2VlayAmJiBpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzV2Vla1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb3cucHVzaChyZW5kZXJEYXkoZGF5Q29uZmlnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKytyID09PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cudW5zaGlmdChyZW5kZXJXZWVrKGkgLSBiZWZvcmUsIG1vbnRoLCB5ZWFyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHJlbmRlclJvdyhyb3csIG9wdHMuaXNSVEwsIG9wdHMucGlja1dob2xlV2VlaywgaXNXZWVrU2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZW5kZXJUYWJsZShvcHRzLCBkYXRhLCByYW5kSWQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzVmlzaWJsZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdjtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsICdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uT3Blbi5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdjtcbiAgICAgICAgICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnOyAvLyByZXNldFxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRoaXMuX28ub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdBTUUgT1ZFUlxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX287XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICd0b3VjaGVuZCcsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICBpZiAob3B0cy5rZXlib2FyZElucHV0KSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fb25LZXlDaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgdGhpcy5fb25JbnB1dENoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCB0aGlzLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHRoaXMuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBQaWthZGF5O1xufSkpO1xuIl19
