"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

class NotFound extends _react.default.PureComponent {
  render() {
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

}

exports.default = NotFound;