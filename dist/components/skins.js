"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("../polyfills/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("../polyfills/possibleConstructorReturn"));

var _objectGetPrototypeOf = _interopRequireDefault(require("../polyfills/objectGetPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("../polyfills/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require(".");

var Skins =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Skins, _React$PureComponent);

  function Skins(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Skins);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _objectGetPrototypeOf.default)(Skins).call(this, props));
    _this.state = {
      opened: false
    };
    return _this;
  }

  (0, _createClass2.default)(Skins, [{
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
}(_react.default.PureComponent);

exports.default = Skins;
Skins.defaultProps = {
  onChange: function onChange() {}
};