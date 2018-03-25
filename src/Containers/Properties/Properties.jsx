import React, { Component } from 'react';
import PropTypes from 'prop-types';

// External Imports
import { TabBar, Tab, TabIcon } from 'rmwc/Tabs';
import { Drawer } from 'rmwc/Drawer';

// Library Imports
import Loading from '../../Modules/Loading/Loading';
import DataSet from '../../Modules/DataSet/DataSet';
import MapDataView from '../../Modules/DataView/MapDataView/MapDataView';
import { Tile } from '../../Modules/DatumView/TileDatumView/TileDatumView';
import { Summary } from '../../Modules/DatumView/SummaryDatumView/SummaryDatumView';
import InViewportDataView from '../../Modules/DataView/InViewportDataView/InViewportDataView';

// Project Specific Imports
import Property from '../Property/Property';
import Style from './Properties.css';
import dataQuery from './Properties.gql';

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: props.location.search === '?displayType=map' ? 0 : 1,
    };
    this.changeDisplayType = (index) => {
      if (index === 0) {
        this.props.history.push('/properties?displayType=map');
      } else {
        this.props.history.push('/properties?displayType=grid');
      }
      this.setState({ displayIndex: index });
    };
    this.mapsClickHandler = (id) => {
      if (window.innerWidth < 800) {
        this.props.history.push(['/properties/', id].join(''));
      } else {
        this.props.dataSet.set([id], 'selected', 'local');
      }
    };
    this.mapsCloseHandler = () => {
      this.props.dataSet.set([], 'selected', 'local');
    };
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
      data.forEach((property, i) => {
        let beds = '?';
        let rent = '?';

        if (property.units.length > 0) {
          const minRentUnit = property.units.reduce((prev, curr) =>
            ((prev.price / prev.bedrooms) < (curr.price / curr.bedrooms) ? prev : curr), 0);
          const minRent = Math.floor(minRentUnit.price / minRentUnit.bedrooms);
          const maxRentUnit = property.units.reduce((prev, curr) =>
            ((prev.price / prev.bedrooms) > (curr.price / curr.bedrooms) ? prev : curr), 0);
          const maxRent = Math.floor(maxRentUnit.price / maxRentUnit.bedrooms);
          rent = minRent === maxRent ? ['$', minRent].join('') : ['$', minRent, '–', maxRent].join('');

          const minBeds = property.units.reduce((prev, curr) =>
            (prev.bedrooms < curr.bedrooms ? prev : curr), 0).bedrooms;
          const maxBeds = property.units.reduce((prev, curr) =>
            (prev.bedrooms > curr.bedrooms ? prev : curr), 0).bedrooms;
          beds = minBeds === maxBeds ? minBeds : [minBeds, ' to ', maxBeds].join('');
        }

        const tile = (
          <Tile
            { ...tileOptions }
            key={ property.id }
            to={ ['properties/', property.id].join('') }
            mediaURL={ this.mediaURLAccessor(property) }
            mimeType="image/jpeg"
            active={ i === inViewportIndex }
          ><Summary
            { ...summaryOptions }
            className={ Style.summary }
            title={ property.address }
            description={ [beds, ' rooms • ', rent, ' per room'].join('') }
          />
          </Tile>
        );
        tiles.push(tile);
      });
      return tiles;
    };
    this.mediaURLAccessor = (property) => {
      let result = '';
      property.media.forEach((media) => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });
      property.units.forEach((unit) => {
        unit.media.forEach((media) => {
          if (media.isFeatured) {
            result = media.handle;
          }
        });
      });
      return ['https://media.graphcms.com/resize=w:800/compress/', result].join('');
    };
  }
  componentDidMount() {
    window.analytics.page('Properties');
  }
  render() {
    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }

    const dataView = ([
      <div className={ Style.map }>
        <MapDataView
          center={
            {
              lat: 43.465267,
              lng: -80.522608,
            }
          }
          data={ this.props.data.allProperties }
          onClick={ this.mapsClickHandler }
          onClose={ this.mapsCloseHandler }
          selected={ this.props.dataSet.state.local.selected.length > 0 ?
            this.props.dataSet.state.local.selected[0] : undefined }
        />
      </div>,
      <InViewportDataView
        className={ Style.grid }
        data={ this.props.data.allProperties }
        keyAccessor={ property => property.id }
        dataViewGenerator={ (data, inViewportIndex) => this.customGrid(data, inViewportIndex) }
      />,
    ]);
    return (
      <div className={ Style.container }>
        <TabBar
          className={ Style.tab }
          activeTabIndex={ this.state.displayIndex }
          onChange={ evt => this.changeDisplayType(evt.target.value) }
        >
          <Tab><TabIcon>map</TabIcon></Tab>
          <Tab><TabIcon>view_module</TabIcon></Tab>
        </TabBar>
        <Drawer
          temporary
          open={ this.props.dataSet.state.local.selected.length > 0 }
          onClose={ this.mapsCloseHandler }
        >{ this.props.dataSet.state.local.selected.length > 0 ?
          (<Property
            id={ this.props.dataSet.state.local.selected[0] }
            className={ Style.datumView }
            nested
          />) : '' }
        </Drawer>
        { dataView[this.state.displayIndex] }
      </div>
    );
  }
}
Properties.propTypes = {
  data: PropTypes.shape({
    allProperties: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  dataSet: PropTypes.shape({
    state: PropTypes.shape({
      local: PropTypes.shape({
        selected: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    }).isRequired,
    set: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOf(['?displayType=map', '?displayType=grid', '']),
  }).isRequired,
};

export default DataSet(dataQuery)(Properties);
