import React from 'react';
import Typist from 'react-typist';
import Style from './Tenants.css';

const cursorSettings = {
  show: false,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
};

const Tenants = () => ([
  <div key="1" className={ Style.background } />,
  <div key="2" className={ Style.backgroundSecond } />,
  <div key="3" className={ Style.content }>
    <center>
      <Typist className={ Style.heroText } cursor={ cursorSettings }>
        <h1 className={ Style.title } >
          <span className={ Style.colorAccentText }>{ '#' }
          </span>Why Choose Atlas
        </h1>
      </Typist>
      <div className={ Style.grid }>
        <div className={ Style.item }>
          <h2>Incredible Selection</h2>
          <p>Atlas has the best selection of properties, with over 20 convenient locations in Waterloo perfect for Wilfrid Laurier and University of Waterloo students and unique Stratford accommodation for Waterloo’s Digital Innovation campus.</p>
        </div>
        <div className={ Style.item }>
          <h2>Professional Management</h2>
          <p>Enjoy the peace-of-mind of knowing that our friendly, experienced staff are available to ensure your needs are met and expectations exceeded, 24/7!</p>

        </div>
        <div className={ Style.item }>
          <h2>All Inclusive Options</h2>
                      <p>Many of our buildings offer tenants a completely turn-key living experience, with utilities included, fully-furnished suites, great amenities, and wireless internet.</p>

        </div>
        <div className={ Style.item }>
          <h2>Amazing Deals</h2>
          <p>Living on a student budget can be challenging; that’s why we’re always looking for ways to save you money - like cash-back offers and short-term leases!</p>
        </div>
      </div>
    </center>
  </div>,
]);

export default Tenants;
