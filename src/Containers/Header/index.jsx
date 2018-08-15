// @flow
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// UI Imports
import { Toolbar, ToolbarRow, ToolbarSection } from 'rmwc/Toolbar';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { List, ListItem, ListItemText } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';

import AnnouncementBar from '../AnnouncementBar';
import logo from '../../Static/Logo.svg';
import Style from './style.css';


class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuIsOpen: false,
    };
    this.toggleMenu = () => {
      this.setState({ menuIsOpen: !this.state.menuIsOpen });
    };
    this.closeMenu = () => {
      this.setState({ menuIsOpen: false });
    };
  }
  render() {
    const menu = ([
      <NavLink key="/properties?zoning=residential" to="/properties?zoning=residential" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Find A Place</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/properties?zoning=commercial" to="/properties?zoning=commercial" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Commercial Spaces</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/development" to="/development" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Development</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/management" to="/management" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Management</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/team" to="/team" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Team</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/contact" to="/contact" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Contact</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/tenants" to="/tenants" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Tenants</ListItemText>
        </ListItem>
      </NavLink>,
    ]);

    return ([
      <Elevation key="toolbar" z={ 3 } className={ Style.header }>
        <Toolbar className={ Style.toolbar }>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <Link to="/"><img src={ logo } className={ Style.logo } alt="Atlas Property Group" /></Link>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <List className={ Style.list } tag="nav">
                { menu }
                <ListItem >
                  <Button
                    raised
                    onClick={ this.toggleMenu }
                    theme="secondary-bg text-primary-on-secondary"
                    className={ Style.menuButton }
                  >Menu
                  </Button>
                </ListItem>
              </List>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </Elevation>,
      <AnnouncementBar key="AnnouncementBar" />,
      <Drawer
        temporary
        key="drawer"
        open={ this.state.menuIsOpen }
        onClose={ this.closeMenu }
      >
        <DrawerHeader />
        <DrawerContent className={ Style.nav } >
          <List onClick={ this.toggleMenu }>
            { menu }
          </List>
        </DrawerContent>
      </Drawer>,
    ]);
  }
}

export default Header;
