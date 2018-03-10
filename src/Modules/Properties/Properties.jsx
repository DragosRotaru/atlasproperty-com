import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar, Tab, TabIcon } from 'rmwc/Tabs';
import { Drawer } from 'rmwc/Drawer';
import Loading from '../Loading/Loading';
import DataSet from '../DataSet/DataSet';
import InViewportDataView from '../DataView/InViewportDataView/InViewportDataView';
import MapDataView from '../DataView/MapDataView/MapDataView';
import { Tile } from '../DatumView/TileDatumView/TileDatumView';
import { Summary } from '../DatumView/SummaryDatumView/SummaryDatumView';
// import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
// import { Fab } from 'rmwc/Fab';
// import CheckBoxDataFilter from '../DataFilter/CheckBoxDataFilter/CheckBoxDataFilter';
// import RadioButtonDataSort from '../DataSort/RadioButtonDataSort/RadioButtonDataSort';
import Property from '../Property/Property';
import Style from './Properties.css';
import dataQuery from './Properties.gql';

/*
<Fab
  onMouseUp={ this.toggleMenu }
  className={ this.state.open ? Style.buttonWhite : Style.buttonAccent }
>search
</Fab>
<Drawer
  temporary
  open={ this.state.open }
  onClose={ this.closeMenu }
>
  <DrawerHeader
    theme="secondary-bg text-primary-on-secondary"
    className={ Style.drawerHeader }
  />
  <DrawerContent theme="secondary-bg text-primary-on-secondary" className={ Style.drawer }>
    <h3>Type</h3>
    <CheckBoxDataFilter
      accessor={ property => property.amenities }
      data={ this.props.data[dataName] }
      filters={ this.props.local.state.filters }
      filterAdd={ this.props.local.filterAdd }
      filterRemove={ this.props.local.filterRemove }
      className={ Style.checkBoxDataFilter }
      theme={ ['primary'] }
    />
    <h3>Location</h3>
    <h3>Bedrooms</h3>
    <h3>Bathrooms</h3>
    <h3>Price</h3>
    <h3>Sort</h3>
    <RadioButtonDataSort
      sortsAvailable={ [{ label: 'Newest' }, { label: 'Oldest' }] }
      sortsEnabled={ this.props.local.state.sorts }
      sortAdd={ this.props.local.sortAdd }
      sortRemove={ this.props.local.sortRemove }
      className={ Style.radioButtonDataSort }
    />
  </DrawerContent>
</Drawer>
*/

const dataName = 'allProperties';

class Properties extends Component {
  constructor(props) {
    super(props);
    let viewIndex = 1;
    if (props.location.search === '?displayType=map') {
      viewIndex = 0;
    }
    this.state = {
      open: false,
      viewIndex,
    };
    this.toggleMenu = () => {
      this.setState({ open: !this.state.open });
    };
    this.closeMenu = () => {
      this.setState({ open: false });
    };
    this.changeDisplayType = (index) => {
      if (index === 0) {
        this.props.history.push('/properties?displayType=map');
      } else {
        this.props.history.push('/properties?displayType=grid');
      }
      this.setState({ viewIndex: index });
    };
    this.mapsClickHandler = (id) => {
      if (window.innerWidth < 800) {
        this.props.history.push(['/properties/', id].join(''))
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
          const minRent = property.units.reduce((prev, curr) =>
            (prev.price < curr.price ? prev : curr), 0).price;
          const maxRent = property.units.reduce((prev, curr) =>
            (prev.price > curr.price ? prev : curr), 0).price;
          rent = minRent === maxRent ? ['$', minRent].join('') : ['$', minRent, '–', maxRent].join('');

          const minBeds = property.units.reduce((prev, curr) =>
            (prev.bedrooms < curr.bedrooms ? prev : curr), 0).bedrooms;
          const maxBeds = property.units.reduce((prev, curr) =>
            (prev.bedrooms > curr.bedrooms ? prev : curr), 0).bedrooms;
          beds = minBeds === maxBeds ? minBeds : [minBeds, ' to ', maxBeds].join('');
        }
        tiles.push(
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
            description={ [beds, ' rooms, ', rent, ' per room'].join('') }
          />
          </Tile>);
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
          data={ this.props.data[dataName] }
          onClick={ this.mapsClickHandler }
          onClose={ this.mapsCloseHandler }
          selected={ this.props.dataSet.state.local.selected.length > 0 ?
            this.props.dataSet.state.local.selected[0] : undefined }
        />
      </div>,
      <InViewportDataView
        className={ Style.grid }
        data={ this.props.data[dataName] }
        keyAccessor={ property => property.id }
        dataViewGenerator={ (data, inViewportIndex) => this.customGrid(data, inViewportIndex) }
      />,
    ]);
    return (
      <div className={ Style.container }>
        <TabBar
          className={ Style.tab }
          activeTabIndex={ this.state.viewIndex }
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
        { dataView[this.state.viewIndex] }
      </div>
    );
  }
}
Properties.propTypes = {
  data: PropTypes.shape({
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
