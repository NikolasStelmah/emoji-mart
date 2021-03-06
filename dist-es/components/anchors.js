import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../polyfills/createClass";
import _possibleConstructorReturn from "../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../polyfills/objectGetPrototypeOf";
import _inherits from "../polyfills/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';

var Anchors =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Anchors, _React$PureComponent);

  function Anchors(props) {
    var _this;

    _classCallCheck(this, Anchors);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Anchors).call(this, props));
    var defaultCategory = props.categories.filter(function (category) {
      return category.first;
    })[0];
    _this.state = {
      selected: defaultCategory.name
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Anchors, [{
    key: "handleClick",
    value: function handleClick(e) {
      var index = e.currentTarget.getAttribute('data-index');
      var _this$props = this.props,
          categories = _this$props.categories,
          onAnchorClick = _this$props.onAnchorClick;
      onAnchorClick(categories[index], index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
          onClick: _this2.handleClick,
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
  }]);

  return Anchors;
}(React.PureComponent);

export { Anchors as default };
Anchors.defaultProps = {
  categories: [],
  onAnchorClick: function onAnchorClick() {},
  icons: {}
};