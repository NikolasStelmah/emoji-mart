import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "../polyfills/createClass";
import _possibleConstructorReturn from "../polyfills/possibleConstructorReturn";
import _getPrototypeOf from "../polyfills/objectGetPrototypeOf";
import _inherits from "../polyfills/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { search as icons } from "../svgs";
import NimbleEmojiIndex from "../utils/emoji-index/nimble-emoji-index";

var Search =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Search, _React$PureComponent);

  function Search(props) {
    var _this;

    _classCallCheck(this, Search);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Search).call(this, props));
    _this.state = {
      icon: icons.search,
      isSearching: false
    };
    _this.data = props.data;
    _this.emojiIndex = new NimbleEmojiIndex(_this.data);
    _this.setRef = _this.setRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clear = _this.clear.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Search, [{
    key: "search",
    value: function search(value) {
      if (value == '') this.setState({
        icon: icons.search,
        isSearching: false
      });else this.setState({
        icon: icons.delete,
        isSearching: true
      });
      this.props.onSearch(this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.input.value == '') return;
      this.input.value = '';
      this.search('');
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      this.search(this.input.value);
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.clear();
      }
    }
  }, {
    key: "setRef",
    value: function setRef(c) {
      this.input = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          i18n = _this$props.i18n,
          autoFocus = _this$props.autoFocus;
      var _this$state = this.state,
          icon = _this$state.icon,
          isSearching = _this$state.isSearching;
      return React.createElement("div", {
        className: "emoji-mart-search"
      }, React.createElement("input", {
        ref: this.setRef,
        type: "text",
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus
      }), React.createElement("button", {
        className: "emoji-mart-search-icon",
        onClick: this.clear,
        onKeyUp: this.handleKeyUp,
        disabled: !isSearching
      }, icon()));
    }
  }]);

  return Search;
}(React.PureComponent);

export { Search as default };
Search.defaultProps = {
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};