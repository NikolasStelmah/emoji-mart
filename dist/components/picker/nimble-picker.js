"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("../../vendor/raf-polyfill");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var icons = _interopRequireWildcard(require("../../svgs"));

var _store = _interopRequireDefault(require("../../utils/store"));

var _frequently = _interopRequireDefault(require("../../utils/frequently"));

var _utils = require("../../utils");

var _data = require("../../utils/data");

var _sharedProps = require("../../utils/shared-props");

var _ = require("..");

var I18N = {
  search: 'Search',
  notfound: 'No Emoji Found',
  skintext: 'Choose your default skin tone',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  }
};

class NimblePicker extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.RECENT_CATEGORY = {
      id: 'recent',
      name: 'Recent',
      emojis: null
    };
    this.CUSTOM_CATEGORY = {
      id: 'custom',
      name: 'Custom',
      emojis: []
    };
    this.SEARCH_CATEGORY = {
      id: 'search',
      name: 'Search',
      emojis: null,
      anchor: false
    };

    if (props.data.compressed) {
      (0, _data.uncompress)(props.data);
    }

    this.data = props.data;
    this.i18n = (0, _utils.deepMerge)(I18N, props.i18n);
    this.icons = (0, _utils.deepMerge)(icons, props.icons);
    this.state = {
      skin: props.skin || _store.default.get('skin') || props.defaultSkin,
      firstRender: true
    };
    this.categories = [];
    var allCategories = [].concat(this.data.categories);

    if (props.custom.length > 0) {
      this.CUSTOM_CATEGORY.emojis = props.custom.map(function (emoji) {
        return (0, _objectSpread2.default)({}, emoji, {
          // `<Category />` expects emoji to have an `id`.
          id: emoji.short_names[0],
          custom: true
        });
      });
      allCategories.push(this.CUSTOM_CATEGORY);
    }

    this.hideRecent = true;

    if (props.include != undefined) {
      allCategories.sort(function (a, b) {
        if (props.include.indexOf(a.id) > props.include.indexOf(b.id)) {
          return 1;
        }

        return -1;
      });
    }

    for (var categoryIndex = 0; categoryIndex < allCategories.length; categoryIndex++) {
      var category = allCategories[categoryIndex];
      var isIncluded = props.include && props.include.length ? props.include.indexOf(category.id) > -1 : true;
      var isExcluded = props.exclude && props.exclude.length ? props.exclude.indexOf(category.id) > -1 : false;

      if (!isIncluded || isExcluded) {
        continue;
      }

      if (props.emojisToShowFilter) {
        var newEmojis = [];
        var emojis = category.emojis;

        for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
          var emoji = emojis[emojiIndex];

          if (props.emojisToShowFilter(this.data.emojis[emoji] || emoji)) {
            newEmojis.push(emoji);
          }
        }

        if (newEmojis.length) {
          var newCategory = {
            emojis: newEmojis,
            name: category.name,
            id: category.id
          };
          this.categories.push(newCategory);
        }
      } else {
        this.categories.push(category);
      }
    }

    var includeRecent = props.include && props.include.length ? props.include.indexOf(this.RECENT_CATEGORY.id) > -1 : true;
    var excludeRecent = props.exclude && props.exclude.length ? props.exclude.indexOf(this.RECENT_CATEGORY.id) > -1 : false;

    if (includeRecent && !excludeRecent) {
      this.hideRecent = false;
      this.categories.unshift(this.RECENT_CATEGORY);
    }

    if (this.categories[0]) {
      this.categories[0].first = true;
    }

    this.categories.unshift(this.SEARCH_CATEGORY);
    this.setAnchorsRef = this.setAnchorsRef.bind(this);
    this.handleAnchorClick = this.handleAnchorClick.bind(this);
    this.setSearchRef = this.setSearchRef.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setScrollRef = this.setScrollRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollPaint = this.handleScrollPaint.bind(this);
    this.handleEmojiOver = this.handleEmojiOver.bind(this);
    this.handleEmojiLeave = this.handleEmojiLeave.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
    this.setPreviewRef = this.setPreviewRef.bind(this);
    this.handleSkinChange = this.handleSkinChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.skin) {
      this.setState({
        skin: props.skin
      });
    } else if (props.defaultSkin && !_store.default.get('skin')) {
      this.setState({
        skin: props.defaultSkin
      });
    }
  }

  componentDidMount() {
    var _this = this;

    if (this.state.firstRender) {
      this.testStickyPosition();
      this.firstRenderTimeout = setTimeout(function () {
        _this.setState({
          firstRender: false
        });
      }, 60);
    }
  }

  componentDidUpdate() {
    this.updateCategoriesSize();
    this.handleScroll();
  }

  componentWillUnmount() {
    this.SEARCH_CATEGORY.emojis = null;
    clearTimeout(this.leaveTimeout);
    clearTimeout(this.firstRenderTimeout);
  }

  testStickyPosition() {
    var stickyTestElement = document.createElement('div');
    var prefixes = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
    prefixes.forEach(function (prefix) {
      return stickyTestElement.style.position = "".concat(prefix, "sticky");
    });
    this.hasStickyPosition = !!stickyTestElement.style.position.length;
  }

  handleEmojiOver(emoji) {
    var preview = this.preview;

    if (!preview) {
      return;
    } // Use Array.prototype.find() when it is more widely supported.


    var emojiData = this.CUSTOM_CATEGORY.emojis.filter(function (customEmoji) {
      return customEmoji.id === emoji.id;
    })[0];

    for (var key in emojiData) {
      if (emojiData.hasOwnProperty(key)) {
        emoji[key] = emojiData[key];
      }
    }

    preview.setState({
      emoji: emoji
    });
    clearTimeout(this.leaveTimeout);
  }

  handleEmojiLeave(emoji) {
    var preview = this.preview;

    if (!preview) {
      return;
    }

    this.leaveTimeout = setTimeout(function () {
      preview.setState({
        emoji: null
      });
    }, 16);
  }

  handleEmojiClick(emoji, e) {
    this.props.onClick(emoji, e);
    this.handleEmojiSelect(emoji);
  }

  handleEmojiSelect(emoji) {
    var _this2 = this;

    this.props.onSelect(emoji);
    if (!this.hideRecent && !this.props.recent) _frequently.default.add(emoji);
    var component = this.categoryRefs['category-1'];

    if (component) {
      var maxMargin = component.maxMargin;
      component.forceUpdate();
      window.requestAnimationFrame(function () {
        if (!_this2.scroll) return;
        component.memoizeSize();
        if (maxMargin == component.maxMargin) return;

        _this2.updateCategoriesSize();

        _this2.handleScrollPaint();

        if (_this2.SEARCH_CATEGORY.emojis) {
          component.updateDisplay('none');
        }
      });
    }
  }

  handleScroll() {
    if (!this.waitingForPaint) {
      this.waitingForPaint = true;
      window.requestAnimationFrame(this.handleScrollPaint);
    }
  }

  handleScrollPaint() {
    this.waitingForPaint = false;

    if (!this.scroll) {
      return;
    }

    var activeCategory = null;

    if (this.SEARCH_CATEGORY.emojis) {
      activeCategory = this.SEARCH_CATEGORY;
    } else {
      var target = this.scroll,
          scrollTop = target.scrollTop,
          scrollingDown = scrollTop > (this.scrollTop || 0),
          minTop = 0;

      for (var i = 0, l = this.categories.length; i < l; i++) {
        var ii = scrollingDown ? this.categories.length - 1 - i : i,
            category = this.categories[ii],
            component = this.categoryRefs["category-".concat(ii)];

        if (component) {
          var active = component.handleScroll(scrollTop);

          if (!minTop || component.top < minTop) {
            if (component.top > 0) {
              minTop = component.top;
            }
          }

          if (active && !activeCategory) {
            activeCategory = category;
          }
        }
      }

      if (scrollTop < minTop) {
        activeCategory = this.categories.filter(function (category) {
          return !(category.anchor === false);
        })[0];
      } else if (scrollTop + this.clientHeight >= this.scrollHeight) {
        activeCategory = this.categories[this.categories.length - 1];
      }
    }

    if (activeCategory) {
      var anchors = this.anchors,
          _activeCategory = activeCategory,
          categoryName = _activeCategory.name;

      if (anchors.state.selected != categoryName) {
        anchors.setState({
          selected: categoryName
        });
      }
    }

    this.scrollTop = scrollTop;
  }

  handleSearch(emojis) {
    this.SEARCH_CATEGORY.emojis = emojis;

    for (var i = 0, l = this.categories.length; i < l; i++) {
      var component = this.categoryRefs["category-".concat(i)];

      if (component && component.props.name != 'Search') {
        var display = emojis ? 'none' : 'inherit';
        component.updateDisplay(display);
      }
    }

    this.forceUpdate();
    this.scroll.scrollTop = 0;
    this.handleScroll();
  }

  handleAnchorClick(category, i) {
    var component = this.categoryRefs["category-".concat(i)],
        scroll = this.scroll,
        anchors = this.anchors,
        scrollToComponent = null;

    scrollToComponent = function scrollToComponent() {
      if (component) {
        var top = component.top;

        if (category.first) {
          top = 0;
        } else {
          top += 1;
        }

        scroll.scrollTop = top;
      }
    };

    if (this.SEARCH_CATEGORY.emojis) {
      this.handleSearch(null);
      this.search.clear();
      window.requestAnimationFrame(scrollToComponent);
    } else {
      scrollToComponent();
    }
  }

  handleSkinChange(skin) {
    var newState = {
      skin: skin
    },
        onSkinChange = this.props.onSkinChange;
    this.setState(newState);

    _store.default.update(newState);

    onSkinChange(skin);
  }

  handleKeyDown(e) {
    var handled = false;

    switch (e.keyCode) {
      case 13:
        var emoji;

        if (this.SEARCH_CATEGORY.emojis && (emoji = this.SEARCH_CATEGORY.emojis[0])) {
          this.handleEmojiSelect(emoji);
        }

        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
    }
  }

  updateCategoriesSize() {
    for (var i = 0, l = this.categories.length; i < l; i++) {
      var component = this.categoryRefs["category-".concat(i)];
      if (component) component.memoizeSize();
    }

    if (this.scroll) {
      var target = this.scroll;
      this.scrollHeight = target.scrollHeight;
      this.clientHeight = target.clientHeight;
    }
  }

  getCategories() {
    return this.state.firstRender ? this.categories.slice(0, 3) : this.categories;
  }

  setAnchorsRef(c) {
    this.anchors = c;
  }

  setSearchRef(c) {
    this.search = c;
  }

  setPreviewRef(c) {
    this.preview = c;
  }

  setScrollRef(c) {
    this.scroll = c;
  }

  setCategoryRef(name, c) {
    if (!this.categoryRefs) {
      this.categoryRefs = {};
    }

    this.categoryRefs[name] = c;
  }

  render() {
    var _this3 = this;

    var _this$props = this.props,
        perLine = _this$props.perLine,
        emojiSize = _this$props.emojiSize,
        set = _this$props.set,
        sheetSize = _this$props.sheetSize,
        sheetColumns = _this$props.sheetColumns,
        sheetRows = _this$props.sheetRows,
        style = _this$props.style,
        title = _this$props.title,
        emoji = _this$props.emoji,
        color = _this$props.color,
        native = _this$props.native,
        backgroundImageFn = _this$props.backgroundImageFn,
        emojisToShowFilter = _this$props.emojisToShowFilter,
        showPreview = _this$props.showPreview,
        showSkinTones = _this$props.showSkinTones,
        emojiTooltip = _this$props.emojiTooltip,
        include = _this$props.include,
        exclude = _this$props.exclude,
        recent = _this$props.recent,
        autoFocus = _this$props.autoFocus,
        skinEmoji = _this$props.skinEmoji,
        notFound = _this$props.notFound,
        notFoundEmoji = _this$props.notFoundEmoji,
        skin = this.state.skin,
        width = perLine * (emojiSize + 12) + 12 + 2 + (0, _utils.measureScrollbar)();
    return _react.default.createElement("div", {
      style: (0, _objectSpread2.default)({
        width: width
      }, style),
      className: "emoji-mart",
      onKeyDown: this.handleKeyDown
    }, _react.default.createElement("div", {
      className: "emoji-mart-bar"
    }, _react.default.createElement(_.Anchors, {
      ref: this.setAnchorsRef,
      data: this.data,
      i18n: this.i18n,
      color: color,
      categories: this.categories,
      onAnchorClick: this.handleAnchorClick,
      icons: this.icons
    })), _react.default.createElement(_.Search, {
      ref: this.setSearchRef,
      onSearch: this.handleSearch,
      data: this.data,
      i18n: this.i18n,
      emojisToShowFilter: emojisToShowFilter,
      include: include,
      exclude: exclude,
      custom: this.CUSTOM_CATEGORY.emojis,
      autoFocus: autoFocus
    }), _react.default.createElement("div", {
      ref: this.setScrollRef,
      className: "emoji-mart-scroll",
      onScroll: this.handleScroll
    }, this.getCategories().map(function (category, i) {
      return _react.default.createElement(_.Category, {
        ref: _this3.setCategoryRef.bind(_this3, "category-".concat(i)),
        key: category.name,
        id: category.id,
        name: category.name,
        emojis: category.emojis,
        perLine: perLine,
        native: native,
        hasStickyPosition: _this3.hasStickyPosition,
        data: _this3.data,
        i18n: _this3.i18n,
        recent: category.id == _this3.RECENT_CATEGORY.id ? recent : undefined,
        custom: category.id == _this3.RECENT_CATEGORY.id ? _this3.CUSTOM_CATEGORY.emojis : undefined,
        emojiProps: {
          native: native,
          skin: skin,
          size: emojiSize,
          set: set,
          sheetSize: sheetSize,
          sheetColumns: sheetColumns,
          sheetRows: sheetRows,
          forceSize: native,
          tooltip: emojiTooltip,
          backgroundImageFn: backgroundImageFn,
          onOver: _this3.handleEmojiOver,
          onLeave: _this3.handleEmojiLeave,
          onClick: _this3.handleEmojiClick
        },
        notFound: notFound,
        notFoundEmoji: notFoundEmoji
      });
    })), showPreview && _react.default.createElement("div", {
      className: "emoji-mart-bar"
    }, _react.default.createElement(_.Preview, {
      ref: this.setPreviewRef,
      data: this.data,
      title: title,
      emoji: emoji,
      showSkinTones: showSkinTones,
      emojiProps: {
        native: native,
        size: 38,
        skin: skin,
        set: set,
        sheetSize: sheetSize,
        sheetColumns: sheetColumns,
        sheetRows: sheetRows,
        backgroundImageFn: backgroundImageFn
      },
      skinsProps: {
        skin: skin,
        onChange: this.handleSkinChange,
        skinEmoji: skinEmoji
      },
      i18n: this.i18n
    })));
  }

}

exports.default = NimblePicker;
NimblePicker.defaultProps = (0, _objectSpread2.default)({}, _sharedProps.PickerDefaultProps);