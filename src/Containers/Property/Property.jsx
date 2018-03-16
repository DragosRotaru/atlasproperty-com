import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip, ChipText, ChipSet, Button } from 'rmwc/Chip';
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

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightBoxOpen: false,
      lightBoxCurrentImage: 0,
    };
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
    let rent = '';
    let beds = '';
    let baths = '';
    let dateAvailable = '';
    let description = '';
    // let utilities = '';
    // let features = '';
    const images = this.props.data.Property.media.map((item) => {
      return {
        src: [originalURL, item.handle].join(''),
      };
    });
    if (this.props.data.Property.units.length > 0) {
      const minRent = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.price < curr.price ? prev : curr), 0).price;
      const maxRent = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.price > curr.price ? prev : curr), 0).price;
      rent = (<h2 className={ Style.fields }>Rent <span className={ Style.accent }>{ minRent === maxRent ? minRent : ['$', minRent, '–', maxRent].join('') }</span></h2>);

      const minBeds = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bedrooms < curr.bedrooms ? prev : curr), 0).bedrooms;
      const maxBeds = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bedrooms > curr.bedrooms ? prev : curr), 0).bedrooms;
      beds = (<h2 className={ Style.fields }>Beds <span className={ Style.accent }>{ minBeds === maxBeds ? minBeds : [minBeds, ' to ', maxBeds].join('') }</span></h2>);

      const minBaths = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bathrooms < curr.bathrooms ? prev : curr), 0).bathrooms;
      const maxBaths = this.props.data.Property.units.reduce((prev, curr) =>
        (prev.bathrooms > curr.bathrooms ? prev : curr), 0).bathrooms;
      baths = (<h2 className={ Style.fields }>Baths <span className={ Style.accent }>{ minBaths === maxBaths ? minBaths : [minBaths, ' to ', maxBaths].join('') }</span></h2>);

      const date = new Date(this.props.data.Property.units.reduce((prev, curr) =>
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

      description = ([
        <h2 key="description_title" className={ Style.fields }>About</h2>,
        <p key="description" className={ Style.description } >{ this.props.data.Property.units[0].description }</p>
      ]);

      /*
      const utilitiesChips = this.props.data.Property.units[0].utilitiesIncluded.map(utility =>
        <Chip key={ utility }><ChipText>{ utility }</ChipText></Chip>);

      utilities = ([<h2 className={ Style.fields }>Utilities Included: </h2>, <ChipSet>{ utilitiesChips }</ChipSet>]);

      const featuresChips = this.props.data.Property.features.map(feature =>
        <Chip key={ feature }><ChipText>{ feature }</ChipText></Chip>);

      features = ([<h2 className={ Style.fields }>Features: </h2>, <ChipSet>{ featuresChips }</ChipSet>]);
      */
      this.props.data.Property.units.forEach((unit) => {
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
            src={ mediaURLAccessor(this.props.data.Property) }
            alt={ this.props.data.Property.address }
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
            >Book Tour
            </Button>
          </div>
        </div>
        <div className={ Style.content }>
          <h1 className={ Style.title }>{ this.props.data.Property.address }</h1>
          <h2 className={ Style.subTitle }>{ this.props.data.Property.type }</h2>
          { rent }
          { beds }
          { baths }
          { dateAvailable }
          { description }
        </div>
      </div>,
      <Lightbox
        key="Lightbox"
        className={ Style.lightBox }
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
