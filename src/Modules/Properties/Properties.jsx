import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
// import { Fab } from 'rmwc/Fab';
import { TabBar, Tab, TabIcon } from 'rmwc/Tabs';
import DataSet from '../DataSet/DataSet';
import InViewportDataView from '../DataView/InViewportDataView/InViewportDataView';
import { Tile } from '../DatumView/TileDatumView/TileDatumView';
import { Summary } from '../DatumView/SummaryDatumView/SummaryDatumView';
import MapDataView from '../DataView/MapDataView/MapDataView';
// import CheckBoxDataFilter from '../DataFilter/CheckBoxDataFilter/CheckBoxDataFilter';
// import RadioButtonDataSort from '../DataSort/RadioButtonDataSort/RadioButtonDataSort';
import Style from './Properties.css';
import dataQuery from './Properties.gql';

const dataName = 'allProperties';

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      viewIndex: 1,
    };
    this.toggleMenu = () => {
      this.setState({ open: !this.state.open });
    };
    this.closeMenu = () => {
      this.setState({ open: false });
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
      data.forEach((datum, i) => {
        tiles.push(
          <Tile
            { ...tileOptions }
            key={ datum.id }
            mediaURL={ this.mediaURLAccessor(datum) }
            mimeType="image/jpeg"
            active={ i === inViewportIndex }
          ><Summary
            { ...summaryOptions }
            className={ Style.summary }
            title={ datum.title }
            description=""
          />
          </Tile>);
      });
      return tiles;
    };
    this.mediaURLAccessor = (datum) => {
      let result = '';
      datum.media.forEach((item) => {
        if (item.isFeatured) {
          result = ['https://media.graphcms.com/resize=w:800/compress/', item.handle].join('');
        }
      });
      return result;
    };
  }
  render() {
    if (this.props.data.loading === true) {
      return (<div>Loading...</div>);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    const dataView = ([
      <div className={ Style.map }><MapDataView data={ this.props.data[dataName] } /></div>,
      <InViewportDataView
        className={ Style.grid }
        data={ this.props.data[dataName] }
        keyAccessor={ datum => datum.id }
        dataViewGenerator={ (data, inViewportIndex) => this.customGrid(data, inViewportIndex) }
      />,
    ]);
    return (
      <div className={ Style.container }>
        { /*
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
          <DrawerHeader theme="secondary-bg text-primary-on-secondary" className={ Style.drawerHeader } />
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
        */ }
        <TabBar
          className={ Style.tab }
          activeTabIndex={ this.state.viewIndex }
          onChange={ evt => this.setState({ viewIndex: evt.target.value }) }
        >
          <Tab><TabIcon>map</TabIcon></Tab>
          <Tab><TabIcon>view_module</TabIcon></Tab>
        </TabBar>
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
  local: PropTypes.shape({
    state: PropTypes.shape({
      filters: PropTypes.arrayOf(PropTypes.object).isRequired,
      sorts: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    sortAdd: PropTypes.func.isRequired,
    sortRemove: PropTypes.func.isRequired,
    filterAdd: PropTypes.func.isRequired,
    filterRemove: PropTypes.func.isRequired,
    process: PropTypes.func.isRequired,
  }).isRequired,
};

export default DataSet(dataQuery)(Properties);
