import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "../../polyfills/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../../polyfills/createClass";
import _possibleConstructorReturn from "../../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../../polyfills/objectGetPrototypeOf";
import _inherits from "../../polyfills/inherits";
import React from 'react';
import data from "../../../data/all.json";
import NimblePicker from "./nimble-picker";
import { PickerPropTypes, PickerDefaultProps } from "../../utils/shared-props";

var Picker =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Picker, _React$PureComponent);

  function Picker() {
    _classCallCheck(this, Picker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Picker).apply(this, arguments));
  }

  _createClass(Picker, [{
    key: "render",
    value: function render() {
      return React.createElement(NimblePicker, _extends({}, this.props, this.state));
    }
  }]);

  return Picker;
}(React.PureComponent);

export { Picker as default };
Picker.defaultProps = _objectSpread({}, PickerDefaultProps, {
  data: data
});