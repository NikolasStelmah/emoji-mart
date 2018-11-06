"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _all = _interopRequireDefault(require("../../../data/all.json"));

var _nimblePicker = _interopRequireDefault(require("./nimble-picker"));

var _sharedProps = require("../../utils/shared-props");

var Picker =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Picker, _React$PureComponent);

  function Picker() {
    (0, _classCallCheck2.default)(this, Picker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Picker).apply(this, arguments));
  }

  (0, _createClass2.default)(Picker, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_nimblePicker.default, (0, _extends2.default)({}, this.props, this.state));
    }
  }]);
  return Picker;
}(_react.default.PureComponent);

exports.default = Picker;
Picker.defaultProps = (0, _objectSpread2.default)({}, _sharedProps.PickerDefaultProps, {
  data: _all.default
});