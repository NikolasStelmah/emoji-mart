"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frequently = _interopRequireDefault(require("../utils/frequently"));

var _utils = require("../utils");

var _ = require(".");

class Category extends _react.default.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.setContainerRef = this.setContainerRef.bind(this);
    this.setLabelRef = this.setLabelRef.bind(this);
  }

  componentDidMount() {
    this.parent = this.container.parentNode;
    this.margin = 0;
    this.minMargin = 0;
    this.memoizeSize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    var _this$props = this.props,
        name = _this$props.name,
        perLine = _this$props.perLine,
        native = _this$props.native,
        hasStickyPosition = _this$props.hasStickyPosition,
        emojis = _this$props.emojis,
        emojiProps = _this$props.emojiProps,
        skin = emojiProps.skin,
        size = emojiProps.size,
        set = emojiProps.set,
        nextPerLine = nextProps.perLine,
        nextNative = nextProps.native,
        nextHasStickyPosition = nextProps.hasStickyPosition,
        nextEmojis = nextProps.emojis,
        nextEmojiProps = nextProps.emojiProps,
        nextSkin = nextEmojiProps.skin,
        nextSize = nextEmojiProps.size,
        nextSet = nextEmojiProps.set,
        shouldUpdate = false;

    if (name == 'Recent' && perLine != nextPerLine) {
      shouldUpdate = true;
    }

    if (name == 'Search') {
      shouldUpdate = !(emojis == nextEmojis);
    }

    if (skin != nextSkin || size != nextSize || native != nextNative || set != nextSet || hasStickyPosition != nextHasStickyPosition) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  memoizeSize() {
    var _this$container$getBo = this.container.getBoundingClientRect(),
        top = _this$container$getBo.top,
        height = _this$container$getBo.height;

    var _this$parent$getBound = this.parent.getBoundingClientRect(),
        parentTop = _this$parent$getBound.top;

    var _this$label$getBoundi = this.label.getBoundingClientRect(),
        labelHeight = _this$label$getBoundi.height;

    this.top = top - parentTop + this.parent.scrollTop;

    if (height == 0) {
      this.maxMargin = 0;
    } else {
      this.maxMargin = height - labelHeight;
    }
  }

  handleScroll(scrollTop) {
    var margin = scrollTop - this.top;
    margin = margin < this.minMargin ? this.minMargin : margin;
    margin = margin > this.maxMargin ? this.maxMargin : margin;
    if (margin == this.margin) return;

    if (!this.props.hasStickyPosition) {
      this.label.style.top = "".concat(margin, "px");
    }

    this.margin = margin;
    return true;
  }

  getEmojis() {
    var _this = this;

    var _this$props2 = this.props,
        name = _this$props2.name,
        emojis = _this$props2.emojis,
        recent = _this$props2.recent,
        perLine = _this$props2.perLine;

    if (name == 'Recent') {
      var custom = this.props.custom;

      var frequentlyUsed = recent || _frequently.default.get(perLine);

      if (frequentlyUsed.length) {
        emojis = frequentlyUsed.map(function (id) {
          var emoji = custom.filter(function (e) {
            return e.id === id;
          })[0];

          if (emoji) {
            return emoji;
          }

          return id;
        }).filter(function (id) {
          return !!(0, _utils.getData)(id, null, null, _this.data);
        });
      }

      if (emojis.length === 0 && frequentlyUsed.length > 0) {
        return null;
      }
    }

    if (emojis) {
      emojis = emojis.slice(0);
    }

    return emojis;
  }

  updateDisplay(display) {
    var emojis = this.getEmojis();

    if (!emojis) {
      return;
    }

    this.container.style.display = display;
  }

  setContainerRef(c) {
    this.container = c;
  }

  setLabelRef(c) {
    this.label = c;
  }

  render() {
    var _this2 = this;

    var _this$props3 = this.props,
        id = _this$props3.id,
        name = _this$props3.name,
        hasStickyPosition = _this$props3.hasStickyPosition,
        emojiProps = _this$props3.emojiProps,
        i18n = _this$props3.i18n,
        notFound = _this$props3.notFound,
        notFoundEmoji = _this$props3.notFoundEmoji,
        emojis = this.getEmojis(),
        labelStyles = {},
        labelSpanStyles = {},
        containerStyles = {};

    if (!emojis) {
      containerStyles = {
        display: 'none'
      };
    }

    if (!hasStickyPosition) {
      labelStyles = {
        height: 28
      };
      labelSpanStyles = {
        position: 'absolute'
      };
    }

    return _react.default.createElement("div", {
      ref: this.setContainerRef,
      className: "emoji-mart-category",
      style: containerStyles
    }, _react.default.createElement("div", {
      style: labelStyles,
      "data-name": name,
      className: "emoji-mart-category-label"
    }, _react.default.createElement("span", {
      style: labelSpanStyles,
      ref: this.setLabelRef
    }, i18n.categories[id])), emojis && emojis.map(function (emoji) {
      return (0, _.NimbleEmoji)((0, _objectSpread2.default)({
        emoji: emoji,
        data: _this2.data
      }, emojiProps));
    }), emojis && !emojis.length && _react.default.createElement(_.NotFound, {
      i18n: i18n,
      notFound: notFound,
      notFoundEmoji: notFoundEmoji,
      data: this.data,
      emojiProps: emojiProps
    }));
  }

}

exports.default = Category;
Category.defaultProps = {
  emojis: [],
  hasStickyPosition: true
};