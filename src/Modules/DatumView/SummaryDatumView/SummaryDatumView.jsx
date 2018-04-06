import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './SummaryDatumView.css';

const SummaryOptions = {
  underline: ['no-underline', 'underline'],
  align: ['left', 'right', 'center'],
};

class Summary extends Component {
  render() {
    return (
      <div className={ [Style.content, Style[this.props.align], this.props.className].join(' ') } >
        <h2>{ this.props.title }</h2><br />
        { this.props.title.length < 30 ? <h4>{ this.props.description }</h4> : '' }
        <br />
        <p>{ this.props.keywords.map(keyword => <span key={ keyword }>#{ keyword } </span>) }</p>
      </div>
    );
  }
}
Summary.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  align: PropTypes.oneOf(SummaryOptions.align),
  className: PropTypes.string,
};
Summary.defaultProps = {
  title: '',
  description: '',
  keywords: [],
  align: 'center',
  className: '',
};

export { Summary, SummaryOptions };
