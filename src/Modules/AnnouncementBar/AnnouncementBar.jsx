import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../DataSet/DataSet';
import Style from './AnnouncementBar.css';
import dataQuery from './AnnouncementBar.gql';

const dataName = 'allAnnouncements';

class AnnouncementBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.closeAnnouncement = () => {
      this.setState({ open: false });
    };
  }
  render() {
    if (this.props.data.loading) {
      return '';
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    if (!this.state.open) {
      return '';
    }
    return ([
      <div key="bar" className={ Style.container } onClick={ () => this.closeAnnouncement() }>
        <span className={ Style.announcement }>{ this.props.data[dataName][0].title }</span>
        <span className={ Style.close }>close</span>
      </div>,
    ]);
  }
}
AnnouncementBar.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default DataSet(dataQuery)(AnnouncementBar);
