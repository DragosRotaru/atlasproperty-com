// @flow
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// UI Imports
import { Toolbar, ToolbarRow, ToolbarSection } from 'rmwc/Toolbar';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { List, ListItem, ListItemText } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';

import AnnouncementBar from '../../Modules/AnnouncementBar/AnnouncementBar';
import logo from '../../Static/Logo.svg';
import Style from './Header.css';


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
      <NavLink key="/properties" to="/properties" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Find A Place</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/solutions" to="/solutions" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Property Solutions</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/contact" to="/contact" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Get In Touch</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/tenants" to="/tenants" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <Button raised theme="secondary-bg text-primary-on-secondary" className={ Style.loginButton }>For Tenants</Button>
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
      <AnnouncementBar />,
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
