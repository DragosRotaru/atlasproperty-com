import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datum from '../Datum/Datum';
import Style from './Property.css';
import dataQuery from './Property.gql';

class Property extends Component {
  render() {
    if (this.props.data.loading === true) {
      return (<div>Loading...</div>);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    let rent = '';
    let beds = '';
    let baths = '';
    let dateAvailable = '';
    let utilities = '';
    let features = '';
    if (this.props.data.Property.units.length > 0) {
      console.log(Date.parse(this.props.data.Property.units[0].availabilityDate) > Date.parse(this.props.data.Property.units[1].availabilityDate));
      const minRent = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.price < curr.price ? prev : curr), 0).price;
      const maxRent = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.price > curr.price ? prev : curr), 0).price;
      rent = (minRent === maxRent ? minRent : ['$', minRent, ' to $', maxRent].join(''));

      const minBeds = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bedrooms < curr.bedrooms ? prev : curr), 0).bedrooms;
      const maxBeds = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bedrooms > curr.bedrooms ? prev : curr), 0).bedrooms;
      beds = (minBeds === maxBeds ? minBeds : [minBeds, ' to ', maxBeds].join(''));

      const minBaths = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bathrooms < curr.bathrooms ? prev : curr), 0).bathrooms;
      const maxBaths = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bathrooms > curr.bathrooms ? prev : curr), 0).bathrooms;
      baths = (minBaths === maxBaths ? minBaths : [minBaths, ' to ', maxBaths].join(''));

      dateAvailable = this.props.data.Property.units.reduce((prev, curr) =>
        (new Date(prev.availabilityDate) < new Date(curr.availabilityDate) ? prev : curr).availabilityDate, 0);
    }
    return (
      <div className={ Style.container } >
        <h1>{ this.props.data.Property.address }</h1>
        <div className={ Style.info }>
          <h2>Type: </h2>
          <h2>{ this.props.data.Property.type }</h2>
        </div>
        <h2>Rent</h2>
        <h2>{ rent }</h2>
        <h2>Beds</h2>
        <h2>{ beds }</h2>
        <h2>Baths</h2>
        <h2>{ baths }</h2>
        <h2>Earliest Date Available</h2>
        <h2>{ new Date(dateAvailable.substring(0,10)).toLocaleDateString() }</h2>
        <h2>Features</h2>
        { features }
        <h2>Included in Rent</h2>
        { utilities }
        <h2>Description</h2>
        <p>{ this.props.data.Property.description }</p>
      </div>
    );
  }
}
Property.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
    Property: PropTypes.shape({
      address: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Datum(dataQuery)(Property);
