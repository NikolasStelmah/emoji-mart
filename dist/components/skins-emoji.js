"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

class SkinsEmoji extends _.Skins {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    var _this$props = this.props,
        skin = _this$props.skin,
        emojiProps = _this$props.emojiProps,
        data = _this$props.data,
        skinEmoji = _this$props.skinEmoji,
        i18n = _this$props.i18n;
    var opened = this.state.opened;
    var skinToneNodes = [];

    for (var skinTone = 1; skinTone <= 6; skinTone++) {
      var selected = skinTone === skin;
      skinToneNodes.push(_react.default.createElement("span", {
        key: "skin-tone-".concat(skinTone),
        className: "emoji-mart-skin-swatch custom".concat(selected ? ' selected' : '')
      }, _react.default.createElement("span", {
        onClick: this.handleClick,
        "data-skin": skinTone,
        className: "emoji-mart-skin-tone-".concat(skinTone)
      }, (0, _.NimbleEmoji)({
        emoji: skinEmoji,
        data: data,
        skin: skinTone,
        backgroundImageFn: emojiProps.backgroundImageFn,
        native: emojiProps.native,
        set: emojiProps.set,
        sheetSize: emojiProps.sheetSize,
        size: 23
      }))));
    }

    return _react.default.createElement("div", {
      className: "emoji-mart-skin-swatches custom".concat(opened ? ' opened' : '')
    }, _react.default.createElement("div", {
      className: "emoji-mart-skin-text".concat(opened ? ' opened' : '')
    }, i18n.skintext), skinToneNodes);
  }

}

exports.default = SkinsEmoji;
SkinsEmoji.propTypes = {
  onChange: _propTypes.default.func,
  skin: _propTypes.default.number.isRequired,
  emojiProps: _propTypes.default.object.isRequired,
  skinTone: _propTypes.default.number,
  skinEmoji: _propTypes.default.string.isRequired,
  i18n: _propTypes.default.object
};
SkinsEmoji.defaultProps = {
  onChange: function onChange() {},
  skinTone: null
};