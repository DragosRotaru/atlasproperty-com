import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'rmwc/Button';
import { Elevation } from 'rmwc/Elevation';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
} from 'rmwc/Toolbar';

import { List, ListItem, ListItemText } from 'rmwc/List';
import Style from './Header.css';
import logo from '../../Images/Logo.svg';

class Header extends Component {
  render() {
    return (
      <Elevation z={ 3 } className={ Style.header }>
        <Toolbar className={ Style.toolbar }>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <Link to="/"><img src={ logo } className={ Style.logo } alt="Atlas Property Group" /></Link>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <List onClick={ this.toggleMenu } className={ Style.list } tag="nav">
                <NavLink to="/" exact activeClassName={ Style.activeNavLink }>
                  <ListItem className={ Style.listItem }>
                    <ListItemText className={ Style.listItemText }>Home</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="/properties" activeClassName={ Style.activeNavLink }>
                  <ListItem className={ Style.listItem }>
                    <ListItemText className={ Style.listItemText }>Properties</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="/about" activeClassName={ Style.activeNavLink }>
                  <ListItem className={ Style.listItem }>
                    <ListItemText className={ Style.listItemText }>About</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="/contact" activeClassName={ Style.activeNavLink }>
                  <ListItem className={ Style.listItem }>
                    <ListItemText className={ Style.listItemText }>Contact</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="/login" activeClassName={ Style.activeNavLink }>
                  <ListItem className={ Style.listItem }>
                    <Button raised theme="secondary-bg text-primary-on-secondary" className={ Style.loginButton }>Login</Button>
                  </ListItem>
                </NavLink>
              </List>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </Elevation>
    );
  }
}

export default Header;
