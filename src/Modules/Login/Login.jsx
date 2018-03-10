import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rmwc/Button';
import Style from './Login.css';

class Login extends Component {
  componentDidMount() {
    window.analytics.page('Login');
  }
  render() {
    return (
      <div className={ Style.container }>
        <div className={ Style.background } />
        <div className={ Style.modal }>
          <h1>Hey Friend!</h1>
          <p>
            Our team is working really hard to provide our tenants with the best possible
            experience. Soon, you will have unparalleled access to Atlas services in one
            easy to access place. In the meantime, below you will find all of our old forms.
          </p>
          <h1>Forms</h1>
          <div className={ Style.buttonList }>
            <a href="https://atlaspropertygroup.typeform.com/to/O5lZDb" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Sublet</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/Gqtv2c" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Rent Receipt</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/wOt21e" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Maintenance</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/htMAE0" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Staying/Leaving</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/VTOzC1" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Cleaning Service</Button></a>
            <a href="https://atlaspropertygroup.typeform.com/to/stxutk" target="_blank" rel="noopener noreferrer"><Button className={ Style.button }>Deficiency Checklist</Button></a>
          </div>
          <div className={ Style.backButton }>
            <Link to="/"><Button className={ Style.button }>Go Back</Button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
