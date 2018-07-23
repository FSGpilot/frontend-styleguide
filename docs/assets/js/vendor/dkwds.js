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

require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":12,"../../modules/es6.array.from":59,"../../modules/es6.string.iterator":61}],6:[function(require,module,exports){
'use strict';

require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":12,"../../modules/es6.object.assign":60}],7:[function(require,module,exports){
'use strict';

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],8:[function(require,module,exports){
'use strict';

var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":28}],9:[function(require,module,exports){
'use strict';

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":50,"./_to-iobject":52,"./_to-length":53}],10:[function(require,module,exports){
'use strict';

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":11,"./_wks":57}],11:[function(require,module,exports){
"use strict";

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],12:[function(require,module,exports){
'use strict';

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],13:[function(require,module,exports){
'use strict';

var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

},{"./_object-dp":37,"./_property-desc":44}],14:[function(require,module,exports){
'use strict';

// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":7}],15:[function(require,module,exports){
"use strict";

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],16:[function(require,module,exports){
'use strict';

// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

},{"./_fails":20}],17:[function(require,module,exports){
'use strict';

var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":21,"./_is-object":28}],18:[function(require,module,exports){
'use strict';

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

},{}],19:[function(require,module,exports){
'use strict';

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":12,"./_ctx":14,"./_global":21,"./_hide":23,"./_redefine":45}],20:[function(require,module,exports){
"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],21:[function(require,module,exports){
'use strict';

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],22:[function(require,module,exports){
"use strict";

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],23:[function(require,module,exports){
'use strict';

var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":16,"./_object-dp":37,"./_property-desc":44}],24:[function(require,module,exports){
'use strict';

var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":21}],25:[function(require,module,exports){
'use strict';

module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

},{"./_descriptors":16,"./_dom-create":17,"./_fails":20}],26:[function(require,module,exports){
'use strict';

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":11}],27:[function(require,module,exports){
'use strict';

// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":33,"./_wks":57}],28:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

},{}],29:[function(require,module,exports){
'use strict';

// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":8}],30:[function(require,module,exports){
'use strict';

var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":23,"./_object-create":36,"./_property-desc":44,"./_set-to-string-tag":46,"./_wks":57}],31:[function(require,module,exports){
'use strict';

var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":19,"./_hide":23,"./_iter-create":30,"./_iterators":33,"./_library":34,"./_object-gpo":40,"./_redefine":45,"./_set-to-string-tag":46,"./_wks":57}],32:[function(require,module,exports){
'use strict';

var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

},{"./_wks":57}],33:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = false;

},{}],35:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

},{"./_fails":20,"./_iobject":26,"./_object-gops":39,"./_object-keys":42,"./_object-pie":43,"./_to-object":54}],36:[function(require,module,exports){
'use strict';

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":8,"./_dom-create":17,"./_enum-bug-keys":18,"./_html":24,"./_object-dps":38,"./_shared-key":47}],37:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":8,"./_descriptors":16,"./_ie8-dom-define":25,"./_to-primitive":55}],38:[function(require,module,exports){
'use strict';

var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

},{"./_an-object":8,"./_descriptors":16,"./_object-dp":37,"./_object-keys":42}],39:[function(require,module,exports){
"use strict";

exports.f = Object.getOwnPropertySymbols;

},{}],40:[function(require,module,exports){
'use strict';

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

},{"./_has":22,"./_shared-key":47,"./_to-object":54}],41:[function(require,module,exports){
'use strict';

var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

},{"./_array-includes":9,"./_has":22,"./_shared-key":47,"./_to-iobject":52}],42:[function(require,module,exports){
'use strict';

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":18,"./_object-keys-internal":41}],43:[function(require,module,exports){
"use strict";

exports.f = {}.propertyIsEnumerable;

},{}],44:[function(require,module,exports){
"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],45:[function(require,module,exports){
'use strict';

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":12,"./_global":21,"./_has":22,"./_hide":23,"./_uid":56}],46:[function(require,module,exports){
'use strict';

var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":22,"./_object-dp":37,"./_wks":57}],47:[function(require,module,exports){
'use strict';

var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":48,"./_uid":56}],48:[function(require,module,exports){
'use strict';

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":12,"./_global":21,"./_library":34}],49:[function(require,module,exports){
'use strict';

var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":15,"./_to-integer":51}],50:[function(require,module,exports){
'use strict';

var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":51}],51:[function(require,module,exports){
"use strict";

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],52:[function(require,module,exports){
'use strict';

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":15,"./_iobject":26}],53:[function(require,module,exports){
'use strict';

// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":51}],54:[function(require,module,exports){
'use strict';

// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":15}],55:[function(require,module,exports){
'use strict';

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":28}],56:[function(require,module,exports){
'use strict';

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],57:[function(require,module,exports){
'use strict';

var store = require('./_shared')('wks');
var uid = require('./_uid');
var _Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":21,"./_shared":48,"./_uid":56}],58:[function(require,module,exports){
'use strict';

var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

},{"./_classof":10,"./_core":12,"./_iterators":33,"./_wks":57}],59:[function(require,module,exports){
'use strict';

var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":13,"./_ctx":14,"./_export":19,"./_is-array-iter":27,"./_iter-call":29,"./_iter-detect":32,"./_to-length":53,"./_to-object":54,"./core.get-iterator-method":58}],60:[function(require,module,exports){
'use strict';

// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":19,"./_object-assign":35}],61:[function(require,module,exports){
'use strict';

var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":31,"./_string-at":49}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"../delegate":70,"../delegateAll":69,"object-assign":66}],68:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],69:[function(require,module,exports){
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

},{"../compose":68,"../delegate":70}],70:[function(require,module,exports){
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

},{"element-closest":64}],71:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],72:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
* Tippy.js v2.5.3
* (c) 2017-2018 atomiks
* MIT
*/
(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.tippy = factory();
})(undefined, function () {
  'use strict';

  var styles = ".tippy-touch{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{max-width:350px;-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[data-html]{max-width:96%;max-width:calc(100% - 20px)}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 90%;transform-origin:0 90%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,25%);transform:scale(6) translate(-50%,25%);opacity:1}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,25%);transform:scale(1) translate(-50%,25%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(90deg);transform:translateY(0) rotateX(90deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -90%;transform-origin:0 -90%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,-125%);transform:scale(6) translate(-50%,-125%);opacity:1}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,-125%);transform:scale(1) translate(-50%,-125%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-90deg);transform:translateY(0) rotateX(-90deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:100% 0;transform-origin:100% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(40%,-50%);transform:scale(6) translate(40%,-50%);opacity:1}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(40%,-50%);transform:scale(1.5) translate(40%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-90deg);transform:translateX(0) rotateY(-90deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-100% 0;transform-origin:-100% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-140%,-50%);transform:scale(6) translate(-140%,-50%);opacity:1}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(-140%,-50%);transform:scale(1.5) translate(-140%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(90deg);transform:translateX(0) rotateY(90deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-animatefill] .tippy-content{transition:-webkit-clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98),-webkit-clip-path cubic-bezier(.46,.1,.52,.98)}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:26%;left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:\"\";float:left;padding-top:100%}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(100% 100% at 50% 50%);clip-path:ellipse(100% 100% at 50% 50%)}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(5% 50% at 50% 50%);clip-path:ellipse(5% 50% at 50% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 0 50%);clip-path:ellipse(135% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 0 50%);clip-path:ellipse(40% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 100% 50%);clip-path:ellipse(135% 100% at 100% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 100% 50%);clip-path:ellipse(40% 100% at 100% 50%)}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}";

  var version = "2.5.3";

  var isBrowser = typeof window !== 'undefined';

  var isIE = isBrowser && /MSIE |Trident\//.test(navigator.userAgent);

  var browser = {};

  if (isBrowser) {
    browser.supported = 'requestAnimationFrame' in window;
    browser.supportsTouch = 'ontouchstart' in window;
    browser.usingTouch = false;
    browser.dynamicInputDetection = true;
    browser.iOS = /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream;
    browser.onUserInputChange = function () {};
  }

  /**
   * Selector constants used for grabbing elements
   */
  var selectors = {
    POPPER: '.tippy-popper',
    TOOLTIP: '.tippy-tooltip',
    CONTENT: '.tippy-content',
    BACKDROP: '.tippy-backdrop',
    ARROW: '.tippy-arrow',
    ROUND_ARROW: '.tippy-roundarrow',
    REFERENCE: '[data-tippy]'
  };

  var defaults = {
    placement: 'top',
    livePlacement: true,
    trigger: 'mouseenter focus',
    animation: 'shift-away',
    html: false,
    animateFill: true,
    arrow: false,
    delay: 0,
    duration: [350, 300],
    interactive: false,
    interactiveBorder: 2,
    theme: 'dark',
    size: 'regular',
    distance: 10,
    offset: 0,
    hideOnClick: true,
    multiple: false,
    followCursor: false,
    inertia: false,
    updateDuration: 350,
    sticky: false,
    appendTo: function appendTo() {
      return document.body;
    },
    zIndex: 9999,
    touchHold: false,
    performance: false,
    dynamicTitle: false,
    flip: true,
    flipBehavior: 'flip',
    arrowType: 'sharp',
    arrowTransform: '',
    maxWidth: '',
    target: null,
    allowTitleHTML: true,
    popperOptions: {},
    createPopperInstanceOnInit: false,
    onShow: function onShow() {},
    onShown: function onShown() {},
    onHide: function onHide() {},
    onHidden: function onHidden() {}
  };

  /**
   * The keys of the defaults object for reducing down into a new object
   * Used in `getIndividualOptions()`
   */
  var defaultsKeys = browser.supported && Object.keys(defaults);

  /**
   * Determines if a value is an object literal
   * @param {*} value
   * @return {Boolean}
   */
  function isObjectLiteral(value) {
    return {}.toString.call(value) === '[object Object]';
  }

  /**
   * Ponyfill for Array.from
   * @param {*} value
   * @return {Array}
   */
  function toArray(value) {
    return [].slice.call(value);
  }

  /**
   * Returns an array of elements based on the selector input
   * @param {String|Element|Element[]|NodeList|Object} selector
   * @return {Element[]}
   */
  function getArrayOfElements(selector) {
    if (selector instanceof Element || isObjectLiteral(selector)) {
      return [selector];
    }

    if (selector instanceof NodeList) {
      return toArray(selector);
    }

    if (Array.isArray(selector)) {
      return selector;
    }

    try {
      return toArray(document.querySelectorAll(selector));
    } catch (_) {
      return [];
    }
  }

  /**
   * Polyfills needed props/methods for a virtual reference object
   * NOTE: in v3.0 this will be pure
   * @param {Object} reference
   */
  function polyfillVirtualReferenceProps(reference) {
    reference.refObj = true;
    reference.attributes = reference.attributes || {};
    reference.setAttribute = function (key, val) {
      reference.attributes[key] = val;
    };
    reference.getAttribute = function (key) {
      return reference.attributes[key];
    };
    reference.removeAttribute = function (key) {
      delete reference.attributes[key];
    };
    reference.hasAttribute = function (key) {
      return key in reference.attributes;
    };
    reference.addEventListener = function () {};
    reference.removeEventListener = function () {};
    reference.classList = {
      classNames: {},
      add: function add(key) {
        return reference.classList.classNames[key] = true;
      },
      remove: function remove(key) {
        delete reference.classList.classNames[key];
        return true;
      },
      contains: function contains(key) {
        return key in reference.classList.classNames;
      }
    };
  }

  /**
   * Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
   * @param {String} property
   * @return {String} - browser supported prefixed property
   */
  function prefix(property) {
    var prefixes = ['', 'webkit'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var _prefix = prefixes[i];
      var prefixedProp = _prefix ? _prefix + upperProp : property;
      if (typeof document.body.style[prefixedProp] !== 'undefined') {
        return prefixedProp;
      }
    }

    return null;
  }

  /**
   * Creates a div element
   * @return {Element}
   */
  function div() {
    return document.createElement('div');
  }

  /**
   * Creates a popper element then returns it
   * @param {Number} id - the popper id
   * @param {String} title - the tooltip's `title` attribute
   * @param {Object} options - individual options
   * @return {Element} - the popper element
   */
  function createPopperElement(id, title, options) {
    var popper = div();
    popper.setAttribute('class', 'tippy-popper');
    popper.setAttribute('role', 'tooltip');
    popper.setAttribute('id', 'tippy-' + id);
    popper.style.zIndex = options.zIndex;
    popper.style.maxWidth = options.maxWidth;

    var tooltip = div();
    tooltip.setAttribute('class', 'tippy-tooltip');
    tooltip.setAttribute('data-size', options.size);
    tooltip.setAttribute('data-animation', options.animation);
    tooltip.setAttribute('data-state', 'hidden');
    options.theme.split(' ').forEach(function (t) {
      tooltip.classList.add(t + '-theme');
    });

    var content = div();
    content.setAttribute('class', 'tippy-content');

    if (options.arrow) {
      var arrow = div();
      arrow.style[prefix('transform')] = options.arrowTransform;

      if (options.arrowType === 'round') {
        arrow.classList.add('tippy-roundarrow');
        arrow.innerHTML = '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>';
      } else {
        arrow.classList.add('tippy-arrow');
      }

      tooltip.appendChild(arrow);
    }

    if (options.animateFill) {
      // Create animateFill circle element for animation
      tooltip.setAttribute('data-animatefill', '');
      var backdrop = div();
      backdrop.classList.add('tippy-backdrop');
      backdrop.setAttribute('data-state', 'hidden');
      tooltip.appendChild(backdrop);
    }

    if (options.inertia) {
      // Change transition timing function cubic bezier
      tooltip.setAttribute('data-inertia', '');
    }

    if (options.interactive) {
      tooltip.setAttribute('data-interactive', '');
    }

    var html = options.html;
    if (html) {
      var templateId = void 0;

      if (html instanceof Element) {
        content.appendChild(html);
        templateId = '#' + (html.id || 'tippy-html-template');
      } else {
        // trick linters: https://github.com/atomiks/tippyjs/issues/197
        content[true && 'innerHTML'] = document.querySelector(html)[true && 'innerHTML'];
        templateId = html;
      }

      popper.setAttribute('data-html', '');
      tooltip.setAttribute('data-template-id', templateId);

      if (options.interactive) {
        popper.setAttribute('tabindex', '-1');
      }
    } else {
      content[options.allowTitleHTML ? 'innerHTML' : 'textContent'] = title;
    }

    tooltip.appendChild(content);
    popper.appendChild(tooltip);

    return popper;
  }

  /**
   * Creates a trigger by adding the necessary event listeners to the reference element
   * @param {String} eventType - the custom event specified in the `trigger` setting
   * @param {Element} reference
   * @param {Object} handlers - the handlers for each event
   * @param {Object} options
   * @return {Array} - array of listener objects
   */
  function createTrigger(eventType, reference, handlers, options) {
    var onTrigger = handlers.onTrigger,
        onMouseLeave = handlers.onMouseLeave,
        onBlur = handlers.onBlur,
        onDelegateShow = handlers.onDelegateShow,
        onDelegateHide = handlers.onDelegateHide;

    var listeners = [];

    if (eventType === 'manual') return listeners;

    var on = function on(eventType, handler) {
      reference.addEventListener(eventType, handler);
      listeners.push({ event: eventType, handler: handler });
    };

    if (!options.target) {
      on(eventType, onTrigger);

      if (browser.supportsTouch && options.touchHold) {
        on('touchstart', onTrigger);
        on('touchend', onMouseLeave);
      }
      if (eventType === 'mouseenter') {
        on('mouseleave', onMouseLeave);
      }
      if (eventType === 'focus') {
        on(isIE ? 'focusout' : 'blur', onBlur);
      }
    } else {
      if (browser.supportsTouch && options.touchHold) {
        on('touchstart', onDelegateShow);
        on('touchend', onDelegateHide);
      }
      if (eventType === 'mouseenter') {
        on('mouseover', onDelegateShow);
        on('mouseout', onDelegateHide);
      }
      if (eventType === 'focus') {
        on('focusin', onDelegateShow);
        on('focusout', onDelegateHide);
      }
      if (eventType === 'click') {
        on('click', onDelegateShow);
      }
    }

    return listeners;
  }

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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Returns an object of settings to override global settings
   * @param {Element} reference
   * @param {Object} instanceOptions
   * @return {Object} - individual options
   */
  function getIndividualOptions(reference, instanceOptions) {
    var options = defaultsKeys.reduce(function (acc, key) {
      var val = reference.getAttribute('data-tippy-' + key.toLowerCase()) || instanceOptions[key];

      // Convert strings to booleans
      if (val === 'false') val = false;
      if (val === 'true') val = true;

      // Convert number strings to true numbers
      if (isFinite(val) && !isNaN(parseFloat(val))) {
        val = parseFloat(val);
      }

      // Convert array strings to actual arrays
      if (key !== 'target' && typeof val === 'string' && val.trim().charAt(0) === '[') {
        val = JSON.parse(val);
      }

      acc[key] = val;

      return acc;
    }, {});

    return _extends({}, instanceOptions, options);
  }

  /**
   * Evaluates/modifies the options object for appropriate behavior
   * @param {Element|Object} reference
   * @param {Object} options
   * @return {Object} modified/evaluated options
   */
  function evaluateOptions(reference, options) {
    // animateFill is disabled if an arrow is true
    if (options.arrow) {
      options.animateFill = false;
    }

    if (options.appendTo && typeof options.appendTo === 'function') {
      options.appendTo = options.appendTo();
    }

    if (typeof options.html === 'function') {
      options.html = options.html(reference);
    }

    return options;
  }

  /**
   * Returns inner elements of the popper element
   * @param {Element} popper
   * @return {Object}
   */
  function getInnerElements(popper) {
    var select = function select(s) {
      return popper.querySelector(s);
    };
    return {
      tooltip: select(selectors.TOOLTIP),
      backdrop: select(selectors.BACKDROP),
      content: select(selectors.CONTENT),
      arrow: select(selectors.ARROW) || select(selectors.ROUND_ARROW)
    };
  }

  /**
   * Removes the title from an element, setting `data-original-title`
   * appropriately
   * @param {Element} el
   */
  function removeTitle(el) {
    var title = el.getAttribute('title');
    // Only set `data-original-title` attr if there is a title
    if (title) {
      el.setAttribute('data-original-title', title);
    }
    el.removeAttribute('title');
  }

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.3
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser$1 && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var css = getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE$1(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE$1(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE$1(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
  }

  function getWindowSizes() {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE$1(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck$1 = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass$1 = function () {
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

  var defineProperty$1 = function defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE$1(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE$1(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && parent.nodeName === 'HTML') {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    return isFixed(getParentNode(element));
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE$1()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    boundaries.left += padding;
    boundaries.top += padding;
    boundaries.right -= padding;
    boundaries.bottom -= padding;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var styles = getComputedStyle(element);
    var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroy the popper
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger onUpdate callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    // Avoid blurry text by using full pixel integers.
    // For pixel-perfect positioning, top/bottom prefers rounded
    // values, while left/right prefers floored values.
    var offsets = {
      left: Math.floor(popper.left),
      top: Math.round(popper.top),
      bottom: Math.round(popper.bottom),
      right: Math.floor(popper.right)
    };

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      top = -offsetParentRect.height + offsets.bottom;
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      left = -offsetParentRect.width + offsets.right;
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjuction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-right` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty$1({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty$1({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty$1({}, side, reference[side]),
        end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unitless, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the height.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * An scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper this makes sure the popper has always a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier, can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near eachothers
     * without leaving any gap between the two. Expecially useful when the arrow is
     * enabled and you want to assure it to point to its reference element.
     * It cares only about the first axis, you can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjuction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations).
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position,
       * the popper will never be placed outside of the defined boundaries
       * (except if keepTogether is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define you own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the informations used by Popper.js
   * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overriden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass as 3rd argument an object with the same
   * structure of this object, example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Create a new Popper.js instance
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper.
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck$1(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$1({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass$1(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedule an update, it will run on the next UI update available
       * @method scheduleUpdate
       * @memberof Popper
       */

      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */

  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * Triggers document reflow.
   * Use void because some minifiers or engines think simply accessing the property
   * is unnecessary.
   * @param {Element} popper
   */
  function reflow(popper) {
    void popper.offsetHeight;
  }

  /**
   * Wrapper util for popper position updating.
   * Updates the popper's position and invokes the callback on update.
   * Hackish workaround until Popper 2.0's update() becomes sync.
   * @param {Popper} popperInstance
   * @param {Function} callback: to run once popper's position was updated
   * @param {Boolean} updateAlreadyCalled: was scheduleUpdate() already called?
   */
  function updatePopperPosition(popperInstance, callback, updateAlreadyCalled) {
    var popper = popperInstance.popper,
        options = popperInstance.options;

    var onCreate = options.onCreate;
    var onUpdate = options.onUpdate;

    options.onCreate = options.onUpdate = function () {
      reflow(popper), callback && callback(), onUpdate();
      options.onCreate = onCreate;
      options.onUpdate = onUpdate;
    };

    if (!updateAlreadyCalled) {
      popperInstance.scheduleUpdate();
    }
  }

  /**
   * Returns the core placement ('top', 'bottom', 'left', 'right') of a popper
   * @param {Element} popper
   * @return {String}
   */
  function getPopperPlacement(popper) {
    return popper.getAttribute('x-placement').replace(/-.+/, '');
  }

  /**
   * Determines if the mouse's cursor is outside the interactive border
   * @param {MouseEvent} event
   * @param {Element} popper
   * @param {Object} options
   * @return {Boolean}
   */
  function cursorIsOutsideInteractiveBorder(event, popper, options) {
    if (!popper.getAttribute('x-placement')) return true;

    var x = event.clientX,
        y = event.clientY;
    var interactiveBorder = options.interactiveBorder,
        distance = options.distance;

    var rect = popper.getBoundingClientRect();
    var placement = getPopperPlacement(popper);
    var borderWithDistance = interactiveBorder + distance;

    var exceeds = {
      top: rect.top - y > interactiveBorder,
      bottom: y - rect.bottom > interactiveBorder,
      left: rect.left - x > interactiveBorder,
      right: x - rect.right > interactiveBorder
    };

    switch (placement) {
      case 'top':
        exceeds.top = rect.top - y > borderWithDistance;
        break;
      case 'bottom':
        exceeds.bottom = y - rect.bottom > borderWithDistance;
        break;
      case 'left':
        exceeds.left = rect.left - x > borderWithDistance;
        break;
      case 'right':
        exceeds.right = x - rect.right > borderWithDistance;
        break;
    }

    return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
  }

  /**
   * Transforms the `arrowTransform` numbers based on the placement axis
   * @param {String} type 'scale' or 'translate'
   * @param {Number[]} numbers
   * @param {Boolean} isVertical
   * @param {Boolean} isReverse
   * @return {String}
   */
  function transformNumbersBasedOnPlacementAxis(type, numbers, isVertical, isReverse) {
    if (!numbers.length) return '';

    var transforms = {
      scale: function () {
        if (numbers.length === 1) {
          return '' + numbers[0];
        } else {
          return isVertical ? numbers[0] + ', ' + numbers[1] : numbers[1] + ', ' + numbers[0];
        }
      }(),
      translate: function () {
        if (numbers.length === 1) {
          return isReverse ? -numbers[0] + 'px' : numbers[0] + 'px';
        } else {
          if (isVertical) {
            return isReverse ? numbers[0] + 'px, ' + -numbers[1] + 'px' : numbers[0] + 'px, ' + numbers[1] + 'px';
          } else {
            return isReverse ? -numbers[1] + 'px, ' + numbers[0] + 'px' : numbers[1] + 'px, ' + numbers[0] + 'px';
          }
        }
      }()
    };

    return transforms[type];
  }

  /**
   * Transforms the `arrowTransform` x or y axis based on the placement axis
   * @param {String} axis 'X', 'Y', ''
   * @param {Boolean} isVertical
   * @return {String}
   */
  function transformAxis(axis, isVertical) {
    if (!axis) return '';
    var map = {
      X: 'Y',
      Y: 'X'
    };
    return isVertical ? axis : map[axis];
  }

  /**
   * Computes and applies the necessary arrow transform
   * @param {Element} popper
   * @param {Element} arrow
   * @param {String} arrowTransform
   */
  function computeArrowTransform(popper, arrow, arrowTransform) {
    var placement = getPopperPlacement(popper);
    var isVertical = placement === 'top' || placement === 'bottom';
    var isReverse = placement === 'right' || placement === 'bottom';

    var getAxis = function getAxis(re) {
      var match = arrowTransform.match(re);
      return match ? match[1] : '';
    };

    var getNumbers = function getNumbers(re) {
      var match = arrowTransform.match(re);
      return match ? match[1].split(',').map(parseFloat) : [];
    };

    var re = {
      translate: /translateX?Y?\(([^)]+)\)/,
      scale: /scaleX?Y?\(([^)]+)\)/
    };

    var matches = {
      translate: {
        axis: getAxis(/translate([XY])/),
        numbers: getNumbers(re.translate)
      },
      scale: {
        axis: getAxis(/scale([XY])/),
        numbers: getNumbers(re.scale)
      }
    };

    var computedTransform = arrowTransform.replace(re.translate, 'translate' + transformAxis(matches.translate.axis, isVertical) + '(' + transformNumbersBasedOnPlacementAxis('translate', matches.translate.numbers, isVertical, isReverse) + ')').replace(re.scale, 'scale' + transformAxis(matches.scale.axis, isVertical) + '(' + transformNumbersBasedOnPlacementAxis('scale', matches.scale.numbers, isVertical, isReverse) + ')');

    arrow.style[prefix('transform')] = computedTransform;
  }

  /**
   * Returns the distance taking into account the default distance due to
   * the transform: translate setting in CSS
   * @param {Number} distance
   * @return {String}
   */
  function getOffsetDistanceInPx(distance) {
    return -(distance - defaults.distance) + 'px';
  }

  /**
   * Waits until next repaint to execute a fn
   * @param {Function} fn
   */
  function defer(fn) {
    requestAnimationFrame(function () {
      setTimeout(fn, 1);
    });
  }

  var matches = {};

  if (isBrowser) {
    var e = Element.prototype;
    matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s);
      var i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
      return i > -1;
    };
  }

  var matches$1 = matches;

  /**
   * Ponyfill to get the closest parent element
   * @param {Element} element - child of parent to be returned
   * @param {String} parentSelector - selector to match the parent if found
   * @return {Element}
   */
  function closest(element, parentSelector) {
    var fn = Element.prototype.closest || function (selector) {
      var el = this;
      while (el) {
        if (matches$1.call(el, selector)) {
          return el;
        }
        el = el.parentElement;
      }
    };

    return fn.call(element, parentSelector);
  }

  /**
   * Returns the value taking into account the value being either a number or array
   * @param {Number|Array} value
   * @param {Number} index
   * @return {Number}
   */
  function getValue(value, index) {
    return Array.isArray(value) ? value[index] : value;
  }

  /**
   * Sets the visibility state of an element for transition to begin
   * @param {Element[]} els - array of elements
   * @param {String} type - 'visible' or 'hidden'
   */
  function setVisibilityState(els, type) {
    els.forEach(function (el) {
      if (!el) return;
      el.setAttribute('data-state', type);
    });
  }

  /**
   * Sets the transition property to each element
   * @param {Element[]} els - Array of elements
   * @param {String} value
   */
  function applyTransitionDuration(els, value) {
    els.filter(Boolean).forEach(function (el) {
      el.style[prefix('transitionDuration')] = value + 'ms';
    });
  }

  /**
   * Focuses an element while preventing a scroll jump if it's not entirely within the viewport
   * @param {Element} el
   */
  function focus(el) {
    var x = window.scrollX || window.pageXOffset;
    var y = window.scrollY || window.pageYOffset;
    el.focus();
    scroll(x, y);
  }

  var key = {};
  var store = function store(data) {
    return function (k) {
      return k === key && data;
    };
  };

  var Tippy = function () {
    function Tippy(config) {
      classCallCheck(this, Tippy);

      for (var _key in config) {
        this[_key] = config[_key];
      }

      this.state = {
        destroyed: false,
        visible: false,
        enabled: true
      };

      this._ = store({
        mutationObservers: []
      });
    }

    /**
     * Enables the tooltip to allow it to show or hide
     * @memberof Tippy
     * @public
     */

    createClass(Tippy, [{
      key: 'enable',
      value: function enable() {
        this.state.enabled = true;
      }

      /**
       * Disables the tooltip from showing or hiding, but does not destroy it
       * @memberof Tippy
       * @public
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.state.enabled = false;
      }

      /**
       * Shows the tooltip
       * @param {Number} duration in milliseconds
       * @memberof Tippy
       * @public
       */

    }, {
      key: 'show',
      value: function show(duration) {
        var _this = this;

        if (this.state.destroyed || !this.state.enabled) return;

        var popper = this.popper,
            reference = this.reference,
            options = this.options;

        var _getInnerElements = getInnerElements(popper),
            tooltip = _getInnerElements.tooltip,
            backdrop = _getInnerElements.backdrop,
            content = _getInnerElements.content;

        // If the `dynamicTitle` option is true, the instance is allowed
        // to be created with an empty title. Make sure that the tooltip
        // content is not empty before showing it


        if (options.dynamicTitle && !reference.getAttribute('data-original-title')) {
          return;
        }

        // Do not show tooltip if reference contains 'disabled' attribute. FF fix for #221
        if (reference.hasAttribute('disabled')) return;

        // Destroy tooltip if the reference element is no longer on the DOM
        if (!reference.refObj && !document.documentElement.contains(reference)) {
          this.destroy();
          return;
        }

        options.onShow.call(popper, this);

        duration = getValue(duration !== undefined ? duration : options.duration, 0);

        // Prevent a transition when popper changes position
        applyTransitionDuration([popper, tooltip, backdrop], 0);

        popper.style.visibility = 'visible';
        this.state.visible = true;

        _mount.call(this, function () {
          if (!_this.state.visible) return;

          if (!_hasFollowCursorBehavior.call(_this)) {
            // FIX: Arrow will sometimes not be positioned correctly. Force another update.
            _this.popperInstance.scheduleUpdate();
          }

          // Set initial position near the cursor
          if (_hasFollowCursorBehavior.call(_this)) {
            _this.popperInstance.disableEventListeners();
            var delay = getValue(options.delay, 0);
            var lastTriggerEvent = _this._(key).lastTriggerEvent;
            if (lastTriggerEvent) {
              _this._(key).followCursorListener(delay && _this._(key).lastMouseMoveEvent ? _this._(key).lastMouseMoveEvent : lastTriggerEvent);
            }
          }

          // Re-apply transition durations
          applyTransitionDuration([tooltip, backdrop, backdrop ? content : null], duration);

          if (backdrop) {
            getComputedStyle(backdrop)[prefix('transform')];
          }

          if (options.interactive) {
            reference.classList.add('tippy-active');
          }

          if (options.sticky) {
            _makeSticky.call(_this);
          }

          setVisibilityState([tooltip, backdrop], 'visible');

          _onTransitionEnd.call(_this, duration, function () {
            if (!options.updateDuration) {
              tooltip.classList.add('tippy-notransition');
            }

            if (options.interactive) {
              focus(popper);
            }

            reference.setAttribute('aria-describedby', 'tippy-' + _this.id);

            options.onShown.call(popper, _this);
          });
        });
      }

      /**
       * Hides the tooltip
       * @param {Number} duration in milliseconds
       * @memberof Tippy
       * @public
       */

    }, {
      key: 'hide',
      value: function hide(duration) {
        var _this2 = this;

        if (this.state.destroyed || !this.state.enabled) return;

        var popper = this.popper,
            reference = this.reference,
            options = this.options;

        var _getInnerElements2 = getInnerElements(popper),
            tooltip = _getInnerElements2.tooltip,
            backdrop = _getInnerElements2.backdrop,
            content = _getInnerElements2.content;

        options.onHide.call(popper, this);

        duration = getValue(duration !== undefined ? duration : options.duration, 1);

        if (!options.updateDuration) {
          tooltip.classList.remove('tippy-notransition');
        }

        if (options.interactive) {
          reference.classList.remove('tippy-active');
        }

        popper.style.visibility = 'hidden';
        this.state.visible = false;

        applyTransitionDuration([tooltip, backdrop, backdrop ? content : null], duration);

        setVisibilityState([tooltip, backdrop], 'hidden');

        if (options.interactive && options.trigger.indexOf('click') > -1) {
          focus(reference);
        }

        /*
        * This call is deferred because sometimes when the tooltip is still transitioning in but hide()
        * is called before it finishes, the CSS transition won't reverse quickly enough, meaning
        * the CSS transition will finish 1-2 frames later, and onHidden() will run since the JS set it
        * more quickly. It should actually be onShown(). Seems to be something Chrome does, not Safari
        */
        defer(function () {
          _onTransitionEnd.call(_this2, duration, function () {
            if (_this2.state.visible || !options.appendTo.contains(popper)) return;

            if (!_this2._(key).isPreparingToShow) {
              document.removeEventListener('mousemove', _this2._(key).followCursorListener);
              _this2._(key).lastMouseMoveEvent = null;
            }

            if (_this2.popperInstance) {
              _this2.popperInstance.disableEventListeners();
            }

            reference.removeAttribute('aria-describedby');

            options.appendTo.removeChild(popper);

            options.onHidden.call(popper, _this2);
          });
        });
      }

      /**
       * Destroys the tooltip instance
       * @param {Boolean} destroyTargetInstances - relevant only when destroying delegates
       * @memberof Tippy
       * @public
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        var destroyTargetInstances = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.state.destroyed) return;

        // Ensure the popper is hidden
        if (this.state.visible) {
          this.hide(0);
        }

        this.listeners.forEach(function (listener) {
          _this3.reference.removeEventListener(listener.event, listener.handler);
        });

        // Restore title
        if (this.title) {
          this.reference.setAttribute('title', this.title);
        }

        delete this.reference._tippy;

        var attributes = ['data-original-title', 'data-tippy', 'data-tippy-delegate'];
        attributes.forEach(function (attr) {
          _this3.reference.removeAttribute(attr);
        });

        if (this.options.target && destroyTargetInstances) {
          toArray(this.reference.querySelectorAll(this.options.target)).forEach(function (child) {
            return child._tippy && child._tippy.destroy();
          });
        }

        if (this.popperInstance) {
          this.popperInstance.destroy();
        }

        this._(key).mutationObservers.forEach(function (observer) {
          observer.disconnect();
        });

        this.state.destroyed = true;
      }
    }]);
    return Tippy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   * Standalone functions to be called with the instance's `this` context to make
   * them truly private and not accessible on the prototype
   */

  /**
   * Determines if the tooltip instance has followCursor behavior
   * @return {Boolean}
   * @memberof Tippy
   * @private
   */
  function _hasFollowCursorBehavior() {
    var lastTriggerEvent = this._(key).lastTriggerEvent;
    return this.options.followCursor && !browser.usingTouch && lastTriggerEvent && lastTriggerEvent.type !== 'focus';
  }

  /**
   * Creates the Tippy instance for the child target of the delegate container
   * @param {Event} event
   * @memberof Tippy
   * @private
   */
  function _createDelegateChildTippy(event) {
    var targetEl = closest(event.target, this.options.target);
    if (targetEl && !targetEl._tippy) {
      var title = targetEl.getAttribute('title') || this.title;
      if (title) {
        targetEl.setAttribute('title', title);
        tippy(targetEl, _extends({}, this.options, { target: null }));
        _enter.call(targetEl._tippy, event);
      }
    }
  }

  /**
   * Method used by event listeners to invoke the show method, taking into account delays and
   * the `wait` option
   * @param {Event} event
   * @memberof Tippy
   * @private
   */
  function _enter(event) {
    var _this4 = this;

    var options = this.options;

    _clearDelayTimeouts.call(this);

    if (this.state.visible) return;

    // Is a delegate, create Tippy instance for the child target
    if (options.target) {
      _createDelegateChildTippy.call(this, event);
      return;
    }

    this._(key).isPreparingToShow = true;

    if (options.wait) {
      options.wait.call(this.popper, this.show.bind(this), event);
      return;
    }

    // If the tooltip has a delay, we need to be listening to the mousemove as soon as the trigger
    // event is fired so that it's in the correct position upon mount.
    if (_hasFollowCursorBehavior.call(this)) {
      if (!this._(key).followCursorListener) {
        _setFollowCursorListener.call(this);
      }

      var _getInnerElements3 = getInnerElements(this.popper),
          arrow = _getInnerElements3.arrow;

      if (arrow) arrow.style.margin = '0';
      document.addEventListener('mousemove', this._(key).followCursorListener);
    }

    var delay = getValue(options.delay, 0);

    if (delay) {
      this._(key).showTimeout = setTimeout(function () {
        _this4.show();
      }, delay);
    } else {
      this.show();
    }
  }

  /**
   * Method used by event listeners to invoke the hide method, taking into account delays
   * @memberof Tippy
   * @private
   */
  function _leave() {
    var _this5 = this;

    _clearDelayTimeouts.call(this);

    if (!this.state.visible) return;

    this._(key).isPreparingToShow = false;

    var delay = getValue(this.options.delay, 1);

    if (delay) {
      this._(key).hideTimeout = setTimeout(function () {
        if (_this5.state.visible) {
          _this5.hide();
        }
      }, delay);
    } else {
      this.hide();
    }
  }

  /**
   * Returns relevant listeners for the instance
   * @return {Object} of listeners
   * @memberof Tippy
   * @private
   */
  function _getEventListeners() {
    var _this6 = this;

    var onTrigger = function onTrigger(event) {
      if (!_this6.state.enabled) return;

      var shouldStopEvent = browser.supportsTouch && browser.usingTouch && ['mouseenter', 'mouseover', 'focus'].indexOf(event.type) > -1;

      if (shouldStopEvent && _this6.options.touchHold) return;

      _this6._(key).lastTriggerEvent = event;

      // Toggle show/hide when clicking click-triggered tooltips
      if (event.type === 'click' && _this6.options.hideOnClick !== 'persistent' && _this6.state.visible) {
        _leave.call(_this6);
      } else {
        _enter.call(_this6, event);
      }
    };

    var onMouseLeave = function onMouseLeave(event) {
      if (['mouseleave', 'mouseout'].indexOf(event.type) > -1 && browser.supportsTouch && browser.usingTouch && _this6.options.touchHold) return;

      if (_this6.options.interactive) {
        var hide = _leave.bind(_this6);

        var onMouseMove = function onMouseMove(event) {
          var referenceCursorIsOver = closest(event.target, selectors.REFERENCE);
          var cursorIsOverPopper = closest(event.target, selectors.POPPER) === _this6.popper;
          var cursorIsOverReference = referenceCursorIsOver === _this6.reference;

          if (cursorIsOverPopper || cursorIsOverReference) return;

          if (cursorIsOutsideInteractiveBorder(event, _this6.popper, _this6.options)) {
            document.body.removeEventListener('mouseleave', hide);
            document.removeEventListener('mousemove', onMouseMove);

            _leave.call(_this6, onMouseMove);
          }
        };

        document.body.addEventListener('mouseleave', hide);
        document.addEventListener('mousemove', onMouseMove);
        return;
      }

      _leave.call(_this6);
    };

    var onBlur = function onBlur(event) {
      if (event.target !== _this6.reference || browser.usingTouch) return;

      if (_this6.options.interactive) {
        if (!event.relatedTarget) return;
        if (closest(event.relatedTarget, selectors.POPPER)) return;
      }

      _leave.call(_this6);
    };

    var onDelegateShow = function onDelegateShow(event) {
      if (closest(event.target, _this6.options.target)) {
        _enter.call(_this6, event);
      }
    };

    var onDelegateHide = function onDelegateHide(event) {
      if (closest(event.target, _this6.options.target)) {
        _leave.call(_this6);
      }
    };

    return {
      onTrigger: onTrigger,
      onMouseLeave: onMouseLeave,
      onBlur: onBlur,
      onDelegateShow: onDelegateShow,
      onDelegateHide: onDelegateHide
    };
  }

  /**
   * Creates and returns a new popper instance
   * @return {Popper}
   * @memberof Tippy
   * @private
   */
  function _createPopperInstance() {
    var _this7 = this;

    var popper = this.popper,
        reference = this.reference,
        options = this.options;

    var _getInnerElements4 = getInnerElements(popper),
        tooltip = _getInnerElements4.tooltip;

    var popperOptions = options.popperOptions;

    var arrowSelector = options.arrowType === 'round' ? selectors.ROUND_ARROW : selectors.ARROW;
    var arrow = tooltip.querySelector(arrowSelector);

    var config = _extends({
      placement: options.placement
    }, popperOptions || {}, {
      modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
        arrow: _extends({
          element: arrowSelector
        }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.arrow : {}),
        flip: _extends({
          enabled: options.flip,
          padding: options.distance + 5 /* 5px from viewport boundary */
          , behavior: options.flipBehavior
        }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
        offset: _extends({
          offset: options.offset
        }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
      }),
      onCreate: function onCreate() {
        tooltip.style[getPopperPlacement(popper)] = getOffsetDistanceInPx(options.distance);

        if (arrow && options.arrowTransform) {
          computeArrowTransform(popper, arrow, options.arrowTransform);
        }
      },
      onUpdate: function onUpdate() {
        var styles = tooltip.style;
        styles.top = '';
        styles.bottom = '';
        styles.left = '';
        styles.right = '';
        styles[getPopperPlacement(popper)] = getOffsetDistanceInPx(options.distance);

        if (arrow && options.arrowTransform) {
          computeArrowTransform(popper, arrow, options.arrowTransform);
        }
      }
    });

    _addMutationObserver.call(this, {
      target: popper,
      callback: function callback() {
        _this7.popperInstance.update();
      },
      options: {
        childList: true,
        subtree: true,
        characterData: true
      }
    });

    return new Popper(reference, popper, config);
  }

  /**
   * Appends the popper element to the DOM, updating or creating the popper instance
   * @param {Function} callback
   * @memberof Tippy
   * @private
   */
  function _mount(callback) {
    var options = this.options;

    if (!this.popperInstance) {
      this.popperInstance = _createPopperInstance.call(this);
      if (!options.livePlacement) {
        this.popperInstance.disableEventListeners();
      }
    } else {
      this.popperInstance.scheduleUpdate();
      if (options.livePlacement && !_hasFollowCursorBehavior.call(this)) {
        this.popperInstance.enableEventListeners();
      }
    }

    // If the instance previously had followCursor behavior, it will be positioned incorrectly
    // if triggered by `focus` afterwards - update the reference back to the real DOM element
    if (!_hasFollowCursorBehavior.call(this)) {
      var _getInnerElements5 = getInnerElements(this.popper),
          arrow = _getInnerElements5.arrow;

      if (arrow) arrow.style.margin = '';
      this.popperInstance.reference = this.reference;
    }

    updatePopperPosition(this.popperInstance, callback, true);

    if (!options.appendTo.contains(this.popper)) {
      options.appendTo.appendChild(this.popper);
    }
  }

  /**
   * Clears the show and hide delay timeouts
   * @memberof Tippy
   * @private
   */
  function _clearDelayTimeouts() {
    var _ref = this._(key),
        showTimeout = _ref.showTimeout,
        hideTimeout = _ref.hideTimeout;

    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
  }

  /**
   * Sets the mousemove event listener function for `followCursor` option
   * @memberof Tippy
   * @private
   */
  function _setFollowCursorListener() {
    var _this8 = this;

    this._(key).followCursorListener = function (event) {
      var _$lastMouseMoveEvent = _this8._(key).lastMouseMoveEvent = event,
          clientX = _$lastMouseMoveEvent.clientX,
          clientY = _$lastMouseMoveEvent.clientY;

      if (!_this8.popperInstance) return;

      _this8.popperInstance.reference = {
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            top: clientY,
            left: clientX,
            right: clientX,
            bottom: clientY
          };
        },
        clientWidth: 0,
        clientHeight: 0
      };

      _this8.popperInstance.scheduleUpdate();
    };
  }

  /**
   * Updates the popper's position on each animation frame
   * @memberof Tippy
   * @private
   */
  function _makeSticky() {
    var _this9 = this;

    var applyTransitionDuration$$1 = function applyTransitionDuration$$1() {
      _this9.popper.style[prefix('transitionDuration')] = _this9.options.updateDuration + 'ms';
    };

    var removeTransitionDuration = function removeTransitionDuration() {
      _this9.popper.style[prefix('transitionDuration')] = '';
    };

    var updatePosition = function updatePosition() {
      if (_this9.popperInstance) {
        _this9.popperInstance.update();
      }

      applyTransitionDuration$$1();

      if (_this9.state.visible) {
        requestAnimationFrame(updatePosition);
      } else {
        removeTransitionDuration();
      }
    };

    updatePosition();
  }

  /**
   * Adds a mutation observer to an element and stores it in the instance
   * @param {Object}
   * @memberof Tippy
   * @private
   */
  function _addMutationObserver(_ref2) {
    var target = _ref2.target,
        callback = _ref2.callback,
        options = _ref2.options;

    if (!window.MutationObserver) return;

    var observer = new MutationObserver(callback);
    observer.observe(target, options);

    this._(key).mutationObservers.push(observer);
  }

  /**
   * Fires the callback functions once the CSS transition ends for `show` and `hide` methods
   * @param {Number} duration
   * @param {Function} callback - callback function to fire once transition completes
   * @memberof Tippy
   * @private
   */
  function _onTransitionEnd(duration, callback) {
    // Make callback synchronous if duration is 0
    if (!duration) {
      return callback();
    }

    var _getInnerElements6 = getInnerElements(this.popper),
        tooltip = _getInnerElements6.tooltip;

    var toggleListeners = function toggleListeners(action, listener) {
      if (!listener) return;
      tooltip[action + 'EventListener']('ontransitionend' in window ? 'transitionend' : 'webkitTransitionEnd', listener);
    };

    var listener = function listener(e) {
      if (e.target === tooltip) {
        toggleListeners('remove', listener);
        callback();
      }
    };

    toggleListeners('remove', this._(key).transitionendListener);
    toggleListeners('add', listener);

    this._(key).transitionendListener = listener;
  }

  var idCounter = 1;

  /**
   * Creates tooltips for each reference element
   * @param {Element[]} els
   * @param {Object} config
   * @return {Tippy[]} Array of Tippy instances
   */
  function createTooltips(els, config) {
    return els.reduce(function (acc, reference) {
      var id = idCounter;

      var options = evaluateOptions(reference, config.performance ? config : getIndividualOptions(reference, config));

      var title = reference.getAttribute('title');

      // Don't create an instance when:
      // * the `title` attribute is falsy (null or empty string), and
      // * it's not a delegate for tooltips, and
      // * there is no html template specified, and
      // * `dynamicTitle` option is false
      if (!title && !options.target && !options.html && !options.dynamicTitle) {
        return acc;
      }

      // Delegates should be highlighted as different
      reference.setAttribute(options.target ? 'data-tippy-delegate' : 'data-tippy', '');

      removeTitle(reference);

      var popper = createPopperElement(id, title, options);

      var tippy = new Tippy({
        id: id,
        reference: reference,
        popper: popper,
        options: options,
        title: title,
        popperInstance: null
      });

      if (options.createPopperInstanceOnInit) {
        tippy.popperInstance = _createPopperInstance.call(tippy);
        tippy.popperInstance.disableEventListeners();
      }

      var listeners = _getEventListeners.call(tippy);
      tippy.listeners = options.trigger.trim().split(' ').reduce(function (acc, eventType) {
        return acc.concat(createTrigger(eventType, reference, listeners, options));
      }, []);

      // Update tooltip content whenever the title attribute on the reference changes
      if (options.dynamicTitle) {
        _addMutationObserver.call(tippy, {
          target: reference,
          callback: function callback() {
            var _getInnerElements = getInnerElements(popper),
                content = _getInnerElements.content;

            var title = reference.getAttribute('title');
            if (title) {
              content[options.allowTitleHTML ? 'innerHTML' : 'textContent'] = tippy.title = title;
              removeTitle(reference);
            }
          },

          options: {
            attributes: true
          }
        });
      }

      // Shortcuts
      reference._tippy = tippy;
      popper._tippy = tippy;
      popper._reference = reference;

      acc.push(tippy);

      idCounter++;

      return acc;
    }, []);
  }

  /**
   * Hides all poppers
   * @param {Tippy} excludeTippy - tippy to exclude if needed
   */
  function hideAllPoppers(excludeTippy) {
    var poppers = toArray(document.querySelectorAll(selectors.POPPER));

    poppers.forEach(function (popper) {
      var tippy = popper._tippy;
      if (!tippy) return;

      var options = tippy.options;

      if ((options.hideOnClick === true || options.trigger.indexOf('focus') > -1) && (!excludeTippy || popper !== excludeTippy.popper)) {
        tippy.hide();
      }
    });
  }

  /**
   * Adds the needed event listeners
   */
  function bindEventListeners() {
    var onDocumentTouch = function onDocumentTouch() {
      if (browser.usingTouch) return;

      browser.usingTouch = true;

      if (browser.iOS) {
        document.body.classList.add('tippy-touch');
      }

      if (browser.dynamicInputDetection && window.performance) {
        document.addEventListener('mousemove', onDocumentMouseMove);
      }

      browser.onUserInputChange('touch');
    };

    var onDocumentMouseMove = function () {
      var time = void 0;

      return function () {
        var now = performance.now();

        // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
        if (now - time < 20) {
          browser.usingTouch = false;
          document.removeEventListener('mousemove', onDocumentMouseMove);
          if (!browser.iOS) {
            document.body.classList.remove('tippy-touch');
          }
          browser.onUserInputChange('mouse');
        }

        time = now;
      };
    }();

    var onDocumentClick = function onDocumentClick(event) {
      // Simulated events dispatched on the document
      if (!(event.target instanceof Element)) {
        return hideAllPoppers();
      }

      var reference = closest(event.target, selectors.REFERENCE);
      var popper = closest(event.target, selectors.POPPER);

      if (popper && popper._tippy && popper._tippy.options.interactive) {
        return;
      }

      if (reference && reference._tippy) {
        var options = reference._tippy.options;

        var isClickTrigger = options.trigger.indexOf('click') > -1;
        var isMultiple = options.multiple;

        // Hide all poppers except the one belonging to the element that was clicked
        if (!isMultiple && browser.usingTouch || !isMultiple && isClickTrigger) {
          return hideAllPoppers(reference._tippy);
        }

        if (options.hideOnClick !== true || isClickTrigger) {
          return;
        }
      }

      hideAllPoppers();
    };

    var onWindowBlur = function onWindowBlur() {
      var _document = document,
          el = _document.activeElement;

      if (el && el.blur && matches$1.call(el, selectors.REFERENCE)) {
        el.blur();
      }
    };

    var onWindowResize = function onWindowResize() {
      toArray(document.querySelectorAll(selectors.POPPER)).forEach(function (popper) {
        var tippyInstance = popper._tippy;
        if (tippyInstance && !tippyInstance.options.livePlacement) {
          tippyInstance.popperInstance.scheduleUpdate();
        }
      });
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('touchstart', onDocumentTouch);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('resize', onWindowResize);

    if (!browser.supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints)) {
      document.addEventListener('pointerdown', onDocumentTouch);
    }
  }

  var eventListenersBound = false;

  /**
   * Exported module
   * @param {String|Element|Element[]|NodeList|Object} selector
   * @param {Object} options
   * @param {Boolean} one - create one tooltip
   * @return {Object}
   */
  function tippy(selector, options, one) {
    if (browser.supported && !eventListenersBound) {
      bindEventListeners();
      eventListenersBound = true;
    }

    if (isObjectLiteral(selector)) {
      polyfillVirtualReferenceProps(selector);
    }

    options = _extends({}, defaults, options);

    var references = getArrayOfElements(selector);
    var firstReference = references[0];

    return {
      selector: selector,
      options: options,
      tooltips: browser.supported ? createTooltips(one && firstReference ? [firstReference] : references, options) : [],
      destroyAll: function destroyAll() {
        this.tooltips.forEach(function (tooltip) {
          return tooltip.destroy();
        });
        this.tooltips = [];
      }
    };
  }

  tippy.version = version;
  tippy.browser = browser;
  tippy.defaults = defaults;
  tippy.one = function (selector, options) {
    return tippy(selector, options, true).tooltips[0];
  };
  tippy.disableAnimations = function () {
    defaults.updateDuration = defaults.duration = 0;
    defaults.animateFill = false;
  };

  /**
   * Injects CSS styles to document head
   * @param {String} css
   */
  function injectCSS() {
    var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isBrowser && browser.supported) {
      var head = document.head || document.querySelector('head');
      var style = document.createElement('style');
      style.type = 'text/css';
      head.insertBefore(style, head.firstChild);

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }
  }

  injectCSS(styles);

  return tippy;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],73:[function(require,module,exports){
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

},{"../config":85,"../events":87,"../utils/behavior":90,"../utils/is-in-viewport":92,"../utils/toggle":94,"array-filter":1,"array-foreach":2,"object-assign":66}],74:[function(require,module,exports){
/**
 * Collapse/expand.
 */

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var select = require('../utils/select');
var closest = require('../utils/closest');
var forEach = require('array-foreach');

var jsCollapseTrigger = ".js-collapse";
var jsCollapseTarget = "data-js-target";

var toggleCollapse = function toggleCollapse(triggerEl, forceClose) {
    if (triggerEl !== null && triggerEl !== undefined) {
        var targetAttr = triggerEl.getAttribute(jsCollapseTarget);
        if (targetAttr !== null && targetAttr !== undefined) {
            var targetEl = select(targetAttr, 'body');
            if (targetEl !== null && targetEl !== undefined && targetEl.length > 0) {
                //target found, check state
                targetEl = targetEl[0];
                //change state
                if (triggerEl.getAttribute("aria-expanded") == "true" || triggerEl.getAttribute("aria-expanded") == undefined || forceClose) {
                    //close
                    animateCollapse(targetEl, triggerEl);
                } else {
                    //open
                    animateExpand(targetEl, triggerEl);
                }
            }
        }
    }
};

var toggle = function toggle(event) {
    //event.preventDefault();
    var triggerElm = closest(event.target, jsCollapseTrigger);
    if (triggerElm !== null && triggerElm !== undefined) {
        toggleCollapse(triggerElm);
    }
};

var animateInProgress = false;

function animateCollapse(targetEl, triggerEl) {
    if (!animateInProgress) {
        animateInProgress = true;

        targetEl.style.height = targetEl.clientHeight + "px";
        targetEl.classList.add("collapse-transition-collapse");
        setTimeout(function () {
            targetEl.removeAttribute("style");
        }, 5);
        setTimeout(function () {
            targetEl.classList.add("collapsed");
            targetEl.classList.remove("collapse-transition-collapse");

            triggerEl.setAttribute("aria-expanded", "false");
            targetEl.setAttribute("aria-hidden", "true");
            animateInProgress = false;
        }, 200);
    }
}

function animateExpand(targetEl, triggerEl) {
    if (!animateInProgress) {
        animateInProgress = true;
        targetEl.classList.remove("collapsed");
        var expandedHeight = targetEl.clientHeight;
        targetEl.style.height = "0px";
        targetEl.classList.add("collapse-transition-expand");
        setTimeout(function () {
            targetEl.style.height = expandedHeight + "px";
        }, 5);

        setTimeout(function () {
            targetEl.classList.remove("collapse-transition-expand");
            targetEl.removeAttribute("style");

            targetEl.setAttribute("aria-hidden", "false");
            triggerEl.setAttribute("aria-expanded", "true");
            animateInProgress = false;
        }, 200);
    }
}

module.exports = behavior(_defineProperty({}, 'click', _defineProperty({}, jsCollapseTrigger, toggle)));

},{"../utils/behavior":90,"../utils/closest":91,"../utils/select":93,"array-foreach":2}],75:[function(require,module,exports){
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

},{"../../vendor/pikaday.js":98,"../utils/behavior":90,"../utils/closest":91,"../utils/select":93}],76:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var behavior = require('../utils/behavior');
var select = require('../utils/select');
var closest = require('../utils/closest');
var forEach = require('array-foreach');

var dropdown = function () {
    function dropdown(el) {
        _classCallCheck(this, dropdown);

        this.jsDropdownTrigger = ".js-dropdown";
        this.jsDropdownTarget = "data-js-target";

        //option: make dropdown behave as the collapse component when on small screens (used by submenus in the header and step-dropdown). 
        this.navResponsiveBreakpoint = 992; //same as $nav-responsive-breakpoint from the scss.
        this.jsResponsiveCollapseModifier = ".js-dropdown--responsive-collapse";
        this.responsiveCollapseEnabled = false;

        this.triggerEl = null;
        this.targetEl = null;

        this.init(el);

        if (this.triggerEl !== null && this.triggerEl !== undefined && this.targetEl !== null && this.targetEl !== undefined) {
            var that = this;
            //Clicked outside dropdown -> close it
            select('body')[0].addEventListener("click", function (event) {
                that.outsideClose(event);
            });

            //Clicked on dropdown open button --> toggle it
            this.triggerEl.addEventListener("click", function (event) {
                event.preventDefault();
                that.toggleDropdown();
            });
        }
    }

    _createClass(dropdown, [{
        key: 'init',
        value: function init(el) {
            this.triggerEl = el;
            if (this.triggerEl !== null && this.triggerEl !== undefined) {
                var targetAttr = this.triggerEl.getAttribute(this.jsDropdownTarget);
                if (targetAttr !== null && targetAttr !== undefined) {
                    var targetEl = select(targetAttr, 'body');
                    if (targetEl !== null && targetEl !== undefined && targetEl.length > 0) {
                        this.targetEl = targetEl[0];
                    }
                }
            }

            if (this.triggerEl.classList.contains('js-dropdown--responsive-collapse')) {
                this.responsiveCollapseEnabled = true;
            }
        }
    }, {
        key: 'toggleDropdown',
        value: function toggleDropdown(forceClose) {
            if (this.triggerEl !== null && this.triggerEl !== undefined && this.targetEl !== null && this.targetEl !== undefined) {
                //change state
                if (this.triggerEl.getAttribute("aria-expanded") == "true" || forceClose) {
                    //close
                    this.triggerEl.setAttribute("aria-expanded", "false");
                    this.targetEl.classList.add("collapsed");
                    this.targetEl.setAttribute("aria-hidden", "true");
                } else {
                    //open
                    this.triggerEl.setAttribute("aria-expanded", "true");
                    this.targetEl.classList.remove("collapsed");
                    this.targetEl.setAttribute("aria-hidden", "false");
                }
            }
        }
    }, {
        key: 'outsideClose',
        value: function outsideClose(event) {
            if (!this.doResponsiveCollapse()) {
                //closes dropdown when clicked outside. 
                var dropdownElm = closest(event.target, this.targetEl.id);
                if ((dropdownElm === null || dropdownElm === undefined) && event.target !== this.triggerEl) {
                    //clicked outside trigger, force close
                    this.toggleDropdown(true);
                }
            }
        }
    }, {
        key: 'doResponsiveCollapse',
        value: function doResponsiveCollapse() {
            //returns true if responsive collapse is enabled and we are on a small screen. 
            if (this.responsiveCollapseEnabled && window.innerWidth <= this.navResponsiveBreakpoint) {
                return true;
            }
            return false;
        }
    }]);

    return dropdown;
}();

module.exports = dropdown;

},{"../utils/behavior":90,"../utils/closest":91,"../utils/select":93,"array-foreach":2}],77:[function(require,module,exports){
'use strict';

module.exports = {
  accordion: require('./accordion'),
  navigation: require('./navigation'),
  skipnav: require('./skipnav'),
  validator: require('./validator'),
  regexmask: require('./regex-input-mask'),
  collapse: require('./collapse')
};

},{"./accordion":73,"./collapse":74,"./navigation":79,"./regex-input-mask":80,"./skipnav":81,"./validator":84}],78:[function(require,module,exports){
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

},{"../../vendor/micromodal.js":96,"domready":62}],79:[function(require,module,exports){
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

},{"../config":85,"../events":87,"../utils/behavior":90,"../utils/select":93,"./accordion":73,"array-foreach":2,"object-assign":66}],80:[function(require,module,exports){

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

},{"../utils/behavior":90}],81:[function(require,module,exports){
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

},{"../config":85,"../events":87,"../utils/behavior":90,"receptor/once":71}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var select = require('../utils/select');
var domready = require('domready');
var forEach = require('array-foreach');

domready(function () {
    new ResponsiveTables();
});

var ResponsiveTables = function () {
    function ResponsiveTables() {
        var _this = this;

        _classCallCheck(this, ResponsiveTables);

        var allTables = select('table:not(.dataTable)');
        forEach(allTables, function (table) {
            _this.insertHeaderAsAttributes(table);
        });
    }

    // Add data attributes needed for responsive mode.


    _createClass(ResponsiveTables, [{
        key: 'insertHeaderAsAttributes',
        value: function insertHeaderAsAttributes(tableEl) {
            if (!tableEl) return;

            var headerCellEls = select('thead th, thead td', tableEl);

            //const headerCellEls = select(el.querySelectorAll('thead th, thead td');

            if (headerCellEls.length) {
                var bodyRowEls = select('tbody tr', tableEl);
                Array.from(bodyRowEls).forEach(function (rowEl) {
                    var cellEls = rowEl.children;
                    if (cellEls.length === headerCellEls.length) {
                        Array.from(headerCellEls).forEach(function (headerCellEl, i) {
                            // Grab header cell text and use it body cell data title.
                            cellEls[i].setAttribute('data-title', headerCellEl.textContent);
                        });
                    }
                });
            }
        }
    }]);

    return ResponsiveTables;
}();

exports.default = ResponsiveTables;

},{"../utils/select":93,"array-foreach":2,"domready":62}],83:[function(require,module,exports){
'use strict';

var domready = require('domready');
//Import tippy.js (https://atomiks.github.io/tippyjs/)
var tippy = require("tippy.js");

domready(function () {
    tippy('.js-tooltip'); //init tooltip on elements with the .js-tooltip class
});

},{"domready":62,"tippy.js":72}],84:[function(require,module,exports){
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

},{"../utils/behavior":90,"../utils/validate-input":95,"lodash.debounce":65}],85:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: ''
};

},{}],86:[function(require,module,exports){
'use strict';

var domready = require('domready');
var forEach = require('array-foreach');
var select = require('./utils/select');
var modernizr = require("../vendor/modernizr-custom.js");
var datepicker = require('./components/datepicker');
var modal = require('./components/modal');
var table = require('./components/table');
var tooltip = require('./components/tooltip');
var dropdown = require('./components/dropdown');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

var dkwds = require('./config');

var components = require('./components');
dkwds.components = components;

domready(function () {
  var target = document.body;
  for (var name in components) {
    var behavior = components[name];
    behavior.on(target);
  }

  //Init datepicker.  (Note: above 'behavior.on' does not work with pikaday -> seperate initialization)
  var jsSelectorDatepicker = '.js-calendar-group';
  forEach(select(jsSelectorDatepicker), function (calendarGroupElement) {
    new datepicker(calendarGroupElement);
  });

  var jsSelectorDropdown = '.js-dropdown';
  forEach(select(jsSelectorDropdown), function (dropdownElement) {
    new dropdown(dropdownElement);
  });
});

module.exports = dkwds;

},{"../vendor/modernizr-custom.js":97,"./components":77,"./components/datepicker":75,"./components/dropdown":76,"./components/modal":78,"./components/table":82,"./components/tooltip":83,"./config":85,"./polyfills":89,"./utils/select":93,"array-foreach":2,"domready":62}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

require('core-js/fn/object/assign');
require('core-js/fn/array/from');

},{"./element-hidden":88,"classlist-polyfill":4,"core-js/fn/array/from":5,"core-js/fn/object/assign":6}],90:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":66,"receptor/behavior":67}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"../config":85,"elem-dataset":63}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function (e, n, t) {
  function o(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function s() {
    var e, n, t, s, a, i, r;for (var l in c) {
      if (c.hasOwnProperty(l)) {
        if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), f.push((s ? "" : "no-") + r.join("-"));
        }
      }
    }
  }function a(e) {
    var n = u.className,
        t = Modernizr._config.classPrefix || "";if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(o, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n);
  }function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function r() {
    var e = n.body;return e || (e = i(p ? "svg" : "body"), e.fake = !0), e;
  }function l(e, t, o, s) {
    var a,
        l,
        f,
        c,
        d = "modernizr",
        p = i("div"),
        h = r();if (parseInt(o, 10)) for (; o--;) {
      f = i("div"), f.id = s ? s[o] : d + (o + 1), p.appendChild(f);
    }return a = i("style"), a.type = "text/css", a.id = "s" + d, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = d, h.fake && (h.style.background = "", h.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l;
  }var f = [],
      c = [],
      d = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      c.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      c.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = d, Modernizr = new Modernizr();var u = n.documentElement,
      p = "svg" === u.nodeName.toLowerCase(),
      h = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];d._prefixes = h;var m = d.testStyles = l;Modernizr.addTest("touchevents", function () {
    var t;if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");m(o, function (e) {
        t = 9 === e.offsetTop;
      });
    }return t;
  }), s(), a(f), delete d.addTest, delete d.addAsyncTest;for (var v = 0; v < Modernizr._q.length; v++) {
    Modernizr._q[v]();
  }e.Modernizr = Modernizr;
}(window, document);

},{}],98:[function(require,module,exports){
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

},{"moment":3}]},{},[86])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2RvbXJlYWR5L3JlYWR5LmpzIiwibm9kZV9tb2R1bGVzL2VsZW0tZGF0YXNldC9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtY2xvc2VzdC9lbGVtZW50LWNsb3Nlc3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RpcHB5LmpzL2Rpc3QvdGlwcHkuYWxsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY29sbGFwc2UuanMiLCJzcmMvanMvY29tcG9uZW50cy9kYXRlcGlja2VyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCJzcmMvanMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JlZ2V4LWlucHV0LW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy9za2lwbmF2LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdGFibGUuanMiLCJzcmMvanMvY29tcG9uZW50cy90b29sdGlwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmFsaWRhdG9yLmpzIiwic3JjL2pzL2NvbmZpZy5qcyIsInNyYy9qcy9ka3dkcy5qcyIsInNyYy9qcy9ldmVudHMuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9jbG9zZXN0LmpzIiwic3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUuanMiLCJzcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiLCJzcmMvdmVuZG9yL21pY3JvbW9kYWwuanMiLCJzcmMvdmVuZG9yL21vZGVybml6ci1jdXN0b20uanMiLCJzcmMvdmVuZG9yL3Bpa2FkYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7Ozs7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsSUFBbkIsRUFBeUI7QUFDeEMsTUFBSSxJQUFJLE1BQVIsRUFBZ0IsT0FBTyxJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsSUFBZixDQUFQO0FBQ2hCLE1BQUksS0FBSyxDQUFMLEtBQVcsR0FBWCxJQUFrQixTQUFTLEdBQS9CLEVBQW9DLE1BQU0sSUFBSSxTQUFKLEVBQU47QUFDcEMsTUFBSSxjQUFjLE9BQU8sRUFBekIsRUFBNkIsTUFBTSxJQUFJLFNBQUosRUFBTjtBQUM3QixNQUFJLE1BQU0sRUFBVjtBQUNBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxJQUFJLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ25DLFFBQUksQ0FBQyxPQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQUwsRUFBMEI7QUFDMUIs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Z0JBQUksS0FBSyxhQUFULEVBQXdCO0FBQ3BCLDRCQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsS0FBSyxZQUF0QztBQUNIO0FBQ0QsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osNEJBQVksS0FBSyxLQUFqQixFQUF3QixRQUF4QixFQUFrQyxLQUFLLGNBQXZDO0FBQ0Esb0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixPQUExQixFQUFtQyxLQUFLLGFBQXhDO0FBQ0EsZ0NBQVksS0FBSyxPQUFqQixFQUEwQixNQUExQixFQUFrQyxLQUFLLFlBQXZDO0FBQ0g7QUFDSjtBQUNELGdCQUFJLEtBQUssRUFBTCxDQUFRLFVBQVosRUFBd0I7QUFDcEIscUJBQUssRUFBTCxDQUFRLFVBQVIsQ0FBbUIsV0FBbkIsQ0FBK0IsS0FBSyxFQUFwQztBQUNIO0FBQ0o7O0FBcGpCZSxLQUFwQjs7QUF3akJBLFdBQU8sT0FBUDtBQUNILENBdHRDQSxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4vKipcbiAqIEFycmF5I2ZpbHRlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdD19IHNlbGZcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93IFR5cGVFcnJvclxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgZm4sIHNlbGYpIHtcbiAgaWYgKGFyci5maWx0ZXIpIHJldHVybiBhcnIuZmlsdGVyKGZuLCBzZWxmKTtcbiAgaWYgKHZvaWQgMCA9PT0gYXJyIHx8IG51bGwgPT09IGFycikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChhcnIsIGkpKSBjb250aW51ZTtcbiAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgIGlmIChmbi5jYWxsKHNlbGYsIHZhbCwgaSwgYXJyKSkgcmV0LnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4iLCIvKipcbiAqIGFycmF5LWZvcmVhY2hcbiAqICAgQXJyYXkjZm9yRWFjaCBwb255ZmlsbCBmb3Igb2xkZXIgYnJvd3NlcnNcbiAqICAgKFBvbnlmaWxsOiBBIHBvbHlmaWxsIHRoYXQgZG9lc24ndCBvdmVyd3JpdGUgdGhlIG5hdGl2ZSBtZXRob2QpXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LTIwMTYgVGFrdXRvIFdhZGFcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL3R3YWRhL2FycmF5LWZvcmVhY2gvYmxvYi9tYXN0ZXIvTUlULUxJQ0VOU0VcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvckVhY2ggKGFyeSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAoYXJ5LmZvckVhY2gpIHtcbiAgICAgICAgYXJ5LmZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGFyeVtpXSwgaSwgYXJ5KTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSmZaVzF3ZEhrdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTcwNDI3XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogRGVkaWNhdGVkIHRvIHRoZSBwdWJsaWMgZG9tYWluLlxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuLy8gSW5jbHVkaW5nIElFIDwgRWRnZSBtaXNzaW5nIFNWR0VsZW1lbnQuY2xhc3NMaXN0XG5pZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKSBcblx0fHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxudmFyXG5cdCAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcblx0LCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG5cdCwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cblx0LCBvYmpDdHIgPSBPYmplY3Rcblx0LCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdH1cblx0LCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIGkgPSAwXG5cdFx0XHQsIGxlbiA9IHRoaXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cdC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuXHQsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcblx0XHR0aGlzLm5hbWUgPSB0eXBlO1xuXHRcdHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9XG5cdCwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcblx0XHRpZiAodG9rZW4gPT09IFwiXCIpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIlNZTlRBWF9FUlJcIlxuXHRcdFx0XHQsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcblx0XHRcdFx0LCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuXHR9XG5cdCwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKVxuXHRcdFx0LCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cblx0XHRcdCwgaSA9IDBcblx0XHRcdCwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuXHRcdH1cblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMudG9TdHJpbmcoKSk7XG5cdFx0fTtcblx0fVxuXHQsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuXHQsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcblx0fVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuXHRyZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cdHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuXHRcdFx0dGhpcy5wdXNoKHRva2VuKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHRcdCwgaW5kZXhcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR3aGlsZSAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHR0aGlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cblx0dmFyXG5cdFx0ICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuXHRcdCwgbWV0aG9kID0gcmVzdWx0ID9cblx0XHRcdGZvcmNlICE9PSB0cnVlICYmIFwicmVtb3ZlXCJcblx0XHQ6XG5cdFx0XHRmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuXHQ7XG5cblx0aWYgKG1ldGhvZCkge1xuXHRcdHRoaXNbbWV0aG9kXSh0b2tlbik7XG5cdH1cblxuXHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGZvcmNlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAhcmVzdWx0O1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuXHR2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG5cdFx0ICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuXHRcdCwgZW51bWVyYWJsZTogdHJ1ZVxuXHRcdCwgY29uZmlndXJhYmxlOiB0cnVlXG5cdH07XG5cdHRyeSB7XG5cdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHR9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcblx0XHQvLyBhZGRpbmcgdW5kZWZpbmVkIHRvIGZpZ2h0IHRoaXMgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2lzc3Vlcy8zNlxuXHRcdC8vIG1vZGVybmllIElFOC1NU1c3IG1hY2hpbmUgaGFzIElFOCA4LjAuNjAwMS4xODcwMiBhbmQgaXMgYWZmZWN0ZWRcblx0XHRpZiAoZXgubnVtYmVyID09PSB1bmRlZmluZWQgfHwgZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuXHRcdFx0Y2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuXHRcdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHRcdH1cblx0fVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG5cdGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0od2luZG93LnNlbGYpKTtcblxufVxuXG4vLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbi8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjMVwiLCBcImMyXCIpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG5cdC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuXHRpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKSB7XG5cdFx0dmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG5cdFx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0XHR2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHR0b2tlbiA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHRvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG5cdFx0Y3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcblx0fVxuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuXHQvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuXHRcdHZhciBfdG9nZ2xlID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cblx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuXHRcdFx0aWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG5cdFx0XHRcdHJldHVybiBmb3JjZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0fVxuXG5cdHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG5cbn1cbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pO1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZiAodGFyZ2V0KSByZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZiAoZXhwb3J0c1trZXldICE9IG91dCkgaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYgKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KSBleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFNSQyA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR107XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTggRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gPDMgTW9kZXJuaXpyXG4vLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTW9kZXJuaXpyL01vZGVybml6ci9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2RvbS9kYXRhc2V0LmpzXG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSgpIHtcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYS1iJywgJ2MnKTtcblxuXHRyZXR1cm4gQm9vbGVhbihlbGVtLmRhdGFzZXQgJiYgZWxlbS5kYXRhc2V0LmFCID09PSAnYycpO1xufVxuXG5mdW5jdGlvbiBuYXRpdmVEYXRhc2V0KGVsZW1lbnQpIHtcblx0cmV0dXJuIGVsZW1lbnQuZGF0YXNldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IG5hdGl2ZURhdGFzZXQgOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHR2YXIgbWFwID0ge307XG5cdHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuXG5cdGZ1bmN0aW9uIGdldHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldHRlcihuYW1lLCB2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGZvciAodmFyIGkgPSAwLCBqID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHR2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcblxuXHRcdGlmIChhdHRyaWJ1dGUpIHtcblx0XHRcdHZhciBuYW1lID0gYXR0cmlidXRlLm5hbWU7XG5cblx0XHRcdGlmIChuYW1lLmluZGV4T2YoJ2RhdGEtJykgPT09IDApIHtcblx0XHRcdFx0dmFyIHByb3AgPSBuYW1lLnNsaWNlKDUpLnJlcGxhY2UoLy0uL2csIGZ1bmN0aW9uICh1KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHUuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBwcm9wLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGdldHRlci5iaW5kKHsgdmFsdWU6IHZhbHVlIHx8ICcnIH0pLFxuXHRcdFx0XHRcdHNldDogc2V0dGVyLmJpbmQoZWxlbWVudCwgbmFtZSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hcDtcbn07XG5cbiIsIi8vIGVsZW1lbnQtY2xvc2VzdCB8IENDMC0xLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvY2xvc2VzdFxuXG4oZnVuY3Rpb24gKEVsZW1lbnRQcm90bykge1xuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLm1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblx0XHRcdHZhciBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuXHRcdH07XG5cdH1cblxuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLmNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdH1cbn0pKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSk7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgZGVsZWdhdGVBbGwgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZUFsbCcpO1xuXG5jb25zdCBERUxFR0FURV9QQVRURVJOID0gL14oLispOmRlbGVnYXRlXFwoKC4rKVxcKSQvO1xuY29uc3QgU1BBQ0UgPSAnICc7XG5cbmNvbnN0IGdldExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgdmFyIG1hdGNoID0gdHlwZS5tYXRjaChERUxFR0FURV9QQVRURVJOKTtcbiAgdmFyIHNlbGVjdG9yO1xuICBpZiAobWF0Y2gpIHtcbiAgICB0eXBlID0gbWF0Y2hbMV07XG4gICAgc2VsZWN0b3IgPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHZhciBvcHRpb25zO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IHBvcEtleShoYW5kbGVyLCAnY2FwdHVyZScpLFxuICAgICAgcGFzc2l2ZTogcG9wS2V5KGhhbmRsZXIsICdwYXNzaXZlJylcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0ge1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBkZWxlZ2F0ZTogKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0JylcbiAgICAgID8gZGVsZWdhdGVBbGwoaGFuZGxlcilcbiAgICAgIDogc2VsZWN0b3JcbiAgICAgICAgPyBkZWxlZ2F0ZShzZWxlY3RvciwgaGFuZGxlcilcbiAgICAgICAgOiBoYW5kbGVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICBpZiAodHlwZS5pbmRleE9mKFNQQUNFKSA+IC0xKSB7XG4gICAgcmV0dXJuIHR5cGUuc3BsaXQoU1BBQ0UpLm1hcChmdW5jdGlvbihfdHlwZSkge1xuICAgICAgcmV0dXJuIGFzc2lnbih7dHlwZTogX3R5cGV9LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbnZhciBwb3BLZXkgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlaGF2aW9yKGV2ZW50cywgcHJvcHMpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24obWVtbywgdHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0eXBlLCBldmVudHNbdHlwZV0pO1xuICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KGxpc3RlbmVycyk7XG4gICAgfSwgW10pO1xuXG4gIHJldHVybiBhc3NpZ24oe1xuICAgIGFkZDogZnVuY3Rpb24gYWRkQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZUJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgcHJvcHMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZShmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnNvbWUoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpID09PSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiLyohXG4qIFRpcHB5LmpzIHYyLjUuM1xuKiAoYykgMjAxNy0yMDE4IGF0b21pa3NcbiogTUlUXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLnRpcHB5ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3R5bGVzID0gXCIudGlwcHktdG91Y2h7Y3Vyc29yOnBvaW50ZXIhaW1wb3J0YW50fS50aXBweS1ub3RyYW5zaXRpb257dHJhbnNpdGlvbjpub25lIWltcG9ydGFudH0udGlwcHktcG9wcGVye21heC13aWR0aDozNTBweDstd2Via2l0LXBlcnNwZWN0aXZlOjcwMHB4O3BlcnNwZWN0aXZlOjcwMHB4O3otaW5kZXg6OTk5OTtvdXRsaW5lOjA7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4xNjUsLjg0LC40NCwxKTtwb2ludGVyLWV2ZW50czpub25lO2xpbmUtaGVpZ2h0OjEuNH0udGlwcHktcG9wcGVyW2RhdGEtaHRtbF17bWF4LXdpZHRoOjk2JTttYXgtd2lkdGg6Y2FsYygxMDAlIC0gMjBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSAudGlwcHktYmFja2Ryb3B7Ym9yZGVyLXJhZGl1czo0MCUgNDAlIDAgMH0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIC50aXBweS1yb3VuZGFycm93e2JvdHRvbTotOHB4Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjUwJSAwfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXRvcF0gLnRpcHB5LXJvdW5kYXJyb3cgc3Zne3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSAudGlwcHktYXJyb3d7Ym9yZGVyLXRvcDo3cHggc29saWQgIzMzMztib3JkZXItcmlnaHQ6N3B4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0OjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3R0b206LTdweDttYXJnaW46MCA2cHg7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSAwO3RyYW5zZm9ybS1vcmlnaW46NTAlIDB9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSAudGlwcHktYmFja2Ryb3B7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgOTAlO3RyYW5zZm9ybS1vcmlnaW46MCA5MCV9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSAudGlwcHktYmFja2Ryb3BbZGF0YS1zdGF0ZT12aXNpYmxlXXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSg2KSB0cmFuc2xhdGUoLTUwJSwyNSUpO3RyYW5zZm9ybTpzY2FsZSg2KSB0cmFuc2xhdGUoLTUwJSwyNSUpO29wYWNpdHk6MX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIC50aXBweS1iYWNrZHJvcFtkYXRhLXN0YXRlPWhpZGRlbl17LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSkgdHJhbnNsYXRlKC01MCUsMjUlKTt0cmFuc2Zvcm06c2NhbGUoMSkgdHJhbnNsYXRlKC01MCUsMjUlKTtvcGFjaXR5OjB9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSBbZGF0YS1hbmltYXRpb249c2hpZnQtdG93YXJkXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSBbZGF0YS1hbmltYXRpb249c2hpZnQtdG93YXJkXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0yMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIFtkYXRhLWFuaW1hdGlvbj1wZXJzcGVjdGl2ZV17LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbTt0cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIFtkYXRhLWFuaW1hdGlvbj1wZXJzcGVjdGl2ZV1bZGF0YS1zdGF0ZT12aXNpYmxlXXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTBweCkgcm90YXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTBweCkgcm90YXRlWCgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIFtkYXRhLWFuaW1hdGlvbj1wZXJzcGVjdGl2ZV1bZGF0YS1zdGF0ZT1oaWRkZW5de29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHJvdGF0ZVgoOTBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHJvdGF0ZVgoOTBkZWcpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXRvcF0gW2RhdGEtYW5pbWF0aW9uPWZhZGVdW2RhdGEtc3RhdGU9dmlzaWJsZV17b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIFtkYXRhLWFuaW1hdGlvbj1mYWRlXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj10b3BdIFtkYXRhLWFuaW1hdGlvbj1zaGlmdC1hd2F5XVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSBbZGF0YS1hbmltYXRpb249c2hpZnQtYXdheV1bZGF0YS1zdGF0ZT1oaWRkZW5de29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXRvcF0gW2RhdGEtYW5pbWF0aW9uPXNjYWxlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMHB4KSBzY2FsZSgxKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTBweCkgc2NhbGUoMSl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49dG9wXSBbZGF0YS1hbmltYXRpb249c2NhbGVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgwKSBzY2FsZSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKSBzY2FsZSgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIC50aXBweS1iYWNrZHJvcHtib3JkZXItcmFkaXVzOjAgMCAzMCUgMzAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gLnRpcHB5LXJvdW5kYXJyb3d7dG9wOi04cHg7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSAxMDAlO3RyYW5zZm9ybS1vcmlnaW46NTAlIDEwMCV9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSAudGlwcHktcm91bmRhcnJvdyBzdmd7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gLnRpcHB5LWFycm93e2JvcmRlci1ib3R0b206N3B4IHNvbGlkICMzMzM7Ym9yZGVyLXJpZ2h0OjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdDo3cHggc29saWQgdHJhbnNwYXJlbnQ7dG9wOi03cHg7bWFyZ2luOjAgNnB4Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCUgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJSAxMDAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gLnRpcHB5LWJhY2tkcm9wey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIC05MCU7dHJhbnNmb3JtLW9yaWdpbjowIC05MCV9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSAudGlwcHktYmFja2Ryb3BbZGF0YS1zdGF0ZT12aXNpYmxlXXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSg2KSB0cmFuc2xhdGUoLTUwJSwtMTI1JSk7dHJhbnNmb3JtOnNjYWxlKDYpIHRyYW5zbGF0ZSgtNTAlLC0xMjUlKTtvcGFjaXR5OjF9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSAudGlwcHktYmFja2Ryb3BbZGF0YS1zdGF0ZT1oaWRkZW5dey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpIHRyYW5zbGF0ZSgtNTAlLC0xMjUlKTt0cmFuc2Zvcm06c2NhbGUoMSkgdHJhbnNsYXRlKC01MCUsLTEyNSUpO29wYWNpdHk6MH0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIFtkYXRhLWFuaW1hdGlvbj1zaGlmdC10b3dhcmRdW2RhdGEtc3RhdGU9dmlzaWJsZV17b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSBbZGF0YS1hbmltYXRpb249c2hpZnQtdG93YXJkXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMjBweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMjBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSBbZGF0YS1hbmltYXRpb249cGVyc3BlY3RpdmVdey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjp0b3A7dHJhbnNmb3JtLW9yaWdpbjp0b3B9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49Ym90dG9tXSBbZGF0YS1hbmltYXRpb249cGVyc3BlY3RpdmVdW2RhdGEtc3RhdGU9dmlzaWJsZV17b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCkgcm90YXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMHB4KSByb3RhdGVYKDApfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gW2RhdGEtYW5pbWF0aW9uPXBlcnNwZWN0aXZlXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCkgcm90YXRlWCgtOTBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHJvdGF0ZVgoLTkwZGVnKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIFtkYXRhLWFuaW1hdGlvbj1mYWRlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gW2RhdGEtYW5pbWF0aW9uPWZhZGVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIFtkYXRhLWFuaW1hdGlvbj1zaGlmdC1hd2F5XVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWJvdHRvbV0gW2RhdGEtYW5pbWF0aW9uPXNoaWZ0LWF3YXldW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIFtkYXRhLWFuaW1hdGlvbj1zY2FsZV1bZGF0YS1zdGF0ZT12aXNpYmxlXXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMHB4KSBzY2FsZSgxKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMHB4KSBzY2FsZSgxKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1ib3R0b21dIFtkYXRhLWFuaW1hdGlvbj1zY2FsZV1bZGF0YS1zdGF0ZT1oaWRkZW5de29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHNjYWxlKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHNjYWxlKDApfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIC50aXBweS1iYWNrZHJvcHtib3JkZXItcmFkaXVzOjUwJSAwIDAgNTAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIC50aXBweS1yb3VuZGFycm93e3JpZ2h0Oi0xNnB4Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjozMy4zMzMzMzMzMyUgNTAlO3RyYW5zZm9ybS1vcmlnaW46MzMuMzMzMzMzMzMlIDUwJX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSAudGlwcHktcm91bmRhcnJvdyBzdmd7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49bGVmdF0gLnRpcHB5LWFycm93e2JvcmRlci1sZWZ0OjdweCBzb2xpZCAjMzMzO2JvcmRlci10b3A6N3B4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206N3B4IHNvbGlkIHRyYW5zcGFyZW50O3JpZ2h0Oi03cHg7bWFyZ2luOjNweCAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDUwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgNTAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIC50aXBweS1iYWNrZHJvcHstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIC50aXBweS1iYWNrZHJvcFtkYXRhLXN0YXRlPXZpc2libGVdey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDYpIHRyYW5zbGF0ZSg0MCUsLTUwJSk7dHJhbnNmb3JtOnNjYWxlKDYpIHRyYW5zbGF0ZSg0MCUsLTUwJSk7b3BhY2l0eToxfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIC50aXBweS1iYWNrZHJvcFtkYXRhLXN0YXRlPWhpZGRlbl17LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS41KSB0cmFuc2xhdGUoNDAlLC01MCUpO3RyYW5zZm9ybTpzY2FsZSgxLjUpIHRyYW5zbGF0ZSg0MCUsLTUwJSk7b3BhY2l0eTowfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIFtkYXRhLWFuaW1hdGlvbj1zaGlmdC10b3dhcmRdW2RhdGEtc3RhdGU9dmlzaWJsZV17b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSBbZGF0YS1hbmltYXRpb249c2hpZnQtdG93YXJkXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0yMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSBbZGF0YS1hbmltYXRpb249cGVyc3BlY3RpdmVdey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjpyaWdodDt0cmFuc2Zvcm0tb3JpZ2luOnJpZ2h0fS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIFtkYXRhLWFuaW1hdGlvbj1wZXJzcGVjdGl2ZV1bZGF0YS1zdGF0ZT12aXNpYmxlXXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCkgcm90YXRlWSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCkgcm90YXRlWSgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSBbZGF0YS1hbmltYXRpb249cGVyc3BlY3RpdmVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKSByb3RhdGVZKC05MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMCkgcm90YXRlWSgtOTBkZWcpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIFtkYXRhLWFuaW1hdGlvbj1mYWRlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49bGVmdF0gW2RhdGEtYW5pbWF0aW9uPWZhZGVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePWxlZnRdIFtkYXRhLWFuaW1hdGlvbj1zaGlmdC1hd2F5XVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49bGVmdF0gW2RhdGEtYW5pbWF0aW9uPXNoaWZ0LWF3YXldW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSBbZGF0YS1hbmltYXRpb249c2NhbGVdW2RhdGEtc3RhdGU9dmlzaWJsZV17b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwcHgpIHNjYWxlKDEpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KSBzY2FsZSgxKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1sZWZ0XSBbZGF0YS1hbmltYXRpb249c2NhbGVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKSBzY2FsZSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgwKSBzY2FsZSgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gLnRpcHB5LWJhY2tkcm9we2JvcmRlci1yYWRpdXM6MCA1MCUgNTAlIDB9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49cmlnaHRdIC50aXBweS1yb3VuZGFycm93e2xlZnQ6LTE2cHg7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjY2LjY2NjY2NjY2JSA1MCU7dHJhbnNmb3JtLW9yaWdpbjo2Ni42NjY2NjY2NiUgNTAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSAudGlwcHktcm91bmRhcnJvdyBzdmd7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gLnRpcHB5LWFycm93e2JvcmRlci1yaWdodDo3cHggc29saWQgIzMzMztib3JkZXItdG9wOjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tOjdweCBzb2xpZCB0cmFuc3BhcmVudDtsZWZ0Oi03cHg7bWFyZ2luOjNweCAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDUwJTt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgNTAlfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSAudGlwcHktYmFja2Ryb3B7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOi0xMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjotMTAwJSAwfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSAudGlwcHktYmFja2Ryb3BbZGF0YS1zdGF0ZT12aXNpYmxlXXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSg2KSB0cmFuc2xhdGUoLTE0MCUsLTUwJSk7dHJhbnNmb3JtOnNjYWxlKDYpIHRyYW5zbGF0ZSgtMTQwJSwtNTAlKTtvcGFjaXR5OjF9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49cmlnaHRdIC50aXBweS1iYWNrZHJvcFtkYXRhLXN0YXRlPWhpZGRlbl17LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS41KSB0cmFuc2xhdGUoLTE0MCUsLTUwJSk7dHJhbnNmb3JtOnNjYWxlKDEuNSkgdHJhbnNsYXRlKC0xNDAlLC01MCUpO29wYWNpdHk6MH0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXNoaWZ0LXRvd2FyZF1bZGF0YS1zdGF0ZT12aXNpYmxlXXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXNoaWZ0LXRvd2FyZF1bZGF0YS1zdGF0ZT1oaWRkZW5de29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSBbZGF0YS1hbmltYXRpb249cGVyc3BlY3RpdmVdey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjpsZWZ0O3RyYW5zZm9ybS1vcmlnaW46bGVmdH0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXBlcnNwZWN0aXZlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpIHJvdGF0ZVkoMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMTBweCkgcm90YXRlWSgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXBlcnNwZWN0aXZlXVtkYXRhLXN0YXRlPWhpZGRlbl17b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoMCkgcm90YXRlWSg5MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMCkgcm90YXRlWSg5MGRlZyl9LnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudF49cmlnaHRdIFtkYXRhLWFuaW1hdGlvbj1mYWRlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSBbZGF0YS1hbmltYXRpb249ZmFkZV1bZGF0YS1zdGF0ZT1oaWRkZW5de29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSBbZGF0YS1hbmltYXRpb249c2hpZnQtYXdheV1bZGF0YS1zdGF0ZT12aXNpYmxlXXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXNoaWZ0LWF3YXldW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgwKX0udGlwcHktcG9wcGVyW3gtcGxhY2VtZW50Xj1yaWdodF0gW2RhdGEtYW5pbWF0aW9uPXNjYWxlXVtkYXRhLXN0YXRlPXZpc2libGVde29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpIHNjYWxlKDEpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpIHNjYWxlKDEpfS50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnRePXJpZ2h0XSBbZGF0YS1hbmltYXRpb249c2NhbGVdW2RhdGEtc3RhdGU9aGlkZGVuXXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKSBzY2FsZSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgwKSBzY2FsZSgwKX0udGlwcHktdG9vbHRpcHtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6NHB4O2ZvbnQtc2l6ZTouOXJlbTtwYWRkaW5nOi4zcmVtIC42cmVtO3RleHQtYWxpZ246Y2VudGVyO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTtiYWNrZ3JvdW5kLWNvbG9yOiMzMzN9LnRpcHB5LXRvb2x0aXBbZGF0YS1zaXplPXNtYWxsXXtwYWRkaW5nOi4ycmVtIC40cmVtO2ZvbnQtc2l6ZTouNzVyZW19LnRpcHB5LXRvb2x0aXBbZGF0YS1zaXplPWxhcmdlXXtwYWRkaW5nOi40cmVtIC44cmVtO2ZvbnQtc2l6ZToxcmVtfS50aXBweS10b29sdGlwW2RhdGEtYW5pbWF0ZWZpbGxde292ZXJmbG93OmhpZGRlbjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS50aXBweS10b29sdGlwW2RhdGEtYW5pbWF0ZWZpbGxdIC50aXBweS1jb250ZW50e3RyYW5zaXRpb246LXdlYmtpdC1jbGlwLXBhdGggY3ViaWMtYmV6aWVyKC40NiwuMSwuNTIsLjk4KTt0cmFuc2l0aW9uOmNsaXAtcGF0aCBjdWJpYy1iZXppZXIoLjQ2LC4xLC41MiwuOTgpO3RyYW5zaXRpb246Y2xpcC1wYXRoIGN1YmljLWJlemllciguNDYsLjEsLjUyLC45OCksLXdlYmtpdC1jbGlwLXBhdGggY3ViaWMtYmV6aWVyKC40NiwuMSwuNTIsLjk4KX0udGlwcHktdG9vbHRpcFtkYXRhLWludGVyYWN0aXZlXSwudGlwcHktdG9vbHRpcFtkYXRhLWludGVyYWN0aXZlXSBwYXRoe3BvaW50ZXItZXZlbnRzOmF1dG99LnRpcHB5LXRvb2x0aXBbZGF0YS1pbmVydGlhXVtkYXRhLXN0YXRlPXZpc2libGVde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNTMsMiwuMzYsLjg1KX0udGlwcHktdG9vbHRpcFtkYXRhLWluZXJ0aWFdW2RhdGEtc3RhdGU9aGlkZGVuXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlfS50aXBweS1hcnJvdywudGlwcHktcm91bmRhcnJvd3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowO2hlaWdodDowfS50aXBweS1yb3VuZGFycm93e3dpZHRoOjI0cHg7aGVpZ2h0OjhweDtmaWxsOiMzMzM7cG9pbnRlci1ldmVudHM6bm9uZX0udGlwcHktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2JhY2tncm91bmQtY29sb3I6IzMzMztib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoyNiU7bGVmdDo1MCU7dG9wOjUwJTt6LWluZGV4Oi0xO3RyYW5zaXRpb246YWxsIGN1YmljLWJlemllciguNDYsLjEsLjUyLC45OCk7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbn0udGlwcHktYmFja2Ryb3A6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcIjtmbG9hdDpsZWZ0O3BhZGRpbmctdG9wOjEwMCV9Ym9keTpub3QoLnRpcHB5LXRvdWNoKSAudGlwcHktdG9vbHRpcFtkYXRhLWFuaW1hdGVmaWxsXVtkYXRhLXN0YXRlPXZpc2libGVdIC50aXBweS1jb250ZW50ey13ZWJraXQtY2xpcC1wYXRoOmVsbGlwc2UoMTAwJSAxMDAlIGF0IDUwJSA1MCUpO2NsaXAtcGF0aDplbGxpcHNlKDEwMCUgMTAwJSBhdCA1MCUgNTAlKX1ib2R5Om5vdCgudGlwcHktdG91Y2gpIC50aXBweS10b29sdGlwW2RhdGEtYW5pbWF0ZWZpbGxdW2RhdGEtc3RhdGU9aGlkZGVuXSAudGlwcHktY29udGVudHstd2Via2l0LWNsaXAtcGF0aDplbGxpcHNlKDUlIDUwJSBhdCA1MCUgNTAlKTtjbGlwLXBhdGg6ZWxsaXBzZSg1JSA1MCUgYXQgNTAlIDUwJSl9Ym9keTpub3QoLnRpcHB5LXRvdWNoKSAudGlwcHktcG9wcGVyW3gtcGxhY2VtZW50PXJpZ2h0XSAudGlwcHktdG9vbHRpcFtkYXRhLWFuaW1hdGVmaWxsXVtkYXRhLXN0YXRlPXZpc2libGVdIC50aXBweS1jb250ZW50ey13ZWJraXQtY2xpcC1wYXRoOmVsbGlwc2UoMTM1JSAxMDAlIGF0IDAgNTAlKTtjbGlwLXBhdGg6ZWxsaXBzZSgxMzUlIDEwMCUgYXQgMCA1MCUpfWJvZHk6bm90KC50aXBweS10b3VjaCkgLnRpcHB5LXBvcHBlclt4LXBsYWNlbWVudD1yaWdodF0gLnRpcHB5LXRvb2x0aXBbZGF0YS1hbmltYXRlZmlsbF1bZGF0YS1zdGF0ZT1oaWRkZW5dIC50aXBweS1jb250ZW50ey13ZWJraXQtY2xpcC1wYXRoOmVsbGlwc2UoNDAlIDEwMCUgYXQgMCA1MCUpO2NsaXAtcGF0aDplbGxpcHNlKDQwJSAxMDAlIGF0IDAgNTAlKX1ib2R5Om5vdCgudGlwcHktdG91Y2gpIC50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnQ9bGVmdF0gLnRpcHB5LXRvb2x0aXBbZGF0YS1hbmltYXRlZmlsbF1bZGF0YS1zdGF0ZT12aXNpYmxlXSAudGlwcHktY29udGVudHstd2Via2l0LWNsaXAtcGF0aDplbGxpcHNlKDEzNSUgMTAwJSBhdCAxMDAlIDUwJSk7Y2xpcC1wYXRoOmVsbGlwc2UoMTM1JSAxMDAlIGF0IDEwMCUgNTAlKX1ib2R5Om5vdCgudGlwcHktdG91Y2gpIC50aXBweS1wb3BwZXJbeC1wbGFjZW1lbnQ9bGVmdF0gLnRpcHB5LXRvb2x0aXBbZGF0YS1hbmltYXRlZmlsbF1bZGF0YS1zdGF0ZT1oaWRkZW5dIC50aXBweS1jb250ZW50ey13ZWJraXQtY2xpcC1wYXRoOmVsbGlwc2UoNDAlIDEwMCUgYXQgMTAwJSA1MCUpO2NsaXAtcGF0aDplbGxpcHNlKDQwJSAxMDAlIGF0IDEwMCUgNTAlKX1AbWVkaWEgKG1heC13aWR0aDozNjBweCl7LnRpcHB5LXBvcHBlcnttYXgtd2lkdGg6OTYlO21heC13aWR0aDpjYWxjKDEwMCUgLSAyMHB4KX19XCI7XG5cbnZhciB2ZXJzaW9uID0gXCIyLjUuM1wiO1xuXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBpc0lFID0gaXNCcm93c2VyICYmIC9NU0lFIHxUcmlkZW50XFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgYnJvd3NlciA9IHt9O1xuXG5pZiAoaXNCcm93c2VyKSB7XG4gIGJyb3dzZXIuc3VwcG9ydGVkID0gJ3JlcXVlc3RBbmltYXRpb25GcmFtZScgaW4gd2luZG93O1xuICBicm93c2VyLnN1cHBvcnRzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG4gIGJyb3dzZXIudXNpbmdUb3VjaCA9IGZhbHNlO1xuICBicm93c2VyLmR5bmFtaWNJbnB1dERldGVjdGlvbiA9IHRydWU7XG4gIGJyb3dzZXIuaU9TID0gL2lQaG9uZXxpUGFkfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSAmJiAhd2luZG93Lk1TU3RyZWFtO1xuICBicm93c2VyLm9uVXNlcklucHV0Q2hhbmdlID0gZnVuY3Rpb24gKCkge307XG59XG5cbi8qKlxuICogU2VsZWN0b3IgY29uc3RhbnRzIHVzZWQgZm9yIGdyYWJiaW5nIGVsZW1lbnRzXG4gKi9cbnZhciBzZWxlY3RvcnMgPSB7XG4gIFBPUFBFUjogJy50aXBweS1wb3BwZXInLFxuICBUT09MVElQOiAnLnRpcHB5LXRvb2x0aXAnLFxuICBDT05URU5UOiAnLnRpcHB5LWNvbnRlbnQnLFxuICBCQUNLRFJPUDogJy50aXBweS1iYWNrZHJvcCcsXG4gIEFSUk9XOiAnLnRpcHB5LWFycm93JyxcbiAgUk9VTkRfQVJST1c6ICcudGlwcHktcm91bmRhcnJvdycsXG4gIFJFRkVSRU5DRTogJ1tkYXRhLXRpcHB5XSdcbn07XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgcGxhY2VtZW50OiAndG9wJyxcbiAgbGl2ZVBsYWNlbWVudDogdHJ1ZSxcbiAgdHJpZ2dlcjogJ21vdXNlZW50ZXIgZm9jdXMnLFxuICBhbmltYXRpb246ICdzaGlmdC1hd2F5JyxcbiAgaHRtbDogZmFsc2UsXG4gIGFuaW1hdGVGaWxsOiB0cnVlLFxuICBhcnJvdzogZmFsc2UsXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogWzM1MCwgMzAwXSxcbiAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICBpbnRlcmFjdGl2ZUJvcmRlcjogMixcbiAgdGhlbWU6ICdkYXJrJyxcbiAgc2l6ZTogJ3JlZ3VsYXInLFxuICBkaXN0YW5jZTogMTAsXG4gIG9mZnNldDogMCxcbiAgaGlkZU9uQ2xpY2s6IHRydWUsXG4gIG11bHRpcGxlOiBmYWxzZSxcbiAgZm9sbG93Q3Vyc29yOiBmYWxzZSxcbiAgaW5lcnRpYTogZmFsc2UsXG4gIHVwZGF0ZUR1cmF0aW9uOiAzNTAsXG4gIHN0aWNreTogZmFsc2UsXG4gIGFwcGVuZFRvOiBmdW5jdGlvbiBhcHBlbmRUbygpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfSxcbiAgekluZGV4OiA5OTk5LFxuICB0b3VjaEhvbGQ6IGZhbHNlLFxuICBwZXJmb3JtYW5jZTogZmFsc2UsXG4gIGR5bmFtaWNUaXRsZTogZmFsc2UsXG4gIGZsaXA6IHRydWUsXG4gIGZsaXBCZWhhdmlvcjogJ2ZsaXAnLFxuICBhcnJvd1R5cGU6ICdzaGFycCcsXG4gIGFycm93VHJhbnNmb3JtOiAnJyxcbiAgbWF4V2lkdGg6ICcnLFxuICB0YXJnZXQ6IG51bGwsXG4gIGFsbG93VGl0bGVIVE1MOiB0cnVlLFxuICBwb3BwZXJPcHRpb25zOiB7fSxcbiAgY3JlYXRlUG9wcGVySW5zdGFuY2VPbkluaXQ6IGZhbHNlLFxuICBvblNob3c6IGZ1bmN0aW9uIG9uU2hvdygpIHt9LFxuICBvblNob3duOiBmdW5jdGlvbiBvblNob3duKCkge30sXG4gIG9uSGlkZTogZnVuY3Rpb24gb25IaWRlKCkge30sXG4gIG9uSGlkZGVuOiBmdW5jdGlvbiBvbkhpZGRlbigpIHt9XG59O1xuXG4vKipcbiAqIFRoZSBrZXlzIG9mIHRoZSBkZWZhdWx0cyBvYmplY3QgZm9yIHJlZHVjaW5nIGRvd24gaW50byBhIG5ldyBvYmplY3RcbiAqIFVzZWQgaW4gYGdldEluZGl2aWR1YWxPcHRpb25zKClgXG4gKi9cbnZhciBkZWZhdWx0c0tleXMgPSBicm93c2VyLnN1cHBvcnRlZCAmJiBPYmplY3Qua2V5cyhkZWZhdWx0cyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCBsaXRlcmFsXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpdGVyYWwodmFsdWUpIHtcbiAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBQb255ZmlsbCBmb3IgQXJyYXkuZnJvbVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIFtdLnNsaWNlLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgZWxlbWVudHMgYmFzZWQgb24gdGhlIHNlbGVjdG9yIGlucHV0XG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fEVsZW1lbnRbXXxOb2RlTGlzdHxPYmplY3R9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtFbGVtZW50W119XG4gKi9cbmZ1bmN0aW9uIGdldEFycmF5T2ZFbGVtZW50cyhzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBFbGVtZW50IHx8IGlzT2JqZWN0TGl0ZXJhbChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gW3NlbGVjdG9yXTtcbiAgfVxuXG4gIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgcmV0dXJuIHRvQXJyYXkoc2VsZWN0b3IpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgbmVlZGVkIHByb3BzL21ldGhvZHMgZm9yIGEgdmlydHVhbCByZWZlcmVuY2Ugb2JqZWN0XG4gKiBOT1RFOiBpbiB2My4wIHRoaXMgd2lsbCBiZSBwdXJlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlXG4gKi9cbmZ1bmN0aW9uIHBvbHlmaWxsVmlydHVhbFJlZmVyZW5jZVByb3BzKHJlZmVyZW5jZSkge1xuICByZWZlcmVuY2UucmVmT2JqID0gdHJ1ZTtcbiAgcmVmZXJlbmNlLmF0dHJpYnV0ZXMgPSByZWZlcmVuY2UuYXR0cmlidXRlcyB8fCB7fTtcbiAgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIHJlZmVyZW5jZS5hdHRyaWJ1dGVzW2tleV0gPSB2YWw7XG4gIH07XG4gIHJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHJlZmVyZW5jZS5hdHRyaWJ1dGVzW2tleV07XG4gIH07XG4gIHJlZmVyZW5jZS5yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgZGVsZXRlIHJlZmVyZW5jZS5hdHRyaWJ1dGVzW2tleV07XG4gIH07XG4gIHJlZmVyZW5jZS5oYXNBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleSBpbiByZWZlcmVuY2UuYXR0cmlidXRlcztcbiAgfTtcbiAgcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgcmVmZXJlbmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgcmVmZXJlbmNlLmNsYXNzTGlzdCA9IHtcbiAgICBjbGFzc05hbWVzOiB7fSxcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZChrZXkpIHtcbiAgICAgIHJldHVybiByZWZlcmVuY2UuY2xhc3NMaXN0LmNsYXNzTmFtZXNba2V5XSA9IHRydWU7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICAgIGRlbGV0ZSByZWZlcmVuY2UuY2xhc3NMaXN0LmNsYXNzTmFtZXNba2V5XTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uIGNvbnRhaW5zKGtleSkge1xuICAgICAgcmV0dXJuIGtleSBpbiByZWZlcmVuY2UuY2xhc3NMaXN0LmNsYXNzTmFtZXM7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN1cHBvcnRlZCBwcmVmaXhlZCBwcm9wZXJ0eSAtIG9ubHkgYHdlYmtpdGAgaXMgbmVlZGVkLCBgbW96YCwgYG1zYCBhbmQgYG9gIGFyZSBvYnNvbGV0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJuIHtTdHJpbmd9IC0gYnJvd3NlciBzdXBwb3J0ZWQgcHJlZml4ZWQgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gcHJlZml4KHByb3BlcnR5KSB7XG4gIHZhciBwcmVmaXhlcyA9IFsnJywgJ3dlYmtpdCddO1xuICB2YXIgdXBwZXJQcm9wID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9wcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICB2YXIgcHJlZml4ZWRQcm9wID0gX3ByZWZpeCA/IF9wcmVmaXggKyB1cHBlclByb3AgOiBwcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuc3R5bGVbcHJlZml4ZWRQcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBwcmVmaXhlZFByb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRpdiBlbGVtZW50XG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBkaXYoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcG9wcGVyIGVsZW1lbnQgdGhlbiByZXR1cm5zIGl0XG4gKiBAcGFyYW0ge051bWJlcn0gaWQgLSB0aGUgcG9wcGVyIGlkXG4gKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgLSB0aGUgdG9vbHRpcCdzIGB0aXRsZWAgYXR0cmlidXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGluZGl2aWR1YWwgb3B0aW9uc1xuICogQHJldHVybiB7RWxlbWVudH0gLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9wcGVyRWxlbWVudChpZCwgdGl0bGUsIG9wdGlvbnMpIHtcbiAgdmFyIHBvcHBlciA9IGRpdigpO1xuICBwb3BwZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aXBweS1wb3BwZXInKTtcbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgncm9sZScsICd0b29sdGlwJyk7XG4gIHBvcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RpcHB5LScgKyBpZCk7XG4gIHBvcHBlci5zdHlsZS56SW5kZXggPSBvcHRpb25zLnpJbmRleDtcbiAgcG9wcGVyLnN0eWxlLm1heFdpZHRoID0gb3B0aW9ucy5tYXhXaWR0aDtcblxuICB2YXIgdG9vbHRpcCA9IGRpdigpO1xuICB0b29sdGlwLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGlwcHktdG9vbHRpcCcpO1xuICB0b29sdGlwLnNldEF0dHJpYnV0ZSgnZGF0YS1zaXplJywgb3B0aW9ucy5zaXplKTtcbiAgdG9vbHRpcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgb3B0aW9ucy5hbmltYXRpb24pO1xuICB0b29sdGlwLnNldEF0dHJpYnV0ZSgnZGF0YS1zdGF0ZScsICdoaWRkZW4nKTtcbiAgb3B0aW9ucy50aGVtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICB0b29sdGlwLmNsYXNzTGlzdC5hZGQodCArICctdGhlbWUnKTtcbiAgfSk7XG5cbiAgdmFyIGNvbnRlbnQgPSBkaXYoKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RpcHB5LWNvbnRlbnQnKTtcblxuICBpZiAob3B0aW9ucy5hcnJvdykge1xuICAgIHZhciBhcnJvdyA9IGRpdigpO1xuICAgIGFycm93LnN0eWxlW3ByZWZpeCgndHJhbnNmb3JtJyldID0gb3B0aW9ucy5hcnJvd1RyYW5zZm9ybTtcblxuICAgIGlmIChvcHRpb25zLmFycm93VHlwZSA9PT0gJ3JvdW5kJykge1xuICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZCgndGlwcHktcm91bmRhcnJvdycpO1xuICAgICAgYXJyb3cuaW5uZXJIVE1MID0gJzxzdmcgdmlld0JveD1cIjAgMCAyNCA4XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMyA4czIuMDIxLS4wMTUgNS4yNTMtNC4yMThDOS41ODQgMi4wNTEgMTAuNzk3IDEuMDA3IDEyIDFjMS4yMDMtLjAwNyAyLjQxNiAxLjAzNSAzLjc2MSAyLjc4MkMxOS4wMTIgOC4wMDUgMjEgOCAyMSA4SDN6XCIvPjwvc3ZnPic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycm93LmNsYXNzTGlzdC5hZGQoJ3RpcHB5LWFycm93Jyk7XG4gICAgfVxuXG4gICAgdG9vbHRpcC5hcHBlbmRDaGlsZChhcnJvdyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5hbmltYXRlRmlsbCkge1xuICAgIC8vIENyZWF0ZSBhbmltYXRlRmlsbCBjaXJjbGUgZWxlbWVudCBmb3IgYW5pbWF0aW9uXG4gICAgdG9vbHRpcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0ZWZpbGwnLCAnJyk7XG4gICAgdmFyIGJhY2tkcm9wID0gZGl2KCk7XG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgndGlwcHktYmFja2Ryb3AnKTtcbiAgICBiYWNrZHJvcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAnaGlkZGVuJyk7XG4gICAgdG9vbHRpcC5hcHBlbmRDaGlsZChiYWNrZHJvcCk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5pbmVydGlhKSB7XG4gICAgLy8gQ2hhbmdlIHRyYW5zaXRpb24gdGltaW5nIGZ1bmN0aW9uIGN1YmljIGJlemllclxuICAgIHRvb2x0aXAuc2V0QXR0cmlidXRlKCdkYXRhLWluZXJ0aWEnLCAnJyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xuICAgIHRvb2x0aXAuc2V0QXR0cmlidXRlKCdkYXRhLWludGVyYWN0aXZlJywgJycpO1xuICB9XG5cbiAgdmFyIGh0bWwgPSBvcHRpb25zLmh0bWw7XG4gIGlmIChodG1sKSB7XG4gICAgdmFyIHRlbXBsYXRlSWQgPSB2b2lkIDA7XG5cbiAgICBpZiAoaHRtbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XG4gICAgICB0ZW1wbGF0ZUlkID0gJyMnICsgKGh0bWwuaWQgfHwgJ3RpcHB5LWh0bWwtdGVtcGxhdGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHJpY2sgbGludGVyczogaHR0cHM6Ly9naXRodWIuY29tL2F0b21pa3MvdGlwcHlqcy9pc3N1ZXMvMTk3XG4gICAgICBjb250ZW50W3RydWUgJiYgJ2lubmVySFRNTCddID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihodG1sKVt0cnVlICYmICdpbm5lckhUTUwnXTtcbiAgICAgIHRlbXBsYXRlSWQgPSBodG1sO1xuICAgIH1cblxuICAgIHBvcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHRtbCcsICcnKTtcbiAgICB0b29sdGlwLnNldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcsIHRlbXBsYXRlSWQpO1xuXG4gICAgaWYgKG9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHBvcHBlci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnRlbnRbb3B0aW9ucy5hbGxvd1RpdGxlSFRNTCA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50J10gPSB0aXRsZTtcbiAgfVxuXG4gIHRvb2x0aXAuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIHBvcHBlci5hcHBlbmRDaGlsZCh0b29sdGlwKTtcblxuICByZXR1cm4gcG9wcGVyO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB0cmlnZ2VyIGJ5IGFkZGluZyB0aGUgbmVjZXNzYXJ5IGV2ZW50IGxpc3RlbmVycyB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSB0aGUgY3VzdG9tIGV2ZW50IHNwZWNpZmllZCBpbiB0aGUgYHRyaWdnZXJgIHNldHRpbmdcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlcnMgLSB0aGUgaGFuZGxlcnMgZm9yIGVhY2ggZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtBcnJheX0gLSBhcnJheSBvZiBsaXN0ZW5lciBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVRyaWdnZXIoZXZlbnRUeXBlLCByZWZlcmVuY2UsIGhhbmRsZXJzLCBvcHRpb25zKSB7XG4gIHZhciBvblRyaWdnZXIgPSBoYW5kbGVycy5vblRyaWdnZXIsXG4gICAgICBvbk1vdXNlTGVhdmUgPSBoYW5kbGVycy5vbk1vdXNlTGVhdmUsXG4gICAgICBvbkJsdXIgPSBoYW5kbGVycy5vbkJsdXIsXG4gICAgICBvbkRlbGVnYXRlU2hvdyA9IGhhbmRsZXJzLm9uRGVsZWdhdGVTaG93LFxuICAgICAgb25EZWxlZ2F0ZUhpZGUgPSBoYW5kbGVycy5vbkRlbGVnYXRlSGlkZTtcblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgaWYgKGV2ZW50VHlwZSA9PT0gJ21hbnVhbCcpIHJldHVybiBsaXN0ZW5lcnM7XG5cbiAgdmFyIG9uID0gZnVuY3Rpb24gb24oZXZlbnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgICBsaXN0ZW5lcnMucHVzaCh7IGV2ZW50OiBldmVudFR5cGUsIGhhbmRsZXI6IGhhbmRsZXIgfSk7XG4gIH07XG5cbiAgaWYgKCFvcHRpb25zLnRhcmdldCkge1xuICAgIG9uKGV2ZW50VHlwZSwgb25UcmlnZ2VyKTtcblxuICAgIGlmIChicm93c2VyLnN1cHBvcnRzVG91Y2ggJiYgb3B0aW9ucy50b3VjaEhvbGQpIHtcbiAgICAgIG9uKCd0b3VjaHN0YXJ0Jywgb25UcmlnZ2VyKTtcbiAgICAgIG9uKCd0b3VjaGVuZCcsIG9uTW91c2VMZWF2ZSk7XG4gICAgfVxuICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgb24oJ21vdXNlbGVhdmUnLCBvbk1vdXNlTGVhdmUpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnZm9jdXMnKSB7XG4gICAgICBvbihpc0lFID8gJ2ZvY3Vzb3V0JyA6ICdibHVyJywgb25CbHVyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJyb3dzZXIuc3VwcG9ydHNUb3VjaCAmJiBvcHRpb25zLnRvdWNoSG9sZCkge1xuICAgICAgb24oJ3RvdWNoc3RhcnQnLCBvbkRlbGVnYXRlU2hvdyk7XG4gICAgICBvbigndG91Y2hlbmQnLCBvbkRlbGVnYXRlSGlkZSk7XG4gICAgfVxuICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgb24oJ21vdXNlb3ZlcicsIG9uRGVsZWdhdGVTaG93KTtcbiAgICAgIG9uKCdtb3VzZW91dCcsIG9uRGVsZWdhdGVIaWRlKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgb24oJ2ZvY3VzaW4nLCBvbkRlbGVnYXRlU2hvdyk7XG4gICAgICBvbignZm9jdXNvdXQnLCBvbkRlbGVnYXRlSGlkZSk7XG4gICAgfVxuICAgIGlmIChldmVudFR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKCdjbGljaycsIG9uRGVsZWdhdGVTaG93KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGlzdGVuZXJzO1xufVxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiBzZXR0aW5ncyB0byBvdmVycmlkZSBnbG9iYWwgc2V0dGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VPcHRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gaW5kaXZpZHVhbCBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGdldEluZGl2aWR1YWxPcHRpb25zKHJlZmVyZW5jZSwgaW5zdGFuY2VPcHRpb25zKSB7XG4gIHZhciBvcHRpb25zID0gZGVmYXVsdHNLZXlzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICB2YXIgdmFsID0gcmVmZXJlbmNlLmdldEF0dHJpYnV0ZSgnZGF0YS10aXBweS0nICsga2V5LnRvTG93ZXJDYXNlKCkpIHx8IGluc3RhbmNlT3B0aW9uc1trZXldO1xuXG4gICAgLy8gQ29udmVydCBzdHJpbmdzIHRvIGJvb2xlYW5zXG4gICAgaWYgKHZhbCA9PT0gJ2ZhbHNlJykgdmFsID0gZmFsc2U7XG4gICAgaWYgKHZhbCA9PT0gJ3RydWUnKSB2YWwgPSB0cnVlO1xuXG4gICAgLy8gQ29udmVydCBudW1iZXIgc3RyaW5ncyB0byB0cnVlIG51bWJlcnNcbiAgICBpZiAoaXNGaW5pdGUodmFsKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgdmFsID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgYXJyYXkgc3RyaW5ncyB0byBhY3R1YWwgYXJyYXlzXG4gICAgaWYgKGtleSAhPT0gJ3RhcmdldCcgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLnRyaW0oKS5jaGFyQXQoMCkgPT09ICdbJykge1xuICAgICAgdmFsID0gSlNPTi5wYXJzZSh2YWwpO1xuICAgIH1cblxuICAgIGFjY1trZXldID0gdmFsO1xuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaW5zdGFuY2VPcHRpb25zLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMvbW9kaWZpZXMgdGhlIG9wdGlvbnMgb2JqZWN0IGZvciBhcHByb3ByaWF0ZSBiZWhhdmlvclxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSBtb2RpZmllZC9ldmFsdWF0ZWQgb3B0aW9uc1xuICovXG5mdW5jdGlvbiBldmFsdWF0ZU9wdGlvbnMocmVmZXJlbmNlLCBvcHRpb25zKSB7XG4gIC8vIGFuaW1hdGVGaWxsIGlzIGRpc2FibGVkIGlmIGFuIGFycm93IGlzIHRydWVcbiAgaWYgKG9wdGlvbnMuYXJyb3cpIHtcbiAgICBvcHRpb25zLmFuaW1hdGVGaWxsID0gZmFsc2U7XG4gIH1cblxuICBpZiAob3B0aW9ucy5hcHBlbmRUbyAmJiB0eXBlb2Ygb3B0aW9ucy5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuYXBwZW5kVG8gPSBvcHRpb25zLmFwcGVuZFRvKCk7XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaHRtbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaHRtbCA9IG9wdGlvbnMuaHRtbChyZWZlcmVuY2UpO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogUmV0dXJucyBpbm5lciBlbGVtZW50cyBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGdldElubmVyRWxlbWVudHMocG9wcGVyKSB7XG4gIHZhciBzZWxlY3QgPSBmdW5jdGlvbiBzZWxlY3Qocykge1xuICAgIHJldHVybiBwb3BwZXIucXVlcnlTZWxlY3RvcihzKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICB0b29sdGlwOiBzZWxlY3Qoc2VsZWN0b3JzLlRPT0xUSVApLFxuICAgIGJhY2tkcm9wOiBzZWxlY3Qoc2VsZWN0b3JzLkJBQ0tEUk9QKSxcbiAgICBjb250ZW50OiBzZWxlY3Qoc2VsZWN0b3JzLkNPTlRFTlQpLFxuICAgIGFycm93OiBzZWxlY3Qoc2VsZWN0b3JzLkFSUk9XKSB8fCBzZWxlY3Qoc2VsZWN0b3JzLlJPVU5EX0FSUk9XKVxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHRpdGxlIGZyb20gYW4gZWxlbWVudCwgc2V0dGluZyBgZGF0YS1vcmlnaW5hbC10aXRsZWBcbiAqIGFwcHJvcHJpYXRlbHlcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlVGl0bGUoZWwpIHtcbiAgdmFyIHRpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAvLyBPbmx5IHNldCBgZGF0YS1vcmlnaW5hbC10aXRsZWAgYXR0ciBpZiB0aGVyZSBpcyBhIHRpdGxlXG4gIGlmICh0aXRsZSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScsIHRpdGxlKTtcbiAgfVxuICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3RpdGxlJyk7XG59XG5cbi8qKiFcbiAqIEBmaWxlT3ZlcnZpZXcgS2lja2FzcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhbmQgcGxhY2UgcG9wcGVycyBuZWFyIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50cy5cbiAqIEB2ZXJzaW9uIDEuMTQuM1xuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBGZWRlcmljbyBaaXZvbG8gYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cbnZhciBpc0Jyb3dzZXIkMSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBsb25nZXJUaW1lb3V0QnJvd3NlcnMgPSBbJ0VkZ2UnLCAnVHJpZGVudCcsICdGaXJlZm94J107XG52YXIgdGltZW91dER1cmF0aW9uID0gMDtcbmZvciAodmFyIGkgPSAwOyBpIDwgbG9uZ2VyVGltZW91dEJyb3dzZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gIGlmIChpc0Jyb3dzZXIkMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YobG9uZ2VyVGltZW91dEJyb3dzZXJzW2ldKSA+PSAwKSB7XG4gICAgdGltZW91dER1cmF0aW9uID0gMTtcbiAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtaWNyb3Rhc2tEZWJvdW5jZShmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5Qcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxlZCA9IGZhbHNlO1xuICAgICAgZm4oKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGFza0RlYm91bmNlKGZuKSB7XG4gIHZhciBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuICB9O1xufVxuXG52YXIgc3VwcG9ydHNNaWNyb1Rhc2tzID0gaXNCcm93c2VyJDEgJiYgd2luZG93LlByb21pc2U7XG5cbi8qKlxuKiBDcmVhdGUgYSBkZWJvdW5jZWQgdmVyc2lvbiBvZiBhIG1ldGhvZCwgdGhhdCdzIGFzeW5jaHJvbm91c2x5IGRlZmVycmVkXG4qIGJ1dCBjYWxsZWQgaW4gdGhlIG1pbmltdW0gdGltZSBwb3NzaWJsZS5cbipcbiogQG1ldGhvZFxuKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4qIEBhcmd1bWVudCB7RnVuY3Rpb259IGZuXG4qIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG52YXIgZGVib3VuY2UgPSBzdXBwb3J0c01pY3JvVGFza3MgPyBtaWNyb3Rhc2tEZWJvdW5jZSA6IHRhc2tEZWJvdW5jZTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFyaWFibGUgaXMgYSBmdW5jdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBbnl9IGZ1bmN0aW9uVG9DaGVjayAtIHZhcmlhYmxlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvOiBpcyBhIGZ1bmN0aW9uP1xuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xuICB2YXIgZ2V0VHlwZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIEdldCBDU1MgY29tcHV0ZWQgcHJvcGVydHkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciBjc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpO1xuICByZXR1cm4gcHJvcGVydHkgPyBjc3NbcHJvcGVydHldIDogY3NzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBhcmVudE5vZGUgb3IgdGhlIGhvc3Qgb2YgdGhlIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnR9IHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXRQYXJlbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG4gIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgfHwgZWxlbWVudC5ob3N0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNjcm9sbGluZyBwYXJlbnQgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnR9IHNjcm9sbCBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KGVsZW1lbnQpIHtcbiAgLy8gUmV0dXJuIGJvZHksIGBnZXRTY3JvbGxgIHdpbGwgdGFrZSBjYXJlIHRvIGdldCB0aGUgY29ycmVjdCBgc2Nyb2xsVG9wYCBmcm9tIGl0XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgc3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XG4gICAgY2FzZSAnSFRNTCc6XG4gICAgY2FzZSAnQk9EWSc6XG4gICAgICByZXR1cm4gZWxlbWVudC5vd25lckRvY3VtZW50LmJvZHk7XG4gICAgY2FzZSAnI2RvY3VtZW50JzpcbiAgICAgIHJldHVybiBlbGVtZW50LmJvZHk7XG4gIH1cblxuICAvLyBGaXJlZm94IHdhbnQgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcblxuICB2YXIgX2dldFN0eWxlQ29tcHV0ZWRQcm9wID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpLFxuICAgICAgb3ZlcmZsb3cgPSBfZ2V0U3R5bGVDb21wdXRlZFByb3Aub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0U3R5bGVDb21wdXRlZFByb3Aub3ZlcmZsb3dYLFxuICAgICAgb3ZlcmZsb3dZID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93WTtcblxuICBpZiAoLyhhdXRvfHNjcm9sbHxvdmVybGF5KS8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCkpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG59XG5cbnZhciBpc0lFMTEgPSBpc0Jyb3dzZXIkMSAmJiAhISh3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlKTtcbnZhciBpc0lFMTAgPSBpc0Jyb3dzZXIkMSAmJiAvTVNJRSAxMC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBicm93c2VyIGlzIEludGVybmV0IEV4cGxvcmVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge051bWJlcn0gdmVyc2lvbiB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzSUVcbiAqL1xuZnVuY3Rpb24gaXNJRSQxKHZlcnNpb24pIHtcbiAgaWYgKHZlcnNpb24gPT09IDExKSB7XG4gICAgcmV0dXJuIGlzSUUxMTtcbiAgfVxuICBpZiAodmVyc2lvbiA9PT0gMTApIHtcbiAgICByZXR1cm4gaXNJRTEwO1xuICB9XG4gIHJldHVybiBpc0lFMTEgfHwgaXNJRTEwO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG9mZnNldCBwYXJlbnQgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnR9IG9mZnNldCBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIHZhciBub09mZnNldFBhcmVudCA9IGlzSUUkMSgxMCkgPyBkb2N1bWVudC5ib2R5IDogbnVsbDtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIC8vIFNraXAgaGlkZGVuIGVsZW1lbnRzIHdoaWNoIGRvbid0IGhhdmUgYW4gb2Zmc2V0UGFyZW50XG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgPT09IG5vT2Zmc2V0UGFyZW50ICYmIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gKGVsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykub2Zmc2V0UGFyZW50O1xuICB9XG5cbiAgdmFyIG5vZGVOYW1lID0gb2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudC5ub2RlTmFtZTtcblxuICBpZiAoIW5vZGVOYW1lIHx8IG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBlbGVtZW50ID8gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIC8vIC5vZmZzZXRQYXJlbnQgd2lsbCByZXR1cm4gdGhlIGNsb3Nlc3QgVEQgb3IgVEFCTEUgaW4gY2FzZVxuICAvLyBubyBvZmZzZXRQYXJlbnQgaXMgcHJlc2VudCwgSSBoYXRlIHRoaXMgam9iLi4uXG4gIGlmIChbJ1REJywgJ1RBQkxFJ10uaW5kZXhPZihvZmZzZXRQYXJlbnQubm9kZU5hbWUpICE9PSAtMSAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50O1xufVxuXG5mdW5jdGlvbiBpc09mZnNldENvbnRhaW5lcihlbGVtZW50KSB7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG5vZGVOYW1lID09PSAnSFRNTCcgfHwgZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBlbGVtZW50O1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSByb290IG5vZGUgKGRvY3VtZW50LCBzaGFkb3dET00gcm9vdCkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybnMge0VsZW1lbnR9IHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBnZXRSb290KG5vZGUpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXRSb290KG5vZGUucGFyZW50Tm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgb2Zmc2V0IHBhcmVudCBjb21tb24gdG8gdGhlIHR3byBwcm92aWRlZCBub2Rlc1xuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MVxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MlxuICogQHJldHVybnMge0VsZW1lbnR9IGNvbW1vbiBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGVsZW1lbnQyKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIHRvIGF2b2lkIGVycm9ycyBpbiBjYXNlIG9uZSBvZiB0aGUgZWxlbWVudHMgaXNuJ3QgZGVmaW5lZCBmb3IgYW55IHJlYXNvblxuICBpZiAoIWVsZW1lbnQxIHx8ICFlbGVtZW50MS5ub2RlVHlwZSB8fCAhZWxlbWVudDIgfHwgIWVsZW1lbnQyLm5vZGVUeXBlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIC8vIEhlcmUgd2UgbWFrZSBzdXJlIHRvIGdpdmUgYXMgXCJzdGFydFwiIHRoZSBlbGVtZW50IHRoYXQgY29tZXMgZmlyc3QgaW4gdGhlIERPTVxuICB2YXIgb3JkZXIgPSBlbGVtZW50MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlbGVtZW50MikgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORztcbiAgdmFyIHN0YXJ0ID0gb3JkZXIgPyBlbGVtZW50MSA6IGVsZW1lbnQyO1xuICB2YXIgZW5kID0gb3JkZXIgPyBlbGVtZW50MiA6IGVsZW1lbnQxO1xuXG4gIC8vIEdldCBjb21tb24gYW5jZXN0b3IgY29udGFpbmVyXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0KHN0YXJ0LCAwKTtcbiAgcmFuZ2Uuc2V0RW5kKGVuZCwgMCk7XG4gIHZhciBjb21tb25BbmNlc3RvckNvbnRhaW5lciA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXG4gIC8vIEJvdGggbm9kZXMgYXJlIGluc2lkZSAjZG9jdW1lbnRcblxuICBpZiAoZWxlbWVudDEgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICYmIGVsZW1lbnQyICE9PSBjb21tb25BbmNlc3RvckNvbnRhaW5lciB8fCBzdGFydC5jb250YWlucyhlbmQpKSB7XG4gICAgaWYgKGlzT2Zmc2V0Q29udGFpbmVyKGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSkge1xuICAgICAgcmV0dXJuIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQoY29tbW9uQW5jZXN0b3JDb250YWluZXIpO1xuICB9XG5cbiAgLy8gb25lIG9mIHRoZSBub2RlcyBpcyBpbnNpZGUgc2hhZG93RE9NLCBmaW5kIHdoaWNoIG9uZVxuICB2YXIgZWxlbWVudDFyb290ID0gZ2V0Um9vdChlbGVtZW50MSk7XG4gIGlmIChlbGVtZW50MXJvb3QuaG9zdCkge1xuICAgIHJldHVybiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQxcm9vdC5ob3N0LCBlbGVtZW50Mik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGdldFJvb3QoZWxlbWVudDIpLmhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2Nyb2xsIHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50IGluIHRoZSBnaXZlbiBzaWRlICh0b3AgYW5kIGxlZnQpXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzaWRlIGB0b3BgIG9yIGBsZWZ0YFxuICogQHJldHVybnMge251bWJlcn0gYW1vdW50IG9mIHNjcm9sbGVkIHBpeGVsc1xuICovXG5mdW5jdGlvbiBnZXRTY3JvbGwoZWxlbWVudCkge1xuICB2YXIgc2lkZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ3RvcCc7XG5cbiAgdmFyIHVwcGVyU2lkZSA9IHNpZGUgPT09ICd0b3AnID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCc7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHZhciBodG1sID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgc2Nyb2xsaW5nRWxlbWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGh0bWw7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnRbdXBwZXJTaWRlXTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50W3VwcGVyU2lkZV07XG59XG5cbi8qXG4gKiBTdW0gb3Igc3VidHJhY3QgdGhlIGVsZW1lbnQgc2Nyb2xsIHZhbHVlcyAobGVmdCBhbmQgdG9wKSBmcm9tIGEgZ2l2ZW4gcmVjdCBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0IC0gUmVjdCBvYmplY3QgeW91IHdhbnQgdG8gY2hhbmdlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgZnJvbSB0aGUgZnVuY3Rpb24gcmVhZHMgdGhlIHNjcm9sbCB2YWx1ZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VidHJhY3QgLSBzZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzdWJ0cmFjdCB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHJldHVybiB7T2JqZWN0fSByZWN0IC0gVGhlIG1vZGlmaWVyIHJlY3Qgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluY2x1ZGVTY3JvbGwocmVjdCwgZWxlbWVudCkge1xuICB2YXIgc3VidHJhY3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gIHZhciBzY3JvbGxUb3AgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ3RvcCcpO1xuICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICB2YXIgbW9kaWZpZXIgPSBzdWJ0cmFjdCA/IC0xIDogMTtcbiAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcCAqIG1vZGlmaWVyO1xuICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQgKiBtb2RpZmllcjtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbi8qXG4gKiBIZWxwZXIgdG8gZGV0ZWN0IGJvcmRlcnMgb2YgYSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xuICogUmVzdWx0IG9mIGBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHlgIG9uIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gYXhpcyAtIGB4YCBvciBgeWBcbiAqIEByZXR1cm4ge251bWJlcn0gYm9yZGVycyAtIFRoZSBib3JkZXJzIHNpemUgb2YgdGhlIGdpdmVuIGF4aXNcbiAqL1xuXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsIGF4aXMpIHtcbiAgdmFyIHNpZGVBID0gYXhpcyA9PT0gJ3gnID8gJ0xlZnQnIDogJ1RvcCc7XG4gIHZhciBzaWRlQiA9IHNpZGVBID09PSAnTGVmdCcgPyAnUmlnaHQnIDogJ0JvdHRvbSc7XG5cbiAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzWydib3JkZXInICsgc2lkZUEgKyAnV2lkdGgnXSwgMTApICsgcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQiArICdXaWR0aCddLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldFNpemUoYXhpcywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSkge1xuICByZXR1cm4gTWF0aC5tYXgoYm9keVsnb2Zmc2V0JyArIGF4aXNdLCBib2R5WydzY3JvbGwnICsgYXhpc10sIGh0bWxbJ2NsaWVudCcgKyBheGlzXSwgaHRtbFsnb2Zmc2V0JyArIGF4aXNdLCBodG1sWydzY3JvbGwnICsgYXhpc10sIGlzSUUkMSgxMCkgPyBodG1sWydvZmZzZXQnICsgYXhpc10gKyBjb21wdXRlZFN0eWxlWydtYXJnaW4nICsgKGF4aXMgPT09ICdIZWlnaHQnID8gJ1RvcCcgOiAnTGVmdCcpXSArIGNvbXB1dGVkU3R5bGVbJ21hcmdpbicgKyAoYXhpcyA9PT0gJ0hlaWdodCcgPyAnQm90dG9tJyA6ICdSaWdodCcpXSA6IDApO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dTaXplcygpIHtcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICB2YXIgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBpc0lFJDEoMTApICYmIGdldENvbXB1dGVkU3R5bGUoaHRtbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGdldFNpemUoJ0hlaWdodCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpLFxuICAgIHdpZHRoOiBnZXRTaXplKCdXaWR0aCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpXG4gIH07XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayQxID0gZnVuY3Rpb24gY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzJDEgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSQxID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBfZXh0ZW5kcyQxID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogR2l2ZW4gZWxlbWVudCBvZmZzZXRzLCBnZW5lcmF0ZSBhbiBvdXRwdXQgc2ltaWxhciB0byBnZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvZmZzZXRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDbGllbnRSZWN0IGxpa2Ugb3V0cHV0XG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudFJlY3Qob2Zmc2V0cykge1xuICByZXR1cm4gX2V4dGVuZHMkMSh7fSwgb2Zmc2V0cywge1xuICAgIHJpZ2h0OiBvZmZzZXRzLmxlZnQgKyBvZmZzZXRzLndpZHRoLFxuICAgIGJvdHRvbTogb2Zmc2V0cy50b3AgKyBvZmZzZXRzLmhlaWdodFxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7T2JqZWN0fSBjbGllbnQgcmVjdFxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IHt9O1xuXG4gIC8vIElFMTAgMTAgRklYOiBQbGVhc2UsIGRvbid0IGFzaywgdGhlIGVsZW1lbnQgaXNuJ3RcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcbiAgdHJ5IHtcbiAgICBpZiAoaXNJRSQxKDEwKSkge1xuICAgICAgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICd0b3AnKTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gICAgICByZWN0LnRvcCArPSBzY3JvbGxUb3A7XG4gICAgICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdDtcbiAgICAgIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcDtcbiAgICAgIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSB7XG4gICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgIHRvcDogcmVjdC50b3AsXG4gICAgd2lkdGg6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsXG4gICAgaGVpZ2h0OiByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG4gIH07XG5cbiAgLy8gc3VidHJhY3Qgc2Nyb2xsYmFyIHNpemUgZnJvbSBzaXplc1xuICB2YXIgc2l6ZXMgPSBlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcgPyBnZXRXaW5kb3dTaXplcygpIDoge307XG4gIHZhciB3aWR0aCA9IHNpemVzLndpZHRoIHx8IGVsZW1lbnQuY2xpZW50V2lkdGggfHwgcmVzdWx0LnJpZ2h0IC0gcmVzdWx0LmxlZnQ7XG4gIHZhciBoZWlnaHQgPSBzaXplcy5oZWlnaHQgfHwgZWxlbWVudC5jbGllbnRIZWlnaHQgfHwgcmVzdWx0LmJvdHRvbSAtIHJlc3VsdC50b3A7XG5cbiAgdmFyIGhvcml6U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRXaWR0aCAtIHdpZHRoO1xuICB2YXIgdmVydFNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gaGVpZ2h0O1xuXG4gIC8vIGlmIGFuIGh5cG90aGV0aWNhbCBzY3JvbGxiYXIgaXMgZGV0ZWN0ZWQsIHdlIG11c3QgYmUgc3VyZSBpdCdzIG5vdCBhIGBib3JkZXJgXG4gIC8vIHdlIG1ha2UgdGhpcyBjaGVjayBjb25kaXRpb25hbCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICBpZiAoaG9yaXpTY3JvbGxiYXIgfHwgdmVydFNjcm9sbGJhcikge1xuICAgIHZhciBzdHlsZXMgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCk7XG4gICAgaG9yaXpTY3JvbGxiYXIgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAneCcpO1xuICAgIHZlcnRTY3JvbGxiYXIgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAneScpO1xuXG4gICAgcmVzdWx0LndpZHRoIC09IGhvcml6U2Nyb2xsYmFyO1xuICAgIHJlc3VsdC5oZWlnaHQgLT0gdmVydFNjcm9sbGJhcjtcbiAgfVxuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KHJlc3VsdCk7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShjaGlsZHJlbiwgcGFyZW50KSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICB2YXIgaXNJRTEwID0gaXNJRSQxKDEwKTtcbiAgdmFyIGlzSFRNTCA9IHBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnO1xuICB2YXIgY2hpbGRyZW5SZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGNoaWxkcmVuKTtcbiAgdmFyIHBhcmVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QocGFyZW50KTtcbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChjaGlsZHJlbik7XG5cbiAgdmFyIHN0eWxlcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShwYXJlbnQpO1xuICB2YXIgYm9yZGVyVG9wV2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlcy5ib3JkZXJUb3BXaWR0aCwgMTApO1xuICB2YXIgYm9yZGVyTGVmdFdpZHRoID0gcGFyc2VGbG9hdChzdHlsZXMuYm9yZGVyTGVmdFdpZHRoLCAxMCk7XG5cbiAgLy8gSW4gY2FzZXMgd2hlcmUgdGhlIHBhcmVudCBpcyBmaXhlZCwgd2UgbXVzdCBpZ25vcmUgbmVnYXRpdmUgc2Nyb2xsIGluIG9mZnNldCBjYWxjXG4gIGlmIChmaXhlZFBvc2l0aW9uICYmIHBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgcGFyZW50UmVjdC50b3AgPSBNYXRoLm1heChwYXJlbnRSZWN0LnRvcCwgMCk7XG4gICAgcGFyZW50UmVjdC5sZWZ0ID0gTWF0aC5tYXgocGFyZW50UmVjdC5sZWZ0LCAwKTtcbiAgfVxuICB2YXIgb2Zmc2V0cyA9IGdldENsaWVudFJlY3Qoe1xuICAgIHRvcDogY2hpbGRyZW5SZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wIC0gYm9yZGVyVG9wV2lkdGgsXG4gICAgbGVmdDogY2hpbGRyZW5SZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGgsXG4gICAgd2lkdGg6IGNoaWxkcmVuUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IGNoaWxkcmVuUmVjdC5oZWlnaHRcbiAgfSk7XG4gIG9mZnNldHMubWFyZ2luVG9wID0gMDtcbiAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gMDtcblxuICAvLyBTdWJ0cmFjdCBtYXJnaW5zIG9mIGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGl0J3MgYmVpbmcgdXNlZCBhcyBwYXJlbnRcbiAgLy8gd2UgZG8gdGhpcyBvbmx5IG9uIEhUTUwgYmVjYXVzZSBpdCdzIHRoZSBvbmx5IGVsZW1lbnQgdGhhdCBiZWhhdmVzXG4gIC8vIGRpZmZlcmVudGx5IHdoZW4gbWFyZ2lucyBhcmUgYXBwbGllZCB0byBpdC4gVGhlIG1hcmdpbnMgYXJlIGluY2x1ZGVkIGluXG4gIC8vIHRoZSBib3ggb2YgdGhlIGRvY3VtZW50RWxlbWVudCwgaW4gdGhlIG90aGVyIGNhc2VzIG5vdC5cbiAgaWYgKCFpc0lFMTAgJiYgaXNIVE1MKSB7XG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblRvcCwgMTApO1xuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCwgMTApO1xuXG4gICAgb2Zmc2V0cy50b3AgLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5ib3R0b20gLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5sZWZ0IC09IGJvcmRlckxlZnRXaWR0aCAtIG1hcmdpbkxlZnQ7XG4gICAgb2Zmc2V0cy5yaWdodCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuXG4gICAgLy8gQXR0YWNoIG1hcmdpblRvcCBhbmQgbWFyZ2luTGVmdCBiZWNhdXNlIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyB3ZSBtYXkgbmVlZCB0aGVtXG4gICAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgfVxuXG4gIGlmIChpc0lFMTAgJiYgIWZpeGVkUG9zaXRpb24gPyBwYXJlbnQuY29udGFpbnMoc2Nyb2xsUGFyZW50KSA6IHBhcmVudCA9PT0gc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5ub2RlTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgb2Zmc2V0cyA9IGluY2x1ZGVTY3JvbGwob2Zmc2V0cywgcGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUoZWxlbWVudCkge1xuICB2YXIgZXhjbHVkZVNjcm9sbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgcmVsYXRpdmVPZmZzZXQgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoZWxlbWVudCwgaHRtbCk7XG4gIHZhciB3aWR0aCA9IE1hdGgubWF4KGh0bWwuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICB2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoaHRtbC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gIWV4Y2x1ZGVTY3JvbGwgPyBnZXRTY3JvbGwoaHRtbCkgOiAwO1xuICB2YXIgc2Nyb2xsTGVmdCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwsICdsZWZ0JykgOiAwO1xuXG4gIHZhciBvZmZzZXQgPSB7XG4gICAgdG9wOiBzY3JvbGxUb3AgLSByZWxhdGl2ZU9mZnNldC50b3AgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5Ub3AsXG4gICAgbGVmdDogc2Nyb2xsTGVmdCAtIHJlbGF0aXZlT2Zmc2V0LmxlZnQgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5MZWZ0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KG9mZnNldCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZml4ZWQgb3IgaXMgaW5zaWRlIGEgZml4ZWQgcGFyZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gY3VzdG9tQ29udGFpbmVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvIFwiaXNGaXhlZD9cIlxuICovXG5mdW5jdGlvbiBpc0ZpeGVkKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGlzRml4ZWQoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGZpcnN0IHBhcmVudCBvZiBhbiBlbGVtZW50IHRoYXQgaGFzIGEgdHJhbnNmb3JtZWQgcHJvcGVydHkgZGVmaW5lZFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gZmlyc3QgdHJhbnNmb3JtZWQgcGFyZW50IG9yIGRvY3VtZW50RWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCB0byBhdm9pZCBlcnJvcnMgaW4gY2FzZSBvbmUgb2YgdGhlIGVsZW1lbnRzIGlzbid0IGRlZmluZWQgZm9yIGFueSByZWFzb25cbiAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgaXNJRSQxKCkpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG4gIHZhciBlbCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgd2hpbGUgKGVsICYmIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbCwgJ3RyYW5zZm9ybScpID09PSAnbm9uZScpIHtcbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDb21wdXRlZCB0aGUgYm91bmRhcmllcyBsaW1pdHMgYW5kIHJldHVybiB0aGVtXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlZmVyZW5jZVxuICogQHBhcmFtIHtudW1iZXJ9IHBhZGRpbmdcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvdW5kYXJpZXNFbGVtZW50IC0gRWxlbWVudCB1c2VkIHRvIGRlZmluZSB0aGUgYm91bmRhcmllc1xuICogQHBhcmFtIHtCb29sZWFufSBmaXhlZFBvc2l0aW9uIC0gSXMgaW4gZml4ZWQgcG9zaXRpb24gbW9kZVxuICogQHJldHVybnMge09iamVjdH0gQ29vcmRpbmF0ZXMgb2YgdGhlIGJvdW5kYXJpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRhcmllcyhwb3BwZXIsIHJlZmVyZW5jZSwgcGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQpIHtcbiAgdmFyIGZpeGVkUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IGZhbHNlO1xuXG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG5cbiAgdmFyIGJvdW5kYXJpZXMgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZml4ZWRQb3NpdGlvbiA/IGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQocG9wcGVyKSA6IGZpbmRDb21tb25PZmZzZXRQYXJlbnQocG9wcGVyLCByZWZlcmVuY2UpO1xuXG4gIC8vIEhhbmRsZSB2aWV3cG9ydCBjYXNlXG4gIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3ZpZXdwb3J0Jykge1xuICAgIGJvdW5kYXJpZXMgPSBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUob2Zmc2V0UGFyZW50LCBmaXhlZFBvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBIYW5kbGUgb3RoZXIgY2FzZXMgYmFzZWQgb24gRE9NIGVsZW1lbnQgdXNlZCBhcyBib3VuZGFyaWVzXG4gICAgdmFyIGJvdW5kYXJpZXNOb2RlID0gdm9pZCAwO1xuICAgIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgIGJvdW5kYXJpZXNOb2RlID0gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUocmVmZXJlbmNlKSk7XG4gICAgICBpZiAoYm91bmRhcmllc05vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICBib3VuZGFyaWVzTm9kZSA9IHBvcHBlci5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnd2luZG93Jykge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBwb3BwZXIub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdW5kYXJpZXNOb2RlID0gYm91bmRhcmllc0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgdmFyIG9mZnNldHMgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoYm91bmRhcmllc05vZGUsIG9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG5cbiAgICAvLyBJbiBjYXNlIG9mIEhUTUwsIHdlIG5lZWQgYSBkaWZmZXJlbnQgY29tcHV0YXRpb25cbiAgICBpZiAoYm91bmRhcmllc05vZGUubm9kZU5hbWUgPT09ICdIVE1MJyAmJiAhaXNGaXhlZChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICB2YXIgX2dldFdpbmRvd1NpemVzID0gZ2V0V2luZG93U2l6ZXMoKSxcbiAgICAgICAgICBoZWlnaHQgPSBfZ2V0V2luZG93U2l6ZXMuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoID0gX2dldFdpbmRvd1NpemVzLndpZHRoO1xuXG4gICAgICBib3VuZGFyaWVzLnRvcCArPSBvZmZzZXRzLnRvcCAtIG9mZnNldHMubWFyZ2luVG9wO1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBoZWlnaHQgKyBvZmZzZXRzLnRvcDtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gd2lkdGggKyBvZmZzZXRzLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIGJvdW5kYXJpZXMubGVmdCArPSBwYWRkaW5nO1xuICBib3VuZGFyaWVzLnRvcCArPSBwYWRkaW5nO1xuICBib3VuZGFyaWVzLnJpZ2h0IC09IHBhZGRpbmc7XG4gIGJvdW5kYXJpZXMuYm90dG9tIC09IHBhZGRpbmc7XG5cbiAgcmV0dXJuIGJvdW5kYXJpZXM7XG59XG5cbmZ1bmN0aW9uIGdldEFyZWEoX3JlZikge1xuICB2YXIgd2lkdGggPSBfcmVmLndpZHRoLFxuICAgICAgaGVpZ2h0ID0gX3JlZi5oZWlnaHQ7XG5cbiAgcmV0dXJuIHdpZHRoICogaGVpZ2h0O1xufVxuXG4vKipcbiAqIFV0aWxpdHkgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGBhdXRvYCBwbGFjZW1lbnQgdG8gdGhlIHBsYWNlbWVudCB3aXRoIG1vcmVcbiAqIGF2YWlsYWJsZSBzcGFjZS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHBsYWNlbWVudCwgcmVmUmVjdCwgcG9wcGVyLCByZWZlcmVuY2UsIGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gIHZhciBwYWRkaW5nID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiAwO1xuXG4gIGlmIChwbGFjZW1lbnQuaW5kZXhPZignYXV0bycpID09PSAtMSkge1xuICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gIH1cblxuICB2YXIgYm91bmRhcmllcyA9IGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KTtcblxuICB2YXIgcmVjdHMgPSB7XG4gICAgdG9wOiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy53aWR0aCxcbiAgICAgIGhlaWdodDogcmVmUmVjdC50b3AgLSBib3VuZGFyaWVzLnRvcFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLnJpZ2h0IC0gcmVmUmVjdC5yaWdodCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuYm90dG9tIC0gcmVmUmVjdC5ib3R0b21cbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgIHdpZHRoOiByZWZSZWN0LmxlZnQgLSBib3VuZGFyaWVzLmxlZnQsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuaGVpZ2h0XG4gICAgfVxuICB9O1xuXG4gIHZhciBzb3J0ZWRBcmVhcyA9IE9iamVjdC5rZXlzKHJlY3RzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBfZXh0ZW5kcyQxKHtcbiAgICAgIGtleToga2V5XG4gICAgfSwgcmVjdHNba2V5XSwge1xuICAgICAgYXJlYTogZ2V0QXJlYShyZWN0c1trZXldKVxuICAgIH0pO1xuICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGIuYXJlYSAtIGEuYXJlYTtcbiAgfSk7XG5cbiAgdmFyIGZpbHRlcmVkQXJlYXMgPSBzb3J0ZWRBcmVhcy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IF9yZWYyLmhlaWdodDtcbiAgICByZXR1cm4gd2lkdGggPj0gcG9wcGVyLmNsaWVudFdpZHRoICYmIGhlaWdodCA+PSBwb3BwZXIuY2xpZW50SGVpZ2h0O1xuICB9KTtcblxuICB2YXIgY29tcHV0ZWRQbGFjZW1lbnQgPSBmaWx0ZXJlZEFyZWFzLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZEFyZWFzWzBdLmtleSA6IHNvcnRlZEFyZWFzWzBdLmtleTtcblxuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG5cbiAgcmV0dXJuIGNvbXB1dGVkUGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlIC0gdGhlIHJlZmVyZW5jZSBlbGVtZW50ICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7RWxlbWVudH0gZml4ZWRQb3NpdGlvbiAtIGlzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFJlZmVyZW5jZU9mZnNldHMoc3RhdGUsIHBvcHBlciwgcmVmZXJlbmNlKSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuXG4gIHZhciBjb21tb25PZmZzZXRQYXJlbnQgPSBmaXhlZFBvc2l0aW9uID8gZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudChwb3BwZXIpIDogZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG4gIHJldHVybiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUocmVmZXJlbmNlLCBjb21tb25PZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgc2l6ZXMgb2YgdGhlIGdpdmVuIGVsZW1lbnQgKG9mZnNldCBzaXplICsgbWFyZ2lucylcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge09iamVjdH0gb2JqZWN0IGNvbnRhaW5pbmcgd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldE91dGVyU2l6ZXMoZWxlbWVudCkge1xuICB2YXIgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3ApICsgcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luQm90dG9tKTtcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5MZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblJpZ2h0KTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCArIHksXG4gICAgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodCArIHhcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBmbGlwcGVkIHBsYWNlbWVudFxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgdmFyIGhhc2ggPSB7IGxlZnQ6ICdyaWdodCcsIHJpZ2h0OiAnbGVmdCcsIGJvdHRvbTogJ3RvcCcsIHRvcDogJ2JvdHRvbScgfTtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IG9mZnNldHMgdG8gdGhlIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHBvc2l0aW9uIC0gQ1NTIHBvc2l0aW9uIHRoZSBQb3BwZXIgd2lsbCBnZXQgYXBwbGllZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gdGhlIHBvcHBlciBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0cyAtIHRoZSByZWZlcmVuY2Ugb2Zmc2V0cyAodGhlIHBvcHBlciB3aWxsIGJlIHJlbGF0aXZlIHRvIHRoaXMpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhY2VtZW50IC0gb25lIG9mIHRoZSB2YWxpZCBwbGFjZW1lbnQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gcG9wcGVyT2Zmc2V0cyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFBvcHBlck9mZnNldHMocG9wcGVyLCByZWZlcmVuY2VPZmZzZXRzLCBwbGFjZW1lbnQpIHtcbiAgcGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG5cbiAgLy8gR2V0IHBvcHBlciBub2RlIHNpemVzXG4gIHZhciBwb3BwZXJSZWN0ID0gZ2V0T3V0ZXJTaXplcyhwb3BwZXIpO1xuXG4gIC8vIEFkZCBwb3NpdGlvbiwgd2lkdGggYW5kIGhlaWdodCB0byBvdXIgb2Zmc2V0cyBvYmplY3RcbiAgdmFyIHBvcHBlck9mZnNldHMgPSB7XG4gICAgd2lkdGg6IHBvcHBlclJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBwb3BwZXJSZWN0LmhlaWdodFxuICB9O1xuXG4gIC8vIGRlcGVuZGluZyBieSB0aGUgcG9wcGVyIHBsYWNlbWVudCB3ZSBoYXZlIHRvIGNvbXB1dGUgaXRzIG9mZnNldHMgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgdmFyIGlzSG9yaXogPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgbWFpblNpZGUgPSBpc0hvcml6ID8gJ3RvcCcgOiAnbGVmdCc7XG4gIHZhciBzZWNvbmRhcnlTaWRlID0gaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnO1xuICB2YXIgbWVhc3VyZW1lbnQgPSBpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2Vjb25kYXJ5TWVhc3VyZW1lbnQgPSAhaXNIb3JpeiA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICBwb3BwZXJPZmZzZXRzW21haW5TaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbbWFpblNpZGVdICsgcmVmZXJlbmNlT2Zmc2V0c1ttZWFzdXJlbWVudF0gLyAyIC0gcG9wcGVyUmVjdFttZWFzdXJlbWVudF0gLyAyO1xuICBpZiAocGxhY2VtZW50ID09PSBzZWNvbmRhcnlTaWRlKSB7XG4gICAgcG9wcGVyT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gLSBwb3BwZXJSZWN0W3NlY29uZGFyeU1lYXN1cmVtZW50XTtcbiAgfSBlbHNlIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tnZXRPcHBvc2l0ZVBsYWNlbWVudChzZWNvbmRhcnlTaWRlKV07XG4gIH1cblxuICByZXR1cm4gcG9wcGVyT2Zmc2V0cztcbn1cblxuLyoqXG4gKiBNaW1pY3MgdGhlIGBmaW5kYCBtZXRob2Qgb2YgQXJyYXlcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZChhcnIsIGNoZWNrKSB7XG4gIC8vIHVzZSBuYXRpdmUgZmluZCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgcmV0dXJuIGFyci5maW5kKGNoZWNrKTtcbiAgfVxuXG4gIC8vIHVzZSBgZmlsdGVyYCB0byBvYnRhaW4gdGhlIHNhbWUgYmVoYXZpb3Igb2YgYGZpbmRgXG4gIHJldHVybiBhcnIuZmlsdGVyKGNoZWNrKVswXTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBtYXRjaGluZyBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgcHJvcCwgdmFsdWUpIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kSW5kZXggaWYgc3VwcG9ydGVkXG4gIGlmIChBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XG4gICAgcmV0dXJuIGFyci5maW5kSW5kZXgoZnVuY3Rpb24gKGN1cikge1xuICAgICAgcmV0dXJuIGN1cltwcm9wXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyB1c2UgYGZpbmRgICsgYGluZGV4T2ZgIGlmIGBmaW5kSW5kZXhgIGlzbid0IHN1cHBvcnRlZFxuICB2YXIgbWF0Y2ggPSBmaW5kKGFyciwgZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmpbcHJvcF0gPT09IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIGFyci5pbmRleE9mKG1hdGNoKTtcbn1cblxuLyoqXG4gKiBMb29wIHRyb3VnaCB0aGUgbGlzdCBvZiBtb2RpZmllcnMgYW5kIHJ1biB0aGVtIGluIG9yZGVyLFxuICogZWFjaCBvZiB0aGVtIHdpbGwgdGhlbiBlZGl0IHRoZSBkYXRhIG9iamVjdC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5kcyAtIE9wdGlvbmFsIG1vZGlmaWVyIG5hbWUgdXNlZCBhcyBzdG9wcGVyXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH1cbiAqL1xuZnVuY3Rpb24gcnVuTW9kaWZpZXJzKG1vZGlmaWVycywgZGF0YSwgZW5kcykge1xuICB2YXIgbW9kaWZpZXJzVG9SdW4gPSBlbmRzID09PSB1bmRlZmluZWQgPyBtb2RpZmllcnMgOiBtb2RpZmllcnMuc2xpY2UoMCwgZmluZEluZGV4KG1vZGlmaWVycywgJ25hbWUnLCBlbmRzKSk7XG5cbiAgbW9kaWZpZXJzVG9SdW4uZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXJbJ2Z1bmN0aW9uJ10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgICBjb25zb2xlLndhcm4oJ2Btb2RpZmllci5mdW5jdGlvbmAgaXMgZGVwcmVjYXRlZCwgdXNlIGBtb2RpZmllci5mbmAhJyk7XG4gICAgfVxuICAgIHZhciBmbiA9IG1vZGlmaWVyWydmdW5jdGlvbiddIHx8IG1vZGlmaWVyLmZuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIGlmIChtb2RpZmllci5lbmFibGVkICYmIGlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICAvLyBBZGQgcHJvcGVydGllcyB0byBvZmZzZXRzIHRvIG1ha2UgdGhlbSBhIGNvbXBsZXRlIGNsaWVudFJlY3Qgb2JqZWN0XG4gICAgICAvLyB3ZSBkbyB0aGlzIGJlZm9yZSBlYWNoIG1vZGlmaWVyIHRvIG1ha2Ugc3VyZSB0aGUgcHJldmlvdXMgb25lIGRvZXNuJ3RcbiAgICAgIC8vIG1lc3Mgd2l0aCB0aGVzZSB2YWx1ZXNcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRDbGllbnRSZWN0KGRhdGEub2Zmc2V0cy5wb3BwZXIpO1xuICAgICAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSk7XG5cbiAgICAgIGRhdGEgPSBmbihkYXRhLCBtb2RpZmllcik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wcGVyLCBjb21wdXRpbmcgdGhlIG5ldyBvZmZzZXRzIGFuZCBhcHBseWluZ1xuICogdGhlIG5ldyBzdHlsZS48YnIgLz5cbiAqIFByZWZlciBgc2NoZWR1bGVVcGRhdGVgIG92ZXIgYHVwZGF0ZWAgYmVjYXVzZSBvZiBwZXJmb3JtYW5jZSByZWFzb25zLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIC8vIGlmIHBvcHBlciBpcyBkZXN0cm95ZWQsIGRvbid0IHBlcmZvcm0gYW55IGZ1cnRoZXIgdXBkYXRlXG4gIGlmICh0aGlzLnN0YXRlLmlzRGVzdHJveWVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRhdGEgPSB7XG4gICAgaW5zdGFuY2U6IHRoaXMsXG4gICAgc3R5bGVzOiB7fSxcbiAgICBhcnJvd1N0eWxlczoge30sXG4gICAgYXR0cmlidXRlczoge30sXG4gICAgZmxpcHBlZDogZmFsc2UsXG4gICAgb2Zmc2V0czoge31cbiAgfTtcblxuICAvLyBjb21wdXRlIHJlZmVyZW5jZSBlbGVtZW50IG9mZnNldHNcbiAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZU9mZnNldHModGhpcy5zdGF0ZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIGRhdGEucGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQodGhpcy5vcHRpb25zLnBsYWNlbWVudCwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5wYWRkaW5nKTtcblxuICAvLyBzdG9yZSB0aGUgY29tcHV0ZWQgcGxhY2VtZW50IGluc2lkZSBgb3JpZ2luYWxQbGFjZW1lbnRgXG4gIGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcblxuICBkYXRhLnBvc2l0aW9uRml4ZWQgPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZDtcblxuICAvLyBjb21wdXRlIHRoZSBwb3BwZXIgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0UG9wcGVyT2Zmc2V0cyh0aGlzLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIucG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xuXG4gIC8vIHJ1biB0aGUgbW9kaWZpZXJzXG4gIGRhdGEgPSBydW5Nb2RpZmllcnModGhpcy5tb2RpZmllcnMsIGRhdGEpO1xuXG4gIC8vIHRoZSBmaXJzdCBgdXBkYXRlYCB3aWxsIGNhbGwgYG9uQ3JlYXRlYCBjYWxsYmFja1xuICAvLyB0aGUgb3RoZXIgb25lcyB3aWxsIGNhbGwgYG9uVXBkYXRlYCBjYWxsYmFja1xuICBpZiAoIXRoaXMuc3RhdGUuaXNDcmVhdGVkKSB7XG4gICAgdGhpcy5zdGF0ZS5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgIHRoaXMub3B0aW9ucy5vbkNyZWF0ZShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9wdGlvbnMub25VcGRhdGUoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBpcyBlbmFibGVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTW9kaWZpZXJFbmFibGVkKG1vZGlmaWVycywgbW9kaWZpZXJOYW1lKSB7XG4gIHJldHVybiBtb2RpZmllcnMuc29tZShmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICBlbmFibGVkID0gX3JlZi5lbmFibGVkO1xuICAgIHJldHVybiBlbmFibGVkICYmIG5hbWUgPT09IG1vZGlmaWVyTmFtZTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcmVmaXhlZCBzdXBwb3J0ZWQgcHJvcGVydHkgbmFtZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5IChjYW1lbENhc2UpXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBwcmVmaXhlZCBwcm9wZXJ0eSAoY2FtZWxDYXNlIG9yIFBhc2NhbENhc2UsIGRlcGVuZGluZyBvbiB0aGUgdmVuZG9yIHByZWZpeClcbiAqL1xuZnVuY3Rpb24gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKHByb3BlcnR5KSB7XG4gIHZhciBwcmVmaXhlcyA9IFtmYWxzZSwgJ21zJywgJ1dlYmtpdCcsICdNb3onLCAnTyddO1xuICB2YXIgdXBwZXJQcm9wID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgIHZhciB0b0NoZWNrID0gcHJlZml4ID8gJycgKyBwcmVmaXggKyB1cHBlclByb3AgOiBwcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuc3R5bGVbdG9DaGVja10gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdG9DaGVjaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogRGVzdHJveSB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHRoaXMuc3RhdGUuaXNEZXN0cm95ZWQgPSB0cnVlO1xuXG4gIC8vIHRvdWNoIERPTSBvbmx5IGlmIGBhcHBseVN0eWxlYCBtb2RpZmllciBpcyBlbmFibGVkXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZCh0aGlzLm1vZGlmaWVycywgJ2FwcGx5U3R5bGUnKSkge1xuICAgIHRoaXMucG9wcGVyLnJlbW92ZUF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnKTtcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLnRvcCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLmxlZnQgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5yaWdodCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLmJvdHRvbSA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLndpbGxDaGFuZ2UgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZVtnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpXSA9ICcnO1xuICB9XG5cbiAgdGhpcy5kaXNhYmxlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAvLyByZW1vdmUgdGhlIHBvcHBlciBpZiB1c2VyIGV4cGxpY2l0eSBhc2tlZCBmb3IgdGhlIGRlbGV0aW9uIG9uIGRlc3Ryb3lcbiAgLy8gZG8gbm90IHVzZSBgcmVtb3ZlYCBiZWNhdXNlIElFMTEgZG9lc24ndCBzdXBwb3J0IGl0XG4gIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlT25EZXN0cm95KSB7XG4gICAgdGhpcy5wb3BwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnBvcHBlcik7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogR2V0IHRoZSB3aW5kb3cgYXNzb2NpYXRlZCB3aXRoIHRoZSBlbGVtZW50XG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvdyhlbGVtZW50KSB7XG4gIHZhciBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiB3aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGF0dGFjaFRvU2Nyb2xsUGFyZW50cyhzY3JvbGxQYXJlbnQsIGV2ZW50LCBjYWxsYmFjaywgc2Nyb2xsUGFyZW50cykge1xuICB2YXIgaXNCb2R5ID0gc2Nyb2xsUGFyZW50Lm5vZGVOYW1lID09PSAnQk9EWSc7XG4gIHZhciB0YXJnZXQgPSBpc0JvZHkgPyBzY3JvbGxQYXJlbnQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA6IHNjcm9sbFBhcmVudDtcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgaWYgKCFpc0JvZHkpIHtcbiAgICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoZ2V0U2Nyb2xsUGFyZW50KHRhcmdldC5wYXJlbnROb2RlKSwgZXZlbnQsIGNhbGxiYWNrLCBzY3JvbGxQYXJlbnRzKTtcbiAgfVxuICBzY3JvbGxQYXJlbnRzLnB1c2godGFyZ2V0KTtcbn1cblxuLyoqXG4gKiBTZXR1cCBuZWVkZWQgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBvcHRpb25zLCBzdGF0ZSwgdXBkYXRlQm91bmQpIHtcbiAgLy8gUmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICBzdGF0ZS51cGRhdGVCb3VuZCA9IHVwZGF0ZUJvdW5kO1xuICBnZXRXaW5kb3cocmVmZXJlbmNlKS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzdGF0ZS51cGRhdGVCb3VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIC8vIFNjcm9sbCBldmVudCBsaXN0ZW5lciBvbiBzY3JvbGwgcGFyZW50c1xuICB2YXIgc2Nyb2xsRWxlbWVudCA9IGdldFNjcm9sbFBhcmVudChyZWZlcmVuY2UpO1xuICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsRWxlbWVudCwgJ3Njcm9sbCcsIHN0YXRlLnVwZGF0ZUJvdW5kLCBzdGF0ZS5zY3JvbGxQYXJlbnRzKTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IHNjcm9sbEVsZW1lbnQ7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSB0cnVlO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBJdCB3aWxsIGFkZCByZXNpemUvc2Nyb2xsIGV2ZW50cyBhbmQgc3RhcnQgcmVjYWxjdWxhdGluZ1xuICogcG9zaXRpb24gb2YgdGhlIHBvcHBlciBlbGVtZW50IHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBlbmFibGVFdmVudExpc3RlbmVycygpIHtcbiAgaWYgKCF0aGlzLnN0YXRlLmV2ZW50c0VuYWJsZWQpIHtcbiAgICB0aGlzLnN0YXRlID0gc2V0dXBFdmVudExpc3RlbmVycyh0aGlzLnJlZmVyZW5jZSwgdGhpcy5vcHRpb25zLCB0aGlzLnN0YXRlLCB0aGlzLnNjaGVkdWxlVXBkYXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgdXNlZCB0byB1cGRhdGUgdGhlIHBvcHBlciBwb3NpdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBzdGF0ZSkge1xuICAvLyBSZW1vdmUgcmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICBnZXRXaW5kb3cocmVmZXJlbmNlKS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzdGF0ZS51cGRhdGVCb3VuZCk7XG5cbiAgLy8gUmVtb3ZlIHNjcm9sbCBldmVudCBsaXN0ZW5lciBvbiBzY3JvbGwgcGFyZW50c1xuICBzdGF0ZS5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzdGF0ZS51cGRhdGVCb3VuZCk7XG4gIH0pO1xuXG4gIC8vIFJlc2V0IHN0YXRlXG4gIHN0YXRlLnVwZGF0ZUJvdW5kID0gbnVsbDtcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cyA9IFtdO1xuICBzdGF0ZS5zY3JvbGxFbGVtZW50ID0gbnVsbDtcbiAgc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGZhbHNlO1xuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogSXQgd2lsbCByZW1vdmUgcmVzaXplL3Njcm9sbCBldmVudHMgYW5kIHdvbid0IHJlY2FsY3VsYXRlIHBvcHBlciBwb3NpdGlvblxuICogd2hlbiB0aGV5IGFyZSB0cmlnZ2VyZWQuIEl0IGFsc28gd29uJ3QgdHJpZ2dlciBvblVwZGF0ZSBjYWxsYmFjayBhbnltb3JlLFxuICogdW5sZXNzIHlvdSBjYWxsIGB1cGRhdGVgIG1ldGhvZCBtYW51YWxseS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAodGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdW5pdCA9ICcnO1xuICAgIC8vIGFkZCB1bml0IGlmIHRoZSB2YWx1ZSBpcyBudW1lcmljIGFuZCBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZ1xuICAgIGlmIChbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5pbmRleE9mKHByb3ApICE9PSAtMSAmJiBpc051bWVyaWMoc3R5bGVzW3Byb3BdKSkge1xuICAgICAgdW5pdCA9ICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF0gKyB1bml0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgYXR0cmlidXRlcyB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFBvcHBlci5qcyBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGVPbkxvYWQocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgc3RhdGUpIHtcbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIHZhciByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHZhciBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScgfSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShkYXRhLCBvcHRpb25zKSB7XG4gIHZhciB4ID0gb3B0aW9ucy54LFxuICAgICAgeSA9IG9wdGlvbnMueTtcbiAgdmFyIHBvcHBlciA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG5cbiAgLy8gUmVtb3ZlIHRoaXMgbGVnYWN5IHN1cHBvcnQgaW4gUG9wcGVyLmpzIHYyXG5cbiAgdmFyIGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAnYXBwbHlTdHlsZSc7XG4gIH0pLmdwdUFjY2VsZXJhdGlvbjtcbiAgaWYgKGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBgZ3B1QWNjZWxlcmF0aW9uYCBvcHRpb24gbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXIgYW5kIHdpbGwgbm90IGJlIHN1cHBvcnRlZCBpbiBmdXR1cmUgdmVyc2lvbnMgb2YgUG9wcGVyLmpzIScpO1xuICB9XG4gIHZhciBncHVBY2NlbGVyYXRpb24gPSBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gIT09IHVuZGVmaW5lZCA/IGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiA6IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uO1xuXG4gIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuICB2YXIgb2Zmc2V0UGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQpO1xuXG4gIC8vIFN0eWxlc1xuICB2YXIgc3R5bGVzID0ge1xuICAgIHBvc2l0aW9uOiBwb3BwZXIucG9zaXRpb25cbiAgfTtcblxuICAvLyBBdm9pZCBibHVycnkgdGV4dCBieSB1c2luZyBmdWxsIHBpeGVsIGludGVnZXJzLlxuICAvLyBGb3IgcGl4ZWwtcGVyZmVjdCBwb3NpdGlvbmluZywgdG9wL2JvdHRvbSBwcmVmZXJzIHJvdW5kZWRcbiAgLy8gdmFsdWVzLCB3aGlsZSBsZWZ0L3JpZ2h0IHByZWZlcnMgZmxvb3JlZCB2YWx1ZXMuXG4gIHZhciBvZmZzZXRzID0ge1xuICAgIGxlZnQ6IE1hdGguZmxvb3IocG9wcGVyLmxlZnQpLFxuICAgIHRvcDogTWF0aC5yb3VuZChwb3BwZXIudG9wKSxcbiAgICBib3R0b206IE1hdGgucm91bmQocG9wcGVyLmJvdHRvbSksXG4gICAgcmlnaHQ6IE1hdGguZmxvb3IocG9wcGVyLnJpZ2h0KVxuICB9O1xuXG4gIHZhciBzaWRlQSA9IHggPT09ICdib3R0b20nID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgdmFyIHNpZGVCID0geSA9PT0gJ3JpZ2h0JyA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cbiAgLy8gaWYgZ3B1QWNjZWxlcmF0aW9uIGlzIHNldCB0byBgdHJ1ZWAgYW5kIHRyYW5zZm9ybSBpcyBzdXBwb3J0ZWQsXG4gIC8vICB3ZSB1c2UgYHRyYW5zbGF0ZTNkYCB0byBhcHBseSB0aGUgcG9zaXRpb24gdG8gdGhlIHBvcHBlciB3ZVxuICAvLyBhdXRvbWF0aWNhbGx5IHVzZSB0aGUgc3VwcG9ydGVkIHByZWZpeGVkIHZlcnNpb24gaWYgbmVlZGVkXG4gIHZhciBwcmVmaXhlZFByb3BlcnR5ID0gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKTtcblxuICAvLyBub3csIGxldCdzIG1ha2UgYSBzdGVwIGJhY2sgYW5kIGxvb2sgYXQgdGhpcyBjb2RlIGNsb3NlbHkgKHd0Zj8pXG4gIC8vIElmIHRoZSBjb250ZW50IG9mIHRoZSBwb3BwZXIgZ3Jvd3Mgb25jZSBpdCdzIGJlZW4gcG9zaXRpb25lZCwgaXRcbiAgLy8gbWF5IGhhcHBlbiB0aGF0IHRoZSBwb3BwZXIgZ2V0cyBtaXNwbGFjZWQgYmVjYXVzZSBvZiB0aGUgbmV3IGNvbnRlbnRcbiAgLy8gb3ZlcmZsb3dpbmcgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRvIGF2b2lkIHRoaXMgcHJvYmxlbSwgd2UgcHJvdmlkZSB0d28gb3B0aW9ucyAoeCBhbmQgeSksIHdoaWNoIGFsbG93XG4gIC8vIHRoZSBjb25zdW1lciB0byBkZWZpbmUgdGhlIG9mZnNldCBvcmlnaW4uXG4gIC8vIElmIHdlIHBvc2l0aW9uIGEgcG9wcGVyIG9uIHRvcCBvZiBhIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSBjYW4gc2V0XG4gIC8vIGB4YCB0byBgdG9wYCB0byBtYWtlIHRoZSBwb3BwZXIgZ3JvdyB0b3dhcmRzIGl0cyB0b3AgaW5zdGVhZCBvZlxuICAvLyBpdHMgYm90dG9tLlxuICB2YXIgbGVmdCA9IHZvaWQgMCxcbiAgICAgIHRvcCA9IHZvaWQgMDtcbiAgaWYgKHNpZGVBID09PSAnYm90dG9tJykge1xuICAgIHRvcCA9IC1vZmZzZXRQYXJlbnRSZWN0LmhlaWdodCArIG9mZnNldHMuYm90dG9tO1xuICB9IGVsc2Uge1xuICAgIHRvcCA9IG9mZnNldHMudG9wO1xuICB9XG4gIGlmIChzaWRlQiA9PT0gJ3JpZ2h0Jykge1xuICAgIGxlZnQgPSAtb2Zmc2V0UGFyZW50UmVjdC53aWR0aCArIG9mZnNldHMucmlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgbGVmdCA9IG9mZnNldHMubGVmdDtcbiAgfVxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uICYmIHByZWZpeGVkUHJvcGVydHkpIHtcbiAgICBzdHlsZXNbcHJlZml4ZWRQcm9wZXJ0eV0gPSAndHJhbnNsYXRlM2QoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgsIDApJztcbiAgICBzdHlsZXNbc2lkZUFdID0gMDtcbiAgICBzdHlsZXNbc2lkZUJdID0gMDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9ICd0cmFuc2Zvcm0nO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aHdlcmlzZSwgd2UgdXNlIHRoZSBzdGFuZGFyZCBgdG9wYCwgYGxlZnRgLCBgYm90dG9tYCBhbmQgYHJpZ2h0YCBwcm9wZXJ0aWVzXG4gICAgdmFyIGludmVydFRvcCA9IHNpZGVBID09PSAnYm90dG9tJyA/IC0xIDogMTtcbiAgICB2YXIgaW52ZXJ0TGVmdCA9IHNpZGVCID09PSAncmlnaHQnID8gLTEgOiAxO1xuICAgIHN0eWxlc1tzaWRlQV0gPSB0b3AgKiBpbnZlcnRUb3A7XG4gICAgc3R5bGVzW3NpZGVCXSA9IGxlZnQgKiBpbnZlcnRMZWZ0O1xuICAgIHN0eWxlcy53aWxsQ2hhbmdlID0gc2lkZUEgKyAnLCAnICsgc2lkZUI7XG4gIH1cblxuICAvLyBBdHRyaWJ1dGVzXG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICd4LXBsYWNlbWVudCc6IGRhdGEucGxhY2VtZW50XG4gIH07XG5cbiAgLy8gVXBkYXRlIGBkYXRhYCBhdHRyaWJ1dGVzLCBzdHlsZXMgYW5kIGFycm93U3R5bGVzXG4gIGRhdGEuYXR0cmlidXRlcyA9IF9leHRlbmRzJDEoe30sIGF0dHJpYnV0ZXMsIGRhdGEuYXR0cmlidXRlcyk7XG4gIGRhdGEuc3R5bGVzID0gX2V4dGVuZHMkMSh7fSwgc3R5bGVzLCBkYXRhLnN0eWxlcyk7XG4gIGRhdGEuYXJyb3dTdHlsZXMgPSBfZXh0ZW5kcyQxKHt9LCBkYXRhLm9mZnNldHMuYXJyb3csIGRhdGEuYXJyb3dTdHlsZXMpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGRlcGVuZHMgZnJvbSBhbm90aGVyIG9uZS48YnIgLz5cbiAqIEl0IGNoZWNrcyBpZiB0aGUgbmVlZGVkIG1vZGlmaWVyIGlzIGxpc3RlZCBhbmQgZW5hYmxlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVycyAtIGxpc3Qgb2YgbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGluZ05hbWUgLSBuYW1lIG9mIHJlcXVlc3RpbmcgbW9kaWZpZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0ZWROYW1lIC0gbmFtZSBvZiByZXF1ZXN0ZWQgbW9kaWZpZXJcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc01vZGlmaWVyUmVxdWlyZWQobW9kaWZpZXJzLCByZXF1ZXN0aW5nTmFtZSwgcmVxdWVzdGVkTmFtZSkge1xuICB2YXIgcmVxdWVzdGluZyA9IGZpbmQobW9kaWZpZXJzLCBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lO1xuICAgIHJldHVybiBuYW1lID09PSByZXF1ZXN0aW5nTmFtZTtcbiAgfSk7XG5cbiAgdmFyIGlzUmVxdWlyZWQgPSAhIXJlcXVlc3RpbmcgJiYgbW9kaWZpZXJzLnNvbWUoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyLm5hbWUgPT09IHJlcXVlc3RlZE5hbWUgJiYgbW9kaWZpZXIuZW5hYmxlZCAmJiBtb2RpZmllci5vcmRlciA8IHJlcXVlc3Rpbmcub3JkZXI7XG4gIH0pO1xuXG4gIGlmICghaXNSZXF1aXJlZCkge1xuICAgIHZhciBfcmVxdWVzdGluZyA9ICdgJyArIHJlcXVlc3RpbmdOYW1lICsgJ2AnO1xuICAgIHZhciByZXF1ZXN0ZWQgPSAnYCcgKyByZXF1ZXN0ZWROYW1lICsgJ2AnO1xuICAgIGNvbnNvbGUud2FybihyZXF1ZXN0ZWQgKyAnIG1vZGlmaWVyIGlzIHJlcXVpcmVkIGJ5ICcgKyBfcmVxdWVzdGluZyArICcgbW9kaWZpZXIgaW4gb3JkZXIgdG8gd29yaywgYmUgc3VyZSB0byBpbmNsdWRlIGl0IGJlZm9yZSAnICsgX3JlcXVlc3RpbmcgKyAnIScpO1xuICB9XG4gIHJldHVybiBpc1JlcXVpcmVkO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gYXJyb3coZGF0YSwgb3B0aW9ucykge1xuICB2YXIgX2RhdGEkb2Zmc2V0cyRhcnJvdztcblxuICAvLyBhcnJvdyBkZXBlbmRzIG9uIGtlZXBUb2dldGhlciBpbiBvcmRlciB0byB3b3JrXG4gIGlmICghaXNNb2RpZmllclJlcXVpcmVkKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCAnYXJyb3cnLCAna2VlcFRvZ2V0aGVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciBhcnJvd0VsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQ7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGEgc3RyaW5nLCBzdXBwb3NlIGl0J3MgYSBDU1Mgc2VsZWN0b3JcbiAgaWYgKHR5cGVvZiBhcnJvd0VsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgYXJyb3dFbGVtZW50ID0gZGF0YS5pbnN0YW5jZS5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIG5vdCBmb3VuZCwgZG9uJ3QgcnVuIHRoZSBtb2RpZmllclxuICAgIGlmICghYXJyb3dFbGVtZW50KSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgdGhlIGFycm93RWxlbWVudCBpc24ndCBhIHF1ZXJ5IHNlbGVjdG9yIHdlIG11c3QgY2hlY2sgdGhhdCB0aGVcbiAgICAvLyBwcm92aWRlZCBET00gbm9kZSBpcyBjaGlsZCBvZiBpdHMgcG9wcGVyIG5vZGVcbiAgICBpZiAoIWRhdGEuaW5zdGFuY2UucG9wcGVyLmNvbnRhaW5zKGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogYGFycm93LmVsZW1lbnRgIG11c3QgYmUgY2hpbGQgb2YgaXRzIHBvcHBlciBlbGVtZW50IScpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNWZXJ0aWNhbCA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIHZhciBzaWRlQ2FwaXRhbGl6ZWQgPSBpc1ZlcnRpY2FsID8gJ1RvcCcgOiAnTGVmdCc7XG4gIHZhciBzaWRlID0gc2lkZUNhcGl0YWxpemVkLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBhbHRTaWRlID0gaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xuICB2YXIgb3BTaWRlID0gaXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ3JpZ2h0JztcbiAgdmFyIGFycm93RWxlbWVudFNpemUgPSBnZXRPdXRlclNpemVzKGFycm93RWxlbWVudClbbGVuXTtcblxuICAvL1xuICAvLyBleHRlbmRzIGtlZXBUb2dldGhlciBiZWhhdmlvciBtYWtpbmcgc3VyZSB0aGUgcG9wcGVyIGFuZCBpdHNcbiAgLy8gcmVmZXJlbmNlIGhhdmUgZW5vdWdoIHBpeGVscyBpbiBjb25qdWN0aW9uXG4gIC8vXG5cbiAgLy8gdG9wL2xlZnQgc2lkZVxuICBpZiAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplIDwgcG9wcGVyW3NpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtPSBwb3BwZXJbc2lkZV0gLSAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplKTtcbiAgfVxuICAvLyBib3R0b20vcmlnaHQgc2lkZVxuICBpZiAocmVmZXJlbmNlW3NpZGVdICsgYXJyb3dFbGVtZW50U2l6ZSA+IHBvcHBlcltvcFNpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSArPSByZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplIC0gcG9wcGVyW29wU2lkZV07XG4gIH1cbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG5cbiAgLy8gY29tcHV0ZSBjZW50ZXIgb2YgdGhlIHBvcHBlclxuICB2YXIgY2VudGVyID0gcmVmZXJlbmNlW3NpZGVdICsgcmVmZXJlbmNlW2xlbl0gLyAyIC0gYXJyb3dFbGVtZW50U2l6ZSAvIDI7XG5cbiAgLy8gQ29tcHV0ZSB0aGUgc2lkZVZhbHVlIHVzaW5nIHRoZSB1cGRhdGVkIHBvcHBlciBvZmZzZXRzXG4gIC8vIHRha2UgcG9wcGVyIG1hcmdpbiBpbiBhY2NvdW50IGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSB0aGlzIGluZm8gYXZhaWxhYmxlXG4gIHZhciBjc3MgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuICB2YXIgcG9wcGVyTWFyZ2luU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydtYXJnaW4nICsgc2lkZUNhcGl0YWxpemVkXSwgMTApO1xuICB2YXIgcG9wcGVyQm9yZGVyU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydib3JkZXInICsgc2lkZUNhcGl0YWxpemVkICsgJ1dpZHRoJ10sIDEwKTtcbiAgdmFyIHNpZGVWYWx1ZSA9IGNlbnRlciAtIGRhdGEub2Zmc2V0cy5wb3BwZXJbc2lkZV0gLSBwb3BwZXJNYXJnaW5TaWRlIC0gcG9wcGVyQm9yZGVyU2lkZTtcblxuICAvLyBwcmV2ZW50IGFycm93RWxlbWVudCBmcm9tIGJlaW5nIHBsYWNlZCBub3QgY29udGlndW91c2x5IHRvIGl0cyBwb3BwZXJcbiAgc2lkZVZhbHVlID0gTWF0aC5tYXgoTWF0aC5taW4ocG9wcGVyW2xlbl0gLSBhcnJvd0VsZW1lbnRTaXplLCBzaWRlVmFsdWUpLCAwKTtcblxuICBkYXRhLmFycm93RWxlbWVudCA9IGFycm93RWxlbWVudDtcbiAgZGF0YS5vZmZzZXRzLmFycm93ID0gKF9kYXRhJG9mZnNldHMkYXJyb3cgPSB7fSwgZGVmaW5lUHJvcGVydHkkMShfZGF0YSRvZmZzZXRzJGFycm93LCBzaWRlLCBNYXRoLnJvdW5kKHNpZGVWYWx1ZSkpLCBkZWZpbmVQcm9wZXJ0eSQxKF9kYXRhJG9mZnNldHMkYXJyb3csIGFsdFNpZGUsICcnKSwgX2RhdGEkb2Zmc2V0cyRhcnJvdyk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogR2V0IHRoZSBvcHBvc2l0ZSBwbGFjZW1lbnQgdmFyaWF0aW9uIG9mIHRoZSBnaXZlbiBvbmVcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnQgdmFyaWF0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBmbGlwcGVkIHBsYWNlbWVudCB2YXJpYXRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb24odmFyaWF0aW9uKSB7XG4gIGlmICh2YXJpYXRpb24gPT09ICdlbmQnKSB7XG4gICAgcmV0dXJuICdzdGFydCc7XG4gIH0gZWxzZSBpZiAodmFyaWF0aW9uID09PSAnc3RhcnQnKSB7XG4gICAgcmV0dXJuICdlbmQnO1xuICB9XG4gIHJldHVybiB2YXJpYXRpb247XG59XG5cbi8qKlxuICogTGlzdCBvZiBhY2NlcHRlZCBwbGFjZW1lbnRzIHRvIHVzZSBhcyB2YWx1ZXMgb2YgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbi48YnIgLz5cbiAqIFZhbGlkIHBsYWNlbWVudHMgYXJlOlxuICogLSBgYXV0b2BcbiAqIC0gYHRvcGBcbiAqIC0gYHJpZ2h0YFxuICogLSBgYm90dG9tYFxuICogLSBgbGVmdGBcbiAqXG4gKiBFYWNoIHBsYWNlbWVudCBjYW4gaGF2ZSBhIHZhcmlhdGlvbiBmcm9tIHRoaXMgbGlzdDpcbiAqIC0gYC1zdGFydGBcbiAqIC0gYC1lbmRgXG4gKlxuICogVmFyaWF0aW9ucyBhcmUgaW50ZXJwcmV0ZWQgZWFzaWx5IGlmIHlvdSB0aGluayBvZiB0aGVtIGFzIHRoZSBsZWZ0IHRvIHJpZ2h0XG4gKiB3cml0dGVuIGxhbmd1YWdlcy4gSG9yaXpvbnRhbGx5IChgdG9wYCBhbmQgYGJvdHRvbWApLCBgc3RhcnRgIGlzIGxlZnQgYW5kIGBlbmRgXG4gKiBpcyByaWdodC48YnIgLz5cbiAqIFZlcnRpY2FsbHkgKGBsZWZ0YCBhbmQgYHJpZ2h0YCksIGBzdGFydGAgaXMgdG9wIGFuZCBgZW5kYCBpcyBib3R0b20uXG4gKlxuICogU29tZSB2YWxpZCBleGFtcGxlcyBhcmU6XG4gKiAtIGB0b3AtZW5kYCAob24gdG9wIG9mIHJlZmVyZW5jZSwgcmlnaHQgYWxpZ25lZClcbiAqIC0gYHJpZ2h0LXN0YXJ0YCAob24gcmlnaHQgb2YgcmVmZXJlbmNlLCB0b3AgYWxpZ25lZClcbiAqIC0gYGJvdHRvbWAgKG9uIGJvdHRvbSwgY2VudGVyZWQpXG4gKiAtIGBhdXRvLXJpZ2h0YCAob24gdGhlIHNpZGUgd2l0aCBtb3JlIHNwYWNlIGF2YWlsYWJsZSwgYWxpZ25tZW50IGRlcGVuZHMgYnkgcGxhY2VtZW50KVxuICpcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBlbnVtIHtTdHJpbmd9XG4gKiBAcmVhZG9ubHlcbiAqIEBtZXRob2QgcGxhY2VtZW50c1xuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG52YXIgcGxhY2VtZW50cyA9IFsnYXV0by1zdGFydCcsICdhdXRvJywgJ2F1dG8tZW5kJywgJ3RvcC1zdGFydCcsICd0b3AnLCAndG9wLWVuZCcsICdyaWdodC1zdGFydCcsICdyaWdodCcsICdyaWdodC1lbmQnLCAnYm90dG9tLWVuZCcsICdib3R0b20nLCAnYm90dG9tLXN0YXJ0JywgJ2xlZnQtZW5kJywgJ2xlZnQnLCAnbGVmdC1zdGFydCddO1xuXG4vLyBHZXQgcmlkIG9mIGBhdXRvYCBgYXV0by1zdGFydGAgYW5kIGBhdXRvLWVuZGBcbnZhciB2YWxpZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLnNsaWNlKDMpO1xuXG4vKipcbiAqIEdpdmVuIGFuIGluaXRpYWwgcGxhY2VtZW50LCByZXR1cm5zIGFsbCB0aGUgc3Vic2VxdWVudCBwbGFjZW1lbnRzXG4gKiBjbG9ja3dpc2UgKG9yIGNvdW50ZXItY2xvY2t3aXNlKS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50IC0gQSB2YWxpZCBwbGFjZW1lbnQgKGl0IGFjY2VwdHMgdmFyaWF0aW9ucylcbiAqIEBhcmd1bWVudCB7Qm9vbGVhbn0gY291bnRlciAtIFNldCB0byB0cnVlIHRvIHdhbGsgdGhlIHBsYWNlbWVudHMgY291bnRlcmNsb2Nrd2lzZVxuICogQHJldHVybnMge0FycmF5fSBwbGFjZW1lbnRzIGluY2x1ZGluZyB0aGVpciB2YXJpYXRpb25zXG4gKi9cbmZ1bmN0aW9uIGNsb2Nrd2lzZShwbGFjZW1lbnQpIHtcbiAgdmFyIGNvdW50ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIHZhciBpbmRleCA9IHZhbGlkUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCk7XG4gIHZhciBhcnIgPSB2YWxpZFBsYWNlbWVudHMuc2xpY2UoaW5kZXggKyAxKS5jb25jYXQodmFsaWRQbGFjZW1lbnRzLnNsaWNlKDAsIGluZGV4KSk7XG4gIHJldHVybiBjb3VudGVyID8gYXJyLnJldmVyc2UoKSA6IGFycjtcbn1cblxudmFyIEJFSEFWSU9SUyA9IHtcbiAgRkxJUDogJ2ZsaXAnLFxuICBDTE9DS1dJU0U6ICdjbG9ja3dpc2UnLFxuICBDT1VOVEVSQ0xPQ0tXSVNFOiAnY291bnRlcmNsb2Nrd2lzZSdcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBmbGlwKGRhdGEsIG9wdGlvbnMpIHtcbiAgLy8gaWYgYGlubmVyYCBtb2RpZmllciBpcyBlbmFibGVkLCB3ZSBjYW4ndCB1c2UgdGhlIGBmbGlwYCBtb2RpZmllclxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdpbm5lcicpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBpZiAoZGF0YS5mbGlwcGVkICYmIGRhdGEucGxhY2VtZW50ID09PSBkYXRhLm9yaWdpbmFsUGxhY2VtZW50KSB7XG4gICAgLy8gc2VlbXMgbGlrZSBmbGlwIGlzIHRyeWluZyB0byBsb29wLCBwcm9iYWJseSB0aGVyZSdzIG5vdCBlbm91Z2ggc3BhY2Ugb24gYW55IG9mIHRoZSBmbGlwcGFibGUgc2lkZXNcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudCwgZGF0YS5wb3NpdGlvbkZpeGVkKTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIHBsYWNlbWVudE9wcG9zaXRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIHZhcmlhdGlvbiA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMV0gfHwgJyc7XG5cbiAgdmFyIGZsaXBPcmRlciA9IFtdO1xuXG4gIHN3aXRjaCAob3B0aW9ucy5iZWhhdmlvcikge1xuICAgIGNhc2UgQkVIQVZJT1JTLkZMSVA6XG4gICAgICBmbGlwT3JkZXIgPSBbcGxhY2VtZW50LCBwbGFjZW1lbnRPcHBvc2l0ZV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEJFSEFWSU9SUy5DTE9DS1dJU0U6XG4gICAgICBmbGlwT3JkZXIgPSBjbG9ja3dpc2UocGxhY2VtZW50KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNPVU5URVJDTE9DS1dJU0U6XG4gICAgICBmbGlwT3JkZXIgPSBjbG9ja3dpc2UocGxhY2VtZW50LCB0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBmbGlwT3JkZXIgPSBvcHRpb25zLmJlaGF2aW9yO1xuICB9XG5cbiAgZmxpcE9yZGVyLmZvckVhY2goZnVuY3Rpb24gKHN0ZXAsIGluZGV4KSB7XG4gICAgaWYgKHBsYWNlbWVudCAhPT0gc3RlcCB8fCBmbGlwT3JkZXIubGVuZ3RoID09PSBpbmRleCArIDEpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gICAgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIHBvcHBlck9mZnNldHMgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuICAgIHZhciByZWZPZmZzZXRzID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcblxuICAgIC8vIHVzaW5nIGZsb29yIGJlY2F1c2UgdGhlIHJlZmVyZW5jZSBvZmZzZXRzIG1heSBjb250YWluIGRlY2ltYWxzIHdlIGFyZSBub3QgZ29pbmcgdG8gY29uc2lkZXIgaGVyZVxuICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIG92ZXJsYXBzUmVmID0gcGxhY2VtZW50ID09PSAnbGVmdCcgJiYgZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihyZWZPZmZzZXRzLmxlZnQpIHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLmxlZnQpIDwgZmxvb3IocmVmT2Zmc2V0cy5yaWdodCkgfHwgcGxhY2VtZW50ID09PSAndG9wJyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihyZWZPZmZzZXRzLnRvcCkgfHwgcGxhY2VtZW50ID09PSAnYm90dG9tJyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnRvcCkgPCBmbG9vcihyZWZPZmZzZXRzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzTGVmdCA9IGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihib3VuZGFyaWVzLmxlZnQpO1xuICAgIHZhciBvdmVyZmxvd3NSaWdodCA9IGZsb29yKHBvcHBlck9mZnNldHMucmlnaHQpID4gZmxvb3IoYm91bmRhcmllcy5yaWdodCk7XG4gICAgdmFyIG92ZXJmbG93c1RvcCA9IGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKGJvdW5kYXJpZXMudG9wKTtcbiAgICB2YXIgb3ZlcmZsb3dzQm90dG9tID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5ib3R0b20pID4gZmxvb3IoYm91bmRhcmllcy5ib3R0b20pO1xuXG4gICAgdmFyIG92ZXJmbG93c0JvdW5kYXJpZXMgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBvdmVyZmxvd3NMZWZ0IHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBvdmVyZmxvd3NSaWdodCB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIG92ZXJmbG93c1RvcCB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIG92ZXJmbG93c0JvdHRvbTtcblxuICAgIC8vIGZsaXAgdGhlIHZhcmlhdGlvbiBpZiByZXF1aXJlZFxuICAgIHZhciBpc1ZlcnRpY2FsID0gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMTtcbiAgICB2YXIgZmxpcHBlZFZhcmlhdGlvbiA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzTGVmdCB8fCBpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c1RvcCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0JvdHRvbSk7XG5cbiAgICBpZiAob3ZlcmxhcHNSZWYgfHwgb3ZlcmZsb3dzQm91bmRhcmllcyB8fCBmbGlwcGVkVmFyaWF0aW9uKSB7XG4gICAgICAvLyB0aGlzIGJvb2xlYW4gdG8gZGV0ZWN0IGFueSBmbGlwIGxvb3BcbiAgICAgIGRhdGEuZmxpcHBlZCA9IHRydWU7XG5cbiAgICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IGZsaXBPcmRlcltpbmRleCArIDFdO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmxpcHBlZFZhcmlhdGlvbikge1xuICAgICAgICB2YXJpYXRpb24gPSBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnBsYWNlbWVudCA9IHBsYWNlbWVudCArICh2YXJpYXRpb24gPyAnLScgKyB2YXJpYXRpb24gOiAnJyk7XG5cbiAgICAgIC8vIHRoaXMgb2JqZWN0IGNvbnRhaW5zIGBwb3NpdGlvbmAsIHdlIHdhbnQgdG8gcHJlc2VydmUgaXQgYWxvbmcgd2l0aFxuICAgICAgLy8gYW55IGFkZGl0aW9uYWwgcHJvcGVydHkgd2UgbWF5IGFkZCBpbiB0aGUgZnV0dXJlXG4gICAgICBkYXRhLm9mZnNldHMucG9wcGVyID0gX2V4dGVuZHMkMSh7fSwgZGF0YS5vZmZzZXRzLnBvcHBlciwgZ2V0UG9wcGVyT2Zmc2V0cyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpKTtcblxuICAgICAgZGF0YSA9IHJ1bk1vZGlmaWVycyhkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZGF0YSwgJ2ZsaXAnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGtlZXBUb2dldGhlcihkYXRhKSB7XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gIHZhciBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgaWYgKHBvcHBlcltzaWRlXSA8IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSAtIHBvcHBlclttZWFzdXJlbWVudF07XG4gIH1cbiAgaWYgKHBvcHBlcltvcFNpZGVdID4gZmxvb3IocmVmZXJlbmNlW3NpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtzaWRlXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBjb250YWluaW5nIHZhbHVlICsgdW5pdCBpbnRvIGEgcHggdmFsdWUgbnVtYmVyXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiB7bW9kaWZpZXJzfm9mZnNldH1cbiAqIEBwcml2YXRlXG4gKiBAYXJndW1lbnQge1N0cmluZ30gc3RyIC0gVmFsdWUgKyB1bml0IHN0cmluZ1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IG1lYXN1cmVtZW50IC0gYGhlaWdodGAgb3IgYHdpZHRoYFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfFN0cmluZ31cbiAqIFZhbHVlIGluIHBpeGVscywgb3Igb3JpZ2luYWwgc3RyaW5nIGlmIG5vIHZhbHVlcyB3ZXJlIGV4dHJhY3RlZFxuICovXG5mdW5jdGlvbiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpIHtcbiAgLy8gc2VwYXJhdGUgdmFsdWUgZnJvbSB1bml0XG4gIHZhciBzcGxpdCA9IHN0ci5tYXRjaCgvKCg/OlxcLXxcXCspP1xcZCpcXC4/XFxkKikoLiopLyk7XG4gIHZhciB2YWx1ZSA9ICtzcGxpdFsxXTtcbiAgdmFyIHVuaXQgPSBzcGxpdFsyXTtcblxuICAvLyBJZiBpdCdzIG5vdCBhIG51bWJlciBpdCdzIGFuIG9wZXJhdG9yLCBJIGd1ZXNzXG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKHVuaXQuaW5kZXhPZignJScpID09PSAwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICBjYXNlICclcCc6XG4gICAgICAgIGVsZW1lbnQgPSBwb3BwZXJPZmZzZXRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyUnOlxuICAgICAgY2FzZSAnJXInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWxlbWVudCA9IHJlZmVyZW5jZU9mZnNldHM7XG4gICAgfVxuXG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0KGVsZW1lbnQpO1xuICAgIHJldHVybiByZWN0W21lYXN1cmVtZW50XSAvIDEwMCAqIHZhbHVlO1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICd2aCcgfHwgdW5pdCA9PT0gJ3Z3Jykge1xuICAgIC8vIGlmIGlzIGEgdmggb3IgdncsIHdlIGNhbGN1bGF0ZSB0aGUgc2l6ZSBiYXNlZCBvbiB0aGUgdmlld3BvcnRcbiAgICB2YXIgc2l6ZSA9IHZvaWQgMDtcbiAgICBpZiAodW5pdCA9PT0gJ3ZoJykge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgfVxuICAgIHJldHVybiBzaXplIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgaXMgYW4gZXhwbGljaXQgcGl4ZWwgdW5pdCwgd2UgZ2V0IHJpZCBvZiB0aGUgdW5pdCBhbmQga2VlcCB0aGUgdmFsdWVcbiAgICAvLyBpZiBpcyBhbiBpbXBsaWNpdCB1bml0LCBpdCdzIHB4LCBhbmQgd2UgcmV0dXJuIGp1c3QgdGhlIHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2UgYW4gYG9mZnNldGAgc3RyaW5nIHRvIGV4dHJhcG9sYXRlIGB4YCBhbmQgYHlgIG51bWVyaWMgb2Zmc2V0cy5cbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBvZmZzZXRcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzXG4gKiBAYXJndW1lbnQge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IGJhc2VQbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX0gYSB0d28gY2VsbHMgYXJyYXkgd2l0aCB4IGFuZCB5IG9mZnNldHMgaW4gbnVtYmVyc1xuICovXG5mdW5jdGlvbiBwYXJzZU9mZnNldChvZmZzZXQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMsIGJhc2VQbGFjZW1lbnQpIHtcbiAgdmFyIG9mZnNldHMgPSBbMCwgMF07XG5cbiAgLy8gVXNlIGhlaWdodCBpZiBwbGFjZW1lbnQgaXMgbGVmdCBvciByaWdodCBhbmQgaW5kZXggaXMgMCBvdGhlcndpc2UgdXNlIHdpZHRoXG4gIC8vIGluIHRoaXMgd2F5IHRoZSBmaXJzdCBvZmZzZXQgd2lsbCB1c2UgYW4gYXhpcyBhbmQgdGhlIHNlY29uZCBvbmVcbiAgLy8gd2lsbCB1c2UgdGhlIG90aGVyIG9uZVxuICB2YXIgdXNlSGVpZ2h0ID0gWydyaWdodCcsICdsZWZ0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgLy8gU3BsaXQgdGhlIG9mZnNldCBzdHJpbmcgdG8gb2J0YWluIGEgbGlzdCBvZiB2YWx1ZXMgYW5kIG9wZXJhbmRzXG4gIC8vIFRoZSByZWdleCBhZGRyZXNzZXMgdmFsdWVzIHdpdGggdGhlIHBsdXMgb3IgbWludXMgc2lnbiBpbiBmcm9udCAoKzEwLCAtMjAsIGV0YylcbiAgdmFyIGZyYWdtZW50cyA9IG9mZnNldC5zcGxpdCgvKFxcK3xcXC0pLykubWFwKGZ1bmN0aW9uIChmcmFnKSB7XG4gICAgcmV0dXJuIGZyYWcudHJpbSgpO1xuICB9KTtcblxuICAvLyBEZXRlY3QgaWYgdGhlIG9mZnNldCBzdHJpbmcgY29udGFpbnMgYSBwYWlyIG9mIHZhbHVlcyBvciBhIHNpbmdsZSBvbmVcbiAgLy8gdGhleSBjb3VsZCBiZSBzZXBhcmF0ZWQgYnkgY29tbWEgb3Igc3BhY2VcbiAgdmFyIGRpdmlkZXIgPSBmcmFnbWVudHMuaW5kZXhPZihmaW5kKGZyYWdtZW50cywgZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy5zZWFyY2goLyx8XFxzLykgIT09IC0xO1xuICB9KSk7XG5cbiAgaWYgKGZyYWdtZW50c1tkaXZpZGVyXSAmJiBmcmFnbWVudHNbZGl2aWRlcl0uaW5kZXhPZignLCcpID09PSAtMSkge1xuICAgIGNvbnNvbGUud2FybignT2Zmc2V0cyBzZXBhcmF0ZWQgYnkgd2hpdGUgc3BhY2UocykgYXJlIGRlcHJlY2F0ZWQsIHVzZSBhIGNvbW1hICgsKSBpbnN0ZWFkLicpO1xuICB9XG5cbiAgLy8gSWYgZGl2aWRlciBpcyBmb3VuZCwgd2UgZGl2aWRlIHRoZSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHMgdG8gZGl2aWRlXG4gIC8vIHRoZW0gYnkgb2ZzZXQgWCBhbmQgWS5cbiAgdmFyIHNwbGl0UmVnZXggPSAvXFxzKixcXHMqfFxccysvO1xuICB2YXIgb3BzID0gZGl2aWRlciAhPT0gLTEgPyBbZnJhZ21lbnRzLnNsaWNlKDAsIGRpdmlkZXIpLmNvbmNhdChbZnJhZ21lbnRzW2RpdmlkZXJdLnNwbGl0KHNwbGl0UmVnZXgpWzBdXSksIFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMV1dLmNvbmNhdChmcmFnbWVudHMuc2xpY2UoZGl2aWRlciArIDEpKV0gOiBbZnJhZ21lbnRzXTtcblxuICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgd2l0aCB1bml0cyB0byBhYnNvbHV0ZSBwaXhlbHMgdG8gYWxsb3cgb3VyIGNvbXB1dGF0aW9uc1xuICBvcHMgPSBvcHMubWFwKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICAvLyBNb3N0IG9mIHRoZSB1bml0cyByZWx5IG9uIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcG9wcGVyXG4gICAgdmFyIG1lYXN1cmVtZW50ID0gKGluZGV4ID09PSAxID8gIXVzZUhlaWdodCA6IHVzZUhlaWdodCkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG1lcmdlV2l0aFByZXZpb3VzID0gZmFsc2U7XG4gICAgcmV0dXJuIG9wXG4gICAgLy8gVGhpcyBhZ2dyZWdhdGVzIGFueSBgK2Agb3IgYC1gIHNpZ24gdGhhdCBhcmVuJ3QgY29uc2lkZXJlZCBvcGVyYXRvcnNcbiAgICAvLyBlLmcuOiAxMCArICs1ID0+IFsxMCwgKywgKzVdXG4gICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGFbYS5sZW5ndGggLSAxXSA9PT0gJycgJiYgWycrJywgJy0nXS5pbmRleE9mKGIpICE9PSAtMSkge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IHRydWU7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIGlmIChtZXJnZVdpdGhQcmV2aW91cykge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gKz0gYjtcbiAgICAgICAgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgICB9XG4gICAgfSwgW10pXG4gICAgLy8gSGVyZSB3ZSBjb252ZXJ0IHRoZSBzdHJpbmcgdmFsdWVzIGludG8gbnVtYmVyIHZhbHVlcyAoaW4gcHgpXG4gICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gdG9WYWx1ZShzdHIsIG1lYXN1cmVtZW50LCBwb3BwZXJPZmZzZXRzLCByZWZlcmVuY2VPZmZzZXRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gTG9vcCB0cm91Z2ggdGhlIG9mZnNldHMgYXJyYXlzIGFuZCBleGVjdXRlIHRoZSBvcGVyYXRpb25zXG4gIG9wcy5mb3JFYWNoKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICBvcC5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnLCBpbmRleDIpIHtcbiAgICAgIGlmIChpc051bWVyaWMoZnJhZykpIHtcbiAgICAgICAgb2Zmc2V0c1tpbmRleF0gKz0gZnJhZyAqIChvcFtpbmRleDIgLSAxXSA9PT0gJy0nID8gLTEgOiAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEBhcmd1bWVudCB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MFxuICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIG9mZnNldChkYXRhLCBfcmVmKSB7XG4gIHZhciBvZmZzZXQgPSBfcmVmLm9mZnNldDtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LFxuICAgICAgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICB2YXIgb2Zmc2V0cyA9IHZvaWQgMDtcbiAgaWYgKGlzTnVtZXJpYygrb2Zmc2V0KSkge1xuICAgIG9mZnNldHMgPSBbK29mZnNldCwgMF07XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0cyA9IHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyLCByZWZlcmVuY2UsIGJhc2VQbGFjZW1lbnQpO1xuICB9XG5cbiAgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1sxXTtcbiAgfSBlbHNlIGlmIChiYXNlUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgIHBvcHBlci5sZWZ0ICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLnRvcCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMV07XG4gIH1cblxuICBkYXRhLnBvcHBlciA9IHBvcHBlcjtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhLCBvcHRpb25zKSB7XG4gIHZhciBib3VuZGFyaWVzRWxlbWVudCA9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQgfHwgZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcblxuICAvLyBJZiBvZmZzZXRQYXJlbnQgaXMgdGhlIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSByZWFsbHkgd2FudCB0b1xuICAvLyBnbyBvbmUgc3RlcCB1cCBhbmQgdXNlIHRoZSBuZXh0IG9mZnNldFBhcmVudCBhcyByZWZlcmVuY2UgdG9cbiAgLy8gYXZvaWQgdG8gbWFrZSB0aGlzIG1vZGlmaWVyIGNvbXBsZXRlbHkgdXNlbGVzcyBhbmQgbG9vayBsaWtlIGJyb2tlblxuICBpZiAoZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UgPT09IGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgYm91bmRhcmllc0VsZW1lbnQgPSBnZXRPZmZzZXRQYXJlbnQoYm91bmRhcmllc0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc2V0cyB0aGUgcG9wcGVyJ3MgcG9zaXRpb24gc28gdGhhdCB0aGUgZG9jdW1lbnQgc2l6ZSBjYW4gYmUgY2FsY3VsYXRlZCBleGNsdWRpbmdcbiAgLy8gdGhlIHNpemUgb2YgdGhlIHBvcHBlciBlbGVtZW50IGl0c2VsZlxuICB2YXIgdHJhbnNmb3JtUHJvcCA9IGdldFN1cHBvcnRlZFByb3BlcnR5TmFtZSgndHJhbnNmb3JtJyk7XG4gIHZhciBwb3BwZXJTdHlsZXMgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5zdHlsZTsgLy8gYXNzaWdubWVudCB0byBoZWxwIG1pbmlmaWNhdGlvblxuICB2YXIgdG9wID0gcG9wcGVyU3R5bGVzLnRvcCxcbiAgICAgIGxlZnQgPSBwb3BwZXJTdHlsZXMubGVmdCxcbiAgICAgIHRyYW5zZm9ybSA9IHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXTtcblxuICBwb3BwZXJTdHlsZXMudG9wID0gJyc7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gJyc7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9ICcnO1xuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQsIGRhdGEucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxuICBwb3BwZXJTdHlsZXMudG9wID0gdG9wO1xuICBwb3BwZXJTdHlsZXMubGVmdCA9IGxlZnQ7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblxuICBvcHRpb25zLmJvdW5kYXJpZXMgPSBib3VuZGFyaWVzO1xuXG4gIHZhciBvcmRlciA9IG9wdGlvbnMucHJpb3JpdHk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIHZhciBjaGVjayA9IHtcbiAgICBwcmltYXJ5OiBmdW5jdGlvbiBwcmltYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIHZhbHVlID0gcG9wcGVyW3BsYWNlbWVudF07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPCBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KHBvcHBlcltwbGFjZW1lbnRdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5JDEoe30sIHBsYWNlbWVudCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5OiBmdW5jdGlvbiBzZWNvbmRhcnkocGxhY2VtZW50KSB7XG4gICAgICB2YXIgbWFpblNpZGUgPSBwbGFjZW1lbnQgPT09ICdyaWdodCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgIHZhciB2YWx1ZSA9IHBvcHBlclttYWluU2lkZV07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPiBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHBvcHBlclttYWluU2lkZV0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSAtIChwbGFjZW1lbnQgPT09ICdyaWdodCcgPyBwb3BwZXIud2lkdGggOiBwb3BwZXIuaGVpZ2h0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkkMSh7fSwgbWFpblNpZGUsIHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgb3JkZXIuZm9yRWFjaChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgdmFyIHNpZGUgPSBbJ2xlZnQnLCAndG9wJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMSA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknO1xuICAgIHBvcHBlciA9IF9leHRlbmRzJDEoe30sIHBvcHBlciwgY2hlY2tbc2lkZV0ocGxhY2VtZW50KSk7XG4gIH0pO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBwb3BwZXI7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHNoaWZ0KGRhdGEpIHtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgc2hpZnR2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICAvLyBpZiBzaGlmdCBzaGlmdHZhcmlhdGlvbiBpcyBzcGVjaWZpZWQsIHJ1biB0aGUgbW9kaWZpZXJcbiAgaWYgKHNoaWZ0dmFyaWF0aW9uKSB7XG4gICAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcjtcblxuICAgIHZhciBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgdmFyIHNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICAgIHZhciBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogZGVmaW5lUHJvcGVydHkkMSh7fSwgc2lkZSwgcmVmZXJlbmNlW3NpZGVdKSxcbiAgICAgIGVuZDogZGVmaW5lUHJvcGVydHkkMSh7fSwgc2lkZSwgcmVmZXJlbmNlW3NpZGVdICsgcmVmZXJlbmNlW21lYXN1cmVtZW50XSAtIHBvcHBlclttZWFzdXJlbWVudF0pXG4gICAgfTtcblxuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBfZXh0ZW5kcyQxKHt9LCBwb3BwZXIsIHNoaWZ0T2Zmc2V0c1tzaGlmdHZhcmlhdGlvbl0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBoaWRlKGRhdGEpIHtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdoaWRlJywgJ3ByZXZlbnRPdmVyZmxvdycpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgcmVmUmVjdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciBib3VuZCA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAncHJldmVudE92ZXJmbG93JztcbiAgfSkuYm91bmRhcmllcztcblxuICBpZiAocmVmUmVjdC5ib3R0b20gPCBib3VuZC50b3AgfHwgcmVmUmVjdC5sZWZ0ID4gYm91bmQucmlnaHQgfHwgcmVmUmVjdC50b3AgPiBib3VuZC5ib3R0b20gfHwgcmVmUmVjdC5yaWdodCA8IGJvdW5kLmxlZnQpIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBkYXRhLmhpZGUgPSB0cnVlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXZvaWQgdW5uZWNlc3NhcnkgRE9NIGFjY2VzcyBpZiB2aXNpYmlsaXR5IGhhc24ndCBjaGFuZ2VkXG4gICAgaWYgKGRhdGEuaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IGZhbHNlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gaW5uZXIoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNIb3JpeiA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBzdWJ0cmFjdExlbmd0aCA9IFsndG9wJywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID09PSAtMTtcblxuICBwb3BwZXJbaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnXSA9IHJlZmVyZW5jZVtiYXNlUGxhY2VtZW50XSAtIChzdWJ0cmFjdExlbmd0aCA/IHBvcHBlcltpc0hvcml6ID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA6IDApO1xuXG4gIGRhdGEucGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QocG9wcGVyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBNb2RpZmllciBmdW5jdGlvbiwgZWFjaCBtb2RpZmllciBjYW4gaGF2ZSBhIGZ1bmN0aW9uIG9mIHRoaXMgdHlwZSBhc3NpZ25lZFxuICogdG8gaXRzIGBmbmAgcHJvcGVydHkuPGJyIC8+XG4gKiBUaGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQgb24gZWFjaCB1cGRhdGUsIHRoaXMgbWVhbnMgdGhhdCB5b3UgbXVzdFxuICogbWFrZSBzdXJlIHRoZXkgYXJlIHBlcmZvcm1hbnQgZW5vdWdoIHRvIGF2b2lkIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tzLlxuICpcbiAqIEBmdW5jdGlvbiBNb2RpZmllckZuXG4gKiBAYXJndW1lbnQge2RhdGFPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge2RhdGFPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuXG4vKipcbiAqIE1vZGlmaWVycyBhcmUgcGx1Z2lucyB1c2VkIHRvIGFsdGVyIHRoZSBiZWhhdmlvciBvZiB5b3VyIHBvcHBlcnMuPGJyIC8+XG4gKiBQb3BwZXIuanMgdXNlcyBhIHNldCBvZiA5IG1vZGlmaWVycyB0byBwcm92aWRlIGFsbCB0aGUgYmFzaWMgZnVuY3Rpb25hbGl0aWVzXG4gKiBuZWVkZWQgYnkgdGhlIGxpYnJhcnkuXG4gKlxuICogVXN1YWxseSB5b3UgZG9uJ3Qgd2FudCB0byBvdmVycmlkZSB0aGUgYG9yZGVyYCwgYGZuYCBhbmQgYG9uTG9hZGAgcHJvcHMuXG4gKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgYXJlIGNvbmZpZ3VyYXRpb25zIHRoYXQgY291bGQgYmUgdHdlYWtlZC5cbiAqIEBuYW1lc3BhY2UgbW9kaWZpZXJzXG4gKi9cbnZhciBtb2RpZmllcnMgPSB7XG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIHNoaWZ0IHRoZSBwb3BwZXIgb24gdGhlIHN0YXJ0IG9yIGVuZCBvZiBpdHMgcmVmZXJlbmNlXG4gICAqIGVsZW1lbnQuPGJyIC8+XG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgdmFyaWF0aW9uIG9mIHRoZSBgcGxhY2VtZW50YCBwcm9wZXJ0eS48YnIgLz5cbiAgICogSXQgY2FuIGJlIG9uZSBlaXRoZXIgYC1lbmRgIG9yIGAtc3RhcnRgLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgc2hpZnQ6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAxMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBzaGlmdFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgYG9mZnNldGAgbW9kaWZpZXIgY2FuIHNoaWZ0IHlvdXIgcG9wcGVyIG9uIGJvdGggaXRzIGF4aXMuXG4gICAqXG4gICAqIEl0IGFjY2VwdHMgdGhlIGZvbGxvd2luZyB1bml0czpcbiAgICogLSBgcHhgIG9yIHVuaXRsZXNzLCBpbnRlcnByZXRlZCBhcyBwaXhlbHNcbiAgICogLSBgJWAgb3IgYCVyYCwgcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgbGVuZ3RoIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgKiAtIGAlcGAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAgICogLSBgdndgLCBDU1Mgdmlld3BvcnQgd2lkdGggdW5pdFxuICAgKiAtIGB2aGAsIENTUyB2aWV3cG9ydCBoZWlnaHQgdW5pdFxuICAgKlxuICAgKiBGb3IgbGVuZ3RoIGlzIGludGVuZGVkIHRoZSBtYWluIGF4aXMgcmVsYXRpdmUgdG8gdGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wcGVyLjxiciAvPlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIHBsYWNlbWVudCBpcyBgdG9wYCBvciBgYm90dG9tYCwgdGhlIGxlbmd0aCB3aWxsIGJlIHRoZVxuICAgKiBgd2lkdGhgLiBJbiBjYXNlIG9mIGBsZWZ0YCBvciBgcmlnaHRgLCBpdCB3aWxsIGJlIHRoZSBoZWlnaHQuXG4gICAqXG4gICAqIFlvdSBjYW4gcHJvdmlkZSBhIHNpbmdsZSB2YWx1ZSAoYXMgYE51bWJlcmAgb3IgYFN0cmluZ2ApLCBvciBhIHBhaXIgb2YgdmFsdWVzXG4gICAqIGFzIGBTdHJpbmdgIGRpdmlkZWQgYnkgYSBjb21tYSBvciBvbmUgKG9yIG1vcmUpIHdoaXRlIHNwYWNlcy48YnIgLz5cbiAgICogVGhlIGxhdHRlciBpcyBhIGRlcHJlY2F0ZWQgbWV0aG9kIGJlY2F1c2UgaXQgbGVhZHMgdG8gY29uZnVzaW9uIGFuZCB3aWxsIGJlXG4gICAqIHJlbW92ZWQgaW4gdjIuPGJyIC8+XG4gICAqIEFkZGl0aW9uYWxseSwgaXQgYWNjZXB0cyBhZGRpdGlvbnMgYW5kIHN1YnRyYWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCB1bml0cy5cbiAgICogTm90ZSB0aGF0IG11bHRpcGxpY2F0aW9ucyBhbmQgZGl2aXNpb25zIGFyZW4ndCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIFZhbGlkIGV4YW1wbGVzIGFyZTpcbiAgICogYGBgXG4gICAqIDEwXG4gICAqICcxMCUnXG4gICAqICcxMCwgMTAnXG4gICAqICcxMCUsIDEwJ1xuICAgKiAnMTAgKyAxMCUnXG4gICAqICcxMCAtIDV2aCArIDMlJ1xuICAgKiAnLTEwcHggKyA1dmgsIDVweCAtIDYlJ1xuICAgKiBgYGBcbiAgICogPiAqKk5CKio6IElmIHlvdSBkZXNpcmUgdG8gYXBwbHkgb2Zmc2V0cyB0byB5b3VyIHBvcHBlcnMgaW4gYSB3YXkgdGhhdCBtYXkgbWFrZSB0aGVtIG92ZXJsYXBcbiAgICogPiB3aXRoIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50LCB1bmZvcnR1bmF0ZWx5LCB5b3Ugd2lsbCBoYXZlIHRvIGRpc2FibGUgdGhlIGBmbGlwYCBtb2RpZmllci5cbiAgICogPiBNb3JlIG9uIHRoaXMgW3JlYWRpbmcgdGhpcyBpc3N1ZV0oaHR0cHM6Ly9naXRodWIuY29tL0ZlelZyYXN0YS9wb3BwZXIuanMvaXNzdWVzLzM3MylcbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIG9mZnNldDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0yMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDIwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IG9mZnNldCxcbiAgICAvKiogQHByb3Age051bWJlcnxTdHJpbmd9IG9mZnNldD0wXG4gICAgICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gICAgICovXG4gICAgb2Zmc2V0OiAwXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gcHJldmVudCB0aGUgcG9wcGVyIGZyb20gYmVpbmcgcG9zaXRpb25lZCBvdXRzaWRlIHRoZSBib3VuZGFyeS5cbiAgICpcbiAgICogQW4gc2NlbmFyaW8gZXhpc3RzIHdoZXJlIHRoZSByZWZlcmVuY2UgaXRzZWxmIGlzIG5vdCB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuPGJyIC8+XG4gICAqIFdlIGNhbiBzYXkgaXQgaGFzIFwiZXNjYXBlZCB0aGUgYm91bmRhcmllc1wiIOKAlCBvciBqdXN0IFwiZXNjYXBlZFwiLjxiciAvPlxuICAgKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBkZWNpZGUgd2hldGhlciB0aGUgcG9wcGVyIHNob3VsZCBlaXRoZXI6XG4gICAqXG4gICAqIC0gZGV0YWNoIGZyb20gdGhlIHJlZmVyZW5jZSBhbmQgcmVtYWluIFwidHJhcHBlZFwiIGluIHRoZSBib3VuZGFyaWVzLCBvclxuICAgKiAtIGlmIGl0IHNob3VsZCBpZ25vcmUgdGhlIGJvdW5kYXJ5IGFuZCBcImVzY2FwZSB3aXRoIGl0cyByZWZlcmVuY2VcIlxuICAgKlxuICAgKiBXaGVuIGBlc2NhcGVXaXRoUmVmZXJlbmNlYCBpcyBzZXQgdG9gdHJ1ZWAgYW5kIHJlZmVyZW5jZSBpcyBjb21wbGV0ZWx5XG4gICAqIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMsIHRoZSBwb3BwZXIgd2lsbCBvdmVyZmxvdyAob3IgY29tcGxldGVseSBsZWF2ZSlcbiAgICogdGhlIGJvdW5kYXJpZXMgaW4gb3JkZXIgdG8gcmVtYWluIGF0dGFjaGVkIHRvIHRoZSBlZGdlIG9mIHRoZSByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MzAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAzMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBwcmV2ZW50T3ZlcmZsb3csXG4gICAgLyoqXG4gICAgICogQHByb3Age0FycmF5fSBbcHJpb3JpdHk9WydsZWZ0JywncmlnaHQnLCd0b3AnLCdib3R0b20nXV1cbiAgICAgKiBQb3BwZXIgd2lsbCB0cnkgdG8gcHJldmVudCBvdmVyZmxvdyBmb2xsb3dpbmcgdGhlc2UgcHJpb3JpdGllcyBieSBkZWZhdWx0LFxuICAgICAqIHRoZW4sIGl0IGNvdWxkIG92ZXJmbG93IG9uIHRoZSBsZWZ0IGFuZCBvbiB0b3Agb2YgdGhlIGBib3VuZGFyaWVzRWxlbWVudGBcbiAgICAgKi9cbiAgICBwcmlvcml0eTogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBBbW91bnQgb2YgcGl4ZWwgdXNlZCB0byBkZWZpbmUgYSBtaW5pbXVtIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgKiBhbmQgdGhlIHBvcHBlciB0aGlzIG1ha2VzIHN1cmUgdGhlIHBvcHBlciBoYXMgYWx3YXlzIGEgbGl0dGxlIHBhZGRpbmdcbiAgICAgKiBiZXR3ZWVuIHRoZSBlZGdlcyBvZiBpdHMgY29udGFpbmVyXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0nc2Nyb2xsUGFyZW50J1xuICAgICAqIEJvdW5kYXJpZXMgdXNlZCBieSB0aGUgbW9kaWZpZXIsIGNhbiBiZSBgc2Nyb2xsUGFyZW50YCwgYHdpbmRvd2AsXG4gICAgICogYHZpZXdwb3J0YCBvciBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgYW5kIGl0cyBwb3BwZXIgc3RheSBuZWFyIGVhY2hvdGhlcnNcbiAgICogd2l0aG91dCBsZWF2aW5nIGFueSBnYXAgYmV0d2VlbiB0aGUgdHdvLiBFeHBlY2lhbGx5IHVzZWZ1bCB3aGVuIHRoZSBhcnJvdyBpc1xuICAgKiBlbmFibGVkIGFuZCB5b3Ugd2FudCB0byBhc3N1cmUgaXQgdG8gcG9pbnQgdG8gaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBJdCBjYXJlcyBvbmx5IGFib3V0IHRoZSBmaXJzdCBheGlzLCB5b3UgY2FuIHN0aWxsIGhhdmUgcG9wcGVycyB3aXRoIG1hcmdpblxuICAgKiBiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGtlZXBUb2dldGhlcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj00MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDQwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGtlZXBUb2dldGhlclxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIG1vZGlmaWVyIGlzIHVzZWQgdG8gbW92ZSB0aGUgYGFycm93RWxlbWVudGAgb2YgdGhlIHBvcHBlciB0byBtYWtlXG4gICAqIHN1cmUgaXQgaXMgcG9zaXRpb25lZCBiZXR3ZWVuIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIHBvcHBlciBlbGVtZW50LlxuICAgKiBJdCB3aWxsIHJlYWQgdGhlIG91dGVyIHNpemUgb2YgdGhlIGBhcnJvd0VsZW1lbnRgIG5vZGUgdG8gZGV0ZWN0IGhvdyBtYW55XG4gICAqIHBpeGVscyBvZiBjb25qdWN0aW9uIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEl0IGhhcyBubyBlZmZlY3QgaWYgbm8gYGFycm93RWxlbWVudGAgaXMgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcnJvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj01MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDUwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFycm93LFxuICAgIC8qKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBlbGVtZW50PSdbeC1hcnJvd10nIC0gU2VsZWN0b3Igb3Igbm9kZSB1c2VkIGFzIGFycm93ICovXG4gICAgZWxlbWVudDogJ1t4LWFycm93XSdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBmbGlwIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQgd2hlbiBpdCBzdGFydHMgdG8gb3ZlcmxhcCBpdHNcbiAgICogcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICpcbiAgICogKipOT1RFOioqIHRoaXMgbW9kaWZpZXIgd2lsbCBpbnRlcnJ1cHQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlIGFuZCB3aWxsXG4gICAqIHJlc3RhcnQgaXQgaWYgaXQgZGV0ZWN0cyB0aGUgbmVlZCB0byBmbGlwIHRoZSBwbGFjZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBmbGlwOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTYwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogZmxpcCxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEFycmF5fSBiZWhhdmlvcj0nZmxpcCdcbiAgICAgKiBUaGUgYmVoYXZpb3IgdXNlZCB0byBjaGFuZ2UgdGhlIHBvcHBlcidzIHBsYWNlbWVudC4gSXQgY2FuIGJlIG9uZSBvZlxuICAgICAqIGBmbGlwYCwgYGNsb2Nrd2lzZWAsIGBjb3VudGVyY2xvY2t3aXNlYCBvciBhbiBhcnJheSB3aXRoIGEgbGlzdCBvZiB2YWxpZFxuICAgICAqIHBsYWNlbWVudHMgKHdpdGggb3B0aW9uYWwgdmFyaWF0aW9ucykuXG4gICAgICovXG4gICAgYmVoYXZpb3I6ICdmbGlwJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgZmxpcCBpZiBpdCBoaXRzIHRoZSBlZGdlcyBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHBhZGRpbmc6IDUsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQ9J3ZpZXdwb3J0J1xuICAgICAqIFRoZSBlbGVtZW50IHdoaWNoIHdpbGwgZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwb3BwZXIgcG9zaXRpb24sXG4gICAgICogdGhlIHBvcHBlciB3aWxsIG5ldmVyIGJlIHBsYWNlZCBvdXRzaWRlIG9mIHRoZSBkZWZpbmVkIGJvdW5kYXJpZXNcbiAgICAgKiAoZXhjZXB0IGlmIGtlZXBUb2dldGhlciBpcyBlbmFibGVkKVxuICAgICAqL1xuICAgIGJvdW5kYXJpZXNFbGVtZW50OiAndmlld3BvcnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSB0aGUgcG9wcGVyIGZsb3cgdG93YXJkIHRoZSBpbm5lciBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEJ5IGRlZmF1bHQsIHdoZW4gdGhpcyBtb2RpZmllciBpcyBkaXNhYmxlZCwgdGhlIHBvcHBlciB3aWxsIGJlIHBsYWNlZCBvdXRzaWRlXG4gICAqIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGlubmVyOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTcwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNzAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD1mYWxzZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBpbm5lclxuICB9LFxuXG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIGhpZGUgdGhlIHBvcHBlciB3aGVuIGl0cyByZWZlcmVuY2UgZWxlbWVudCBpcyBvdXRzaWRlIG9mIHRoZVxuICAgKiBwb3BwZXIgYm91bmRhcmllcy4gSXQgd2lsbCBzZXQgYSBgeC1vdXQtb2YtYm91bmRhcmllc2AgYXR0cmlidXRlIHdoaWNoIGNhblxuICAgKiBiZSB1c2VkIHRvIGhpZGUgd2l0aCBhIENTUyBzZWxlY3RvciB0aGUgcG9wcGVyIHdoZW4gaXRzIHJlZmVyZW5jZSBpc1xuICAgKiBvdXQgb2YgYm91bmRhcmllcy5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIG1vZGlmaWVyIGJlZm9yZSBpdCBpbiBvcmRlciB0byB3b3JrLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgaGlkZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj04MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDgwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGhpZGVcbiAgfSxcblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHN0eWxlIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgZWxlbWVudCB0byBnZXRzXG4gICAqIHByb3Blcmx5IHBvc2l0aW9uZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIG1vZGlmaWVyIHdpbGwgbm90IHRvdWNoIHRoZSBET00sIGl0IGp1c3QgcHJlcGFyZXMgdGhlIHN0eWxlc1xuICAgKiBzbyB0aGF0IGBhcHBseVN0eWxlYCBtb2RpZmllciBjYW4gYXBwbHkgaXQuIFRoaXMgc2VwYXJhdGlvbiBpcyB1c2VmdWxcbiAgICogaW4gY2FzZSB5b3UgbmVlZCB0byByZXBsYWNlIGBhcHBseVN0eWxlYCB3aXRoIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1vZGlmaWVyIGhhcyBgODUwYCBhcyBgb3JkZXJgIHZhbHVlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICogd2l0aCBwcmV2aW91cyB2ZXJzaW9ucyBvZiBQb3BwZXIuanMuIEV4cGVjdCB0aGUgbW9kaWZpZXJzIG9yZGVyaW5nIG1ldGhvZFxuICAgKiB0byBjaGFuZ2UgaW4gZnV0dXJlIG1ham9yIHZlcnNpb25zIG9mIHRoZSBsaWJyYXJ5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgY29tcHV0ZVN0eWxlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTg1MCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogODUwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogY29tcHV0ZVN0eWxlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtCb29sZWFufSBncHVBY2NlbGVyYXRpb249dHJ1ZVxuICAgICAqIElmIHRydWUsIGl0IHVzZXMgdGhlIENTUyAzZCB0cmFuc2Zvcm1hdGlvbiB0byBwb3NpdGlvbiB0aGUgcG9wcGVyLlxuICAgICAqIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGB0b3BgIGFuZCBgbGVmdGAgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBncHVBY2NlbGVyYXRpb246IHRydWUsXG4gICAgLyoqXG4gICAgICogQHByb3Age3N0cmluZ30gW3g9J2JvdHRvbSddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBYIGF4aXMgKGBib3R0b21gIG9yIGB0b3BgKS4gQUtBIFggb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgYm90dG9tYFxuICAgICAqL1xuICAgIHg6ICdib3R0b20nLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdsZWZ0J11cbiAgICAgKiBXaGVyZSB0byBhbmNob3IgdGhlIFkgYXhpcyAoYGxlZnRgIG9yIGByaWdodGApLiBBS0EgWSBvZmZzZXQgb3JpZ2luLlxuICAgICAqIENoYW5nZSB0aGlzIGlmIHlvdXIgcG9wcGVyIHNob3VsZCBncm93IGluIGEgZGlyZWN0aW9uIGRpZmZlcmVudCBmcm9tIGByaWdodGBcbiAgICAgKi9cbiAgICB5OiAncmlnaHQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgcG9wcGVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgYXJlIGxpbWl0ZWQgdG8gdGhpcyBtb2RpZmllci4gVGhpcyBpcyB1c2VmdWwgaW4gY2FzZVxuICAgKiB5b3Ugd2FudCB0byBpbnRlZ3JhdGUgUG9wcGVyLmpzIGluc2lkZSBhIGZyYW1ld29yayBvciB2aWV3IGxpYnJhcnkgYW5kIHlvdVxuICAgKiB3YW50IHRvIGRlbGVnYXRlIGFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgdG8gaXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzYWJsZSB0aGlzIG1vZGlmaWVyLCB5b3UgbXVzdCBtYWtlIHN1cmUgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIGhhcyBpdHMgcG9zaXRpb24gc2V0IHRvIGBhYnNvbHV0ZWAgYmVmb3JlIFBvcHBlci5qcyBjYW4gZG8gaXRzIHdvcmshXG4gICAqXG4gICAqIEp1c3QgZGlzYWJsZSB0aGlzIG1vZGlmaWVyIGFuZCBkZWZpbmUgeW91IG93biB0byBhY2hpZXZlIHRoZSBkZXNpcmVkIGVmZmVjdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGFwcGx5U3R5bGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9OTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA5MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBhcHBseVN0eWxlLFxuICAgIC8qKiBAcHJvcCB7RnVuY3Rpb259ICovXG4gICAgb25Mb2FkOiBhcHBseVN0eWxlT25Mb2FkLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS4xMC4wLCB0aGUgcHJvcGVydHkgbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXJcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZ3B1QWNjZWxlcmF0aW9uPXRydWVcbiAgICAgKiBJZiB0cnVlLCBpdCB1c2VzIHRoZSBDU1MgM2QgdHJhbnNmb3JtYXRpb24gdG8gcG9zaXRpb24gdGhlIHBvcHBlci5cbiAgICAgKiBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB1bmRlZmluZWRcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYGRhdGFPYmplY3RgIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb25zIHVzZWQgYnkgUG9wcGVyLmpzXG4gKiB0aGlzIG9iamVjdCBnZXQgcGFzc2VkIHRvIG1vZGlmaWVycyBhbmQgdG8gdGhlIGBvbkNyZWF0ZWAgYW5kIGBvblVwZGF0ZWAgY2FsbGJhY2tzLlxuICogQG5hbWUgZGF0YU9iamVjdFxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuaW5zdGFuY2UgVGhlIFBvcHBlci5qcyBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEucGxhY2VtZW50IFBsYWNlbWVudCBhcHBsaWVkIHRvIHBvcHBlclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgUGxhY2VtZW50IG9yaWdpbmFsbHkgZGVmaW5lZCBvbiBpbml0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRhdGEuZmxpcHBlZCBUcnVlIGlmIHBvcHBlciBoYXMgYmVlbiBmbGlwcGVkIGJ5IGZsaXAgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5oaWRlIFRydWUgaWYgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dCBvZiBib3VuZGFyaWVzLCB1c2VmdWwgdG8ga25vdyB3aGVuIHRvIGhpZGUgdGhlIHBvcHBlci5cbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGEuYXJyb3dFbGVtZW50IE5vZGUgdXNlZCBhcyBhcnJvdyBieSBhcnJvdyBtb2RpZmllclxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuc3R5bGVzIEFueSBDU1MgcHJvcGVydHkgZGVmaW5lZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLCBpdCBleHBlY3RzIHRoZSBKYXZhU2NyaXB0IG5vbWVuY2xhdHVyZSAoZWcuIGBtYXJnaW5Cb3R0b21gKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuYXJyb3dTdHlsZXMgQW55IENTUyBwcm9wZXJ0eSBkZWZpbmVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgYXJyb3csIGl0IGV4cGVjdHMgdGhlIEphdmFTY3JpcHQgbm9tZW5jbGF0dXJlIChlZy4gYG1hcmdpbkJvdHRvbWApXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5ib3VuZGFyaWVzIE9mZnNldHMgb2YgdGhlIHBvcHBlciBib3VuZGFyaWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzIFRoZSBtZWFzdXJlbWVudHMgb2YgcG9wcGVyLCByZWZlcmVuY2UgYW5kIGFycm93IGVsZW1lbnRzLlxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5wb3BwZXIgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSBgdG9wYCwgYGxlZnRgLCBgd2lkdGhgLCBgaGVpZ2h0YCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMuYXJyb3ddIGB0b3BgIGFuZCBgbGVmdGAgb2Zmc2V0cywgb25seSBvbmUgb2YgdGhlbSB3aWxsIGJlIGRpZmZlcmVudCBmcm9tIDBcbiAqL1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBwcm92aWRlZCB0byBQb3BwZXIuanMgY29uc3RydWN0b3IuPGJyIC8+XG4gKiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGVuIHVzaW5nIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQgb2YgUG9wcGVyLmpzLjxiciAvPlxuICogVG8gb3ZlcnJpZGUgYW4gb3B0aW9uLCBzaW1wbHkgcGFzcyBhcyAzcmQgYXJndW1lbnQgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWVcbiAqIHN0cnVjdHVyZSBvZiB0aGlzIG9iamVjdCwgZXhhbXBsZTpcbiAqIGBgYFxuICogbmV3IFBvcHBlcihyZWYsIHBvcCwge1xuICogICBtb2RpZmllcnM6IHtcbiAqICAgICBwcmV2ZW50T3ZlcmZsb3c6IHsgZW5hYmxlZDogZmFsc2UgfVxuICogICB9XG4gKiB9KVxuICogYGBgXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG52YXIgRGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBQb3BwZXIncyBwbGFjZW1lbnRcbiAgICogQHByb3Age1BvcHBlci5wbGFjZW1lbnRzfSBwbGFjZW1lbnQ9J2JvdHRvbSdcbiAgICovXG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgcG9wcGVyIHRvIHBvc2l0aW9uIGl0IHNlbGYgaW4gJ2ZpeGVkJyBtb2RlXG4gICAqIEBwcm9wIHtCb29sZWFufSBwb3NpdGlvbkZpeGVkPWZhbHNlXG4gICAqL1xuICBwb3NpdGlvbkZpeGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogV2hldGhlciBldmVudHMgKHJlc2l6ZSwgc2Nyb2xsKSBhcmUgaW5pdGlhbGx5IGVuYWJsZWRcbiAgICogQHByb3Age0Jvb2xlYW59IGV2ZW50c0VuYWJsZWQ9dHJ1ZVxuICAgKi9cbiAgZXZlbnRzRW5hYmxlZDogdHJ1ZSxcblxuICAvKipcbiAgICogU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSByZW1vdmUgdGhlIHBvcHBlciB3aGVuXG4gICAqIHlvdSBjYWxsIHRoZSBgZGVzdHJveWAgbWV0aG9kLlxuICAgKiBAcHJvcCB7Qm9vbGVhbn0gcmVtb3ZlT25EZXN0cm95PWZhbHNlXG4gICAqL1xuICByZW1vdmVPbkRlc3Ryb3k6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIGNyZWF0ZWQuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uQ3JlYXRlfVxuICAgKi9cbiAgb25DcmVhdGU6IGZ1bmN0aW9uIG9uQ3JlYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBwb3BwZXIgaXMgdXBkYXRlZCwgdGhpcyBjYWxsYmFjayBpcyBub3QgY2FsbGVkXG4gICAqIG9uIHRoZSBpbml0aWFsaXphdGlvbi9jcmVhdGlvbiBvZiB0aGUgcG9wcGVyLCBidXQgb25seSBvbiBzdWJzZXF1ZW50XG4gICAqIHVwZGF0ZXMuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uVXBkYXRlfVxuICAgKi9cbiAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kaWZpZXJzIHVzZWQgdG8gbW9kaWZ5IHRoZSBvZmZzZXRzIGJlZm9yZSB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuXG4gICAqIFRoZXkgcHJvdmlkZSBtb3N0IG9mIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgUG9wcGVyLmpzXG4gICAqIEBwcm9wIHttb2RpZmllcnN9XG4gICAqL1xuICBtb2RpZmllcnM6IG1vZGlmaWVyc1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgb25DcmVhdGVcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIG9uVXBkYXRlXG4gKiBAcGFyYW0ge2RhdGFPYmplY3R9IGRhdGFcbiAqL1xuXG4vLyBVdGlsc1xuLy8gTWV0aG9kc1xudmFyIFBvcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBQb3BwZXIuanMgaW5zdGFuY2VcbiAgICogQGNsYXNzIFBvcHBlclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fHJlZmVyZW5jZU9iamVjdH0gcmVmZXJlbmNlIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcG9zaXRpb24gdGhlIHBvcHBlclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFlvdXIgY3VzdG9tIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIG9uZXMgZGVmaW5lZCBpbiBbRGVmYXVsdHNdKCNkZWZhdWx0cylcbiAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZSAtIFRoZSBnZW5lcmF0ZWQgUG9wcGVyLmpzIGluc3RhbmNlXG4gICAqL1xuICBmdW5jdGlvbiBQb3BwZXIocmVmZXJlbmNlLCBwb3BwZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrJDEodGhpcywgUG9wcGVyKTtcblxuICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLnVwZGF0ZSk7XG4gICAgfTtcblxuICAgIC8vIG1ha2UgdXBkYXRlKCkgZGVib3VuY2VkLCBzbyB0aGF0IGl0IG9ubHkgcnVucyBhdCBtb3N0IG9uY2UtcGVyLXRpY2tcbiAgICB0aGlzLnVwZGF0ZSA9IGRlYm91bmNlKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgLy8gd2l0aCB7fSB3ZSBjcmVhdGUgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG9wdGlvbnMgaW5zaWRlIGl0XG4gICAgdGhpcy5vcHRpb25zID0gX2V4dGVuZHMkMSh7fSwgUG9wcGVyLkRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIC8vIGluaXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgIHNjcm9sbFBhcmVudHM6IFtdXG4gICAgfTtcblxuICAgIC8vIGdldCByZWZlcmVuY2UgYW5kIHBvcHBlciBlbGVtZW50cyAoYWxsb3cgalF1ZXJ5IHdyYXBwZXJzKVxuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlICYmIHJlZmVyZW5jZS5qcXVlcnkgPyByZWZlcmVuY2VbMF0gOiByZWZlcmVuY2U7XG4gICAgdGhpcy5wb3BwZXIgPSBwb3BwZXIgJiYgcG9wcGVyLmpxdWVyeSA/IHBvcHBlclswXSA6IHBvcHBlcjtcblxuICAgIC8vIERlZXAgbWVyZ2UgbW9kaWZpZXJzIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMubW9kaWZpZXJzID0ge307XG4gICAgT2JqZWN0LmtleXMoX2V4dGVuZHMkMSh7fSwgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVycywgb3B0aW9ucy5tb2RpZmllcnMpKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSA9IF9leHRlbmRzJDEoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnNbbmFtZV0gfHwge30sIG9wdGlvbnMubW9kaWZpZXJzID8gb3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gOiB7fSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWZhY3RvcmluZyBtb2RpZmllcnMnIGxpc3QgKE9iamVjdCA9PiBBcnJheSlcbiAgICB0aGlzLm1vZGlmaWVycyA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5tb2RpZmllcnMpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIF9leHRlbmRzJDEoe1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9LCBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSk7XG4gICAgfSlcbiAgICAvLyBzb3J0IHRoZSBtb2RpZmllcnMgYnkgb3JkZXJcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEub3JkZXIgLSBiLm9yZGVyO1xuICAgIH0pO1xuXG4gICAgLy8gbW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSB3aGVuIFBvcHBlci5qcyBnZXQgaW5pdGVkXG4gICAgLy8gc3VjaCBjb2RlIGlzIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIG9mIGl0cyBtb2RpZmllclxuICAgIC8vIHRoZXkgY291bGQgYWRkIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZWlyIG9wdGlvbnMgY29uZmlndXJhdGlvblxuICAgIC8vIEJFIEFXQVJFOiBkb24ndCBhZGQgb3B0aW9ucyB0byBgb3B0aW9ucy5tb2RpZmllcnMubmFtZWAgYnV0IHRvIGBtb2RpZmllck9wdGlvbnNgIVxuICAgIHRoaXMubW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyT3B0aW9ucykge1xuICAgICAgaWYgKG1vZGlmaWVyT3B0aW9ucy5lbmFibGVkICYmIGlzRnVuY3Rpb24obW9kaWZpZXJPcHRpb25zLm9uTG9hZCkpIHtcbiAgICAgICAgbW9kaWZpZXJPcHRpb25zLm9uTG9hZChfdGhpcy5yZWZlcmVuY2UsIF90aGlzLnBvcHBlciwgX3RoaXMub3B0aW9ucywgbW9kaWZpZXJPcHRpb25zLCBfdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIHRoZSBmaXJzdCB1cGRhdGUgdG8gcG9zaXRpb24gdGhlIHBvcHBlciBpbiB0aGUgcmlnaHQgcGxhY2VcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgdmFyIGV2ZW50c0VuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZXZlbnRzRW5hYmxlZDtcbiAgICBpZiAoZXZlbnRzRW5hYmxlZCkge1xuICAgICAgLy8gc2V0dXAgZXZlbnQgbGlzdGVuZXJzLCB0aGV5IHdpbGwgdGFrZSBjYXJlIG9mIHVwZGF0ZSB0aGUgcG9zaXRpb24gaW4gc3BlY2lmaWMgc2l0dWF0aW9uc1xuICAgICAgdGhpcy5lbmFibGVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGV2ZW50c0VuYWJsZWQ7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgY2xhc3MgcHJvcGVydGllcyBiZWNhdXNlIHRoZXkgZG9uJ3QgZ2V0IGxpc3RlZCBpbiB0aGVcbiAgLy8gY2xhc3MgcHJvdG90eXBlIGFuZCBicmVhayBzdHVmZiBsaWtlIFNpbm9uIHN0dWJzXG5cblxuICBjcmVhdGVDbGFzcyQxKFBvcHBlciwgW3tcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUkJDEoKSB7XG4gICAgICByZXR1cm4gdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3kkJDEoKSB7XG4gICAgICByZXR1cm4gZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZUV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlRXZlbnRMaXN0ZW5lcnMkJDEoKSB7XG4gICAgICByZXR1cm4gZW5hYmxlRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlRXZlbnRMaXN0ZW5lcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlRXZlbnRMaXN0ZW5lcnMkJDEoKSB7XG4gICAgICByZXR1cm4gZGlzYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NoZWR1bGUgYW4gdXBkYXRlLCBpdCB3aWxsIHJ1biBvbiB0aGUgbmV4dCBVSSB1cGRhdGUgYXZhaWxhYmxlXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdXRpbGl0aWVzIHVzZWZ1bCB3aGVuIHdyaXRpbmcgY3VzdG9tIG1vZGlmaWVycy5cbiAgICAgKiBTdGFydGluZyBmcm9tIHZlcnNpb24gMS43LCB0aGlzIG1ldGhvZCBpcyBhdmFpbGFibGUgb25seSBpZiB5b3VcbiAgICAgKiBpbmNsdWRlIGBwb3BwZXItdXRpbHMuanNgIGJlZm9yZSBgcG9wcGVyLmpzYC5cbiAgICAgKlxuICAgICAqICoqREVQUkVDQVRJT04qKjogVGhpcyB3YXkgdG8gYWNjZXNzIFBvcHBlclV0aWxzIGlzIGRlcHJlY2F0ZWRcbiAgICAgKiBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHYyISBVc2UgdGhlIFBvcHBlclV0aWxzIG1vZHVsZSBkaXJlY3RseSBpbnN0ZWFkLlxuICAgICAqIER1ZSB0byB0aGUgaGlnaCBpbnN0YWJpbGl0eSBvZiB0aGUgbWV0aG9kcyBjb250YWluZWQgaW4gVXRpbHMsIHdlIGNhbid0XG4gICAgICogZ3VhcmFudGVlIHRoZW0gdG8gZm9sbG93IHNlbXZlci4gVXNlIHRoZW0gYXQgeW91ciBvd24gcmlzayFcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS44XG4gICAgICogQG1lbWJlciBVdGlsc1xuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuICB9XSk7XG4gIHJldHVybiBQb3BwZXI7XG59KCk7XG5cbi8qKlxuICogVGhlIGByZWZlcmVuY2VPYmplY3RgIGlzIGFuIG9iamVjdCB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSBjb21wYXRpYmxlIHdpdGggUG9wcGVyLmpzXG4gKiBhbmQgbGV0cyB5b3UgdXNlIGl0IGFzIHJlcGxhY2VtZW50IG9mIGEgcmVhbCBET00gbm9kZS48YnIgLz5cbiAqIFlvdSBjYW4gdXNlIHRoaXMgbWV0aG9kIHRvIHBvc2l0aW9uIGEgcG9wcGVyIHJlbGF0aXZlbHkgdG8gYSBzZXQgb2YgY29vcmRpbmF0ZXNcbiAqIGluIGNhc2UgeW91IGRvbid0IGhhdmUgYSBET00gbm9kZSB0byB1c2UgYXMgcmVmZXJlbmNlLlxuICpcbiAqIGBgYFxuICogbmV3IFBvcHBlcihyZWZlcmVuY2VPYmplY3QsIHBvcHBlck5vZGUpO1xuICogYGBgXG4gKlxuICogTkI6IFRoaXMgZmVhdHVyZSBpc24ndCBzdXBwb3J0ZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTBcbiAqIEBuYW1lIHJlZmVyZW5jZU9iamVjdFxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZGF0YS5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc2V0IG9mIGNvb3JkaW5hdGVzIGNvbXBhdGlibGUgd2l0aCB0aGUgbmF0aXZlIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIG1ldGhvZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudFdpZHRoXG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIHdpZHRoIG9mIHRoZSB2aXJ0dWFsIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEuY2xpZW50SGVpZ2h0XG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqL1xuXG5Qb3BwZXIuVXRpbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpLlBvcHBlclV0aWxzO1xuUG9wcGVyLnBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuUG9wcGVyLkRlZmF1bHRzID0gRGVmYXVsdHM7XG5cbi8qKlxuICogVHJpZ2dlcnMgZG9jdW1lbnQgcmVmbG93LlxuICogVXNlIHZvaWQgYmVjYXVzZSBzb21lIG1pbmlmaWVycyBvciBlbmdpbmVzIHRoaW5rIHNpbXBseSBhY2Nlc3NpbmcgdGhlIHByb3BlcnR5XG4gKiBpcyB1bm5lY2Vzc2FyeS5cbiAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIHJlZmxvdyhwb3BwZXIpIHtcbiAgdm9pZCBwb3BwZXIub2Zmc2V0SGVpZ2h0O1xufVxuXG4vKipcbiAqIFdyYXBwZXIgdXRpbCBmb3IgcG9wcGVyIHBvc2l0aW9uIHVwZGF0aW5nLlxuICogVXBkYXRlcyB0aGUgcG9wcGVyJ3MgcG9zaXRpb24gYW5kIGludm9rZXMgdGhlIGNhbGxiYWNrIG9uIHVwZGF0ZS5cbiAqIEhhY2tpc2ggd29ya2Fyb3VuZCB1bnRpbCBQb3BwZXIgMi4wJ3MgdXBkYXRlKCkgYmVjb21lcyBzeW5jLlxuICogQHBhcmFtIHtQb3BwZXJ9IHBvcHBlckluc3RhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjazogdG8gcnVuIG9uY2UgcG9wcGVyJ3MgcG9zaXRpb24gd2FzIHVwZGF0ZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXBkYXRlQWxyZWFkeUNhbGxlZDogd2FzIHNjaGVkdWxlVXBkYXRlKCkgYWxyZWFkeSBjYWxsZWQ/XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvcHBlclBvc2l0aW9uKHBvcHBlckluc3RhbmNlLCBjYWxsYmFjaywgdXBkYXRlQWxyZWFkeUNhbGxlZCkge1xuICB2YXIgcG9wcGVyID0gcG9wcGVySW5zdGFuY2UucG9wcGVyLFxuICAgICAgb3B0aW9ucyA9IHBvcHBlckluc3RhbmNlLm9wdGlvbnM7XG5cbiAgdmFyIG9uQ3JlYXRlID0gb3B0aW9ucy5vbkNyZWF0ZTtcbiAgdmFyIG9uVXBkYXRlID0gb3B0aW9ucy5vblVwZGF0ZTtcblxuICBvcHRpb25zLm9uQ3JlYXRlID0gb3B0aW9ucy5vblVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZWZsb3cocG9wcGVyKSwgY2FsbGJhY2sgJiYgY2FsbGJhY2soKSwgb25VcGRhdGUoKTtcbiAgICBvcHRpb25zLm9uQ3JlYXRlID0gb25DcmVhdGU7XG4gICAgb3B0aW9ucy5vblVwZGF0ZSA9IG9uVXBkYXRlO1xuICB9O1xuXG4gIGlmICghdXBkYXRlQWxyZWFkeUNhbGxlZCkge1xuICAgIHBvcHBlckluc3RhbmNlLnNjaGVkdWxlVXBkYXRlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb3JlIHBsYWNlbWVudCAoJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcpIG9mIGEgcG9wcGVyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHBvcHBlclxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRQb3BwZXJQbGFjZW1lbnQocG9wcGVyKSB7XG4gIHJldHVybiBwb3BwZXIuZ2V0QXR0cmlidXRlKCd4LXBsYWNlbWVudCcpLnJlcGxhY2UoLy0uKy8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBtb3VzZSdzIGN1cnNvciBpcyBvdXRzaWRlIHRoZSBpbnRlcmFjdGl2ZSBib3JkZXJcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY3Vyc29ySXNPdXRzaWRlSW50ZXJhY3RpdmVCb3JkZXIoZXZlbnQsIHBvcHBlciwgb3B0aW9ucykge1xuICBpZiAoIXBvcHBlci5nZXRBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50JykpIHJldHVybiB0cnVlO1xuXG4gIHZhciB4ID0gZXZlbnQuY2xpZW50WCxcbiAgICAgIHkgPSBldmVudC5jbGllbnRZO1xuICB2YXIgaW50ZXJhY3RpdmVCb3JkZXIgPSBvcHRpb25zLmludGVyYWN0aXZlQm9yZGVyLFxuICAgICAgZGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlO1xuXG5cbiAgdmFyIHJlY3QgPSBwb3BwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBwbGFjZW1lbnQgPSBnZXRQb3BwZXJQbGFjZW1lbnQocG9wcGVyKTtcbiAgdmFyIGJvcmRlcldpdGhEaXN0YW5jZSA9IGludGVyYWN0aXZlQm9yZGVyICsgZGlzdGFuY2U7XG5cbiAgdmFyIGV4Y2VlZHMgPSB7XG4gICAgdG9wOiByZWN0LnRvcCAtIHkgPiBpbnRlcmFjdGl2ZUJvcmRlcixcbiAgICBib3R0b206IHkgLSByZWN0LmJvdHRvbSA+IGludGVyYWN0aXZlQm9yZGVyLFxuICAgIGxlZnQ6IHJlY3QubGVmdCAtIHggPiBpbnRlcmFjdGl2ZUJvcmRlcixcbiAgICByaWdodDogeCAtIHJlY3QucmlnaHQgPiBpbnRlcmFjdGl2ZUJvcmRlclxuICB9O1xuXG4gIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIGV4Y2VlZHMudG9wID0gcmVjdC50b3AgLSB5ID4gYm9yZGVyV2l0aERpc3RhbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIGV4Y2VlZHMuYm90dG9tID0geSAtIHJlY3QuYm90dG9tID4gYm9yZGVyV2l0aERpc3RhbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICBleGNlZWRzLmxlZnQgPSByZWN0LmxlZnQgLSB4ID4gYm9yZGVyV2l0aERpc3RhbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgZXhjZWVkcy5yaWdodCA9IHggLSByZWN0LnJpZ2h0ID4gYm9yZGVyV2l0aERpc3RhbmNlO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gZXhjZWVkcy50b3AgfHwgZXhjZWVkcy5ib3R0b20gfHwgZXhjZWVkcy5sZWZ0IHx8IGV4Y2VlZHMucmlnaHQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgYGFycm93VHJhbnNmb3JtYCBudW1iZXJzIGJhc2VkIG9uIHRoZSBwbGFjZW1lbnQgYXhpc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgJ3NjYWxlJyBvciAndHJhbnNsYXRlJ1xuICogQHBhcmFtIHtOdW1iZXJbXX0gbnVtYmVyc1xuICogQHBhcmFtIHtCb29sZWFufSBpc1ZlcnRpY2FsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzUmV2ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1OdW1iZXJzQmFzZWRPblBsYWNlbWVudEF4aXModHlwZSwgbnVtYmVycywgaXNWZXJ0aWNhbCwgaXNSZXZlcnNlKSB7XG4gIGlmICghbnVtYmVycy5sZW5ndGgpIHJldHVybiAnJztcblxuICB2YXIgdHJhbnNmb3JtcyA9IHtcbiAgICBzY2FsZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKG51bWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiAnJyArIG51bWJlcnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNWZXJ0aWNhbCA/IG51bWJlcnNbMF0gKyAnLCAnICsgbnVtYmVyc1sxXSA6IG51bWJlcnNbMV0gKyAnLCAnICsgbnVtYmVyc1swXTtcbiAgICAgIH1cbiAgICB9KCksXG4gICAgdHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAobnVtYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGlzUmV2ZXJzZSA/IC1udW1iZXJzWzBdICsgJ3B4JyA6IG51bWJlcnNbMF0gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgICByZXR1cm4gaXNSZXZlcnNlID8gbnVtYmVyc1swXSArICdweCwgJyArIC1udW1iZXJzWzFdICsgJ3B4JyA6IG51bWJlcnNbMF0gKyAncHgsICcgKyBudW1iZXJzWzFdICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaXNSZXZlcnNlID8gLW51bWJlcnNbMV0gKyAncHgsICcgKyBudW1iZXJzWzBdICsgJ3B4JyA6IG51bWJlcnNbMV0gKyAncHgsICcgKyBudW1iZXJzWzBdICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0oKVxuICB9O1xuXG4gIHJldHVybiB0cmFuc2Zvcm1zW3R5cGVdO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIGBhcnJvd1RyYW5zZm9ybWAgeCBvciB5IGF4aXMgYmFzZWQgb24gdGhlIHBsYWNlbWVudCBheGlzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXhpcyAnWCcsICdZJywgJydcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNWZXJ0aWNhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1BeGlzKGF4aXMsIGlzVmVydGljYWwpIHtcbiAgaWYgKCFheGlzKSByZXR1cm4gJyc7XG4gIHZhciBtYXAgPSB7XG4gICAgWDogJ1knLFxuICAgIFk6ICdYJ1xuICB9O1xuICByZXR1cm4gaXNWZXJ0aWNhbCA/IGF4aXMgOiBtYXBbYXhpc107XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgYW5kIGFwcGxpZXMgdGhlIG5lY2Vzc2FyeSBhcnJvdyB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFycm93XG4gKiBAcGFyYW0ge1N0cmluZ30gYXJyb3dUcmFuc2Zvcm1cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUFycm93VHJhbnNmb3JtKHBvcHBlciwgYXJyb3csIGFycm93VHJhbnNmb3JtKSB7XG4gIHZhciBwbGFjZW1lbnQgPSBnZXRQb3BwZXJQbGFjZW1lbnQocG9wcGVyKTtcbiAgdmFyIGlzVmVydGljYWwgPSBwbGFjZW1lbnQgPT09ICd0b3AnIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbSc7XG4gIHZhciBpc1JldmVyc2UgPSBwbGFjZW1lbnQgPT09ICdyaWdodCcgfHwgcGxhY2VtZW50ID09PSAnYm90dG9tJztcblxuICB2YXIgZ2V0QXhpcyA9IGZ1bmN0aW9uIGdldEF4aXMocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSBhcnJvd1RyYW5zZm9ybS5tYXRjaChyZSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbiAgfTtcblxuICB2YXIgZ2V0TnVtYmVycyA9IGZ1bmN0aW9uIGdldE51bWJlcnMocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSBhcnJvd1RyYW5zZm9ybS5tYXRjaChyZSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0uc3BsaXQoJywnKS5tYXAocGFyc2VGbG9hdCkgOiBbXTtcbiAgfTtcblxuICB2YXIgcmUgPSB7XG4gICAgdHJhbnNsYXRlOiAvdHJhbnNsYXRlWD9ZP1xcKChbXildKylcXCkvLFxuICAgIHNjYWxlOiAvc2NhbGVYP1k/XFwoKFteKV0rKVxcKS9cbiAgfTtcblxuICB2YXIgbWF0Y2hlcyA9IHtcbiAgICB0cmFuc2xhdGU6IHtcbiAgICAgIGF4aXM6IGdldEF4aXMoL3RyYW5zbGF0ZShbWFldKS8pLFxuICAgICAgbnVtYmVyczogZ2V0TnVtYmVycyhyZS50cmFuc2xhdGUpXG4gICAgfSxcbiAgICBzY2FsZToge1xuICAgICAgYXhpczogZ2V0QXhpcygvc2NhbGUoW1hZXSkvKSxcbiAgICAgIG51bWJlcnM6IGdldE51bWJlcnMocmUuc2NhbGUpXG4gICAgfVxuICB9O1xuXG4gIHZhciBjb21wdXRlZFRyYW5zZm9ybSA9IGFycm93VHJhbnNmb3JtLnJlcGxhY2UocmUudHJhbnNsYXRlLCAndHJhbnNsYXRlJyArIHRyYW5zZm9ybUF4aXMobWF0Y2hlcy50cmFuc2xhdGUuYXhpcywgaXNWZXJ0aWNhbCkgKyAnKCcgKyB0cmFuc2Zvcm1OdW1iZXJzQmFzZWRPblBsYWNlbWVudEF4aXMoJ3RyYW5zbGF0ZScsIG1hdGNoZXMudHJhbnNsYXRlLm51bWJlcnMsIGlzVmVydGljYWwsIGlzUmV2ZXJzZSkgKyAnKScpLnJlcGxhY2UocmUuc2NhbGUsICdzY2FsZScgKyB0cmFuc2Zvcm1BeGlzKG1hdGNoZXMuc2NhbGUuYXhpcywgaXNWZXJ0aWNhbCkgKyAnKCcgKyB0cmFuc2Zvcm1OdW1iZXJzQmFzZWRPblBsYWNlbWVudEF4aXMoJ3NjYWxlJywgbWF0Y2hlcy5zY2FsZS5udW1iZXJzLCBpc1ZlcnRpY2FsLCBpc1JldmVyc2UpICsgJyknKTtcblxuICBhcnJvdy5zdHlsZVtwcmVmaXgoJ3RyYW5zZm9ybScpXSA9IGNvbXB1dGVkVHJhbnNmb3JtO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpc3RhbmNlIHRha2luZyBpbnRvIGFjY291bnQgdGhlIGRlZmF1bHQgZGlzdGFuY2UgZHVlIHRvXG4gKiB0aGUgdHJhbnNmb3JtOiB0cmFuc2xhdGUgc2V0dGluZyBpbiBDU1NcbiAqIEBwYXJhbSB7TnVtYmVyfSBkaXN0YW5jZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRPZmZzZXREaXN0YW5jZUluUHgoZGlzdGFuY2UpIHtcbiAgcmV0dXJuIC0oZGlzdGFuY2UgLSBkZWZhdWx0cy5kaXN0YW5jZSkgKyAncHgnO1xufVxuXG4vKipcbiAqIFdhaXRzIHVudGlsIG5leHQgcmVwYWludCB0byBleGVjdXRlIGEgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGRlZmVyKGZuKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dChmbiwgMSk7XG4gIH0pO1xufVxuXG52YXIgbWF0Y2hlcyA9IHt9O1xuXG5pZiAoaXNCcm93c2VyKSB7XG4gIHZhciBlID0gRWxlbWVudC5wcm90b3R5cGU7XG4gIG1hdGNoZXMgPSBlLm1hdGNoZXMgfHwgZS5tYXRjaGVzU2VsZWN0b3IgfHwgZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZS5tc01hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiAocykge1xuICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpO1xuICAgIHZhciBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gdGhpcykge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxuICAgIHJldHVybiBpID4gLTE7XG4gIH07XG59XG5cbnZhciBtYXRjaGVzJDEgPSBtYXRjaGVzO1xuXG4vKipcbiAqIFBvbnlmaWxsIHRvIGdldCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gY2hpbGQgb2YgcGFyZW50IHRvIGJlIHJldHVybmVkXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50U2VsZWN0b3IgLSBzZWxlY3RvciB0byBtYXRjaCB0aGUgcGFyZW50IGlmIGZvdW5kXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHBhcmVudFNlbGVjdG9yKSB7XG4gIHZhciBmbiA9IEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgfHwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgdmFyIGVsID0gdGhpcztcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIGlmIChtYXRjaGVzJDEuY2FsbChlbCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGZuLmNhbGwoZWxlbWVudCwgcGFyZW50U2VsZWN0b3IpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHZhbHVlIGJlaW5nIGVpdGhlciBhIG51bWJlciBvciBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IHZhbHVlXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUodmFsdWUsIGluZGV4KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlW2luZGV4XSA6IHZhbHVlO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgYW4gZWxlbWVudCBmb3IgdHJhbnNpdGlvbiB0byBiZWdpblxuICogQHBhcmFtIHtFbGVtZW50W119IGVscyAtIGFycmF5IG9mIGVsZW1lbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtICd2aXNpYmxlJyBvciAnaGlkZGVuJ1xuICovXG5mdW5jdGlvbiBzZXRWaXNpYmlsaXR5U3RhdGUoZWxzLCB0eXBlKSB7XG4gIGVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCB0eXBlKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgdHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBlYWNoIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudFtdfSBlbHMgLSBBcnJheSBvZiBlbGVtZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGFwcGx5VHJhbnNpdGlvbkR1cmF0aW9uKGVscywgdmFsdWUpIHtcbiAgZWxzLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGVsLnN0eWxlW3ByZWZpeCgndHJhbnNpdGlvbkR1cmF0aW9uJyldID0gdmFsdWUgKyAnbXMnO1xuICB9KTtcbn1cblxuLyoqXG4gKiBGb2N1c2VzIGFuIGVsZW1lbnQgd2hpbGUgcHJldmVudGluZyBhIHNjcm9sbCBqdW1wIGlmIGl0J3Mgbm90IGVudGlyZWx5IHdpdGhpbiB0aGUgdmlld3BvcnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqL1xuZnVuY3Rpb24gZm9jdXMoZWwpIHtcbiAgdmFyIHggPSB3aW5kb3cuc2Nyb2xsWCB8fCB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gIHZhciB5ID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICBlbC5mb2N1cygpO1xuICBzY3JvbGwoeCwgeSk7XG59XG5cbnZhciBrZXkgPSB7fTtcbnZhciBzdG9yZSA9IGZ1bmN0aW9uIHN0b3JlKGRhdGEpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChrKSB7XG4gICAgcmV0dXJuIGsgPT09IGtleSAmJiBkYXRhO1xuICB9O1xufTtcblxudmFyIFRpcHB5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUaXBweShjb25maWcpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBUaXBweSk7XG5cbiAgICBmb3IgKHZhciBfa2V5IGluIGNvbmZpZykge1xuICAgICAgdGhpc1tfa2V5XSA9IGNvbmZpZ1tfa2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLl8gPSBzdG9yZSh7XG4gICAgICBtdXRhdGlvbk9ic2VydmVyczogW11cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSB0b29sdGlwIHRvIGFsbG93IGl0IHRvIHNob3cgb3IgaGlkZVxuICAgKiBAbWVtYmVyb2YgVGlwcHlcbiAgICogQHB1YmxpY1xuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKFRpcHB5LCBbe1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHRoaXMuc3RhdGUuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHRvb2x0aXAgZnJvbSBzaG93aW5nIG9yIGhpZGluZywgYnV0IGRvZXMgbm90IGRlc3Ryb3kgaXRcbiAgICAgKiBAbWVtYmVyb2YgVGlwcHlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdGhpcy5zdGF0ZS5lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHRvb2x0aXBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXG4gICAgICogQG1lbWJlcm9mIFRpcHB5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdyhkdXJhdGlvbikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuc3RhdGUuZGVzdHJveWVkIHx8ICF0aGlzLnN0YXRlLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgdmFyIHBvcHBlciA9IHRoaXMucG9wcGVyLFxuICAgICAgICAgIHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlLFxuICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgIHZhciBfZ2V0SW5uZXJFbGVtZW50cyA9IGdldElubmVyRWxlbWVudHMocG9wcGVyKSxcbiAgICAgICAgICB0b29sdGlwID0gX2dldElubmVyRWxlbWVudHMudG9vbHRpcCxcbiAgICAgICAgICBiYWNrZHJvcCA9IF9nZXRJbm5lckVsZW1lbnRzLmJhY2tkcm9wLFxuICAgICAgICAgIGNvbnRlbnQgPSBfZ2V0SW5uZXJFbGVtZW50cy5jb250ZW50O1xuXG4gICAgICAvLyBJZiB0aGUgYGR5bmFtaWNUaXRsZWAgb3B0aW9uIGlzIHRydWUsIHRoZSBpbnN0YW5jZSBpcyBhbGxvd2VkXG4gICAgICAvLyB0byBiZSBjcmVhdGVkIHdpdGggYW4gZW1wdHkgdGl0bGUuIE1ha2Ugc3VyZSB0aGF0IHRoZSB0b29sdGlwXG4gICAgICAvLyBjb250ZW50IGlzIG5vdCBlbXB0eSBiZWZvcmUgc2hvd2luZyBpdFxuXG5cbiAgICAgIGlmIChvcHRpb25zLmR5bmFtaWNUaXRsZSAmJiAhcmVmZXJlbmNlLmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90IHNob3cgdG9vbHRpcCBpZiByZWZlcmVuY2UgY29udGFpbnMgJ2Rpc2FibGVkJyBhdHRyaWJ1dGUuIEZGIGZpeCBmb3IgIzIyMVxuICAgICAgaWYgKHJlZmVyZW5jZS5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgLy8gRGVzdHJveSB0b29sdGlwIGlmIHRoZSByZWZlcmVuY2UgZWxlbWVudCBpcyBubyBsb25nZXIgb24gdGhlIERPTVxuICAgICAgaWYgKCFyZWZlcmVuY2UucmVmT2JqICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMocmVmZXJlbmNlKSkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLm9uU2hvdy5jYWxsKHBvcHBlciwgdGhpcyk7XG5cbiAgICAgIGR1cmF0aW9uID0gZ2V0VmFsdWUoZHVyYXRpb24gIT09IHVuZGVmaW5lZCA/IGR1cmF0aW9uIDogb3B0aW9ucy5kdXJhdGlvbiwgMCk7XG5cbiAgICAgIC8vIFByZXZlbnQgYSB0cmFuc2l0aW9uIHdoZW4gcG9wcGVyIGNoYW5nZXMgcG9zaXRpb25cbiAgICAgIGFwcGx5VHJhbnNpdGlvbkR1cmF0aW9uKFtwb3BwZXIsIHRvb2x0aXAsIGJhY2tkcm9wXSwgMCk7XG5cbiAgICAgIHBvcHBlci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgdGhpcy5zdGF0ZS52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgX21vdW50LmNhbGwodGhpcywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90aGlzLnN0YXRlLnZpc2libGUpIHJldHVybjtcblxuICAgICAgICBpZiAoIV9oYXNGb2xsb3dDdXJzb3JCZWhhdmlvci5jYWxsKF90aGlzKSkge1xuICAgICAgICAgIC8vIEZJWDogQXJyb3cgd2lsbCBzb21ldGltZXMgbm90IGJlIHBvc2l0aW9uZWQgY29ycmVjdGx5LiBGb3JjZSBhbm90aGVyIHVwZGF0ZS5cbiAgICAgICAgICBfdGhpcy5wb3BwZXJJbnN0YW5jZS5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IGluaXRpYWwgcG9zaXRpb24gbmVhciB0aGUgY3Vyc29yXG4gICAgICAgIGlmIChfaGFzRm9sbG93Q3Vyc29yQmVoYXZpb3IuY2FsbChfdGhpcykpIHtcbiAgICAgICAgICBfdGhpcy5wb3BwZXJJbnN0YW5jZS5kaXNhYmxlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICB2YXIgZGVsYXkgPSBnZXRWYWx1ZShvcHRpb25zLmRlbGF5LCAwKTtcbiAgICAgICAgICB2YXIgbGFzdFRyaWdnZXJFdmVudCA9IF90aGlzLl8oa2V5KS5sYXN0VHJpZ2dlckV2ZW50O1xuICAgICAgICAgIGlmIChsYXN0VHJpZ2dlckV2ZW50KSB7XG4gICAgICAgICAgICBfdGhpcy5fKGtleSkuZm9sbG93Q3Vyc29yTGlzdGVuZXIoZGVsYXkgJiYgX3RoaXMuXyhrZXkpLmxhc3RNb3VzZU1vdmVFdmVudCA/IF90aGlzLl8oa2V5KS5sYXN0TW91c2VNb3ZlRXZlbnQgOiBsYXN0VHJpZ2dlckV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZS1hcHBseSB0cmFuc2l0aW9uIGR1cmF0aW9uc1xuICAgICAgICBhcHBseVRyYW5zaXRpb25EdXJhdGlvbihbdG9vbHRpcCwgYmFja2Ryb3AsIGJhY2tkcm9wID8gY29udGVudCA6IG51bGxdLCBkdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKGJhY2tkcm9wKSB7XG4gICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShiYWNrZHJvcClbcHJlZml4KCd0cmFuc2Zvcm0nKV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xuICAgICAgICAgIHJlZmVyZW5jZS5jbGFzc0xpc3QuYWRkKCd0aXBweS1hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnN0aWNreSkge1xuICAgICAgICAgIF9tYWtlU3RpY2t5LmNhbGwoX3RoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmlzaWJpbGl0eVN0YXRlKFt0b29sdGlwLCBiYWNrZHJvcF0sICd2aXNpYmxlJyk7XG5cbiAgICAgICAgX29uVHJhbnNpdGlvbkVuZC5jYWxsKF90aGlzLCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy51cGRhdGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCd0aXBweS1ub3RyYW5zaXRpb24nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xuICAgICAgICAgICAgZm9jdXMocG9wcGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWZlcmVuY2Uuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgJ3RpcHB5LScgKyBfdGhpcy5pZCk7XG5cbiAgICAgICAgICBvcHRpb25zLm9uU2hvd24uY2FsbChwb3BwZXIsIF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgdG9vbHRpcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiBAbWVtYmVyb2YgVGlwcHlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKGR1cmF0aW9uKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuc3RhdGUuZGVzdHJveWVkIHx8ICF0aGlzLnN0YXRlLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgdmFyIHBvcHBlciA9IHRoaXMucG9wcGVyLFxuICAgICAgICAgIHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlLFxuICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgIHZhciBfZ2V0SW5uZXJFbGVtZW50czIgPSBnZXRJbm5lckVsZW1lbnRzKHBvcHBlciksXG4gICAgICAgICAgdG9vbHRpcCA9IF9nZXRJbm5lckVsZW1lbnRzMi50b29sdGlwLFxuICAgICAgICAgIGJhY2tkcm9wID0gX2dldElubmVyRWxlbWVudHMyLmJhY2tkcm9wLFxuICAgICAgICAgIGNvbnRlbnQgPSBfZ2V0SW5uZXJFbGVtZW50czIuY29udGVudDtcblxuICAgICAgb3B0aW9ucy5vbkhpZGUuY2FsbChwb3BwZXIsIHRoaXMpO1xuXG4gICAgICBkdXJhdGlvbiA9IGdldFZhbHVlKGR1cmF0aW9uICE9PSB1bmRlZmluZWQgPyBkdXJhdGlvbiA6IG9wdGlvbnMuZHVyYXRpb24sIDEpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudXBkYXRlRHVyYXRpb24pIHtcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0aXBweS1ub3RyYW5zaXRpb24nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcbiAgICAgICAgcmVmZXJlbmNlLmNsYXNzTGlzdC5yZW1vdmUoJ3RpcHB5LWFjdGl2ZScpO1xuICAgICAgfVxuXG4gICAgICBwb3BwZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgdGhpcy5zdGF0ZS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgIGFwcGx5VHJhbnNpdGlvbkR1cmF0aW9uKFt0b29sdGlwLCBiYWNrZHJvcCwgYmFja2Ryb3AgPyBjb250ZW50IDogbnVsbF0sIGR1cmF0aW9uKTtcblxuICAgICAgc2V0VmlzaWJpbGl0eVN0YXRlKFt0b29sdGlwLCBiYWNrZHJvcF0sICdoaWRkZW4nKTtcblxuICAgICAgaWYgKG9wdGlvbnMuaW50ZXJhY3RpdmUgJiYgb3B0aW9ucy50cmlnZ2VyLmluZGV4T2YoJ2NsaWNrJykgPiAtMSkge1xuICAgICAgICBmb2N1cyhyZWZlcmVuY2UpO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgKiBUaGlzIGNhbGwgaXMgZGVmZXJyZWQgYmVjYXVzZSBzb21ldGltZXMgd2hlbiB0aGUgdG9vbHRpcCBpcyBzdGlsbCB0cmFuc2l0aW9uaW5nIGluIGJ1dCBoaWRlKClcbiAgICAgICogaXMgY2FsbGVkIGJlZm9yZSBpdCBmaW5pc2hlcywgdGhlIENTUyB0cmFuc2l0aW9uIHdvbid0IHJldmVyc2UgcXVpY2tseSBlbm91Z2gsIG1lYW5pbmdcbiAgICAgICogdGhlIENTUyB0cmFuc2l0aW9uIHdpbGwgZmluaXNoIDEtMiBmcmFtZXMgbGF0ZXIsIGFuZCBvbkhpZGRlbigpIHdpbGwgcnVuIHNpbmNlIHRoZSBKUyBzZXQgaXRcbiAgICAgICogbW9yZSBxdWlja2x5LiBJdCBzaG91bGQgYWN0dWFsbHkgYmUgb25TaG93bigpLiBTZWVtcyB0byBiZSBzb21ldGhpbmcgQ2hyb21lIGRvZXMsIG5vdCBTYWZhcmlcbiAgICAgICovXG4gICAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9vblRyYW5zaXRpb25FbmQuY2FsbChfdGhpczIsIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5zdGF0ZS52aXNpYmxlIHx8ICFvcHRpb25zLmFwcGVuZFRvLmNvbnRhaW5zKHBvcHBlcikpIHJldHVybjtcblxuICAgICAgICAgIGlmICghX3RoaXMyLl8oa2V5KS5pc1ByZXBhcmluZ1RvU2hvdykge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMyLl8oa2V5KS5mb2xsb3dDdXJzb3JMaXN0ZW5lcik7XG4gICAgICAgICAgICBfdGhpczIuXyhrZXkpLmxhc3RNb3VzZU1vdmVFdmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF90aGlzMi5wb3BwZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgX3RoaXMyLnBvcHBlckluc3RhbmNlLmRpc2FibGVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlZmVyZW5jZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcblxuICAgICAgICAgIG9wdGlvbnMuYXBwZW5kVG8ucmVtb3ZlQ2hpbGQocG9wcGVyKTtcblxuICAgICAgICAgIG9wdGlvbnMub25IaWRkZW4uY2FsbChwb3BwZXIsIF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveXMgdGhlIHRvb2x0aXAgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlc3Ryb3lUYXJnZXRJbnN0YW5jZXMgLSByZWxldmFudCBvbmx5IHdoZW4gZGVzdHJveWluZyBkZWxlZ2F0ZXNcbiAgICAgKiBAbWVtYmVyb2YgVGlwcHlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBkZXN0cm95VGFyZ2V0SW5zdGFuY2VzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5kZXN0cm95ZWQpIHJldHVybjtcblxuICAgICAgLy8gRW5zdXJlIHRoZSBwb3BwZXIgaXMgaGlkZGVuXG4gICAgICBpZiAodGhpcy5zdGF0ZS52aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgX3RoaXMzLnJlZmVyZW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyLmV2ZW50LCBsaXN0ZW5lci5oYW5kbGVyKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZXN0b3JlIHRpdGxlXG4gICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICB0aGlzLnJlZmVyZW5jZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy50aXRsZSk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSB0aGlzLnJlZmVyZW5jZS5fdGlwcHk7XG5cbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gWydkYXRhLW9yaWdpbmFsLXRpdGxlJywgJ2RhdGEtdGlwcHknLCAnZGF0YS10aXBweS1kZWxlZ2F0ZSddO1xuICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIF90aGlzMy5yZWZlcmVuY2UucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0ICYmIGRlc3Ryb3lUYXJnZXRJbnN0YW5jZXMpIHtcbiAgICAgICAgdG9BcnJheSh0aGlzLnJlZmVyZW5jZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy50YXJnZXQpKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5fdGlwcHkgJiYgY2hpbGQuX3RpcHB5LmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvcHBlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl8oa2V5KS5tdXRhdGlvbk9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVGlwcHk7XG59KCk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQcml2YXRlIG1ldGhvZHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU3RhbmRhbG9uZSBmdW5jdGlvbnMgdG8gYmUgY2FsbGVkIHdpdGggdGhlIGluc3RhbmNlJ3MgYHRoaXNgIGNvbnRleHQgdG8gbWFrZVxuICogdGhlbSB0cnVseSBwcml2YXRlIGFuZCBub3QgYWNjZXNzaWJsZSBvbiB0aGUgcHJvdG90eXBlXG4gKi9cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSB0b29sdGlwIGluc3RhbmNlIGhhcyBmb2xsb3dDdXJzb3IgYmVoYXZpb3JcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAbWVtYmVyb2YgVGlwcHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9oYXNGb2xsb3dDdXJzb3JCZWhhdmlvcigpIHtcbiAgdmFyIGxhc3RUcmlnZ2VyRXZlbnQgPSB0aGlzLl8oa2V5KS5sYXN0VHJpZ2dlckV2ZW50O1xuICByZXR1cm4gdGhpcy5vcHRpb25zLmZvbGxvd0N1cnNvciAmJiAhYnJvd3Nlci51c2luZ1RvdWNoICYmIGxhc3RUcmlnZ2VyRXZlbnQgJiYgbGFzdFRyaWdnZXJFdmVudC50eXBlICE9PSAnZm9jdXMnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIFRpcHB5IGluc3RhbmNlIGZvciB0aGUgY2hpbGQgdGFyZ2V0IG9mIHRoZSBkZWxlZ2F0ZSBjb250YWluZXJcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAbWVtYmVyb2YgVGlwcHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9jcmVhdGVEZWxlZ2F0ZUNoaWxkVGlwcHkoZXZlbnQpIHtcbiAgdmFyIHRhcmdldEVsID0gY2xvc2VzdChldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy50YXJnZXQpO1xuICBpZiAodGFyZ2V0RWwgJiYgIXRhcmdldEVsLl90aXBweSkge1xuICAgIHZhciB0aXRsZSA9IHRhcmdldEVsLmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCB0aGlzLnRpdGxlO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgIHRpcHB5KHRhcmdldEVsLCBfZXh0ZW5kcyh7fSwgdGhpcy5vcHRpb25zLCB7IHRhcmdldDogbnVsbCB9KSk7XG4gICAgICBfZW50ZXIuY2FsbCh0YXJnZXRFbC5fdGlwcHksIGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNZXRob2QgdXNlZCBieSBldmVudCBsaXN0ZW5lcnMgdG8gaW52b2tlIHRoZSBzaG93IG1ldGhvZCwgdGFraW5nIGludG8gYWNjb3VudCBkZWxheXMgYW5kXG4gKiB0aGUgYHdhaXRgIG9wdGlvblxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBtZW1iZXJvZiBUaXBweVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2VudGVyKGV2ZW50KSB7XG4gIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG5cbiAgX2NsZWFyRGVsYXlUaW1lb3V0cy5jYWxsKHRoaXMpO1xuXG4gIGlmICh0aGlzLnN0YXRlLnZpc2libGUpIHJldHVybjtcblxuICAvLyBJcyBhIGRlbGVnYXRlLCBjcmVhdGUgVGlwcHkgaW5zdGFuY2UgZm9yIHRoZSBjaGlsZCB0YXJnZXRcbiAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgX2NyZWF0ZURlbGVnYXRlQ2hpbGRUaXBweS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl8oa2V5KS5pc1ByZXBhcmluZ1RvU2hvdyA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMud2FpdCkge1xuICAgIG9wdGlvbnMud2FpdC5jYWxsKHRoaXMucG9wcGVyLCB0aGlzLnNob3cuYmluZCh0aGlzKSwgZXZlbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHRoZSB0b29sdGlwIGhhcyBhIGRlbGF5LCB3ZSBuZWVkIHRvIGJlIGxpc3RlbmluZyB0byB0aGUgbW91c2Vtb3ZlIGFzIHNvb24gYXMgdGhlIHRyaWdnZXJcbiAgLy8gZXZlbnQgaXMgZmlyZWQgc28gdGhhdCBpdCdzIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIHVwb24gbW91bnQuXG4gIGlmIChfaGFzRm9sbG93Q3Vyc29yQmVoYXZpb3IuY2FsbCh0aGlzKSkge1xuICAgIGlmICghdGhpcy5fKGtleSkuZm9sbG93Q3Vyc29yTGlzdGVuZXIpIHtcbiAgICAgIF9zZXRGb2xsb3dDdXJzb3JMaXN0ZW5lci5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHZhciBfZ2V0SW5uZXJFbGVtZW50czMgPSBnZXRJbm5lckVsZW1lbnRzKHRoaXMucG9wcGVyKSxcbiAgICAgICAgYXJyb3cgPSBfZ2V0SW5uZXJFbGVtZW50czMuYXJyb3c7XG5cbiAgICBpZiAoYXJyb3cpIGFycm93LnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl8oa2V5KS5mb2xsb3dDdXJzb3JMaXN0ZW5lcik7XG4gIH1cblxuICB2YXIgZGVsYXkgPSBnZXRWYWx1ZShvcHRpb25zLmRlbGF5LCAwKTtcblxuICBpZiAoZGVsYXkpIHtcbiAgICB0aGlzLl8oa2V5KS5zaG93VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXM0LnNob3coKTtcbiAgICB9LCBkZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zaG93KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXRob2QgdXNlZCBieSBldmVudCBsaXN0ZW5lcnMgdG8gaW52b2tlIHRoZSBoaWRlIG1ldGhvZCwgdGFraW5nIGludG8gYWNjb3VudCBkZWxheXNcbiAqIEBtZW1iZXJvZiBUaXBweVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2xlYXZlKCkge1xuICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICBfY2xlYXJEZWxheVRpbWVvdXRzLmNhbGwodGhpcyk7XG5cbiAgaWYgKCF0aGlzLnN0YXRlLnZpc2libGUpIHJldHVybjtcblxuICB0aGlzLl8oa2V5KS5pc1ByZXBhcmluZ1RvU2hvdyA9IGZhbHNlO1xuXG4gIHZhciBkZWxheSA9IGdldFZhbHVlKHRoaXMub3B0aW9ucy5kZWxheSwgMSk7XG5cbiAgaWYgKGRlbGF5KSB7XG4gICAgdGhpcy5fKGtleSkuaGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdGhpczUuc3RhdGUudmlzaWJsZSkge1xuICAgICAgICBfdGhpczUuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sIGRlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgcmVsZXZhbnQgbGlzdGVuZXJzIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gb2YgbGlzdGVuZXJzXG4gKiBAbWVtYmVyb2YgVGlwcHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9nZXRFdmVudExpc3RlbmVycygpIHtcbiAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgdmFyIG9uVHJpZ2dlciA9IGZ1bmN0aW9uIG9uVHJpZ2dlcihldmVudCkge1xuICAgIGlmICghX3RoaXM2LnN0YXRlLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzaG91bGRTdG9wRXZlbnQgPSBicm93c2VyLnN1cHBvcnRzVG91Y2ggJiYgYnJvd3Nlci51c2luZ1RvdWNoICYmIFsnbW91c2VlbnRlcicsICdtb3VzZW92ZXInLCAnZm9jdXMnXS5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTE7XG5cbiAgICBpZiAoc2hvdWxkU3RvcEV2ZW50ICYmIF90aGlzNi5vcHRpb25zLnRvdWNoSG9sZCkgcmV0dXJuO1xuXG4gICAgX3RoaXM2Ll8oa2V5KS5sYXN0VHJpZ2dlckV2ZW50ID0gZXZlbnQ7XG5cbiAgICAvLyBUb2dnbGUgc2hvdy9oaWRlIHdoZW4gY2xpY2tpbmcgY2xpY2stdHJpZ2dlcmVkIHRvb2x0aXBzXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiYgX3RoaXM2Lm9wdGlvbnMuaGlkZU9uQ2xpY2sgIT09ICdwZXJzaXN0ZW50JyAmJiBfdGhpczYuc3RhdGUudmlzaWJsZSkge1xuICAgICAgX2xlYXZlLmNhbGwoX3RoaXM2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2VudGVyLmNhbGwoX3RoaXM2LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBvbk1vdXNlTGVhdmUgPSBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICBpZiAoWydtb3VzZWxlYXZlJywgJ21vdXNlb3V0J10uaW5kZXhPZihldmVudC50eXBlKSA+IC0xICYmIGJyb3dzZXIuc3VwcG9ydHNUb3VjaCAmJiBicm93c2VyLnVzaW5nVG91Y2ggJiYgX3RoaXM2Lm9wdGlvbnMudG91Y2hIb2xkKSByZXR1cm47XG5cbiAgICBpZiAoX3RoaXM2Lm9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHZhciBoaWRlID0gX2xlYXZlLmJpbmQoX3RoaXM2KTtcblxuICAgICAgdmFyIG9uTW91c2VNb3ZlID0gZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgdmFyIHJlZmVyZW5jZUN1cnNvcklzT3ZlciA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBzZWxlY3RvcnMuUkVGRVJFTkNFKTtcbiAgICAgICAgdmFyIGN1cnNvcklzT3ZlclBvcHBlciA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBzZWxlY3RvcnMuUE9QUEVSKSA9PT0gX3RoaXM2LnBvcHBlcjtcbiAgICAgICAgdmFyIGN1cnNvcklzT3ZlclJlZmVyZW5jZSA9IHJlZmVyZW5jZUN1cnNvcklzT3ZlciA9PT0gX3RoaXM2LnJlZmVyZW5jZTtcblxuICAgICAgICBpZiAoY3Vyc29ySXNPdmVyUG9wcGVyIHx8IGN1cnNvcklzT3ZlclJlZmVyZW5jZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChjdXJzb3JJc091dHNpZGVJbnRlcmFjdGl2ZUJvcmRlcihldmVudCwgX3RoaXM2LnBvcHBlciwgX3RoaXM2Lm9wdGlvbnMpKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaGlkZSk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuXG4gICAgICAgICAgX2xlYXZlLmNhbGwoX3RoaXM2LCBvbk1vdXNlTW92ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhpZGUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9sZWF2ZS5jYWxsKF90aGlzNik7XG4gIH07XG5cbiAgdmFyIG9uQmx1ciA9IGZ1bmN0aW9uIG9uQmx1cihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgIT09IF90aGlzNi5yZWZlcmVuY2UgfHwgYnJvd3Nlci51c2luZ1RvdWNoKSByZXR1cm47XG5cbiAgICBpZiAoX3RoaXM2Lm9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIGlmICghZXZlbnQucmVsYXRlZFRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKGNsb3Nlc3QoZXZlbnQucmVsYXRlZFRhcmdldCwgc2VsZWN0b3JzLlBPUFBFUikpIHJldHVybjtcbiAgICB9XG5cbiAgICBfbGVhdmUuY2FsbChfdGhpczYpO1xuICB9O1xuXG4gIHZhciBvbkRlbGVnYXRlU2hvdyA9IGZ1bmN0aW9uIG9uRGVsZWdhdGVTaG93KGV2ZW50KSB7XG4gICAgaWYgKGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBfdGhpczYub3B0aW9ucy50YXJnZXQpKSB7XG4gICAgICBfZW50ZXIuY2FsbChfdGhpczYsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG9uRGVsZWdhdGVIaWRlID0gZnVuY3Rpb24gb25EZWxlZ2F0ZUhpZGUoZXZlbnQpIHtcbiAgICBpZiAoY2xvc2VzdChldmVudC50YXJnZXQsIF90aGlzNi5vcHRpb25zLnRhcmdldCkpIHtcbiAgICAgIF9sZWF2ZS5jYWxsKF90aGlzNik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb25UcmlnZ2VyOiBvblRyaWdnZXIsXG4gICAgb25Nb3VzZUxlYXZlOiBvbk1vdXNlTGVhdmUsXG4gICAgb25CbHVyOiBvbkJsdXIsXG4gICAgb25EZWxlZ2F0ZVNob3c6IG9uRGVsZWdhdGVTaG93LFxuICAgIG9uRGVsZWdhdGVIaWRlOiBvbkRlbGVnYXRlSGlkZVxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgcG9wcGVyIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtQb3BwZXJ9XG4gKiBAbWVtYmVyb2YgVGlwcHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpIHtcbiAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgdmFyIHBvcHBlciA9IHRoaXMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2UsXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIHZhciBfZ2V0SW5uZXJFbGVtZW50czQgPSBnZXRJbm5lckVsZW1lbnRzKHBvcHBlciksXG4gICAgICB0b29sdGlwID0gX2dldElubmVyRWxlbWVudHM0LnRvb2x0aXA7XG5cbiAgdmFyIHBvcHBlck9wdGlvbnMgPSBvcHRpb25zLnBvcHBlck9wdGlvbnM7XG5cbiAgdmFyIGFycm93U2VsZWN0b3IgPSBvcHRpb25zLmFycm93VHlwZSA9PT0gJ3JvdW5kJyA/IHNlbGVjdG9ycy5ST1VORF9BUlJPVyA6IHNlbGVjdG9ycy5BUlJPVztcbiAgdmFyIGFycm93ID0gdG9vbHRpcC5xdWVyeVNlbGVjdG9yKGFycm93U2VsZWN0b3IpO1xuXG4gIHZhciBjb25maWcgPSBfZXh0ZW5kcyh7XG4gICAgcGxhY2VtZW50OiBvcHRpb25zLnBsYWNlbWVudFxuICB9LCBwb3BwZXJPcHRpb25zIHx8IHt9LCB7XG4gICAgbW9kaWZpZXJzOiBfZXh0ZW5kcyh7fSwgcG9wcGVyT3B0aW9ucyA/IHBvcHBlck9wdGlvbnMubW9kaWZpZXJzIDoge30sIHtcbiAgICAgIGFycm93OiBfZXh0ZW5kcyh7XG4gICAgICAgIGVsZW1lbnQ6IGFycm93U2VsZWN0b3JcbiAgICAgIH0sIHBvcHBlck9wdGlvbnMgJiYgcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgPyBwb3BwZXJPcHRpb25zLm1vZGlmaWVycy5hcnJvdyA6IHt9KSxcbiAgICAgIGZsaXA6IF9leHRlbmRzKHtcbiAgICAgICAgZW5hYmxlZDogb3B0aW9ucy5mbGlwLFxuICAgICAgICBwYWRkaW5nOiBvcHRpb25zLmRpc3RhbmNlICsgNSAvKiA1cHggZnJvbSB2aWV3cG9ydCBib3VuZGFyeSAqL1xuICAgICAgICAsIGJlaGF2aW9yOiBvcHRpb25zLmZsaXBCZWhhdmlvclxuICAgICAgfSwgcG9wcGVyT3B0aW9ucyAmJiBwb3BwZXJPcHRpb25zLm1vZGlmaWVycyA/IHBvcHBlck9wdGlvbnMubW9kaWZpZXJzLmZsaXAgOiB7fSksXG4gICAgICBvZmZzZXQ6IF9leHRlbmRzKHtcbiAgICAgICAgb2Zmc2V0OiBvcHRpb25zLm9mZnNldFxuICAgICAgfSwgcG9wcGVyT3B0aW9ucyAmJiBwb3BwZXJPcHRpb25zLm1vZGlmaWVycyA/IHBvcHBlck9wdGlvbnMubW9kaWZpZXJzLm9mZnNldCA6IHt9KVxuICAgIH0pLFxuICAgIG9uQ3JlYXRlOiBmdW5jdGlvbiBvbkNyZWF0ZSgpIHtcbiAgICAgIHRvb2x0aXAuc3R5bGVbZ2V0UG9wcGVyUGxhY2VtZW50KHBvcHBlcildID0gZ2V0T2Zmc2V0RGlzdGFuY2VJblB4KG9wdGlvbnMuZGlzdGFuY2UpO1xuXG4gICAgICBpZiAoYXJyb3cgJiYgb3B0aW9ucy5hcnJvd1RyYW5zZm9ybSkge1xuICAgICAgICBjb21wdXRlQXJyb3dUcmFuc2Zvcm0ocG9wcGVyLCBhcnJvdywgb3B0aW9ucy5hcnJvd1RyYW5zZm9ybSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoKSB7XG4gICAgICB2YXIgc3R5bGVzID0gdG9vbHRpcC5zdHlsZTtcbiAgICAgIHN0eWxlcy50b3AgPSAnJztcbiAgICAgIHN0eWxlcy5ib3R0b20gPSAnJztcbiAgICAgIHN0eWxlcy5sZWZ0ID0gJyc7XG4gICAgICBzdHlsZXMucmlnaHQgPSAnJztcbiAgICAgIHN0eWxlc1tnZXRQb3BwZXJQbGFjZW1lbnQocG9wcGVyKV0gPSBnZXRPZmZzZXREaXN0YW5jZUluUHgob3B0aW9ucy5kaXN0YW5jZSk7XG5cbiAgICAgIGlmIChhcnJvdyAmJiBvcHRpb25zLmFycm93VHJhbnNmb3JtKSB7XG4gICAgICAgIGNvbXB1dGVBcnJvd1RyYW5zZm9ybShwb3BwZXIsIGFycm93LCBvcHRpb25zLmFycm93VHJhbnNmb3JtKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIF9hZGRNdXRhdGlvbk9ic2VydmVyLmNhbGwodGhpcywge1xuICAgIHRhcmdldDogcG9wcGVyLFxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICAgIF90aGlzNy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmV3IFBvcHBlcihyZWZlcmVuY2UsIHBvcHBlciwgY29uZmlnKTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBwb3BwZXIgZWxlbWVudCB0byB0aGUgRE9NLCB1cGRhdGluZyBvciBjcmVhdGluZyB0aGUgcG9wcGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQG1lbWJlcm9mIFRpcHB5XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfbW91bnQoY2FsbGJhY2spIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblxuICBpZiAoIXRoaXMucG9wcGVySW5zdGFuY2UpIHtcbiAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gX2NyZWF0ZVBvcHBlckluc3RhbmNlLmNhbGwodGhpcyk7XG4gICAgaWYgKCFvcHRpb25zLmxpdmVQbGFjZW1lbnQpIHtcbiAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMucG9wcGVySW5zdGFuY2Uuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICBpZiAob3B0aW9ucy5saXZlUGxhY2VtZW50ICYmICFfaGFzRm9sbG93Q3Vyc29yQmVoYXZpb3IuY2FsbCh0aGlzKSkge1xuICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5lbmFibGVFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBpbnN0YW5jZSBwcmV2aW91c2x5IGhhZCBmb2xsb3dDdXJzb3IgYmVoYXZpb3IsIGl0IHdpbGwgYmUgcG9zaXRpb25lZCBpbmNvcnJlY3RseVxuICAvLyBpZiB0cmlnZ2VyZWQgYnkgYGZvY3VzYCBhZnRlcndhcmRzIC0gdXBkYXRlIHRoZSByZWZlcmVuY2UgYmFjayB0byB0aGUgcmVhbCBET00gZWxlbWVudFxuICBpZiAoIV9oYXNGb2xsb3dDdXJzb3JCZWhhdmlvci5jYWxsKHRoaXMpKSB7XG4gICAgdmFyIF9nZXRJbm5lckVsZW1lbnRzNSA9IGdldElubmVyRWxlbWVudHModGhpcy5wb3BwZXIpLFxuICAgICAgICBhcnJvdyA9IF9nZXRJbm5lckVsZW1lbnRzNS5hcnJvdztcblxuICAgIGlmIChhcnJvdykgYXJyb3cuc3R5bGUubWFyZ2luID0gJyc7XG4gICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSB0aGlzLnJlZmVyZW5jZTtcbiAgfVxuXG4gIHVwZGF0ZVBvcHBlclBvc2l0aW9uKHRoaXMucG9wcGVySW5zdGFuY2UsIGNhbGxiYWNrLCB0cnVlKTtcblxuICBpZiAoIW9wdGlvbnMuYXBwZW5kVG8uY29udGFpbnModGhpcy5wb3BwZXIpKSB7XG4gICAgb3B0aW9ucy5hcHBlbmRUby5hcHBlbmRDaGlsZCh0aGlzLnBvcHBlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGVhcnMgdGhlIHNob3cgYW5kIGhpZGUgZGVsYXkgdGltZW91dHNcbiAqIEBtZW1iZXJvZiBUaXBweVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2NsZWFyRGVsYXlUaW1lb3V0cygpIHtcbiAgdmFyIF9yZWYgPSB0aGlzLl8oa2V5KSxcbiAgICAgIHNob3dUaW1lb3V0ID0gX3JlZi5zaG93VGltZW91dCxcbiAgICAgIGhpZGVUaW1lb3V0ID0gX3JlZi5oaWRlVGltZW91dDtcblxuICBjbGVhclRpbWVvdXQoc2hvd1RpbWVvdXQpO1xuICBjbGVhclRpbWVvdXQoaGlkZVRpbWVvdXQpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1vdXNlbW92ZSBldmVudCBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgYGZvbGxvd0N1cnNvcmAgb3B0aW9uXG4gKiBAbWVtYmVyb2YgVGlwcHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9zZXRGb2xsb3dDdXJzb3JMaXN0ZW5lcigpIHtcbiAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgdGhpcy5fKGtleSkuZm9sbG93Q3Vyc29yTGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgXyRsYXN0TW91c2VNb3ZlRXZlbnQgPSBfdGhpczguXyhrZXkpLmxhc3RNb3VzZU1vdmVFdmVudCA9IGV2ZW50LFxuICAgICAgICBjbGllbnRYID0gXyRsYXN0TW91c2VNb3ZlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WSA9IF8kbGFzdE1vdXNlTW92ZUV2ZW50LmNsaWVudFk7XG5cbiAgICBpZiAoIV90aGlzOC5wb3BwZXJJbnN0YW5jZSkgcmV0dXJuO1xuXG4gICAgX3RoaXM4LnBvcHBlckluc3RhbmNlLnJlZmVyZW5jZSA9IHtcbiAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICB0b3A6IGNsaWVudFksXG4gICAgICAgICAgbGVmdDogY2xpZW50WCxcbiAgICAgICAgICByaWdodDogY2xpZW50WCxcbiAgICAgICAgICBib3R0b206IGNsaWVudFlcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjbGllbnRXaWR0aDogMCxcbiAgICAgIGNsaWVudEhlaWdodDogMFxuICAgIH07XG5cbiAgICBfdGhpczgucG9wcGVySW5zdGFuY2Uuc2NoZWR1bGVVcGRhdGUoKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3BwZXIncyBwb3NpdGlvbiBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQG1lbWJlcm9mIFRpcHB5XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfbWFrZVN0aWNreSgpIHtcbiAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgdmFyIGFwcGx5VHJhbnNpdGlvbkR1cmF0aW9uJCQxID0gZnVuY3Rpb24gYXBwbHlUcmFuc2l0aW9uRHVyYXRpb24kJDEoKSB7XG4gICAgX3RoaXM5LnBvcHBlci5zdHlsZVtwcmVmaXgoJ3RyYW5zaXRpb25EdXJhdGlvbicpXSA9IF90aGlzOS5vcHRpb25zLnVwZGF0ZUR1cmF0aW9uICsgJ21zJztcbiAgfTtcblxuICB2YXIgcmVtb3ZlVHJhbnNpdGlvbkR1cmF0aW9uID0gZnVuY3Rpb24gcmVtb3ZlVHJhbnNpdGlvbkR1cmF0aW9uKCkge1xuICAgIF90aGlzOS5wb3BwZXIuc3R5bGVbcHJlZml4KCd0cmFuc2l0aW9uRHVyYXRpb24nKV0gPSAnJztcbiAgfTtcblxuICB2YXIgdXBkYXRlUG9zaXRpb24gPSBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICBpZiAoX3RoaXM5LnBvcHBlckluc3RhbmNlKSB7XG4gICAgICBfdGhpczkucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2l0aW9uRHVyYXRpb24kJDEoKTtcblxuICAgIGlmIChfdGhpczkuc3RhdGUudmlzaWJsZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkR1cmF0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZVBvc2l0aW9uKCk7XG59XG5cbi8qKlxuICogQWRkcyBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGFuIGVsZW1lbnQgYW5kIHN0b3JlcyBpdCBpbiB0aGUgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQG1lbWJlcm9mIFRpcHB5XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfYWRkTXV0YXRpb25PYnNlcnZlcihfcmVmMikge1xuICB2YXIgdGFyZ2V0ID0gX3JlZjIudGFyZ2V0LFxuICAgICAgY2FsbGJhY2sgPSBfcmVmMi5jYWxsYmFjayxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zO1xuXG4gIGlmICghd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHJldHVybjtcblxuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcblxuICB0aGlzLl8oa2V5KS5tdXRhdGlvbk9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbn1cblxuLyoqXG4gKiBGaXJlcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zIG9uY2UgdGhlIENTUyB0cmFuc2l0aW9uIGVuZHMgZm9yIGBzaG93YCBhbmQgYGhpZGVgIG1ldGhvZHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvbiB0byBmaXJlIG9uY2UgdHJhbnNpdGlvbiBjb21wbGV0ZXNcbiAqIEBtZW1iZXJvZiBUaXBweVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX29uVHJhbnNpdGlvbkVuZChkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgLy8gTWFrZSBjYWxsYmFjayBzeW5jaHJvbm91cyBpZiBkdXJhdGlvbiBpcyAwXG4gIGlmICghZHVyYXRpb24pIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIHZhciBfZ2V0SW5uZXJFbGVtZW50czYgPSBnZXRJbm5lckVsZW1lbnRzKHRoaXMucG9wcGVyKSxcbiAgICAgIHRvb2x0aXAgPSBfZ2V0SW5uZXJFbGVtZW50czYudG9vbHRpcDtcblxuICB2YXIgdG9nZ2xlTGlzdGVuZXJzID0gZnVuY3Rpb24gdG9nZ2xlTGlzdGVuZXJzKGFjdGlvbiwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm47XG4gICAgdG9vbHRpcFthY3Rpb24gKyAnRXZlbnRMaXN0ZW5lciddKCdvbnRyYW5zaXRpb25lbmQnIGluIHdpbmRvdyA/ICd0cmFuc2l0aW9uZW5kJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgbGlzdGVuZXIpO1xuICB9O1xuXG4gIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIGxpc3RlbmVyKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IHRvb2x0aXApIHtcbiAgICAgIHRvZ2dsZUxpc3RlbmVycygncmVtb3ZlJywgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlTGlzdGVuZXJzKCdyZW1vdmUnLCB0aGlzLl8oa2V5KS50cmFuc2l0aW9uZW5kTGlzdGVuZXIpO1xuICB0b2dnbGVMaXN0ZW5lcnMoJ2FkZCcsIGxpc3RlbmVyKTtcblxuICB0aGlzLl8oa2V5KS50cmFuc2l0aW9uZW5kTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbn1cblxudmFyIGlkQ291bnRlciA9IDE7XG5cbi8qKlxuICogQ3JlYXRlcyB0b29sdGlwcyBmb3IgZWFjaCByZWZlcmVuY2UgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50W119IGVsc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICogQHJldHVybiB7VGlwcHlbXX0gQXJyYXkgb2YgVGlwcHkgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVRvb2x0aXBzKGVscywgY29uZmlnKSB7XG4gIHJldHVybiBlbHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHJlZmVyZW5jZSkge1xuICAgIHZhciBpZCA9IGlkQ291bnRlcjtcblxuICAgIHZhciBvcHRpb25zID0gZXZhbHVhdGVPcHRpb25zKHJlZmVyZW5jZSwgY29uZmlnLnBlcmZvcm1hbmNlID8gY29uZmlnIDogZ2V0SW5kaXZpZHVhbE9wdGlvbnMocmVmZXJlbmNlLCBjb25maWcpKTtcblxuICAgIHZhciB0aXRsZSA9IHJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyk7XG5cbiAgICAvLyBEb24ndCBjcmVhdGUgYW4gaW5zdGFuY2Ugd2hlbjpcbiAgICAvLyAqIHRoZSBgdGl0bGVgIGF0dHJpYnV0ZSBpcyBmYWxzeSAobnVsbCBvciBlbXB0eSBzdHJpbmcpLCBhbmRcbiAgICAvLyAqIGl0J3Mgbm90IGEgZGVsZWdhdGUgZm9yIHRvb2x0aXBzLCBhbmRcbiAgICAvLyAqIHRoZXJlIGlzIG5vIGh0bWwgdGVtcGxhdGUgc3BlY2lmaWVkLCBhbmRcbiAgICAvLyAqIGBkeW5hbWljVGl0bGVgIG9wdGlvbiBpcyBmYWxzZVxuICAgIGlmICghdGl0bGUgJiYgIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLmh0bWwgJiYgIW9wdGlvbnMuZHluYW1pY1RpdGxlKSB7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH1cblxuICAgIC8vIERlbGVnYXRlcyBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgYXMgZGlmZmVyZW50XG4gICAgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZShvcHRpb25zLnRhcmdldCA/ICdkYXRhLXRpcHB5LWRlbGVnYXRlJyA6ICdkYXRhLXRpcHB5JywgJycpO1xuXG4gICAgcmVtb3ZlVGl0bGUocmVmZXJlbmNlKTtcblxuICAgIHZhciBwb3BwZXIgPSBjcmVhdGVQb3BwZXJFbGVtZW50KGlkLCB0aXRsZSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgdGlwcHkgPSBuZXcgVGlwcHkoe1xuICAgICAgaWQ6IGlkLFxuICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2UsXG4gICAgICBwb3BwZXI6IHBvcHBlcixcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBwb3BwZXJJbnN0YW5jZTogbnVsbFxuICAgIH0pO1xuXG4gICAgaWYgKG9wdGlvbnMuY3JlYXRlUG9wcGVySW5zdGFuY2VPbkluaXQpIHtcbiAgICAgIHRpcHB5LnBvcHBlckluc3RhbmNlID0gX2NyZWF0ZVBvcHBlckluc3RhbmNlLmNhbGwodGlwcHkpO1xuICAgICAgdGlwcHkucG9wcGVySW5zdGFuY2UuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IF9nZXRFdmVudExpc3RlbmVycy5jYWxsKHRpcHB5KTtcbiAgICB0aXBweS5saXN0ZW5lcnMgPSBvcHRpb25zLnRyaWdnZXIudHJpbSgpLnNwbGl0KCcgJykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGV2ZW50VHlwZSkge1xuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoY3JlYXRlVHJpZ2dlcihldmVudFR5cGUsIHJlZmVyZW5jZSwgbGlzdGVuZXJzLCBvcHRpb25zKSk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gVXBkYXRlIHRvb2x0aXAgY29udGVudCB3aGVuZXZlciB0aGUgdGl0bGUgYXR0cmlidXRlIG9uIHRoZSByZWZlcmVuY2UgY2hhbmdlc1xuICAgIGlmIChvcHRpb25zLmR5bmFtaWNUaXRsZSkge1xuICAgICAgX2FkZE11dGF0aW9uT2JzZXJ2ZXIuY2FsbCh0aXBweSwge1xuICAgICAgICB0YXJnZXQ6IHJlZmVyZW5jZSxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xuICAgICAgICAgIHZhciBfZ2V0SW5uZXJFbGVtZW50cyA9IGdldElubmVyRWxlbWVudHMocG9wcGVyKSxcbiAgICAgICAgICAgICAgY29udGVudCA9IF9nZXRJbm5lckVsZW1lbnRzLmNvbnRlbnQ7XG5cbiAgICAgICAgICB2YXIgdGl0bGUgPSByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgY29udGVudFtvcHRpb25zLmFsbG93VGl0bGVIVE1MID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnXSA9IHRpcHB5LnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICByZW1vdmVUaXRsZShyZWZlcmVuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXR0cmlidXRlczogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTaG9ydGN1dHNcbiAgICByZWZlcmVuY2UuX3RpcHB5ID0gdGlwcHk7XG4gICAgcG9wcGVyLl90aXBweSA9IHRpcHB5O1xuICAgIHBvcHBlci5fcmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuXG4gICAgYWNjLnB1c2godGlwcHkpO1xuXG4gICAgaWRDb3VudGVyKys7XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCBbXSk7XG59XG5cbi8qKlxuICogSGlkZXMgYWxsIHBvcHBlcnNcbiAqIEBwYXJhbSB7VGlwcHl9IGV4Y2x1ZGVUaXBweSAtIHRpcHB5IHRvIGV4Y2x1ZGUgaWYgbmVlZGVkXG4gKi9cbmZ1bmN0aW9uIGhpZGVBbGxQb3BwZXJzKGV4Y2x1ZGVUaXBweSkge1xuICB2YXIgcG9wcGVycyA9IHRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuUE9QUEVSKSk7XG5cbiAgcG9wcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChwb3BwZXIpIHtcbiAgICB2YXIgdGlwcHkgPSBwb3BwZXIuX3RpcHB5O1xuICAgIGlmICghdGlwcHkpIHJldHVybjtcblxuICAgIHZhciBvcHRpb25zID0gdGlwcHkub3B0aW9ucztcblxuXG4gICAgaWYgKChvcHRpb25zLmhpZGVPbkNsaWNrID09PSB0cnVlIHx8IG9wdGlvbnMudHJpZ2dlci5pbmRleE9mKCdmb2N1cycpID4gLTEpICYmICghZXhjbHVkZVRpcHB5IHx8IHBvcHBlciAhPT0gZXhjbHVkZVRpcHB5LnBvcHBlcikpIHtcbiAgICAgIHRpcHB5LmhpZGUoKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIG5lZWRlZCBldmVudCBsaXN0ZW5lcnNcbiAqL1xuZnVuY3Rpb24gYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICB2YXIgb25Eb2N1bWVudFRvdWNoID0gZnVuY3Rpb24gb25Eb2N1bWVudFRvdWNoKCkge1xuICAgIGlmIChicm93c2VyLnVzaW5nVG91Y2gpIHJldHVybjtcblxuICAgIGJyb3dzZXIudXNpbmdUb3VjaCA9IHRydWU7XG5cbiAgICBpZiAoYnJvd3Nlci5pT1MpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgndGlwcHktdG91Y2gnKTtcbiAgICB9XG5cbiAgICBpZiAoYnJvd3Nlci5keW5hbWljSW5wdXREZXRlY3Rpb24gJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkRvY3VtZW50TW91c2VNb3ZlKTtcbiAgICB9XG5cbiAgICBicm93c2VyLm9uVXNlcklucHV0Q2hhbmdlKCd0b3VjaCcpO1xuICB9O1xuXG4gIHZhciBvbkRvY3VtZW50TW91c2VNb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aW1lID0gdm9pZCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgLy8gQ2hyb21lIDYwKyBpcyAxIG1vdXNlbW92ZSBwZXIgYW5pbWF0aW9uIGZyYW1lLCB1c2UgMjBtcyB0aW1lIGRpZmZlcmVuY2VcbiAgICAgIGlmIChub3cgLSB0aW1lIDwgMjApIHtcbiAgICAgICAgYnJvd3Nlci51c2luZ1RvdWNoID0gZmFsc2U7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uRG9jdW1lbnRNb3VzZU1vdmUpO1xuICAgICAgICBpZiAoIWJyb3dzZXIuaU9TKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCd0aXBweS10b3VjaCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyb3dzZXIub25Vc2VySW5wdXRDaGFuZ2UoJ21vdXNlJyk7XG4gICAgICB9XG5cbiAgICAgIHRpbWUgPSBub3c7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciBvbkRvY3VtZW50Q2xpY2sgPSBmdW5jdGlvbiBvbkRvY3VtZW50Q2xpY2soZXZlbnQpIHtcbiAgICAvLyBTaW11bGF0ZWQgZXZlbnRzIGRpc3BhdGNoZWQgb24gdGhlIGRvY3VtZW50XG4gICAgaWYgKCEoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBoaWRlQWxsUG9wcGVycygpO1xuICAgIH1cblxuICAgIHZhciByZWZlcmVuY2UgPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwgc2VsZWN0b3JzLlJFRkVSRU5DRSk7XG4gICAgdmFyIHBvcHBlciA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBzZWxlY3RvcnMuUE9QUEVSKTtcblxuICAgIGlmIChwb3BwZXIgJiYgcG9wcGVyLl90aXBweSAmJiBwb3BwZXIuX3RpcHB5Lm9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVmZXJlbmNlICYmIHJlZmVyZW5jZS5fdGlwcHkpIHtcbiAgICAgIHZhciBvcHRpb25zID0gcmVmZXJlbmNlLl90aXBweS5vcHRpb25zO1xuXG4gICAgICB2YXIgaXNDbGlja1RyaWdnZXIgPSBvcHRpb25zLnRyaWdnZXIuaW5kZXhPZignY2xpY2snKSA+IC0xO1xuICAgICAgdmFyIGlzTXVsdGlwbGUgPSBvcHRpb25zLm11bHRpcGxlO1xuXG4gICAgICAvLyBIaWRlIGFsbCBwb3BwZXJzIGV4Y2VwdCB0aGUgb25lIGJlbG9uZ2luZyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkXG4gICAgICBpZiAoIWlzTXVsdGlwbGUgJiYgYnJvd3Nlci51c2luZ1RvdWNoIHx8ICFpc011bHRpcGxlICYmIGlzQ2xpY2tUcmlnZ2VyKSB7XG4gICAgICAgIHJldHVybiBoaWRlQWxsUG9wcGVycyhyZWZlcmVuY2UuX3RpcHB5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuaGlkZU9uQ2xpY2sgIT09IHRydWUgfHwgaXNDbGlja1RyaWdnZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVBbGxQb3BwZXJzKCk7XG4gIH07XG5cbiAgdmFyIG9uV2luZG93Qmx1ciA9IGZ1bmN0aW9uIG9uV2luZG93Qmx1cigpIHtcbiAgICB2YXIgX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgIGVsID0gX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoZWwgJiYgZWwuYmx1ciAmJiBtYXRjaGVzJDEuY2FsbChlbCwgc2VsZWN0b3JzLlJFRkVSRU5DRSkpIHtcbiAgICAgIGVsLmJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5QT1BQRVIpKS5mb3JFYWNoKGZ1bmN0aW9uIChwb3BwZXIpIHtcbiAgICAgIHZhciB0aXBweUluc3RhbmNlID0gcG9wcGVyLl90aXBweTtcbiAgICAgIGlmICh0aXBweUluc3RhbmNlICYmICF0aXBweUluc3RhbmNlLm9wdGlvbnMubGl2ZVBsYWNlbWVudCkge1xuICAgICAgICB0aXBweUluc3RhbmNlLnBvcHBlckluc3RhbmNlLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY3VtZW50Q2xpY2spO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Eb2N1bWVudFRvdWNoKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbldpbmRvd0JsdXIpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUpO1xuXG4gIGlmICghYnJvd3Nlci5zdXBwb3J0c1RvdWNoICYmIChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMpKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBvbkRvY3VtZW50VG91Y2gpO1xuICB9XG59XG5cbnZhciBldmVudExpc3RlbmVyc0JvdW5kID0gZmFsc2U7XG5cbi8qKlxuICogRXhwb3J0ZWQgbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fEVsZW1lbnRbXXxOb2RlTGlzdHxPYmplY3R9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBvbmUgLSBjcmVhdGUgb25lIHRvb2x0aXBcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gdGlwcHkoc2VsZWN0b3IsIG9wdGlvbnMsIG9uZSkge1xuICBpZiAoYnJvd3Nlci5zdXBwb3J0ZWQgJiYgIWV2ZW50TGlzdGVuZXJzQm91bmQpIHtcbiAgICBiaW5kRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBldmVudExpc3RlbmVyc0JvdW5kID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChpc09iamVjdExpdGVyYWwoc2VsZWN0b3IpKSB7XG4gICAgcG9seWZpbGxWaXJ0dWFsUmVmZXJlbmNlUHJvcHMoc2VsZWN0b3IpO1xuICB9XG5cbiAgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgdmFyIHJlZmVyZW5jZXMgPSBnZXRBcnJheU9mRWxlbWVudHMoc2VsZWN0b3IpO1xuICB2YXIgZmlyc3RSZWZlcmVuY2UgPSByZWZlcmVuY2VzWzBdO1xuXG4gIHJldHVybiB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgdG9vbHRpcHM6IGJyb3dzZXIuc3VwcG9ydGVkID8gY3JlYXRlVG9vbHRpcHMob25lICYmIGZpcnN0UmVmZXJlbmNlID8gW2ZpcnN0UmVmZXJlbmNlXSA6IHJlZmVyZW5jZXMsIG9wdGlvbnMpIDogW10sXG4gICAgZGVzdHJveUFsbDogZnVuY3Rpb24gZGVzdHJveUFsbCgpIHtcbiAgICAgIHRoaXMudG9vbHRpcHMuZm9yRWFjaChmdW5jdGlvbiAodG9vbHRpcCkge1xuICAgICAgICByZXR1cm4gdG9vbHRpcC5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudG9vbHRpcHMgPSBbXTtcbiAgICB9XG4gIH07XG59XG5cbnRpcHB5LnZlcnNpb24gPSB2ZXJzaW9uO1xudGlwcHkuYnJvd3NlciA9IGJyb3dzZXI7XG50aXBweS5kZWZhdWx0cyA9IGRlZmF1bHRzO1xudGlwcHkub25lID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRpb25zKSB7XG4gIHJldHVybiB0aXBweShzZWxlY3Rvciwgb3B0aW9ucywgdHJ1ZSkudG9vbHRpcHNbMF07XG59O1xudGlwcHkuZGlzYWJsZUFuaW1hdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gIGRlZmF1bHRzLnVwZGF0ZUR1cmF0aW9uID0gZGVmYXVsdHMuZHVyYXRpb24gPSAwO1xuICBkZWZhdWx0cy5hbmltYXRlRmlsbCA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBJbmplY3RzIENTUyBzdHlsZXMgdG8gZG9jdW1lbnQgaGVhZFxuICogQHBhcmFtIHtTdHJpbmd9IGNzc1xuICovXG5mdW5jdGlvbiBpbmplY3RDU1MoKSB7XG4gIHZhciBjc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuXG4gIGlmIChpc0Jyb3dzZXIgJiYgYnJvd3Nlci5zdXBwb3J0ZWQpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG4gIH1cbn1cblxuaW5qZWN0Q1NTKHN0eWxlcyk7XG5cbnJldHVybiB0aXBweTtcblxufSkpKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoJ2FycmF5LWZpbHRlcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuY29uc3QgaXNFbGVtZW50SW5WaWV3cG9ydCA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzLWluLXZpZXdwb3J0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbi8vIFhYWCBtYXRjaCAuYWNjb3JkaW9uIGFuZCAuYWNjb3JkaW9uLWJvcmRlcmVkXG5jb25zdCBBQ0NPUkRJT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbiwgLiR7UFJFRklYfWFjY29yZGlvbi1ib3JkZXJlZGA7XG5jb25zdCBCVVRUT04gPSBgLiR7UFJFRklYfWFjY29yZGlvbi1idXR0b25bYXJpYS1jb250cm9sc11gO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSAnYXJpYS1tdWx0aXNlbGVjdGFibGUnO1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIHZhciBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBleHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uZ2V0QXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSkgPT09ICd0cnVlJztcblxuICBpZiAoZXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGZvckVhY2goZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLCBvdGhlciA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBidXR0b24gZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogYWNjb3JkaW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY2NvcmRpb25cbiAqIEByZXR1cm4ge2FycmF5PEhUTUxCdXR0b25FbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0QWNjb3JkaW9uQnV0dG9ucyA9IGFjY29yZGlvbiA9PiB7XG4gIHJldHVybiBmaWx0ZXIoYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKSwgYnV0dG9uID0+IHtcbiAgICByZXR1cm4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uO1xuICB9KTtcbn07XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdG9nZ2xlQnV0dG9uKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZScpIHtcbiAgICAgICAgLy8gV2Ugd2VyZSBqdXN0IGV4cGFuZGVkLCBidXQgaWYgYW5vdGhlciBhY2NvcmRpb24gd2FzIGFsc28ganVzdFxuICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzKSkgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQ6IHJvb3QgPT4ge1xuICAgIGZvckVhY2gocm9vdC5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZSc7XG4gICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgfSk7XG4gIH0sXG4gIEFDQ09SRElPTixcbiAgQlVUVE9OLFxuICBzaG93OiBzaG93QnV0dG9uLFxuICBoaWRlOiBoaWRlQnV0dG9uLFxuICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbn0pO1xuXG4vKipcbiAqIFRPRE86IGZvciAyLjAsIHJlbW92ZSBldmVyeXRoaW5nIGJlbG93IHRoaXMgY29tbWVudCBhbmQgZXhwb3J0IHRoZVxuICogYmVoYXZpb3IgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IEFjY29yZGlvbiA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHRoaXMucm9vdCA9IHJvb3Q7XG4gIGFjY29yZGlvbi5vbih0aGlzLnJvb3QpO1xufTtcblxuLy8gY29weSBhbGwgb2YgdGhlIGJlaGF2aW9yIG1ldGhvZHMgYW5kIHByb3BzIHRvIEFjY29yZGlvblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuYXNzaWduKEFjY29yZGlvbiwgYWNjb3JkaW9uKTtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gc2hvd0J1dHRvbjtcbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGhpZGVCdXR0b247XG5cbkFjY29yZGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICBhY2NvcmRpb24ub2ZmKHRoaXMucm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvbjtcbiIsIi8qKlxyXG4gKiBDb2xsYXBzZS9leHBhbmQuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XHJcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xyXG5jb25zdCBjbG9zZXN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2xvc2VzdCcpO1xyXG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xyXG5cclxuY29uc3QganNDb2xsYXBzZVRyaWdnZXIgPSBcIi5qcy1jb2xsYXBzZVwiO1xyXG5jb25zdCBqc0NvbGxhcHNlVGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xyXG5cclxuY29uc3QgdG9nZ2xlQ29sbGFwc2UgPSBmdW5jdGlvbiAodHJpZ2dlckVsLCBmb3JjZUNsb3NlKSB7XHJcbiAgICBpZih0cmlnZ2VyRWwgIT09IG51bGwgJiYgdHJpZ2dlckVsICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHZhciB0YXJnZXRBdHRyID0gdHJpZ2dlckVsLmdldEF0dHJpYnV0ZShqc0NvbGxhcHNlVGFyZ2V0KVxyXG4gICAgICAgIGlmKHRhcmdldEF0dHIgIT09IG51bGwgJiYgdGFyZ2V0QXR0ciAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEVsID0gc2VsZWN0KHRhcmdldEF0dHIsICdib2R5Jyk7XHJcbiAgICAgICAgICAgIGlmKHRhcmdldEVsICE9PSBudWxsICYmIHRhcmdldEVsICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0RWwubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvL3RhcmdldCBmb3VuZCwgY2hlY2sgc3RhdGVcclxuICAgICAgICAgICAgICAgIHRhcmdldEVsID0gdGFyZ2V0RWxbMF07XHJcbiAgICAgICAgICAgICAgICAvL2NoYW5nZSBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYodHJpZ2dlckVsLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIgfHwgdHJpZ2dlckVsLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT0gdW5kZWZpbmVkIHx8IGZvcmNlQ2xvc2UgKXtcclxuICAgICAgICAgICAgICAgICAgICAvL2Nsb3NlXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUNvbGxhcHNlKHRhcmdldEVsLCB0cmlnZ2VyRWwpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUV4cGFuZCh0YXJnZXRFbCwgdHJpZ2dlckVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciB0cmlnZ2VyRWxtID0gY2xvc2VzdChldmVudC50YXJnZXQsIGpzQ29sbGFwc2VUcmlnZ2VyKTtcclxuICAgIGlmKHRyaWdnZXJFbG0gIT09IG51bGwgJiYgdHJpZ2dlckVsbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICB0b2dnbGVDb2xsYXBzZSh0cmlnZ2VyRWxtKTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBhbmltYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZUNvbGxhcHNlKHRhcmdldEVsLCB0cmlnZ2VyRWwpIHtcclxuICAgIGlmKCFhbmltYXRlSW5Qcm9ncmVzcyl7XHJcbiAgICAgICAgYW5pbWF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRhcmdldEVsLnN0eWxlLmhlaWdodCA9IHRhcmdldEVsLmNsaWVudEhlaWdodCsgXCJweFwiO1xyXG4gICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZS10cmFuc2l0aW9uLWNvbGxhcHNlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICAgIHRhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gICAgICAgIH0sIDUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXHJcbiAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XHJcbiAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZS10cmFuc2l0aW9uLWNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICBhbmltYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGVFeHBhbmQodGFyZ2V0RWwsIHRyaWdnZXJFbCkge1xyXG4gICAgaWYoIWFuaW1hdGVJblByb2dyZXNzKXtcclxuICAgICAgICBhbmltYXRlSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKTtcclxuICAgICAgICB2YXIgZXhwYW5kZWRIZWlnaHQgPSB0YXJnZXRFbC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdGFyZ2V0RWwuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2UtdHJhbnNpdGlvbi1leHBhbmRcIik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBcclxuICAgICAgICAgICAgdGFyZ2V0RWwuc3R5bGUuaGVpZ2h0ID0gZXhwYW5kZWRIZWlnaHQrIFwicHhcIjtcclxuICAgICAgICB9LCA1KTtcclxuICAgICAgICBcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2UtdHJhbnNpdGlvbi1leHBhbmRcIik7XHJcbiAgICAgICAgICAgIHRhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICBhbmltYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xyXG4gIFsnY2xpY2snXToge1xyXG4gICAgWyBqc0NvbGxhcHNlVHJpZ2dlciBdOiB0b2dnbGVcclxuICB9LFxyXG59KTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgUGlrYWRheSA9IHJlcXVpcmUoXCIuLi8uLi92ZW5kb3IvcGlrYWRheS5qc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgY2xvc2VzdCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Nsb3Nlc3QnKTtcblxuY29uc3QganNEYXRlcGlja2VyU2VsZWN0b3IgPSAnLmpzLWNhbGVuZGFyLWRhdGVwaWNrZXInO1xuY29uc3QganNEYXlJbnB1dCA9ICcuanMtY2FsZW5kYXItZGF5LWlucHV0JztcbmNvbnN0IGpzTW9udGhJbnB1dCA9ICcuanMtY2FsZW5kYXItbW9udGgtaW5wdXQnO1xuY29uc3QganNZZWFySW5wdXQgPSAnLmpzLWNhbGVuZGFyLXllYXItaW5wdXQnO1xuXG5jbGFzcyBkYXRlcGlja2VyR3JvdXAge1xuICBjb25zdHJ1Y3RvcihlbCl7XG4gICAgXG4gICAgdGhpcy5waWthZGF5SW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuZGF0ZXBpY2tlckVsZW1lbnQgPSBzZWxlY3QoanNEYXRlcGlja2VyU2VsZWN0b3IsIGVsKTtcbiAgICB0aGlzLmRhdGVHcm91cCA9IGVsO1xuICAgIHRoaXMuZm9ybUdyb3VwID0gY2xvc2VzdChlbCwgJy5mb3JtLWdyb3VwJyk7XG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMueWVhcklucHV0RWxlbWVudCA9IG51bGw7ICAgXG5cbiAgICB0aGlzLmluaXREYXRlSW5wdXRzKCk7XG4gICAgdGhpcy5pbml0RGF0ZXBpY2tlcih0aGlzLmRhdGVwaWNrZXJFbGVtZW50WzBdKTtcbiAgfVxuXG4gIGluaXREYXRlSW5wdXRzKCl7XG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNEYXlJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdXG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudCA9IHNlbGVjdChqc01vbnRoSW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXTtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQgPSBzZWxlY3QoanNZZWFySW5wdXQsIHRoaXMuZGF0ZUdyb3VwKVswXTtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC5mb3JtYXRJbnB1dHMoKTtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQuZm9ybWF0SW5wdXRzKCk7XG4gICAgICB0aGF0LnZhbGlkYXRlSW5wdXRzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQuZm9ybWF0SW5wdXRzKCk7XG4gICAgICB0aGF0LnZhbGlkYXRlSW5wdXRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0RGF0ZXBpY2tlcihlbCl7XG4gICAgaWYoZWwpe1xuICAgICAgLy9Ob3RlOiBlbCBtYXkgbm90IGJlIGEgPHN2Zz4sIElFMTEgZG9lcyBub3QgYWRkIC5ibHVyKCkgbWV0aG9kIHRvIHN2ZyBlbGVtZW50cyAoLS0+IGVzYyBhbmQgZW50ZXIgZG9lcyBub3QgZGlzbWlzcyBwaWthZGF5KS4gXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHRoaXMucGlrYWRheUluc3RhbmNlID0gbmV3IFBpa2FkYXkoe1xuICAgICAgICBmaWVsZDogZWwsXG4gICAgICAgIGZvcm1hdDogJ0REL01NL1lZWVknLFxuICAgICAgICBmaXJzdERheTogMSwgLy9tYW5kYWdcbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgIHByZXZpb3VzTW9udGggOiAnRm9ycmlnZSBtw6VuZWQnLFxuICAgICAgICAgIG5leHRNb250aCAgICAgOiAnTsOmc3RlIG3DpW5lZCcsXG4gICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyJywnRmVicnVhcicsJ01hcnRoJywnQXByaWwnLCdNYWonLCdKdW5pJywnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09rdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgd2Vla2RheXMgICAgICA6IFsnU8O4bmRhZycsJ01hbmRhZycsJ1RpcnNkYWcnLCdPbnNkYWcnLCdUb3JzZGFnJywnRnJlZGFnJywnTMO4cmRhZyddLFxuICAgICAgICAgIHdlZWtkYXlzU2hvcnQgOiBbJ1PDuG4nLCdNYW4nLCdUaXInLCdPbnMnLCdUb3InLCdGcmUnLCdMw7hyJ11cbiAgICAgICAgfSxcbiAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAvL3NlbGVjdGVkIG5ldyBkYXRlIGluIHBpa2FkYXksIHVwZGF0ZSBpbnB1dCBmaWVsZHMuIFxuICAgICAgICAgIHRoYXQudXBkYXRlRGF0ZUlucHV0cyhkYXRlKTtcbiAgICAgICAgICB0aGF0LnZhbGlkYXRlSW5wdXRzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAvL3VwZGF0ZSBwaWthZGF5IHdpdGggdmFsdWVzIGZyb20gaW5wdXQgZmllbGRzXG4gICAgICAgICAgdmFyIGRheSA9IHBhcnNlSW50KHRoYXQuZGF5SW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICB2YXIgbW9udGggPSBwYXJzZUludCh0aGF0Lm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlKSAtMTtcbiAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHRoYXQueWVhcklucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgICBpZih0aGF0LnZhbGlkYXRlSW5wdXRzKCkpe1xuICAgICAgICAgICAgdGhhdC51cGRhdGVEYXRlcGlja2VyRGF0ZShuZXdEYXRlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBpbml0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZS5zZXREYXRlKGluaXREYXRlKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZUlucHV0cyhpbml0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVJbnB1dHMoKXtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUpXG4gICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgdmFyIHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgIHZhciBtYXhEYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgdmFyIG1zZyA9IFwiXCI7XG4gICAgdmFyIGlzVmFsaWQgPSB0cnVlOyBcbiAgICBpZihkYXkgPiBtYXhEYXkpe1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgbXNnID0gXCJIb3YsIGRlbiBkYWcgZmluZGVzIGlra2UgaSBkZW4gdmFsZ3RlIG3DpW5lZC5cIlxuICAgICAgdGhpcy5zaG93RXJyb3IobXNnKTtcbiAgICB9ZWxzZSBpZihtb250aCA+IDEyKXtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIG1zZyA9IFwiSG92LCBkZW4gbcOlbmVkIGZpbmRlcyBpa2tlLlwiXG4gICAgICB0aGlzLnNob3dFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGlmKGlzVmFsaWQpe1xuICAgICAgdGhpcy5yZW1vdmVFcnJvcigpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9XG5cbiAgc2hvd0Vycm9yKG1zZyl7XG4gICAgdGhpcy5mb3JtR3JvdXAuY2xhc3NMaXN0LmFkZChcImlucHV0LWVycm9yXCIpO1xuICAgIHNlbGVjdChcIi5pbnB1dC1lcnJvci1tZXNzYWdlXCIsICB0aGlzLmZvcm1Hcm91cClbMF0udGV4dENvbnRlbnQgPSBtc2c7XG4gIH1cbiAgcmVtb3ZlRXJyb3IoKXtcbiAgICB0aGlzLmZvcm1Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5wdXQtZXJyb3JcIik7XG4gICAgc2VsZWN0KFwiLmlucHV0LWVycm9yLW1lc3NhZ2VcIiwgIHRoaXMuZm9ybUdyb3VwKVswXS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVEYXRlSW5wdXRzKGRhdGUpe1xuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIFxuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50LnZhbHVlID0gdGhpcy5kYXlGb3JtYXQoZGF5KTtcbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlID0gdGhpcy5tb250aEZvcm1hdChtb250aCk7XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50LnZhbHVlID0geWVhcjtcbiAgfVxuXG4gIC8vYWRkcyAwIGF0IHRoZSBmcm9udCBvZiBkYXkgbnVtYmVyXG4gIGRheUZvcm1hdChkYXkpe1xuICAgIHJldHVybiAoXCIwXCIgKyBkYXkpLnNsaWNlKC0yKTtcbiAgfVxuICBtb250aEZvcm1hdChtb250aCl7XG4gICAgcmV0dXJuIChcIjBcIiArIG1vbnRoKS5zbGljZSgtMik7XG4gIH1cbiAgZm9ybWF0SW5wdXRzKCl7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRoaXMuZGF5SW5wdXRFbGVtZW50LnZhbHVlKVxuICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUpO1xuXG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmRheUZvcm1hdChkYXkpO1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLm1vbnRoRm9ybWF0KG1vbnRoKTtcbiAgfVxuXG4gIHVwZGF0ZURhdGVwaWNrZXJEYXRlKG5ld0RhdGUpe1xuICAgIHRoaXMucGlrYWRheUluc3RhbmNlLnNldERhdGUobmV3RGF0ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlcGlja2VyR3JvdXA7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBjbG9zZXN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2xvc2VzdCcpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcblxuXG5jbGFzcyBkcm9wZG93biB7XG4gICAgY29uc3RydWN0b3IoZWwpe1xuICAgICAgICB0aGlzLmpzRHJvcGRvd25UcmlnZ2VyID0gXCIuanMtZHJvcGRvd25cIjtcbiAgICAgICAgdGhpcy5qc0Ryb3Bkb3duVGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xuICAgICAgICBcbiAgICAgICAgLy9vcHRpb246IG1ha2UgZHJvcGRvd24gYmVoYXZlIGFzIHRoZSBjb2xsYXBzZSBjb21wb25lbnQgd2hlbiBvbiBzbWFsbCBzY3JlZW5zICh1c2VkIGJ5IHN1Ym1lbnVzIGluIHRoZSBoZWFkZXIgYW5kIHN0ZXAtZHJvcGRvd24pLiBcbiAgICAgICAgdGhpcy5uYXZSZXNwb25zaXZlQnJlYWtwb2ludCA9IDk5MjsgLy9zYW1lIGFzICRuYXYtcmVzcG9uc2l2ZS1icmVha3BvaW50IGZyb20gdGhlIHNjc3MuXG4gICAgICAgIHRoaXMuanNSZXNwb25zaXZlQ29sbGFwc2VNb2RpZmllciA9IFwiLmpzLWRyb3Bkb3duLS1yZXNwb25zaXZlLWNvbGxhcHNlXCJcbiAgICAgICAgdGhpcy5yZXNwb25zaXZlQ29sbGFwc2VFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldEVsID0gbnVsbDtcblxuICAgICAgICB0aGlzLmluaXQoZWwpO1xuXG4gICAgICAgIGlmKHRoaXMudHJpZ2dlckVsICE9PSBudWxsICYmIHRoaXMudHJpZ2dlckVsICE9PSB1bmRlZmluZWQgJiYgdGhpcy50YXJnZXRFbCAhPT0gbnVsbCAmJiB0aGlzLnRhcmdldEVsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgLy9DbGlja2VkIG91dHNpZGUgZHJvcGRvd24gLT4gY2xvc2UgaXRcbiAgICAgICAgICAgIHNlbGVjdCgnYm9keScpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgdGhhdC5vdXRzaWRlQ2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vQ2xpY2tlZCBvbiBkcm9wZG93biBvcGVuIGJ1dHRvbiAtLT4gdG9nZ2xlIGl0XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhhdC50b2dnbGVEcm9wZG93bigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgICAgXG4gICAgfVxuXG4gICAgaW5pdChlbCl7XG4gICAgICAgIHRoaXMudHJpZ2dlckVsID0gZWw7XG4gICAgICAgIGlmKHRoaXMudHJpZ2dlckVsICE9PSBudWxsICYmIHRoaXMudHJpZ2dlckVsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdmFyIHRhcmdldEF0dHIgPSB0aGlzLnRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUodGhpcy5qc0Ryb3Bkb3duVGFyZ2V0KVxuICAgICAgICAgICAgaWYodGFyZ2V0QXR0ciAhPT0gbnVsbCAmJiB0YXJnZXRBdHRyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRFbCA9IHNlbGVjdCh0YXJnZXRBdHRyLCAnYm9keScpO1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldEVsICE9PSBudWxsICYmIHRhcmdldEVsICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0RWwubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RWwgPSB0YXJnZXRFbFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnRyaWdnZXJFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWRyb3Bkb3duLS1yZXNwb25zaXZlLWNvbGxhcHNlJykpe1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlQ29sbGFwc2VFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIHRvZ2dsZURyb3Bkb3duKGZvcmNlQ2xvc2UpIHtcbiAgICAgICAgaWYodGhpcy50cmlnZ2VyRWwgIT09IG51bGwgJiYgdGhpcy50cmlnZ2VyRWwgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnRhcmdldEVsICE9PSBudWxsICYmIHRoaXMudGFyZ2V0RWwgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAvL2NoYW5nZSBzdGF0ZVxuICAgICAgICAgICAgaWYodGhpcy50cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIiB8fCBmb3JjZUNsb3NlKXtcbiAgICAgICAgICAgICAgICAvL2Nsb3NlXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vb3BlblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb3V0c2lkZUNsb3NlKGV2ZW50KXtcbiAgICAgICAgaWYoIXRoaXMuZG9SZXNwb25zaXZlQ29sbGFwc2UoKSl7XG4gICAgICAgICAgICAvL2Nsb3NlcyBkcm9wZG93biB3aGVuIGNsaWNrZWQgb3V0c2lkZS4gXG4gICAgICAgICAgICB2YXIgZHJvcGRvd25FbG0gPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwgdGhpcy50YXJnZXRFbC5pZCk7XG4gICAgICAgICAgICBpZigoZHJvcGRvd25FbG0gPT09IG51bGwgfHwgZHJvcGRvd25FbG0gPT09IHVuZGVmaW5lZCkgJiYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy50cmlnZ2VyRWwpKXtcbiAgICAgICAgICAgICAgICAvL2NsaWNrZWQgb3V0c2lkZSB0cmlnZ2VyLCBmb3JjZSBjbG9zZVxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9SZXNwb25zaXZlQ29sbGFwc2UoKXtcbiAgICAgICAgLy9yZXR1cm5zIHRydWUgaWYgcmVzcG9uc2l2ZSBjb2xsYXBzZSBpcyBlbmFibGVkIGFuZCB3ZSBhcmUgb24gYSBzbWFsbCBzY3JlZW4uIFxuICAgICAgICBpZih0aGlzLnJlc3BvbnNpdmVDb2xsYXBzZUVuYWJsZWQgJiYgd2luZG93LmlubmVyV2lkdGggPD0gdGhpcy5uYXZSZXNwb25zaXZlQnJlYWtwb2ludCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRyb3Bkb3duOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb246ICByZXF1aXJlKCcuL2FjY29yZGlvbicpLFxuICBuYXZpZ2F0aW9uOiByZXF1aXJlKCcuL25hdmlnYXRpb24nKSxcbiAgc2tpcG5hdjogICAgcmVxdWlyZSgnLi9za2lwbmF2JyksXG4gIHZhbGlkYXRvcjogIHJlcXVpcmUoJy4vdmFsaWRhdG9yJyksXG4gIHJlZ2V4bWFzazogIHJlcXVpcmUoJy4vcmVnZXgtaW5wdXQtbWFzaycpLFxuICBjb2xsYXBzZTogICByZXF1aXJlKCcuL2NvbGxhcHNlJylcbn07XG4iLCJcbmNvbnN0IGRvbXJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKTtcblxuLyoqXG4gKiBJbXBvcnQgbW9kYWwgbGliLlxuICogaHR0cHM6Ly9taWNyb21vZGFsLm5vdy5zaFxuICovXG5jb25zdCBtaWNyb01vZGFsID0gcmVxdWlyZShcIi4uLy4uL3ZlbmRvci9taWNyb21vZGFsLmpzXCIpO1xuZG9tcmVhZHkoKCkgPT4ge1xuXHRtaWNyb01vZGFsLmluaXQoKTsgLy9pbml0IGFsbCBtb2RhbHNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi9hY2NvcmRpb24nKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTkFWID0gYC5uYXZgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE9QRU5FUlMgPSBgLmpzLW1lbnUtb3BlbmA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgLmpzLW1lbnUtY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAub3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLm92ZXJsYXlgO1xuY29uc3QgVE9HR0xFUyA9IFsgTkFWLCBPVkVSTEFZIF0uam9pbignLCAnKTtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gJ21vYmlsZV9uYXYtYWN0aXZlJztcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnaXMtdmlzaWJsZSc7XG5cbmNvbnN0IGlzQWN0aXZlID0gKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcblxuY29uc3QgX2ZvY3VzVHJhcCA9ICh0cmFwQ29udGFpbmVyKSA9PiB7XG4gIC8vIEZpbmQgYWxsIGZvY3VzYWJsZSBjaGlsZHJlblxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50c1N0cmluZyA9ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdHJhcENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nKTtcbiAgY29uc3QgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbIDAgXTtcbiAgY29uc3QgbGFzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1sgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSBdO1xuXG4gIGZ1bmN0aW9uIHRyYXBUYWJLZXkgKGUpIHtcbiAgICAvLyBDaGVjayBmb3IgVEFCIGtleSBwcmVzc1xuICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcblxuICAgICAgLy8gU0hJRlQgKyBUQUJcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAvLyBUQUJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVTQ0FQRVxuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICB0b2dnbGVOYXYuY2FsbCh0aGlzLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRm9jdXMgZmlyc3QgY2hpbGRcbiAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbmFibGUgKCkge1xuICAgICAgLy8gTGlzdGVuIGZvciBhbmQgdHJhcCB0aGUga2V5Ym9hcmRcbiAgICAgIHRyYXBDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuICAgIH0sXG5cbiAgICByZWxlYXNlICgpIHtcbiAgICAgIHRyYXBDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5sZXQgZm9jdXNUcmFwO1xuXG5jb25zdCB0b2dnbGVOYXYgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICBpZiAodHlwZW9mIGFjdGl2ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgYWN0aXZlID0gIWlzQWN0aXZlKCk7XG4gIH1cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgYWN0aXZlKTtcblxuICBmb3JFYWNoKHNlbGVjdChUT0dHTEVTKSwgZWwgPT4ge1xuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgYWN0aXZlKTtcbiAgfSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGZvY3VzVHJhcC5lbmFibGUoKTtcbiAgfSBlbHNlIHtcbiAgICBmb2N1c1RyYXAucmVsZWFzZSgpO1xuICB9XG5cbiAgY29uc3QgY2xvc2VCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcblxuICBpZiAoYWN0aXZlICYmIGNsb3NlQnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgYWN0aXZhdGVkLCBzbyBmb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uLFxuICAgIC8vIHdoaWNoIGlzIGp1c3QgYmVmb3JlIGFsbCB0aGUgbmF2IGVsZW1lbnRzIGluIHRoZSB0YWIgb3JkZXIuXG4gICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgfSBlbHNlIGlmICghYWN0aXZlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNsb3NlQnV0dG9uICYmXG4gICAgICAgICAgICAgbWVudUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGRlYWN0aXZhdGVkLCBhbmQgZm9jdXMgd2FzIG9uIHRoZSBjbG9zZVxuICAgIC8vIGJ1dHRvbiwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZpc2libGUuIFdlIGRvbid0IHdhbnQgdGhlIGZvY3VzIHRvXG4gICAgLy8gZGlzYXBwZWFyIGludG8gdGhlIHZvaWQsIHNvIGZvY3VzIG9uIHRoZSBtZW51IGJ1dHRvbiBpZiBpdCdzXG4gICAgLy8gdmlzaWJsZSAodGhpcyBtYXkgaGF2ZSBiZWVuIHdoYXQgdGhlIHVzZXIgd2FzIGp1c3QgZm9jdXNlZCBvbixcbiAgICAvLyBpZiB0aGV5IHRyaWdnZXJlZCB0aGUgbW9iaWxlIG5hdiBieSBtaXN0YWtlKS5cbiAgICBtZW51QnV0dG9uLmZvY3VzKCk7XG4gIH1cblxuICByZXR1cm4gYWN0aXZlO1xufTtcblxuY29uc3QgcmVzaXplID0gKCkgPT4ge1xuICBjb25zdCBjbG9zZXIgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcblxuICBpZiAoaXNBY3RpdmUoKSAmJiBjbG9zZXIgJiYgY2xvc2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoID09PSAwKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgaXMgYWN0aXZlLCBidXQgdGhlIGNsb3NlIGJveCBpc24ndCB2aXNpYmxlLCB3aGljaFxuICAgIC8vIG1lYW5zIHRoZSB1c2VyJ3Mgdmlld3BvcnQgaGFzIGJlZW4gcmVzaXplZCBzbyB0aGF0IGl0IGlzIG5vIGxvbmdlclxuICAgIC8vIGluIG1vYmlsZSBtb2RlLiBMZXQncyBtYWtlIHRoZSBwYWdlIHN0YXRlIGNvbnNpc3RlbnQgYnlcbiAgICAvLyBkZWFjdGl2YXRpbmcgdGhlIG1vYmlsZSBuYXYuXG4gICAgdG9nZ2xlTmF2LmNhbGwoY2xvc2VyLCBmYWxzZSk7XG4gIH1cbn07XG5cbmNvbnN0IG5hdmlnYXRpb24gPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgT1BFTkVSUyBdOiB0b2dnbGVOYXYsXG4gICAgWyBDTE9TRVJTIF06IHRvZ2dsZU5hdixcbiAgICBbIE5BVl9MSU5LUyBdOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBBIG5hdmlnYXRpb24gbGluayBoYXMgYmVlbiBjbGlja2VkISBXZSB3YW50IHRvIGNvbGxhcHNlIGFueVxuICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgIC8vIGNhbiBmb2N1cyBvbiB3aGF0ZXZlciB0aGV5J3ZlIGp1c3Qgc2VsZWN0ZWQuXG5cbiAgICAgIC8vIFNvbWUgbmF2aWdhdGlvbiBsaW5rcyBhcmUgaW5zaWRlIGFjY29yZGlvbnM7IHdoZW4gdGhleSdyZVxuICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuICAgICAgaWYgKGFjYykge1xuICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goYnRuID0+IGFjY29yZGlvbi5oaWRlKGJ0bikpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgbW9iaWxlIG5hdmlnYXRpb24gbWVudSBpcyBhY3RpdmUsIHdlIHdhbnQgdG8gaGlkZSBpdC5cbiAgICAgIGlmIChpc0FjdGl2ZSgpKSB7XG4gICAgICAgIHRvZ2dsZU5hdi5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSwge1xuICBpbml0ICgpIHtcbiAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihOQVYpO1xuXG4gICAgaWYgKHRyYXBDb250YWluZXIpIHtcbiAgICAgIGZvY3VzVHJhcCA9IF9mb2N1c1RyYXAodHJhcENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVzaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xuICB9LFxuICB0ZWFyZG93biAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiBuYXZpZ2F0aW9uLm9uKGVsKSxcbiAgbmF2aWdhdGlvblxuKTsiLCJcbi8qXG4qIFByZXZlbnRzIHRoZSB1c2VyIGZyb20gaW5wdXR0aW5nIGJhc2VkIG9uIGEgcmVnZXguXG4qIERvZXMgbm90IHdvcmsgdGhlIHNhbWUgd2F5IGFmIDxpbnB1dCBwYXR0ZXJuPVwiXCI+LCB0aGlzIHBhdHRlcm4gaXMgb25seSB1c2VkIGZvciB2YWxpZGF0aW9uLCBub3QgdG8gcHJldmVudCBpbnB1dC4gXG4qIFVzZWNhc2U6IG51bWJlciBpbnB1dCBmb3IgZGF0ZS1jb21wb25lbnQuXG4qIEV4YW1wbGUgLSBudW1iZXIgb25seTogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1pbnB1dC1yZWdleD1cIl5cXGQqJFwiPlxuKi9cbid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcblxuY29uc3QgbW9kaWZpZXJTdGF0ZSA9IHtcbiAgc2hpZnQ6IGZhbHNlLFxuICBhbHQ6IGZhbHNlLFxuICBjdHJsOiBmYWxzZSxcbiAgY29tbWFuZDogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlucHV0UmVnZXhNYXNrKGV2ZW50KSB7XG5cbiAgICBpZihtb2RpZmllclN0YXRlLmN0cmwgfHwgbW9kaWZpZXJTdGF0ZS5jb21tYW5kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5ld0NoYXIgPSBudWxsO1xuICAgIGlmKHR5cGVvZiBldmVudC5rZXkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICBpZihldmVudC5rZXkubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBldmVudC5rZXk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZighZXZlbnQuY2hhckNvZGUpe1xuICAgICAgICAgICAgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5jaGFyQ29kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVsZW1lbnQgPSBudWxsO1xuICAgIGlmKGV2ZW50LnRhcmdldCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaWYobmV3Q2hhciAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGlmKG5ld0NoYXIubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBpZihlbGVtZW50LnR5cGUgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7Ly9Ob3RlIGlucHV0W3R5cGU9bnVtYmVyXSBkb2VzIG5vdCBoYXZlIC5zZWxlY3Rpb25TdGFydC9FbmQgKENocm9tZSkuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQpICsgdGhpcy52YWx1ZS5zbGljZShlbGVtZW50LnNlbGVjdGlvbkVuZCkgKyBuZXdDaGFyOyAvL3JlbW92ZXMgdGhlIG51bWJlcnMgc2VsZWN0ZWQgYnkgdGhlIHVzZXIsIHRoZW4gYWRkcyBuZXcgY2hhci4gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByZWdleFN0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbnB1dC1yZWdleFwiKTtcbiAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cChyZWdleFN0cik7XG4gICAgICAgICAgICBpZihyLmV4ZWMobmV3VmFsdWUpID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgJ2tleXByZXNzIHBhc3RlJzoge1xuICAgICdpbnB1dFtkYXRhLWlucHV0LXJlZ2V4XSc6IGlucHV0UmVnZXhNYXNrLFxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IG9uY2UgPSByZXF1aXJlKCdyZWNlcHRvci9vbmNlJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH1za2lwbmF2W2hyZWZePVwiI1wiXWA7XG5cbmNvbnN0IHNldFRhYmluZGV4ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbmNlKGV2ZW50ID0+IHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgTElOSyBdOiBzZXRUYWJpbmRleCxcbiAgfSxcbn0pO1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuXG5kb21yZWFkeSgoKSA9PiB7XG5cdG5ldyBSZXNwb25zaXZlVGFibGVzKCk7IFxufSk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlVGFibGVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgYWxsVGFibGVzID0gc2VsZWN0KCd0YWJsZTpub3QoLmRhdGFUYWJsZSknKTtcbiAgICAgICAgZm9yRWFjaChhbGxUYWJsZXMsIHRhYmxlID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0SGVhZGVyQXNBdHRyaWJ1dGVzKHRhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGRhdGEgYXR0cmlidXRlcyBuZWVkZWQgZm9yIHJlc3BvbnNpdmUgbW9kZS5cbiAgICBpbnNlcnRIZWFkZXJBc0F0dHJpYnV0ZXModGFibGVFbCl7XG4gICAgICAgIGlmICghdGFibGVFbCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgaGVhZGVyQ2VsbEVscyA9ICBzZWxlY3QoJ3RoZWFkIHRoLCB0aGVhZCB0ZCcsIHRhYmxlRWwpO1xuXG4gICAgICAgIC8vY29uc3QgaGVhZGVyQ2VsbEVscyA9IHNlbGVjdChlbC5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZCB0aCwgdGhlYWQgdGQnKTtcbiAgICBcbiAgICAgICAgaWYgKGhlYWRlckNlbGxFbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5Um93RWxzID0gc2VsZWN0KCd0Ym9keSB0cicsIHRhYmxlRWwpO1xuICAgICAgICAgICAgQXJyYXkuZnJvbShib2R5Um93RWxzKS5mb3JFYWNoKHJvd0VsID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbEVscyA9IHJvd0VsLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxFbHMubGVuZ3RoID09PSBoZWFkZXJDZWxsRWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKGhlYWRlckNlbGxFbHMpLmZvckVhY2goKGhlYWRlckNlbGxFbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiBoZWFkZXIgY2VsbCB0ZXh0IGFuZCB1c2UgaXQgYm9keSBjZWxsIGRhdGEgdGl0bGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWxzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScsIGhlYWRlckNlbGxFbC50ZXh0Q29udGVudClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSIsIlxyXG5jb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XHJcbi8vSW1wb3J0IHRpcHB5LmpzIChodHRwczovL2F0b21pa3MuZ2l0aHViLmlvL3RpcHB5anMvKVxyXG5jb25zdCB0aXBweSA9IHJlcXVpcmUoXCJ0aXBweS5qc1wiKTtcclxuXHJcbmRvbXJlYWR5KCgpID0+IHtcclxuICAgIHRpcHB5KCcuanMtdG9vbHRpcCcpIC8vaW5pdCB0b29sdGlwIG9uIGVsZW1lbnRzIHdpdGggdGhlIC5qcy10b29sdGlwIGNsYXNzXHJcbn0pO1xyXG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3ZhbGlkYXRlLWlucHV0Jyk7XG5jb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xuXG5jb25zdCBjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcmV0dXJuIHZhbGlkYXRlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gICdrZXl1cCBjaGFuZ2UnOiB7XG4gICAgJ2lucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XSc6IGNoYW5nZSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG4vKmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiB2YWxpZGF0b3Iub24oZWwpLFxuICB2YWxpZGF0b3Jcbik7Ki9cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwcmVmaXg6ICcnLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRvbXJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuL3V0aWxzL3NlbGVjdCcpO1xuY29uc3QgbW9kZXJuaXpyID0gcmVxdWlyZShcIi4uL3ZlbmRvci9tb2Rlcm5penItY3VzdG9tLmpzXCIpO1xuY29uc3QgZGF0ZXBpY2tlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9kYXRlcGlja2VyJyk7XG5jb25zdCBtb2RhbCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tb2RhbCcpO1xuY29uc3QgdGFibGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGFibGUnKTtcbmNvbnN0IHRvb2x0aXAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9vbHRpcCcpO1xuY29uc3QgZHJvcGRvd24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZHJvcGRvd24nKTtcblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZGVmaW5lIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZSBtaXNzaW5nIGZyb21cbiAqIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcblxuY29uc3QgZGt3ZHMgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuXG5jb25zdCBjb21wb25lbnRzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzJyk7XG5ka3dkcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcblxuZG9tcmVhZHkoKCkgPT4ge1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICBmb3IgKGxldCBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICBjb25zdCBiZWhhdmlvciA9IGNvbXBvbmVudHNbIG5hbWUgXTtcbiAgICBiZWhhdmlvci5vbih0YXJnZXQpO1xuICB9XG5cbiAgLy9Jbml0IGRhdGVwaWNrZXIuICAoTm90ZTogYWJvdmUgJ2JlaGF2aW9yLm9uJyBkb2VzIG5vdCB3b3JrIHdpdGggcGlrYWRheSAtPiBzZXBlcmF0ZSBpbml0aWFsaXphdGlvbilcbiAgY29uc3QganNTZWxlY3RvckRhdGVwaWNrZXIgPSAnLmpzLWNhbGVuZGFyLWdyb3VwJztcbiAgZm9yRWFjaChzZWxlY3QoanNTZWxlY3RvckRhdGVwaWNrZXIpLCBjYWxlbmRhckdyb3VwRWxlbWVudCA9PiB7XG4gICAgbmV3IGRhdGVwaWNrZXIoY2FsZW5kYXJHcm91cEVsZW1lbnQpO1xuICB9KTtcblxuICBjb25zdCBqc1NlbGVjdG9yRHJvcGRvd24gPSAnLmpzLWRyb3Bkb3duJztcbiAgZm9yRWFjaChzZWxlY3QoanNTZWxlY3RvckRyb3Bkb3duKSwgZHJvcGRvd25FbGVtZW50ID0+IHtcbiAgICBuZXcgZHJvcGRvd24oZHJvcGRvd25FbGVtZW50KTtcbiAgfSk7XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRrd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogJ2NsaWNrJyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBlbHByb3RvID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IEhJRERFTiA9ICdoaWRkZW4nO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVscHJvdG8sIEhJRERFTiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEhJRERFTik7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoJ2NsYXNzbGlzdC1wb2x5ZmlsbCcpO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oaWRkZW5cbnJlcXVpcmUoJy4vZWxlbWVudC1oaWRkZW4nKTtcblxucmVxdWlyZSgnY29yZS1qcy9mbi9vYmplY3QvYXNzaWduJyk7XG5yZXF1aXJlKCdjb3JlLWpzL2ZuL2FycmF5L2Zyb20nKTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKCdyZWNlcHRvci9iZWhhdmlvcicpO1xuXG5jb25zdCBzZXF1ZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VxID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBmb3JFYWNoKHNlcSwgbWV0aG9kID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1sgbWV0aG9kIF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1sgbWV0aG9kIF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+IHtcbiAgcmV0dXJuIEJlaGF2aW9yKGV2ZW50cywgYXNzaWduKHtcbiAgICBvbjogICBzZXF1ZW5jZSgnaW5pdCcsICdhZGQnKSxcbiAgICBvZmY6ICBzZXF1ZW5jZSgndGVhcmRvd24nLCAncmVtb3ZlJyksXG4gIH0sIHByb3BzKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGNsb3Nlc3RcbiAqIEBkZXNjIGdldCBuZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBzZWFyY2ggc3RhcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gU2VsZWN0b3IgdG8gYmUgZm91bmQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBOZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb3Nlc3QgKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG4gIHdoaWxlIChlbCkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWw7XG59O1xuIiwiLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzNcbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQgKGVsLCB3aW49d2luZG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gdmFsdWUgPT4ge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBDT05UUk9MUyA9ICdhcmlhLWNvbnRyb2xzJztcbmNvbnN0IEhJRERFTiA9ICdhcmlhLWhpZGRlbic7XG5cbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcblxuICBpZiAodHlwZW9mIGV4cGFuZGVkICE9PSAnYm9vbGVhbicpIHtcbiAgICBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAnZmFsc2UnO1xuICB9XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoRVhQQU5ERUQsIGV4cGFuZGVkKTtcblxuICBjb25zdCBpZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpO1xuICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFjb250cm9scykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdObyB0b2dnbGUgdGFyZ2V0IGZvdW5kIHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJ1xuICAgICk7XG4gIH1cblxuICBjb250cm9scy5zZXRBdHRyaWJ1dGUoSElEREVOLCAhZXhwYW5kZWQpO1xuICByZXR1cm4gZXhwYW5kZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZGF0YXNldCA9IHJlcXVpcmUoJ2VsZW0tZGF0YXNldCcpO1xuXG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5jb25zdCBDSEVDS0VEID0gJ2FyaWEtY2hlY2tlZCc7XG5jb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7UFJFRklYfWNoZWNrbGlzdC1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZSAoZWwpIHtcbiAgY29uc3QgZGF0YSA9IGRhdGFzZXQoZWwpO1xuICBjb25zdCBpZCA9IGRhdGEudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9IGlkLmNoYXJBdCgwKSA9PT0gJyMnXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gIGlmICghY2hlY2tMaXN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgXG4gICAgKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ3ZhbGlkYXRlJykpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKCd2YWxpZGF0ZScubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGF0dGVybiA9IG5ldyBSZWdFeHAoZGF0YVsga2V5IF0pO1xuICAgICAgY29uc3QgdmFsaWRhdG9yU2VsZWN0b3IgPSBgW2RhdGEtdmFsaWRhdG9yPVwiJHt2YWxpZGF0b3JOYW1lfVwiXWA7XG4gICAgICBjb25zdCB2YWxpZGF0b3JDaGVja2JveCA9IGNoZWNrTGlzdC5xdWVyeVNlbGVjdG9yKHZhbGlkYXRvclNlbGVjdG9yKTtcbiAgICAgIGlmICghdmFsaWRhdG9yQ2hlY2tib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBObyB2YWxpZGF0b3IgY2hlY2tib3ggZm91bmQgZm9yOiBcIiR7dmFsaWRhdG9yTmFtZX1cImBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKENIRUNLRUQsIGNoZWNrZWQpO1xuICAgIH1cbiAgfVxufTsiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuTWljcm9Nb2RhbCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHZlcnNpb24gPSBcIjAuMy4xXCI7XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59O1xuXG52YXIgTWljcm9Nb2RhbCA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgRk9DVVNBQkxFX0VMRU1FTlRTID0gWydhW2hyZWZdJywgJ2FyZWFbaHJlZl0nLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLCAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLCAnaWZyYW1lJywgJ29iamVjdCcsICdlbWJlZCcsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknXTtcblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kYWwoX3JlZikge1xuICAgICAgdmFyIHRhcmdldE1vZGFsID0gX3JlZi50YXJnZXRNb2RhbCxcbiAgICAgICAgICBfcmVmJHRyaWdnZXJzID0gX3JlZi50cmlnZ2VycyxcbiAgICAgICAgICB0cmlnZ2VycyA9IF9yZWYkdHJpZ2dlcnMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3JlZiR0cmlnZ2VycyxcbiAgICAgICAgICBfcmVmJG9uU2hvdyA9IF9yZWYub25TaG93LFxuICAgICAgICAgIG9uU2hvdyA9IF9yZWYkb25TaG93ID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAoKSB7fSA6IF9yZWYkb25TaG93LFxuICAgICAgICAgIF9yZWYkb25DbG9zZSA9IF9yZWYub25DbG9zZSxcbiAgICAgICAgICBvbkNsb3NlID0gX3JlZiRvbkNsb3NlID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAoKSB7fSA6IF9yZWYkb25DbG9zZSxcbiAgICAgICAgICBfcmVmJG9wZW5UcmlnZ2VyID0gX3JlZi5vcGVuVHJpZ2dlcixcbiAgICAgICAgICBvcGVuVHJpZ2dlciA9IF9yZWYkb3BlblRyaWdnZXIgPT09IHVuZGVmaW5lZCA/ICdkYXRhLW1pY3JvbW9kYWwtdHJpZ2dlcicgOiBfcmVmJG9wZW5UcmlnZ2VyLFxuICAgICAgICAgIF9yZWYkY2xvc2VUcmlnZ2VyID0gX3JlZi5jbG9zZVRyaWdnZXIsXG4gICAgICAgICAgY2xvc2VUcmlnZ2VyID0gX3JlZiRjbG9zZVRyaWdnZXIgPT09IHVuZGVmaW5lZCA/ICdkYXRhLW1pY3JvbW9kYWwtY2xvc2UnIDogX3JlZiRjbG9zZVRyaWdnZXIsXG4gICAgICAgICAgX3JlZiRkaXNhYmxlU2Nyb2xsID0gX3JlZi5kaXNhYmxlU2Nyb2xsLFxuICAgICAgICAgIGRpc2FibGVTY3JvbGwgPSBfcmVmJGRpc2FibGVTY3JvbGwgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRkaXNhYmxlU2Nyb2xsLFxuICAgICAgICAgIF9yZWYkZGlzYWJsZUZvY3VzID0gX3JlZi5kaXNhYmxlRm9jdXMsXG4gICAgICAgICAgZGlzYWJsZUZvY3VzID0gX3JlZiRkaXNhYmxlRm9jdXMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRkaXNhYmxlRm9jdXMsXG4gICAgICAgICAgX3JlZiRhd2FpdENsb3NlQW5pbWF0ID0gX3JlZi5hd2FpdENsb3NlQW5pbWF0aW9uLFxuICAgICAgICAgIGF3YWl0Q2xvc2VBbmltYXRpb24gPSBfcmVmJGF3YWl0Q2xvc2VBbmltYXQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRhd2FpdENsb3NlQW5pbWF0LFxuICAgICAgICAgIF9yZWYkZGVidWdNb2RlID0gX3JlZi5kZWJ1Z01vZGUsXG4gICAgICAgICAgZGVidWdNb2RlID0gX3JlZiRkZWJ1Z01vZGUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRkZWJ1Z01vZGU7XG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RhbCk7XG5cbiAgICAgIC8vIFNhdmUgYSByZWZlcmVuY2Ugb2YgdGhlIG1vZGFsXG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0TW9kYWwpO1xuXG4gICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXNzZWQgY29uZmlnXG4gICAgICB0aGlzLmNvbmZpZyA9IHsgZGVidWdNb2RlOiBkZWJ1Z01vZGUsIGRpc2FibGVTY3JvbGw6IGRpc2FibGVTY3JvbGwsIG9wZW5UcmlnZ2VyOiBvcGVuVHJpZ2dlciwgY2xvc2VUcmlnZ2VyOiBjbG9zZVRyaWdnZXIsIG9uU2hvdzogb25TaG93LCBvbkNsb3NlOiBvbkNsb3NlLCBhd2FpdENsb3NlQW5pbWF0aW9uOiBhd2FpdENsb3NlQW5pbWF0aW9uLCBkaXNhYmxlRm9jdXM6IGRpc2FibGVGb2N1c1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIGNsaWNrIGV2ZW50cyBvbmx5IGlmIHByZWJpbmRpbmcgZXZlbnRMaXN0ZW5lcnNcbiAgICAgIH07aWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHRoaXMucmVnaXN0ZXJUcmlnZ2Vycy5hcHBseSh0aGlzLCB0b0NvbnN1bWFibGVBcnJheSh0cmlnZ2VycykpO1xuXG4gICAgICAvLyBwcmViaW5kIGZ1bmN0aW9ucyBmb3IgZXZlbnQgbGlzdGVuZXJzXG4gICAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgIHRoaXMub25LZXlkb3duID0gdGhpcy5vbktleWRvd24uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyB0aHJvdWdoIGFsbCBvcGVuVHJpZ2dlcnMgYW5kIGJpbmRzIGNsaWNrIGV2ZW50XG4gICAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzIFtBcnJheSBvZiBub2RlIGVsZW1lbnRzXVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG5cblxuICAgIGNyZWF0ZUNsYXNzKE1vZGFsLCBbe1xuICAgICAga2V5OiAncmVnaXN0ZXJUcmlnZ2VycycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJUcmlnZ2VycygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdHJpZ2dlcnMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICB0cmlnZ2Vyc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHRyaWdnZXIpIHtcbiAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdzaG93TW9kYWwnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3dNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5tb2RhbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuICAgICAgICB0aGlzLnNldEZvY3VzVG9GaXJzdE5vZGUoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxCZWhhdmlvdXIoJ2Rpc2FibGUnKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vblNob3codGhpcy5tb2RhbCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VNb2RhbCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdmFyIG1vZGFsID0gdGhpcy5tb2RhbDtcbiAgICAgICAgdGhpcy5tb2RhbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnNjcm9sbEJlaGF2aW91cignZW5hYmxlJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKHRoaXMubW9kYWwpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hd2FpdENsb3NlQW5pbWF0aW9uKSB7XG4gICAgICAgICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICAgICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdzY3JvbGxCZWhhdmlvdXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNjcm9sbEJlaGF2aW91cih0b2dnbGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5kaXNhYmxlU2Nyb2xsKSByZXR1cm47XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBzd2l0Y2ggKHRvZ2dsZSkge1xuICAgICAgICAgIGNhc2UgJ2VuYWJsZSc6XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHkuc3R5bGUsIHsgb3ZlcmZsb3c6ICdpbml0aWFsJywgaGVpZ2h0OiAnaW5pdGlhbCcgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdkaXNhYmxlJzpcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYm9keS5zdHlsZSwgeyBvdmVyZmxvdzogJ2hpZGRlbicsIGhlaWdodDogJzEwMHZoJyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdhZGRFdmVudExpc3RlbmVycycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25DbGljayk7XG4gICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkNsaWNrKTtcbiAgICAgICAgdGhpcy5tb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5ZG93bik7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbGljaycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmNvbmZpZy5jbG9zZVRyaWdnZXIpKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uS2V5ZG93bicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25LZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykgdGhpcy5jbG9zZU1vZGFsKGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkpIHRoaXMubWFpbnRhaW5Gb2N1cyhldmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnZ2V0Rm9jdXNhYmxlTm9kZXMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZvY3VzYWJsZU5vZGVzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5vZGVzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBub2Rlc1trZXldO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdzZXRGb2N1c1RvRmlyc3ROb2RlJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRGb2N1c1RvRmlyc3ROb2RlKCkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuZGlzYWJsZUZvY3VzKSByZXR1cm47XG4gICAgICAgIHZhciBmb2N1c2FibGVOb2RlcyA9IHRoaXMuZ2V0Rm9jdXNhYmxlTm9kZXMoKTtcbiAgICAgICAgaWYgKGZvY3VzYWJsZU5vZGVzLmxlbmd0aCkgZm9jdXNhYmxlTm9kZXNbMF0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtYWludGFpbkZvY3VzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWludGFpbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHZhciBmb2N1c2FibGVOb2RlcyA9IHRoaXMuZ2V0Rm9jdXNhYmxlTm9kZXMoKTtcblxuICAgICAgICAvLyBpZiBkaXNhYmxlRm9jdXMgaXMgdHJ1ZVxuICAgICAgICBpZiAoIXRoaXMubW9kYWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBmb2N1c2VkSXRlbUluZGV4ID0gZm9jdXNhYmxlTm9kZXMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVOb2Rlc1tmb2N1c2FibGVOb2Rlcy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IGZvY3VzYWJsZU5vZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGZvY3VzYWJsZU5vZGVzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTW9kYWw7XG4gIH0oKTtcblxuICAvKipcbiAgICogTW9kYWwgcHJvdG90eXBlIGVuZHMuXG4gICAqIEhlcmUgb24gY29kZSBpcyByZXBvc2libGUgZm9yIGRldGVjdGluZyBhbmRcbiAgICogYXV0b2JpbmRpbmcgZXZlbnQgaGFuZGxlcnMgb24gbW9kYWwgdHJpZ2dlcnNcbiAgICovXG5cbiAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgb3BlbmVkIG1vZGFsXG5cblxuICB2YXIgYWN0aXZlTW9kYWwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYXNzb2NpYXRpdmUgYXJyYXkgb2YgbW9kYWxzIGFuZCBpdCdzXG4gICAqIHJlc3BlY3RpdmUgdHJpZ2dlcnNcbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzICAgICBBbiBhcnJheSBvZiBhbGwgdHJpZ2dlcnNcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0cmlnZ2VyQXR0ciBUaGUgZGF0YS1hdHRyaWJ1dGUgd2hpY2ggdHJpZ2dlcnMgdGhlIG1vZHVsZVxuICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICovXG4gIHZhciBnZW5lcmF0ZVRyaWdnZXJNYXAgPSBmdW5jdGlvbiBnZW5lcmF0ZVRyaWdnZXJNYXAodHJpZ2dlcnMsIHRyaWdnZXJBdHRyKSB7XG4gICAgdmFyIHRyaWdnZXJNYXAgPSBbXTtcblxuICAgIHRyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHRyaWdnZXIpIHtcbiAgICAgIHZhciB0YXJnZXRNb2RhbCA9IHRyaWdnZXIuYXR0cmlidXRlc1t0cmlnZ2VyQXR0cl0udmFsdWU7XG4gICAgICBpZiAodHJpZ2dlck1hcFt0YXJnZXRNb2RhbF0gPT09IHVuZGVmaW5lZCkgdHJpZ2dlck1hcFt0YXJnZXRNb2RhbF0gPSBbXTtcbiAgICAgIHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdLnB1c2godHJpZ2dlcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJpZ2dlck1hcDtcbiAgfTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIHdoZXRoZXIgYSBtb2RhbCBvZiB0aGUgZ2l2ZW4gaWQgZXhpc3RzXG4gICAqIGluIHRoZSBET01cbiAgICogQHBhcmFtICB7bnVtYmVyfSBpZCAgVGhlIGlkIG9mIHRoZSBtb2RhbFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgdmFyIHZhbGlkYXRlTW9kYWxQcmVzZW5jZSA9IGZ1bmN0aW9uIHZhbGlkYXRlTW9kYWxQcmVzZW5jZShpZCkge1xuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ01pY3JvTW9kYWwgdicgKyB2ZXJzaW9uICsgJzogXFx1Mjc1N1NlZW1zIGxpa2UgeW91IGhhdmUgbWlzc2VkICVjXFwnJyArIGlkICsgJ1xcJycsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsICdJRCBzb21ld2hlcmUgaW4geW91ciBjb2RlLiBSZWZlciBleGFtcGxlIGJlbG93IHRvIHJlc29sdmUgaXQuJyk7XG4gICAgICBjb25zb2xlLndhcm4oJyVjRXhhbXBsZTonLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCAnPGRpdiBjbGFzcz1cIm1vZGFsXCIgaWQ9XCInICsgaWQgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlcmUgYXJlIG1vZGFsIHRyaWdnZXJzIHByZXNlbnRcbiAgICogaW4gdGhlIERPTVxuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgQW4gYXJyYXkgb2YgZGF0YS10cmlnZ2Vyc1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgdmFyIHZhbGlkYXRlVHJpZ2dlclByZXNlbmNlID0gZnVuY3Rpb24gdmFsaWRhdGVUcmlnZ2VyUHJlc2VuY2UodHJpZ2dlcnMpIHtcbiAgICBpZiAodHJpZ2dlcnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnNvbGUud2FybignTWljcm9Nb2RhbCB2JyArIHZlcnNpb24gKyAnOiBcXHUyNzU3UGxlYXNlIHNwZWNpZnkgYXQgbGVhc3Qgb25lICVjXFwnbWljcm9tb2RhbC10cmlnZ2VyXFwnJywgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJ2RhdGEgYXR0cmlidXRlLicpO1xuICAgICAgY29uc29sZS53YXJuKCclY0V4YW1wbGU6JywgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJzxhIGhyZWY9XCIjXCIgZGF0YS1taWNyb21vZGFsLXRyaWdnZXI9XCJteS1tb2RhbFwiPjwvYT4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0cmlnZ2VycyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBtb2RhbHNcbiAgICogYXJlIHByZXNlbnQgaW4gdGhlIERPTVxuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgICBBcnJheSBvZiBET00gbm9kZXMgd2hpY2ggaGF2ZSBkYXRhLXRyaWdnZXJzXG4gICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VyTWFwIEFzc29jaWF0aXZlIGFycmF5IG9mIG1vZGFscyBhbmQgdGhpZXIgdHJpZ2dlcnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciB2YWxpZGF0ZUFyZ3MgPSBmdW5jdGlvbiB2YWxpZGF0ZUFyZ3ModHJpZ2dlcnMsIHRyaWdnZXJNYXApIHtcbiAgICB2YWxpZGF0ZVRyaWdnZXJQcmVzZW5jZSh0cmlnZ2Vycyk7XG4gICAgaWYgKCF0cmlnZ2VyTWFwKSByZXR1cm4gdHJ1ZTtcbiAgICBmb3IgKHZhciBpZCBpbiB0cmlnZ2VyTWFwKSB7XG4gICAgICB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UoaWQpO1xuICAgIH1yZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQmluZHMgY2xpY2sgaGFuZGxlcnMgdG8gYWxsIG1vZGFsIHRyaWdnZXJzXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uIGluaXQoY29uZmlnKSB7XG4gICAgLy8gQ3JlYXRlIGFuIGNvbmZpZyBvYmplY3Qgd2l0aCBkZWZhdWx0IG9wZW5UcmlnZ2VyXG4gICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7IG9wZW5UcmlnZ2VyOiAnZGF0YS1taWNyb21vZGFsLXRyaWdnZXInIH0sIGNvbmZpZyk7XG5cbiAgICAvLyBDb2xsZWN0cyBhbGwgdGhlIG5vZGVzIHdpdGggdGhlIHRyaWdnZXJcbiAgICB2YXIgdHJpZ2dlcnMgPSBbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnWycgKyBvcHRpb25zLm9wZW5UcmlnZ2VyICsgJ10nKSkpO1xuXG4gICAgLy8gTWFrZXMgYSBtYXBwaW5ncyBvZiBtb2RhbHMgd2l0aCB0aGVpciB0cmlnZ2VyIG5vZGVzXG4gICAgdmFyIHRyaWdnZXJNYXAgPSBnZW5lcmF0ZVRyaWdnZXJNYXAodHJpZ2dlcnMsIG9wdGlvbnMub3BlblRyaWdnZXIpO1xuXG4gICAgLy8gQ2hlY2tzIGlmIG1vZGFscyBhbmQgdHJpZ2dlcnMgZXhpc3QgaW4gZG9tXG4gICAgaWYgKG9wdGlvbnMuZGVidWdNb2RlID09PSB0cnVlICYmIHZhbGlkYXRlQXJncyh0cmlnZ2VycywgdHJpZ2dlck1hcCkgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvLyBGb3IgZXZlcnkgdGFyZ2V0IG1vZGFsIGNyZWF0ZXMgYSBuZXcgaW5zdGFuY2VcbiAgICBmb3IgKHZhciBrZXkgaW4gdHJpZ2dlck1hcCkge1xuICAgICAgdmFyIHZhbHVlID0gdHJpZ2dlck1hcFtrZXldO1xuICAgICAgb3B0aW9ucy50YXJnZXRNb2RhbCA9IGtleTtcbiAgICAgIG9wdGlvbnMudHJpZ2dlcnMgPSBbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkodmFsdWUpKTtcbiAgICAgIG5ldyBNb2RhbChvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNob3dzIGEgcGFydGljdWxhciBtb2RhbFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRhcmdldE1vZGFsIFtUaGUgaWQgb2YgdGhlIG1vZGFsIHRvIGRpc3BsYXldXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIFtUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgdG8gcGFzc11cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBzaG93ID0gZnVuY3Rpb24gc2hvdyh0YXJnZXRNb2RhbCwgY29uZmlnKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBjb25maWcgfHwge307XG4gICAgb3B0aW9ucy50YXJnZXRNb2RhbCA9IHRhcmdldE1vZGFsO1xuXG4gICAgLy8gQ2hlY2tzIGlmIG1vZGFscyBhbmQgdHJpZ2dlcnMgZXhpc3QgaW4gZG9tXG4gICAgaWYgKG9wdGlvbnMuZGVidWdNb2RlID09PSB0cnVlICYmIHZhbGlkYXRlTW9kYWxQcmVzZW5jZSh0YXJnZXRNb2RhbCkgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvLyBzdG9yZXMgcmVmZXJlbmNlIHRvIGFjdGl2ZSBtb2RhbFxuICAgIGFjdGl2ZU1vZGFsID0gbmV3IE1vZGFsKG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIGFjdGl2ZU1vZGFsLnNob3dNb2RhbCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGFjdGl2ZSBtb2RhbFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdmFyIGNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgYWN0aXZlTW9kYWwuY2xvc2VNb2RhbCgpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQ6IGluaXQsIHNob3c6IHNob3csIGNsb3NlOiBjbG9zZSB9O1xufSgpO1xuXG5yZXR1cm4gTWljcm9Nb2RhbDtcblxufSkpKTtcbiIsIi8qISBtb2Rlcm5penIgMy42LjAgKEN1c3RvbSBCdWlsZCkgfCBNSVQgKlxuICogaHR0cHM6Ly9tb2Rlcm5penIuY29tL2Rvd25sb2FkLz8tdG91Y2hldmVudHMtc2V0Y2xhc3NlcyAhKi9cbiFmdW5jdGlvbihlLG4sdCl7ZnVuY3Rpb24gbyhlLG4pe3JldHVybiB0eXBlb2YgZT09PW59ZnVuY3Rpb24gcygpe3ZhciBlLG4sdCxzLGEsaSxyO2Zvcih2YXIgbCBpbiBjKWlmKGMuaGFzT3duUHJvcGVydHkobCkpe2lmKGU9W10sbj1jW2xdLG4ubmFtZSYmKGUucHVzaChuLm5hbWUudG9Mb3dlckNhc2UoKSksbi5vcHRpb25zJiZuLm9wdGlvbnMuYWxpYXNlcyYmbi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSlmb3IodD0wO3Q8bi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoO3QrKyllLnB1c2gobi5vcHRpb25zLmFsaWFzZXNbdF0udG9Mb3dlckNhc2UoKSk7Zm9yKHM9byhuLmZuLFwiZnVuY3Rpb25cIik/bi5mbigpOm4uZm4sYT0wO2E8ZS5sZW5ndGg7YSsrKWk9ZVthXSxyPWkuc3BsaXQoXCIuXCIpLDE9PT1yLmxlbmd0aD9Nb2Rlcm5penJbclswXV09czooIU1vZGVybml6cltyWzBdXXx8TW9kZXJuaXpyW3JbMF1daW5zdGFuY2VvZiBCb29sZWFufHwoTW9kZXJuaXpyW3JbMF1dPW5ldyBCb29sZWFuKE1vZGVybml6cltyWzBdXSkpLE1vZGVybml6cltyWzBdXVtyWzFdXT1zKSxmLnB1c2goKHM/XCJcIjpcIm5vLVwiKStyLmpvaW4oXCItXCIpKX19ZnVuY3Rpb24gYShlKXt2YXIgbj11LmNsYXNzTmFtZSx0PU1vZGVybml6ci5fY29uZmlnLmNsYXNzUHJlZml4fHxcIlwiO2lmKHAmJihuPW4uYmFzZVZhbCksTW9kZXJuaXpyLl9jb25maWcuZW5hYmxlSlNDbGFzcyl7dmFyIG89bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCJuby1qcyhcXFxcc3wkKVwiKTtuPW4ucmVwbGFjZShvLFwiJDFcIit0K1wianMkMlwiKX1Nb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzJiYobis9XCIgXCIrdCtlLmpvaW4oXCIgXCIrdCkscD91LmNsYXNzTmFtZS5iYXNlVmFsPW46dS5jbGFzc05hbWU9bil9ZnVuY3Rpb24gaSgpe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIG4uY3JlYXRlRWxlbWVudD9uLmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTpwP24uY3JlYXRlRWxlbWVudE5TLmNhbGwobixcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsYXJndW1lbnRzWzBdKTpuLmNyZWF0ZUVsZW1lbnQuYXBwbHkobixhcmd1bWVudHMpfWZ1bmN0aW9uIHIoKXt2YXIgZT1uLmJvZHk7cmV0dXJuIGV8fChlPWkocD9cInN2Z1wiOlwiYm9keVwiKSxlLmZha2U9ITApLGV9ZnVuY3Rpb24gbChlLHQsbyxzKXt2YXIgYSxsLGYsYyxkPVwibW9kZXJuaXpyXCIscD1pKFwiZGl2XCIpLGg9cigpO2lmKHBhcnNlSW50KG8sMTApKWZvcig7by0tOylmPWkoXCJkaXZcIiksZi5pZD1zP3Nbb106ZCsobysxKSxwLmFwcGVuZENoaWxkKGYpO3JldHVybiBhPWkoXCJzdHlsZVwiKSxhLnR5cGU9XCJ0ZXh0L2Nzc1wiLGEuaWQ9XCJzXCIrZCwoaC5mYWtlP2g6cCkuYXBwZW5kQ2hpbGQoYSksaC5hcHBlbmRDaGlsZChwKSxhLnN0eWxlU2hlZXQ/YS5zdHlsZVNoZWV0LmNzc1RleHQ9ZTphLmFwcGVuZENoaWxkKG4uY3JlYXRlVGV4dE5vZGUoZSkpLHAuaWQ9ZCxoLmZha2UmJihoLnN0eWxlLmJhY2tncm91bmQ9XCJcIixoLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsYz11LnN0eWxlLm92ZXJmbG93LHUuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIix1LmFwcGVuZENoaWxkKGgpKSxsPXQocCxlKSxoLmZha2U/KGgucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChoKSx1LnN0eWxlLm92ZXJmbG93PWMsdS5vZmZzZXRIZWlnaHQpOnAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwKSwhIWx9dmFyIGY9W10sYz1bXSxkPXtfdmVyc2lvbjpcIjMuNi4wXCIsX2NvbmZpZzp7Y2xhc3NQcmVmaXg6XCJcIixlbmFibGVDbGFzc2VzOiEwLGVuYWJsZUpTQ2xhc3M6ITAsdXNlUHJlZml4ZXM6ITB9LF9xOltdLG9uOmZ1bmN0aW9uKGUsbil7dmFyIHQ9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bih0W2VdKX0sMCl9LGFkZFRlc3Q6ZnVuY3Rpb24oZSxuLHQpe2MucHVzaCh7bmFtZTplLGZuOm4sb3B0aW9uczp0fSl9LGFkZEFzeW5jVGVzdDpmdW5jdGlvbihlKXtjLnB1c2goe25hbWU6bnVsbCxmbjplfSl9fSxNb2Rlcm5penI9ZnVuY3Rpb24oKXt9O01vZGVybml6ci5wcm90b3R5cGU9ZCxNb2Rlcm5penI9bmV3IE1vZGVybml6cjt2YXIgdT1uLmRvY3VtZW50RWxlbWVudCxwPVwic3ZnXCI9PT11Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksaD1kLl9jb25maWcudXNlUHJlZml4ZXM/XCIgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gXCIuc3BsaXQoXCIgXCIpOltcIlwiLFwiXCJdO2QuX3ByZWZpeGVzPWg7dmFyIG09ZC50ZXN0U3R5bGVzPWw7TW9kZXJuaXpyLmFkZFRlc3QoXCJ0b3VjaGV2ZW50c1wiLGZ1bmN0aW9uKCl7dmFyIHQ7aWYoXCJvbnRvdWNoc3RhcnRcImluIGV8fGUuRG9jdW1lbnRUb3VjaCYmbiBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpdD0hMDtlbHNle3ZhciBvPVtcIkBtZWRpYSAoXCIsaC5qb2luKFwidG91Y2gtZW5hYmxlZCksKFwiKSxcImhlYXJ0elwiLFwiKVwiLFwieyNtb2Rlcm5penJ7dG9wOjlweDtwb3NpdGlvbjphYnNvbHV0ZX19XCJdLmpvaW4oXCJcIik7bShvLGZ1bmN0aW9uKGUpe3Q9OT09PWUub2Zmc2V0VG9wfSl9cmV0dXJuIHR9KSxzKCksYShmKSxkZWxldGUgZC5hZGRUZXN0LGRlbGV0ZSBkLmFkZEFzeW5jVGVzdDtmb3IodmFyIHY9MDt2PE1vZGVybml6ci5fcS5sZW5ndGg7disrKU1vZGVybml6ci5fcVt2XSgpO2UuTW9kZXJuaXpyPU1vZGVybml6cn0od2luZG93LGRvY3VtZW50KTsiLCIvKiFcbiAqIFBpa2FkYXlcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNCBEYXZpZCBCdXNoZWxsIHwgQlNEICYgTUlUIGxpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZGJ1c2hlbGwvUGlrYWRheVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSlcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbW9tZW50O1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlMgbW9kdWxlXG4gICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtb21lbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uIChyZXEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgICAgIHZhciBpZCA9ICdtb21lbnQnO1xuICAgICAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxKGlkKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KG1vbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuUGlrYWRheSA9IGZhY3Rvcnkocm9vdC5tb21lbnQpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKG1vbWVudClcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBmZWF0dXJlIGRldGVjdGlvbiBhbmQgaGVscGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHZhciBoYXNNb21lbnQgPSB0eXBlb2YgbW9tZW50ID09PSAnZnVuY3Rpb24nLFxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcnMgPSAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG5cbiAgICBzdG8gPSB3aW5kb3cuc2V0VGltZW91dCxcblxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJpbSA9IGZ1bmN0aW9uKHN0cilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywnJyk7XG4gICAgfSxcblxuICAgIGhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY24gKyAnICcpICE9PSAtMTtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbikpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IChlbC5jbGFzc05hbWUgPT09ICcnKSA/IGNuIDogZWwuY2xhc3NOYW1lICsgJyAnICsgY247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0cmltKCgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLnJlcGxhY2UoJyAnICsgY24gKyAnICcsICcgJykpO1xuICAgIH0sXG5cbiAgICBpc0FycmF5ID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvQXJyYXkvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKTtcbiAgICB9LFxuXG4gICAgaXNEYXRlID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvRGF0ZS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpICYmICFpc05hTihvYmouZ2V0VGltZSgpKTtcbiAgICB9LFxuXG4gICAgaXNXZWVrZW5kID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNjtcbiAgICB9LFxuXG4gICAgaXNMZWFwWWVhciA9IGZ1bmN0aW9uKHllYXIpXG4gICAge1xuICAgICAgICAvLyBzb2x1dGlvbiBieSBNYXR0aSBWaXJra3VuZW46IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4ODE5NTFcbiAgICAgICAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9LFxuXG4gICAgZ2V0RGF5c0luTW9udGggPSBmdW5jdGlvbih5ZWFyLCBtb250aClcbiAgICB7XG4gICAgICAgIHJldHVybiBbMzEsIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV1bbW9udGhdO1xuICAgIH0sXG5cbiAgICBzZXRUb1N0YXJ0T2ZEYXkgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkgZGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICB9LFxuXG4gICAgY29tcGFyZURhdGVzID0gZnVuY3Rpb24oYSxiKVxuICAgIHtcbiAgICAgICAgLy8gd2VhayBkYXRlIGNvbXBhcmlzb24gKHVzZSBzZXRUb1N0YXJ0T2ZEYXkoZGF0ZSkgdG8gZW5zdXJlIGNvcnJlY3QgcmVzdWx0KVxuICAgICAgICByZXR1cm4gYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpO1xuICAgIH0sXG5cbiAgICBleHRlbmQgPSBmdW5jdGlvbih0bywgZnJvbSwgb3ZlcndyaXRlKVxuICAgIHtcbiAgICAgICAgdmFyIHByb3AsIGhhc1Byb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBmcm9tKSB7XG4gICAgICAgICAgICBoYXNQcm9wID0gdG9bcHJvcF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wICYmIHR5cGVvZiBmcm9tW3Byb3BdID09PSAnb2JqZWN0JyAmJiBmcm9tW3Byb3BdICE9PSBudWxsICYmIGZyb21bcHJvcF0ubm9kZU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RhdGUoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBuZXcgRGF0ZShmcm9tW3Byb3BdLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGV4dGVuZCh7fSwgZnJvbVtwcm9wXSwgb3ZlcndyaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZSB8fCAhaGFzUHJvcCkge1xuICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG87XG4gICAgfSxcblxuICAgIGZpcmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBldmVudE5hbWUsIGRhdGEpXG4gICAge1xuICAgICAgICB2YXIgZXY7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgICBldi5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZmlyZUV2ZW50KCdvbicgKyBldmVudE5hbWUsIGV2KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGp1c3RDYWxlbmRhciA9IGZ1bmN0aW9uKGNhbGVuZGFyKSB7XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA8IDApIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgLT0gTWF0aC5jZWlsKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCArPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPiAxMSkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciArPSBNYXRoLmZsb29yKE1hdGguYWJzKGNhbGVuZGFyLm1vbnRoKS8xMik7XG4gICAgICAgICAgICBjYWxlbmRhci5tb250aCAtPSAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsZW5kYXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlZmF1bHRzIGFuZCBsb2NhbGlzYXRpb25cbiAgICAgKi9cbiAgICBkZWZhdWx0cyA9IHtcblxuICAgICAgICAvLyBiaW5kIHRoZSBwaWNrZXIgdG8gYSBmb3JtIGZpZWxkXG4gICAgICAgIGZpZWxkOiBudWxsLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgc2hvdy9oaWRlIHRoZSBwaWNrZXIgb24gYGZpZWxkYCBmb2N1cyAoZGVmYXVsdCBgdHJ1ZWAgaWYgYGZpZWxkYCBpcyBzZXQpXG4gICAgICAgIGJvdW5kOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2YgdGhlIGRhdGVwaWNrZXIsIHJlbGF0aXZlIHRvIHRoZSBmaWVsZCAoZGVmYXVsdCB0byBib3R0b20gJiBsZWZ0KVxuICAgICAgICAvLyAoJ2JvdHRvbScgJiAnbGVmdCcga2V5d29yZHMgYXJlIG5vdCB1c2VkLCAndG9wJyAmICdyaWdodCcgYXJlIG1vZGlmaWVyIG9uIHRoZSBib3R0b20vbGVmdCBwb3NpdGlvbilcbiAgICAgICAgcG9zaXRpb246ICdib3R0b20gbGVmdCcsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBmaXQgaW4gdGhlIHZpZXdwb3J0IGV2ZW4gaWYgaXQgbWVhbnMgcmVwb3NpdGlvbmluZyBmcm9tIHRoZSBwb3NpdGlvbiBvcHRpb25cbiAgICAgICAgcmVwb3NpdGlvbjogdHJ1ZSxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBvdXRwdXQgZm9ybWF0IGZvciBgLnRvU3RyaW5nKClgIGFuZCBgZmllbGRgIHZhbHVlXG4gICAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQnLFxuXG4gICAgICAgIC8vIHRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aGljaCBnZXRzIHBhc3NlZCBhIGN1cnJlbnQgZGF0ZSBvYmplY3QgYW5kIGZvcm1hdFxuICAgICAgICAvLyBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICAgICAgICB0b1N0cmluZzogbnVsbCxcblxuICAgICAgICAvLyB1c2VkIHRvIGNyZWF0ZSBkYXRlIG9iamVjdCBmcm9tIGN1cnJlbnQgaW5wdXQgc3RyaW5nXG4gICAgICAgIHBhcnNlOiBudWxsLFxuXG4gICAgICAgIC8vIHRoZSBpbml0aWFsIGRhdGUgdG8gdmlldyB3aGVuIGZpcnN0IG9wZW5lZFxuICAgICAgICBkZWZhdWx0RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBtYWtlIHRoZSBgZGVmYXVsdERhdGVgIHRoZSBpbml0aWFsIHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIHNldERlZmF1bHREYXRlOiBmYWxzZSxcblxuICAgICAgICAvLyBmaXJzdCBkYXkgb2Ygd2VlayAoMDogU3VuZGF5LCAxOiBNb25kYXkgZXRjKVxuICAgICAgICBmaXJzdERheTogMCxcblxuICAgICAgICAvLyB0aGUgZGVmYXVsdCBmbGFnIGZvciBtb21lbnQncyBzdHJpY3QgZGF0ZSBwYXJzaW5nXG4gICAgICAgIGZvcm1hdFN0cmljdDogZmFsc2UsXG5cbiAgICAgICAgLy8gdGhlIG1pbmltdW0vZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtaW5EYXRlOiBudWxsLFxuICAgICAgICAvLyB0aGUgbWF4aW11bS9sYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZFxuICAgICAgICBtYXhEYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG51bWJlciBvZiB5ZWFycyBlaXRoZXIgc2lkZSwgb3IgYXJyYXkgb2YgdXBwZXIvbG93ZXIgcmFuZ2VcbiAgICAgICAgeWVhclJhbmdlOiAxMCxcblxuICAgICAgICAvLyBzaG93IHdlZWsgbnVtYmVycyBhdCBoZWFkIG9mIHJvd1xuICAgICAgICBzaG93V2Vla051bWJlcjogZmFsc2UsXG5cbiAgICAgICAgLy8gV2VlayBwaWNrZXIgbW9kZVxuICAgICAgICBwaWNrV2hvbGVXZWVrOiBmYWxzZSxcblxuICAgICAgICAvLyB1c2VkIGludGVybmFsbHkgKGRvbid0IGNvbmZpZyBvdXRzaWRlKVxuICAgICAgICBtaW5ZZWFyOiAwLFxuICAgICAgICBtYXhZZWFyOiA5OTk5LFxuICAgICAgICBtaW5Nb250aDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhNb250aDogdW5kZWZpbmVkLFxuXG4gICAgICAgIHN0YXJ0UmFuZ2U6IG51bGwsXG4gICAgICAgIGVuZFJhbmdlOiBudWxsLFxuXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcblxuICAgICAgICAvLyBBZGRpdGlvbmFsIHRleHQgdG8gYXBwZW5kIHRvIHRoZSB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICB5ZWFyU3VmZml4OiAnJyxcblxuICAgICAgICAvLyBSZW5kZXIgdGhlIG1vbnRoIGFmdGVyIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG5cbiAgICAgICAgLy8gUmVuZGVyIGRheXMgb2YgdGhlIGNhbGVuZGFyIGdyaWQgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIEFsbG93cyB1c2VyIHRvIHNlbGVjdCBkYXlzIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBlbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIGhvdyBtYW55IG1vbnRocyBhcmUgdmlzaWJsZVxuICAgICAgICBudW1iZXJPZk1vbnRoczogMSxcblxuICAgICAgICAvLyB3aGVuIG51bWJlck9mTW9udGhzIGlzIHVzZWQsIHRoaXMgd2lsbCBoZWxwIHlvdSB0byBjaG9vc2Ugd2hlcmUgdGhlIG1haW4gY2FsZW5kYXIgd2lsbCBiZSAoZGVmYXVsdCBgbGVmdGAsIGNhbiBiZSBzZXQgdG8gYHJpZ2h0YClcbiAgICAgICAgLy8gb25seSB1c2VkIGZvciB0aGUgZmlyc3QgZGlzcGxheSBvciB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBpcyBub3QgdmlzaWJsZVxuICAgICAgICBtYWluQ2FsZW5kYXI6ICdsZWZ0JyxcblxuICAgICAgICAvLyBTcGVjaWZ5IGEgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBjYWxlbmRhciBpblxuICAgICAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBCbHVyIGZpZWxkIHdoZW4gZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICBibHVyRmllbGRPblNlbGVjdCA6IHRydWUsXG5cbiAgICAgICAgLy8gaW50ZXJuYXRpb25hbGl6YXRpb25cbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgcHJldmlvdXNNb250aCA6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICAgICAgICBuZXh0TW9udGggICAgIDogJ05leHQgTW9udGgnLFxuICAgICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoZW1lIENsYXNzbmFtZVxuICAgICAgICB0aGVtZTogbnVsbCxcblxuICAgICAgICAvLyBldmVudHMgYXJyYXlcbiAgICAgICAgZXZlbnRzOiBbXSxcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBvblNlbGVjdDogbnVsbCxcbiAgICAgICAgb25PcGVuOiBudWxsLFxuICAgICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgICBvbkRyYXc6IG51bGwsXG5cbiAgICAgICAgLy8gRW5hYmxlIGtleWJvYXJkIGlucHV0XG4gICAgICAgIGtleWJvYXJkSW5wdXQ6IHRydWVcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0aW5nIGZ1bmN0aW9ucyB0byBhYnN0cmFjdCBIVE1MIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHJlbmRlckRheU5hbWUgPSBmdW5jdGlvbihvcHRzLCBkYXksIGFiYnIpXG4gICAge1xuICAgICAgICBkYXkgKz0gb3B0cy5maXJzdERheTtcbiAgICAgICAgd2hpbGUgKGRheSA+PSA3KSB7XG4gICAgICAgICAgICBkYXkgLT0gNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJiciA/IG9wdHMuaTE4bi53ZWVrZGF5c1Nob3J0W2RheV0gOiBvcHRzLmkxOG4ud2Vla2RheXNbZGF5XTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRGF5ID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdmFyIGFyaWFTZWxlY3RlZCA9ICdmYWxzZSc7XG4gICAgICAgIGlmIChvcHRzLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtb3V0c2lkZS1jdXJyZW50LW1vbnRoJyk7XG5cbiAgICAgICAgICAgICAgICBpZighb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cImlzLWVtcHR5XCI+PC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzVG9kYXkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy10b2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgYXJpYVNlbGVjdGVkID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmhhc0V2ZW50KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaGFzLWV2ZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNJblJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtaW5yYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzU3RhcnRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXN0YXJ0cmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0VuZFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZW5kcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0ZCBkYXRhLWRheT1cIicgKyBvcHRzLmRheSArICdcIiBjbGFzcz1cIicgKyBhcnIuam9pbignICcpICsgJ1wiIGFyaWEtc2VsZWN0ZWQ9XCInICsgYXJpYVNlbGVjdGVkICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtYnV0dG9uIHBpa2EtZGF5XCIgdHlwZT1cImJ1dHRvblwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnZGF0YS1waWthLXllYXI9XCInICsgb3B0cy55ZWFyICsgJ1wiIGRhdGEtcGlrYS1tb250aD1cIicgKyBvcHRzLm1vbnRoICsgJ1wiIGRhdGEtcGlrYS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmRheSArXG4gICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlcldlZWsgPSBmdW5jdGlvbiAoZCwgbSwgeSkge1xuICAgICAgICAvLyBMaWZ0ZWQgZnJvbSBodHRwOi8vamF2YXNjcmlwdC5hYm91dC5jb20vbGlicmFyeS9ibHdlZWt5ZWFyLmh0bSwgbGlnaHRseSBtb2RpZmllZC5cbiAgICAgICAgdmFyIG9uZWphbiA9IG5ldyBEYXRlKHksIDAsIDEpLFxuICAgICAgICAgICAgd2Vla051bSA9IE1hdGguY2VpbCgoKChuZXcgRGF0ZSh5LCBtLCBkKSAtIG9uZWphbikgLyA4NjQwMDAwMCkgKyBvbmVqYW4uZ2V0RGF5KCkrMSkvNyk7XG4gICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwicGlrYS13ZWVrXCI+JyArIHdlZWtOdW0gKyAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJSb3cgPSBmdW5jdGlvbihkYXlzLCBpc1JUTCwgcGlja1dob2xlV2VlaywgaXNSb3dTZWxlY3RlZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRyIGNsYXNzPVwicGlrYS1yb3cnICsgKHBpY2tXaG9sZVdlZWsgPyAnIHBpY2std2hvbGUtd2VlaycgOiAnJykgKyAoaXNSb3dTZWxlY3RlZCA/ICcgaXMtc2VsZWN0ZWQnIDogJycpICsgJ1wiPicgKyAoaXNSVEwgPyBkYXlzLnJldmVyc2UoKSA6IGRheXMpLmpvaW4oJycpICsgJzwvdHI+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyQm9keSA9IGZ1bmN0aW9uKHJvd3MpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0Ym9keT4nICsgcm93cy5qb2luKCcnKSArICc8L3Rib2R5Pic7XG4gICAgfSxcblxuICAgIHJlbmRlckhlYWQgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGFyciA9IFtdO1xuICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aD48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGggc2NvcGU9XCJjb2xcIj48YWJiciB0aXRsZT1cIicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGkpICsgJ1wiPicgKyByZW5kZXJEYXlOYW1lKG9wdHMsIGksIHRydWUpICsgJzwvYWJicj48L3RoPicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRoZWFkPjx0cj4nICsgKG9wdHMuaXNSVEwgPyBhcnIucmV2ZXJzZSgpIDogYXJyKS5qb2luKCcnKSArICc8L3RyPjwvdGhlYWQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGl0bGUgPSBmdW5jdGlvbihpbnN0YW5jZSwgYywgeWVhciwgbW9udGgsIHJlZlllYXIsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHZhciBpLCBqLCBhcnIsXG4gICAgICAgICAgICBvcHRzID0gaW5zdGFuY2UuX28sXG4gICAgICAgICAgICBpc01pblllYXIgPSB5ZWFyID09PSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICBpc01heFllYXIgPSB5ZWFyID09PSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICBodG1sID0gJzxkaXYgaWQ9XCInICsgcmFuZElkICsgJ1wiIGNsYXNzPVwicGlrYS10aXRsZVwiIHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+JyxcbiAgICAgICAgICAgIG1vbnRoSHRtbCxcbiAgICAgICAgICAgIHllYXJIdG1sLFxuICAgICAgICAgICAgcHJldiA9IHRydWUsXG4gICAgICAgICAgICBuZXh0ID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGFyciA9IFtdLCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArICh5ZWFyID09PSByZWZZZWFyID8gaSAtIGMgOiAxMiArIGkgLSBjKSArICdcIicgK1xuICAgICAgICAgICAgICAgIChpID09PSBtb250aCA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICtcbiAgICAgICAgICAgICAgICAoKGlzTWluWWVhciAmJiBpIDwgb3B0cy5taW5Nb250aCkgfHwgKGlzTWF4WWVhciAmJiBpID4gb3B0cy5tYXhNb250aCkgPyAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJyA6ICcnKSArICc+JyArXG4gICAgICAgICAgICAgICAgb3B0cy5pMThuLm1vbnRoc1tpXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vbnRoSHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyBvcHRzLmkxOG4ubW9udGhzW21vbnRoXSArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QtbW9udGhcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgaSA9IG9wdHMueWVhclJhbmdlWzBdO1xuICAgICAgICAgICAgaiA9IG9wdHMueWVhclJhbmdlWzFdICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPSB5ZWFyIC0gb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICBqID0gMSArIHllYXIgKyBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYXJyID0gW107IGkgPCBqICYmIGkgPD0gb3B0cy5tYXhZZWFyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID49IG9wdHMubWluWWVhcikge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCInICsgKGkgPT09IHllYXIgPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArICc+JyArIChpKSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5ZWFySHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyB5ZWFyICsgb3B0cy55ZWFyU3VmZml4ICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC15ZWFyXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAob3B0cy5zaG93TW9udGhBZnRlclllYXIpIHtcbiAgICAgICAgICAgIGh0bWwgKz0geWVhckh0bWwgKyBtb250aEh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodG1sICs9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWluWWVhciAmJiAobW9udGggPT09IDAgfHwgb3B0cy5taW5Nb250aCA+PSBtb250aCkpIHtcbiAgICAgICAgICAgIHByZXYgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01heFllYXIgJiYgKG1vbnRoID09PSAxMSB8fCBvcHRzLm1heE1vbnRoIDw9IG1vbnRoKSkge1xuICAgICAgICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLXByZXYnICsgKHByZXYgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5wcmV2aW91c01vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09IChpbnN0YW5jZS5fby5udW1iZXJPZk1vbnRocyAtIDEpICkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtbmV4dCcgKyAobmV4dCA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLm5leHRNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgfSxcblxuICAgIHJlbmRlclRhYmxlID0gZnVuY3Rpb24ob3B0cywgZGF0YSwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJwaWthLXRhYmxlXCIgcm9sZT1cImdyaWRcIiBhcmlhLWxhYmVsbGVkYnk9XCInICsgcmFuZElkICsgJ1wiPicgKyByZW5kZXJIZWFkKG9wdHMpICsgcmVuZGVyQm9keShkYXRhKSArICc8L3RhYmxlPic7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUGlrYWRheSBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFBpa2FkYXkgPSBmdW5jdGlvbihvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgb3B0cyA9IHNlbGYuY29uZmlnKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlbGYuX29uTW91c2VEb3duID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1idXR0b24nKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZW1wdHknKSAmJiAhaGFzQ2xhc3ModGFyZ2V0LnBhcmVudE5vZGUsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShuZXcgRGF0ZSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EteWVhcicpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtbW9udGgnKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLWRheScpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYmx1ckZpZWxkT25TZWxlY3QgJiYgb3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtcHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJldk1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV4dE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyB0b3VjaCBldmVudCBwcmV2ZW50IG1vdXNlIGV2ZW50cyBlbXVsYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC1tb250aCcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvTW9udGgodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LXllYXInKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b1llYXIodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbktleUNoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgICAgICAgICAgaWYgKHNlbGYuaXNWaXNpYmxlKCkpIHtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChlLmtleUNvZGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnYWRkJywgNyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkYXRlO1xuXG4gICAgICAgICAgICBpZiAoZS5maXJlZEJ5ID09PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMucGFyc2UpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gb3B0cy5wYXJzZShvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQsIG9wdHMuZm9ybWF0U3RyaWN0KTtcbiAgICAgICAgICAgICAgICBkYXRlID0gKGRhdGUgJiYgZGF0ZS5pc1ZhbGlkKCkpID8gZGF0ZS50b0RhdGUoKSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRGb2N1cyA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENsaWNrID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Qmx1ciA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSUUgYWxsb3dzIHBpa2EgZGl2IHRvIGdhaW4gZm9jdXM7IGNhdGNoIGJsdXIgdGhlIGlucHV0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcEVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2MpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9iID0gc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9jID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgcEVsID0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0V2ZW50TGlzdGVuZXJzICYmIGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5vbmNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KHRhcmdldCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykgfHwgcEVsID09PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLl92ICYmIHRhcmdldCAhPT0gb3B0cy50cmlnZ2VyICYmIHBFbCAhPT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZWxmLmVsLmNsYXNzTmFtZSA9ICdwaWthLXNpbmdsZScgKyAob3B0cy5pc1JUTCA/ICcgaXMtcnRsJyA6ICcnKSArIChvcHRzLnRoZW1lID8gJyAnICsgb3B0cy50aGVtZSA6ICcnKTtcblxuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnbW91c2Vkb3duJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAndG91Y2hlbmQnLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG5cbiAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgc2VsZi5fb25LZXlDaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIG9wdHMuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmVsLCBvcHRzLmZpZWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCBzZWxmLl9vbklucHV0Q2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKCFvcHRzLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBvcHRzLmZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5zZXREZWZhdWx0RGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmRGF0ZSA9IG9wdHMuZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKGlzRGF0ZShkZWZEYXRlKSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2V0RGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGVmRGF0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b0RhdGUoZGVmRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgKz0gJyBpcy1ib3VuZCc7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHNlbGYuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHNlbGYuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgc2VsZi5fb25JbnB1dEJsdXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBwdWJsaWMgUGlrYWRheSBBUElcbiAgICAgKi9cbiAgICBQaWthZGF5LnByb3RvdHlwZSA9IHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb25maWd1cmUgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgKi9cbiAgICAgICAgY29uZmlnOiBmdW5jdGlvbihvcHRpb25zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX28pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvcHRzID0gZXh0ZW5kKHRoaXMuX28sIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgICAgICAgICBvcHRzLmlzUlRMID0gISFvcHRzLmlzUlRMO1xuXG4gICAgICAgICAgICBvcHRzLmZpZWxkID0gKG9wdHMuZmllbGQgJiYgb3B0cy5maWVsZC5ub2RlTmFtZSkgPyBvcHRzLmZpZWxkIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy50aGVtZSA9ICh0eXBlb2Ygb3B0cy50aGVtZSkgPT09ICdzdHJpbmcnICYmIG9wdHMudGhlbWUgPyBvcHRzLnRoZW1lIDogbnVsbDtcblxuICAgICAgICAgICAgb3B0cy5ib3VuZCA9ICEhKG9wdHMuYm91bmQgIT09IHVuZGVmaW5lZCA/IG9wdHMuZmllbGQgJiYgb3B0cy5ib3VuZCA6IG9wdHMuZmllbGQpO1xuXG4gICAgICAgICAgICBvcHRzLnRyaWdnZXIgPSAob3B0cy50cmlnZ2VyICYmIG9wdHMudHJpZ2dlci5ub2RlTmFtZSkgPyBvcHRzLnRyaWdnZXIgOiBvcHRzLmZpZWxkO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVXZWVrZW5kcyA9ICEhb3B0cy5kaXNhYmxlV2Vla2VuZHM7XG5cbiAgICAgICAgICAgIG9wdHMuZGlzYWJsZURheUZuID0gKHR5cGVvZiBvcHRzLmRpc2FibGVEYXlGbikgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRpc2FibGVEYXlGbiA6IG51bGw7XG5cbiAgICAgICAgICAgIHZhciBub20gPSBwYXJzZUludChvcHRzLm51bWJlck9mTW9udGhzLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIG9wdHMubnVtYmVyT2ZNb250aHMgPSBub20gPiA0ID8gNCA6IG5vbTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvcHRzLm1pbkRhdGUgJiYgb3B0cy5tYXhEYXRlKSAmJiBvcHRzLm1heERhdGUgPCBvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbkRhdGUob3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1heERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1heERhdGUob3B0cy5tYXhEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZhbGxiYWNrID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gMTA7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2VbMF0gPSBwYXJzZUludChvcHRzLnllYXJSYW5nZVswXSwgMTApIHx8IGZhbGxiYWNrO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzFdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMV0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy55ZWFyUmFuZ2UgPSBNYXRoLmFicyhwYXJzZUludChvcHRzLnllYXJSYW5nZSwgMTApKSB8fCBkZWZhdWx0cy55ZWFyUmFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMueWVhclJhbmdlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uICh1c2luZyBNb21lbnQuanMgaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuX28uZm9ybWF0O1xuICAgICAgICAgICAgaWYgKCFpc0RhdGUodGhpcy5fZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fby50b1N0cmluZykge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fby50b1N0cmluZyh0aGlzLl9kLCBmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuX2QpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2QudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybiBhIE1vbWVudC5qcyBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb21lbnQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGhhc01vbWVudCA/IG1vbWVudCh0aGlzLl9kKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gZnJvbSBhIE1vbWVudC5qcyBvYmplY3QgKGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHNldE1vbWVudDogZnVuY3Rpb24oZGF0ZSwgcHJldmVudE9uU2VsZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50ICYmIG1vbWVudC5pc01vbWVudChkYXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlLnRvRGF0ZSgpLCBwcmV2ZW50T25TZWxlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBEYXRlIG9iamVjdCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGdldERhdGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGlzRGF0ZSh0aGlzLl9kKSA/IG5ldyBEYXRlKHRoaXMuX2QuZ2V0VGltZSgpKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHNldERhdGU6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuX28ubWluRGF0ZSxcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLl9vLm1heERhdGU7XG5cbiAgICAgICAgICAgIGlmIChpc0RhdGUobWluKSAmJiBkYXRlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1pbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG1heCkgJiYgZGF0ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodGhpcy5fZCk7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKHRoaXMuX2QpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRPblNlbGVjdCAmJiB0eXBlb2YgdGhpcy5fby5vblNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLmdldERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b0RhdGU6IGZ1bmN0aW9uKGRhdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBuZXdDYWxlbmRhciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxlbmRhcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzWzBdLnllYXIsIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlID0gbmV3IERhdGUodGhpcy5jYWxlbmRhcnNbdGhpcy5jYWxlbmRhcnMubGVuZ3RoLTFdLnllYXIsIHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVEYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBlbmQgb2YgdGhlIG1vbnRoXG4gICAgICAgICAgICAgICAgbGFzdFZpc2libGVEYXRlLnNldE1vbnRoKGxhc3RWaXNpYmxlRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXREYXRlKGxhc3RWaXNpYmxlRGF0ZS5nZXREYXRlKCktMSk7XG4gICAgICAgICAgICAgICAgbmV3Q2FsZW5kYXIgPSAodmlzaWJsZURhdGUgPCBmaXJzdFZpc2libGVEYXRlLmdldFRpbWUoKSB8fCBsYXN0VmlzaWJsZURhdGUuZ2V0VGltZSgpIDwgdmlzaWJsZURhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3Q2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLm1haW5DYWxlbmRhciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCArPSAxIC0gdGhpcy5fby5udW1iZXJPZk1vbnRocztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0RGF0ZTogZnVuY3Rpb24oc2lnbiwgZGF5cykge1xuXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXREYXRlKCkgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gcGFyc2VJbnQoZGF5cykqMjQqNjAqNjAqMTAwMDtcblxuICAgICAgICAgICAgdmFyIG5ld0RheTtcblxuICAgICAgICAgICAgaWYgKHNpZ24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSArIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaWduID09PSAnc3VidHJhY3QnKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF5ID0gbmV3IERhdGUoZGF5LnZhbHVlT2YoKSAtIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldERhdGUobmV3RGF5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0gPSBhZGp1c3RDYWxlbmRhcih0aGlzLmNhbGVuZGFyc1swXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMTsgYyA8IHRoaXMuX28ubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2NdID0gYWRqdXN0Q2FsZW5kYXIoe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKyBjLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiB0aGlzLmNhbGVuZGFyc1swXS55ZWFyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvVG9kYXk6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBtb250aCAoemVyby1pbmRleCwgZS5nLiAwOiBKYW51YXJ5KVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b01vbnRoOiBmdW5jdGlvbihtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTihtb250aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgrKztcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldk1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLS07XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGZ1bGwgeWVhciAoZS5nLiBcIjIwMTJcIilcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9ZZWFyOiBmdW5jdGlvbih5ZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHllYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1pbkRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1pbkRhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSBkZWZhdWx0cy5taW5EYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSBkZWZhdWx0cy5taW5ZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSBkZWZhdWx0cy5taW5Nb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSBkZWZhdWx0cy5zdGFydFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtYXhEYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNYXhEYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSBkZWZhdWx0cy5tYXhEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IGRlZmF1bHRzLm1heFllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IGRlZmF1bHRzLm1heE1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSBkZWZhdWx0cy5lbmRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U3RhcnRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEVuZFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZWZyZXNoIHRoZSBIVE1MXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3OiBmdW5jdGlvbihmb3JjZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92ICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBtaW5ZZWFyID0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgICAgIG1heFllYXIgPSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICAgICAgbWluTW9udGggPSBvcHRzLm1pbk1vbnRoLFxuICAgICAgICAgICAgICAgIG1heE1vbnRoID0gb3B0cy5tYXhNb250aCxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgcmFuZElkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5feSA8PSBtaW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1pblllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtaW5Nb250aCkgJiYgdGhpcy5fbSA8IG1pbk1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtaW5Nb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5feSA+PSBtYXhZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1heFllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtYXhNb250aCkgJiYgdGhpcy5fbSA+IG1heE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtYXhNb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJhbmRJZCA9ICdwaWthLXRpdGxlLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb3B0cy5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInBpa2EtbGVuZGFyXCI+JyArIHJlbmRlclRpdGxlKHRoaXMsIGMsIHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCB0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCByYW5kSWQpICsgdGhpcy5yZW5kZXIodGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHJhbmRJZCkgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGlmKG9wdHMuZmllbGQudHlwZSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy50cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uRHJhdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25EcmF3KHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgc2NyZWVuIHJlYWRlciB1c2VyIGtub3cgdG8gdXNlIGFycm93IGtleXNcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdVc2UgdGhlIGFycm93IGtleXMgdG8gcGljayBhIGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RQb3NpdGlvbjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmllbGQsIHBFbCwgd2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIHNjcm9sbFRvcCwgbGVmdCwgdG9wLCBjbGllbnRSZWN0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5jb250YWluZXIpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgICAgIGZpZWxkID0gdGhpcy5fby50cmlnZ2VyO1xuICAgICAgICAgICAgcEVsID0gZmllbGQ7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50UmVjdCA9IGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdG9wID0gY2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgID0gcEVsLm9mZnNldFRvcCArIHBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2hpbGUoKHBFbCA9IHBFbC5vZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgKz0gcEVsLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgcG9zaXRpb24gaXMgYm90dG9tICYgbGVmdFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgbGVmdCArIHdpZHRoID4gdmlld3BvcnRXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigncmlnaHQnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIHRvcCArIGhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICsgc2Nyb2xsVG9wKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCd0b3AnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW5kZXIgSFRNTCBmb3IgYSBwYXJ0aWN1bGFyIG1vbnRoXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCByYW5kSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzICAgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG5vdyAgICA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5cyAgID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFxuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXRhICAgPSBbXSxcbiAgICAgICAgICAgICAgICByb3cgICAgPSBbXTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheShub3cpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZmlyc3REYXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlIC09IG9wdHMuZmlyc3REYXk7XG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlICs9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSAxLFxuICAgICAgICAgICAgICAgIG5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIDEsXG4gICAgICAgICAgICAgICAgeWVhck9mUHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8geWVhciAtIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIHllYXJPZk5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IHllYXIgKyAxIDogeWVhcixcbiAgICAgICAgICAgICAgICBkYXlzSW5QcmV2aW91c01vbnRoID0gZ2V0RGF5c0luTW9udGgoeWVhck9mUHJldmlvdXNNb250aCwgcHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBkYXlzICsgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyID0gY2VsbHM7XG4gICAgICAgICAgICB3aGlsZShhZnRlciA+IDcpIHtcbiAgICAgICAgICAgICAgICBhZnRlciAtPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMgKz0gNyAtIGFmdGVyO1xuICAgICAgICAgICAgdmFyIGlzV2Vla1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgciA9IDA7IGkgPCBjZWxsczsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBkYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSArIChpIC0gYmVmb3JlKSksXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSBpc0RhdGUodGhpcy5fZCkgPyBjb21wYXJlRGF0ZXMoZGF5LCB0aGlzLl9kKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc1RvZGF5ID0gY29tcGFyZURhdGVzKGRheSwgbm93KSxcbiAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQgPSBvcHRzLmV2ZW50cy5pbmRleE9mKGRheS50b0RhdGVTdHJpbmcoKSkgIT09IC0xID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5ID0gaSA8IGJlZm9yZSB8fCBpID49IChkYXlzICsgYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5TnVtYmVyID0gMSArIChpIC0gYmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBtb250aCxcbiAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXIsXG4gICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5zdGFydFJhbmdlLCBkYXkpLFxuICAgICAgICAgICAgICAgICAgICBpc0VuZFJhbmdlID0gb3B0cy5lbmRSYW5nZSAmJiBjb21wYXJlRGF0ZXMob3B0cy5lbmRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNJblJhbmdlID0gb3B0cy5zdGFydFJhbmdlICYmIG9wdHMuZW5kUmFuZ2UgJiYgb3B0cy5zdGFydFJhbmdlIDwgZGF5ICYmIGRheSA8IG9wdHMuZW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSAob3B0cy5taW5EYXRlICYmIGRheSA8IG9wdHMubWluRGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm1heERhdGUgJiYgZGF5ID4gb3B0cy5tYXhEYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZVdlZWtlbmRzICYmIGlzV2Vla2VuZChkYXkpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMuZGlzYWJsZURheUZuICYmIG9wdHMuZGlzYWJsZURheUZuKGRheSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheXNJblByZXZpb3VzTW9udGggKyBkYXlOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IHByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mUHJldmlvdXNNb250aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IGRheU51bWJlciAtIGRheXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aE51bWJlciA9IG5leHRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyT2ZOZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF5Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogbW9udGhOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiB5ZWFyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXZlbnQ6IGhhc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9kYXk6IGlzVG9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbXB0eTogaXNFbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3RhcnRSYW5nZTogaXNTdGFydFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZTogaXNFbmRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZTogaXNJblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBvcHRzLmVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoc1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucGlja1dob2xlV2VlayAmJiBpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzV2Vla1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb3cucHVzaChyZW5kZXJEYXkoZGF5Q29uZmlnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKytyID09PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cudW5zaGlmdChyZW5kZXJXZWVrKGkgLSBiZWZvcmUsIG1vbnRoLCB5ZWFyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHJlbmRlclJvdyhyb3csIG9wdHMuaXNSVEwsIG9wdHMucGlja1dob2xlV2VlaywgaXNXZWVrU2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZW5kZXJUYWJsZShvcHRzLCBkYXRhLCByYW5kSWQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzVmlzaWJsZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdjtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsICdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uT3Blbi5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdjtcbiAgICAgICAgICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnOyAvLyByZXNldFxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRoaXMuX28ub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdBTUUgT1ZFUlxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX287XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICd0b3VjaGVuZCcsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICBpZiAob3B0cy5rZXlib2FyZElucHV0KSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fb25LZXlDaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgdGhpcy5fb25JbnB1dENoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCB0aGlzLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHRoaXMuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBQaWthZGF5O1xufSkpO1xuIl19
