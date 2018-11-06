"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

var NotFound =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(NotFound, _React$PureComponent);

  function NotFound() {
    (0, _classCallCheck2.default)(this, NotFound);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotFound).apply(this, arguments));
  }

  (0, _createClass2.default)(NotFound, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          emojiProps = _this$props.emojiProps,
          i18n = _this$props.i18n,
          notFound = _this$props.notFound,
          notFoundEmoji = _this$props.notFoundEmoji;

      var component = notFound && notFound() || _react.default.createElement("div", {
        className: "emoji-mart-no-results"
      }, (0, _.NimbleEmoji)((0, _objectSpread2.default)({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })), _react.default.createElement("div", {
        className: "emoji-mart-no-results-label"
      }, i18n.notfound));

      return component;
    }
  }]);
  return NotFound;
}(_react.default.PureComponent);

exports.default = NotFound;