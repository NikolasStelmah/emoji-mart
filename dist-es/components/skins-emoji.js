import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../polyfills/createClass";
import _possibleConstructorReturn from "../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../polyfills/objectGetPrototypeOf";
import _inherits from "../polyfills/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { NimbleEmoji, Skins } from '.';

var SkinsEmoji =
/*#__PURE__*/
function (_Skins) {
  _inherits(SkinsEmoji, _Skins);

  function SkinsEmoji(props) {
    var _this;

    _classCallCheck(this, SkinsEmoji);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SkinsEmoji).call(this, props));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SkinsEmoji, [{
    key: "render",
    value: function render() {
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
        skinToneNodes.push(React.createElement("span", {
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch custom".concat(selected ? ' selected' : '')
        }, React.createElement("span", {
          onClick: this.handleClick,
          "data-skin": skinTone,
          className: "emoji-mart-skin-tone-".concat(skinTone)
        }, NimbleEmoji({
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

      return React.createElement("div", {
        className: "emoji-mart-skin-swatches custom".concat(opened ? ' opened' : '')
      }, React.createElement("div", {
        className: "emoji-mart-skin-text".concat(opened ? ' opened' : '')
      }, i18n.skintext), skinToneNodes);
    }
  }]);

  return SkinsEmoji;
}(Skins);

export { SkinsEmoji as default };
SkinsEmoji.propTypes = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  emojiProps: PropTypes.object.isRequired,
  skinTone: PropTypes.number,
  skinEmoji: PropTypes.string.isRequired,
  i18n: PropTypes.object
};
SkinsEmoji.defaultProps = {
  onChange: function onChange() {},
  skinTone: null
};