"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _all = _interopRequireDefault(require("../../../data/all.json"));

var _nimbleEmoji = _interopRequireDefault(require("./nimble-emoji"));

var _sharedProps = require("../../utils/shared-props");

var Emoji = function Emoji(props) {
  for (var k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return (0, _nimbleEmoji.default)((0, _objectSpread2.default)({}, props));
};

Emoji.propTypes = _sharedProps.EmojiPropTypes;
Emoji.defaultProps = (0, _objectSpread2.default)({}, _sharedProps.EmojiDefaultProps, {
  data: _all.default
});
var _default = Emoji;
exports.default = _default;