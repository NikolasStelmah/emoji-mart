import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../polyfills/createClass";
import _possibleConstructorReturn from "../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../polyfills/objectGetPrototypeOf";
import _inherits from "../polyfills/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import { NimbleEmoji } from '.';

var NotFound =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(NotFound, _React$PureComponent);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotFound).apply(this, arguments));
  }

  _createClass(NotFound, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          emojiProps = _this$props.emojiProps,
          i18n = _this$props.i18n,
          notFound = _this$props.notFound,
          notFoundEmoji = _this$props.notFoundEmoji;
      var component = notFound && notFound() || React.createElement("div", {
        className: "emoji-mart-no-results"
      }, NimbleEmoji(_objectSpread({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })), React.createElement("div", {
        className: "emoji-mart-no-results-label"
      }, i18n.notfound));
      return component;
    }
  }]);

  return NotFound;
}(React.PureComponent);

export { NotFound as default };