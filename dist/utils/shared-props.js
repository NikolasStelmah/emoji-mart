"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerDefaultProps = exports.PickerPropTypes = exports.EmojiDefaultProps = exports.EmojiPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var EmojiPropTypes = {
  data: _propTypes.default.object.isRequired,
  onOver: _propTypes.default.func,
  onLeave: _propTypes.default.func,
  onClick: _propTypes.default.func,
  fallback: _propTypes.default.func,
  backgroundImageFn: _propTypes.default.func,
  native: _propTypes.default.bool,
  forceSize: _propTypes.default.bool,
  tooltip: _propTypes.default.bool,
  skin: _propTypes.default.oneOf([1, 2, 3, 4, 5, 6]),
  sheetSize: _propTypes.default.oneOf([16, 20, 32, 64]),
  sheetColumns: _propTypes.default.number,
  sheetRows: _propTypes.default.number,
  set: _propTypes.default.oneOf(['apple', 'google', 'twitter', 'emojione', 'messenger', 'facebook']),
  size: _propTypes.default.number.isRequired,
  emoji: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired
};
exports.EmojiPropTypes = EmojiPropTypes;
var EmojiDefaultProps = {
  skin: 1,
  set: 'apple',
  sheetSize: 64,
  sheetColumns: 52,
  sheetRows: 52,
  native: false,
  forceSize: false,
  tooltip: false,
  backgroundImageFn: function backgroundImageFn(set, sheetSize) {
    return "https://unpkg.com/emoji-datasource-".concat(set, "@").concat("4.0.4", "/img/").concat(set, "/sheets-256/").concat(sheetSize, ".png");
  },
  onOver: function onOver() {},
  onLeave: function onLeave() {},
  onClick: function onClick() {}
};
exports.EmojiDefaultProps = EmojiDefaultProps;
var PickerPropTypes = {
  onClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onSkinChange: _propTypes.default.func,
  perLine: _propTypes.default.number,
  emojiSize: _propTypes.default.number,
  i18n: _propTypes.default.object,
  style: _propTypes.default.object,
  title: _propTypes.default.string,
  emoji: _propTypes.default.string,
  color: _propTypes.default.string,
  set: EmojiPropTypes.set,
  skin: EmojiPropTypes.skin,
  native: _propTypes.default.bool,
  backgroundImageFn: EmojiPropTypes.backgroundImageFn,
  sheetSize: EmojiPropTypes.sheetSize,
  emojisToShowFilter: _propTypes.default.func,
  showPreview: _propTypes.default.bool,
  showSkinTones: _propTypes.default.bool,
  emojiTooltip: EmojiPropTypes.tooltip,
  include: _propTypes.default.arrayOf(_propTypes.default.string),
  exclude: _propTypes.default.arrayOf(_propTypes.default.string),
  recent: _propTypes.default.arrayOf(_propTypes.default.string),
  autoFocus: _propTypes.default.bool,
  custom: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    short_names: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    emoticons: _propTypes.default.arrayOf(_propTypes.default.string),
    keywords: _propTypes.default.arrayOf(_propTypes.default.string),
    imageUrl: _propTypes.default.string.isRequired
  })),
  skinEmoji: _propTypes.default.string,
  notFound: _propTypes.default.func,
  notFoundEmoji: _propTypes.default.string,
  icons: _propTypes.default.object
};
exports.PickerPropTypes = PickerPropTypes;
var PickerDefaultProps = {
  onClick: function onClick() {},
  onSelect: function onSelect() {},
  onSkinChange: function onSkinChange() {},
  emojiSize: 24,
  perLine: 9,
  i18n: {},
  style: {},
  title: 'Emoji Mart™',
  emoji: 'department_store',
  color: '#ae65c5',
  set: EmojiDefaultProps.set,
  skin: null,
  defaultSkin: EmojiDefaultProps.skin,
  native: EmojiDefaultProps.native,
  sheetSize: EmojiDefaultProps.sheetSize,
  backgroundImageFn: EmojiDefaultProps.backgroundImageFn,
  emojisToShowFilter: null,
  showPreview: true,
  showSkinTones: true,
  emojiTooltip: EmojiDefaultProps.tooltip,
  autoFocus: false,
  custom: [],
  skinEmoji: '',
  notFound: function notFound() {},
  notFoundEmoji: 'sleuth_or_spy',
  icons: {}
};
exports.PickerDefaultProps = PickerDefaultProps;