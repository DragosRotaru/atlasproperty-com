import React, { Component } from 'react';
import Typist from 'react-typist';
import Team from '../Team/Team';
import Style from './Company.css';

const cursorSettings = {
  show: false,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
};

class Company extends Component {
  componentDidMount() {
    window.analytics.page('Company');
  }
  render() {
    return ([
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
              <p>
                Atlas Property Group Inc. is Waterloo Region’s leading property management firm specializing in student housing development.  Our team of professional staff offers a wealth of experience in finance, maintenance, customer service and marketing to ensure your investment is managed to the highest standard of care with a focus on maximizing profits and delivering measurable results. We provide 24 hour on-call services for tenants, internal building cleaning, internal building and property maintenance and professional financial management. Our clients enjoy comfort knowing their investments are taken care of in full by our diverse business model.
              </p>
              <br /><br /><br />
              <p>
                In an industry saturated with small-scale management providers, Atlas management has proven to be a strong leader by setting the bar in online financial reporting and maintenance comprehension.  All investors have two aspects of utmost importance: consistent returns and minimizing costs. Accelerating in these domains has given Atlas the edge to be the one of the largest third-party providers in quality student accommodations in Waterloo.
              </p><br /><br /><br />
              <p>By combining our theory of strong money management and internal maintenance, Atlas engages the student demographic to live in a social environment that sparks the inner-community of each building. Providing safe places to meet with other students and participate in events such as the Atlas Annual Fall BBQ, food drives, and clothing donation drives. Every term gives us sought-after results: high retention rates and reduced damages. We have found that social involvement reaps many rewards, including larger returns, higher retention and a positive reputation in the community.</p>
            </div><br /><br /><br />
            <div className={ Style.item }>
              <h2>Our Team</h2>
              <p>
                More than just another property management company
                We are a team of caring and hardworking individuals committed to improve the Atlas experience for each and every customer we service. At Atlas Property, we pride ourselves in a team that seeks to cultivate relationships with our tenants, property owners and partners at the highest level of professionalism and with the greatest care to customer satisfaction.
              </p>
            </div>
          </div>
          <Team />
        </center>
      </div>,
    ]);
  }
}

export default Company;
