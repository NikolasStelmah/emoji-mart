import React from 'react';
import PropTypes from 'prop-types';
import { getData, getSanitizedData, unifiedToNative } from "../../utils";
import { uncompress } from "../../utils/data";
import { EmojiPropTypes, EmojiDefaultProps } from "../../utils/shared-props";

var _getData = function _getData(props) {
  var emoji = props.emoji,
      skin = props.skin,
      set = props.set,
      data = props.data;
  return getData(emoji, skin, set, data);
};

var _getPosition = function _getPosition(props) {
  var _getData2 = _getData(props),
      sheet_x = _getData2.sheet_x,
      sheet_y = _getData2.sheet_y,
      multiplyX = 100 / (props.sheetColumns - 1),
      multiplyY = 100 / (props.sheetRows - 1);

  return "".concat(multiplyX * sheet_x, "% ").concat(multiplyY * sheet_y, "%");
};

var _getSanitizedData = function _getSanitizedData(props) {
  var emoji = props.emoji,
      skin = props.skin,
      set = props.set,
      data = props.data;
  return getSanitizedData(emoji, skin, set, data);
};

var _handleClick = function _handleClick(e, props) {
  if (!props.onClick) {
    return;
  }

  var onClick = props.onClick,
      emoji = _getSanitizedData(props);

  onClick(emoji, e);
};

var _handleOver = function _handleOver(e, props) {
  if (!props.onOver) {
    return;
  }

  var onOver = props.onOver,
      emoji = _getSanitizedData(props);

  onOver(emoji, e);
};

var _handleLeave = function _handleLeave(e, props) {
  if (!props.onLeave) {
    return;
  }

  var onLeave = props.onLeave,
      emoji = _getSanitizedData(props);

  onLeave(emoji, e);
};

var _isNumeric = function _isNumeric(value) {
  return !isNaN(value - parseFloat(value));
};

var _convertStyleToCSS = function _convertStyleToCSS(style) {
  var div = document.createElement('div');

  for (var key in style) {
    var value = style[key];

    if (_isNumeric(value)) {
      value += 'px';
    }

    div.style[key] = value;
  }

  return div.getAttribute('style');
};

var NimbleEmoji = function NimbleEmoji(props) {
  if (props.data.compressed) {
    uncompress(props.data);
  }

  for (var k in NimbleEmoji.defaultProps) {
    if (props[k] == undefined && NimbleEmoji.defaultProps[k] != undefined) {
      props[k] = NimbleEmoji.defaultProps[k];
    }
  }

  var data = _getData(props);

  if (!data) {
    if (props.fallback) {
      return props.fallback(null, props);
    } else {
      return null;
    }
  }

  var unified = data.unified,
      custom = data.custom,
      short_names = data.short_names,
      imageUrl = data.imageUrl,
      style = {},
      children = props.children,
      className = 'emoji-mart-emoji',
      title = null;

  if (!unified && !custom) {
    if (props.fallback) {
      return props.fallback(data, props);
    } else {
      return null;
    }
  }

  if (props.tooltip) {
    title = short_names[0];
  }

  if (props.native && unified) {
    className += ' emoji-mart-emoji-native';
    style = {
      fontSize: props.size
    };
    children = unifiedToNative(unified);

    if (props.forceSize) {
      style.display = 'inline-block';
      style.width = props.size;
      style.height = props.size;
    }
  } else if (custom) {
    className += ' emoji-mart-emoji-custom';
    style = {
      width: props.size,
      height: props.size,
      display: 'inline-block',
      backgroundImage: "url(".concat(imageUrl, ")"),
      backgroundSize: 'contain'
    };
  } else {
    var setHasEmoji = data["has_img_".concat(props.set)] == undefined || data["has_img_".concat(props.set)];

    if (!setHasEmoji) {
      if (props.fallback) {
        return props.fallback(data, props);
      } else {
        return null;
      }
    } else {
      style = {
        width: props.size,
        height: props.size,
        display: 'inline-block',
        backgroundImage: "url(".concat(props.backgroundImageFn(props.set, props.sheetSize), ")"),
        backgroundSize: "".concat(100 * props.sheetColumns, "% ").concat(100 * props.sheetRows, "%"),
        backgroundPosition: _getPosition(props)
      };
    }
  }

  if (props.html) {
    style = _convertStyleToCSS(style);
    return "<span style='".concat(style, "' ").concat(title ? "title='".concat(title, "'") : '', " class='").concat(className, "'>").concat(children || '', "</span>");
  } else {
    return React.createElement("span", {
      key: props.emoji.id || props.emoji,
      onClick: function onClick(e) {
        return _handleClick(e, props);
      },
      onMouseEnter: function onMouseEnter(e) {
        return _handleOver(e, props);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _handleLeave(e, props);
      },
      title: title,
      className: className
    }, React.createElement("span", {
      style: style
    }, children));
  }
};

NimbleEmoji.defaultProps = EmojiDefaultProps;
export default NimbleEmoji;