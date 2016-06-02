import '../utils/raf-polyfill'

import React from 'react'
import data from '../../data'

import {Anchors, Category, Preview, Search} from '.'

const DEFAULT_CATEGORIES = [
  { name: 'Recent', emojis: null }
].concat(data.categories)

export default class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.testStickyPosition()

    this.state = {
      categories: DEFAULT_CATEGORIES,
    }
  }

  componentDidUpdate() {
    this.handleScroll()
  }

  testStickyPosition() {
    var stickyTestElement = document.createElement('div')
    for (let prefix of ['', '-webkit-', '-ms-', '-moz-', '-o-']) {
      stickyTestElement.style.position = `${prefix}sticky`
    }

    this.hasStickyPosition = !!stickyTestElement.style.position.length
  }

  handleEmojiOver(emoji) {
    var { preview } = this.refs
    preview.setState({ emoji: emoji })
    clearTimeout(this.leaveTimeout)
  }

  handleEmojiLeave(emoji) {
    this.leaveTimeout = setTimeout(() => {
      var { preview } = this.refs
      preview.setState({ emoji: null })
    }, 16)
  }

  handleScroll() {
    if (!this.waitingForPaint) {
      this.waitingForPaint = true
      window.requestAnimationFrame(this.handleScrollPaint.bind(this))
    }
  }

  handleScrollPaint() {
    this.waitingForPaint = false

    var target = this.refs.scroll,
        scrollTop = target.scrollTop,
        activeCategory = null

    for (let i = 0, l = this.state.categories.length; i < l; i++) {
      let category = this.state.categories[i],
          component = this.refs[`category-${i}`]

      if (component) {
        let active = component.handleScroll(scrollTop)
        if (active && !activeCategory) {
          activeCategory = category
        }
      }
    }

    if (activeCategory) {
      let { anchors } = this.refs,
          { name: categoryName } = activeCategory

      if (anchors.state.selected != categoryName) {
        anchors.setState({ selected: categoryName })
      }
    }

    this.scrollTop = scrollTop
  }

  handleSearch(emojis) {
    if (emojis == null) {
      this.setState({ categories: DEFAULT_CATEGORIES })
    } else {
      this.setState({ categories: [{
        name: 'Search Results',
        emojis: emojis,
      }]})
    }
  }

  render() {
    var { skin, perLine, emojiSize, sheetURL } = this.props,
        width = (perLine * (emojiSize + 12)) + 12 + 2

    return <div style={{width: width}} className='emoji-picker'>
      <div className='emoji-picker-bar'>
        <Anchors
          ref='anchors'
          categories={DEFAULT_CATEGORIES}
        />
      </div>

      <div ref="scroll" className='emoji-picker-scroll' onScroll={this.handleScroll.bind(this)}>
        <Search
          onSearch={this.handleSearch.bind(this)}
        />

        {this.state.categories.map((category, i) => {
          return <Category
            ref={`category-${i}`}
            key={category.name}
            name={category.name}
            emojis={category.emojis}
            hasStickyPosition={this.hasStickyPosition}
            emojiProps={{
              skin: skin,
              size: emojiSize,
              sheetURL: sheetURL,
              onOver: this.handleEmojiOver.bind(this),
              onLeave: this.handleEmojiLeave.bind(this),
              onClick: this.props.onClick,
            }}
          />
        })}
      </div>

      <div className='emoji-picker-bar'>
        <Preview
          ref='preview'
          emojiProps={{
            size: 38,
            sheetURL: sheetURL,
          }}
        />
      </div>
    </div>
  }
}

Picker.propTypes = {
  onClick: React.PropTypes.func,
  skin: React.PropTypes.number,
  perLine: React.PropTypes.number,
  emojiSize: React.PropTypes.number,
  sheetURL: React.PropTypes.string.isRequired,
}

Picker.defaultProps = {
  onClick: (() => {}),
  emojiSize: 24,
  perLine: 9,
  skin: 1,
}