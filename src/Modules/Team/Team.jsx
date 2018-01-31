import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../DataSet/DataSet';
import GridDataView from '../DataView/GridDataView/GridDataView';
import Style from './Team.css';
import dataQuery from './Team.gql';

const dataName = 'allTeamMembers';

class Team extends Component {
  constructor() {
    super();
    this.customGrid = (data, tile, TileOptionsOriginal, SummaryOptionsOriginal, inViewIndex) => {
      const TileOptions = {
        size: ['small'],
        color: ['image-white'],
        interaction: ['high', 'high', 'low'],
      };
      const SummaryOptions = {
      };
      const tiles = [];
      const tileOptions = {
        options: {},
        index: {},
      };
      const summaryOptions = {
        options: {},
        index: {},
      };
      Object.keys(TileOptions).forEach((key) => {
        tileOptions.index[key] = 0;
      });
      Object.keys(SummaryOptions).forEach((key) => {
        summaryOptions.index[key] = 0;
      });
      data.forEach((datum, i) => {
        Object.keys(TileOptions).forEach((key) => {
          tileOptions.options[key] =
          TileOptions[key][tileOptions.index[key] % TileOptions[key].length];
          tileOptions.index[key] += 1;
        });
        Object.keys(SummaryOptions).forEach((key) => {
          summaryOptions.options[key] =
          SummaryOptions[key][summaryOptions.index[key] %
          SummaryOptions[key].length];
          summaryOptions.index[key] += 1;
        });
        tiles.push(tile(
          datum,
          tileOptions.options,
          summaryOptions.options,
          i === inViewIndex,
        ));
      });
      return tiles;
    };
  }
  render() {
    if (this.props.data.loading === true) {
      return (<div>Loading...</div>);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    return (
      <div className={ Style.container }>
        <GridDataView
          tileType="default"
          gridType="custom"
          customGrid={ this.customGrid }
          data={ this.props.data[dataName] }
          keyAccessor={ datum => datum.id }
          toAccessor={ datum => datum.to }
          mediaAccessor={ datum => datum.cover }
          accessibilityAccessor={ () => '' }
        />
      </div>
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
