"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

class SkinsDot extends _.Skins {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    var _this$props = this.props,
        skin = _this$props.skin,
        i18n = _this$props.i18n;
    var opened = this.state.opened;
    var skinToneNodes = [];

    for (var skinTone = 1; skinTone <= 6; skinTone++) {
      var selected = skinTone === skin;
      skinToneNodes.push(_react.default.createElement("span", {
        key: "skin-tone-".concat(skinTone),
        className: "emoji-mart-skin-swatch".concat(selected ? ' selected' : '')
      }, _react.default.createElement("span", {
        onClick: this.handleClick,
        "data-skin": skinTone,
        className: "emoji-mart-skin emoji-mart-skin-tone-".concat(skinTone)
      })));
    }

    return _react.default.createElement("div", {
      className: "emoji-mart-skin-swatches".concat(opened ? ' opened' : '')
    }, skinToneNodes);
  }

}

exports.default = SkinsDot;
SkinsDot.propTypes = {
  onChange: _propTypes.default.func,
  skin: _propTypes.default.number.isRequired,
  i18n: _propTypes.default.object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};