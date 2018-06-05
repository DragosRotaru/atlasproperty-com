import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rmwc/Button';
import Style from './Home.css';

import FeaturedProperties from '../FeaturedProperties/FeaturedProperties';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={ Style.container }>
        <div className={ Style.content }>
          <div className={ Style.left }>
            <h1 className={ Style.heading }>
              I'm looking for a smart <br />place to rent.
            </h1>
            <ul className={ Style.list }>
              <li>Safe, secure, and clean.</li>
              <li>Professional and personable service.</li>
              <li>Personal hospitality plans.</li>
            </ul>
            <Link to="/properties">
              <Button
                raised
                theme="secondary-bg text-primary-on-secondary"
                className={ Style.button }
              >Atlas Helps You Find It.
              </Button>
            </Link>
          </div>
          <div className={ Style.right }>
            <h1 className={ Style.heading }>
              I'm looking for sound managment.
            </h1>
            <ul className={ Style.list }>
              <li>Comprehensive asset management.</li>
              <li>Tenant satisfaction occupancy model.</li>
              <li>Proactive servicing and maintenance.</li>
            </ul>
            <Link to="solutions">
              <Button
                raised
                theme="secondary-bg text-primary-on-secondary"
                className={ Style.button }
              >Atlas Helps You Manage It.
              </Button>
            </Link>
          </div>
        </div>
        <div className={ Style.featured }>
          <h1 className={ Style.heading }>
            Featured Properties
          </h1>
          <FeaturedProperties />
        </div>
      </div>
    );
  }
}

export default Home;
