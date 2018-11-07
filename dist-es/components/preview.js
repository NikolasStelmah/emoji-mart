import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import PropTypes from 'prop-types';
import { getData } from "../utils";
import { NimbleEmoji, SkinsEmoji, SkinsDot } from '.';
export default class Preview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.state = {
      emoji: null
    };
  }

  render() {
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

}
Preview.defaultProps = {
  showSkinTones: true,
  onChange: function onChange() {}
};