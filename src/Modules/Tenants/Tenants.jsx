import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Typist from 'react-typist';

import Style from './Tenants.css';

const cursorSettings = {
  show: true,
  blink: true,
  element: '|',
  hideWhenDone: false,
};

class Tenants extends Component {
  render() {
    return (
      <div className={ Style.container }>
        <Typist className={ Style.heroText } cursor={ cursorSettings }>
          Find Your <Link to="/" href className={ Style.colorAccentUnderline }>Happy Place</Link>
        </Typist>
        <h1>Lorem Ipsum</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum
        </p>
      </div>
    );
  }
}

export default Tenants;
