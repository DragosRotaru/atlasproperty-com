import React, { Component } from 'react';
import Typist from 'react-typist';
import { Button } from 'rmwc/Button';
import NaturalLanguageForm from '../NaturalLanguageForm/NaturalLanguageForm';
import formContent from './formContentNew';
import Style from './Tenants.css';

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingTyped: false,
    };
  }
  componentDidMount() {
    window.analytics.page('Tenants');
  }
  render() {
    return ([
      <div key="hero" className={ Style.hero }>
        <center>
          <div className={ Style.header }>
            <Typist
              cursor={ { show: false } }
              onTypingDone={ () => this.setState({ headingTyped: true }) }
            ><h1>Welcome to Atlas <span role="img" aria-label="smiley">😃</span></h1><br />
            </Typist>
            <br />
          </div>
          <div className={ Style.heroContent }>
            { this.state.headingTyped ? <NaturalLanguageForm tree={ formContent } /> : '' }
          </div>
        </center>
      </div>,
      <div key="background" className={ Style.background } />,
      <div key="backgroundSecond" className={ Style.backgroundSecond } />,
      <div key="container" className={ Style.container } id="container">
        <div key="content" className={ Style.content } id="content">
          <h1>Resources</h1><br />
          <p>
            Below you will find relevant information and links.
            Our team is working hard to provide our tenants with the best possible
            experience – If something isn't working, please email us at info@atlasproperty.com.
          </p><br />
          <h2>Important Info</h2><br />
            <ul>
              <li>Fire Department – <a href="tel:"></a></li>
              <li>Blah Blah – <a href="tel:"></a></li>
              <li>Blah Blqh</li>
              <li>Blah Blah</li>
            </ul>
          <br />
          <h2>Links</h2>
          <br />
          <div className={ Style.buttonList }>
            <a href="" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>FAQ</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/Gqtv2c" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Rent Receipt</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/wOt21e" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Maintenance</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/htMAE0" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Staying/Leaving</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/VTOzC1" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Cleaning Service</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/stxutk" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Deficiency Checklist</Button></a>
          </div>
        </div>
      </div>,
    ]);
  }
}

export default Tenants;
