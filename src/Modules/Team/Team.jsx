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
      data.forEach((teamMember, i) => {
        const tile = (
          <Tile
            { ...tileOptions }
            key={ teamMember.id }
            mediaURL={ this.mediaURLAccessor(teamMember) }
            mimeType={ this.mimeTypeAccessor(teamMember) }
            active={ i === inViewportIndex }
          ><Summary
            { ...summaryOptions }
            className={ Style.summary }
            title={ teamMember.name }
            description={ teamMember.title }
          />
          </Tile>
        );
        tiles.push(tile);
      });
      return tiles;
    };
    this.mediaURLAccessor = (teamMember) => {
      if (teamMember.portrait !== null) {
        return ['https://media.graphcms.com/resize=w:800/compress/', teamMember.portrait.handle].join('');
      }
      return puppyPic;
    };
    this.mimeTypeAccessor = (teamMember) => {
      if (teamMember.portrait !== null) {
        return teamMember.portrait.mimeType;
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
