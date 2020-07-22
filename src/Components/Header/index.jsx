import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { TopAppBar, TopAppBarRow, TopAppBarSection } from "@rmwc/top-app-bar";
import { Drawer, DrawerHeader, DrawerContent } from "@rmwc/drawer";
import { List, ListItem, ListItemText } from "@rmwc/list";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";

import { AnnouncementBar } from "../announcement-bar";
import logo from "../../static/Logo.svg";
import Style from "./style.css";

export class Header extends Component {
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
    const menu = [
      {
        title: "Residential",
        to: "/properties?zoning=residential",
      },
      {
        title: "Commercial",
        to: "/properties?zoning=commercial",
      },
      {
        title: "Development",
        to: "/development",
      },
      {
        title: "Management",
        to: "/management",
      },
      {
        title: "Team",
        to: "/team",
      },
      {
        title: "Contact",
        to: "/contact",
      },
      {
        title: "Tenants",
        to: "/tenants",
      },
    ];

    return [
      <Elevation key="toolbar" z={10} className={Style.container}>
        <TopAppBar className={Style.bar}>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <Link to="/">
                <img
                  src={logo}
                  className={Style.logo}
                  alt="Atlas Property Group"
                />
              </Link>
            </TopAppBarSection>
            <TopAppBarSection alignEnd tag="nav">
              <List className={Style.menu}>
                {menu.map(item => (
                  <NavLink
                    key={item.title}
                    to={item.to}
                    activeClassName={Style.activeNavLink}
                  >
                    <ListItem className={Style.item}>{item.title}</ListItem>
                  </NavLink>
                ))}
                <ListItem>
                  <Button
                    raised
                    onClick={this.toggleMenu}
                    theme={["secondaryBg", "textPrimaryOnSecondary"]}
                    className={Style.button}
                  >
                    Menu
                  </Button>
                </ListItem>
              </List>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
      </Elevation>,
      <AnnouncementBar key="AnnouncementBar" />,
      <Drawer
        modal
        key="drawer"
        open={this.state.menuIsOpen}
        onClose={this.closeMenu}
      >
        <DrawerHeader />
        <DrawerContent className={Style.nav}>
          <List onClick={this.toggleMenu}>
            {menu.map(item => (
              <NavLink
                key={item.title}
                to={item.to}
                activeClassName={Style.activeNavLink}
              >
                <ListItem>{item.title}</ListItem>
              </NavLink>
            ))}
          </List>
        </DrawerContent>
      </Drawer>,
    ];
  }
}
