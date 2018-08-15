// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// External Imports
import { TabBar, Tab, TabIcon } from "rmwc/Tabs";
import { Drawer } from "rmwc/Drawer";
import { Select } from "rmwc/Select";
import { Checkbox } from "rmwc/Checkbox";
import { Card, CardPrimaryAction, CardMedia } from "rmwc/Card";
import { Menu, MenuItem, MenuAnchor } from "rmwc/Menu";
import { Button } from "rmwc/Button";
import { Icon } from "rmwc/Icon";
import { Toolbar, ToolbarRow, ToolbarSection } from "rmwc/Toolbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment";

// Library Imports
import Loading from "../../Modules/Loading";
import DataSet from "../../Modules/DataSet";
import MapDataView from "../../Modules/DataView/MapDataView";

// Project Specific Imports
import Style from "./style.css";
import query from "./query.gql";

type media = {
  handle: string,
  isFeatured: boolean,
  priority: number
};

type unit = {
  id: string,
  type: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  description: string,
  features: Array<string>,
  utilitiesIncluded: Array<string>,
  availabilityDate: string,
  prioritizePropertyImages: boolean,
  squareFeet: number,
  media: Array<media>
};

type property = {
  id: string,
  location: string,
  address: string,
  city: string,
  zoning: string,
  features: Array<string>,
  priority: number,
  isFeatured: boolean,
  imageBanner: string,
  media: Array<media>,
  units: Array<unit>
};

type gridItem = {
  jsx: React.Node,
  type: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  date: string
};

type Props = {
  data: {
    allProperties: Array<property>,
    error: {},
    loading: boolean
  },
  dataSet: {
    state: {
      local: {
        selected: Array<string>
      }
    },
    set: (x: Array<string>, y: string, z: string) => void
  },
  history: {
    push: (x: string) => void
  },
  location: {
    search: string
  }
};

type State = {
  displayIndex: number,
  sortIndex: number,
  filterMenuIsOpen: boolean,
  sortByMenuIsOpen: boolean,
  filterHouse: boolean,
  filterApartment: boolean,
  filterCity: string | void,
  filterBeds: number | void,
  filterBaths: string | void,
  filterDate: Date | void
};

class Properties extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const initialSearchQuery = new URLSearchParams(props.location.search);
    this.state = {
      displayIndex: initialSearchQuery.get("displayType") === "map" ? 0 : 1,
      sortIndex: 0,
      filterMenuIsOpen: false,
      sortByMenuIsOpen: false,
      filterHouse: false,
      filterApartment: false,
      filterCity: undefined,
      filterBeds: undefined,
      filterBaths: undefined,
      filterDate: undefined
    };
  }
  changeDisplayType(index: number): void {
    const searchQuery = new URLSearchParams(this.props.location.search);
    if (index === 0) {
      searchQuery.set("displayType", "map");
    } else {
      searchQuery.set("displayType", "grid");
    }
    this.props.history.push(["/properties", searchQuery.toString()].join("?"));
    this.setState({ displayIndex: index });
  }
  mapsClickHandler(id: string): void {
    this.props.dataSet.set([id], "selected", "local");
  }
  mapsCloseHandler() {
    this.props.dataSet.set([], "selected", "local");
  }
  mediaURLAccessor(unit: unit, property: property): string {
    let result: string = "";
    // Prioritizes Unit Featured Image
    unit.media.forEach(media => {
      if (media.isFeatured) {
        result = media.handle;
      }
    });

    // If no Unit Featured Image is found, resorts to Property Featured Image as backup
    if (result === "" || unit.prioritizePropertyImages) {
      property.media.forEach(media => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });
    }
    return ["https://media.graphcms.com/resize=w:800/compress/", result].join(
      ""
    );
  }

  unitToGridItem(unit: unit, property: property, grid: Array<gridItem>) {
    let isCommercial: boolean;
    if (["retail", "office"].includes(unit.type.toLowerCase())) {
      isCommercial = true;
    } else {
      isCommercial = false;
    }
    const pricePerBed: number = Math.floor(unit.price / unit.bedrooms);
    const price = isCommercial ? pricePerBed : unit.price;
    let priceString: string = "";
    if (unit.price === 0) {
      priceString = `Contact Us`;
    } else if (isCommercial || unit.bedrooms === 1) {
      priceString = `$${unit.price}`;
    } else {
      priceString = `$${unit.price} (avg $${pricePerBed} / bed)`;
    }
    let detail: string = "";
    if (isCommercial) {
      detail = `${unit.type} • ${unit.squareFeet} Sq. Feet.`;
    } else {
      detail = `${unit.type} • ${unit.bedrooms} beds • ${unit.bathrooms} baths`;
    }
    const gridItem = (
      <Link
        key={unit.id}
        href
        to={["properties", property.id, unit.id].join("/")}
      >
        <Card className={Style.gridItem}>
          <CardPrimaryAction>
            {property.imageBanner ? (
              <div className={Style.cornerRibbon}>{property.imageBanner}</div>
            ) : (
              ""
            )}
            <CardMedia
              sixteenByNine
              style={{
                backgroundImage: `url(${this.mediaURLAccessor(unit, property)})`
              }}
            />
            <div style={{ padding: "1em" }}>
              <h2>{priceString}</h2>
              <h3>
                {property.address}, {property.city}
              </h3>
              <h3>{detail}</h3>
            </div>
          </CardPrimaryAction>
        </Card>
      </Link>
    );
    grid.push({
      jsx: gridItem,
      type: unit.type,
      price: price,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      date: unit.availabilityDate
    });
  }
  render() {
    if (this.props.data.loading === true) {
      return <Loading />;
    }
    if (this.props.data.error !== undefined) {
      return <div>{this.props.data.error.toString()}</div>;
    }

    let showCommercial: boolean = false;
    const initialSearchQuery = new URLSearchParams(this.props.location.search);
    if (initialSearchQuery.get("zoning") === "commercial") {
      showCommercial = true;
    }

    const cityOptions = [
      ...new Set(this.props.data.allProperties.map(property => property.city))
    ];

    const typeOptions: Array<string> = showCommercial
      ? ["Retail", "Office"]
      : ["House", "Apartment", "Townhouse"];

    const typeCheckboxes = typeOptions.map(type => (
      <Checkbox
        key={type}
        checked={this.state[["filter", type].join()] || false}
        onChange={evt =>
          this.setState({ [["filter", type].join()]: evt.target.checked })
        }
      >
        {type}
      </Checkbox>
    ));

    const properties = this.props.data.allProperties
      .filter(property => property.units.length > 0)
      .filter(property => {
        // By Zone
        const searchQuery = new URLSearchParams(this.props.location.search);
        if (property.zoning === "mixed") {
          return true;
        }
        return property.zoning.toLowerCase() === searchQuery.get("zoning");
      })
      .filter(property => {
        // By Type
        const unitTypeFilterState: Array<string> = property.units.map(
          unit => this.state[["filter", unit.type].join()]
        );
        const allUnitTypeFilterState = typeOptions.map(
          type => this.state[["filter", type].join()]
        );
        if (unitTypeFilterState.includes(true)) {
          return true;
        } else if (allUnitTypeFilterState.every(e => !e)) {
          return true;
        }
        return false;
      })
      .filter(property => {
        // By City
        if (!this.state.filterCity) {
          return true;
        }
        return property.city === this.state.filterCity;
      })
      .filter(property => {
        // By Bedrooms
        if (!this.state.filterBeds) {
          return true;
        }
        return property.units
          .map(u => u.bedrooms)
          .includes(Number(this.state.filterBeds));
      })
      .filter(property => {
        // By Bathrooms
        if (!this.state.filterBaths) {
          return true;
        }
        const numBaths = parseInt(this.state.filterBaths, 10);
        if (this.state.filterBaths === "1") {
          return property.units.map(u => u.bathrooms).includes(numBaths);
        }
        return numBaths <= Math.max(...property.units.map(u => u.bathrooms));
      })
      .filter(property => {
        if (!this.state.filterDate) {
          return true;
        } else if (moment(this.state.filterDate).isSameOrBefore(moment())) {
          return false;
        } else if (
          moment(this.state.filterDate).isAfter(moment().add(1, "y"))
        ) {
          return true;
        }
        return property.units
          .map(u =>
            moment(u.availabilityDate).isSameOrBefore(
              moment(this.state.filterDate)
            )
          )
          .includes(true);
      });

    // Grid View
    let grid: Array<gridItem> = [];
    properties
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .reverse()
      .forEach(property => {
        if (property.units.length > 0) {
          property.units.forEach(unit =>
            this.unitToGridItem(unit, property, grid)
          );
        }
      });

    // Filtering
    grid = grid
      .filter(gridItem => {
        // By Type
        const allUnitTypeFilterState = typeOptions.map(
          type => this.state[["filter", type].join()]
        );
        if (allUnitTypeFilterState.every(e => !e)) {
          return true;
        }
        return this.state[["filter", gridItem.type].join()];
      })
      .filter(gridItem => {
        // By Bedrooms
        if (!this.state.filterBeds) {
          return true;
        }
        return gridItem.bedrooms === Number(this.state.filterBeds);
      })
      .filter(gridItem => {
        // By Bathrooms
        if (!this.state.filterBaths) {
          return true;
        }
        const numBaths = parseInt(this.state.filterBaths, 10);
        return numBaths <= gridItem.bathrooms;
      })
      .filter(gridItem => {
        // By Availability Date
        if (!this.state.filterDate) {
          return true;
        } else if (moment(this.state.filterDate).isSameOrBefore(moment())) {
          return false;
        } else if (
          moment(this.state.filterDate).isAfter(moment().add(1, "y"))
        ) {
          return true;
        }
        return moment(gridItem.date).isSameOrBefore(
          moment(this.state.filterDate)
        );
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
      const property = properties.filter(
        p => p.id === this.props.dataSet.state.local.selected[0]
      )[0];
      if (property.units.length > 0) {
        property.units.forEach(unit =>
          this.unitToGridItem(unit, property, drawerGrid)
        );
      }
    }

    const dataView = [
      <div className={Style.map}>
        <MapDataView
          center={{
            lat: 43.465267,
            lng: -80.522608
          }}
          data={properties}
          onClick={id => this.mapsClickHandler(id)}
          onClose={() => this.mapsCloseHandler()}
          selected={
            this.props.dataSet.state.local.selected.length > 0
              ? this.props.dataSet.state.local.selected[0]
              : undefined
          }
        />
      </div>,
      <div className={Style.grid}>
        {grid.length > 0 ? (
          grid.map(gridItem => gridItem.jsx)
        ) : (
          <div>No Inventory Matches Your Search</div>
        )}
        <Icon className={Style.scrollIndicator}>expand_more</Icon>
      </div>
    ];
    return (
      <div className={Style.container}>
        <Drawer
          temporary
          open={this.props.dataSet.state.local.selected.length > 0}
          onClose={() => this.mapsCloseHandler()}
        >
          {drawerGrid.length > 0 ? (
            <div className={Style.drawerGrid}>
              {drawerGrid.map(gridItem => gridItem.jsx)}
            </div>
          ) : (
            ""
          )}
        </Drawer>
        <Drawer
          temporary
          open={this.state.filterMenuIsOpen}
          onClose={() => this.setState({ filterMenuIsOpen: false })}
        >
          <div className={Style.filterDrawer}>
            {showCommercial
              ? ""
              : [
                  <h3>Bedrooms</h3>,
                  <Select
                    className={Style.input}
                    box
                    placeholder="Any"
                    options={[1, 2, 3, 4, 5, 6, 7]}
                    value={this.state.filterBeds}
                    onChange={evt =>
                      this.setState({ filterBeds: evt.target.value })
                    }
                  />,
                  <h3>Bathrooms</h3>,
                  <Select
                    className={Style.input}
                    box
                    placeholder="Any"
                    options={["5+", "4+", "3+", "2+", "1"]}
                    value={this.state.filterBaths}
                    onChange={evt =>
                      this.setState({ filterBaths: evt.target.value })
                    }
                  />
                ]}
            <h3>City</h3>
            <Select
              className={Style.input}
              box
              placeholder="Anywhere"
              options={cityOptions}
              value={this.state.filterCity}
              onChange={evt => this.setState({ filterCity: evt.target.value })}
            />
            <h3>Type</h3>
            {typeCheckboxes}
            <br />
            <h3>Available By</h3>
            <DayPicker
              onDayClick={date => this.setState({ filterDate: date })}
              selectedDays={this.state.filterDate}
              className={Style.dayPicker}
            />
          </div>
        </Drawer>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <Button
                raised
                theme="secondary-bg on-primary"
                onClick={() =>
                  this.setState({
                    filterMenuIsOpen: !this.state.filterMenuIsOpen
                  })
                }
              >
                Filters
              </Button>
            </ToolbarSection>
            <ToolbarSection>
              <TabBar
                className={Style.tab}
                activeTabIndex={this.state.displayIndex}
                onChange={evt =>
                  this.changeDisplayType(Number(evt.target.value))
                }
              >
                <Tab>
                  <TabIcon>place</TabIcon>
                </Tab>
                <Tab>
                  <TabIcon>view_module</TabIcon>
                </Tab>
              </TabBar>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={this.state.sortByMenuIsOpen}
                  onClose={() => this.setState({ sortByMenuIsOpen: false })}
                  onSelected={evt =>
                    this.setState({ sortIndex: evt.detail.index })
                  }
                >
                  <MenuItem>Relevance</MenuItem>
                  <MenuItem>Price: Low to High</MenuItem>
                  <MenuItem>Price: High to Low</MenuItem>
                </Menu>

                <Button
                  raised
                  theme="secondary-bg on-primary"
                  onClick={() =>
                    this.setState({
                      sortByMenuIsOpen: !this.state.sortByMenuIsOpen
                    })
                  }
                >
                  Sort By
                </Button>
              </MenuAnchor>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        {dataView[this.state.displayIndex]}
      </div>
    );
  }
}

export default DataSet(query)(Properties);
