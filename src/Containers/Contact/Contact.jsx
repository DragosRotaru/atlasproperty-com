// @flow
import React, { Component } from 'react';
import Map from '../../Modules/Map/Map';
import Style from './Contact.css';
import facebookIcon from './facebook.svg';
import instagramIcon from './instagram.svg';
import twitterIcon from './twitter.svg';
import linkedinIcon from './linkedIn.svg';

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
            <a href="tel:5197457999"><h3>(519) 745 7999</h3></a>
            <a href="mailto:info@atlasproperty.com"><h3>info@atlasproperty.com</h3></a>
            <a href="https://goo.gl/maps/45uubqb7nnz" target="_blank" rel="noopener noreferrer">
              <h3>1 King Street North Waterloo <br />
                3rd floor
              </h3>
            </a>
            <h3>
              Open 9am – 5pm <br />
              Weekend by appointment only
            </h3>
            <a href="https://www.facebook.com/atlas.property.group.inc/">
              <img src={ facebookIcon } alt="Facebook Page Link" className={ Style.social } />
            </a>
            <a href="https://www.instagram.com/atlas_property/">
              <img src={ instagramIcon } alt="Instagram Profile Link" className={ Style.social } />
            </a>
            <a href="https://twitter.com/atlas_property">
              <img src={ twitterIcon } alt="Twitter Profile Link" className={ Style.social } />
            </a>
            <a href="https://ca.linkedin.com/company/atlas-property-group-inc-">
              <img src={ linkedinIcon } alt="LinkedIn Page Link" className={ Style.social } />
            </a>
          </center>
        </div>
      </div>
    );
  }
}

export default Contact;
