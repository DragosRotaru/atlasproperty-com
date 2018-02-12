import React from 'react';
import Typist from 'react-typist';
import Style from './Owners.css';

const cursorSettings = {
  show: false,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
};

const Owners = () => ([
  <div key="1" className={ Style.background } />,
  <div key="2" className={ Style.backgroundSecond } />,
  <div key="3" className={ Style.content }>
    <center>
      <Typist className={ Style.heroText } cursor={ cursorSettings }>
        <h1 className={ Style.title } >
          <span className={ Style.colorAccentText }>{ '#' }
          </span> Atlas Management Solutions
        </h1>
      </Typist>
      <div className={ Style.grid }>
        <div className={ Style.item }>
          <p>
            Being a landlord doesn’t have to entail first-person management. Depending on the size of your portfolio, you may wish to hire a professional manager rather than handle all the management duties yourself. And, while you as property owner are ultimately responsible for ensuring a manager does a good job of operation the property and maintaining it in a decent condition, a manager can make your life easier by taking care of business you would rather not have to address.
          </p>
          <br /><br /><br />
          <p>

            Choosing suitable living accommodations can be a challenging task for students. Not all buildings are the same, but one thing is for sure – each building is its own community. At Atlas, we strive to ensure that all of our tenants are taken care of equally and treated with respect. Strong tenant relationships are what foster a strong micro-community within each building. When it comes time for tenants to move out, we know their experience with Atlas was pleasing and memorable. Our reputation on the street precedes our notion of “filling buildings before they’re available.” Students know they’ll be looked after while staying with Atlas Property Group, the number one choice in student rentals in Waterloo.
          </p>
        </div><br /><br /><br />
        <div className={ Style.item }>
          <h2>Atlas Development</h2>
          <p>
            Atlas Property Developments brings a unique blend of construction and financial experience to execute seamless project developments. Our primary commitments to the investor: quality craftsmanship, scheduled completion, and maximizing the project’s return for resale or renting. With a background in student apartment buildings and experience in multi-million dollar developments, Atlas Property Group Inc. can handle projects on any scale.
          </p>
        </div>
      </div>
    </center>
  </div>,
]);

export default Owners;
