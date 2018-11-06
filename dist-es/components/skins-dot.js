import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { Skins } from '.';

var SkinsDot =
/*#__PURE__*/
function (_Skins) {
  _inherits(SkinsDot, _Skins);

  function SkinsDot(props) {
    var _this;

    _classCallCheck(this, SkinsDot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SkinsDot).call(this, props));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SkinsDot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          skin = _this$props.skin,
          i18n = _this$props.i18n;
      var opened = this.state.opened;
      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        skinToneNodes.push(React.createElement("span", {
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch".concat(selected ? ' selected' : '')
        }, React.createElement("span", {
          onClick: this.handleClick,
          "data-skin": skinTone,
          className: "emoji-mart-skin emoji-mart-skin-tone-".concat(skinTone)
        })));
      }

      return React.createElement("div", {
        className: "emoji-mart-skin-swatches".concat(opened ? ' opened' : '')
      }, skinToneNodes);
    }
  }]);

  return SkinsDot;
}(Skins);

export { SkinsDot as default };
SkinsDot.propTypes = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};