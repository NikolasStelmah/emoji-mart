import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import data from "../../../data/all.json";
import NimbleEmoji from "./nimble-emoji";
import { EmojiPropTypes, EmojiDefaultProps } from "../../utils/shared-props";

var Emoji = function Emoji(props) {
  for (var k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return NimbleEmoji(_objectSpread({}, props));
};

Emoji.propTypes = EmojiPropTypes;
Emoji.defaultProps = _objectSpread({}, EmojiDefaultProps, {
  data: data
});
export default Emoji;