"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

class Skins extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  handleClick(e) {
    var skin = parseInt(e.currentTarget.getAttribute('data-skin'));
    var onChange = this.props.onChange;

    if (!this.state.opened) {
      this.setState({
        opened: true
      });
    } else {
      this.setState({
        opened: false
      });

      if (skin != this.props.skin) {
        onChange(skin);
      }
    }
  }

  render() {
    return null;
  }

}

exports.default = Skins;
Skins.defaultProps = {
  onChange: function onChange() {}
};