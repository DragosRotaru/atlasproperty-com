// @flow
import React, { Component } from 'react';

// Library Imports
import DataSet from '../../Modules/DataSet/DataSet';
import InViewportDataView from '../../Modules/DataView/InViewportDataView/InViewportDataView';
import { Tile } from '../../Modules/DatumView/TileDatumView/TileDatumView';
import { Summary } from '../../Modules/DatumView/SummaryDatumView/SummaryDatumView';
import Loading from '../../Modules/Loading/Loading';

// Local Imports
import doggy from './doggy.jpg';
import dataQuery from './Team.gql';
import Style from './Team.css';

type Props = {
  data: {
    allTeamMembers: Array<{
      id: string,
      name: string,
      title: string,
      email: string,
      priority: number,
      portrait: {
        handle: string,
        mimeType: string,
      },
    }>,
    error: {},
    loading: bool,
  },
  className: string,
};

class Team extends Component<Props> {
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
      const temp = [].concat(data);
      temp.sort((a, b) => {
        if (a.priority < b.priority) {
          return -1;
        } else if (a.priority > b.priority) {
          return 1;
        }
        return 0;
      });
      temp.forEach((teamMember, i) => {
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
      return doggy;
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
        className={ [Style.grid, this.props.className].join(' ') }
        data={ this.props.data.allTeamMembers }
        keyAccessor={ datum => datum.id }
        dataViewGenerator={ (data, inViewportIndex) => this.customGrid(data, inViewportIndex) }
      />
    );
  }
}
Team.defaultProps = {
  className: '',
};

export default DataSet(dataQuery)(Team);
