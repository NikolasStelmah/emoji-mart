"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Object = Object;

var _default = _Object.getPrototypeOf || function (O) {
  O = Object(O);

  if (typeof O.constructor === 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? Object.prototype : null;
};

exports.default = _default;