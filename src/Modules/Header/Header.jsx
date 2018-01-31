import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection } from 'rmwc/Toolbar';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { List, ListItem, ListItemText } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';
import Style from './Header.css';
import logo from '../../Images/Logo.svg';
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.toggleMenu = () => {
      this.setState({ open: !this.state.open });
    };
    this.closeMenu = () => {
      this.setState({ open: false });
    };
  }
  render() {
    const menu = ([
      <NavLink key="/" to="/" exact activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Home</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/tenants" to="/tenants" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Tenants</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/owners" to="/owners" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Owners</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/company" to="/company" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Company</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/properties" to="/properties" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Properties</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/contact" to="/contact" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <ListItemText className={ Style.listItemText }>Contact</ListItemText>
        </ListItem>
      </NavLink>,
      <NavLink key="/login" to="/login" activeClassName={ Style.activeNavLink }>
        <ListItem >
          <Button raised theme="secondary-bg text-primary-on-secondary" className={ Style.loginButton }>Login</Button>
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
      <AnnouncementBar key="announcementBar" />,
      <Drawer
        temporary
        key="drawer"
        open={ this.state.open }
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
