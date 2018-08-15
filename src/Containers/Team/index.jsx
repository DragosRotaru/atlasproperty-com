// @flow
import React, { Component } from 'react';

// Library Imports
import DataSet from '../../Modules/DataSet';
import InViewportDataView from '../../Modules/DataView/InViewportDataView';
import { Tile } from '../../Modules/DatumView/TileDatumView';
import { Summary } from '../../Modules/DatumView/SummaryDatumView';
import Loading from '../../Modules/Loading';

// Local Imports
import doggy from './doggy.jpg';
import query from './query.gql';
import Style from './style.css';

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
        const email = ['mailto:', teamMember.email].join('');
        const tile = (
          <Tile
            {...tileOptions}
            key={teamMember.id}
            href={email}
            mediaURL={this.mediaURLAccessor(teamMember)}
            mimeType={this.mimeTypeAccessor(teamMember)}
            active={i === inViewportIndex}
          ><Summary
            {...summaryOptions}
            className={Style.summary}
            title={teamMember.name}
            description={teamMember.title}
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
      return (<div>{this.props.data.error.toString()}</div>);
    }
    return (
      <div className={Style.container}>
        <h1>Our Team</h1>
        <InViewportDataView
          className={[Style.grid, this.props.className].join(' ')}
          data={this.props.data.allTeamMembers}
          keyAccessor={datum => datum.id}
          dataViewGenerator={(data, inViewportIndex) => this.customGrid(data, inViewportIndex)}
        />
      </div>
    );
  }
}
Team.defaultProps = {
  className: '',
};

export default DataSet(query)(Team);
