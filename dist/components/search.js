"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _svgs = require("../svgs");

var _nimbleEmojiIndex = _interopRequireDefault(require("../utils/emoji-index/nimble-emoji-index"));

class Search extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: _svgs.search.search,
      isSearching: false
    };
    this.data = props.data;
    this.emojiIndex = new _nimbleEmojiIndex.default(this.data);
    this.setRef = this.setRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  search(value) {
    if (value == '') this.setState({
      icon: _svgs.search.search,
      isSearching: false
    });else this.setState({
      icon: _svgs.search.delete,
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

  clear() {
    if (this.input.value == '') return;
    this.input.value = '';
    this.search('');
  }

  handleChange() {
    this.search(this.input.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.clear();
    }
  }

  setRef(c) {
    this.input = c;
  }

  render() {
    var _this$props = this.props,
        i18n = _this$props.i18n,
        autoFocus = _this$props.autoFocus;
    var _this$state = this.state,
        icon = _this$state.icon,
        isSearching = _this$state.isSearching;
    return _react.default.createElement("div", {
      className: "emoji-mart-search"
    }, _react.default.createElement("input", {
      ref: this.setRef,
      type: "text",
      onChange: this.handleChange,
      placeholder: i18n.search,
      autoFocus: autoFocus
    }), _react.default.createElement("button", {
      className: "emoji-mart-search-icon",
      onClick: this.clear,
      onKeyUp: this.handleKeyUp,
      disabled: !isSearching
    }, icon()));
  }

}

exports.default = Search;
Search.defaultProps = {
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};