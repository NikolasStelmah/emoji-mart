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

var _utils = require("../utils");

var _ = require(".");

var Preview =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Preview, _React$PureComponent);

  function Preview(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Preview);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Preview).call(this, props));
    _this.data = props.data;
    _this.state = {
      emoji: null
    };
    return _this;
  }

  (0, _createClass2.default)(Preview, [{
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
        var emojiData = (0, _utils.getData)(emoji, null, null, this.data),
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
        return _react.default.createElement("div", {
          className: "emoji-mart-preview"
        }, _react.default.createElement("div", {
          className: "emoji-mart-preview-emoji"
        }, (0, _.NimbleEmoji)((0, _objectSpread2.default)({
          key: emoji.id,
          emoji: emoji,
          data: this.data
        }, emojiProps))), _react.default.createElement("div", {
          className: "emoji-mart-preview-data"
        }, _react.default.createElement("div", {
          className: "emoji-mart-preview-name"
        }, emoji.name), _react.default.createElement("div", {
          className: "emoji-mart-preview-shortnames"
        }, emojiData.short_names.map(function (short_name) {
          return _react.default.createElement("span", {
            key: short_name,
            className: "emoji-mart-preview-shortname"
          }, ":", short_name, ":");
        })), _react.default.createElement("div", {
          className: "emoji-mart-preview-emoticons"
        }, listedEmoticons.map(function (emoticon) {
          return _react.default.createElement("span", {
            key: emoticon,
            className: "emoji-mart-preview-emoticon"
          }, emoticon);
        }))));
      } else {
        return _react.default.createElement("div", {
          className: "emoji-mart-preview"
        }, _react.default.createElement("div", {
          className: "emoji-mart-preview-emoji"
        }, idleEmoji && idleEmoji.length && (0, _.NimbleEmoji)((0, _objectSpread2.default)({
          emoji: idleEmoji,
          data: this.data
        }, emojiProps))), _react.default.createElement("div", {
          className: "emoji-mart-preview-data"
        }, _react.default.createElement("span", {
          className: "emoji-mart-title-label"
        }, title)), showSkinTones && _react.default.createElement("div", {
          className: "emoji-mart-preview-skins".concat(skinsProps.skinEmoji ? ' custom' : '')
        }, skinsProps.skinEmoji ? _react.default.createElement(_.SkinsEmoji, {
          skin: skinsProps.skin,
          emojiProps: emojiProps,
          data: this.data,
          skinEmoji: skinsProps.skinEmoji,
          i18n: i18n,
          onChange: skinsProps.onChange
        }) : _react.default.createElement(_.SkinsDot, {
          skin: skinsProps.skin,
          i18n: i18n,
          onChange: skinsProps.onChange
        })));
      }
    }
  }]);
  return Preview;
}(_react.default.PureComponent);

exports.default = Preview;
Preview.defaultProps = {
  showSkinTones: true,
  onChange: function onChange() {}
};