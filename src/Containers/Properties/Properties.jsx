import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// External Imports
import { TabBar, Tab, TabIcon } from 'rmwc/Tabs';
import { Drawer } from 'rmwc/Drawer';
import { Select } from 'rmwc/Select';
import { Slider } from 'rmwc/Slider';
import { Checkbox } from 'rmwc/Checkbox';
import { Card, CardPrimaryAction, CardMedia } from 'rmwc/Card';
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
} from 'rmwc/Toolbar';

// Library Imports
import Loading from '../../Modules/Loading/Loading';
import DataSet from '../../Modules/DataSet/DataSet';
import MapDataView from '../../Modules/DataView/MapDataView/MapDataView';

// Project Specific Imports
import Style from './Properties.css';
import dataQuery from './Properties.gql';

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: props.location.search === '?displayType=map' ? 0 : 1,
      sortIndex: 0,
      filterMenuIsOpen: false,
      sortByMenuIsOpen: false,
      filterHouse: false,
      filterApartment: false,
      filterCity: '',
      filterBeds: '',
      filterBaths: '',
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
      this.props.dataSet.set([id], 'selected', 'local');
    };
    this.mapsCloseHandler = () => {
      this.props.dataSet.set([], 'selected', 'local');
    };
    this.mediaURLAccessor = (unit, property) => {
      let result = '';
      // Prioritizes Unit Featured Image
      unit.media.forEach((media) => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });

      // If no Unit Featured Image is found, resorts to Property Featured Image as backup
      if (result === '') {
        property.media.forEach((media) => {
          if (media.isFeatured) {
            result = media.handle;
          }
        });
      }
      return ['https://media.graphcms.com/resize=w:800/compress/', result].join('');
    };

    this.unitToGridItem = (unit, property, grid) => {
      const price = Math.floor(unit.price / unit.bedrooms);
      const gridItem = (
        <Link key={ unit.id } href to={ ['properties', property.id, unit.id].join('/') }>
          <Card className={ Style.gridItem }>
            <CardPrimaryAction>
              { property.isFeatured ? <div className={ Style.cornerRibbon }>{ property.imageBanner ? property.imageBanner : 'Top Pick'}</div> : '' }
              <CardMedia
                sixteenByNine
                style={ {
                  backgroundImage:
                    `url(${this.mediaURLAccessor(unit, property)})`,
                } }
              />
              <div style={ { padding: '1em' } }>
                <h2>${ price } / bed</h2>
                <h3>{ property.address }, { property.city }</h3>
                <h3>{ property.type } • { unit.bedrooms } beds • { unit.bathrooms } baths</h3>
              </div>
            </CardPrimaryAction>
          </Card>
        </Link>
      );
      grid.push({ jsx: gridItem, price, bedrooms: unit.bedrooms, bathrooms: unit.bathrooms });
    };
  }
  render() {

    console.log(this.state);

    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }

    const properties = this.props.data.allProperties
      .filter((property) => { // By Type
        if (this.state.filterApartment === this.state.filterHouse) {
          return true;
        } else if (this.state.filterApartment) {
          return property.type === 'Apartment';
        } else if (this.state.filterHouse) {
          return property.type === 'House';
        }
      })
      .filter((property) => { // By City
        if (this.state.filterCity === '') {
          return true;
        }
        return property.city === this.state.filterCity;
      })
      .filter((property) => { // By Bedrooms
        if (this.state.filterBeds === '') {
          return true;
        }
        return property.units.map(u => u.bedrooms).includes(Number(this.state.filterBeds));
      })
      .filter((property) => { // By Bathrooms
        if (this.state.filterBaths === '') {
          return true;
        }
        const numBaths = Number(this.state.filterBaths.replace('+', ''));
        if (this.state.filterBaths === '1') {
          return property.units.map(u => u.bathrooms).includes(numBaths);
        }
        return numBaths <= Math.max(...property.units.map(u => u.bathrooms));
      });

    // Grid View
    let grid = [];
    properties.slice().sort((a, b) => a.priority - b.priority).reverse().forEach((property) => {
      if (property.units.length > 0) {
        property.units.forEach(unit => this.unitToGridItem(unit, property, grid));
      }
    });

    // Filtering
    grid = grid
      .filter((gridItem) => { // By Bedrooms
        if (this.state.filterBeds === '') {
          return true;
        }
        console.log(gridItem.bedrooms, this.state.filterBeds, gridItem.bedrooms === this.state.filterBeds);
        return gridItem.bedrooms === Number(this.state.filterBeds);
      })
      .filter((gridItem) => { // By Bathrooms
        if (this.state.filterBaths === '') {
          return true;
        }
        const numBaths = Number(this.state.filterBaths.replace('+', ''));
        return numBaths <= gridItem.bathrooms;
      });

    // Sorting
    if (this.state.sortIndex === 1) {
      grid.sort((a, b) => a.price - b.price);
    } else if (this.state.sortIndex === 2) {
      grid.sort((a, b) => a.price - b.price).reverse();
    }

    // Map View Drawer Grid
    const drawerGrid = [];
    if (this.props.dataSet.state.local.selected.length > 0) {
      const property = properties.filter(p => p.id === this.props.dataSet.state.local.selected[0])[0];
      if (property.units.length > 0) {
        property.units.forEach(unit => this.unitToGridItem(unit, property, drawerGrid));
      }
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
          data={ properties }
          onClick={ this.mapsClickHandler }
          onClose={ this.mapsCloseHandler }
          selected={ this.props.dataSet.state.local.selected.length > 0 ?
            this.props.dataSet.state.local.selected[0] : undefined }
        />
      </div>,
      <div className={ Style.grid }>{grid.map(gridItem => gridItem.jsx)}</div>,
    ]);
    return (
      <div className={ Style.container }>
        <Drawer
          temporary
          open={ this.props.dataSet.state.local.selected.length > 0 }
          onClose={ this.mapsCloseHandler }
        >{ drawerGrid.length > 0 ? <div className={ Style.drawerGrid }>{drawerGrid.map(gridItem => gridItem.jsx)}</div> : '' }
        </Drawer>
        <Drawer
          temporary
          open={ this.state.filterMenuIsOpen }
          onClose={ () => this.setState({ filterMenuIsOpen: false }) }
        >
          <div className={ Style.filterDrawer }>
            <h3>Bedrooms</h3>
            <Select
              className={ Style.input }
              box
              placeholder="Any"
              options={ [1, 2, 3, 4, 5, 6, 7] }
              value={ this.state.filterBeds }
              onChange={ evt => this.setState({ filterBeds: evt.target.value }) }
            />
            <h3>Bathrooms</h3>
            <Select
              className={ Style.input }
              box
              placeholder="Any"
              options={ ['5+', '4+', '3+', '2+', '1'] }
              value={ this.state.filterBaths }
              onChange={ evt => this.setState({ filterBaths: evt.target.value }) }
            />
            <h3>City</h3>
            <Select
              className={ Style.input }
              box
              placeholder="Anywhere"
              options={ ['Waterloo', 'Stratford'] }
              value={ this.state.filterCity }
              onChange={ evt => this.setState({ filterCity: evt.target.value }) }
            />
            <h3>Type</h3>
            <Checkbox
              checked={ this.state.filterApartment || false }
              onChange={ evt => this.setState({ filterApartment: evt.target.checked }) }
            >Apartment
            </Checkbox>
            <Checkbox
              checked={ this.state.filterHouse || false }
              onChange={ evt => this.setState({ filterHouse: evt.target.checked }) }
            >House
            </Checkbox>
            { /*
              <h3>Features</h3>
              <h3>Availability Date</h3>
              <h3>Price</h3>
              <Slider
                value={ this.state.sliderValue2 === undefined ? 1 : this.state.sliderValue2 }
                onChange={ evt => this.setState({ sliderValue2: evt.detail.value }) }
                onInput={ evt => this.setState({ sliderValue2: evt.detail.value }) }
                className={ Style.input }
                discrete
                displayMarkers
                min={ 0 }
                max={ 3500 }
                step={ 10 }
              />
            */}
          </div>
        </Drawer>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <Button
                raised
                theme="primary-bg on-primary"
                onClick={ () => this.setState({ filterMenuIsOpen: !this.state.filterMenuIsOpen }) }
              >
                Filters
              </Button>
            </ToolbarSection>
            <ToolbarSection>
              <TabBar
                className={ Style.tab }
                activeTabIndex={ this.state.displayIndex }
                onChange={ evt => this.changeDisplayType(evt.target.value) }
              >
                <Tab><TabIcon>map</TabIcon></Tab>
                <Tab><TabIcon>view_module</TabIcon></Tab>
              </TabBar>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={ this.state.sortByMenuIsOpen }
                  onClose={ () => this.setState({ sortByMenuIsOpen: false }) }
                  onSelected={ evt => this.setState({ sortIndex: evt.detail.index })}
                >
                  <MenuItem>Relevance</MenuItem>
                  <MenuItem>Price: Low to High</MenuItem>
                  <MenuItem>Price: High to Low</MenuItem>
                </Menu>

                <Button
                  raised
                  theme="primary-bg on-primary"
                  onClick={ () => this.setState({ sortByMenuIsOpen: !this.state.sortByMenuIsOpen }) }
                >
                  Sort By
                </Button>
              </MenuAnchor>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
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
