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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/is-in-viewport":35,"../utils/toggle":39,"array-filter":1,"array-foreach":2,"object-assign":9}],18:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/toggle":39}],19:[function(require,module,exports){
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

},{"../../vendor/pikaday.js":41,"../utils/behavior":33,"../utils/closest":34,"../utils/select":36}],20:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/select":36,"./accordion":17,"array-foreach":2,"lodash.debounce":8}],21:[function(require,module,exports){
'use strict';

module.exports = {
  accordion: require('./accordion'),
  banner: require('./banner'),
  footer: require('./footer'),
  //modal:     require('./modal'),
  navigation: require('./navigation'),
  password: require('./password'),
  search: require('./search'),
  skipnav: require('./skipnav'),
  validator: require('./validator'),
  regexmask: require('./regex-input-mask')
  //table:      require('./table'),
  //overflow:   require('./overflow-menu'),
};

},{"./accordion":17,"./banner":18,"./footer":20,"./navigation":22,"./password":23,"./regex-input-mask":24,"./search":25,"./skipnav":26,"./validator":27}],22:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/select":36,"./accordion":17,"array-foreach":2,"object-assign":9}],23:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/toggle-form-input":38}],24:[function(require,module,exports){

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

},{"../utils/behavior":33}],25:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"../utils/select":36,"array-foreach":2,"object-assign":9,"receptor/ignore":14}],26:[function(require,module,exports){
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

},{"../config":28,"../events":30,"../utils/behavior":33,"receptor/once":15}],27:[function(require,module,exports){
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

},{"../utils/behavior":33,"../utils/validate-input":40,"lodash.debounce":8}],28:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: ''
};

},{}],29:[function(require,module,exports){
'use strict';

var domready = require('domready');
var forEach = require('array-foreach');
var select = require('./utils/select');
var datepicker = require('./components/datepicker');

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

},{"./components":21,"./components/datepicker":19,"./config":28,"./polyfills":32,"./utils/select":36,"array-foreach":2,"domready":5}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

},{"./element-hidden":31,"classlist-polyfill":4}],33:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":9,"receptor/behavior":10}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./select":36,"./toggle-field-mask":37,"array-foreach":2,"resolve-id-refs":16}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"../config":28,"elem-dataset":6}],41:[function(require,module,exports){
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

},{"moment":3}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvZWxlbS1kYXRhc2V0L2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9iZWhhdmlvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9jb21wb3NlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlQWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2RlbGVnYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2lnbm9yZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2RhdGVwaWNrZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9wYXNzd29yZC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JlZ2V4LWlucHV0LW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvanMvY29tcG9uZW50cy9za2lwbmF2LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmFsaWRhdG9yLmpzIiwic3JjL2pzL2NvbmZpZy5qcyIsInNyYy9qcy9ka3dkcy5qcyIsInNyYy9qcy9ldmVudHMuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9jbG9zZXN0LmpzIiwic3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUuanMiLCJzcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiLCJzcmMvdmVuZG9yL3Bpa2FkYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7Ozs7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsSUFBbkIsRUFBeUI7QUFDeEMsTUFBSSxJQUFJLE1BQVIsRUFBZ0IsT0FBTyxJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsSUFBZixDQUFQO0FBQ2hCLE1BQUksS0FBSyxDQUFMLEtBQVcsR0FBWCxJQUFrQixTQUFTLEdBQS9CLEVBQW9DLE1BQU0sSUFBSSxTQUFKLEVBQU47QUFDcEMsTUFBSSxjQUFjLE9BQU8sRUFBekIsRUFBNkIsTUFBTSxJQUFJLFNBQUosRUFBTjtBQUM3QixNQUFJLE1BQU0sRUFBVjtBQUNBLE9BQUssSUFBSSxJQUFJLENB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QTJoQmhCOzs7QUFHQSxpQkFBUyxtQkFDVDtBQUNJLGdCQUFJLE9BQU8sS0FBSyxFQUFoQjs7QUFFQSxpQkFBSyxJQUFMO0FBQ0Esd0JBQVksS0FBSyxFQUFqQixFQUFxQixXQUFyQixFQUFrQyxLQUFLLFlBQXZDLEVBQXFELElBQXJEO0FBQ0Esd0JBQVksS0FBSyxFQUFqQixFQUFxQixVQUFyQixFQUFpQyxLQUFLLFlBQXRDLEVBQW9ELElBQXBEO0FBQ0Esd0JBQVksS0FBSyxFQUFqQixFQUFxQixRQUFyQixFQUErQixLQUFLLFNBQXBDO0FBQ0EsZ0JBQUksS0FBSyxhQUFULEVBQXdCO0FBQ3BCLDRCQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsS0FBSyxZQUF0QztBQUNIO0FBQ0QsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osNEJBQVksS0FBSyxLQUFqQixFQUF3QixRQUF4QixFQUFrQyxLQUFLLGNBQXZDO0FBQ0Esb0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixNQUExQixFQUFrQyxLQUFLLFlBQXZDO0FBQ0g7QUFDSjtBQUNELGdCQUFJLEtBQUssRUFBTCxDQUFRLFVBQVosRUFBd0I7QUFDcEIscUJBQUssRUFBTCxDQUFRLFVBQVIsQ0FBbUIsV0FBbkIsQ0FBK0IsS0FBSyxFQUFwQztBQUNIO0FBQ0o7O0FBcGpCZSxLQUFwQjs7QUF3akJBLFdBQU8sT0FBUDtBQUNILENBdHRDQSxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4vKipcbiAqIEFycmF5I2ZpbHRlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdD19IHNlbGZcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93IFR5cGVFcnJvclxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgZm4sIHNlbGYpIHtcbiAgaWYgKGFyci5maWx0ZXIpIHJldHVybiBhcnIuZmlsdGVyKGZuLCBzZWxmKTtcbiAgaWYgKHZvaWQgMCA9PT0gYXJyIHx8IG51bGwgPT09IGFycikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChhcnIsIGkpKSBjb250aW51ZTtcbiAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgIGlmIChmbi5jYWxsKHNlbGYsIHZhbCwgaSwgYXJyKSkgcmV0LnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4iLCIvKipcbiAqIGFycmF5LWZvcmVhY2hcbiAqICAgQXJyYXkjZm9yRWFjaCBwb255ZmlsbCBmb3Igb2xkZXIgYnJvd3NlcnNcbiAqICAgKFBvbnlmaWxsOiBBIHBvbHlmaWxsIHRoYXQgZG9lc24ndCBvdmVyd3JpdGUgdGhlIG5hdGl2ZSBtZXRob2QpXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LTIwMTYgVGFrdXRvIFdhZGFcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL3R3YWRhL2FycmF5LWZvcmVhY2gvYmxvYi9tYXN0ZXIvTUlULUxJQ0VOU0VcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvckVhY2ggKGFyeSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAoYXJ5LmZvckVhY2gpIHtcbiAgICAgICAgYXJ5LmZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGFyeVtpXSwgaSwgYXJ5KTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSmZaVzF3ZEhrdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTcwNDI3XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogRGVkaWNhdGVkIHRvIHRoZSBwdWJsaWMgZG9tYWluLlxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuLy8gSW5jbHVkaW5nIElFIDwgRWRnZSBtaXNzaW5nIFNWR0VsZW1lbnQuY2xhc3NMaXN0XG5pZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKSBcblx0fHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxudmFyXG5cdCAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcblx0LCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG5cdCwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cblx0LCBvYmpDdHIgPSBPYmplY3Rcblx0LCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdH1cblx0LCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIGkgPSAwXG5cdFx0XHQsIGxlbiA9IHRoaXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cdC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuXHQsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcblx0XHR0aGlzLm5hbWUgPSB0eXBlO1xuXHRcdHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9XG5cdCwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcblx0XHRpZiAodG9rZW4gPT09IFwiXCIpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIlNZTlRBWF9FUlJcIlxuXHRcdFx0XHQsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcblx0XHRcdFx0LCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuXHR9XG5cdCwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKVxuXHRcdFx0LCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cblx0XHRcdCwgaSA9IDBcblx0XHRcdCwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuXHRcdH1cblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMudG9TdHJpbmcoKSk7XG5cdFx0fTtcblx0fVxuXHQsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuXHQsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcblx0fVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuXHRyZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cdHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuXHRcdFx0dGhpcy5wdXNoKHRva2VuKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHRcdCwgaW5kZXhcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR3aGlsZSAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHR0aGlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cblx0dmFyXG5cdFx0ICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuXHRcdCwgbWV0aG9kID0gcmVzdWx0ID9cblx0XHRcdGZvcmNlICE9PSB0cnVlICYmIFwicmVtb3ZlXCJcblx0XHQ6XG5cdFx0XHRmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuXHQ7XG5cblx0aWYgKG1ldGhvZCkge1xuXHRcdHRoaXNbbWV0aG9kXSh0b2tlbik7XG5cdH1cblxuXHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGZvcmNlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAhcmVzdWx0O1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuXHR2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG5cdFx0ICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuXHRcdCwgZW51bWVyYWJsZTogdHJ1ZVxuXHRcdCwgY29uZmlndXJhYmxlOiB0cnVlXG5cdH07XG5cdHRyeSB7XG5cdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHR9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcblx0XHQvLyBhZGRpbmcgdW5kZWZpbmVkIHRvIGZpZ2h0IHRoaXMgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2lzc3Vlcy8zNlxuXHRcdC8vIG1vZGVybmllIElFOC1NU1c3IG1hY2hpbmUgaGFzIElFOCA4LjAuNjAwMS4xODcwMiBhbmQgaXMgYWZmZWN0ZWRcblx0XHRpZiAoZXgubnVtYmVyID09PSB1bmRlZmluZWQgfHwgZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuXHRcdFx0Y2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuXHRcdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHRcdH1cblx0fVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG5cdGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0od2luZG93LnNlbGYpKTtcblxufVxuXG4vLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbi8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjMVwiLCBcImMyXCIpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG5cdC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuXHRpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKSB7XG5cdFx0dmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG5cdFx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0XHR2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHR0b2tlbiA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHRvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG5cdFx0Y3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcblx0fVxuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuXHQvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuXHRcdHZhciBfdG9nZ2xlID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cblx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuXHRcdFx0aWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG5cdFx0XHRcdHJldHVybiBmb3JjZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0fVxuXG5cdHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG5cbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gPDMgTW9kZXJuaXpyXG4vLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTW9kZXJuaXpyL01vZGVybml6ci9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2RvbS9kYXRhc2V0LmpzXG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSgpIHtcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYS1iJywgJ2MnKTtcblxuXHRyZXR1cm4gQm9vbGVhbihlbGVtLmRhdGFzZXQgJiYgZWxlbS5kYXRhc2V0LmFCID09PSAnYycpO1xufVxuXG5mdW5jdGlvbiBuYXRpdmVEYXRhc2V0KGVsZW1lbnQpIHtcblx0cmV0dXJuIGVsZW1lbnQuZGF0YXNldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IG5hdGl2ZURhdGFzZXQgOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHR2YXIgbWFwID0ge307XG5cdHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuXG5cdGZ1bmN0aW9uIGdldHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldHRlcihuYW1lLCB2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGZvciAodmFyIGkgPSAwLCBqID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHR2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcblxuXHRcdGlmIChhdHRyaWJ1dGUpIHtcblx0XHRcdHZhciBuYW1lID0gYXR0cmlidXRlLm5hbWU7XG5cblx0XHRcdGlmIChuYW1lLmluZGV4T2YoJ2RhdGEtJykgPT09IDApIHtcblx0XHRcdFx0dmFyIHByb3AgPSBuYW1lLnNsaWNlKDUpLnJlcGxhY2UoLy0uL2csIGZ1bmN0aW9uICh1KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHUuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBwcm9wLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGdldHRlci5iaW5kKHsgdmFsdWU6IHZhbHVlIHx8ICcnIH0pLFxuXHRcdFx0XHRcdHNldDogc2V0dGVyLmJpbmQoZWxlbWVudCwgbmFtZSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hcDtcbn07XG5cbiIsIi8vIGVsZW1lbnQtY2xvc2VzdCB8IENDMC0xLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvY2xvc2VzdFxuXG4oZnVuY3Rpb24gKEVsZW1lbnRQcm90bykge1xuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLm1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblx0XHRcdHZhciBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuXHRcdH07XG5cdH1cblxuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLmNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdH1cbn0pKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSk7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgZGVsZWdhdGVBbGwgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZUFsbCcpO1xuXG5jb25zdCBERUxFR0FURV9QQVRURVJOID0gL14oLispOmRlbGVnYXRlXFwoKC4rKVxcKSQvO1xuY29uc3QgU1BBQ0UgPSAnICc7XG5cbmNvbnN0IGdldExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgdmFyIG1hdGNoID0gdHlwZS5tYXRjaChERUxFR0FURV9QQVRURVJOKTtcbiAgdmFyIHNlbGVjdG9yO1xuICBpZiAobWF0Y2gpIHtcbiAgICB0eXBlID0gbWF0Y2hbMV07XG4gICAgc2VsZWN0b3IgPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHZhciBvcHRpb25zO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IHBvcEtleShoYW5kbGVyLCAnY2FwdHVyZScpLFxuICAgICAgcGFzc2l2ZTogcG9wS2V5KGhhbmRsZXIsICdwYXNzaXZlJylcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0ge1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBkZWxlZ2F0ZTogKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0JylcbiAgICAgID8gZGVsZWdhdGVBbGwoaGFuZGxlcilcbiAgICAgIDogc2VsZWN0b3JcbiAgICAgICAgPyBkZWxlZ2F0ZShzZWxlY3RvciwgaGFuZGxlcilcbiAgICAgICAgOiBoYW5kbGVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICBpZiAodHlwZS5pbmRleE9mKFNQQUNFKSA+IC0xKSB7XG4gICAgcmV0dXJuIHR5cGUuc3BsaXQoU1BBQ0UpLm1hcChmdW5jdGlvbihfdHlwZSkge1xuICAgICAgcmV0dXJuIGFzc2lnbih7dHlwZTogX3R5cGV9LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbnZhciBwb3BLZXkgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlaGF2aW9yKGV2ZW50cywgcHJvcHMpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24obWVtbywgdHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0eXBlLCBldmVudHNbdHlwZV0pO1xuICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KGxpc3RlbmVycyk7XG4gICAgfSwgW10pO1xuXG4gIHJldHVybiBhc3NpZ24oe1xuICAgIGFkZDogZnVuY3Rpb24gYWRkQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZUJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgcHJvcHMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZShmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnNvbWUoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpID09PSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmUoZWxlbWVudCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlnbm9yYW5jZShlKSB7XG4gICAgaWYgKGVsZW1lbnQgIT09IGUudGFyZ2V0ICYmICFlbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25jZShsaXN0ZW5lciwgb3B0aW9ucykge1xuICB2YXIgd3JhcHBlZCA9IGZ1bmN0aW9uIHdyYXBwZWRPbmNlKGUpIHtcbiAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIHdyYXBwZWQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xuICB9O1xuICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJFX1RSSU0gPSAvKF5cXHMrKXwoXFxzKyQpL2c7XG52YXIgUkVfU1BMSVQgPSAvXFxzKy87XG5cbnZhciB0cmltID0gU3RyaW5nLnByb3RvdHlwZS50cmltXG4gID8gZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZShSRV9UUklNLCAnJyk7IH07XG5cbnZhciBxdWVyeUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbaWQ9XCInICsgaWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNvbHZlSWRzKGlkcywgZG9jKSB7XG4gIGlmICh0eXBlb2YgaWRzICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYnV0IGdvdCAnICsgKHR5cGVvZiBpZHMpKTtcbiAgfVxuXG4gIGlmICghZG9jKSB7XG4gICAgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGdldEVsZW1lbnRCeUlkID0gZG9jLmdldEVsZW1lbnRCeUlkXG4gICAgPyBkb2MuZ2V0RWxlbWVudEJ5SWQuYmluZChkb2MpXG4gICAgOiBxdWVyeUJ5SWQuYmluZChkb2MpO1xuXG4gIGlkcyA9IHRyaW0oaWRzKS5zcGxpdChSRV9TUExJVCk7XG5cbiAgLy8gWFhYIHdlIGNhbiBzaG9ydC1jaXJjdWl0IGhlcmUgYmVjYXVzZSB0cmltbWluZyBhbmQgc3BsaXR0aW5nIGFcbiAgLy8gc3RyaW5nIG9mIGp1c3Qgd2hpdGVzcGFjZSBwcm9kdWNlcyBhbiBhcnJheSBjb250YWluaW5nIGEgc2luZ2xlLFxuICAvLyBlbXB0eSBzdHJpbmdcbiAgaWYgKGlkcy5sZW5ndGggPT09IDEgJiYgaWRzWzBdID09PSAnJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBpZHNcbiAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgZWwgPSBnZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCB3aXRoIGlkOiBcIicgKyBpZCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoJ2FycmF5LWZpbHRlcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuY29uc3QgaXNFbGVtZW50SW5WaWV3cG9ydCA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzLWluLXZpZXdwb3J0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbi8vIFhYWCBtYXRjaCAuYWNjb3JkaW9uIGFuZCAuYWNjb3JkaW9uLWJvcmRlcmVkXG5jb25zdCBBQ0NPUkRJT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbiwgLiR7UFJFRklYfWFjY29yZGlvbi1ib3JkZXJlZGA7XG5jb25zdCBCVVRUT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbi1idXR0b25bYXJpYS1jb250cm9sc11gO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSAnYXJpYS1tdWx0aXNlbGVjdGFibGUnO1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIHZhciBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBleHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uZ2V0QXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSkgPT09ICd0cnVlJztcblxuICBpZiAoZXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGZvckVhY2goZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLCBvdGhlciA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBidXR0b24gZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogYWNjb3JkaW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY2NvcmRpb25cbiAqIEByZXR1cm4ge2FycmF5PEhUTUxCdXR0b25FbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0QWNjb3JkaW9uQnV0dG9ucyA9IGFjY29yZGlvbiA9PiB7XG4gIHJldHVybiBmaWx0ZXIoYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKSwgYnV0dG9uID0+IHtcbiAgICByZXR1cm4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uO1xuICB9KTtcbn07XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdG9nZ2xlQnV0dG9uKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZScpIHtcbiAgICAgICAgLy8gV2Ugd2VyZSBqdXN0IGV4cGFuZGVkLCBidXQgaWYgYW5vdGhlciBhY2NvcmRpb24gd2FzIGFsc28ganVzdFxuICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzKSkgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQ6IHJvb3QgPT4ge1xuICAgIGZvckVhY2gocm9vdC5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZSc7XG4gICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgfSk7XG4gIH0sXG4gIEFDQ09SRElPTixcbiAgQlVUVE9OLFxuICBzaG93OiBzaG93QnV0dG9uLFxuICBoaWRlOiBoaWRlQnV0dG9uLFxuICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbn0pO1xuXG4vKipcbiAqIFRPRE86IGZvciAyLjAsIHJlbW92ZSBldmVyeXRoaW5nIGJlbG93IHRoaXMgY29tbWVudCBhbmQgZXhwb3J0IHRoZVxuICogYmVoYXZpb3IgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IEFjY29yZGlvbiA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHRoaXMucm9vdCA9IHJvb3Q7XG4gIGFjY29yZGlvbi5vbih0aGlzLnJvb3QpO1xufTtcblxuLy8gY29weSBhbGwgb2YgdGhlIGJlaGF2aW9yIG1ldGhvZHMgYW5kIHByb3BzIHRvIEFjY29yZGlvblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuYXNzaWduKEFjY29yZGlvbiwgYWNjb3JkaW9uKTtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gc2hvd0J1dHRvbjtcbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGhpZGVCdXR0b247XG5cbkFjY29yZGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICBhY2NvcmRpb24ub2ZmKHRoaXMucm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfWJhbm5lci1oZWFkZXJgO1xuY29uc3QgRVhQQU5ERURfQ0xBU1MgPSBgJHtQUkVGSVh9YmFubmVyLWhlYWRlci1leHBhbmRlZGA7XG5cbmNvbnN0IHRvZ2dsZUJhbm5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmNsb3Nlc3QoSEVBREVSKS5jbGFzc0xpc3QudG9nZ2xlKEVYUEFOREVEX0NMQVNTKTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgYCR7SEVBREVSfSBbYXJpYS1jb250cm9sc11gIF06IHRvZ2dsZUJhbm5lcixcbiAgfSxcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IFBpa2FkYXkgPSByZXF1aXJlKFwiLi4vLi4vdmVuZG9yL3Bpa2FkYXkuanNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XG5cbmNvbnN0IGpzRGF0ZXBpY2tlclNlbGVjdG9yID0gJy5qcy1jYWxlbmRhci1kYXRlcGlja2VyJztcbmNvbnN0IGpzRGF5SW5wdXQgPSAnLmpzLWNhbGVuZGFyLWRheS1pbnB1dCc7XG5jb25zdCBqc01vbnRoSW5wdXQgPSAnLmpzLWNhbGVuZGFyLW1vbnRoLWlucHV0JztcbmNvbnN0IGpzWWVhcklucHV0ID0gJy5qcy1jYWxlbmRhci15ZWFyLWlucHV0JztcblxuY2xhc3MgZGF0ZXBpY2tlckdyb3VwIHtcbiAgY29uc3RydWN0b3IoZWwpe1xuICAgIFxuICAgIHRoaXMucGlrYWRheUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLmRhdGVwaWNrZXJFbGVtZW50ID0gc2VsZWN0KGpzRGF0ZXBpY2tlclNlbGVjdG9yLCBlbCk7XG4gICAgdGhpcy5kYXRlR3JvdXAgPSBlbDtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IGNsb3Nlc3QoZWwsICcuZm9ybS1ncm91cCcpO1xuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQgPSBudWxsOyAgIFxuXG4gICAgdGhpcy5pbml0RGF0ZUlucHV0cygpO1xuICAgIHRoaXMuaW5pdERhdGVwaWNrZXIodGhpcy5kYXRlcGlja2VyRWxlbWVudFswXSk7XG4gIH1cblxuICBpbml0RGF0ZUlucHV0cygpe1xuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzRGF5SW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXVxuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNNb250aElucHV0LCB0aGlzLmRhdGVHcm91cClbMF07XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzWWVhcklucHV0LCB0aGlzLmRhdGVHcm91cClbMF07XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMueWVhcklucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdERhdGVwaWNrZXIoZWwpe1xuICAgIGlmKGVsKXtcbiAgICAgIC8vTm90ZTogZWwgbWF5IG5vdCBiZSBhIDxzdmc+LCBJRTExIGRvZXMgbm90IGFkZCAuYmx1cigpIG1ldGhvZCB0byBzdmcgZWxlbWVudHMgKC0tPiBlc2MgYW5kIGVudGVyIGRvZXMgbm90IGRpc21pc3MgcGlrYWRheSkuIFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZSA9IG5ldyBQaWthZGF5KHtcbiAgICAgICAgZmllbGQ6IGVsLFxuICAgICAgICBmb3JtYXQ6ICdERC9NTS9ZWVlZJyxcbiAgICAgICAgZmlyc3REYXk6IDEsIC8vbWFuZGFnXG4gICAgICAgIGkxOG46IHtcbiAgICAgICAgICBwcmV2aW91c01vbnRoIDogJ0ZvcnJpZ2UgbcOlbmVkJyxcbiAgICAgICAgICBuZXh0TW9udGggICAgIDogJ07DpnN0ZSBtw6VuZWQnLFxuICAgICAgICAgIG1vbnRocyAgICAgICAgOiBbJ0phbnVhcicsJ0ZlYnJ1YXInLCdNYXJ0aCcsJ0FwcmlsJywnTWFqJywnSnVuaScsJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPa3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxuICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1PDuG5kYWcnLCdNYW5kYWcnLCdUaXJzZGFnJywnT25zZGFnJywnVG9yc2RhZycsJ0ZyZWRhZycsJ0zDuHJkYWcnXSxcbiAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTw7huJywnTWFuJywnVGlyJywnT25zJywnVG9yJywnRnJlJywnTMO4ciddXG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgLy9zZWxlY3RlZCBuZXcgZGF0ZSBpbiBwaWthZGF5LCB1cGRhdGUgaW5wdXQgZmllbGRzLiBcbiAgICAgICAgICB0aGF0LnVwZGF0ZURhdGVJbnB1dHMoZGF0ZSk7XG4gICAgICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgICAgICB9LFxuICAgICAgICBvbk9wZW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy91cGRhdGUgcGlrYWRheSB3aXRoIHZhbHVlcyBmcm9tIGlucHV0IGZpZWxkc1xuICAgICAgICAgIHZhciBkYXkgPSBwYXJzZUludCh0aGF0LmRheUlucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhhdC5tb250aElucHV0RWxlbWVudC52YWx1ZSkgLTE7XG4gICAgICAgICAgdmFyIHllYXIgPSBwYXJzZUludCh0aGF0LnllYXJJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgICAgaWYodGhhdC52YWxpZGF0ZUlucHV0cygpKXtcbiAgICAgICAgICAgIHRoYXQudXBkYXRlRGF0ZXBpY2tlckRhdGUobmV3RGF0ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgaW5pdERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5waWthZGF5SW5zdGFuY2Uuc2V0RGF0ZShpbml0RGF0ZSk7XG4gICAgICB0aGlzLnVwZGF0ZURhdGVJbnB1dHMoaW5pdERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRzKCl7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRoaXMuZGF5SW5wdXRFbGVtZW50LnZhbHVlKVxuICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgIHZhciB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFySW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB2YXIgbWF4RGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcblxuICAgIHZhciBtc2cgPSBcIlwiO1xuICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTsgXG4gICAgaWYoZGF5ID4gbWF4RGF5KXtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIG1zZyA9IFwiSG92LCBkZW4gZGFnIGZpbmRlcyBpa2tlIGkgZGVuIHZhbGd0ZSBtw6VuZWQuXCJcbiAgICAgIHRoaXMuc2hvd0Vycm9yKG1zZyk7XG4gICAgfWVsc2UgaWYobW9udGggPiAxMil7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBtc2cgPSBcIkhvdiwgZGVuIG3DpW5lZCBmaW5kZXMgaWtrZS5cIlxuICAgICAgdGhpcy5zaG93RXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZhbGlkKXtcbiAgICAgIHRoaXMucmVtb3ZlRXJyb3IoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfVxuXG4gIHNob3dFcnJvcihtc2cpe1xuICAgIHRoaXMuZm9ybUdyb3VwLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1lcnJvclwiKTtcbiAgICBzZWxlY3QoXCIuaW5wdXQtZXJyb3ItbWVzc2FnZVwiLCAgdGhpcy5mb3JtR3JvdXApWzBdLnRleHRDb250ZW50ID0gbXNnO1xuICB9XG4gIHJlbW92ZUVycm9yKCl7XG4gICAgdGhpcy5mb3JtR3JvdXAuY2xhc3NMaXN0LnJlbW92ZShcImlucHV0LWVycm9yXCIpO1xuICAgIHNlbGVjdChcIi5pbnB1dC1lcnJvci1tZXNzYWdlXCIsICB0aGlzLmZvcm1Hcm91cClbMF0udGV4dENvbnRlbnQgPSBcIlwiO1xuICB9XG5cbiAgdXBkYXRlRGF0ZUlucHV0cyhkYXRlKXtcbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSA9IGRheTtcbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlID0gbW9udGg7XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50LnZhbHVlID0geWVhcjtcbiAgfVxuXG4gIHVwZGF0ZURhdGVwaWNrZXJEYXRlKG5ld0RhdGUpe1xuICAgIHRoaXMucGlrYWRheUluc3RhbmNlLnNldERhdGUobmV3RGF0ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlcGlja2VyR3JvdXA7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi9hY2NvcmRpb24nKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7IC8vSkpFOiBub3QgdXNlZCBhbnltb3JlIFxuXG5jb25zdCBISURERU4gPSAnaGlkZGVuJztcbmNvbnN0IFNDT1BFID0gYC5mb290ZXJgOyAvLyR7UFJFRklYfS1cbmNvbnN0IE5BViA9IGAke1NDT1BFfSBuYXZgO1xuY29uc3QgQlVUVE9OID0gYCR7TkFWfSAuZm9vdGVyLXByaW1hcnktbGlua2A7IC8vJHtQUkVGSVh9LVxuY29uc3QgTElTVCA9IGAke05BVn0gdWxgO1xuXG5jb25zdCBISURFX01BWF9XSURUSCA9IDYwMDtcbmNvbnN0IERFQk9VTkNFX1JBVEUgPSAxODA7XG5cbmNvbnN0IHNob3dQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc21hbGxfc2NyZWVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgaWYoc21hbGxfc2NyZWVuKXtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5jbG9zZXN0KExJU1QpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4pO1xuXG4gICAgLy8gTkI6IHRoaXMgKnNob3VsZCogYWx3YXlzIHN1Y2NlZWQgYmVjYXVzZSB0aGUgYnV0dG9uXG4gICAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgICBjb25zdCBsaXN0cyA9IGxpc3QuY2xvc2VzdChOQVYpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcblxuICAgIGZvckVhY2gobGlzdHMsIGVsID0+IHtcbiAgICAgIGlmIChlbCAhPT0gbGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhJRERFTik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2l6ZSA9IGRlYm91bmNlKCgpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgZm9yRWFjaChzZWxlY3QoTElTVCksIGxpc3QgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4sIGhpZGRlbik7XG4gIH0pO1xufSwgREVCT1VOQ0VfUkFURSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBzaG93UGFuZWwsXG4gIH0sXG59LCB7XG4gIC8vIGV4cG9ydCBmb3IgdXNlIGVsc2V3aGVyZVxuICBISURFX01BWF9XSURUSCxcbiAgREVCT1VOQ0VfUkFURSxcblxuICBpbml0OiB0YXJnZXQgPT4ge1xuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxuXG4gIHRlYXJkb3duOiB0YXJnZXQgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWNjb3JkaW9uOiAgcmVxdWlyZSgnLi9hY2NvcmRpb24nKSxcbiAgYmFubmVyOiAgICAgcmVxdWlyZSgnLi9iYW5uZXInKSxcbiAgZm9vdGVyOiAgICAgcmVxdWlyZSgnLi9mb290ZXInKSxcbiAgLy9tb2RhbDogICAgIHJlcXVpcmUoJy4vbW9kYWwnKSxcbiAgbmF2aWdhdGlvbjogcmVxdWlyZSgnLi9uYXZpZ2F0aW9uJyksXG4gIHBhc3N3b3JkOiAgIHJlcXVpcmUoJy4vcGFzc3dvcmQnKSxcbiAgc2VhcmNoOiAgICAgcmVxdWlyZSgnLi9zZWFyY2gnKSxcbiAgc2tpcG5hdjogICAgcmVxdWlyZSgnLi9za2lwbmF2JyksXG4gIHZhbGlkYXRvcjogIHJlcXVpcmUoJy4vdmFsaWRhdG9yJyksXG4gIHJlZ2V4bWFzazogIHJlcXVpcmUoJy4vcmVnZXgtaW5wdXQtbWFzaycpXG4gIC8vdGFibGU6ICAgICAgcmVxdWlyZSgnLi90YWJsZScpLFxuICAvL292ZXJmbG93OiAgIHJlcXVpcmUoJy4vb3ZlcmZsb3ctbWVudScpLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfTElOS1MgPSBgJHtOQVZ9IGFgO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdi1jbG9zZWA7XG5jb25zdCBPVkVSTEFZID0gYC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbIE5BViwgT1ZFUkxBWSBdLmpvaW4oJywgJyk7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICd1c2EtbW9iaWxlX25hdi1hY3RpdmUnO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9ICdpcy12aXNpYmxlJztcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuXG5jb25zdCBfZm9jdXNUcmFwID0gKHRyYXBDb250YWluZXIpID0+IHtcbiAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nID0gJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0cmFwQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1sgMCBdO1xuICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWyBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxIF07XG5cbiAgZnVuY3Rpb24gdHJhcFRhYktleSAoZSkge1xuICAgIC8vIENoZWNrIGZvciBUQUIga2V5IHByZXNzXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuXG4gICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIFRBQlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRVNDQVBFXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIHRvZ2dsZU5hdi5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBGb2N1cyBmaXJzdCBjaGlsZFxuICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcblxuICByZXR1cm4ge1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIGFuZCB0cmFwIHRoZSBrZXlib2FyZFxuICAgICAgdHJhcENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG4gICAgfSxcblxuICAgIHJlbGVhc2UgKCkge1xuICAgICAgdHJhcENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmxldCBmb2N1c1RyYXA7XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIGlmICh0eXBlb2YgYWN0aXZlICE9PSAnYm9vbGVhbicpIHtcbiAgICBhY3RpdmUgPSAhaXNBY3RpdmUoKTtcbiAgfVxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBhY3RpdmUpO1xuXG4gIGZvckVhY2goc2VsZWN0KFRPR0dMRVMpLCBlbCA9PiB7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBhY3RpdmUpO1xuICB9KTtcblxuICBpZiAoYWN0aXZlKSB7XG4gICAgZm9jdXNUcmFwLmVuYWJsZSgpO1xuICB9IGVsc2Uge1xuICAgIGZvY3VzVHJhcC5yZWxlYXNlKCk7XG4gIH1cblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuXG4gIGlmIChhY3RpdmUgJiYgY2xvc2VCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBhY3RpdmF0ZWQsIHNvIGZvY3VzIG9uIHRoZSBjbG9zZSBidXR0b24sXG4gICAgLy8gd2hpY2ggaXMganVzdCBiZWZvcmUgYWxsIHRoZSBuYXYgZWxlbWVudHMgaW4gdGhlIHRhYiBvcmRlci5cbiAgICBjbG9zZUJ1dHRvbi5mb2N1cygpO1xuICB9IGVsc2UgaWYgKCFhY3RpdmUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gY2xvc2VCdXR0b24gJiZcbiAgICAgICAgICAgICBtZW51QnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgZGVhY3RpdmF0ZWQsIGFuZCBmb2N1cyB3YXMgb24gdGhlIGNsb3NlXG4gICAgLy8gYnV0dG9uLCB3aGljaCBpcyBubyBsb25nZXIgdmlzaWJsZS4gV2UgZG9uJ3Qgd2FudCB0aGUgZm9jdXMgdG9cbiAgICAvLyBkaXNhcHBlYXIgaW50byB0aGUgdm9pZCwgc28gZm9jdXMgb24gdGhlIG1lbnUgYnV0dG9uIGlmIGl0J3NcbiAgICAvLyB2aXNpYmxlICh0aGlzIG1heSBoYXZlIGJlZW4gd2hhdCB0aGUgdXNlciB3YXMganVzdCBmb2N1c2VkIG9uLFxuICAgIC8vIGlmIHRoZXkgdHJpZ2dlcmVkIHRoZSBtb2JpbGUgbmF2IGJ5IG1pc3Rha2UpLlxuICAgIG1lbnVCdXR0b24uZm9jdXMoKTtcbiAgfVxuXG4gIHJldHVybiBhY3RpdmU7XG59O1xuXG5jb25zdCByZXNpemUgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlciA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuXG4gIGlmIChpc0FjdGl2ZSgpICYmIGNsb3NlciAmJiBjbG9zZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggPT09IDApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiBpcyBhY3RpdmUsIGJ1dCB0aGUgY2xvc2UgYm94IGlzbid0IHZpc2libGUsIHdoaWNoXG4gICAgLy8gbWVhbnMgdGhlIHVzZXIncyB2aWV3cG9ydCBoYXMgYmVlbiByZXNpemVkIHNvIHRoYXQgaXQgaXMgbm8gbG9uZ2VyXG4gICAgLy8gaW4gbW9iaWxlIG1vZGUuIExldCdzIG1ha2UgdGhlIHBhZ2Ugc3RhdGUgY29uc2lzdGVudCBieVxuICAgIC8vIGRlYWN0aXZhdGluZyB0aGUgbW9iaWxlIG5hdi5cbiAgICB0b2dnbGVOYXYuY2FsbChjbG9zZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuY29uc3QgbmF2aWdhdGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBPUEVORVJTIF06IHRvZ2dsZU5hdixcbiAgICBbIENMT1NFUlMgXTogdG9nZ2xlTmF2LFxuICAgIFsgTkFWX0xJTktTIF06IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEEgbmF2aWdhdGlvbiBsaW5rIGhhcyBiZWVuIGNsaWNrZWQhIFdlIHdhbnQgdG8gY29sbGFwc2UgYW55XG4gICAgICAvLyBoaWVyYXJjaGljYWwgbmF2aWdhdGlvbiBVSSBpdCdzIGEgcGFydCBvZiwgc28gdGhhdCB0aGUgdXNlclxuICAgICAgLy8gY2FuIGZvY3VzIG9uIHdoYXRldmVyIHRoZXkndmUganVzdCBzZWxlY3RlZC5cblxuICAgICAgLy8gU29tZSBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBpbnNpZGUgYWNjb3JkaW9uczsgd2hlbiB0aGV5J3JlXG4gICAgICAvLyBjbGlja2VkLCB3ZSB3YW50IHRvIGNvbGxhcHNlIHRob3NlIGFjY29yZGlvbnMuXG4gICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG4gICAgICBpZiAoYWNjKSB7XG4gICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaChidG4gPT4gYWNjb3JkaW9uLmhpZGUoYnRuKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgdG9nZ2xlTmF2LmNhbGwodGhpcywgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQgKCkge1xuICAgIGNvbnN0IHRyYXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgZm9jdXNUcmFwID0gX2ZvY3VzVHJhcCh0cmFwQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZXNpemUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplLCBmYWxzZSk7XG4gIH0sXG4gIHRlYXJkb3duICgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplLCBmYWxzZSk7XG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IG5hdmlnYXRpb24ub24oZWwpLFxuICBuYXZpZ2F0aW9uXG4pOyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfXNob3dfcGFzc3dvcmQsIC4ke1BSRUZJWH1zaG93X211bHRpcGFzc3dvcmRgO1xuXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdG9nZ2xlRm9ybUlucHV0KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgTElOSyBdOiB0b2dnbGUsXG4gIH0sXG59KTtcbiIsIlxuLypcbiogUHJldmVudHMgdGhlIHVzZXIgZnJvbSBpbnB1dHRpbmcgYmFzZWQgb24gYSByZWdleC5cbiogRG9lcyBub3Qgd29yayB0aGUgc2FtZSB3YXkgYWYgPGlucHV0IHBhdHRlcm49XCJcIj4sIHRoaXMgcGF0dGVybiBpcyBvbmx5IHVzZWQgZm9yIHZhbGlkYXRpb24sIG5vdCB0byBwcmV2ZW50IGlucHV0LiBcbiogVXNlY2FzZTogbnVtYmVyIGlucHV0IGZvciBkYXRlLWNvbXBvbmVudC5cbiogRXhhbXBsZSAtIG51bWJlciBvbmx5OiA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWlucHV0LXJlZ2V4PVwiXlxcZCokXCI+XG4qL1xuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuXG5jb25zdCBtb2RpZmllclN0YXRlID0ge1xuICBzaGlmdDogZmFsc2UsXG4gIGFsdDogZmFsc2UsXG4gIGN0cmw6IGZhbHNlLFxuICBjb21tYW5kOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gaW5wdXRSZWdleE1hc2soZXZlbnQpIHtcblxuICAgIGlmKG1vZGlmaWVyU3RhdGUuY3RybCB8fCBtb2RpZmllclN0YXRlLmNvbW1hbmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmV3Q2hhciA9IG51bGw7XG4gICAgaWYodHlwZW9mIGV2ZW50LmtleSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIGlmKGV2ZW50LmtleS5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgbmV3Q2hhciA9IGV2ZW50LmtleTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCFldmVudC5jaGFyQ29kZSl7XG4gICAgICAgICAgICBuZXdDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmNoYXJDb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZWxlbWVudCA9IG51bGw7XG4gICAgaWYoZXZlbnQudGFyZ2V0ICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpZihuZXdDaGFyICE9PSBudWxsICYmIGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgaWYobmV3Q2hhci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQudHlwZSA9PT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZTsvL05vdGUgaW5wdXRbdHlwZT1udW1iZXJdIGRvZXMgbm90IGhhdmUgLnNlbGVjdGlvblN0YXJ0L0VuZCAoQ2hyb21lKS5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMCwgZWxlbWVudC5zZWxlY3Rpb25TdGFydCkgKyB0aGlzLnZhbHVlLnNsaWNlKGVsZW1lbnQuc2VsZWN0aW9uRW5kKSArIG5ld0NoYXI7IC8vcmVtb3ZlcyB0aGUgbnVtYmVycyBzZWxlY3RlZCBieSB0aGUgdXNlciwgdGhlbiBhZGRzIG5ldyBjaGFyLiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlZ2V4U3RyID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlucHV0LXJlZ2V4XCIpO1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyKTtcbiAgICAgICAgICAgIGlmKHIuZXhlYyhuZXdWYWx1ZSkgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICAna2V5cHJlc3MgcGFzdGUnOiB7XG4gICAgJ2lucHV0W2RhdGEtaW5wdXQtcmVnZXhdJzogaW5wdXRSZWdleE1hc2ssXG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IGlnbm9yZSA9IHJlcXVpcmUoJ3JlY2VwdG9yL2lnbm9yZScpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IEJVVFRPTiA9ICcuanMtc2VhcmNoLWJ1dHRvbic7XG5jb25zdCBGT1JNID0gJy5qcy1zZWFyY2gtZm9ybSc7XG5jb25zdCBJTlBVVCA9ICdbdHlwZT1zZWFyY2hdJztcbmNvbnN0IENPTlRFWFQgPSAnaGVhZGVyJzsgLy8gWFhYXG5jb25zdCBWSVNVQUxMWV9ISURERU4gPSBgJHtQUkVGSVh9c3Itb25seWA7XG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBzaG93U2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59O1xuXG5jb25zdCBoaWRlU2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBnZXRGb3JtID0gYnV0dG9uID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dFxuICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEZPUk0pO1xufTtcblxuY29uc3QgdG9nZ2xlU2VhcmNoID0gKGJ1dHRvbiwgYWN0aXZlKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBnZXRGb3JtKGJ1dHRvbik7XG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFZJU1VBTExZX0hJRERFTiwgIWFjdGl2ZSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIF9vdXRzaWRlXyBvZiB0aGUgZm9ybSB3L2lnbm9yZSgpOiBoaWRlIHRoZVxuICAgIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgZSA9PiB7XG4gICAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9KTtcblxuICAgIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gICAgLy8gSUUxMSBhbmQgRWRnZSB3aWxsIGFjdHVhbGx5IGNhbGwgdGhlIGxpc3RlbmVyICppbW1lZGlhdGVseSogYmVjYXVzZVxuICAgIC8vIHRoZXkgYXJlIGN1cnJlbnRseSBoYW5kbGluZyB0aGlzIGV4YWN0IHR5cGUgb2YgZXZlbnQsIHNvIHdlJ2xsXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gICAgLy8gaWYgYW55LCBiZWZvcmUgd2UgYXR0YWNoIHRoZSBsaXN0ZW5lci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2ggPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dTZWFyY2gsXG4gIH0sXG59LCB7XG4gIGluaXQ6ICh0YXJnZXQpID0+IHtcbiAgICBmb3JFYWNoKHNlbGVjdChCVVRUT04sIHRhcmdldCksIGJ1dHRvbiA9PiB7XG4gICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgfSk7XG4gIH0sXG4gIHRlYXJkb3duOiAodGFyZ2V0KSA9PiB7XG4gICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gc2VhcmNoLm9uKGVsKSxcbiAgc2VhcmNoXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgb25jZSA9IHJlcXVpcmUoJ3JlY2VwdG9yL29uY2UnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfXNraXBuYXZbaHJlZl49XCIjXCJdYDtcblxuY29uc3Qgc2V0VGFiaW5kZXggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gTkI6IHdlIGtub3cgYmVjYXVzZSBvZiB0aGUgc2VsZWN0b3Igd2UncmUgZGVsZWdhdGluZyB0byBiZWxvdyB0aGF0IHRoZVxuICAvLyBocmVmIGFscmVhZHkgYmVnaW5zIHdpdGggJyMnXG4gIGNvbnN0IGlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zbGljZSgxKTtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uY2UoZXZlbnQgPT4ge1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgfSkpO1xuICB9IGVsc2Uge1xuICAgIC8vIHRocm93IGFuIGVycm9yP1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBMSU5LIF06IHNldFRhYmluZGV4LFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3ZhbGlkYXRlLWlucHV0Jyk7XG5jb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xuXG5jb25zdCBjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcmV0dXJuIHZhbGlkYXRlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gICdrZXl1cCBjaGFuZ2UnOiB7XG4gICAgJ2lucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XSc6IGNoYW5nZSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG4vKmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiB2YWxpZGF0b3Iub24oZWwpLFxuICB2YWxpZGF0b3Jcbik7Ki9cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwcmVmaXg6ICcnLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRvbXJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgZGF0ZXBpY2tlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9kYXRlcGlja2VyJyk7XG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGRlZmluZSBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmUgbWlzc2luZyBmcm9tXG4gKiBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoJy4vcG9seWZpbGxzJyk7XG5cbmNvbnN0IGRrd2RzID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuY29uc3QganNTZWxlY3RvckRhdGVwaWNrZXIgPSAnLmpzLWNhbGVuZGFyLWdyb3VwJztcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpO1xuZGt3ZHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbmRvbXJlYWR5KCgpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgZm9yIChsZXQgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgY29uc3QgYmVoYXZpb3IgPSBjb21wb25lbnRzWyBuYW1lIF07XG4gICAgYmVoYXZpb3Iub24odGFyZ2V0KTtcbiAgfVxuXG4gIC8vSW5pdCBkYXRlcGlja2VyLiAgKE5vdGU6IGFib3ZlICdiZWhhdmlvci5vbicgZG9lcyBub3Qgd29yayB3aXRoIHBpa2FkYXkgLT4gc2VwZXJhdGUgaW5pdGlhbGl6YXRpb24pXG4gIGZvckVhY2goc2VsZWN0KGpzU2VsZWN0b3JEYXRlcGlja2VyKSwgY2FsZW5kYXJHcm91cEVsZW1lbnQgPT4ge1xuICAgIG5ldyBkYXRlcGlja2VyKGNhbGVuZGFyR3JvdXBFbGVtZW50KTtcbiAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBka3dkcztcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBUaGlzIHVzZWQgdG8gYmUgY29uZGl0aW9uYWxseSBkZXBlbmRlbnQgb24gd2hldGhlciB0aGVcbiAgLy8gYnJvd3NlciBzdXBwb3J0ZWQgdG91Y2ggZXZlbnRzOyBpZiBpdCBkaWQsIGBDTElDS2Agd2FzIHNldCB0b1xuICAvLyBgdG91Y2hzdGFydGAuICBIb3dldmVyLCB0aGlzIGhhZCBkb3duc2lkZXM6XG4gIC8vXG4gIC8vICogSXQgcHJlLWVtcHRlZCBtb2JpbGUgYnJvd3NlcnMnIGRlZmF1bHQgYmVoYXZpb3Igb2YgZGV0ZWN0aW5nXG4gIC8vICAgd2hldGhlciBhIHRvdWNoIHR1cm5lZCBpbnRvIGEgc2Nyb2xsLCB0aGVyZWJ5IHByZXZlbnRpbmdcbiAgLy8gICB1c2VycyBmcm9tIHVzaW5nIHNvbWUgb2Ygb3VyIGNvbXBvbmVudHMgYXMgc2Nyb2xsIHN1cmZhY2VzLlxuICAvL1xuICAvLyAqIFNvbWUgZGV2aWNlcywgc3VjaCBhcyB0aGUgTWljcm9zb2Z0IFN1cmZhY2UgUHJvLCBzdXBwb3J0ICpib3RoKlxuICAvLyAgIHRvdWNoIGFuZCBjbGlja3MuIFRoaXMgbWVhbnQgdGhlIGNvbmRpdGlvbmFsIGVmZmVjdGl2ZWx5IGRyb3BwZWRcbiAgLy8gICBzdXBwb3J0IGZvciB0aGUgdXNlcidzIG1vdXNlLCBmcnVzdHJhdGluZyB1c2VycyB3aG8gcHJlZmVycmVkXG4gIC8vICAgaXQgb24gdGhvc2Ugc3lzdGVtcy5cbiAgQ0xJQ0s6ICdjbGljaycsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZWxwcm90byA9IHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGU7XG5jb25zdCBISURERU4gPSAnaGlkZGVuJztcblxuaWYgKCEoSElEREVOIGluIGVscHJvdG8pKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbHByb3RvLCBISURERU4sIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShISURERU4pO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShISURERU4sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmNsYXNzTGlzdCBhbmQgRE9NVG9rZW5MaXN0XG5yZXF1aXJlKCdjbGFzc2xpc3QtcG9seWZpbGwnKTtcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGlkZGVuXG5yZXF1aXJlKCcuL2VsZW1lbnQtaGlkZGVuJyk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKCdyZWNlcHRvci9iZWhhdmlvcicpO1xuXG5jb25zdCBzZXF1ZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VxID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBmb3JFYWNoKHNlcSwgbWV0aG9kID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1sgbWV0aG9kIF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1sgbWV0aG9kIF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+IHtcbiAgcmV0dXJuIEJlaGF2aW9yKGV2ZW50cywgYXNzaWduKHtcbiAgICBvbjogICBzZXF1ZW5jZSgnaW5pdCcsICdhZGQnKSxcbiAgICBvZmY6ICBzZXF1ZW5jZSgndGVhcmRvd24nLCAncmVtb3ZlJyksXG4gIH0sIHByb3BzKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGNsb3Nlc3RcbiAqIEBkZXNjIGdldCBuZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBzZWFyY2ggc3RhcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gU2VsZWN0b3IgdG8gYmUgZm91bmQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBOZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb3Nlc3QgKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG4gIHdoaWxlIChlbCkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWw7XG59O1xuIiwiLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzNcbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQgKGVsLCB3aW49d2luZG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gdmFsdWUgPT4ge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKCdyZXNvbHZlLWlkLXJlZnMnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vc2VsZWN0Jyk7XG5jb25zdCB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG5cbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgUFJFU1NFRCA9ICdhcmlhLXByZXNzZWQnO1xuY29uc3QgU0hPV19BVFRSID0gJ2RhdGEtc2hvdy10ZXh0JztcbmNvbnN0IEhJREVfQVRUUiA9ICdkYXRhLWhpZGUtdGV4dCc7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IHNob3dUZXh0ID0+IHtcbiAgcmV0dXJuIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgc2hvdyA9PiB7XG4gICAgcmV0dXJuICgnUycgPT09IHNob3dbIDAgXSA/ICdIJyA6ICdoJykgKyAnaWRlJztcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBlbCA9PiB7XG4gIC8vIHRoaXMgaXMgdGhlICp0YXJnZXQqIHN0YXRlOlxuICAvLyAqIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgYXR0ciBhbmQgaXQncyAhPT0gXCJ0cnVlXCIsIHByZXNzZWQgaXMgdHJ1ZVxuICAvLyAqIG90aGVyd2lzZSwgcHJlc3NlZCBpcyBmYWxzZVxuICBjb25zdCBwcmVzc2VkID0gZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpXG4gICAgJiYgZWwuZ2V0QXR0cmlidXRlKFBSRVNTRUQpICE9PSAndHJ1ZSc7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZm9yRWFjaChmaWVsZHMsIGZpZWxkID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0O1xuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgQ09OVFJPTFMgPSAnYXJpYS1jb250cm9scyc7XG5jb25zdCBISURERU4gPSAnYXJpYS1oaWRkZW4nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG5cbiAgaWYgKHR5cGVvZiBleHBhbmRlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ2ZhbHNlJztcbiAgfVxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBleHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIicgKyBpZCArICdcIidcbiAgICApO1xuICB9XG5cbiAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgIWV4cGFuZGVkKTtcbiAgcmV0dXJuIGV4cGFuZGVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRhdGFzZXQgPSByZXF1aXJlKCdlbGVtLWRhdGFzZXQnKTtcblxuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgQ0hFQ0tFRCA9ICdhcmlhLWNoZWNrZWQnO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH1jaGVja2xpc3QtY2hlY2tlZGA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdGUgKGVsKSB7XG4gIGNvbnN0IGRhdGEgPSBkYXRhc2V0KGVsKTtcbiAgY29uc3QgaWQgPSBkYXRhLnZhbGlkYXRpb25FbGVtZW50O1xuICBjb25zdCBjaGVja0xpc3QgPSBpZC5jaGFyQXQoMCkgPT09ICcjJ1xuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZClcbiAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBObyB2YWxpZGF0aW9uIGVsZW1lbnQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCd2YWxpZGF0ZScpKSB7XG4gICAgICBjb25zdCB2YWxpZGF0b3JOYW1lID0ga2V5LnN1YnN0cigndmFsaWRhdGUnLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKGRhdGFbIGtleSBdKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclNlbGVjdG9yID0gYFtkYXRhLXZhbGlkYXRvcj1cIiR7dmFsaWRhdG9yTmFtZX1cIl1gO1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ2hlY2tib3ggPSBjaGVja0xpc3QucXVlcnlTZWxlY3Rvcih2YWxpZGF0b3JTZWxlY3Rvcik7XG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LnNldEF0dHJpYnV0ZShDSEVDS0VELCBjaGVja2VkKTtcbiAgICB9XG4gIH1cbn07IiwiLyohXG4gKiBQaWthZGF5XG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQgRGF2aWQgQnVzaGVsbCB8IEJTRCAmIE1JVCBsaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2RidXNoZWxsL1Bpa2FkYXlcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG1vbWVudDtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTIG1vZHVsZVxuICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkobW9tZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAocmVxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgICAgICB2YXIgaWQgPSAnbW9tZW50JztcbiAgICAgICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcShpZCk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShtb21lbnQpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LlBpa2FkYXkgPSBmYWN0b3J5KHJvb3QubW9tZW50KTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChtb21lbnQpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogZmVhdHVyZSBkZXRlY3Rpb24gYW5kIGhlbHBlciBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICB2YXIgaGFzTW9tZW50ID0gdHlwZW9mIG1vbWVudCA9PT0gJ2Z1bmN0aW9uJyxcblxuICAgIGhhc0V2ZW50TGlzdGVuZXJzID0gISF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuXG4gICAgc3RvID0gd2luZG93LnNldFRpbWVvdXQsXG5cbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRyaW0gPSBmdW5jdGlvbihzdHIpXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csJycpO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIHJldHVybiAoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNuICsgJyAnKSAhPT0gLTE7XG4gICAgfSxcblxuICAgIGFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgY24pKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoZWwuY2xhc3NOYW1lID09PSAnJykgPyBjbiA6IGVsLmNsYXNzTmFtZSArICcgJyArIGNuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdHJpbSgoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKCcgJyArIGNuICsgJyAnLCAnICcpKTtcbiAgICB9LFxuXG4gICAgaXNBcnJheSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0FycmF5LykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSk7XG4gICAgfSxcblxuICAgIGlzRGF0ZSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0RhdGUvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSAmJiAhaXNOYU4ob2JqLmdldFRpbWUoKSk7XG4gICAgfSxcblxuICAgIGlzV2Vla2VuZCA9IGZ1bmN0aW9uKGRhdGUpXG4gICAge1xuICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgcmV0dXJuIGRheSA9PT0gMCB8fCBkYXkgPT09IDY7XG4gICAgfSxcblxuICAgIGlzTGVhcFllYXIgPSBmdW5jdGlvbih5ZWFyKVxuICAgIHtcbiAgICAgICAgLy8gc29sdXRpb24gYnkgTWF0dGkgVmlya2t1bmVuOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODgxOTUxXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfSxcblxuICAgIGdldERheXNJbk1vbnRoID0gZnVuY3Rpb24oeWVhciwgbW9udGgpXG4gICAge1xuICAgICAgICByZXR1cm4gWzMxLCBpc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vbnRoXTtcbiAgICB9LFxuXG4gICAgc2V0VG9TdGFydE9mRGF5ID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gICAgfSxcblxuICAgIGNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uKGEsYilcbiAgICB7XG4gICAgICAgIC8vIHdlYWsgZGF0ZSBjb21wYXJpc29uICh1c2Ugc2V0VG9TdGFydE9mRGF5KGRhdGUpIHRvIGVuc3VyZSBjb3JyZWN0IHJlc3VsdClcbiAgICAgICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcbiAgICB9LFxuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24odG8sIGZyb20sIG92ZXJ3cml0ZSlcbiAgICB7XG4gICAgICAgIHZhciBwcm9wLCBoYXNQcm9wO1xuICAgICAgICBmb3IgKHByb3AgaW4gZnJvbSkge1xuICAgICAgICAgICAgaGFzUHJvcCA9IHRvW3Byb3BdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaGFzUHJvcCAmJiB0eXBlb2YgZnJvbVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgZnJvbVtwcm9wXSAhPT0gbnVsbCAmJiBmcm9tW3Byb3BdLm5vZGVOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXRlKGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gbmV3IERhdGUoZnJvbVtwcm9wXS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBleHRlbmQoe30sIGZyb21bcHJvcF0sIG92ZXJ3cml0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVyd3JpdGUgfHwgIWhhc1Byb3ApIHtcbiAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG5cbiAgICBmaXJlRXZlbnQgPSBmdW5jdGlvbihlbCwgZXZlbnROYW1lLCBkYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIGV2O1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXYuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmZpcmVFdmVudCgnb24nICsgZXZlbnROYW1lLCBldik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRqdXN0Q2FsZW5kYXIgPSBmdW5jdGlvbihjYWxlbmRhcikge1xuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPCAwKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyIC09IE1hdGguY2VpbChNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggKz0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgKz0gTWF0aC5mbG9vcihNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggLT0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZWZhdWx0cyBhbmQgbG9jYWxpc2F0aW9uXG4gICAgICovXG4gICAgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gYmluZCB0aGUgcGlja2VyIHRvIGEgZm9ybSBmaWVsZFxuICAgICAgICBmaWVsZDogbnVsbCxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHNob3cvaGlkZSB0aGUgcGlja2VyIG9uIGBmaWVsZGAgZm9jdXMgKGRlZmF1bHQgYHRydWVgIGlmIGBmaWVsZGAgaXMgc2V0KVxuICAgICAgICBib3VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkYXRlcGlja2VyLCByZWxhdGl2ZSB0byB0aGUgZmllbGQgKGRlZmF1bHQgdG8gYm90dG9tICYgbGVmdClcbiAgICAgICAgLy8gKCdib3R0b20nICYgJ2xlZnQnIGtleXdvcmRzIGFyZSBub3QgdXNlZCwgJ3RvcCcgJiAncmlnaHQnIGFyZSBtb2RpZmllciBvbiB0aGUgYm90dG9tL2xlZnQgcG9zaXRpb24pXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZml0IGluIHRoZSB2aWV3cG9ydCBldmVuIGlmIGl0IG1lYW5zIHJlcG9zaXRpb25pbmcgZnJvbSB0aGUgcG9zaXRpb24gb3B0aW9uXG4gICAgICAgIHJlcG9zaXRpb246IHRydWUsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgb3V0cHV0IGZvcm1hdCBmb3IgYC50b1N0cmluZygpYCBhbmQgYGZpZWxkYCB2YWx1ZVxuICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREJyxcblxuICAgICAgICAvLyB0aGUgdG9TdHJpbmcgZnVuY3Rpb24gd2hpY2ggZ2V0cyBwYXNzZWQgYSBjdXJyZW50IGRhdGUgb2JqZWN0IGFuZCBmb3JtYXRcbiAgICAgICAgLy8gYW5kIHJldHVybnMgYSBzdHJpbmdcbiAgICAgICAgdG9TdHJpbmc6IG51bGwsXG5cbiAgICAgICAgLy8gdXNlZCB0byBjcmVhdGUgZGF0ZSBvYmplY3QgZnJvbSBjdXJyZW50IGlucHV0IHN0cmluZ1xuICAgICAgICBwYXJzZTogbnVsbCxcblxuICAgICAgICAvLyB0aGUgaW5pdGlhbCBkYXRlIHRvIHZpZXcgd2hlbiBmaXJzdCBvcGVuZWRcbiAgICAgICAgZGVmYXVsdERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYGRlZmF1bHREYXRlYCB0aGUgaW5pdGlhbCBzZWxlY3RlZCB2YWx1ZVxuICAgICAgICBzZXREZWZhdWx0RGF0ZTogZmFsc2UsXG5cbiAgICAgICAgLy8gZmlyc3QgZGF5IG9mIHdlZWsgKDA6IFN1bmRheSwgMTogTW9uZGF5IGV0YylcbiAgICAgICAgZmlyc3REYXk6IDAsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgZmxhZyBmb3IgbW9tZW50J3Mgc3RyaWN0IGRhdGUgcGFyc2luZ1xuICAgICAgICBmb3JtYXRTdHJpY3Q6IGZhbHNlLFxuXG4gICAgICAgIC8vIHRoZSBtaW5pbXVtL2VhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgLy8gdGhlIG1heGltdW0vbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWF4RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBudW1iZXIgb2YgeWVhcnMgZWl0aGVyIHNpZGUsIG9yIGFycmF5IG9mIHVwcGVyL2xvd2VyIHJhbmdlXG4gICAgICAgIHllYXJSYW5nZTogMTAsXG5cbiAgICAgICAgLy8gc2hvdyB3ZWVrIG51bWJlcnMgYXQgaGVhZCBvZiByb3dcbiAgICAgICAgc2hvd1dlZWtOdW1iZXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFdlZWsgcGlja2VyIG1vZGVcbiAgICAgICAgcGlja1dob2xlV2VlazogZmFsc2UsXG5cbiAgICAgICAgLy8gdXNlZCBpbnRlcm5hbGx5IChkb24ndCBjb25maWcgb3V0c2lkZSlcbiAgICAgICAgbWluWWVhcjogMCxcbiAgICAgICAgbWF4WWVhcjogOTk5OSxcbiAgICAgICAgbWluTW9udGg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4TW9udGg6IHVuZGVmaW5lZCxcblxuICAgICAgICBzdGFydFJhbmdlOiBudWxsLFxuICAgICAgICBlbmRSYW5nZTogbnVsbCxcblxuICAgICAgICBpc1JUTDogZmFsc2UsXG5cbiAgICAgICAgLy8gQWRkaXRpb25hbCB0ZXh0IHRvIGFwcGVuZCB0byB0aGUgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgeWVhclN1ZmZpeDogJycsXG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSBtb250aCBhZnRlciB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICBzaG93TW9udGhBZnRlclllYXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFJlbmRlciBkYXlzIG9mIHRoZSBjYWxlbmRhciBncmlkIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBzaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBBbGxvd3MgdXNlciB0byBzZWxlY3QgZGF5cyB0aGF0IGZhbGwgaW4gdGhlIG5leHQgb3IgcHJldmlvdXMgbW9udGhcbiAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBob3cgbWFueSBtb250aHMgYXJlIHZpc2libGVcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDEsXG5cbiAgICAgICAgLy8gd2hlbiBudW1iZXJPZk1vbnRocyBpcyB1c2VkLCB0aGlzIHdpbGwgaGVscCB5b3UgdG8gY2hvb3NlIHdoZXJlIHRoZSBtYWluIGNhbGVuZGFyIHdpbGwgYmUgKGRlZmF1bHQgYGxlZnRgLCBjYW4gYmUgc2V0IHRvIGByaWdodGApXG4gICAgICAgIC8vIG9ubHkgdXNlZCBmb3IgdGhlIGZpcnN0IGRpc3BsYXkgb3Igd2hlbiBhIHNlbGVjdGVkIGRhdGUgaXMgbm90IHZpc2libGVcbiAgICAgICAgbWFpbkNhbGVuZGFyOiAnbGVmdCcsXG5cbiAgICAgICAgLy8gU3BlY2lmeSBhIERPTSBlbGVtZW50IHRvIHJlbmRlciB0aGUgY2FsZW5kYXIgaW5cbiAgICAgICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gQmx1ciBmaWVsZCB3aGVuIGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgYmx1ckZpZWxkT25TZWxlY3QgOiB0cnVlLFxuXG4gICAgICAgIC8vIGludGVybmF0aW9uYWxpemF0aW9uXG4gICAgICAgIGkxOG46IHtcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGggOiAnUHJldmlvdXMgTW9udGgnLFxuICAgICAgICAgICAgbmV4dE1vbnRoICAgICA6ICdOZXh0IE1vbnRoJyxcbiAgICAgICAgICAgIG1vbnRocyAgICAgICAgOiBbJ0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJywnQXByaWwnLCdNYXknLCdKdW5lJywnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09jdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICB3ZWVrZGF5cyAgICAgIDogWydTdW5kYXknLCdNb25kYXknLCdUdWVzZGF5JywnV2VkbmVzZGF5JywnVGh1cnNkYXknLCdGcmlkYXknLCdTYXR1cmRheSddLFxuICAgICAgICAgICAgd2Vla2RheXNTaG9ydCA6IFsnU3VuJywnTW9uJywnVHVlJywnV2VkJywnVGh1JywnRnJpJywnU2F0J11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGVtZSBDbGFzc25hbWVcbiAgICAgICAgdGhlbWU6IG51bGwsXG5cbiAgICAgICAgLy8gZXZlbnRzIGFycmF5XG4gICAgICAgIGV2ZW50czogW10sXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgb25TZWxlY3Q6IG51bGwsXG4gICAgICAgIG9uT3BlbjogbnVsbCxcbiAgICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgICAgb25EcmF3OiBudWxsLFxuXG4gICAgICAgIC8vIEVuYWJsZSBrZXlib2FyZCBpbnB1dFxuICAgICAgICBrZXlib2FyZElucHV0OiB0cnVlXG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogdGVtcGxhdGluZyBmdW5jdGlvbnMgdG8gYWJzdHJhY3QgSFRNTCByZW5kZXJpbmdcbiAgICAgKi9cbiAgICByZW5kZXJEYXlOYW1lID0gZnVuY3Rpb24ob3B0cywgZGF5LCBhYmJyKVxuICAgIHtcbiAgICAgICAgZGF5ICs9IG9wdHMuZmlyc3REYXk7XG4gICAgICAgIHdoaWxlIChkYXkgPj0gNykge1xuICAgICAgICAgICAgZGF5IC09IDc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFiYnIgPyBvcHRzLmkxOG4ud2Vla2RheXNTaG9ydFtkYXldIDogb3B0cy5pMThuLndlZWtkYXlzW2RheV07XG4gICAgfSxcblxuICAgIHJlbmRlckRheSA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIHZhciBhcmlhU2VsZWN0ZWQgPSAnZmFsc2UnO1xuICAgICAgICBpZiAob3B0cy5pc0VtcHR5KSB7XG4gICAgICAgICAgICBpZiAob3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLW91dHNpZGUtY3VycmVudC1tb250aCcpO1xuXG4gICAgICAgICAgICAgICAgaWYoIW9wdHMuZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJpcy1lbXB0eVwiPjwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1RvZGF5KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtdG9kYXknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGFyaWFTZWxlY3RlZCA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5oYXNFdmVudCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2hhcy1ldmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzSW5SYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWlucmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zdGFydHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNFbmRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWVuZHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGQgZGF0YS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCIgY2xhc3M9XCInICsgYXJyLmpvaW4oJyAnKSArICdcIiBhcmlhLXNlbGVjdGVkPVwiJyArIGFyaWFTZWxlY3RlZCArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJwaWthLWJ1dHRvbiBwaWthLWRheVwiIHR5cGU9XCJidXR0b25cIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcGlrYS15ZWFyPVwiJyArIG9wdHMueWVhciArICdcIiBkYXRhLXBpa2EtbW9udGg9XCInICsgb3B0cy5tb250aCArICdcIiBkYXRhLXBpa2EtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kYXkgK1xuICAgICAgICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJXZWVrID0gZnVuY3Rpb24gKGQsIG0sIHkpIHtcbiAgICAgICAgLy8gTGlmdGVkIGZyb20gaHR0cDovL2phdmFzY3JpcHQuYWJvdXQuY29tL2xpYnJhcnkvYmx3ZWVreWVhci5odG0sIGxpZ2h0bHkgbW9kaWZpZWQuXG4gICAgICAgIHZhciBvbmVqYW4gPSBuZXcgRGF0ZSh5LCAwLCAxKSxcbiAgICAgICAgICAgIHdlZWtOdW0gPSBNYXRoLmNlaWwoKCgobmV3IERhdGUoeSwgbSwgZCkgLSBvbmVqYW4pIC8gODY0MDAwMDApICsgb25lamFuLmdldERheSgpKzEpLzcpO1xuICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cInBpa2Etd2Vla1wiPicgKyB3ZWVrTnVtICsgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyUm93ID0gZnVuY3Rpb24oZGF5cywgaXNSVEwsIHBpY2tXaG9sZVdlZWssIGlzUm93U2VsZWN0ZWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0ciBjbGFzcz1cInBpa2Etcm93JyArIChwaWNrV2hvbGVXZWVrID8gJyBwaWNrLXdob2xlLXdlZWsnIDogJycpICsgKGlzUm93U2VsZWN0ZWQgPyAnIGlzLXNlbGVjdGVkJyA6ICcnKSArICdcIj4nICsgKGlzUlRMID8gZGF5cy5yZXZlcnNlKCkgOiBkYXlzKS5qb2luKCcnKSArICc8L3RyPic7XG4gICAgfSxcblxuICAgIHJlbmRlckJvZHkgPSBmdW5jdGlvbihyb3dzKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGJvZHk+JyArIHJvd3Muam9pbignJykgKyAnPC90Ym9keT4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJIZWFkID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBpLCBhcnIgPSBbXTtcbiAgICAgICAgaWYgKG9wdHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGg+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoIHNjb3BlPVwiY29sXCI+PGFiYnIgdGl0bGU9XCInICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpKSArICdcIj4nICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpLCB0cnVlKSArICc8L2FiYnI+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0aGVhZD48dHI+JyArIChvcHRzLmlzUlRMID8gYXJyLnJldmVyc2UoKSA6IGFycikuam9pbignJykgKyAnPC90cj48L3RoZWFkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclRpdGxlID0gZnVuY3Rpb24oaW5zdGFuY2UsIGMsIHllYXIsIG1vbnRoLCByZWZZZWFyLCByYW5kSWQpXG4gICAge1xuICAgICAgICB2YXIgaSwgaiwgYXJyLFxuICAgICAgICAgICAgb3B0cyA9IGluc3RhbmNlLl9vLFxuICAgICAgICAgICAgaXNNaW5ZZWFyID0geWVhciA9PT0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgaXNNYXhZZWFyID0geWVhciA9PT0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgaHRtbCA9ICc8ZGl2IGlkPVwiJyArIHJhbmRJZCArICdcIiBjbGFzcz1cInBpa2EtdGl0bGVcIiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiPicsXG4gICAgICAgICAgICBtb250aEh0bWwsXG4gICAgICAgICAgICB5ZWFySHRtbCxcbiAgICAgICAgICAgIHByZXYgPSB0cnVlLFxuICAgICAgICAgICAgbmV4dCA9IHRydWU7XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXSwgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyAoeWVhciA9PT0gcmVmWWVhciA/IGkgLSBjIDogMTIgKyBpIC0gYykgKyAnXCInICtcbiAgICAgICAgICAgICAgICAoaSA9PT0gbW9udGggPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArXG4gICAgICAgICAgICAgICAgKChpc01pblllYXIgJiYgaSA8IG9wdHMubWluTW9udGgpIHx8IChpc01heFllYXIgJiYgaSA+IG9wdHMubWF4TW9udGgpID8gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIicgOiAnJykgKyAnPicgK1xuICAgICAgICAgICAgICAgIG9wdHMuaTE4bi5tb250aHNbaV0gKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb250aEh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgb3B0cy5pMThuLm1vbnRoc1ttb250aF0gKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LW1vbnRoXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAoaXNBcnJheShvcHRzLnllYXJSYW5nZSkpIHtcbiAgICAgICAgICAgIGkgPSBvcHRzLnllYXJSYW5nZVswXTtcbiAgICAgICAgICAgIGogPSBvcHRzLnllYXJSYW5nZVsxXSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpID0geWVhciAtIG9wdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgaiA9IDEgKyB5ZWFyICsgb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGFyciA9IFtdOyBpIDwgaiAmJiBpIDw9IG9wdHMubWF4WWVhcjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSBvcHRzLm1pblllYXIpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiJyArIChpID09PSB5ZWFyID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgKyAnPicgKyAoaSkgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeWVhckh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgeWVhciArIG9wdHMueWVhclN1ZmZpeCArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QteWVhclwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKG9wdHMuc2hvd01vbnRoQWZ0ZXJZZWFyKSB7XG4gICAgICAgICAgICBodG1sICs9IHllYXJIdG1sICsgbW9udGhIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHRtbCArPSBtb250aEh0bWwgKyB5ZWFySHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01pblllYXIgJiYgKG1vbnRoID09PSAwIHx8IG9wdHMubWluTW9udGggPj0gbW9udGgpKSB7XG4gICAgICAgICAgICBwcmV2ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNYXhZZWFyICYmIChtb250aCA9PT0gMTEgfHwgb3B0cy5tYXhNb250aCA8PSBtb250aCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1wcmV2JyArIChwcmV2ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ucHJldmlvdXNNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAoaW5zdGFuY2UuX28ubnVtYmVyT2ZNb250aHMgLSAxKSApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLW5leHQnICsgKG5leHQgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5uZXh0TW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUYWJsZSA9IGZ1bmN0aW9uKG9wdHMsIGRhdGEsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicGlrYS10YWJsZVwiIHJvbGU9XCJncmlkXCIgYXJpYS1sYWJlbGxlZGJ5PVwiJyArIHJhbmRJZCArICdcIj4nICsgcmVuZGVySGVhZChvcHRzKSArIHJlbmRlckJvZHkoZGF0YSkgKyAnPC90YWJsZT4nO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFBpa2FkYXkgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBQaWthZGF5ID0gZnVuY3Rpb24ob3B0aW9ucylcbiAgICB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIG9wdHMgPSBzZWxmLmNvbmZpZyhvcHRpb25zKTtcblxuICAgICAgICBzZWxmLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtYnV0dG9uJykgJiYgIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWVtcHR5JykgJiYgIWhhc0NsYXNzKHRhcmdldC5wYXJlbnROb2RlLCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUobmV3IERhdGUodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLXllYXInKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLW1vbnRoJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1kYXknKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJsdXJGaWVsZE9uU2VsZWN0ICYmIG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnByZXZNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLW5leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5leHRNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdG91Y2ggZXZlbnQgcHJldmVudCBtb3VzZSBldmVudHMgZW11bGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QtbW9udGgnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b01vbnRoKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC15ZWFyJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9ZZWFyKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25LZXlDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmlzVmlzaWJsZSgpKSB7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZGF0ZTtcblxuICAgICAgICAgICAgaWYgKGUuZmlyZWRCeSA9PT0gc2VsZikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnBhcnNlKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG9wdHMucGFyc2Uob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0LCBvcHRzLmZvcm1hdFN0cmljdCk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IChkYXRlICYmIGRhdGUuaXNWYWxpZCgpKSA/IGRhdGUudG9EYXRlKCkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uob3B0cy5maWVsZC52YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Rm9jdXMgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDbGljayA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEJsdXIgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElFIGFsbG93cyBwaWthIGRpdiB0byBnYWluIGZvY3VzOyBjYXRjaCBibHVyIHRoZSBpbnB1dCBmaWVsZFxuICAgICAgICAgICAgdmFyIHBFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYiA9IHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fYyA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2xpY2sgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LFxuICAgICAgICAgICAgICAgIHBFbCA9IHRhcmdldDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNFdmVudExpc3RlbmVycyAmJiBoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQub25jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCAncmV0dXJuOycpO1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudCh0YXJnZXQsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpIHx8IHBFbCA9PT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5fdiAmJiB0YXJnZXQgIT09IG9wdHMudHJpZ2dlciAmJiBwRWwgIT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgPSAncGlrYS1zaW5nbGUnICsgKG9wdHMuaXNSVEwgPyAnIGlzLXJ0bCcgOiAnJykgKyAob3B0cy50aGVtZSA/ICcgJyArIG9wdHMudGhlbWUgOiAnJyk7XG5cbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ21vdXNlZG93bicsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ3RvdWNoZW5kJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuXG4gICAgICAgIGlmIChvcHRzLmtleWJvYXJkSW5wdXQpIHtcbiAgICAgICAgICAgIGFkZEV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHNlbGYuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5lbCwgb3B0cy5maWVsZC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgc2VsZi5fb25JbnB1dENoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmICghb3B0cy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgb3B0cy5maWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdHMuc2V0RGVmYXVsdERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZkRhdGUgPSBvcHRzLmRlZmF1bHREYXRlO1xuXG4gICAgICAgIGlmIChpc0RhdGUoZGVmRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNldERlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRlZkRhdGUsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9EYXRlKGRlZkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lICs9ICcgaXMtYm91bmQnO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCBzZWxmLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCBzZWxmLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHNlbGYuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogcHVibGljIFBpa2FkYXkgQVBJXG4gICAgICovXG4gICAgUGlrYWRheS5wcm90b3R5cGUgPSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uZmlndXJlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICovXG4gICAgICAgIGNvbmZpZzogZnVuY3Rpb24ob3B0aW9ucylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGV4dGVuZCh0aGlzLl9vLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEhb3B0cy5pc1JUTDtcblxuICAgICAgICAgICAgb3B0cy5maWVsZCA9IChvcHRzLmZpZWxkICYmIG9wdHMuZmllbGQubm9kZU5hbWUpID8gb3B0cy5maWVsZCA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMudGhlbWUgPSAodHlwZW9mIG9wdHMudGhlbWUpID09PSAnc3RyaW5nJyAmJiBvcHRzLnRoZW1lID8gb3B0cy50aGVtZSA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMuYm91bmQgPSAhIShvcHRzLmJvdW5kICE9PSB1bmRlZmluZWQgPyBvcHRzLmZpZWxkICYmIG9wdHMuYm91bmQgOiBvcHRzLmZpZWxkKTtcblxuICAgICAgICAgICAgb3B0cy50cmlnZ2VyID0gKG9wdHMudHJpZ2dlciAmJiBvcHRzLnRyaWdnZXIubm9kZU5hbWUpID8gb3B0cy50cmlnZ2VyIDogb3B0cy5maWVsZDtcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlV2Vla2VuZHMgPSAhIW9wdHMuZGlzYWJsZVdlZWtlbmRzO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVEYXlGbiA9ICh0eXBlb2Ygb3B0cy5kaXNhYmxlRGF5Rm4pID09PSAnZnVuY3Rpb24nID8gb3B0cy5kaXNhYmxlRGF5Rm4gOiBudWxsO1xuXG4gICAgICAgICAgICB2YXIgbm9tID0gcGFyc2VJbnQob3B0cy5udW1iZXJPZk1vbnRocywgMTApIHx8IDE7XG4gICAgICAgICAgICBvcHRzLm51bWJlck9mTW9udGhzID0gbm9tID4gNCA/IDQgOiBub207XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob3B0cy5taW5EYXRlICYmIG9wdHMubWF4RGF0ZSkgJiYgb3B0cy5tYXhEYXRlIDwgb3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYXRlKG9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhEYXRlKG9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFjayA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzBdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMF0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVsxXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzFdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gTWF0aC5hYnMocGFyc2VJbnQob3B0cy55ZWFyUmFuZ2UsIDEwKSkgfHwgZGVmYXVsdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnllYXJSYW5nZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAodXNpbmcgTW9tZW50LmpzIGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLl9vLmZvcm1hdDtcbiAgICAgICAgICAgIGlmICghaXNEYXRlKHRoaXMuX2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX28udG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX28udG9TdHJpbmcodGhpcy5fZCwgZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLl9kKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBNb21lbnQuanMgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9tZW50OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGZyb20gYSBNb21lbnQuanMgb2JqZWN0IChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNb21lbnQ6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBtb21lbnQuaXNNb21lbnQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZS50b0RhdGUoKSwgcHJldmVudE9uU2VsZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgRGF0ZSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBnZXREYXRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpc0RhdGUodGhpcy5fZCkgPyBuZXcgRGF0ZSh0aGlzLl9kLmdldFRpbWUoKSkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtaW4gPSB0aGlzLl9vLm1pbkRhdGUsXG4gICAgICAgICAgICAgICAgbWF4ID0gdGhpcy5fby5tYXhEYXRlO1xuXG4gICAgICAgICAgICBpZiAoaXNEYXRlKG1pbikgJiYgZGF0ZSA8IG1pbikge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtaW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShtYXgpICYmIGRhdGUgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWF4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHRoaXMuX2QpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLl9kKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwcmV2ZW50T25TZWxlY3QgJiYgdHlwZW9mIHRoaXMuX28ub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXREYXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9EYXRlOiBmdW5jdGlvbihkYXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmV3Q2FsZW5kYXIgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1swXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlRGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZW5kIG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXRNb250aChsYXN0VmlzaWJsZURhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0RGF0ZShsYXN0VmlzaWJsZURhdGUuZ2V0RGF0ZSgpLTEpO1xuICAgICAgICAgICAgICAgIG5ld0NhbGVuZGFyID0gKHZpc2libGVEYXRlIDwgZmlyc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgfHwgbGFzdFZpc2libGVEYXRlLmdldFRpbWUoKSA8IHZpc2libGVEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5tYWluQ2FsZW5kYXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKz0gMSAtIHRoaXMuX28ubnVtYmVyT2ZNb250aHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdERhdGU6IGZ1bmN0aW9uKHNpZ24sIGRheXMpIHtcblxuICAgICAgICAgICAgdmFyIGRheSA9IHRoaXMuZ2V0RGF0ZSgpIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHBhcnNlSW50KGRheXMpKjI0KjYwKjYwKjEwMDA7XG5cbiAgICAgICAgICAgIHZhciBuZXdEYXk7XG5cbiAgICAgICAgICAgIGlmIChzaWduID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJ3N1YnRyYWN0Jykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXREYXRlKG5ld0RheSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0Q2FsZW5kYXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdID0gYWRqdXN0Q2FsZW5kYXIodGhpcy5jYWxlbmRhcnNbMF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDE7IGMgPCB0aGlzLl9vLm51bWJlck9mTW9udGhzOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1tjXSA9IGFkanVzdENhbGVuZGFyKHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoICsgYyxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogdGhpcy5jYWxlbmRhcnNbMF0ueWVhclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvZGF5OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ290b0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgbW9udGggKHplcm8taW5kZXgsIGUuZy4gMDogSmFudWFyeSlcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9Nb250aDogZnVuY3Rpb24obW9udGgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dE1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoKys7XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHByZXZNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aC0tO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBmdWxsIHllYXIgKGUuZy4gXCIyMDEyXCIpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvWWVhcjogZnVuY3Rpb24oeWVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTih5ZWFyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLnllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtaW5EYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNaW5EYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5EYXRlID0gZGVmYXVsdHMubWluRGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gZGVmYXVsdHMubWluWWVhcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gZGVmYXVsdHMubWluTW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5zdGFydFJhbmdlID0gZGVmYXVsdHMuc3RhcnRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWF4RGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWF4RGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhZZWFyID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heE1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gZGVmYXVsdHMubWF4RGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSBkZWZhdWx0cy5tYXhZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSBkZWZhdWx0cy5tYXhNb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmVuZFJhbmdlID0gZGVmYXVsdHMuZW5kUmFuZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFN0YXJ0UmFuZ2U6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRFbmRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVmcmVzaCB0aGUgSFRNTFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhdzogZnVuY3Rpb24oZm9yY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdiAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbWluWWVhciA9IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgICAgICBtYXhZZWFyID0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgICAgIG1pbk1vbnRoID0gb3B0cy5taW5Nb250aCxcbiAgICAgICAgICAgICAgICBtYXhNb250aCA9IG9wdHMubWF4TW9udGgsXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIHJhbmRJZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPD0gbWluWWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtaW5ZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWluTW9udGgpICYmIHRoaXMuX20gPCBtaW5Nb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWluTW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPj0gbWF4WWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtYXhZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWF4TW9udGgpICYmIHRoaXMuX20gPiBtYXhNb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWF4TW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5kSWQgPSAncGlrYS10aXRsZS0nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZSgvW15hLXpdKy9nLCAnJykuc3Vic3RyKDAsIDIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9wdHMubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJwaWthLWxlbmRhclwiPicgKyByZW5kZXJUaXRsZSh0aGlzLCBjLCB0aGlzLmNhbGVuZGFyc1tjXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1tjXS5tb250aCwgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciwgcmFuZElkKSArIHRoaXMucmVuZGVyKHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCByYW5kSWQpICsgJzwvZGl2Pic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRzLmZpZWxkLnR5cGUgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbkRyYXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uRHJhdyh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGhlIHNjcmVlbiByZWFkZXIgdXNlciBrbm93IHRvIHVzZSBhcnJvdyBrZXlzXG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVXNlIHRoZSBhcnJvdyBrZXlzIHRvIHBpY2sgYSBkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0UG9zaXRpb246IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZpZWxkLCBwRWwsIHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBzY3JvbGxUb3AsIGxlZnQsIHRvcCwgY2xpZW50UmVjdDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICAgICAgICBmaWVsZCA9IHRoaXMuX28udHJpZ2dlcjtcbiAgICAgICAgICAgIHBFbCA9IGZpZWxkO1xuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNsaWVudFJlY3QgPSBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gY2xpZW50UmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHRvcCA9IGNsaWVudFJlY3QuYm90dG9tICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgdG9wICA9IHBFbC5vZmZzZXRUb3AgKyBwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdoaWxlKChwRWwgPSBwRWwub2Zmc2V0UGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ICs9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgICs9IHBFbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHBvc2l0aW9uIGlzIGJvdHRvbSAmIGxlZnRcbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIGxlZnQgKyB3aWR0aCA+IHZpZXdwb3J0V2lkdGgpIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX28ucmVwb3NpdGlvbiAmJiB0b3AgKyBoZWlnaHQgPiB2aWV3cG9ydEhlaWdodCArIHNjcm9sbFRvcCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigndG9wJykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQgPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVuZGVyIEhUTUwgZm9yIGEgcGFydGljdWxhciBtb250aFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgcmFuZElkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyAgID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBub3cgICAgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheXMgICA9IGdldERheXNJbk1vbnRoKHllYXIsIG1vbnRoKSxcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgZGF0YSAgID0gW10sXG4gICAgICAgICAgICAgICAgcm93ICAgID0gW107XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkobm93KTtcbiAgICAgICAgICAgIGlmIChvcHRzLmZpcnN0RGF5ID4gMCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSAtPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICAgICAgICAgIGlmIChiZWZvcmUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZSArPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcmV2aW91c01vbnRoID0gbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gMSxcbiAgICAgICAgICAgICAgICBuZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyAxLFxuICAgICAgICAgICAgICAgIHllYXJPZlByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IHllYXIgLSAxIDogeWVhcixcbiAgICAgICAgICAgICAgICB5ZWFyT2ZOZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyB5ZWFyICsgMSA6IHllYXIsXG4gICAgICAgICAgICAgICAgZGF5c0luUHJldmlvdXNNb250aCA9IGdldERheXNJbk1vbnRoKHllYXJPZlByZXZpb3VzTW9udGgsIHByZXZpb3VzTW9udGgpO1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gZGF5cyArIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlciA9IGNlbGxzO1xuICAgICAgICAgICAgd2hpbGUoYWZ0ZXIgPiA3KSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgLT0gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGxzICs9IDcgLSBhZnRlcjtcbiAgICAgICAgICAgIHZhciBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHIgPSAwOyBpIDwgY2VsbHM7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEgKyAoaSAtIGJlZm9yZSkpLFxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gaXNEYXRlKHRoaXMuX2QpID8gY29tcGFyZURhdGVzKGRheSwgdGhpcy5fZCkgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA9IGNvbXBhcmVEYXRlcyhkYXksIG5vdyksXG4gICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50ID0gb3B0cy5ldmVudHMuaW5kZXhPZihkYXkudG9EYXRlU3RyaW5nKCkpICE9PSAtMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eSA9IGkgPCBiZWZvcmUgfHwgaSA+PSAoZGF5cyArIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IDEgKyAoaSAtIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyLFxuICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuc3RhcnRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZSA9IG9wdHMuZW5kUmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuZW5kUmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBvcHRzLmVuZFJhbmdlICYmIG9wdHMuc3RhcnRSYW5nZSA8IGRheSAmJiBkYXkgPCBvcHRzLmVuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gKG9wdHMubWluRGF0ZSAmJiBkYXkgPCBvcHRzLm1pbkRhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5tYXhEYXRlICYmIGRheSA+IG9wdHMubWF4RGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVXZWVrZW5kcyAmJiBpc1dlZWtlbmQoZGF5KSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVEYXlGbiAmJiBvcHRzLmRpc2FibGVEYXlGbihkYXkpKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlzSW5QcmV2aW91c01vbnRoICsgZGF5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBwcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZlByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlOdW1iZXIgLSBkYXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBuZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mTmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRheUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogZGF5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogeWVhck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50OiBoYXNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5OiBpc1RvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2U6IGlzU3RhcnRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2U6IGlzRW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRocyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHNcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLnBpY2tXaG9sZVdlZWsgJiYgaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm93LnB1c2gocmVuZGVyRGF5KGRheUNvbmZpZykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCsrciA9PT0gNykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQocmVuZGVyV2VlayhpIC0gYmVmb3JlLCBtb250aCwgeWVhcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChyZW5kZXJSb3cocm93LCBvcHRzLmlzUlRMLCBvcHRzLnBpY2tXaG9sZVdlZWssIGlzV2Vla1NlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaXNXZWVrU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyVGFibGUob3B0cywgZGF0YSwgcmFuZElkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1Zpc2libGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Y7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbk9wZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3Y7XG4gICAgICAgICAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJzsgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0aGlzLl9vLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHQU1FIE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vO1xuXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAndG91Y2hlbmQnLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy5maWVsZCwgJ2NoYW5nZScsIHRoaXMuX29uSW5wdXRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCB0aGlzLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gUGlrYWRheTtcbn0pKTtcbiJdfQ==
