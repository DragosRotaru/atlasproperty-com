import React from 'react';
import Typist from 'react-typist';
import Astronaut from '../../Images/astronaut.svg';
import HouseSearching from '../../Images/house_searching.svg';
import Style from './Company.css';

const cursorSettings = {
  show: false,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
};

const Company = () => ([
  <div key="1" className={ Style.background } />,
  <div key="2" className={ Style.backgroundSecond } />,
  <div key="3" className={ Style.content }>
    <center>
      <Typist className={ Style.heroText } cursor={ cursorSettings }>
        <h1 className={ Style.title } >
          <span className={ Style.colorAccentText }>{ '#' }
          </span> Join Our World
        </h1>
      </Typist>
      <div className={ Style.grid }>
        <div className={ Style.item }>
          <h2>Lorem Ipsume</h2>
          <p>
             At Atlas, we strive to ensure that all of our tenants are taken care of
             equally and treated with respect. Strong tenant relationships are what
             foster a strong micro-community within each building. When it comes time
             for tenants to move out, we know their experience with Atlas was pleasing
             and memorable.
          </p>
        </div>
        <div className={ Style.item }>
          <img src={ Astronaut } className={ Style.astronaut } alt="Astronaut" />
        </div>
        <div className={ Style.item }>
          <img src={ HouseSearching } className={ Style.house_searching } alt="Housing Search" />
        </div>
        <div className={ Style.item }>
          <h2>Lorem Ipsum</h2>
          <p>
            Our reputation on the street precedes our notion of
            “filling buildings before they’re available.”
            Students know they’ll be looked after while
            staying with Atlas Property Group, the number one
            choice in student rentals in Waterloo.
          </p>
        </div>
      </div>
    </center>
  </div>,
]);

export default Company;
