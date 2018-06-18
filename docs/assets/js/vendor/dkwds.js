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

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],72:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/is-in-viewport":95,"../utils/toggle":99,"array-filter":1,"array-foreach":2,"object-assign":66}],75:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/toggle":99}],76:[function(require,module,exports){
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

},{"../../vendor/pikaday.js":103,"../utils/behavior":93,"../utils/closest":94,"../utils/select":96}],77:[function(require,module,exports){
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

},{"../utils/behavior":93,"../utils/closest":94,"../utils/select":96,"array-foreach":2}],78:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/select":96,"./accordion":74,"array-foreach":2,"lodash.debounce":65}],79:[function(require,module,exports){
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

},{"./accordion":74,"./banner":75,"./dropdown":77,"./footer":78,"./nav-submenu":81,"./navigation":82,"./password":83,"./regex-input-mask":84,"./search":85,"./skipnav":86,"./validator":87}],80:[function(require,module,exports){
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

},{"../../vendor/micromodal.js":101,"domready":62}],81:[function(require,module,exports){
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

},{"../utils/behavior":93,"../utils/closest":94,"../utils/select":96,"array-foreach":2}],82:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/select":96,"./accordion":74,"array-foreach":2,"object-assign":66}],83:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/toggle-form-input":98}],84:[function(require,module,exports){

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

},{"../utils/behavior":93}],85:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"../utils/select":96,"array-foreach":2,"object-assign":66,"receptor/ignore":71}],86:[function(require,module,exports){
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

},{"../config":88,"../events":90,"../utils/behavior":93,"receptor/once":72}],87:[function(require,module,exports){
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

},{"../utils/behavior":93,"../utils/validate-input":100,"lodash.debounce":65}],88:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: ''
};

},{}],89:[function(require,module,exports){
'use strict';

var domready = require('domready');
var forEach = require('array-foreach');
var select = require('./utils/select');
var modernizr = require("../vendor/modernizr-custom.js");
var datepicker = require('./components/datepicker');
var modal = require('./components/modal');

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
});

module.exports = dkwds;

},{"../vendor/modernizr-custom.js":102,"./components":79,"./components/datepicker":76,"./components/modal":80,"./config":88,"./polyfills":92,"./utils/select":96,"array-foreach":2,"domready":62}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

require('core-js/fn/object/assign');
require('core-js/fn/array/from');

},{"./element-hidden":91,"classlist-polyfill":4,"core-js/fn/array/from":5,"core-js/fn/object/assign":6}],93:[function(require,module,exports){
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

},{"array-foreach":2,"object-assign":66,"receptor/behavior":67}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./select":96,"./toggle-field-mask":97,"array-foreach":2,"resolve-id-refs":73}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"../config":88,"elem-dataset":63}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"moment":3}]},{},[89])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbGlzdC1wb2x5ZmlsbC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2RvbXJlYWR5L3JlYWR5LmpzIiwibm9kZV9tb2R1bGVzL2VsZW0tZGF0YXNldC9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VsZW1lbnQtY2xvc2VzdC9lbGVtZW50LWNsb3Nlc3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9pZ25vcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3Ivb25jZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZXNvbHZlLWlkLXJlZnMvaW5kZXguanMiLCJzcmMvanMvY29tcG9uZW50cy9hY2NvcmRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9iYW5uZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9kYXRlcGlja2VyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbmF2LXN1Ym1lbnUuanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcGFzc3dvcmQuanMiLCJzcmMvanMvY29tcG9uZW50cy9yZWdleC1pbnB1dC1tYXNrLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2tpcG5hdi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9jb25maWcuanMiLCJzcmMvanMvZGt3ZHMuanMiLCJzcmMvanMvZXZlbnRzLmpzIiwic3JjL2pzL3BvbHlmaWxscy9lbGVtZW50LWhpZGRlbi5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvaW5kZXguanMiLCJzcmMvanMvdXRpbHMvYmVoYXZpb3IuanMiLCJzcmMvanMvdXRpbHMvY2xvc2VzdC5qcyIsInNyYy9qcy91dGlscy9pcy1pbi12aWV3cG9ydC5qcyIsInNyYy9qcy91dGlscy9zZWxlY3QuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLmpzIiwic3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0LmpzIiwic3JjL3ZlbmRvci9taWNyb21vZGFsLmpzIiwic3JjL3ZlbmRvci9tb2Rlcm5penItY3VzdG9tLmpzIiwic3JjL3ZlbmRvci9waWthZGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7Ozs7Ozs7OztBQVVBLE9BQU8sT0FBUCxHQUFpQixVQUFVLEdBQVYsRUFBZSxFQUFmLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3hDLE1BQUksSUFBSSxNQUFSLEVBQWdCLE9BQU8sSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLElBQWYsQ0FBUDtBQUNoQixNQUFJLEtBQUssQ0FBTCxLQUFXLEdBQVgsSUFBa0IsU0FBUyxHQUEvQixFQUFvQyxNQUFNLElBQUksU0FBSixFQUFOO0FBQ3BDLE1BQUksY0FBYyxPQUFPLEVBQXpCLEVB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MEIsTUFBMUIsRUFBa0MsS0FBSyxZQUF2QztBQUNIO0FBQ0o7QUFDRCxnQkFBSSxLQUFLLEVBQUwsQ0FBUSxVQUFaLEVBQXdCO0FBQ3BCLHFCQUFLLEVBQUwsQ0FBUSxVQUFSLENBQW1CLFdBQW5CLENBQStCLEtBQUssRUFBcEM7QUFDSDtBQUNKOztBQXBqQmUsS0FBcEI7O0FBd2pCQSxXQUFPLE9BQVA7QUFDSCxDQXR0Q0EsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuLyoqXG4gKiBBcnJheSNmaWx0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3Q9fSBzZWxmXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvdyBUeXBlRXJyb3JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBzZWxmKSB7XG4gIGlmIChhcnIuZmlsdGVyKSByZXR1cm4gYXJyLmZpbHRlcihmbiwgc2VsZik7XG4gIGlmICh2b2lkIDAgPT09IGFyciB8fCBudWxsID09PSBhcnIpIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgdmFyIHJldCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwoYXJyLCBpKSkgY29udGludWU7XG4gICAgdmFyIHZhbCA9IGFycltpXTtcbiAgICBpZiAoZm4uY2FsbChzZWxmLCB2YWwsIGksIGFycikpIHJldC5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuIiwiLyoqXG4gKiBhcnJheS1mb3JlYWNoXG4gKiAgIEFycmF5I2ZvckVhY2ggcG9ueWZpbGwgZm9yIG9sZGVyIGJyb3dzZXJzXG4gKiAgIChQb255ZmlsbDogQSBwb2x5ZmlsbCB0aGF0IGRvZXNuJ3Qgb3ZlcndyaXRlIHRoZSBuYXRpdmUgbWV0aG9kKVxuICogXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdhZGEvYXJyYXktZm9yZWFjaFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDE2IFRha3V0byBXYWRhXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoL2Jsb2IvbWFzdGVyL01JVC1MSUNFTlNFXG4gKi9cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JFYWNoIChhcnksIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgaWYgKGFyeS5mb3JFYWNoKSB7XG4gICAgICAgIGFyeS5mb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBhcnlbaV0sIGksIGFyeSk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpmWlcxd2RIa3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE3MDQyN1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IERlZGljYXRlZCB0byB0aGUgcHVibGljIGRvbWFpbi5cbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbi8vIEZ1bGwgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHdpdGggbm8gY2xhc3NMaXN0IHN1cHBvcnRcbi8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSkgXG5cdHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCEoJ0VsZW1lbnQnIGluIHZpZXcpKSByZXR1cm47XG5cbnZhclxuXHQgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG5cdCwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuXHQsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG5cdCwgb2JqQ3RyID0gT2JqZWN0XG5cdCwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHR9XG5cdCwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuXHRcdHZhclxuXHRcdFx0ICBpID0gMFxuXHRcdFx0LCBsZW4gPSB0aGlzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXHQvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcblx0LCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy5uYW1lID0gdHlwZTtcblx0XHR0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXHQsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG5cdFx0aWYgKHRva2VuID09PSBcIlwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJTWU5UQVhfRVJSXCJcblx0XHRcdFx0LCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG5cdFx0XHRcdCwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcblx0fVxuXHQsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcblx0XHRcdCwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG5cdFx0XHQsIGkgPSAwXG5cdFx0XHQsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChjbGFzc2VzW2ldKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuXHRcdH07XG5cdH1cblx0LCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cblx0LCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG5cdH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcblx0cmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHR0b2tlbiArPSBcIlwiO1xuXHRyZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcblx0XHRcdHRoaXMucHVzaCh0b2tlbik7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0XHQsIGluZGV4XG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0d2hpbGUgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuLCBmb3JjZSkge1xuXHR0b2tlbiArPSBcIlwiO1xuXG5cdHZhclxuXHRcdCAgcmVzdWx0ID0gdGhpcy5jb250YWlucyh0b2tlbilcblx0XHQsIG1ldGhvZCA9IHJlc3VsdCA/XG5cdFx0XHRmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG5cdFx0OlxuXHRcdFx0Zm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcblx0O1xuXG5cdGlmIChtZXRob2QpIHtcblx0XHR0aGlzW21ldGhvZF0odG9rZW4pO1xuXHR9XG5cblx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGZvcmNlID09PSBmYWxzZSkge1xuXHRcdHJldHVybiBmb3JjZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gIXJlc3VsdDtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcblx0dmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuXHRcdCAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcblx0XHQsIGVudW1lcmFibGU6IHRydWVcblx0XHQsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9O1xuXHR0cnkge1xuXHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0fSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG5cdFx0Ly8gYWRkaW5nIHVuZGVmaW5lZCB0byBmaWdodCB0aGlzIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9pc3N1ZXMvMzZcblx0XHQvLyBtb2Rlcm5pZSBJRTgtTVNXNyBtYWNoaW5lIGhhcyBJRTggOC4wLjYwMDEuMTg3MDIgYW5kIGlzIGFmZmVjdGVkXG5cdFx0aWYgKGV4Lm51bWJlciA9PT0gdW5kZWZpbmVkIHx8IGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcblx0XHRcdGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcblx0XHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0XHR9XG5cdH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuXHRlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHdpbmRvdy5zZWxmKSk7XG5cbn1cblxuLy8gVGhlcmUgaXMgZnVsbCBvciBwYXJ0aWFsIG5hdGl2ZSBjbGFzc0xpc3Qgc3VwcG9ydCwgc28ganVzdCBjaGVjayBpZiB3ZSBuZWVkXG4vLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuXHQvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cblx0aWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuXHRcdHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcblx0XHRcdHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuXHRcdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdFx0dmFyIGksIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dG9rZW4gPSBhcmd1bWVudHNbaV07XG5cdFx0XHRcdFx0b3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fTtcblx0XHRjcmVhdGVNZXRob2QoJ2FkZCcpO1xuXHRcdGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG5cdH1cblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3Rcblx0Ly8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHRpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcblx0XHR2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG5cdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcblx0XHRcdGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuXHRcdFx0XHRyZXR1cm4gZm9yY2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdH1cblxuXHR0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuXG59XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjcnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE4IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvKiFcbiAgKiBkb21yZWFkeSAoYykgRHVzdGluIERpYXogMjAxNCAtIExpY2Vuc2UgTUlUXG4gICovXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG5cbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmbnMgPSBbXSwgbGlzdGVuZXJcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoYWNrID0gZG9jLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpXG5cblxuICBpZiAoIWxvYWRlZClcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIpXG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGZucy5zaGlmdCgpKSBsaXN0ZW5lcigpXG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXG4gIH1cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIDwzIE1vZGVybml6clxuLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL01vZGVybml6ci9Nb2Rlcm5penIvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9kb20vZGF0YXNldC5qc1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUoKSB7XG5cdHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWEtYicsICdjJyk7XG5cblx0cmV0dXJuIEJvb2xlYW4oZWxlbS5kYXRhc2V0ICYmIGVsZW0uZGF0YXNldC5hQiA9PT0gJ2MnKTtcbn1cblxuZnVuY3Rpb24gbmF0aXZlRGF0YXNldChlbGVtZW50KSB7XG5cdHJldHVybiBlbGVtZW50LmRhdGFzZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBuYXRpdmVEYXRhc2V0IDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIG1hcCA9IHt9O1xuXHR2YXIgYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlcztcblxuXHRmdW5jdGlvbiBnZXR0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWU7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXR0ZXIobmFtZSwgdmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMCwgaiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0dmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG5cblx0XHRpZiAoYXR0cmlidXRlKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuXG5cdFx0XHRpZiAobmFtZS5pbmRleE9mKCdkYXRhLScpID09PSAwKSB7XG5cdFx0XHRcdHZhciBwcm9wID0gbmFtZS5zbGljZSg1KS5yZXBsYWNlKC8tLi9nLCBmdW5jdGlvbiAodSkge1xuXHRcdFx0XHRcdHJldHVybiB1LmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgdmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwgcHJvcCwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBnZXR0ZXIuYmluZCh7IHZhbHVlOiB2YWx1ZSB8fCAnJyB9KSxcblx0XHRcdFx0XHRzZXQ6IHNldHRlci5iaW5kKGVsZW1lbnQsIG5hbWUpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXA7XG59O1xuXG4iLCIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcblxuKGZ1bmN0aW9uIChFbGVtZW50UHJvdG8pIHtcblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8ubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gRWxlbWVudFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiBtYXRjaGVzKHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIGluZGV4ID0gMDtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0KytpbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudHNbaW5kZXhdKTtcblx0XHR9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8uY2xvc2VzdCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXHR9XG59KSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGRlbGVnYXRlQWxsID0gcmVxdWlyZSgnLi4vZGVsZWdhdGVBbGwnKTtcblxuY29uc3QgREVMRUdBVEVfUEFUVEVSTiA9IC9eKC4rKTpkZWxlZ2F0ZVxcKCguKylcXCkkLztcbmNvbnN0IFNQQUNFID0gJyAnO1xuXG5jb25zdCBnZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gIHZhciBtYXRjaCA9IHR5cGUubWF0Y2goREVMRUdBVEVfUEFUVEVSTik7XG4gIHZhciBzZWxlY3RvcjtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdHlwZSA9IG1hdGNoWzFdO1xuICAgIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gIH1cblxuICB2YXIgb3B0aW9ucztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBjYXB0dXJlOiBwb3BLZXkoaGFuZGxlciwgJ2NhcHR1cmUnKSxcbiAgICAgIHBhc3NpdmU6IHBvcEtleShoYW5kbGVyLCAncGFzc2l2ZScpXG4gICAgfTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZGVsZWdhdGU6ICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpXG4gICAgICA/IGRlbGVnYXRlQWxsKGhhbmRsZXIpXG4gICAgICA6IHNlbGVjdG9yXG4gICAgICAgID8gZGVsZWdhdGUoc2VsZWN0b3IsIGhhbmRsZXIpXG4gICAgICAgIDogaGFuZGxlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgaWYgKHR5cGUuaW5kZXhPZihTUEFDRSkgPiAtMSkge1xuICAgIHJldHVybiB0eXBlLnNwbGl0KFNQQUNFKS5tYXAoZnVuY3Rpb24oX3R5cGUpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe3R5cGU6IF90eXBlfSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG52YXIgcG9wS2V5ID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGRlbGV0ZSBvYmpba2V5XTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWhhdmlvcihldmVudHMsIHByb3BzKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgICAucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModHlwZSwgZXZlbnRzW3R5cGVdKTtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChsaXN0ZW5lcnMpO1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZEJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmVCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHByb3BzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoZnVuY3Rpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5zb21lKGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKSA9PT0gZmFsc2U7XG4gICAgfSwgdGhpcyk7XG4gIH07XG59O1xuIiwiY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgY29tcG9zZSA9IHJlcXVpcmUoJy4uL2NvbXBvc2UnKTtcblxuY29uc3QgU1BMQVQgPSAnKic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGVBbGwoc2VsZWN0b3JzKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpXG5cbiAgLy8gWFhYIG9wdGltaXphdGlvbjogaWYgdGhlcmUgaXMgb25seSBvbmUgaGFuZGxlciBhbmQgaXQgYXBwbGllcyB0b1xuICAvLyBhbGwgZWxlbWVudHMgKHRoZSBcIipcIiBDU1Mgc2VsZWN0b3IpLCB0aGVuIGp1c3QgcmV0dXJuIHRoYXRcbiAgLy8gaGFuZGxlclxuICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gU1BMQVQpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW1NQTEFUXTtcbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHNlbGVjdG9yKSB7XG4gICAgbWVtby5wdXNoKGRlbGVnYXRlKHNlbGVjdG9yLCBzZWxlY3RvcnNbc2VsZWN0b3JdKSk7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGNvbXBvc2UoZGVsZWdhdGVzKTtcbn07XG4iLCIvLyBwb2x5ZmlsbCBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0XG5yZXF1aXJlKCdlbGVtZW50LWNsb3Nlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZShzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlbGVnYXRpb24oZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRhcmdldCwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpZ25vcmFuY2UoZSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBlLnRhcmdldCAmJiAhZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uY2UobGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbiB3cmFwcGVkT25jZShlKSB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCB3cmFwcGVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzLCBlKTtcbiAgfTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSRV9UUklNID0gLyheXFxzKyl8KFxccyskKS9nO1xudmFyIFJFX1NQTElUID0gL1xccysvO1xuXG52YXIgdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbVxuICA/IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoUkVfVFJJTSwgJycpOyB9O1xuXG52YXIgcXVlcnlCeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZUlkcyhpZHMsIGRvYykge1xuICBpZiAodHlwZW9mIGlkcyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBnb3QgJyArICh0eXBlb2YgaWRzKSk7XG4gIH1cblxuICBpZiAoIWRvYykge1xuICAgIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBnZXRFbGVtZW50QnlJZCA9IGRvYy5nZXRFbGVtZW50QnlJZFxuICAgID8gZG9jLmdldEVsZW1lbnRCeUlkLmJpbmQoZG9jKVxuICAgIDogcXVlcnlCeUlkLmJpbmQoZG9jKTtcblxuICBpZHMgPSB0cmltKGlkcykuc3BsaXQoUkVfU1BMSVQpO1xuXG4gIC8vIFhYWCB3ZSBjYW4gc2hvcnQtY2lyY3VpdCBoZXJlIGJlY2F1c2UgdHJpbW1pbmcgYW5kIHNwbGl0dGluZyBhXG4gIC8vIHN0cmluZyBvZiBqdXN0IHdoaXRlc3BhY2UgcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSxcbiAgLy8gZW1wdHkgc3RyaW5nXG4gIGlmIChpZHMubGVuZ3RoID09PSAxICYmIGlkc1swXSA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gaWRzXG4gICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGVsID0gZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmaWx0ZXIgPSByZXF1aXJlKCdhcnJheS1maWx0ZXInKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUnKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKCcuLi91dGlscy9pcy1pbi12aWV3cG9ydCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG4vLyBYWFggbWF0Y2ggLmFjY29yZGlvbiBhbmQgLmFjY29yZGlvbi1ib3JkZXJlZFxuY29uc3QgQUNDT1JESU9OID0gYC4ke1BSRUZJWH1hY2NvcmRpb24sIC4ke1BSRUZJWH1hY2NvcmRpb24tYm9yZGVyZWRgO1xuY29uc3QgQlVUVE9OID0gYC4ke1BSRUZJWH1hY2NvcmRpb24tYnV0dG9uW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgTVVMVElTRUxFQ1RBQkxFID0gJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJztcblxuLyoqXG4gKiBUb2dnbGUgYSBidXR0b24ncyBcInByZXNzZWRcIiBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtib29sZWFuP30gZXhwYW5kZWQgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICovXG5jb25zdCB0b2dnbGVCdXR0b24gPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICB2YXIgYWNjb3JkaW9uID0gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKTtcbiAgaWYgKCFhY2NvcmRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7QlVUVE9OfSBpcyBtaXNzaW5nIG91dGVyICR7QUNDT1JESU9OfWApO1xuICB9XG5cbiAgZXhwYW5kZWQgPSB0b2dnbGUoYnV0dG9uLCBleHBhbmRlZCk7XG4gIC8vIFhYWCBtdWx0aXNlbGVjdGFibGUgaXMgb3B0LWluLCB0byBwcmVzZXJ2ZSBsZWdhY3kgYmVoYXZpb3JcbiAgY29uc3QgbXVsdGlzZWxlY3RhYmxlID0gYWNjb3JkaW9uLmdldEF0dHJpYnV0ZShNVUxUSVNFTEVDVEFCTEUpID09PSAndHJ1ZSc7XG5cbiAgaWYgKGV4cGFuZGVkICYmICFtdWx0aXNlbGVjdGFibGUpIHtcbiAgICBmb3JFYWNoKGdldEFjY29yZGlvbkJ1dHRvbnMoYWNjb3JkaW9uKSwgb3RoZXIgPT4ge1xuICAgICAgaWYgKG90aGVyICE9PSBidXR0b24pIHtcbiAgICAgICAgdG9nZ2xlKG90aGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNob3dCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgdHJ1ZSk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZVxuICovXG5jb25zdCBoaWRlQnV0dG9uID0gYnV0dG9uID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIGZhbHNlKTtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgYnV0dG9uIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGFjY29yZGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYWNjb3JkaW9uXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MQnV0dG9uRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldEFjY29yZGlvbkJ1dHRvbnMgPSBhY2NvcmRpb24gPT4ge1xuICByZXR1cm4gZmlsdGVyKGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgcmV0dXJuIGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTikgPT09IGFjY29yZGlvbjtcbiAgfSk7XG59O1xuXG5jb25zdCBhY2NvcmRpb24gPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbih0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIC8vIFdlIHdlcmUganVzdCBleHBhbmRlZCwgYnV0IGlmIGFub3RoZXIgYWNjb3JkaW9uIHdhcyBhbHNvIGp1c3RcbiAgICAgICAgLy8gY29sbGFwc2VkLCB3ZSBtYXkgbm8gbG9uZ2VyIGJlIGluIHRoZSB2aWV3cG9ydC4gVGhpcyBlbnN1cmVzXG4gICAgICAgIC8vIHRoYXQgd2UgYXJlIHN0aWxsIHZpc2libGUsIHNvIHRoZSB1c2VyIGlzbid0IGNvbmZ1c2VkLlxuICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcykpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSwge1xuICBpbml0OiByb290ID0+IHtcbiAgICBmb3JFYWNoKHJvb3QucXVlcnlTZWxlY3RvckFsbChCVVRUT04pLCBidXR0b24gPT4ge1xuICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ3RydWUnO1xuICAgICAgdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAgIH0pO1xuICB9LFxuICBBQ0NPUkRJT04sXG4gIEJVVFRPTixcbiAgc2hvdzogc2hvd0J1dHRvbixcbiAgaGlkZTogaGlkZUJ1dHRvbixcbiAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gIGdldEJ1dHRvbnM6IGdldEFjY29yZGlvbkJ1dHRvbnMsXG59KTtcblxuLyoqXG4gKiBUT0RPOiBmb3IgMi4wLCByZW1vdmUgZXZlcnl0aGluZyBiZWxvdyB0aGlzIGNvbW1lbnQgYW5kIGV4cG9ydCB0aGVcbiAqIGJlaGF2aW9yIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBBY2NvcmRpb24gPSBmdW5jdGlvbiAocm9vdCkge1xuICB0aGlzLnJvb3QgPSByb290O1xuICBhY2NvcmRpb24ub24odGhpcy5yb290KTtcbn07XG5cbi8vIGNvcHkgYWxsIG9mIHRoZSBiZWhhdmlvciBtZXRob2RzIGFuZCBwcm9wcyB0byBBY2NvcmRpb25cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmFzc2lnbihBY2NvcmRpb24sIGFjY29yZGlvbik7XG5cbkFjY29yZGlvbi5wcm90b3R5cGUuc2hvdyA9IHNob3dCdXR0b247XG5BY2NvcmRpb24ucHJvdG90eXBlLmhpZGUgPSBoaWRlQnV0dG9uO1xuXG5BY2NvcmRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgYWNjb3JkaW9uLm9mZih0aGlzLnJvb3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH1iYW5uZXItaGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfWJhbm5lci1oZWFkZXItZXhwYW5kZWRgO1xuXG5jb25zdCB0b2dnbGVCYW5uZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIGAke0hFQURFUn0gW2FyaWEtY29udHJvbHNdYCBdOiB0b2dnbGVCYW5uZXIsXG4gIH0sXG59KTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBQaWthZGF5ID0gcmVxdWlyZShcIi4uLy4uL3ZlbmRvci9waWthZGF5LmpzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBjbG9zZXN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2xvc2VzdCcpO1xuXG5jb25zdCBqc0RhdGVwaWNrZXJTZWxlY3RvciA9ICcuanMtY2FsZW5kYXItZGF0ZXBpY2tlcic7XG5jb25zdCBqc0RheUlucHV0ID0gJy5qcy1jYWxlbmRhci1kYXktaW5wdXQnO1xuY29uc3QganNNb250aElucHV0ID0gJy5qcy1jYWxlbmRhci1tb250aC1pbnB1dCc7XG5jb25zdCBqc1llYXJJbnB1dCA9ICcuanMtY2FsZW5kYXIteWVhci1pbnB1dCc7XG5cbmNsYXNzIGRhdGVwaWNrZXJHcm91cCB7XG4gIGNvbnN0cnVjdG9yKGVsKXtcbiAgICBcbiAgICB0aGlzLnBpa2FkYXlJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5kYXRlcGlja2VyRWxlbWVudCA9IHNlbGVjdChqc0RhdGVwaWNrZXJTZWxlY3RvciwgZWwpO1xuICAgIHRoaXMuZGF0ZUdyb3VwID0gZWw7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBjbG9zZXN0KGVsLCAnLmZvcm0tZ3JvdXAnKTtcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy55ZWFySW5wdXRFbGVtZW50ID0gbnVsbDsgICBcblxuICAgIHRoaXMuaW5pdERhdGVJbnB1dHMoKTtcbiAgICB0aGlzLmluaXREYXRlcGlja2VyKHRoaXMuZGF0ZXBpY2tlckVsZW1lbnRbMF0pO1xuICB9XG5cbiAgaW5pdERhdGVJbnB1dHMoKXtcbiAgICB0aGlzLmRheUlucHV0RWxlbWVudCA9IHNlbGVjdChqc0RheUlucHV0LCB0aGlzLmRhdGVHcm91cClbMF1cbiAgICB0aGlzLm1vbnRoSW5wdXRFbGVtZW50ID0gc2VsZWN0KGpzTW9udGhJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdO1xuICAgIHRoaXMueWVhcklucHV0RWxlbWVudCA9IHNlbGVjdChqc1llYXJJbnB1dCwgdGhpcy5kYXRlR3JvdXApWzBdO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIHRoaXMuZGF5SW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGF0LmZvcm1hdElucHV0cygpO1xuICAgICAgdGhhdC52YWxpZGF0ZUlucHV0cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC5mb3JtYXRJbnB1dHMoKTtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMueWVhcklucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgdGhhdC5mb3JtYXRJbnB1dHMoKTtcbiAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXREYXRlcGlja2VyKGVsKXtcbiAgICBpZihlbCl7XG4gICAgICAvL05vdGU6IGVsIG1heSBub3QgYmUgYSA8c3ZnPiwgSUUxMSBkb2VzIG5vdCBhZGQgLmJsdXIoKSBtZXRob2QgdG8gc3ZnIGVsZW1lbnRzICgtLT4gZXNjIGFuZCBlbnRlciBkb2VzIG5vdCBkaXNtaXNzIHBpa2FkYXkpLiBcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdGhpcy5waWthZGF5SW5zdGFuY2UgPSBuZXcgUGlrYWRheSh7XG4gICAgICAgIGZpZWxkOiBlbCxcbiAgICAgICAgZm9ybWF0OiAnREQvTU0vWVlZWScsXG4gICAgICAgIGZpcnN0RGF5OiAxLCAvL21hbmRhZ1xuICAgICAgICBpMThuOiB7XG4gICAgICAgICAgcHJldmlvdXNNb250aCA6ICdGb3JyaWdlIG3DpW5lZCcsXG4gICAgICAgICAgbmV4dE1vbnRoICAgICA6ICdOw6ZzdGUgbcOlbmVkJyxcbiAgICAgICAgICBtb250aHMgICAgICAgIDogWydKYW51YXInLCdGZWJydWFyJywnTWFydGgnLCdBcHJpbCcsJ01haicsJ0p1bmknLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2t0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICB3ZWVrZGF5cyAgICAgIDogWydTw7huZGFnJywnTWFuZGFnJywnVGlyc2RhZycsJ09uc2RhZycsJ1RvcnNkYWcnLCdGcmVkYWcnLCdMw7hyZGFnJ10sXG4gICAgICAgICAgd2Vla2RheXNTaG9ydCA6IFsnU8O4bicsJ01hbicsJ1RpcicsJ09ucycsJ1RvcicsJ0ZyZScsJ0zDuHInXVxuICAgICAgICB9LFxuICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgIC8vc2VsZWN0ZWQgbmV3IGRhdGUgaW4gcGlrYWRheSwgdXBkYXRlIGlucHV0IGZpZWxkcy4gXG4gICAgICAgICAgdGhhdC51cGRhdGVEYXRlSW5wdXRzKGRhdGUpO1xuICAgICAgICAgIHRoYXQudmFsaWRhdGVJbnB1dHMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PcGVuOiBmdW5jdGlvbigpe1xuICAgICAgICAgIC8vdXBkYXRlIHBpa2FkYXkgd2l0aCB2YWx1ZXMgZnJvbSBpbnB1dCBmaWVsZHNcbiAgICAgICAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhhdC5kYXlJbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRoYXQubW9udGhJbnB1dEVsZW1lbnQudmFsdWUpIC0xO1xuICAgICAgICAgIHZhciB5ZWFyID0gcGFyc2VJbnQodGhhdC55ZWFySW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgIGlmKHRoYXQudmFsaWRhdGVJbnB1dHMoKSl7XG4gICAgICAgICAgICB0aGF0LnVwZGF0ZURhdGVwaWNrZXJEYXRlKG5ld0RhdGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIGluaXREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMucGlrYWRheUluc3RhbmNlLnNldERhdGUoaW5pdERhdGUpO1xuICAgICAgdGhpcy51cGRhdGVEYXRlSW5wdXRzKGluaXREYXRlKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0cygpe1xuICAgIHZhciBkYXkgPSBwYXJzZUludCh0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSlcbiAgICB2YXIgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoSW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB2YXIgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcklucHV0RWxlbWVudC52YWx1ZSk7XG4gICAgdmFyIG1heERheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XG5cbiAgICB2YXIgbXNnID0gXCJcIjtcbiAgICB2YXIgaXNWYWxpZCA9IHRydWU7IFxuICAgIGlmKGRheSA+IG1heERheSl7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBtc2cgPSBcIkhvdiwgZGVuIGRhZyBmaW5kZXMgaWtrZSBpIGRlbiB2YWxndGUgbcOlbmVkLlwiXG4gICAgICB0aGlzLnNob3dFcnJvcihtc2cpO1xuICAgIH1lbHNlIGlmKG1vbnRoID4gMTIpe1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgbXNnID0gXCJIb3YsIGRlbiBtw6VuZWQgZmluZGVzIGlra2UuXCJcbiAgICAgIHRoaXMuc2hvd0Vycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgaWYoaXNWYWxpZCl7XG4gICAgICB0aGlzLnJlbW92ZUVycm9yKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH1cblxuICBzaG93RXJyb3IobXNnKXtcbiAgICB0aGlzLmZvcm1Hcm91cC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZXJyb3JcIik7XG4gICAgc2VsZWN0KFwiLmlucHV0LWVycm9yLW1lc3NhZ2VcIiwgIHRoaXMuZm9ybUdyb3VwKVswXS50ZXh0Q29udGVudCA9IG1zZztcbiAgfVxuICByZW1vdmVFcnJvcigpe1xuICAgIHRoaXMuZm9ybUdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnB1dC1lcnJvclwiKTtcbiAgICBzZWxlY3QoXCIuaW5wdXQtZXJyb3ItbWVzc2FnZVwiLCAgdGhpcy5mb3JtR3JvdXApWzBdLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIHVwZGF0ZURhdGVJbnB1dHMoZGF0ZSl7XG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgXG4gICAgdGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmRheUZvcm1hdChkYXkpO1xuICAgIHRoaXMubW9udGhJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLm1vbnRoRm9ybWF0KG1vbnRoKTtcbiAgICB0aGlzLnllYXJJbnB1dEVsZW1lbnQudmFsdWUgPSB5ZWFyO1xuICB9XG5cbiAgLy9hZGRzIDAgYXQgdGhlIGZyb250IG9mIGRheSBudW1iZXJcbiAgZGF5Rm9ybWF0KGRheSl7XG4gICAgcmV0dXJuIChcIjBcIiArIGRheSkuc2xpY2UoLTIpO1xuICB9XG4gIG1vbnRoRm9ybWF0KG1vbnRoKXtcbiAgICByZXR1cm4gKFwiMFwiICsgbW9udGgpLnNsaWNlKC0yKTtcbiAgfVxuICBmb3JtYXRJbnB1dHMoKXtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlJbnB1dEVsZW1lbnQudmFsdWUpXG4gICAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSk7XG5cbiAgICB0aGlzLmRheUlucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMuZGF5Rm9ybWF0KGRheSk7XG4gICAgdGhpcy5tb250aElucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMubW9udGhGb3JtYXQobW9udGgpO1xuICB9XG5cbiAgdXBkYXRlRGF0ZXBpY2tlckRhdGUobmV3RGF0ZSl7XG4gICAgdGhpcy5waWthZGF5SW5zdGFuY2Uuc2V0RGF0ZShuZXdEYXRlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVwaWNrZXJHcm91cDsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuXG5jb25zdCBqc0Ryb3Bkb3duVHJpZ2dlciA9IFwiLmpzLWRyb3Bkb3duXCI7XG5jb25zdCBqc0Ryb3Bkb3duVGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xuXG5jb25zdCB0b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyRWwsIGZvcmNlQ2xvc2UpIHtcbiAgICBpZih0cmlnZ2VyRWwgIT09IG51bGwgJiYgdHJpZ2dlckVsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICB2YXIgdGFyZ2V0QXR0ciA9IHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoanNEcm9wZG93blRhcmdldClcbiAgICAgICAgaWYodGFyZ2V0QXR0ciAhPT0gbnVsbCAmJiB0YXJnZXRBdHRyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdmFyIHRhcmdldEVsID0gc2VsZWN0KHRhcmdldEF0dHIsICdib2R5Jyk7XG4gICAgICAgICAgICBpZih0YXJnZXRFbCAhPT0gbnVsbCAmJiB0YXJnZXRFbCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldEVsLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIC8vdGFyZ2V0IGZvdW5kLCBjaGVjayBzdGF0ZVxuICAgICAgICAgICAgICAgIHRhcmdldEVsID0gdGFyZ2V0RWxbMF07XG4gICAgICAgICAgICAgICAgLy9jaGFuZ2Ugc3RhdGVcbiAgICAgICAgICAgICAgICBpZih0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIiB8fCBmb3JjZUNsb3NlKXtcbiAgICAgICAgICAgICAgICAgICAgLy9jbG9zZVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vb3BlblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgIFxuICAgIH1cbn07XG5cbmNvbnN0IHRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRyb3Bkb3duRWxtID0gY2xvc2VzdChldmVudC50YXJnZXQsIGpzRHJvcGRvd25UcmlnZ2VyKTtcbiAgICBpZihkcm9wZG93bkVsbSAhPT0gbnVsbCAmJiBkcm9wZG93bkVsbSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy9DbG9zZSBhbGwgZXhpc3Rpbmcgb3BlbiBkcm9wZG93bnNcbiAgICAgICAgZm9yRWFjaChzZWxlY3QoanNEcm9wZG93blRyaWdnZXIsICdib2R5JyksIGRyb3Bkb3duSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgaWYoZHJvcGRvd25JbnN0YW5jZSAhPT0gZHJvcGRvd25FbG0pe1xuICAgICAgICAgICAgICAgIHRvZ2dsZURyb3Bkb3duKGRyb3Bkb3duSW5zdGFuY2UsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9PcGVuIG5ldyBkcm9wZG93blxuICAgICAgICB0b2dnbGVEcm9wZG93bihkcm9wZG93bkVsbSk7XG4gICAgfVxufTtcblxuY29uc3Qgb3V0c2lkZUNsb3NlID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgIC8vY2xvc2VzIGRyb3Bkb3duIHdoZW4gY2xpY2tlZCBvdXRzaWRlLiBcbiAgICB2YXIgZHJvcGRvd25FbG0gPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwganNEcm9wZG93blRyaWdnZXIpO1xuICAgIGlmKGRyb3Bkb3duRWxtID09PSBudWxsIHx8IGRyb3Bkb3duRWxtID09PSB1bmRlZmluZWQpe1xuICAgICAgICAvL2NsaWNrZWQgb3V0c2lkZSB0cmlnZ2VyLCBmb3JjZSBjbG9zZSBhbGxcbiAgICAgICAgZm9yRWFjaChzZWxlY3QoanNEcm9wZG93blRyaWdnZXIpLCBkcm9wZG93bkluc3RhbmNlID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZURyb3Bkb3duKGRyb3Bkb3duSW5zdGFuY2UsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWydjbGljayddOiB7XG4gICAgWyBqc0Ryb3Bkb3duVHJpZ2dlciBdOiB0b2dnbGUsXG4gICAgWydib2R5J106IG91dHNpZGVDbG9zZSxcbiAgfSxcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi9hY2NvcmRpb24nKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7IC8vSkpFOiBub3QgdXNlZCBhbnltb3JlIFxuXG5jb25zdCBISURERU4gPSAnaGlkZGVuJztcbmNvbnN0IFNDT1BFID0gYC5mb290ZXJgOyAvLyR7UFJFRklYfS1cbmNvbnN0IE5BViA9IGAke1NDT1BFfSBuYXZgO1xuY29uc3QgQlVUVE9OID0gYCR7TkFWfSAuZm9vdGVyLXByaW1hcnktbGlua2A7IC8vJHtQUkVGSVh9LVxuY29uc3QgTElTVCA9IGAke05BVn0gdWxgO1xuXG5jb25zdCBISURFX01BWF9XSURUSCA9IDYwMDtcbmNvbnN0IERFQk9VTkNFX1JBVEUgPSAxODA7XG5cbmNvbnN0IHNob3dQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc21hbGxfc2NyZWVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgaWYoc21hbGxfc2NyZWVuKXtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5jbG9zZXN0KExJU1QpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4pO1xuXG4gICAgLy8gTkI6IHRoaXMgKnNob3VsZCogYWx3YXlzIHN1Y2NlZWQgYmVjYXVzZSB0aGUgYnV0dG9uXG4gICAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgICBjb25zdCBsaXN0cyA9IGxpc3QuY2xvc2VzdChOQVYpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcblxuICAgIGZvckVhY2gobGlzdHMsIGVsID0+IHtcbiAgICAgIGlmIChlbCAhPT0gbGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhJRERFTik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2l6ZSA9IGRlYm91bmNlKCgpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gd2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSDtcbiAgZm9yRWFjaChzZWxlY3QoTElTVCksIGxpc3QgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4sIGhpZGRlbik7XG4gIH0pO1xufSwgREVCT1VOQ0VfUkFURSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIEJVVFRPTiBdOiBzaG93UGFuZWwsXG4gIH0sXG59LCB7XG4gIC8vIGV4cG9ydCBmb3IgdXNlIGVsc2V3aGVyZVxuICBISURFX01BWF9XSURUSCxcbiAgREVCT1VOQ0VfUkFURSxcblxuICBpbml0OiB0YXJnZXQgPT4ge1xuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxuXG4gIHRlYXJkb3duOiB0YXJnZXQgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICB9LFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWNjb3JkaW9uOiAgcmVxdWlyZSgnLi9hY2NvcmRpb24nKSxcbiAgYmFubmVyOiAgICAgcmVxdWlyZSgnLi9iYW5uZXInKSxcbiAgZm9vdGVyOiAgICAgcmVxdWlyZSgnLi9mb290ZXInKSxcbiAgbmF2aWdhdGlvbjogcmVxdWlyZSgnLi9uYXZpZ2F0aW9uJyksXG4gIHBhc3N3b3JkOiAgIHJlcXVpcmUoJy4vcGFzc3dvcmQnKSxcbiAgc2VhcmNoOiAgICAgcmVxdWlyZSgnLi9zZWFyY2gnKSxcbiAgc2tpcG5hdjogICAgcmVxdWlyZSgnLi9za2lwbmF2JyksXG4gIHZhbGlkYXRvcjogIHJlcXVpcmUoJy4vdmFsaWRhdG9yJyksXG4gIHJlZ2V4bWFzazogIHJlcXVpcmUoJy4vcmVnZXgtaW5wdXQtbWFzaycpLFxuICBkcm9wZG93bjogICByZXF1aXJlKCcuL2Ryb3Bkb3duJyksXG4gIG5hdnN1Ym1lbnU6ICAgcmVxdWlyZSgnLi9uYXYtc3VibWVudScpLFxuICAvL3RhYmxlOiAgICAgIHJlcXVpcmUoJy4vdGFibGUnKSxcbiAgXG59O1xuIiwiXG5jb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XG5cbi8qKlxuICogSW1wb3J0IG1vZGFsIGxpYi5cbiAqIGh0dHBzOi8vbWljcm9tb2RhbC5ub3cuc2hcbiAqL1xuY29uc3QgbWljcm9Nb2RhbCA9IHJlcXVpcmUoXCIuLi8uLi92ZW5kb3IvbWljcm9tb2RhbC5qc1wiKTtcbmRvbXJlYWR5KCgpID0+IHtcblx0bWljcm9Nb2RhbC5pbml0KCk7IC8vaW5pdCBhbGwgbW9kYWxzXG59KTtcbiIsIi8qKlxyXG4gKiBDb2xsYXBzZS9leHBhbmQgZm9yIG5hdmlnYXRpb24gc3VibWVudWVzLlxyXG4gKiBCZWhhdmVzIGxpa2UgYSBkcm9wZG93biBvbiBkZXNrdG9wIChjbG9zZXMgd2hlbiBjbGlja2VkIG91dHNpZGUpLlxyXG4gKiBBbmQgYmVoYXZlcyBsaWtlIGFuIGFjY29yZGlvbiAobXVsdGlzZWxlY3QpIG9uIG1vYmlsZS5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcclxuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XHJcbmNvbnN0IGNsb3Nlc3QgPSByZXF1aXJlKCcuLi91dGlscy9jbG9zZXN0Jyk7XHJcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XHJcblxyXG5jb25zdCBqc05hdlN1Ym1lbnVUcmlnZ2VyID0gXCIuanMtbmF2LXN1Ym1lbnVcIjtcclxuY29uc3QganNOYXZTdWJtZW51VGFyZ2V0ID0gXCJkYXRhLWpzLXRhcmdldFwiO1xyXG5cclxuY29uc3QgbmF2UmVzcG9uc2l2ZUJyZWFrcG9pbnQgPSA5OTI7IC8vc2FtZSBhcyAkbmF2LXJlc3BvbnNpdmUtYnJlYWtwb2ludCBmcm9tIHRoZSBzY3NzLlxyXG5cclxuY29uc3QgdG9nZ2xlTmF2U3VibWVudSA9IGZ1bmN0aW9uICh0cmlnZ2VyRWwsIGZvcmNlQ2xvc2UpIHtcclxuICAgIGlmKHRyaWdnZXJFbCAhPT0gbnVsbCAmJiB0cmlnZ2VyRWwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdmFyIHRhcmdldEF0dHIgPSB0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKGpzTmF2U3VibWVudVRhcmdldClcclxuICAgICAgICBpZih0YXJnZXRBdHRyICE9PSBudWxsICYmIHRhcmdldEF0dHIgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRFbCA9IHNlbGVjdCh0YXJnZXRBdHRyLCAnYm9keScpO1xyXG4gICAgICAgICAgICBpZih0YXJnZXRFbCAhPT0gbnVsbCAmJiB0YXJnZXRFbCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldEVsLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy90YXJnZXQgZm91bmQsIGNoZWNrIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFbCA9IHRhcmdldEVsWzBdO1xyXG4gICAgICAgICAgICAgICAgLy9jaGFuZ2Ugc3RhdGVcclxuICAgICAgICAgICAgICAgIGlmKHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiIHx8IGZvcmNlQ2xvc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCB0b2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgTmF2U3VibWVudUVsbSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBqc05hdlN1Ym1lbnVUcmlnZ2VyKTtcclxuICAgIGlmKE5hdlN1Ym1lbnVFbG0gIT09IG51bGwgJiYgTmF2U3VibWVudUVsbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAvL0Nsb3NlIGFsbCBleGlzdGluZyBvcGVuIE5hdlN1Ym1lbnVzIChvbiBkZXNrdG9wKS5cclxuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IG5hdlJlc3BvbnNpdmVCcmVha3BvaW50KXtcclxuICAgICAgICAgICAgZm9yRWFjaChzZWxlY3QoanNOYXZTdWJtZW51VHJpZ2dlciwgJ2JvZHknKSwgTmF2U3VibWVudUluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKE5hdlN1Ym1lbnVJbnN0YW5jZSAhPT0gTmF2U3VibWVudUVsbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTmF2U3VibWVudShOYXZTdWJtZW51SW5zdGFuY2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9PcGVuIG5ldyBOYXZTdWJtZW51XHJcbiAgICAgICAgdG9nZ2xlTmF2U3VibWVudShOYXZTdWJtZW51RWxtKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG91dHNpZGVDbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIC8vY2xvc2VzIE5hdlN1Ym1lbnUgd2hlbiBjbGlja2VkIG91dHNpZGUgKG9uIGRlc2t0b3ApIFxyXG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPiBuYXZSZXNwb25zaXZlQnJlYWtwb2ludCl7XHJcbiAgICAgICAgdmFyIE5hdlN1Ym1lbnVFbG0gPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwganNOYXZTdWJtZW51VHJpZ2dlcik7XHJcbiAgICAgICAgaWYoTmF2U3VibWVudUVsbSA9PT0gbnVsbCB8fCBOYXZTdWJtZW51RWxtID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvL2NsaWNrZWQgb3V0c2lkZSB0cmlnZ2VyLCBmb3JjZSBjbG9zZSBhbGxcclxuICAgICAgICAgICAgZm9yRWFjaChzZWxlY3QoanNOYXZTdWJtZW51VHJpZ2dlciksIE5hdlN1Ym1lbnVJbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVOYXZTdWJtZW51KE5hdlN1Ym1lbnVJbnN0YW5jZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xyXG4gIFsnY2xpY2snXToge1xyXG4gICAgWyBqc05hdlN1Ym1lbnVUcmlnZ2VyIF06IHRvZ2dsZSxcclxuICAgIFsnYm9keSddOiBvdXRzaWRlQ2xvc2UsXHJcbiAgfSxcclxufSk7XHJcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IE5BViA9IGAubmF2YDtcbmNvbnN0IE5BVl9MSU5LUyA9IGAke05BVn0gYWA7XG5jb25zdCBPUEVORVJTID0gYC5qcy1tZW51LW9wZW5gO1xuY29uc3QgQ0xPU0VfQlVUVE9OID0gYC5qcy1tZW51LWNsb3NlYDtcbmNvbnN0IE9WRVJMQVkgPSBgLm92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC5vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbIE5BViwgT1ZFUkxBWSBdLmpvaW4oJywgJyk7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICdtb2JpbGVfbmF2LWFjdGl2ZSc7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gJ2lzLXZpc2libGUnO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG5cbmNvbnN0IF9mb2N1c1RyYXAgPSAodHJhcENvbnRhaW5lcikgPT4ge1xuICAvLyBGaW5kIGFsbCBmb2N1c2FibGUgY2hpbGRyZW5cbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHRyYXBDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1N0cmluZyk7XG4gIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWyAwIF07XG4gIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEgXTtcblxuICBmdW5jdGlvbiB0cmFwVGFiS2V5IChlKSB7XG4gICAgLy8gQ2hlY2sgZm9yIFRBQiBrZXkgcHJlc3NcbiAgICBpZiAoZS5rZXlDb2RlID09PSA5KSB7XG5cbiAgICAgIC8vIFNISUZUICsgVEFCXG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgLy8gVEFCXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdFRhYlN0b3ApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFU0NBUEVcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgdG9nZ2xlTmF2LmNhbGwodGhpcywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvY3VzIGZpcnN0IGNoaWxkXG4gIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuXG4gIHJldHVybiB7XG4gICAgZW5hYmxlICgpIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgYW5kIHRyYXAgdGhlIGtleWJvYXJkXG4gICAgICB0cmFwQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcbiAgICB9LFxuXG4gICAgcmVsZWFzZSAoKSB7XG4gICAgICB0cmFwQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcbiAgICB9LFxuICB9O1xufTtcblxubGV0IGZvY3VzVHJhcDtcblxuY29uc3QgdG9nZ2xlTmF2ID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKHR5cGVvZiBhY3RpdmUgIT09ICdib29sZWFuJykge1xuICAgIGFjdGl2ZSA9ICFpc0FjdGl2ZSgpO1xuICB9XG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIGFjdGl2ZSk7XG5cbiAgZm9yRWFjaChzZWxlY3QoVE9HR0xFUyksIGVsID0+IHtcbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFZJU0lCTEVfQ0xBU1MsIGFjdGl2ZSk7XG4gIH0pO1xuXG4gIGlmIChhY3RpdmUpIHtcbiAgICBmb2N1c1RyYXAuZW5hYmxlKCk7XG4gIH0gZWxzZSB7XG4gICAgZm9jdXNUcmFwLnJlbGVhc2UoKTtcbiAgfVxuXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG5cbiAgaWYgKGFjdGl2ZSAmJiBjbG9zZUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGFjdGl2YXRlZCwgc28gZm9jdXMgb24gdGhlIGNsb3NlIGJ1dHRvbixcbiAgICAvLyB3aGljaCBpcyBqdXN0IGJlZm9yZSBhbGwgdGhlIG5hdiBlbGVtZW50cyBpbiB0aGUgdGFiIG9yZGVyLlxuICAgIGNsb3NlQnV0dG9uLmZvY3VzKCk7XG4gIH0gZWxzZSBpZiAoIWFjdGl2ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBjbG9zZUJ1dHRvbiAmJlxuICAgICAgICAgICAgIG1lbnVCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZCwgYW5kIGZvY3VzIHdhcyBvbiB0aGUgY2xvc2VcbiAgICAvLyBidXR0b24sIHdoaWNoIGlzIG5vIGxvbmdlciB2aXNpYmxlLiBXZSBkb24ndCB3YW50IHRoZSBmb2N1cyB0b1xuICAgIC8vIGRpc2FwcGVhciBpbnRvIHRoZSB2b2lkLCBzbyBmb2N1cyBvbiB0aGUgbWVudSBidXR0b24gaWYgaXQnc1xuICAgIC8vIHZpc2libGUgKHRoaXMgbWF5IGhhdmUgYmVlbiB3aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGZvY3VzZWQgb24sXG4gICAgLy8gaWYgdGhleSB0cmlnZ2VyZWQgdGhlIG1vYmlsZSBuYXYgYnkgbWlzdGFrZSkuXG4gICAgbWVudUJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgcmV0dXJuIGFjdGl2ZTtcbn07XG5cbmNvbnN0IHJlc2l6ZSA9ICgpID0+IHtcbiAgY29uc3QgY2xvc2VyID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG5cbiAgaWYgKGlzQWN0aXZlKCkgJiYgY2xvc2VyICYmIGNsb3Nlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA9PT0gMCkge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IGlzIGFjdGl2ZSwgYnV0IHRoZSBjbG9zZSBib3ggaXNuJ3QgdmlzaWJsZSwgd2hpY2hcbiAgICAvLyBtZWFucyB0aGUgdXNlcidzIHZpZXdwb3J0IGhhcyBiZWVuIHJlc2l6ZWQgc28gdGhhdCBpdCBpcyBubyBsb25nZXJcbiAgICAvLyBpbiBtb2JpbGUgbW9kZS4gTGV0J3MgbWFrZSB0aGUgcGFnZSBzdGF0ZSBjb25zaXN0ZW50IGJ5XG4gICAgLy8gZGVhY3RpdmF0aW5nIHRoZSBtb2JpbGUgbmF2LlxuICAgIHRvZ2dsZU5hdi5jYWxsKGNsb3NlciwgZmFsc2UpO1xuICB9XG59O1xuXG5jb25zdCBuYXZpZ2F0aW9uID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIE9QRU5FUlMgXTogdG9nZ2xlTmF2LFxuICAgIFsgQ0xPU0VSUyBdOiB0b2dnbGVOYXYsXG4gICAgWyBOQVZfTElOS1MgXTogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gQSBuYXZpZ2F0aW9uIGxpbmsgaGFzIGJlZW4gY2xpY2tlZCEgV2Ugd2FudCB0byBjb2xsYXBzZSBhbnlcbiAgICAgIC8vIGhpZXJhcmNoaWNhbCBuYXZpZ2F0aW9uIFVJIGl0J3MgYSBwYXJ0IG9mLCBzbyB0aGF0IHRoZSB1c2VyXG4gICAgICAvLyBjYW4gZm9jdXMgb24gd2hhdGV2ZXIgdGhleSd2ZSBqdXN0IHNlbGVjdGVkLlxuXG4gICAgICAvLyBTb21lIG5hdmlnYXRpb24gbGlua3MgYXJlIGluc2lkZSBhY2NvcmRpb25zOyB3aGVuIHRoZXkncmVcbiAgICAgIC8vIGNsaWNrZWQsIHdlIHdhbnQgdG8gY29sbGFwc2UgdGhvc2UgYWNjb3JkaW9ucy5cbiAgICAgIGNvbnN0IGFjYyA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb24uQUNDT1JESU9OKTtcbiAgICAgIGlmIChhY2MpIHtcbiAgICAgICAgYWNjb3JkaW9uLmdldEJ1dHRvbnMoYWNjKS5mb3JFYWNoKGJ0biA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIG1vYmlsZSBuYXZpZ2F0aW9uIG1lbnUgaXMgYWN0aXZlLCB3ZSB3YW50IHRvIGhpZGUgaXQuXG4gICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICB0b2dnbGVOYXYuY2FsbCh0aGlzLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0sIHtcbiAgaW5pdCAoKSB7XG4gICAgY29uc3QgdHJhcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTkFWKTtcblxuICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICBmb2N1c1RyYXAgPSBfZm9jdXNUcmFwKHRyYXBDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbiAgfSxcbiAgdGVhcmRvd24gKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gbmF2aWdhdGlvbi5vbihlbCksXG4gIG5hdmlnYXRpb25cbik7IiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9c2hvd19wYXNzd29yZCwgLiR7UFJFRklYfXNob3dfbXVsdGlwYXNzd29yZGA7XG5cbmNvbnN0IHRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBMSU5LIF06IHRvZ2dsZSxcbiAgfSxcbn0pO1xuIiwiXG4vKlxuKiBQcmV2ZW50cyB0aGUgdXNlciBmcm9tIGlucHV0dGluZyBiYXNlZCBvbiBhIHJlZ2V4LlxuKiBEb2VzIG5vdCB3b3JrIHRoZSBzYW1lIHdheSBhZiA8aW5wdXQgcGF0dGVybj1cIlwiPiwgdGhpcyBwYXR0ZXJuIGlzIG9ubHkgdXNlZCBmb3IgdmFsaWRhdGlvbiwgbm90IHRvIHByZXZlbnQgaW5wdXQuIFxuKiBVc2VjYXNlOiBudW1iZXIgaW5wdXQgZm9yIGRhdGUtY29tcG9uZW50LlxuKiBFeGFtcGxlIC0gbnVtYmVyIG9ubHk6IDxpbnB1dCB0eXBlPVwidGV4dFwiIGRhdGEtaW5wdXQtcmVnZXg9XCJeXFxkKiRcIj5cbiovXG4ndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5cbmNvbnN0IG1vZGlmaWVyU3RhdGUgPSB7XG4gIHNoaWZ0OiBmYWxzZSxcbiAgYWx0OiBmYWxzZSxcbiAgY3RybDogZmFsc2UsXG4gIGNvbW1hbmQ6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpbnB1dFJlZ2V4TWFzayhldmVudCkge1xuXG4gICAgaWYobW9kaWZpZXJTdGF0ZS5jdHJsIHx8IG1vZGlmaWVyU3RhdGUuY29tbWFuZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBuZXdDaGFyID0gbnVsbDtcbiAgICBpZih0eXBlb2YgZXZlbnQua2V5ICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgaWYoZXZlbnQua2V5Lmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICBuZXdDaGFyID0gZXZlbnQua2V5O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIWV2ZW50LmNoYXJDb2RlKXtcbiAgICAgICAgICAgIG5ld0NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmtleUNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQuY2hhckNvZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgICBpZihldmVudC50YXJnZXQgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlmKG5ld0NoYXIgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBpZihuZXdDaGFyLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaWYoZWxlbWVudC50eXBlID09PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLnZhbHVlOy8vTm90ZSBpbnB1dFt0eXBlPW51bWJlcl0gZG9lcyBub3QgaGF2ZSAuc2VsZWN0aW9uU3RhcnQvRW5kIChDaHJvbWUpLlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgwLCBlbGVtZW50LnNlbGVjdGlvblN0YXJ0KSArIHRoaXMudmFsdWUuc2xpY2UoZWxlbWVudC5zZWxlY3Rpb25FbmQpICsgbmV3Q2hhcjsgLy9yZW1vdmVzIHRoZSBudW1iZXJzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLCB0aGVuIGFkZHMgbmV3IGNoYXIuIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVnZXhTdHIgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtaW5wdXQtcmVnZXhcIik7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAocmVnZXhTdHIpO1xuICAgICAgICAgICAgaWYoci5leGVjKG5ld1ZhbHVlKSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gICdrZXlwcmVzcyBwYXN0ZSc6IHtcbiAgICAnaW5wdXRbZGF0YS1pbnB1dC1yZWdleF0nOiBpbnB1dFJlZ2V4TWFzayxcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgaWdub3JlID0gcmVxdWlyZSgncmVjZXB0b3IvaWdub3JlJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgQlVUVE9OID0gJy5qcy1zZWFyY2gtYnV0dG9uJztcbmNvbnN0IEZPUk0gPSAnLmpzLXNlYXJjaC1mb3JtJztcbmNvbnN0IElOUFVUID0gJ1t0eXBlPXNlYXJjaF0nO1xuY29uc3QgQ09OVEVYVCA9ICdoZWFkZXInOyAvLyBYWFhcbmNvbnN0IFZJU1VBTExZX0hJRERFTiA9IGAke1BSRUZJWH1zci1vbmx5YDtcblxubGV0IGxhc3RCdXR0b247XG5cbmNvbnN0IHNob3dTZWFyY2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIHRydWUpO1xuICBsYXN0QnV0dG9uID0gdGhpcztcbn07XG5cbmNvbnN0IGhpZGVTZWFyY2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIGZhbHNlKTtcbiAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IGdldEZvcm0gPSBidXR0b24gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYnV0dG9uLmNsb3Nlc3QoQ09OVEVYVCk7XG4gIHJldHVybiBjb250ZXh0XG4gICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoRk9STSlcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcbiAgaWYgKCFmb3JtKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyAke0ZPUk19IGZvdW5kIGZvciBzZWFyY2ggdG9nZ2xlIGluICR7Q09OVEVYVH0hYCk7XG4gIH1cblxuICBidXR0b24uaGlkZGVuID0gYWN0aXZlO1xuICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoVklTVUFMTFlfSElEREVOLCAhYWN0aXZlKTtcblxuICBpZiAoYWN0aXZlKSB7XG4gICAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gICAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gICAgLy8gc2VhcmNoLCB0aGVuIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICBjb25zdCBsaXN0ZW5lciA9IGlnbm9yZShmb3JtLCBlID0+IHtcbiAgICAgIGlmIChsYXN0QnV0dG9uKSB7XG4gICAgICAgIGhpZGVTZWFyY2guY2FsbChsYXN0QnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICAgIH0pO1xuXG4gICAgLy8gTm9ybWFsbHkgd2Ugd291bGQganVzdCBydW4gdGhpcyBjb2RlIHdpdGhvdXQgYSB0aW1lb3V0LCBidXRcbiAgICAvLyBJRTExIGFuZCBFZGdlIHdpbGwgYWN0dWFsbHkgY2FsbCB0aGUgbGlzdGVuZXIgKmltbWVkaWF0ZWx5KiBiZWNhdXNlXG4gICAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgICAvLyBtYWtlIHN1cmUgdGhlIGJyb3dzZXIgaXMgZG9uZSBoYW5kbGluZyB0aGUgY3VycmVudCBjbGljayBldmVudCxcbiAgICAvLyBpZiBhbnksIGJlZm9yZSB3ZSBhdHRhY2ggdGhlIGxpc3RlbmVyLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogc2hvd1NlYXJjaCxcbiAgfSxcbn0sIHtcbiAgaW5pdDogKHRhcmdldCkgPT4ge1xuICAgIGZvckVhY2goc2VsZWN0KEJVVFRPTiwgdGFyZ2V0KSwgYnV0dG9uID0+IHtcbiAgICAgIHRvZ2dsZVNlYXJjaChidXR0b24sIGZhbHNlKTtcbiAgICB9KTtcbiAgfSxcbiAgdGVhcmRvd246ICh0YXJnZXQpID0+IHtcbiAgICAvLyBmb3JnZXQgdGhlIGxhc3QgYnV0dG9uIGNsaWNrZWRcbiAgICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiBzZWFyY2gub24oZWwpLFxuICBzZWFyY2hcbik7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBvbmNlID0gcmVxdWlyZSgncmVjZXB0b3Ivb25jZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9c2tpcG5hdltocmVmXj1cIiNcIl1gO1xuXG5jb25zdCBzZXRUYWJpbmRleCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNsaWNlKDEpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25jZShldmVudCA9PiB7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICB9KSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhyb3cgYW4gZXJyb3I/XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZSgnLi4vdXRpbHMvdmFsaWRhdGUtaW5wdXQnKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5cbmNvbnN0IGNoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICByZXR1cm4gdmFsaWRhdGUodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgJ2tleXVwIGNoYW5nZSc6IHtcbiAgICAnaW5wdXRbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdJzogY2hhbmdlLFxuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbi8qY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IHZhbGlkYXRvci5vbihlbCksXG4gIHZhbGlkYXRvclxuKTsqL1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByZWZpeDogJycsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZG9tcmVhZHkgPSByZXF1aXJlKCdkb21yZWFkeScpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vdXRpbHMvc2VsZWN0Jyk7XG5jb25zdCBtb2Rlcm5penIgPSByZXF1aXJlKFwiLi4vdmVuZG9yL21vZGVybml6ci1jdXN0b20uanNcIik7XG5jb25zdCBkYXRlcGlja2VyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2RhdGVwaWNrZXInKTtcbmNvbnN0IG1vZGFsID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsJyk7XG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGRlZmluZSBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmUgbWlzc2luZyBmcm9tXG4gKiBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoJy4vcG9seWZpbGxzJyk7XG5cbmNvbnN0IGRrd2RzID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpO1xuZGt3ZHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbmRvbXJlYWR5KCgpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgZm9yIChsZXQgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgY29uc3QgYmVoYXZpb3IgPSBjb21wb25lbnRzWyBuYW1lIF07XG4gICAgYmVoYXZpb3Iub24odGFyZ2V0KTtcbiAgfVxuXG4gIC8vSW5pdCBkYXRlcGlja2VyLiAgKE5vdGU6IGFib3ZlICdiZWhhdmlvci5vbicgZG9lcyBub3Qgd29yayB3aXRoIHBpa2FkYXkgLT4gc2VwZXJhdGUgaW5pdGlhbGl6YXRpb24pXG4gIGNvbnN0IGpzU2VsZWN0b3JEYXRlcGlja2VyID0gJy5qcy1jYWxlbmRhci1ncm91cCc7XG4gIGZvckVhY2goc2VsZWN0KGpzU2VsZWN0b3JEYXRlcGlja2VyKSwgY2FsZW5kYXJHcm91cEVsZW1lbnQgPT4ge1xuICAgIG5ldyBkYXRlcGlja2VyKGNhbGVuZGFyR3JvdXBFbGVtZW50KTtcbiAgfSk7XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRrd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogJ2NsaWNrJyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBlbHByb3RvID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IEhJRERFTiA9ICdoaWRkZW4nO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVscHJvdG8sIEhJRERFTiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEhJRERFTik7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoJ2NsYXNzbGlzdC1wb2x5ZmlsbCcpO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oaWRkZW5cbnJlcXVpcmUoJy4vZWxlbWVudC1oaWRkZW4nKTtcblxucmVxdWlyZSgnY29yZS1qcy9mbi9vYmplY3QvYXNzaWduJyk7XG5yZXF1aXJlKCdjb3JlLWpzL2ZuL2FycmF5L2Zyb20nKTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKCdyZWNlcHRvci9iZWhhdmlvcicpO1xuXG5jb25zdCBzZXF1ZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VxID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBmb3JFYWNoKHNlcSwgbWV0aG9kID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1sgbWV0aG9kIF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1sgbWV0aG9kIF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+IHtcbiAgcmV0dXJuIEJlaGF2aW9yKGV2ZW50cywgYXNzaWduKHtcbiAgICBvbjogICBzZXF1ZW5jZSgnaW5pdCcsICdhZGQnKSxcbiAgICBvZmY6ICBzZXF1ZW5jZSgndGVhcmRvd24nLCAncmVtb3ZlJyksXG4gIH0sIHByb3BzKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGNsb3Nlc3RcbiAqIEBkZXNjIGdldCBuZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBzZWFyY2ggc3RhcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gU2VsZWN0b3IgdG8gYmUgZm91bmQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBOZWFyZXN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb3Nlc3QgKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG4gIHdoaWxlIChlbCkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWw7XG59O1xuIiwiLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzNcbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQgKGVsLCB3aW49d2luZG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gdmFsdWUgPT4ge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKCdyZXNvbHZlLWlkLXJlZnMnKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoJy4vc2VsZWN0Jyk7XG5jb25zdCB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG5cbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgUFJFU1NFRCA9ICdhcmlhLXByZXNzZWQnO1xuY29uc3QgU0hPV19BVFRSID0gJ2RhdGEtc2hvdy10ZXh0JztcbmNvbnN0IEhJREVfQVRUUiA9ICdkYXRhLWhpZGUtdGV4dCc7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IHNob3dUZXh0ID0+IHtcbiAgcmV0dXJuIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgc2hvdyA9PiB7XG4gICAgcmV0dXJuICgnUycgPT09IHNob3dbIDAgXSA/ICdIJyA6ICdoJykgKyAnaWRlJztcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBlbCA9PiB7XG4gIC8vIHRoaXMgaXMgdGhlICp0YXJnZXQqIHN0YXRlOlxuICAvLyAqIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgYXR0ciBhbmQgaXQncyAhPT0gXCJ0cnVlXCIsIHByZXNzZWQgaXMgdHJ1ZVxuICAvLyAqIG90aGVyd2lzZSwgcHJlc3NlZCBpcyBmYWxzZVxuICBjb25zdCBwcmVzc2VkID0gZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpXG4gICAgJiYgZWwuZ2V0QXR0cmlidXRlKFBSRVNTRUQpICE9PSAndHJ1ZSc7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZm9yRWFjaChmaWVsZHMsIGZpZWxkID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0O1xuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEVYUEFOREVEID0gJ2FyaWEtZXhwYW5kZWQnO1xuY29uc3QgQ09OVFJPTFMgPSAnYXJpYS1jb250cm9scyc7XG5jb25zdCBISURERU4gPSAnYXJpYS1oaWRkZW4nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG5cbiAgaWYgKHR5cGVvZiBleHBhbmRlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gJ2ZhbHNlJztcbiAgfVxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBleHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIicgKyBpZCArICdcIidcbiAgICApO1xuICB9XG5cbiAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgIWV4cGFuZGVkKTtcbiAgcmV0dXJuIGV4cGFuZGVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRhdGFzZXQgPSByZXF1aXJlKCdlbGVtLWRhdGFzZXQnKTtcblxuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuY29uc3QgQ0hFQ0tFRCA9ICdhcmlhLWNoZWNrZWQnO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH1jaGVja2xpc3QtY2hlY2tlZGA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdGUgKGVsKSB7XG4gIGNvbnN0IGRhdGEgPSBkYXRhc2V0KGVsKTtcbiAgY29uc3QgaWQgPSBkYXRhLnZhbGlkYXRpb25FbGVtZW50O1xuICBjb25zdCBjaGVja0xpc3QgPSBpZC5jaGFyQXQoMCkgPT09ICcjJ1xuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZClcbiAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBObyB2YWxpZGF0aW9uIGVsZW1lbnQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCd2YWxpZGF0ZScpKSB7XG4gICAgICBjb25zdCB2YWxpZGF0b3JOYW1lID0ga2V5LnN1YnN0cigndmFsaWRhdGUnLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKGRhdGFbIGtleSBdKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclNlbGVjdG9yID0gYFtkYXRhLXZhbGlkYXRvcj1cIiR7dmFsaWRhdG9yTmFtZX1cIl1gO1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ2hlY2tib3ggPSBjaGVja0xpc3QucXVlcnlTZWxlY3Rvcih2YWxpZGF0b3JTZWxlY3Rvcik7XG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LnNldEF0dHJpYnV0ZShDSEVDS0VELCBjaGVja2VkKTtcbiAgICB9XG4gIH1cbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLk1pY3JvTW9kYWwgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciB2ZXJzaW9uID0gXCIwLjMuMVwiO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxudmFyIE1pY3JvTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIEZPQ1VTQUJMRV9FTEVNRU5UUyA9IFsnYVtocmVmXScsICdhcmVhW2hyZWZdJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2lmcmFtZScsICdvYmplY3QnLCAnZW1iZWQnLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJ107XG5cbiAgdmFyIE1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsKF9yZWYpIHtcbiAgICAgIHZhciB0YXJnZXRNb2RhbCA9IF9yZWYudGFyZ2V0TW9kYWwsXG4gICAgICAgICAgX3JlZiR0cmlnZ2VycyA9IF9yZWYudHJpZ2dlcnMsXG4gICAgICAgICAgdHJpZ2dlcnMgPSBfcmVmJHRyaWdnZXJzID09PSB1bmRlZmluZWQgPyBbXSA6IF9yZWYkdHJpZ2dlcnMsXG4gICAgICAgICAgX3JlZiRvblNob3cgPSBfcmVmLm9uU2hvdyxcbiAgICAgICAgICBvblNob3cgPSBfcmVmJG9uU2hvdyA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uU2hvdyxcbiAgICAgICAgICBfcmVmJG9uQ2xvc2UgPSBfcmVmLm9uQ2xvc2UsXG4gICAgICAgICAgb25DbG9zZSA9IF9yZWYkb25DbG9zZSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uQ2xvc2UsXG4gICAgICAgICAgX3JlZiRvcGVuVHJpZ2dlciA9IF9yZWYub3BlblRyaWdnZXIsXG4gICAgICAgICAgb3BlblRyaWdnZXIgPSBfcmVmJG9wZW5UcmlnZ2VyID09PSB1bmRlZmluZWQgPyAnZGF0YS1taWNyb21vZGFsLXRyaWdnZXInIDogX3JlZiRvcGVuVHJpZ2dlcixcbiAgICAgICAgICBfcmVmJGNsb3NlVHJpZ2dlciA9IF9yZWYuY2xvc2VUcmlnZ2VyLFxuICAgICAgICAgIGNsb3NlVHJpZ2dlciA9IF9yZWYkY2xvc2VUcmlnZ2VyID09PSB1bmRlZmluZWQgPyAnZGF0YS1taWNyb21vZGFsLWNsb3NlJyA6IF9yZWYkY2xvc2VUcmlnZ2VyLFxuICAgICAgICAgIF9yZWYkZGlzYWJsZVNjcm9sbCA9IF9yZWYuZGlzYWJsZVNjcm9sbCxcbiAgICAgICAgICBkaXNhYmxlU2Nyb2xsID0gX3JlZiRkaXNhYmxlU2Nyb2xsID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGlzYWJsZVNjcm9sbCxcbiAgICAgICAgICBfcmVmJGRpc2FibGVGb2N1cyA9IF9yZWYuZGlzYWJsZUZvY3VzLFxuICAgICAgICAgIGRpc2FibGVGb2N1cyA9IF9yZWYkZGlzYWJsZUZvY3VzID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGlzYWJsZUZvY3VzLFxuICAgICAgICAgIF9yZWYkYXdhaXRDbG9zZUFuaW1hdCA9IF9yZWYuYXdhaXRDbG9zZUFuaW1hdGlvbixcbiAgICAgICAgICBhd2FpdENsb3NlQW5pbWF0aW9uID0gX3JlZiRhd2FpdENsb3NlQW5pbWF0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkYXdhaXRDbG9zZUFuaW1hdCxcbiAgICAgICAgICBfcmVmJGRlYnVnTW9kZSA9IF9yZWYuZGVidWdNb2RlLFxuICAgICAgICAgIGRlYnVnTW9kZSA9IF9yZWYkZGVidWdNb2RlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZGVidWdNb2RlO1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIG9mIHRoZSBtb2RhbFxuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldE1vZGFsKTtcblxuICAgICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgcGFzc2VkIGNvbmZpZ1xuICAgICAgdGhpcy5jb25maWcgPSB7IGRlYnVnTW9kZTogZGVidWdNb2RlLCBkaXNhYmxlU2Nyb2xsOiBkaXNhYmxlU2Nyb2xsLCBvcGVuVHJpZ2dlcjogb3BlblRyaWdnZXIsIGNsb3NlVHJpZ2dlcjogY2xvc2VUcmlnZ2VyLCBvblNob3c6IG9uU2hvdywgb25DbG9zZTogb25DbG9zZSwgYXdhaXRDbG9zZUFuaW1hdGlvbjogYXdhaXRDbG9zZUFuaW1hdGlvbiwgZGlzYWJsZUZvY3VzOiBkaXNhYmxlRm9jdXNcblxuICAgICAgICAvLyBSZWdpc3RlciBjbGljayBldmVudHMgb25seSBpZiBwcmViaW5kaW5nIGV2ZW50TGlzdGVuZXJzXG4gICAgICB9O2lmICh0cmlnZ2Vycy5sZW5ndGggPiAwKSB0aGlzLnJlZ2lzdGVyVHJpZ2dlcnMuYXBwbHkodGhpcywgdG9Db25zdW1hYmxlQXJyYXkodHJpZ2dlcnMpKTtcblxuICAgICAgLy8gcHJlYmluZCBmdW5jdGlvbnMgZm9yIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLm9uS2V5ZG93biA9IHRoaXMub25LZXlkb3duLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgdGhyb3VnaCBhbGwgb3BlblRyaWdnZXJzIGFuZCBiaW5kcyBjbGljayBldmVudFxuICAgICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VycyBbQXJyYXkgb2Ygbm9kZSBlbGVtZW50c11cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuXG5cbiAgICBjcmVhdGVDbGFzcyhNb2RhbCwgW3tcbiAgICAgIGtleTogJ3JlZ2lzdGVyVHJpZ2dlcnMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyVHJpZ2dlcnMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHRyaWdnZXJzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgdHJpZ2dlcnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaG93TW9kYWwoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2hvd01vZGFsJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c1RvRmlyc3ROb2RlKCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsQmVoYXZpb3VyKCdkaXNhYmxlJyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5jb25maWcub25TaG93KHRoaXMubW9kYWwpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2Nsb3NlTW9kYWwnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHZhciBtb2RhbCA9IHRoaXMubW9kYWw7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxCZWhhdmlvdXIoJ2VuYWJsZScpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5jb25maWcub25DbG9zZSh0aGlzLm1vZGFsKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXdhaXRDbG9zZUFuaW1hdGlvbikge1xuICAgICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIG1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2Nyb2xsQmVoYXZpb3VyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzY3JvbGxCZWhhdmlvdXIodG9nZ2xlKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZVNjcm9sbCkgcmV0dXJuO1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgc3dpdGNoICh0b2dnbGUpIHtcbiAgICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihib2R5LnN0eWxlLCB7IG92ZXJmbG93OiAnaW5pdGlhbCcsIGhlaWdodDogJ2luaXRpYWwnIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGlzYWJsZSc6XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHkuc3R5bGUsIHsgb3ZlcmZsb3c6ICdoaWRkZW4nLCBoZWlnaHQ6ICcxMDB2aCcgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnYWRkRXZlbnRMaXN0ZW5lcnMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW1vdmVFdmVudExpc3RlbmVycycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25DbGljayk7XG4gICAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uQ2xpY2snLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5jb25maWcuY2xvc2VUcmlnZ2VyKSkge1xuICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbktleWRvd24nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHRoaXMuY2xvc2VNb2RhbChldmVudCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5KSB0aGlzLm1haW50YWluRm9jdXMoZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2dldEZvY3VzYWJsZU5vZGVzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGb2N1c2FibGVOb2RlcygpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUyk7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhub2RlcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2V0Rm9jdXNUb0ZpcnN0Tm9kZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Rm9jdXNUb0ZpcnN0Tm9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRpc2FibGVGb2N1cykgcmV0dXJuO1xuICAgICAgICB2YXIgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7XG4gICAgICAgIGlmIChmb2N1c2FibGVOb2Rlcy5sZW5ndGgpIGZvY3VzYWJsZU5vZGVzWzBdLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbWFpbnRhaW5Gb2N1cycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbWFpbnRhaW5Gb2N1cyhldmVudCkge1xuICAgICAgICB2YXIgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7XG5cbiAgICAgICAgLy8gaWYgZGlzYWJsZUZvY3VzIGlzIHRydWVcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgZm9jdXNhYmxlTm9kZXNbMF0uZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZm9jdXNlZEl0ZW1JbmRleCA9IGZvY3VzYWJsZU5vZGVzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZm9jdXNhYmxlTm9kZXNbZm9jdXNhYmxlTm9kZXMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBmb2N1c2FibGVOb2Rlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIE1vZGFsO1xuICB9KCk7XG5cbiAgLyoqXG4gICAqIE1vZGFsIHByb3RvdHlwZSBlbmRzLlxuICAgKiBIZXJlIG9uIGNvZGUgaXMgcmVwb3NpYmxlIGZvciBkZXRlY3RpbmcgYW5kXG4gICAqIGF1dG9iaW5kaW5nIGV2ZW50IGhhbmRsZXJzIG9uIG1vZGFsIHRyaWdnZXJzXG4gICAqL1xuXG4gIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG9wZW5lZCBtb2RhbFxuXG5cbiAgdmFyIGFjdGl2ZU1vZGFsID0gbnVsbDtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFzc29jaWF0aXZlIGFycmF5IG9mIG1vZGFscyBhbmQgaXQnc1xuICAgKiByZXNwZWN0aXZlIHRyaWdnZXJzXG4gICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VycyAgICAgQW4gYXJyYXkgb2YgYWxsIHRyaWdnZXJzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdHJpZ2dlckF0dHIgVGhlIGRhdGEtYXR0cmlidXRlIHdoaWNoIHRyaWdnZXJzIHRoZSBtb2R1bGVcbiAgICogQHJldHVybiB7YXJyYXl9XG4gICAqL1xuICB2YXIgZ2VuZXJhdGVUcmlnZ2VyTWFwID0gZnVuY3Rpb24gZ2VuZXJhdGVUcmlnZ2VyTWFwKHRyaWdnZXJzLCB0cmlnZ2VyQXR0cikge1xuICAgIHZhciB0cmlnZ2VyTWFwID0gW107XG5cbiAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICB2YXIgdGFyZ2V0TW9kYWwgPSB0cmlnZ2VyLmF0dHJpYnV0ZXNbdHJpZ2dlckF0dHJdLnZhbHVlO1xuICAgICAgaWYgKHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID09PSB1bmRlZmluZWQpIHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID0gW107XG4gICAgICB0cmlnZ2VyTWFwW3RhcmdldE1vZGFsXS5wdXNoKHRyaWdnZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJNYXA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB3aGV0aGVyIGEgbW9kYWwgb2YgdGhlIGdpdmVuIGlkIGV4aXN0c1xuICAgKiBpbiB0aGUgRE9NXG4gICAqIEBwYXJhbSAge251bWJlcn0gaWQgIFRoZSBpZCBvZiB0aGUgbW9kYWxcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UgPSBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UoaWQpIHtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkge1xuICAgICAgY29uc29sZS53YXJuKCdNaWNyb01vZGFsIHYnICsgdmVyc2lvbiArICc6IFxcdTI3NTdTZWVtcyBsaWtlIHlvdSBoYXZlIG1pc3NlZCAlY1xcJycgKyBpZCArICdcXCcnLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCAnSUQgc29tZXdoZXJlIGluIHlvdXIgY29kZS4gUmVmZXIgZXhhbXBsZSBiZWxvdyB0byByZXNvbHZlIGl0LicpO1xuICAgICAgY29uc29sZS53YXJuKCclY0V4YW1wbGU6JywgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJzxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwiJyArIGlkICsgJ1wiPjwvZGl2PicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZXJlIGFyZSBtb2RhbCB0cmlnZ2VycyBwcmVzZW50XG4gICAqIGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzIEFuIGFycmF5IG9mIGRhdGEtdHJpZ2dlcnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciB2YWxpZGF0ZVRyaWdnZXJQcmVzZW5jZSA9IGZ1bmN0aW9uIHZhbGlkYXRlVHJpZ2dlclByZXNlbmNlKHRyaWdnZXJzKSB7XG4gICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA8PSAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ01pY3JvTW9kYWwgdicgKyB2ZXJzaW9uICsgJzogXFx1Mjc1N1BsZWFzZSBzcGVjaWZ5IGF0IGxlYXN0IG9uZSAlY1xcJ21pY3JvbW9kYWwtdHJpZ2dlclxcJycsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsICdkYXRhIGF0dHJpYnV0ZS4nKTtcbiAgICAgIGNvbnNvbGUud2FybignJWNFeGFtcGxlOicsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsICc8YSBocmVmPVwiI1wiIGRhdGEtbWljcm9tb2RhbC10cmlnZ2VyPVwibXktbW9kYWxcIj48L2E+Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHJpZ2dlcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgbW9kYWxzXG4gICAqIGFyZSBwcmVzZW50IGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzICAgQXJyYXkgb2YgRE9NIG5vZGVzIHdoaWNoIGhhdmUgZGF0YS10cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlck1hcCBBc3NvY2lhdGl2ZSBhcnJheSBvZiBtb2RhbHMgYW5kIHRoaWVyIHRyaWdnZXJzXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICB2YXIgdmFsaWRhdGVBcmdzID0gZnVuY3Rpb24gdmFsaWRhdGVBcmdzKHRyaWdnZXJzLCB0cmlnZ2VyTWFwKSB7XG4gICAgdmFsaWRhdGVUcmlnZ2VyUHJlc2VuY2UodHJpZ2dlcnMpO1xuICAgIGlmICghdHJpZ2dlck1hcCkgcmV0dXJuIHRydWU7XG4gICAgZm9yICh2YXIgaWQgaW4gdHJpZ2dlck1hcCkge1xuICAgICAgdmFsaWRhdGVNb2RhbFByZXNlbmNlKGlkKTtcbiAgICB9cmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmRzIGNsaWNrIGhhbmRsZXJzIHRvIGFsbCBtb2RhbCB0cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgdmFyIGluaXQgPSBmdW5jdGlvbiBpbml0KGNvbmZpZykge1xuICAgIC8vIENyZWF0ZSBhbiBjb25maWcgb2JqZWN0IHdpdGggZGVmYXVsdCBvcGVuVHJpZ2dlclxuICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgeyBvcGVuVHJpZ2dlcjogJ2RhdGEtbWljcm9tb2RhbC10cmlnZ2VyJyB9LCBjb25maWcpO1xuXG4gICAgLy8gQ29sbGVjdHMgYWxsIHRoZSBub2RlcyB3aXRoIHRoZSB0cmlnZ2VyXG4gICAgdmFyIHRyaWdnZXJzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgb3B0aW9ucy5vcGVuVHJpZ2dlciArICddJykpKTtcblxuICAgIC8vIE1ha2VzIGEgbWFwcGluZ3Mgb2YgbW9kYWxzIHdpdGggdGhlaXIgdHJpZ2dlciBub2Rlc1xuICAgIHZhciB0cmlnZ2VyTWFwID0gZ2VuZXJhdGVUcmlnZ2VyTWFwKHRyaWdnZXJzLCBvcHRpb25zLm9wZW5UcmlnZ2VyKTtcblxuICAgIC8vIENoZWNrcyBpZiBtb2RhbHMgYW5kIHRyaWdnZXJzIGV4aXN0IGluIGRvbVxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZUFyZ3ModHJpZ2dlcnMsIHRyaWdnZXJNYXApID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHRhcmdldCBtb2RhbCBjcmVhdGVzIGEgbmV3IGluc3RhbmNlXG4gICAgZm9yICh2YXIga2V5IGluIHRyaWdnZXJNYXApIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRyaWdnZXJNYXBba2V5XTtcbiAgICAgIG9wdGlvbnMudGFyZ2V0TW9kYWwgPSBrZXk7XG4gICAgICBvcHRpb25zLnRyaWdnZXJzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KHZhbHVlKSk7XG4gICAgICBuZXcgTW9kYWwob3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTaG93cyBhIHBhcnRpY3VsYXIgbW9kYWxcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0YXJnZXRNb2RhbCBbVGhlIGlkIG9mIHRoZSBtb2RhbCB0byBkaXNwbGF5XVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIHBhc3NdXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB2YXIgc2hvdyA9IGZ1bmN0aW9uIHNob3codGFyZ2V0TW9kYWwsIGNvbmZpZykge1xuICAgIHZhciBvcHRpb25zID0gY29uZmlnIHx8IHt9O1xuICAgIG9wdGlvbnMudGFyZ2V0TW9kYWwgPSB0YXJnZXRNb2RhbDtcblxuICAgIC8vIENoZWNrcyBpZiBtb2RhbHMgYW5kIHRyaWdnZXJzIGV4aXN0IGluIGRvbVxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UodGFyZ2V0TW9kYWwpID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gc3RvcmVzIHJlZmVyZW5jZSB0byBhY3RpdmUgbW9kYWxcbiAgICBhY3RpdmVNb2RhbCA9IG5ldyBNb2RhbChvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBhY3RpdmVNb2RhbC5zaG93TW9kYWwoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBhY3RpdmUgbW9kYWxcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBjbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGFjdGl2ZU1vZGFsLmNsb3NlTW9kYWwoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0OiBpbml0LCBzaG93OiBzaG93LCBjbG9zZTogY2xvc2UgfTtcbn0oKTtcblxucmV0dXJuIE1pY3JvTW9kYWw7XG5cbn0pKSk7XG4iLCIvKiEgbW9kZXJuaXpyIDMuNi4wIChDdXN0b20gQnVpbGQpIHwgTUlUICpcbiAqIGh0dHBzOi8vbW9kZXJuaXpyLmNvbS9kb3dubG9hZC8/LXRvdWNoZXZlbnRzLXNldGNsYXNzZXMgISovXG4hZnVuY3Rpb24oZSxuLHQpe2Z1bmN0aW9uIG8oZSxuKXtyZXR1cm4gdHlwZW9mIGU9PT1ufWZ1bmN0aW9uIHMoKXt2YXIgZSxuLHQscyxhLGkscjtmb3IodmFyIGwgaW4gYylpZihjLmhhc093blByb3BlcnR5KGwpKXtpZihlPVtdLG49Y1tsXSxuLm5hbWUmJihlLnB1c2gobi5uYW1lLnRvTG93ZXJDYXNlKCkpLG4ub3B0aW9ucyYmbi5vcHRpb25zLmFsaWFzZXMmJm4ub3B0aW9ucy5hbGlhc2VzLmxlbmd0aCkpZm9yKHQ9MDt0PG4ub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDt0KyspZS5wdXNoKG4ub3B0aW9ucy5hbGlhc2VzW3RdLnRvTG93ZXJDYXNlKCkpO2ZvcihzPW8obi5mbixcImZ1bmN0aW9uXCIpP24uZm4oKTpuLmZuLGE9MDthPGUubGVuZ3RoO2ErKylpPWVbYV0scj1pLnNwbGl0KFwiLlwiKSwxPT09ci5sZW5ndGg/TW9kZXJuaXpyW3JbMF1dPXM6KCFNb2Rlcm5penJbclswXV18fE1vZGVybml6cltyWzBdXWluc3RhbmNlb2YgQm9vbGVhbnx8KE1vZGVybml6cltyWzBdXT1uZXcgQm9vbGVhbihNb2Rlcm5penJbclswXV0pKSxNb2Rlcm5penJbclswXV1bclsxXV09cyksZi5wdXNoKChzP1wiXCI6XCJuby1cIikrci5qb2luKFwiLVwiKSl9fWZ1bmN0aW9uIGEoZSl7dmFyIG49dS5jbGFzc05hbWUsdD1Nb2Rlcm5penIuX2NvbmZpZy5jbGFzc1ByZWZpeHx8XCJcIjtpZihwJiYobj1uLmJhc2VWYWwpLE1vZGVybml6ci5fY29uZmlnLmVuYWJsZUpTQ2xhc3Mpe3ZhciBvPW5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0K1wibm8tanMoXFxcXHN8JClcIik7bj1uLnJlcGxhY2UobyxcIiQxXCIrdCtcImpzJDJcIil9TW9kZXJuaXpyLl9jb25maWcuZW5hYmxlQ2xhc3NlcyYmKG4rPVwiIFwiK3QrZS5qb2luKFwiIFwiK3QpLHA/dS5jbGFzc05hbWUuYmFzZVZhbD1uOnUuY2xhc3NOYW1lPW4pfWZ1bmN0aW9uIGkoKXtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiBuLmNyZWF0ZUVsZW1lbnQ/bi5jcmVhdGVFbGVtZW50KGFyZ3VtZW50c1swXSk6cD9uLmNyZWF0ZUVsZW1lbnROUy5jYWxsKG4sXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGFyZ3VtZW50c1swXSk6bi5jcmVhdGVFbGVtZW50LmFwcGx5KG4sYXJndW1lbnRzKX1mdW5jdGlvbiByKCl7dmFyIGU9bi5ib2R5O3JldHVybiBlfHwoZT1pKHA/XCJzdmdcIjpcImJvZHlcIiksZS5mYWtlPSEwKSxlfWZ1bmN0aW9uIGwoZSx0LG8scyl7dmFyIGEsbCxmLGMsZD1cIm1vZGVybml6clwiLHA9aShcImRpdlwiKSxoPXIoKTtpZihwYXJzZUludChvLDEwKSlmb3IoO28tLTspZj1pKFwiZGl2XCIpLGYuaWQ9cz9zW29dOmQrKG8rMSkscC5hcHBlbmRDaGlsZChmKTtyZXR1cm4gYT1pKFwic3R5bGVcIiksYS50eXBlPVwidGV4dC9jc3NcIixhLmlkPVwic1wiK2QsKGguZmFrZT9oOnApLmFwcGVuZENoaWxkKGEpLGguYXBwZW5kQ2hpbGQocCksYS5zdHlsZVNoZWV0P2Euc3R5bGVTaGVldC5jc3NUZXh0PWU6YS5hcHBlbmRDaGlsZChuLmNyZWF0ZVRleHROb2RlKGUpKSxwLmlkPWQsaC5mYWtlJiYoaC5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIsaC5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLGM9dS5zdHlsZS5vdmVyZmxvdyx1LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsdS5hcHBlbmRDaGlsZChoKSksbD10KHAsZSksaC5mYWtlPyhoLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaCksdS5zdHlsZS5vdmVyZmxvdz1jLHUub2Zmc2V0SGVpZ2h0KTpwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocCksISFsfXZhciBmPVtdLGM9W10sZD17X3ZlcnNpb246XCIzLjYuMFwiLF9jb25maWc6e2NsYXNzUHJlZml4OlwiXCIsZW5hYmxlQ2xhc3NlczohMCxlbmFibGVKU0NsYXNzOiEwLHVzZVByZWZpeGVzOiEwfSxfcTpbXSxvbjpmdW5jdGlvbihlLG4pe3ZhciB0PXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe24odFtlXSl9LDApfSxhZGRUZXN0OmZ1bmN0aW9uKGUsbix0KXtjLnB1c2goe25hbWU6ZSxmbjpuLG9wdGlvbnM6dH0pfSxhZGRBc3luY1Rlc3Q6ZnVuY3Rpb24oZSl7Yy5wdXNoKHtuYW1lOm51bGwsZm46ZX0pfX0sTW9kZXJuaXpyPWZ1bmN0aW9uKCl7fTtNb2Rlcm5penIucHJvdG90eXBlPWQsTW9kZXJuaXpyPW5ldyBNb2Rlcm5penI7dmFyIHU9bi5kb2N1bWVudEVsZW1lbnQscD1cInN2Z1wiPT09dS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLGg9ZC5fY29uZmlnLnVzZVByZWZpeGVzP1wiIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtIFwiLnNwbGl0KFwiIFwiKTpbXCJcIixcIlwiXTtkLl9wcmVmaXhlcz1oO3ZhciBtPWQudGVzdFN0eWxlcz1sO01vZGVybml6ci5hZGRUZXN0KFwidG91Y2hldmVudHNcIixmdW5jdGlvbigpe3ZhciB0O2lmKFwib250b3VjaHN0YXJ0XCJpbiBlfHxlLkRvY3VtZW50VG91Y2gmJm4gaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKXQ9ITA7ZWxzZXt2YXIgbz1bXCJAbWVkaWEgKFwiLGguam9pbihcInRvdWNoLWVuYWJsZWQpLChcIiksXCJoZWFydHpcIixcIilcIixcInsjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fVwiXS5qb2luKFwiXCIpO20obyxmdW5jdGlvbihlKXt0PTk9PT1lLm9mZnNldFRvcH0pfXJldHVybiB0fSkscygpLGEoZiksZGVsZXRlIGQuYWRkVGVzdCxkZWxldGUgZC5hZGRBc3luY1Rlc3Q7Zm9yKHZhciB2PTA7djxNb2Rlcm5penIuX3EubGVuZ3RoO3YrKylNb2Rlcm5penIuX3Fbdl0oKTtlLk1vZGVybml6cj1Nb2Rlcm5penJ9KHdpbmRvdyxkb2N1bWVudCk7IiwiLyohXG4gKiBQaWthZGF5XG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQgRGF2aWQgQnVzaGVsbCB8IEJTRCAmIE1JVCBsaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2RidXNoZWxsL1Bpa2FkYXlcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG1vbWVudDtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTIG1vZHVsZVxuICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkobW9tZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAocmVxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBMb2FkIG1vbWVudC5qcyBhcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5XG4gICAgICAgICAgICB2YXIgaWQgPSAnbW9tZW50JztcbiAgICAgICAgICAgIHRyeSB7IG1vbWVudCA9IHJlcShpZCk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShtb21lbnQpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LlBpa2FkYXkgPSBmYWN0b3J5KHJvb3QubW9tZW50KTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChtb21lbnQpXG57XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogZmVhdHVyZSBkZXRlY3Rpb24gYW5kIGhlbHBlciBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICB2YXIgaGFzTW9tZW50ID0gdHlwZW9mIG1vbWVudCA9PT0gJ2Z1bmN0aW9uJyxcblxuICAgIGhhc0V2ZW50TGlzdGVuZXJzID0gISF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuXG4gICAgc3RvID0gd2luZG93LnNldFRpbWVvdXQsXG5cbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRyaW0gPSBmdW5jdGlvbihzdHIpXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csJycpO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIHJldHVybiAoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNuICsgJyAnKSAhPT0gLTE7XG4gICAgfSxcblxuICAgIGFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgY24pKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoZWwuY2xhc3NOYW1lID09PSAnJykgPyBjbiA6IGVsLmNsYXNzTmFtZSArICcgJyArIGNuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdHJpbSgoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKCcgJyArIGNuICsgJyAnLCAnICcpKTtcbiAgICB9LFxuXG4gICAgaXNBcnJheSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0FycmF5LykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSk7XG4gICAgfSxcblxuICAgIGlzRGF0ZSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0RhdGUvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSAmJiAhaXNOYU4ob2JqLmdldFRpbWUoKSk7XG4gICAgfSxcblxuICAgIGlzV2Vla2VuZCA9IGZ1bmN0aW9uKGRhdGUpXG4gICAge1xuICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgcmV0dXJuIGRheSA9PT0gMCB8fCBkYXkgPT09IDY7XG4gICAgfSxcblxuICAgIGlzTGVhcFllYXIgPSBmdW5jdGlvbih5ZWFyKVxuICAgIHtcbiAgICAgICAgLy8gc29sdXRpb24gYnkgTWF0dGkgVmlya2t1bmVuOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODgxOTUxXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfSxcblxuICAgIGdldERheXNJbk1vbnRoID0gZnVuY3Rpb24oeWVhciwgbW9udGgpXG4gICAge1xuICAgICAgICByZXR1cm4gWzMxLCBpc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vbnRoXTtcbiAgICB9LFxuXG4gICAgc2V0VG9TdGFydE9mRGF5ID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gICAgfSxcblxuICAgIGNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uKGEsYilcbiAgICB7XG4gICAgICAgIC8vIHdlYWsgZGF0ZSBjb21wYXJpc29uICh1c2Ugc2V0VG9TdGFydE9mRGF5KGRhdGUpIHRvIGVuc3VyZSBjb3JyZWN0IHJlc3VsdClcbiAgICAgICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcbiAgICB9LFxuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24odG8sIGZyb20sIG92ZXJ3cml0ZSlcbiAgICB7XG4gICAgICAgIHZhciBwcm9wLCBoYXNQcm9wO1xuICAgICAgICBmb3IgKHByb3AgaW4gZnJvbSkge1xuICAgICAgICAgICAgaGFzUHJvcCA9IHRvW3Byb3BdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaGFzUHJvcCAmJiB0eXBlb2YgZnJvbVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgZnJvbVtwcm9wXSAhPT0gbnVsbCAmJiBmcm9tW3Byb3BdLm5vZGVOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXRlKGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gbmV3IERhdGUoZnJvbVtwcm9wXS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBleHRlbmQoe30sIGZyb21bcHJvcF0sIG92ZXJ3cml0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVyd3JpdGUgfHwgIWhhc1Byb3ApIHtcbiAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG5cbiAgICBmaXJlRXZlbnQgPSBmdW5jdGlvbihlbCwgZXZlbnROYW1lLCBkYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIGV2O1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXYuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmZpcmVFdmVudCgnb24nICsgZXZlbnROYW1lLCBldik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRqdXN0Q2FsZW5kYXIgPSBmdW5jdGlvbihjYWxlbmRhcikge1xuICAgICAgICBpZiAoY2FsZW5kYXIubW9udGggPCAwKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyIC09IE1hdGguY2VpbChNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggKz0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLnllYXIgKz0gTWF0aC5mbG9vcihNYXRoLmFicyhjYWxlbmRhci5tb250aCkvMTIpO1xuICAgICAgICAgICAgY2FsZW5kYXIubW9udGggLT0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZWZhdWx0cyBhbmQgbG9jYWxpc2F0aW9uXG4gICAgICovXG4gICAgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gYmluZCB0aGUgcGlja2VyIHRvIGEgZm9ybSBmaWVsZFxuICAgICAgICBmaWVsZDogbnVsbCxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHNob3cvaGlkZSB0aGUgcGlja2VyIG9uIGBmaWVsZGAgZm9jdXMgKGRlZmF1bHQgYHRydWVgIGlmIGBmaWVsZGAgaXMgc2V0KVxuICAgICAgICBib3VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkYXRlcGlja2VyLCByZWxhdGl2ZSB0byB0aGUgZmllbGQgKGRlZmF1bHQgdG8gYm90dG9tICYgbGVmdClcbiAgICAgICAgLy8gKCdib3R0b20nICYgJ2xlZnQnIGtleXdvcmRzIGFyZSBub3QgdXNlZCwgJ3RvcCcgJiAncmlnaHQnIGFyZSBtb2RpZmllciBvbiB0aGUgYm90dG9tL2xlZnQgcG9zaXRpb24pXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZml0IGluIHRoZSB2aWV3cG9ydCBldmVuIGlmIGl0IG1lYW5zIHJlcG9zaXRpb25pbmcgZnJvbSB0aGUgcG9zaXRpb24gb3B0aW9uXG4gICAgICAgIHJlcG9zaXRpb246IHRydWUsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgb3V0cHV0IGZvcm1hdCBmb3IgYC50b1N0cmluZygpYCBhbmQgYGZpZWxkYCB2YWx1ZVxuICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREJyxcblxuICAgICAgICAvLyB0aGUgdG9TdHJpbmcgZnVuY3Rpb24gd2hpY2ggZ2V0cyBwYXNzZWQgYSBjdXJyZW50IGRhdGUgb2JqZWN0IGFuZCBmb3JtYXRcbiAgICAgICAgLy8gYW5kIHJldHVybnMgYSBzdHJpbmdcbiAgICAgICAgdG9TdHJpbmc6IG51bGwsXG5cbiAgICAgICAgLy8gdXNlZCB0byBjcmVhdGUgZGF0ZSBvYmplY3QgZnJvbSBjdXJyZW50IGlucHV0IHN0cmluZ1xuICAgICAgICBwYXJzZTogbnVsbCxcblxuICAgICAgICAvLyB0aGUgaW5pdGlhbCBkYXRlIHRvIHZpZXcgd2hlbiBmaXJzdCBvcGVuZWRcbiAgICAgICAgZGVmYXVsdERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYGRlZmF1bHREYXRlYCB0aGUgaW5pdGlhbCBzZWxlY3RlZCB2YWx1ZVxuICAgICAgICBzZXREZWZhdWx0RGF0ZTogZmFsc2UsXG5cbiAgICAgICAgLy8gZmlyc3QgZGF5IG9mIHdlZWsgKDA6IFN1bmRheSwgMTogTW9uZGF5IGV0YylcbiAgICAgICAgZmlyc3REYXk6IDAsXG5cbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgZmxhZyBmb3IgbW9tZW50J3Mgc3RyaWN0IGRhdGUgcGFyc2luZ1xuICAgICAgICBmb3JtYXRTdHJpY3Q6IGZhbHNlLFxuXG4gICAgICAgIC8vIHRoZSBtaW5pbXVtL2VhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgLy8gdGhlIG1heGltdW0vbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWF4RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBudW1iZXIgb2YgeWVhcnMgZWl0aGVyIHNpZGUsIG9yIGFycmF5IG9mIHVwcGVyL2xvd2VyIHJhbmdlXG4gICAgICAgIHllYXJSYW5nZTogMTAsXG5cbiAgICAgICAgLy8gc2hvdyB3ZWVrIG51bWJlcnMgYXQgaGVhZCBvZiByb3dcbiAgICAgICAgc2hvd1dlZWtOdW1iZXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFdlZWsgcGlja2VyIG1vZGVcbiAgICAgICAgcGlja1dob2xlV2VlazogZmFsc2UsXG5cbiAgICAgICAgLy8gdXNlZCBpbnRlcm5hbGx5IChkb24ndCBjb25maWcgb3V0c2lkZSlcbiAgICAgICAgbWluWWVhcjogMCxcbiAgICAgICAgbWF4WWVhcjogOTk5OSxcbiAgICAgICAgbWluTW9udGg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4TW9udGg6IHVuZGVmaW5lZCxcblxuICAgICAgICBzdGFydFJhbmdlOiBudWxsLFxuICAgICAgICBlbmRSYW5nZTogbnVsbCxcblxuICAgICAgICBpc1JUTDogZmFsc2UsXG5cbiAgICAgICAgLy8gQWRkaXRpb25hbCB0ZXh0IHRvIGFwcGVuZCB0byB0aGUgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgeWVhclN1ZmZpeDogJycsXG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSBtb250aCBhZnRlciB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICBzaG93TW9udGhBZnRlclllYXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIFJlbmRlciBkYXlzIG9mIHRoZSBjYWxlbmRhciBncmlkIHRoYXQgZmFsbCBpbiB0aGUgbmV4dCBvciBwcmV2aW91cyBtb250aFxuICAgICAgICBzaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBBbGxvd3MgdXNlciB0byBzZWxlY3QgZGF5cyB0aGF0IGZhbGwgaW4gdGhlIG5leHQgb3IgcHJldmlvdXMgbW9udGhcbiAgICAgICAgZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzOiBmYWxzZSxcblxuICAgICAgICAvLyBob3cgbWFueSBtb250aHMgYXJlIHZpc2libGVcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDEsXG5cbiAgICAgICAgLy8gd2hlbiBudW1iZXJPZk1vbnRocyBpcyB1c2VkLCB0aGlzIHdpbGwgaGVscCB5b3UgdG8gY2hvb3NlIHdoZXJlIHRoZSBtYWluIGNhbGVuZGFyIHdpbGwgYmUgKGRlZmF1bHQgYGxlZnRgLCBjYW4gYmUgc2V0IHRvIGByaWdodGApXG4gICAgICAgIC8vIG9ubHkgdXNlZCBmb3IgdGhlIGZpcnN0IGRpc3BsYXkgb3Igd2hlbiBhIHNlbGVjdGVkIGRhdGUgaXMgbm90IHZpc2libGVcbiAgICAgICAgbWFpbkNhbGVuZGFyOiAnbGVmdCcsXG5cbiAgICAgICAgLy8gU3BlY2lmeSBhIERPTSBlbGVtZW50IHRvIHJlbmRlciB0aGUgY2FsZW5kYXIgaW5cbiAgICAgICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gQmx1ciBmaWVsZCB3aGVuIGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgYmx1ckZpZWxkT25TZWxlY3QgOiB0cnVlLFxuXG4gICAgICAgIC8vIGludGVybmF0aW9uYWxpemF0aW9uXG4gICAgICAgIGkxOG46IHtcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGggOiAnUHJldmlvdXMgTW9udGgnLFxuICAgICAgICAgICAgbmV4dE1vbnRoICAgICA6ICdOZXh0IE1vbnRoJyxcbiAgICAgICAgICAgIG1vbnRocyAgICAgICAgOiBbJ0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJywnQXByaWwnLCdNYXknLCdKdW5lJywnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09jdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICB3ZWVrZGF5cyAgICAgIDogWydTdW5kYXknLCdNb25kYXknLCdUdWVzZGF5JywnV2VkbmVzZGF5JywnVGh1cnNkYXknLCdGcmlkYXknLCdTYXR1cmRheSddLFxuICAgICAgICAgICAgd2Vla2RheXNTaG9ydCA6IFsnU3VuJywnTW9uJywnVHVlJywnV2VkJywnVGh1JywnRnJpJywnU2F0J11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGVtZSBDbGFzc25hbWVcbiAgICAgICAgdGhlbWU6IG51bGwsXG5cbiAgICAgICAgLy8gZXZlbnRzIGFycmF5XG4gICAgICAgIGV2ZW50czogW10sXG5cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgb25TZWxlY3Q6IG51bGwsXG4gICAgICAgIG9uT3BlbjogbnVsbCxcbiAgICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgICAgb25EcmF3OiBudWxsLFxuXG4gICAgICAgIC8vIEVuYWJsZSBrZXlib2FyZCBpbnB1dFxuICAgICAgICBrZXlib2FyZElucHV0OiB0cnVlXG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogdGVtcGxhdGluZyBmdW5jdGlvbnMgdG8gYWJzdHJhY3QgSFRNTCByZW5kZXJpbmdcbiAgICAgKi9cbiAgICByZW5kZXJEYXlOYW1lID0gZnVuY3Rpb24ob3B0cywgZGF5LCBhYmJyKVxuICAgIHtcbiAgICAgICAgZGF5ICs9IG9wdHMuZmlyc3REYXk7XG4gICAgICAgIHdoaWxlIChkYXkgPj0gNykge1xuICAgICAgICAgICAgZGF5IC09IDc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFiYnIgPyBvcHRzLmkxOG4ud2Vla2RheXNTaG9ydFtkYXldIDogb3B0cy5pMThuLndlZWtkYXlzW2RheV07XG4gICAgfSxcblxuICAgIHJlbmRlckRheSA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIHZhciBhcmlhU2VsZWN0ZWQgPSAnZmFsc2UnO1xuICAgICAgICBpZiAob3B0cy5pc0VtcHR5KSB7XG4gICAgICAgICAgICBpZiAob3B0cy5zaG93RGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJ2lzLW91dHNpZGUtY3VycmVudC1tb250aCcpO1xuXG4gICAgICAgICAgICAgICAgaWYoIW9wdHMuZW5hYmxlU2VsZWN0aW9uRGF5c0luTmV4dEFuZFByZXZpb3VzTW9udGhzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zZWxlY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJpcy1lbXB0eVwiPjwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1RvZGF5KSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtdG9kYXknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGFyaWFTZWxlY3RlZCA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5oYXNFdmVudCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2hhcy1ldmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzSW5SYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWlucmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1zdGFydHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNFbmRSYW5nZSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWVuZHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGQgZGF0YS1kYXk9XCInICsgb3B0cy5kYXkgKyAnXCIgY2xhc3M9XCInICsgYXJyLmpvaW4oJyAnKSArICdcIiBhcmlhLXNlbGVjdGVkPVwiJyArIGFyaWFTZWxlY3RlZCArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJwaWthLWJ1dHRvbiBwaWthLWRheVwiIHR5cGU9XCJidXR0b25cIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcGlrYS15ZWFyPVwiJyArIG9wdHMueWVhciArICdcIiBkYXRhLXBpa2EtbW9udGg9XCInICsgb3B0cy5tb250aCArICdcIiBkYXRhLXBpa2EtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kYXkgK1xuICAgICAgICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJXZWVrID0gZnVuY3Rpb24gKGQsIG0sIHkpIHtcbiAgICAgICAgLy8gTGlmdGVkIGZyb20gaHR0cDovL2phdmFzY3JpcHQuYWJvdXQuY29tL2xpYnJhcnkvYmx3ZWVreWVhci5odG0sIGxpZ2h0bHkgbW9kaWZpZWQuXG4gICAgICAgIHZhciBvbmVqYW4gPSBuZXcgRGF0ZSh5LCAwLCAxKSxcbiAgICAgICAgICAgIHdlZWtOdW0gPSBNYXRoLmNlaWwoKCgobmV3IERhdGUoeSwgbSwgZCkgLSBvbmVqYW4pIC8gODY0MDAwMDApICsgb25lamFuLmdldERheSgpKzEpLzcpO1xuICAgICAgICByZXR1cm4gJzx0ZCBjbGFzcz1cInBpa2Etd2Vla1wiPicgKyB3ZWVrTnVtICsgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyUm93ID0gZnVuY3Rpb24oZGF5cywgaXNSVEwsIHBpY2tXaG9sZVdlZWssIGlzUm93U2VsZWN0ZWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0ciBjbGFzcz1cInBpa2Etcm93JyArIChwaWNrV2hvbGVXZWVrID8gJyBwaWNrLXdob2xlLXdlZWsnIDogJycpICsgKGlzUm93U2VsZWN0ZWQgPyAnIGlzLXNlbGVjdGVkJyA6ICcnKSArICdcIj4nICsgKGlzUlRMID8gZGF5cy5yZXZlcnNlKCkgOiBkYXlzKS5qb2luKCcnKSArICc8L3RyPic7XG4gICAgfSxcblxuICAgIHJlbmRlckJvZHkgPSBmdW5jdGlvbihyb3dzKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dGJvZHk+JyArIHJvd3Muam9pbignJykgKyAnPC90Ym9keT4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJIZWFkID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBpLCBhcnIgPSBbXTtcbiAgICAgICAgaWYgKG9wdHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8dGg+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoIHNjb3BlPVwiY29sXCI+PGFiYnIgdGl0bGU9XCInICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpKSArICdcIj4nICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpLCB0cnVlKSArICc8L2FiYnI+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0aGVhZD48dHI+JyArIChvcHRzLmlzUlRMID8gYXJyLnJldmVyc2UoKSA6IGFycikuam9pbignJykgKyAnPC90cj48L3RoZWFkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclRpdGxlID0gZnVuY3Rpb24oaW5zdGFuY2UsIGMsIHllYXIsIG1vbnRoLCByZWZZZWFyLCByYW5kSWQpXG4gICAge1xuICAgICAgICB2YXIgaSwgaiwgYXJyLFxuICAgICAgICAgICAgb3B0cyA9IGluc3RhbmNlLl9vLFxuICAgICAgICAgICAgaXNNaW5ZZWFyID0geWVhciA9PT0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgaXNNYXhZZWFyID0geWVhciA9PT0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgaHRtbCA9ICc8ZGl2IGlkPVwiJyArIHJhbmRJZCArICdcIiBjbGFzcz1cInBpa2EtdGl0bGVcIiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiPicsXG4gICAgICAgICAgICBtb250aEh0bWwsXG4gICAgICAgICAgICB5ZWFySHRtbCxcbiAgICAgICAgICAgIHByZXYgPSB0cnVlLFxuICAgICAgICAgICAgbmV4dCA9IHRydWU7XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXSwgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyAoeWVhciA9PT0gcmVmWWVhciA/IGkgLSBjIDogMTIgKyBpIC0gYykgKyAnXCInICtcbiAgICAgICAgICAgICAgICAoaSA9PT0gbW9udGggPyAnIHNlbGVjdGVkPVwic2VsZWN0ZWRcIic6ICcnKSArXG4gICAgICAgICAgICAgICAgKChpc01pblllYXIgJiYgaSA8IG9wdHMubWluTW9udGgpIHx8IChpc01heFllYXIgJiYgaSA+IG9wdHMubWF4TW9udGgpID8gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIicgOiAnJykgKyAnPicgK1xuICAgICAgICAgICAgICAgIG9wdHMuaTE4bi5tb250aHNbaV0gKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb250aEh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgb3B0cy5pMThuLm1vbnRoc1ttb250aF0gKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LW1vbnRoXCIgdGFiaW5kZXg9XCItMVwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAoaXNBcnJheShvcHRzLnllYXJSYW5nZSkpIHtcbiAgICAgICAgICAgIGkgPSBvcHRzLnllYXJSYW5nZVswXTtcbiAgICAgICAgICAgIGogPSBvcHRzLnllYXJSYW5nZVsxXSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpID0geWVhciAtIG9wdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgaiA9IDEgKyB5ZWFyICsgb3B0cy55ZWFyUmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGFyciA9IFtdOyBpIDwgaiAmJiBpIDw9IG9wdHMubWF4WWVhcjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSBvcHRzLm1pblllYXIpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiJyArIChpID09PSB5ZWFyID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgKyAnPicgKyAoaSkgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeWVhckh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgeWVhciArIG9wdHMueWVhclN1ZmZpeCArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QteWVhclwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKG9wdHMuc2hvd01vbnRoQWZ0ZXJZZWFyKSB7XG4gICAgICAgICAgICBodG1sICs9IHllYXJIdG1sICsgbW9udGhIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHRtbCArPSBtb250aEh0bWwgKyB5ZWFySHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01pblllYXIgJiYgKG1vbnRoID09PSAwIHx8IG9wdHMubWluTW9udGggPj0gbW9udGgpKSB7XG4gICAgICAgICAgICBwcmV2ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNYXhZZWFyICYmIChtb250aCA9PT0gMTEgfHwgb3B0cy5tYXhNb250aCA8PSBtb250aCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1wcmV2JyArIChwcmV2ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ucHJldmlvdXNNb250aCArICc8L2J1dHRvbj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAoaW5zdGFuY2UuX28ubnVtYmVyT2ZNb250aHMgLSAxKSApIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJwaWthLW5leHQnICsgKG5leHQgPyAnJyA6ICcgaXMtZGlzYWJsZWQnKSArICdcIiB0eXBlPVwiYnV0dG9uXCI+JyArIG9wdHMuaTE4bi5uZXh0TW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUYWJsZSA9IGZ1bmN0aW9uKG9wdHMsIGRhdGEsIHJhbmRJZClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicGlrYS10YWJsZVwiIHJvbGU9XCJncmlkXCIgYXJpYS1sYWJlbGxlZGJ5PVwiJyArIHJhbmRJZCArICdcIj4nICsgcmVuZGVySGVhZChvcHRzKSArIHJlbmRlckJvZHkoZGF0YSkgKyAnPC90YWJsZT4nO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFBpa2FkYXkgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBQaWthZGF5ID0gZnVuY3Rpb24ob3B0aW9ucylcbiAgICB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIG9wdHMgPSBzZWxmLmNvbmZpZyhvcHRpb25zKTtcblxuICAgICAgICBzZWxmLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtYnV0dG9uJykgJiYgIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWVtcHR5JykgJiYgIWhhc0NsYXNzKHRhcmdldC5wYXJlbnROb2RlLCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUobmV3IERhdGUodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLXllYXInKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWthLW1vbnRoJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1kYXknKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmJsdXJGaWVsZE9uU2VsZWN0ICYmIG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXByZXYnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnByZXZNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLW5leHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5leHRNb250aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdG91Y2ggZXZlbnQgcHJldmVudCBtb3VzZSBldmVudHMgZW11bGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QtbW9udGgnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b01vbnRoKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC15ZWFyJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9ZZWFyKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25LZXlDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmlzVmlzaWJsZSgpKSB7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5maWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdzdWJ0cmFjdCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ2FkZCcsIDcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZGF0ZTtcblxuICAgICAgICAgICAgaWYgKGUuZmlyZWRCeSA9PT0gc2VsZikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnBhcnNlKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG9wdHMucGFyc2Uob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0LCBvcHRzLmZvcm1hdFN0cmljdCk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IChkYXRlICYmIGRhdGUuaXNWYWxpZCgpKSA/IGRhdGUudG9EYXRlKCkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uob3B0cy5maWVsZC52YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Rm9jdXMgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDbGljayA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEJsdXIgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElFIGFsbG93cyBwaWthIGRpdiB0byBnYWluIGZvY3VzOyBjYXRjaCBibHVyIHRoZSBpbnB1dCBmaWVsZFxuICAgICAgICAgICAgdmFyIHBFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHBFbCwgJ3Bpa2Etc2luZ2xlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgocEVsID0gcEVsLnBhcmVudE5vZGUpKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYiA9IHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fYyA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2xpY2sgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LFxuICAgICAgICAgICAgICAgIHBFbCA9IHRhcmdldDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNFdmVudExpc3RlbmVycyAmJiBoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQub25jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCAncmV0dXJuOycpO1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudCh0YXJnZXQsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpIHx8IHBFbCA9PT0gb3B0cy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5fdiAmJiB0YXJnZXQgIT09IG9wdHMudHJpZ2dlciAmJiBwRWwgIT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgPSAncGlrYS1zaW5nbGUnICsgKG9wdHMuaXNSVEwgPyAnIGlzLXJ0bCcgOiAnJykgKyAob3B0cy50aGVtZSA/ICcgJyArIG9wdHMudGhlbWUgOiAnJyk7XG5cbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ21vdXNlZG93bicsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ3RvdWNoZW5kJywgc2VsZi5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICBhZGRFdmVudChzZWxmLmVsLCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuXG4gICAgICAgIGlmIChvcHRzLmtleWJvYXJkSW5wdXQpIHtcbiAgICAgICAgICAgIGFkZEV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHNlbGYuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5lbCwgb3B0cy5maWVsZC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgc2VsZi5fb25JbnB1dENoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmICghb3B0cy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgb3B0cy5maWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdHMuc2V0RGVmYXVsdERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZkRhdGUgPSBvcHRzLmRlZmF1bHREYXRlO1xuXG4gICAgICAgIGlmIChpc0RhdGUoZGVmRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNldERlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRlZkRhdGUsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9EYXRlKGRlZkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lICs9ICcgaXMtYm91bmQnO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCBzZWxmLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCBzZWxmLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHNlbGYuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogcHVibGljIFBpa2FkYXkgQVBJXG4gICAgICovXG4gICAgUGlrYWRheS5wcm90b3R5cGUgPSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uZmlndXJlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICovXG4gICAgICAgIGNvbmZpZzogZnVuY3Rpb24ob3B0aW9ucylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGV4dGVuZCh0aGlzLl9vLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEhb3B0cy5pc1JUTDtcblxuICAgICAgICAgICAgb3B0cy5maWVsZCA9IChvcHRzLmZpZWxkICYmIG9wdHMuZmllbGQubm9kZU5hbWUpID8gb3B0cy5maWVsZCA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMudGhlbWUgPSAodHlwZW9mIG9wdHMudGhlbWUpID09PSAnc3RyaW5nJyAmJiBvcHRzLnRoZW1lID8gb3B0cy50aGVtZSA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMuYm91bmQgPSAhIShvcHRzLmJvdW5kICE9PSB1bmRlZmluZWQgPyBvcHRzLmZpZWxkICYmIG9wdHMuYm91bmQgOiBvcHRzLmZpZWxkKTtcblxuICAgICAgICAgICAgb3B0cy50cmlnZ2VyID0gKG9wdHMudHJpZ2dlciAmJiBvcHRzLnRyaWdnZXIubm9kZU5hbWUpID8gb3B0cy50cmlnZ2VyIDogb3B0cy5maWVsZDtcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlV2Vla2VuZHMgPSAhIW9wdHMuZGlzYWJsZVdlZWtlbmRzO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVEYXlGbiA9ICh0eXBlb2Ygb3B0cy5kaXNhYmxlRGF5Rm4pID09PSAnZnVuY3Rpb24nID8gb3B0cy5kaXNhYmxlRGF5Rm4gOiBudWxsO1xuXG4gICAgICAgICAgICB2YXIgbm9tID0gcGFyc2VJbnQob3B0cy5udW1iZXJPZk1vbnRocywgMTApIHx8IDE7XG4gICAgICAgICAgICBvcHRzLm51bWJlck9mTW9udGhzID0gbm9tID4gNCA/IDQgOiBub207XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob3B0cy5taW5EYXRlICYmIG9wdHMubWF4RGF0ZSkgJiYgb3B0cy5tYXhEYXRlIDwgb3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYXRlKG9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhEYXRlKG9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFjayA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzBdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMF0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVsxXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzFdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gTWF0aC5hYnMocGFyc2VJbnQob3B0cy55ZWFyUmFuZ2UsIDEwKSkgfHwgZGVmYXVsdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnllYXJSYW5nZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAodXNpbmcgTW9tZW50LmpzIGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLl9vLmZvcm1hdDtcbiAgICAgICAgICAgIGlmICghaXNEYXRlKHRoaXMuX2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX28udG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX28udG9TdHJpbmcodGhpcy5fZCwgZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNNb21lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLl9kKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBNb21lbnQuanMgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9tZW50OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGZyb20gYSBNb21lbnQuanMgb2JqZWN0IChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNb21lbnQ6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBtb21lbnQuaXNNb21lbnQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZS50b0RhdGUoKSwgcHJldmVudE9uU2VsZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgRGF0ZSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBnZXREYXRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpc0RhdGUodGhpcy5fZCkgPyBuZXcgRGF0ZSh0aGlzLl9kLmdldFRpbWUoKSkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtaW4gPSB0aGlzLl9vLm1pbkRhdGUsXG4gICAgICAgICAgICAgICAgbWF4ID0gdGhpcy5fby5tYXhEYXRlO1xuXG4gICAgICAgICAgICBpZiAoaXNEYXRlKG1pbikgJiYgZGF0ZSA8IG1pbikge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtaW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShtYXgpICYmIGRhdGUgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWF4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHRoaXMuX2QpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLl9kKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwcmV2ZW50T25TZWxlY3QgJiYgdHlwZW9mIHRoaXMuX28ub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXREYXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9EYXRlOiBmdW5jdGlvbihkYXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmV3Q2FsZW5kYXIgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1swXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlRGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZW5kIG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXRNb250aChsYXN0VmlzaWJsZURhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0RGF0ZShsYXN0VmlzaWJsZURhdGUuZ2V0RGF0ZSgpLTEpO1xuICAgICAgICAgICAgICAgIG5ld0NhbGVuZGFyID0gKHZpc2libGVEYXRlIDwgZmlyc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgfHwgbGFzdFZpc2libGVEYXRlLmdldFRpbWUoKSA8IHZpc2libGVEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5tYWluQ2FsZW5kYXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKz0gMSAtIHRoaXMuX28ubnVtYmVyT2ZNb250aHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdERhdGU6IGZ1bmN0aW9uKHNpZ24sIGRheXMpIHtcblxuICAgICAgICAgICAgdmFyIGRheSA9IHRoaXMuZ2V0RGF0ZSgpIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHBhcnNlSW50KGRheXMpKjI0KjYwKjYwKjEwMDA7XG5cbiAgICAgICAgICAgIHZhciBuZXdEYXk7XG5cbiAgICAgICAgICAgIGlmIChzaWduID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJ3N1YnRyYWN0Jykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXREYXRlKG5ld0RheSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0Q2FsZW5kYXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdID0gYWRqdXN0Q2FsZW5kYXIodGhpcy5jYWxlbmRhcnNbMF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDE7IGMgPCB0aGlzLl9vLm51bWJlck9mTW9udGhzOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1tjXSA9IGFkanVzdENhbGVuZGFyKHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoICsgYyxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogdGhpcy5jYWxlbmRhcnNbMF0ueWVhclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvZGF5OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ290b0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgbW9udGggKHplcm8taW5kZXgsIGUuZy4gMDogSmFudWFyeSlcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9Nb250aDogZnVuY3Rpb24obW9udGgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dE1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoKys7XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHByZXZNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aC0tO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBmdWxsIHllYXIgKGUuZy4gXCIyMDEyXCIpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvWWVhcjogZnVuY3Rpb24oeWVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTih5ZWFyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLnllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtaW5EYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNaW5EYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5taW5EYXRlID0gZGVmYXVsdHMubWluRGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pblllYXIgID0gZGVmYXVsdHMubWluWWVhcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbk1vbnRoID0gZGVmYXVsdHMubWluTW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5zdGFydFJhbmdlID0gZGVmYXVsdHMuc3RhcnRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWF4RGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWF4RGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhZZWFyID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heE1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhEYXRlID0gZGVmYXVsdHMubWF4RGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSBkZWZhdWx0cy5tYXhZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSBkZWZhdWx0cy5tYXhNb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmVuZFJhbmdlID0gZGVmYXVsdHMuZW5kUmFuZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFN0YXJ0UmFuZ2U6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRFbmRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVmcmVzaCB0aGUgSFRNTFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhdzogZnVuY3Rpb24oZm9yY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdiAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbWluWWVhciA9IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgICAgICBtYXhZZWFyID0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgICAgIG1pbk1vbnRoID0gb3B0cy5taW5Nb250aCxcbiAgICAgICAgICAgICAgICBtYXhNb250aCA9IG9wdHMubWF4TW9udGgsXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIHJhbmRJZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPD0gbWluWWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtaW5ZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWluTW9udGgpICYmIHRoaXMuX20gPCBtaW5Nb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWluTW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3kgPj0gbWF4WWVhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBtYXhZZWFyO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obWF4TW9udGgpICYmIHRoaXMuX20gPiBtYXhNb250aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tID0gbWF4TW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5kSWQgPSAncGlrYS10aXRsZS0nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZSgvW15hLXpdKy9nLCAnJykuc3Vic3RyKDAsIDIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9wdHMubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJwaWthLWxlbmRhclwiPicgKyByZW5kZXJUaXRsZSh0aGlzLCBjLCB0aGlzLmNhbGVuZGFyc1tjXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1tjXS5tb250aCwgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciwgcmFuZElkKSArIHRoaXMucmVuZGVyKHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCByYW5kSWQpICsgJzwvZGl2Pic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRzLmZpZWxkLnR5cGUgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbkRyYXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uRHJhdyh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGhlIHNjcmVlbiByZWFkZXIgdXNlciBrbm93IHRvIHVzZSBhcnJvdyBrZXlzXG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVXNlIHRoZSBhcnJvdyBrZXlzIHRvIHBpY2sgYSBkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0UG9zaXRpb246IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZpZWxkLCBwRWwsIHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBzY3JvbGxUb3AsIGxlZnQsIHRvcCwgY2xpZW50UmVjdDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICAgICAgICBmaWVsZCA9IHRoaXMuX28udHJpZ2dlcjtcbiAgICAgICAgICAgIHBFbCA9IGZpZWxkO1xuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNsaWVudFJlY3QgPSBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gY2xpZW50UmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHRvcCA9IGNsaWVudFJlY3QuYm90dG9tICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgdG9wICA9IHBFbC5vZmZzZXRUb3AgKyBwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdoaWxlKChwRWwgPSBwRWwub2Zmc2V0UGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ICs9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgICs9IHBFbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHBvc2l0aW9uIGlzIGJvdHRvbSAmIGxlZnRcbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIGxlZnQgKyB3aWR0aCA+IHZpZXdwb3J0V2lkdGgpIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX28ucmVwb3NpdGlvbiAmJiB0b3AgKyBoZWlnaHQgPiB2aWV3cG9ydEhlaWdodCArIHNjcm9sbFRvcCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigndG9wJykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQgPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVuZGVyIEhUTUwgZm9yIGEgcGFydGljdWxhciBtb250aFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgcmFuZElkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0cyAgID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBub3cgICAgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheXMgICA9IGdldERheXNJbk1vbnRoKHllYXIsIG1vbnRoKSxcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgZGF0YSAgID0gW10sXG4gICAgICAgICAgICAgICAgcm93ICAgID0gW107XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkobm93KTtcbiAgICAgICAgICAgIGlmIChvcHRzLmZpcnN0RGF5ID4gMCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSAtPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICAgICAgICAgIGlmIChiZWZvcmUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZSArPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcmV2aW91c01vbnRoID0gbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gMSxcbiAgICAgICAgICAgICAgICBuZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyAxLFxuICAgICAgICAgICAgICAgIHllYXJPZlByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IHllYXIgLSAxIDogeWVhcixcbiAgICAgICAgICAgICAgICB5ZWFyT2ZOZXh0TW9udGggPSBtb250aCA9PT0gMTEgPyB5ZWFyICsgMSA6IHllYXIsXG4gICAgICAgICAgICAgICAgZGF5c0luUHJldmlvdXNNb250aCA9IGdldERheXNJbk1vbnRoKHllYXJPZlByZXZpb3VzTW9udGgsIHByZXZpb3VzTW9udGgpO1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gZGF5cyArIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlciA9IGNlbGxzO1xuICAgICAgICAgICAgd2hpbGUoYWZ0ZXIgPiA3KSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgLT0gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGxzICs9IDcgLSBhZnRlcjtcbiAgICAgICAgICAgIHZhciBpc1dlZWtTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHIgPSAwOyBpIDwgY2VsbHM7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEgKyAoaSAtIGJlZm9yZSkpLFxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gaXNEYXRlKHRoaXMuX2QpID8gY29tcGFyZURhdGVzKGRheSwgdGhpcy5fZCkgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA9IGNvbXBhcmVEYXRlcyhkYXksIG5vdyksXG4gICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50ID0gb3B0cy5ldmVudHMuaW5kZXhPZihkYXkudG9EYXRlU3RyaW5nKCkpICE9PSAtMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eSA9IGkgPCBiZWZvcmUgfHwgaSA+PSAoZGF5cyArIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IDEgKyAoaSAtIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyLFxuICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuc3RhcnRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZSA9IG9wdHMuZW5kUmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuZW5kUmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBvcHRzLmVuZFJhbmdlICYmIG9wdHMuc3RhcnRSYW5nZSA8IGRheSAmJiBkYXkgPCBvcHRzLmVuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gKG9wdHMubWluRGF0ZSAmJiBkYXkgPCBvcHRzLm1pbkRhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5tYXhEYXRlICYmIGRheSA+IG9wdHMubWF4RGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVXZWVrZW5kcyAmJiBpc1dlZWtlbmQoZGF5KSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVEYXlGbiAmJiBvcHRzLmRpc2FibGVEYXlGbihkYXkpKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlzSW5QcmV2aW91c01vbnRoICsgZGF5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBwcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZlByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlOdW1iZXIgLSBkYXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBuZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mTmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRheUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogZGF5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogeWVhck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50OiBoYXNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5OiBpc1RvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2U6IGlzU3RhcnRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2U6IGlzRW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRocyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdGlvbkRheXNJbk5leHRBbmRQcmV2aW91c01vbnRoczogb3B0cy5lbmFibGVTZWxlY3Rpb25EYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHNcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLnBpY2tXaG9sZVdlZWsgJiYgaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpc1dlZWtTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm93LnB1c2gocmVuZGVyRGF5KGRheUNvbmZpZykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCsrciA9PT0gNykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQocmVuZGVyV2VlayhpIC0gYmVmb3JlLCBtb250aCwgeWVhcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChyZW5kZXJSb3cocm93LCBvcHRzLmlzUlRMLCBvcHRzLnBpY2tXaG9sZVdlZWssIGlzV2Vla1NlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaXNXZWVrU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyVGFibGUob3B0cywgZGF0YSwgcmFuZElkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1Zpc2libGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Y7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbk9wZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3Y7XG4gICAgICAgICAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJzsgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0aGlzLl9vLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHQU1FIE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vO1xuXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAndG91Y2hlbmQnLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG9wdHMua2V5Ym9hcmRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5Q2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy5maWVsZCwgJ2NoYW5nZScsIHRoaXMuX29uSW5wdXRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KG9wdHMudHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCB0aGlzLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gUGlrYWRheTtcbn0pKTtcbiJdfQ==
