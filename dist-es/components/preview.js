import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import { getData } from '../utils';
import { NimbleEmoji, SkinsEmoji, SkinsDot } from '.';

var Preview =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Preview, _React$PureComponent);

  function Preview(props) {
    var _this;

    _classCallCheck(this, Preview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Preview).call(this, props));
    _this.data = props.data;
    _this.state = {
      emoji: null
    };
    return _this;
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var emoji = this.state.emoji,
          _this$props = this.props,
          emojiProps = _this$props.emojiProps,
          skinsProps = _this$props.skinsProps,
          showSkinTones = _this$props.showSkinTones,
          title = _this$props.title,
          idleEmoji = _this$props.emoji,
          i18n = _this$props.i18n;

      if (emoji) {
        var emojiData = getData(emoji, null, null, this.data),
            _emojiData$emoticons = emojiData.emoticons,
            emoticons = _emojiData$emoticons === void 0 ? [] : _emojiData$emoticons,
            knownEmoticons = [],
            listedEmoticons = [];
        emoticons.forEach(function (emoticon) {
          if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
            return;
          }

          knownEmoticons.push(emoticon.toLowerCase());
          listedEmoticons.push(emoticon);
        });
        return React.createElement("div", {
          className: "emoji-mart-preview"
        }, React.createElement("div", {
          className: "emoji-mart-preview-emoji"
        }, NimbleEmoji(_objectSpread({
          key: emoji.id,
          emoji: emoji,
          data: this.data
        }, emojiProps))), React.createElement("div", {
          className: "emoji-mart-preview-data"
        }, React.createElement("div", {
          className: "emoji-mart-preview-name"
        }, emoji.name), React.createElement("div", {
          className: "emoji-mart-preview-shortnames"
        }, emojiData.short_names.map(function (short_name) {
          return React.createElement("span", {
            key: short_name,
            className: "emoji-mart-preview-shortname"
          }, ":", short_name, ":");
        })), React.createElement("div", {
          className: "emoji-mart-preview-emoticons"
        }, listedEmoticons.map(function (emoticon) {
          return React.createElement("span", {
            key: emoticon,
            className: "emoji-mart-preview-emoticon"
          }, emoticon);
        }))));
      } else {
        return React.createElement("div", {
          className: "emoji-mart-preview"
        }, React.createElement("div", {
          className: "emoji-mart-preview-emoji"
        }, idleEmoji && idleEmoji.length && NimbleEmoji(_objectSpread({
          emoji: idleEmoji,
          data: this.data
        }, emojiProps))), React.createElement("div", {
          className: "emoji-mart-preview-data"
        }, React.createElement("span", {
          className: "emoji-mart-title-label"
        }, title)), showSkinTones && React.createElement("div", {
          className: "emoji-mart-preview-skins".concat(skinsProps.skinEmoji ? ' custom' : '')
        }, skinsProps.skinEmoji ? React.createElement(SkinsEmoji, {
          skin: skinsProps.skin,
          emojiProps: emojiProps,
          data: this.data,
          skinEmoji: skinsProps.skinEmoji,
          i18n: i18n,
          onChange: skinsProps.onChange
        }) : React.createElement(SkinsDot, {
          skin: skinsProps.skin,
          i18n: i18n,
          onChange: skinsProps.onChange
        })));
      }
    }
  }]);

  return Preview;
}(React.PureComponent);

export { Preview as default };
Preview.defaultProps = {
  showSkinTones: true,
  onChange: function onChange() {}
};