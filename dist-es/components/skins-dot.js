import React from 'react';
import PropTypes from 'prop-types';
import { Skins } from '.';
export default class SkinsDot extends Skins {
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

}
SkinsDot.propTypes = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};