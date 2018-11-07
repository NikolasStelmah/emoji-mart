import React from 'react';
import PropTypes from 'prop-types';
export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props);
    var defaultCategory = props.categories.filter(function (category) {
      return category.first;
    })[0];
    this.state = {
      selected: defaultCategory.name
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var index = e.currentTarget.getAttribute('data-index');
    var _this$props = this.props,
        categories = _this$props.categories,
        onAnchorClick = _this$props.onAnchorClick;
    onAnchorClick(categories[index], index);
  }

  render() {
    var _this = this;

    var _this$props2 = this.props,
        categories = _this$props2.categories,
        color = _this$props2.color,
        i18n = _this$props2.i18n,
        icons = _this$props2.icons,
        selected = this.state.selected;
    return React.createElement("div", {
      className: "emoji-mart-anchors"
    }, categories.map(function (category, i) {
      var id = category.id,
          name = category.name,
          anchor = category.anchor,
          isSelected = name == selected;

      if (anchor === false) {
        return null;
      }

      return React.createElement("span", {
        key: id,
        title: i18n.categories[id],
        "data-index": i,
        onClick: _this.handleClick,
        className: "emoji-mart-anchor ".concat(isSelected ? 'emoji-mart-anchor-selected' : ''),
        style: {
          color: isSelected ? color : null
        }
      }, React.createElement("div", {
        className: "emoji-mart-anchor-icon"
      }, icons.categories[id]()), React.createElement("span", {
        className: "emoji-mart-anchor-bar",
        style: {
          backgroundColor: color
        }
      }));
    }));
  }

}
Anchors.defaultProps = {
  categories: [],
  onAnchorClick: function onAnchorClick() {},
  icons: {}
};