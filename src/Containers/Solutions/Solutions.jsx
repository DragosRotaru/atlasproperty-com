import React, { Component } from 'react';
import Team from '../Team/Team';
import growing from './growing.svg';
import analytics from './analytics.svg';
import houseSearching from './house-searching.svg';
import Style from './Solutions.css';

class Solutions extends Component {
  componentDidMount() {
    window.analytics.page('Owners');
  }
  render() {
    return ([
      <div key="hero" className={ Style.hero }>
        <h1>Atlas Property Group</h1>
      </div>,
      <div key="background" className={ Style.blueBackground }>
        <div className={ Style.whiteForeground }>
          <div className={ Style.content }>
            <div className={ Style.text }>
              <div>
                <h1>What We Do</h1>
                <p>As a full-service residential and commercial property management company,
                  Atlas Property Group understands the importance of maximizing the performance
                  of your real estate investment.With the investment goals of our clients in mind,
                  we specialize in providing detailed financial analytics on asset valuation and
                  ongoing investment performance reviews.Our unique approach, integrated operating
                  capabilities, and successful track record, make Atlas Property Group the perfect
                  strategic partner in creating value through real estate investments.
                </p>
              </div>
              <div>
                <img src={ analytics } className="App-logo" alt="logo" />
              </div>
              <div>
                <img src={ growing } className="App-logo" alt="logo" />
              </div>
              <div>
                <br /><br />
                <p>Our organizational commitment to building strong relationships with both
                  owners and tenants, allows us to develop, and implement, highly informed
                  management strategies that ensure your investment generates superior returns.
                  Our team of dedicated professionals possess a wealth of expertise in financial
                  management, marketing, building operations, and customer service.
                  Over time, we have developed the systems and controls required to
                  provide our clients with the highest level of service possible.
                </p>
              </div>
              <div>
                <h1>Our Services</h1>
                <ul>
                  <li>Business and capital planning</li>
                  <li>Property Management</li>
                  <li>Project Management</li>
                  <li>Development</li>
                  <li>Marketing</li>
                  <li>Leasing</li>
                  <li>24/7 Tenant Help Line</li>
                </ul>
              </div>
              <div>
                <img src={ houseSearching } className="App-logo" alt="logo" />
                <br /><br /><br /><br />
                <p>We are confident that our market expertise, commitment, and passion as a
                  strategic property management partner will create value for your student housing,
                  multi-residential, office, or retail asset. A more detailed overview
                  of our organization and services in provided in this proposal.
                </p>
              </div>
            </div>
            <center><h1>Our Staff</h1><br /><br /><br /></center>
          </div>
        </div>
        <Team className={ Style.team } />
      </div>,
    ]);
  }
}

export default Solutions;
