import React, { Component } from "react";
import Typist from "react-typist";
import { Button } from "@rmwc/button";
import { Link } from "react-router-dom";
import Style from "./style.css";
import { config } from "../../config";

type State = {
  headingTyped: boolean,
};

export class Tenants extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      headingTyped: false,
    };
  }
  componentDidMount() {}
  render() {
    return [
      <div key="hero" className={Style.hero}>
        <center>
          <div className={Style.header}>
            <Typist
              cursor={{ show: false }}
              onTypingDone={() => this.setState({ headingTyped: true })}
            >
              <h1>Welcome to Atlas</h1>
              <br />
            </Typist>
            <br />
          </div>
        </center>
      </div>,
      <div key="anchor" id="anchor" />,
      <div key="background" className={Style.blueBackground}>
        <div key="backgroundSecond" className={Style.whiteForeground}>
          <div key="container" className={Style.content}>
            <div key="content" className={Style.text}>
              <h1>Resources</h1>
              <br />
              <p>
                Our team is working hard to provide our tenants with the best
                possible experience – If something isnt working, please email us
                at the following addresses:
              </p>
              <br />
              <ul>
                <li>
                  Administrative Support – 
                  <a href="mailto:admin@atlasproperty.com">
                    admin@atlasproperty.com
                  </a>
                </li>
                <br />
                <li>
                  Maintenance Support – 
                  <a href="mailto:maintenance@atlasproperty.com">
                    maintenance@atlasproperty.com
                  </a>
                </li>
                <br />
                <li>
                  Payments Support – 
                  <a href="mailto:collections@atlasproperty.com">
                    collections@atlasproperty.com
                  </a>
                </li>
              </ul>
              <br />
              <h2>Forms</h2>
              <br />
              <div className={Style.buttonList}>
                <a
                  href="https://media.graphcms.com/YSyGzmRyTU6vNUI4AwOf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className={Style.button}>Sublet Form</Button>
                </a>
                <Link to={`/${config.models.rentReceipts.name}`}>
                  <Button className={Style.button}>Rent Receipt</Button>
                </Link>
                <a
                  href="https://atlaspropertygroup.typeform.com/to/wOt21e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className={Style.button}>Maintenance</Button>
                </a>
                <a
                  href="https://atlaspropertygroup.typeform.com/to/stxutk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className={Style.button}>Deficiency Checklist</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ];
  }
}
