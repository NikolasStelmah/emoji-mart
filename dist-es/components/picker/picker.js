import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "../../polyfills/extends";
import React from 'react';
import data from "../../../data/all.json";
import NimblePicker from "./nimble-picker";
import { PickerPropTypes, PickerDefaultProps } from "../../utils/shared-props";
export default class Picker extends React.PureComponent {
  render() {
    return React.createElement(NimblePicker, _extends({}, this.props, this.state));
  }

}
Picker.defaultProps = _objectSpread({}, PickerDefaultProps, {
  data: data
});