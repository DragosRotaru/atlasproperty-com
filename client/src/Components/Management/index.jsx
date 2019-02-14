import React, { Component } from "react";
import statisticsSVG from "./statistics.svg";
import dataSVG from "./data.svg";
import agreementSVG from "./agreement.svg";
import Style from "./style.css";

export class Management extends Component {
  render() {
    return (
      <div className={Style.container}>
        <div key="hero" className={Style.hero}>
          <h1>Property Management</h1>
        </div>
        <div key="background" className={Style.blueBackground}>
          <div className={Style.whiteForeground}>
            <div className={Style.title}>
              <h1>What We Do</h1>
            </div>
            <div className={Style.content}>
              <div>
                <p>
                  As a full-service residential and commercial property
                  management company, Atlas Property Group understands the
                  importance of maximizing the performance of your real estate
                  investment.
                  <br />
                  <br />
                  With the investment goals of our clients in mind, we
                  specialize in providing detailed financial analytics on asset
                  valuation and ongoing investment performance reviews.
                  <br />
                  <br />
                  Our unique approach, integrated operating capabilities, and
                  successful track record, make Atlas Property Group the perfect
                  strategic partner in creating value through real estate
                  investments.
                </p>
              </div>
              <div className={Style.graphics}>
                <img src={dataSVG} alt="data" />
              </div>
              <div className={Style.graphics}>
                <img src={statisticsSVG} alt="statistics" />
              </div>
              <div>
                <p>
                  Our organizational commitment to building strong relationships
                  with both owners and tenants, allows us to develop, and
                  implement, highly informed management strategies that ensure
                  your investment generates superior returns.
                  <br />
                  <br />
                  Our team of dedicated professionals possess a wealth of
                  expertise in financial management, marketing, building
                  operations, and customer service.
                  <br />
                  <br />
                  Over time, we have developed the systems and controls required
                  to provide our clients with the highest level of service
                  possible.
                  <br />
                  <br />
                  <br />
                  <br />
                </p>
              </div>
              <div>
                <h2>Our Services</h2>
                <ul>
                  <li>Business and capital planning</li>
                  <li>Property Management</li>
                  <li>Project Management</li>
                  <li>Tenant Help Line</li>
                  <li>Development</li>
                  <li>Marketing</li>
                  <li>Leasing</li>
                </ul>
                <br />
                <br />
              </div>
              <div className={Style.graphics}>
                <img src={agreementSVG} alt="agreement" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
