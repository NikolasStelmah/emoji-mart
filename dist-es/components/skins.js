import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../polyfills/createClass";
import _possibleConstructorReturn from "../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../polyfills/objectGetPrototypeOf";
import _inherits from "../polyfills/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import { NimbleEmoji } from '.';

var Skins =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Skins, _React$PureComponent);

  function Skins(props) {
    var _this;

    _classCallCheck(this, Skins);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Skins).call(this, props));
    _this.state = {
      opened: false
    };
    return _this;
  }

  _createClass(Skins, [{
    key: "handleClick",
    value: function handleClick(e) {
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
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Skins;
}(React.PureComponent);

export { Skins as default };
Skins.defaultProps = {
  onChange: function onChange() {}
};