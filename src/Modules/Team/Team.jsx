import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../DataSet/DataSet';
import InViewportDataView from '../DataView/InViewportDataView/InViewportDataView';
import { Tile } from '../DatumView/TileDatumView/TileDatumView';
import { Summary } from '../DatumView/SummaryDatumView/SummaryDatumView';
import Loading from '../Loading/Loading';
import puppyPic from '../../Images/puppyPic.jpg';
import dataQuery from './Team.gql';
import Style from './Team.css';

const dataName = 'allTeamMembers';

class Team extends Component {
  constructor() {
    super();
    this.customGrid = (data, inViewportIndex) => {
      const tileOptions = {
        size: 'small',
        color: 'image-white',
        interaction: 'low',
      };
      const summaryOptions = {
        underline: 'underline',
        align: 'right',
      };
      const tiles = [];
      data.forEach((datum, i) => {
        tiles.push(
          <Tile
            { ...tileOptions }
            key={ datum.id }
            mediaURL={ this.mediaURLAccessor(datum) }
            mimeType={ this.mimeTypeAccessor(datum) }
            active={ i === inViewportIndex }
          ><Summary
            { ...summaryOptions }
            className={ Style.summary }
            title={ datum.name }
            description={ datum.title }
          />
          </Tile>);
      });
      return tiles;
    };
    this.mediaURLAccessor = (datum) => {
      if (datum.portrait !== null) {
        return ['https://media.graphcms.com/resize=w:800/compress/', datum.portrait.handle].join('');
      }
      return puppyPic;
    };
    this.mimeTypeAccessor = (datum) => {
      if (datum.portrait !== null) {
        return datum.portrait.mimeType;
      }
      return 'image/jpeg';
    };
  }
  render() {
    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    return (
      <InViewportDataView
        className={ Style.grid }
        data={ this.props.data[dataName] }
        keyAccessor={ datum => datum.id }
        dataViewGenerator={ (data, inViewportIndex) => this.customGrid(data, inViewportIndex) }
      />
    );
  }
}
Team.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default DataSet(dataQuery)(Team);
