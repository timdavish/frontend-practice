import styles from './Paginator.scss'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Paginator extends Component {
  constructor (props) {
    super(props)
    this.state = {selected: 1}
  }

  handlePagePrevious = event => {
    const {selected} = this.state
    this.handlePageSelected(selected - 1, event)
  }

  handlePageNext = event => {
    const {selected} = this.state
    this.handlePageSelected(selected + 1, event)
  }

  handlePageSelected = (page, event) => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false)

    const {selected} = this.state
    const {pageCount} = this.props
    if (page < 1 || page === selected || page > pageCount) return

    this.setState({selected: page})
    this.callCallback(page)
  }

  callCallback = page => {
    const {onPageChange} = this.props
    if (onPageChange) onPageChange(page)
  }

  renderPageItem = page => {
    return <li key={page}>{page}</li>
  }

  renderPagination = () => {
    const paginationItems = []
    const {pageCount, pagesDisplayed, marginPagesDisplayed, breakLabel} = this.props
    const {selected} = this.state

    if (pageCount <= pagesDisplayed) {
      // Display all pages
      for (let i = 1; i <= pageCount; i++) {
        paginationItems.push(this.renderPageItem(i))
      }
    } else {
      let leftPages = pagesDisplayed / 2
      let rightPages = pagesDisplayed - leftPages

      // Check if current page allows us to display neighboring pages
      if (selected < leftPages) {
        leftPages = selected
        rightPages = pagesDisplayed - leftPages
      } else if (selected > pageCount - leftPages) {
        rightPages = pageCount - selected
        leftPages = pagesDisplayed - rightPages
      }

      let pageBreak

      for (let i = 1; i <= pageCount; i++) {
        // Display left margin pages
        if (i <= marginPagesDisplayed) {
          paginationItems.push(this.renderPageItem(i))
          continue
        }

        // Display surrounding pages
        if ((i >= selected - leftPages) && (i <= selected + rightPages)) {
          paginationItems.push(this.renderPageItem(i))
          continue
        }

        // Display right margin pages
        if (i >= pageCount - marginPagesDisplayed) {
          paginationItems.push(this.renderPageItem(i))
          continue
        }

        if (breakLabel && paginationItems[paginationItems.length - 1] !== pageBreak) {
          pageBreak = <li key={i}>{breakLabel}</li>
          paginationItems.push(pageBreak)
        }
      }
    }

    return paginationItems
  }

  render () {
    const {previousLabel, nextLabel} = this.props

    return (
      <ul className={styles.root}>
        <li className={styles.previous} onClick={this.handlePagePrevious}>
          {previousLabel}
        </li>

        {this.renderPagination()}

        <li className={styles.next} onClick={this.handlePageNext}>
          {nextLabel}
        </li>
      </ul>
    )
  }
}

Paginator.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pagesDisplayed: PropTypes.number.isRequired,
  marginPagesDisplayed: PropTypes.number.isRequired,
  previousLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  breakLabel: PropTypes.node,
}

Paginator.defaultProps = {
  pagesDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
}

export default Paginator
