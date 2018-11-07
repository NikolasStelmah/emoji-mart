"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("../../polyfills/extends"));

var _react = _interopRequireDefault(require("react"));

var _all = _interopRequireDefault(require("../../../data/all.json"));

var _nimblePicker = _interopRequireDefault(require("./nimble-picker"));

var _sharedProps = require("../../utils/shared-props");

class Picker extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_nimblePicker.default, (0, _extends2.default)({}, this.props, this.state));
  }

}

exports.default = Picker;
Picker.defaultProps = (0, _objectSpread2.default)({}, _sharedProps.PickerDefaultProps, {
  data: _all.default
});