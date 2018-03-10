import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import Map from '../Map/Map';
import Variables from '../../Variables.css';
import Style from './Contact.css';

class Contact extends Component {
  componentDidMount() {
    window.analytics.page('Contact');
  }
  render() {
    return (
      <div className={ Style.container }>
        <Map />
        <div className={ Style.content } >
          <center>
            <h1>Get In Touch</h1>
            <a href="tel:5197457999"><h4>(519) 745 7999</h4></a>
            <a href="mailto:contact@rotaru.co"><h4>info@atlasproperty.com</h4></a>
            <a href="https://goo.gl/maps/45uubqb7nnz" target="_blank" rel="noopener noreferrer">
              <h4>1 King Street North Waterloo <br />
                3rd floor
              </h4>
            </a>
            <h4>
              Open 9am – 5pm <br />
              Weekend by appointment only
            </h4>
            <SocialIcon className={ Style.social } url="https://twitter.com/atlas_property" color={ Variables.colorAccent } />
            <SocialIcon className={ Style.social } url="https://www.instagram.com/atlas_property/" color={ Variables.colorAccent } />
            <SocialIcon className={ Style.social } url="https://www.facebook.com/atlas.property.group.inc/" color={ Variables.colorAccent } />
            <SocialIcon className={ Style.social } url="https://ca.linkedin.com/company/atlas-property-group-inc-" color={ Variables.colorAccent } />
          </center>
        </div>

      </div>
    );
  }
}

export default Contact;
