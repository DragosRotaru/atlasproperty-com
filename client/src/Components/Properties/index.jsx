import * as typeformEmbed from "@typeform/embed";
import * as React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { TabBar, Tab } from "@rmwc/tabs";
import { Drawer, DrawerContent } from "@rmwc/drawer";
import { Select } from "@rmwc/select";
import { Checkbox } from "@rmwc/checkbox";
import { Card, CardPrimaryAction, CardMedia } from "@rmwc/card";
import { Menu, MenuItem, MenuSurfaceAnchor } from "@rmwc/menu";
import { Button } from "@rmwc/button";
import { Icon } from "@rmwc/icon";
import { Toolbar, ToolbarRow, ToolbarSection } from "@rmwc/toolbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment";
import { Loading } from "../loading";
import { MapDataView } from "../map-data-view";
import Style from "./style.css";

const query = gql`
  {
    allProperties {
      id
      location
      address
      city
      zoning
      features
      priority
      isFeatured
      imageBanner
      media {
        handle
        isFeatured
        priority
      }
      units {
        id
        type
        price
        bedrooms
        bathrooms
        description
        features
        utilitiesIncluded
        availabilityDate
        prioritizePropertyImages
        media {
          handle
          isFeatured
          priority
        }
      }
    }
  }
`;

type media = {
  handle: string,
  isFeatured: boolean,
  priority: number,
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
  media: Array<media>,
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
  units: Array<unit>,
};

type gridItem = {
  jsx: React.Node,
  type: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  date: string,
};

type Props = {
  data: {
    allProperties: Array<property>,
    error: {},
    loading: boolean,
  },
  history: {
    push: (x: string) => void,
  },
  location: {
    search: string,
  },
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
  filterDate: Date | void,
};

class PropertiesWithoutData extends React.Component<Props, State> {
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
      filterDate: undefined,
      selected: undefined,
    };
    this.changeDisplayType = this.changeDisplayType.bind(this);
    this.closeFilterMenu = this.closeFilterMenu.bind(this);
    this.mapsClickHandler = this.mapsClickHandler.bind(this);
    this.mapsCloseHandler = this.mapsCloseHandler.bind(this);
    this.mediaURLAccessor = this.mediaURLAccessor.bind(this);
    this.unitToGridItem = this.unitToGridItem.bind(this);
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
  closeFilterMenu() {
    this.setState({ filterMenuIsOpen: false });
  }
  mapsClickHandler(id: string): void {
    this.setState({ selected: id });
  }
  mapsCloseHandler() {
    this.setState({ selected: undefined });
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
      detail = `${unit.type}`;
    } else {
      detail = `${unit.type} • ${unit.bedrooms} beds • ${unit.bathrooms} baths`;
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
                backgroundImage: `url(${this.mediaURLAccessor(
                  unit,
                  property
                )})`,
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
      date: unit.availabilityDate,
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
      ...new Set(this.props.data.allProperties.map(property => property.city)),
    ];
    cityOptions.push("Anywhere");

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
        if (!this.state.filterCity || this.state.filterCity === "Anywhere") {
          return true;
        }
        return property.city === this.state.filterCity;
      })
      .filter(property => {
        // By Bedrooms
        if (!this.state.filterBeds || this.state.filterBeds === "Any") {
          return true;
        }
        return property.units
          .map(u => u.bedrooms)
          .includes(Number(this.state.filterBeds));
      })
      .filter(property => {
        // By Bathrooms
        if (!this.state.filterBaths || this.state.filterBaths === "Any") {
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
        if (!this.state.filterBeds || this.state.filterBeds === "Any") {
          return true;
        }

        return gridItem.bedrooms === Number(this.state.filterBeds);
      })
      .filter(gridItem => {
        // By Bathrooms
        if (!this.state.filterBaths || this.state.filterBaths === "Any") {
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
    if (this.state.selected) {
      const property = properties.filter(p => p.id === this.state.selected)[0];
      if (property.units.length > 0) {
        property.units.forEach(unit =>
          this.unitToGridItem(unit, property, drawerGrid)
        );
      }
    }

    const dataView = [
      <div className={Style.map} key="map">
        <MapDataView
          center={{
            lat: 43.465267,
            lng: -80.522608,
          }}
          data={properties}
          onClick={id => this.mapsClickHandler(id)}
          onClose={() => this.mapsCloseHandler()}
          selected={this.state.selected}
        />
      </div>,
      <div className={Style.grid} key="grid">
        {grid.length > 0 ? (
          grid.map(gridItem => gridItem.jsx)
        ) : (
          <div>No Inventory Matches Your Search</div>
        )}
        <Icon className={Style.scrollIndicator}>expand_more</Icon>
      </div>,
    ];
    return [
      <div key="main" className={Style.container}>
        <Toolbar theme="primaryBg">
          <ToolbarRow>
            <ToolbarSection alignStart>
              <Button
                raised
                theme="secondaryBg"
                onClick={() =>
                  this.setState({
                    filterMenuIsOpen: !this.state.filterMenuIsOpen,
                  })
                }
              >
                Filters
              </Button>
            </ToolbarSection>
            <ToolbarSection>
              <TabBar
                className={Style.tab}
                theme={["primaryBg", ""]}
                activeTabIndex={this.state.displayIndex}
                onActivate={evt =>
                  this.changeDisplayType(Number(evt.detail.index))
                }
              >
                <Tab icon="place" />
                <Tab icon="view_module" />
              </TabBar>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <MenuSurfaceAnchor>
                <Menu
                  open={this.state.sortByMenuIsOpen}
                  onClose={() => this.setState({ sortByMenuIsOpen: false })}
                  onSelect={evt =>
                    this.setState({ sortIndex: evt.detail.index })
                  }
                >
                  <MenuItem className={Style.menuItem}>Relevance</MenuItem>
                  <MenuItem className={Style.menuItem}>
                    Price: Low to High
                  </MenuItem>
                  <MenuItem className={Style.menuItem}>
                    Price: High to Low
                  </MenuItem>
                </Menu>

                <Button
                  raised
                  theme={["secondaryBg", "onPrimary"]}
                  onClick={() =>
                    this.setState({
                      sortByMenuIsOpen: !this.state.sortByMenuIsOpen,
                    })
                  }
                >
                  Sort By
                </Button>
              </MenuSurfaceAnchor>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        {dataView[this.state.displayIndex]}
      </div>,
      <Drawer
        key="results"
        modal
        open={this.state.selected}
        onClose={() => this.mapsCloseHandler}
        className={Style.drawer}
      >
        <DrawerContent>
          {drawerGrid.length > 0 ? (
            <div className={Style.drawerGrid}>
              {drawerGrid.map(gridItem => gridItem.jsx)}
            </div>
          ) : (
            ""
          )}
        </DrawerContent>
      </Drawer>,
      <Drawer
        key="filter"
        modal
        open={this.state.filterMenuIsOpen}
        onClose={() => console.log("yes")}
        className={Style.drawer}
      >
        <DrawerContent>
          <div className={Style.filterDrawer}>
            {showCommercial
              ? ""
              : [
                  <h3 key="bed_title">Bedrooms</h3>,
                  <Select
                    key="bed_select"
                    className={Style.input}
                    placeholder="Any"
                    options={[1, 2, 3, 4, 5, 6, 7, "Any"]}
                    value={this.state.filterBeds}
                    onChange={evt =>
                      this.setState({ filterBeds: evt.target.value })
                    }
                  />,
                  <h3 key="bath_title">Bathrooms</h3>,
                  <Select
                    key="bath_select"
                    className={Style.input}
                    placeholder="Any"
                    options={["5+", "4+", "3+", "2+", "1", "Any"]}
                    value={this.state.filterBaths}
                    onChange={evt =>
                      this.setState({ filterBaths: evt.target.value })
                    }
                  />,
                ]}
            <h3>City</h3>
            <Select
              className={Style.input}
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
        </DrawerContent>
      </Drawer>,
    ];
  }
}

export const Properties = graphql(query)(PropertiesWithoutData);
