import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as typeformEmbed from '@typeform/embed';
import { Chip, ChipText, ChipSet } from 'rmwc/Chip';
import { Button } from 'rmwc/Button';
import Lightbox from 'react-images';
import Datum from '../../Modules/Datum/Datum';
import Style from './Property.css';
import dataQuery from './Property.gql';
import Loading from '../../Modules/Loading/Loading';
import MapDataView from '../../Modules/DataView/MapDataView/MapDataView';

const IMAGE_URL = 'https://media.graphcms.com/resize=w:1200/compress/';

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
    this.mediaURLAccessor = (unit, property) => {
      let result = '';
      // Prioritizes Unit Featured Image
      unit.media.forEach((media) => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });

      // If no Unit Featured Image is found, resorts to Property Featured Image as backup
      if (result === '') {
        property.media.forEach((media) => {
          if (media.isFeatured) {
            result = media.handle;
          }
        });
      }
      return [IMAGE_URL, result].join('');
    };
  }
  render() {
    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }

    const property = this.props.data.Property;
    const unit = property.units.filter(u => u.id === this.props.match.params.unitId)[0];

    const formURL = ['https://atlaspropertygroup.typeform.com/to/dPOwFl', '?interested_in=', encodeURIComponent(property.address)].join('');
    const form = typeformEmbed.makePopup(
      formURL,
      {
        mode: 'popup',
        hideHeaders: true,
        hideFooters: true,
      },
    );
    
    const rent = (<h2 className={ Style.fields }>Rent <span className={ Style.accent }>${ unit.price }</span></h2>);
    const beds = (<h2 className={ Style.fields }>Beds <span className={ Style.accent }>{ unit.bedrooms }</span></h2>);
    const baths = (<h2 className={ Style.fields }>Baths <span className={ Style.accent }>{ unit.bathrooms }</span></h2>);
    const description = unit.description.length > 1 ? ([
      <h2 key="description_title" className={ Style.fields }>About</h2>,
      <p key="description" className={ Style.description } >{ property.units[0].description }</p>
    ]) : '';

    let dateAvailable = '';
    if (unit.availabilityDate) {
      dateAvailable = (
        <h2
          className={ Style.fields }
        >
          Available <span className={ Style.accent }>{ new Date(unit.availabilityDate.substring(0, 10)).toLocaleDateString() }</span>
        </h2>
      );
    }
    
    const utilitiesChips = unit.utilitiesIncluded.map(utility =>
      <Chip key={ utility }><ChipText>{ utility.replace(/_/g, ' ') }</ChipText></Chip>);

    const utilities = ([<h2 className={ Style.fields } key="utilitiesTitle">Utilities Included </h2>, <ChipSet key="utilitiesChips">{ utilitiesChips }</ChipSet>]);

    const featuresChips = [];
    
    property.features.forEach(feature =>
      featuresChips.push(<Chip key={ feature }><ChipText>{ feature.replace(/_/g, ' ') }</ChipText></Chip>));

    unit.features.forEach(feature =>
      featuresChips.push(<Chip key={ feature }><ChipText>{ feature.replace(/_/g, ' ') }</ChipText></Chip>));

    const features = ([<h2 className={ Style.fields } key="featuresTitle">Features </h2>, <ChipSet key="featuresChips">{ featuresChips }</ChipSet>]);
    
    const images = [];
    
    property.media.slice().sort((a, b) => a.priority - b.priority).reverse().forEach((media) => {
      images.push({
        src: [IMAGE_URL, media.handle].join(''),
      });
    });

    unit.media.slice().sort((a, b) => a.priority - b.priority).reverse().forEach((media) => {
      images.push({
        src: [IMAGE_URL, media.handle].join(''),
      });
    });

    return ([
      <div
        key="map"
        className={ Style.map }
      >
        <MapDataView
          center={ property.location }
          data={ [property] }
        />
      </div>,
      <div key="container" className={ [Style.container, this.props.className].join(' ') } >
        <div className={ Style.media }>
          <img
            src={ this.mediaURLAccessor(property, unit) }
            alt={ property.address }
          />
          <div className={ Style.buttons }>
            <Button
              raised
              theme="secondary-bg text-primary-on-secondary"
              className={ Style.button }
              onClick={ this.openLightBox }
            >View More Photos
            </Button>
            { unit.virtualTourURL.length > 0 ?
              <a href={ unit.virtualTourURL } target="_blank">
                <Button
                  raised
                  theme="secondary-bg text-primary-on-secondary"
                  className={ Style.button }
                >Virtual Tour
                </Button>
              </a> : ''
            }
          </div>
        </div>
        <div className={ Style.content }>
          <h1 className={ Style.title }>{ property.address }  { property.city }</h1>
          <h2 className={ Style.subTitle }>{ property.type }</h2>
          { rent }
          { beds }
          { baths }
          { dateAvailable }
          { utilities }
          { features }
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
      <ReactCSSTransitionGroup
        key="cta"
        transitionName="cta"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Button
          key="cta-button"
          raised
          theme="secondary-bg text-primary-on-secondary"
          className={ Style.cta }
          onClick={ () => form.open() }
        >Book<br />Tour
        </Button>
      </ReactCSSTransitionGroup>,
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
};
Property.defaultProps = {
  className: '',
};

export default Datum(dataQuery)(Property);
