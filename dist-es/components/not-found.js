import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import PropTypes from 'prop-types';
import { NimbleEmoji } from '.';
export default class NotFound extends React.PureComponent {
  render() {
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

}