import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as typeformEmbed from '@typeform/embed';
// import { Chip, ChipText, ChipSet } from 'rmwc/Chip';
import { Button } from 'rmwc/Button';
import Lightbox from 'react-images';
import Datum from '../../Modules/Datum/Datum';
import Style from './Property.css';
import dataQuery from './Property.gql';
import Loading from '../../Modules/Loading/Loading';

const originalURL = 'https://media.graphcms.com/resize=w:1200/compress/';

const mediaURLAccessor = (property) => {
  let result = '';
  property.media.forEach((media) => {
    if (media.isFeatured) {
      result = media.handle;
    }
  });
  property.units.forEach((unit) => {
    unit.media.forEach((media) => {
      if (media.isFeatured) {
        result = media.handle;
      }
    });
  });
  return [originalURL, result].join('');
};

const form = typeformEmbed.makePopup(
  'https://atlaspropertygroup.typeform.com/to/sTaEFw',
  {
    mode: 'popup',
    hideHeaders: true,
    hideFooters: true,
  },
);

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightBoxOpen: false,
      lightBoxCurrentImage: 0,
    };
    this.book = form;
    this.openLightBox = () => {
      this.setState({ isLightBoxOpen: true });
    };
    this.closeLightBox = () => {
      this.setState({ isLightBoxOpen: false });
    };
    this.lightBoxNextImage = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          lightBoxCurrentImage: prevState.lightBoxCurrentImage + 1,
        };
      });
    };
    this.lightBoxPrevImage = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          lightBoxCurrentImage: prevState.lightBoxCurrentImage - 1,
        };
      });
    };
    this.goBack = () => {
      this.props.history.goBack();
    };
  }
  componentDidMount() {
    window.analytics.page(['property-', this.props.id].join(''));
  }
  render() {
    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }
    const property = this.props.data.Property;
    let rent = '';
    let beds = '';
    let baths = '';
    let dateAvailable = '';
    let description = '';
    // let utilities = '';
    // let features = '';
    const images = property.media.map((item) => {
      return {
        src: [originalURL, item.handle].join(''),
      };
    });
    if (property.units.length > 0) {
      const minRentUnit = property.units.reduce((prev, curr) =>
        ((prev.price / prev.bedrooms) < (curr.price / curr.bedrooms) ? prev : curr), 0);
      const minRent = Math.floor(minRentUnit.price / minRentUnit.bedrooms);
      const maxRentUnit = property.units.reduce((prev, curr) =>
        ((prev.price / prev.bedrooms) > (curr.price / curr.bedrooms) ? prev : curr), 0);
      const maxRent = Math.floor(maxRentUnit.price / maxRentUnit.bedrooms);
      rent = (<h2 className={ Style.fields }>Rent <span className={ Style.accent }>{ minRent === maxRent ? minRent : ['$', minRent, '–', maxRent].join('') }</span></h2>);

      const minBeds = property.units.reduce((prev, curr) =>
        (prev.bedrooms < curr.bedrooms ? prev : curr), 0).bedrooms;
      const maxBeds = property.units.reduce((prev, curr) =>
        (prev.bedrooms > curr.bedrooms ? prev : curr), 0).bedrooms;
      beds = (<h2 className={ Style.fields }>Beds <span className={ Style.accent }>{ minBeds === maxBeds ? minBeds : [minBeds, ' to ', maxBeds].join('') }</span></h2>);

      const minBaths = property.units.reduce((prev, curr) =>
        (prev.bathrooms < curr.bathrooms ? prev : curr), 0).bathrooms;
      const maxBaths = property.units.reduce((prev, curr) =>
        (prev.bathrooms > curr.bathrooms ? prev : curr), 0).bathrooms;
      baths = (<h2 className={ Style.fields }>Baths <span className={ Style.accent }>{ minBaths === maxBaths ? minBaths : [minBaths, ' to ', maxBaths].join('') }</span></h2>);

      const date = new Date(property.units.filter(unit => unit.availabilityDate !== null)
        .reduce((prev, curr) =>
          (new Date(prev.availabilityDate) < new Date(curr.availabilityDate) ? prev : curr)
            .availabilityDate, 0)
        .substring(0, 10))
        .toLocaleDateString();

      dateAvailable = (
        <h2
          className={ Style.fields }
        >
          Available <span className={ Style.accent }>{ date }</span>
        </h2>
      );
      if (property.units[0].description.length > 1) {
        description = ([
          <h2 key="description_title" className={ Style.fields }>About</h2>,
          <p key="description" className={ Style.description } >{ property.units[0].description }</p>
        ]);
      }

      /*
      const utilitiesChips = property.units[0].utilitiesIncluded.map(utility =>
        <Chip key={ utility }><ChipText>{ utility }</ChipText></Chip>);

      utilities = ([<h2 className={ Style.fields }>Utilities Included: </h2>, <ChipSet>{ utilitiesChips }</ChipSet>]);

      const featuresChips = property.features.map(feature =>
        <Chip key={ feature }><ChipText>{ feature }</ChipText></Chip>);

      features = ([<h2 className={ Style.fields }>Features: </h2>, <ChipSet>{ featuresChips }</ChipSet>]);
      */
      property.units.forEach((unit) => {
        unit.media.forEach((media) => {
          images.push({
            src: [originalURL, media.handle].join(''),
          });
        });
      });
    }
    return ([
      <div key="container" className={ [Style.container, this.props.className].join(' ') } >
        <div className={ Style.media }>
          <img
            src={ mediaURLAccessor(property) }
            alt={ property.address }
          />
          <div className={ Style.buttons }>
            { this.props.nested ? '' : <Button raised theme="secondary-bg text-primary-on-secondary" className={ Style.button } onClick={ this.goBack }>Go Back</Button> }
            <Button
              raised
              theme="secondary-bg text-primary-on-secondary"
              className={ Style.button }
              onClick={ this.openLightBox }
            >View Photos
            </Button>
            <Button
              raised
              theme="secondary-bg text-primary-on-secondary"
              className={ Style.button }
              onClick={ () => this.book.open() }
            >Book Tour
            </Button>
          </div>
        </div>
        <div className={ Style.content }>
          <h1 className={ Style.title }>{ property.address }</h1>
          <h2 className={ Style.subTitle }>{ property.type }</h2>
          { rent }
          { beds }
          { baths }
          { dateAvailable }
          { description }
        </div>
      </div>,
      <Lightbox
        key="Lightbox"
        images={ images }
        currentImage={ this.state.lightBoxCurrentImage }
        isOpen={ this.state.isLightBoxOpen }
        onClose={ this.closeLightBox }
        onClickPrev={ this.lightBoxPrevImage }
        onClickNext={ this.lightBoxNextImage }
        backdropClosesModal
      />,
    ]);
  }
}
Property.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
    Property: PropTypes.shape({
      address: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
  className: PropTypes.string,
  nested: PropTypes.bool,
};
Property.defaultProps = {
  className: '',
  nested: false,
};

export default Datum(dataQuery)(Property);
