import * as typeformEmbed from "@typeform/embed";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import moment from "moment";
import gql from "graphql-tag";
import { Chip, ChipSet } from "@rmwc/chip";
import { Button } from "@rmwc/button";
import Lightbox from "react-images";
import { Datum } from "../datum";
import { Loading } from "../loading";
import { MapDataView } from "../map-data-view";
import Style from "./style.css";
import { config } from "../../config";

const dataQuery = gql`
  query getProperty($id: ID) {
    Property(id: $id) {
      id
      location
      address
      city
      zoning
      numberOfFloors
      features
      distanceToLaurierU
      distanceToWaterlooU
      distanceToConestogaCollege
      distanceToUptownWaterloo
      distanceToConestogaMall
      media {
        handle
        isFeatured
        priority
      }
      units {
        id
        type
        bedrooms
        bathrooms
        price
        availabilityDate
        utilitiesIncluded
        description
        features
        virtualTourURL
        prioritizePropertyImages
        media {
          handle
          isFeatured
          priority
        }
      }
    }
  }
`;

const IMAGE_URL = "https://media.graphcms.com/resize=w:1200/compress/";

type media = {
  handle: string,
  isFeatured: boolean,
  priority: number,
};

type unit = {
  id: string,
  type: string,
  bedrooms: number,
  bathrooms: number,
  price: number,
  availabilityDate: string,
  utilitiesIncluded: Array<string>,
  description: string,
  features: Array<string>,
  virtualTourURL: string,
  prioritizePropertyImages: boolean,
  media: Array<media>,
};

type property = {
  id: string,
  location: string,
  address: string,
  city: string,
  zoning: string,
  numberOfFloors: number,
  features: Array<string>,
  distanceToLaurierU: string,
  distanceToWaterlooU: string,
  distanceToConestogaCollege: string,
  distanceToUptownWaterloo: string,
  distanceToConestogaMall: string,
  media: Array<media>,
  units: Array<unit>,
};

type Props = {
  id: string,
  data: {
    Property: property,
    error?: {},
    loading: boolean,
  },
  match: {
    params: {
      unitId: string,
    },
  },
  className: string,
};

type State = {
  isLightBoxOpen: boolean,
  lightBoxCurrentImage: number,
};

class PropertyWithoutData extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLightBoxOpen: false,
      lightBoxCurrentImage: 0,
    };
  }
  openLightBox() {
    this.setState({ isLightBoxOpen: true });
  }
  closeLightBox() {
    this.setState({ isLightBoxOpen: false });
  }
  lightBoxNextImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        lightBoxCurrentImage: prevState.lightBoxCurrentImage + 1,
      };
    });
  }
  lightBoxPrevImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        lightBoxCurrentImage: prevState.lightBoxCurrentImage - 1,
      };
    });
  }
  mediaURLAccessor(unit: unit, property: property): string {
    let result = "";
    // Prioritizes Unit Featured Image
    unit.media.forEach(media => {
      if (media.isFeatured) {
        result = media.handle;
      }
    });

    // If no Unit Featured Image is found, resorts to Property Featured Image as backup
    if (result === "" || unit.prioritizePropertyImages) {
      property.media.forEach(media => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });
    }
    return [IMAGE_URL, result].join("");
  }
  render() {
    if (this.props.data.loading === true) {
      return <Loading />;
    }
    if (this.props.data.error !== undefined) {
      return <div>{this.props.data.error.toString()}</div>;
    }

    const property = this.props.data.Property;
    const unit = property.units.filter(
      u => u.id === this.props.match.params.unitId
    )[0];

    let isCommercial;
    if (["retail", "office"].includes(unit.type.toLowerCase())) {
      isCommercial = true;
    } else {
      isCommercial = false;
    }

    const residentialFormURL =
      "https://atlaspropertygroup.typeform.com/to/dPOwFl";
    const commercialFormURL =
      "https://atlaspropertygroup.typeform.com/to/MpkDr4";

    let url = "";
    if (isCommercial) {
      url = commercialFormURL;
    } else {
      url = residentialFormURL;
    }

    const formURL = [
      "https://atlaspropertygroup.typeform.com/to/dPOwFl",
      "?interested_in=",
      encodeURIComponent(property.address),
    ].join("");
    const form = typeformEmbed.makePopup(formURL, {
      mode: "popup",
      hideHeaders: true,
      hideFooters: true,
    });
    const pricePerBed = Math.floor(unit.price / unit.bedrooms);
    let price = "";
    if (unit.price === 0) {
      price = `Contact Us`;
    } else if (isCommercial || unit.bedrooms === 1) {
      price = `$${unit.price}`;
    } else {
      price = `$${unit.price} (avg $${pricePerBed} / bed)`;
    }
    const rent = (
      <h2 className={Style.fields}>
        Rent <span className={Style.accent}>{price}</span>
      </h2>
    );
    const floors = property.numberOfFloors ? (
      <h2 className={Style.fields}>
        Floors <span className={Style.accent}>{property.numberOfFloors}</span>
      </h2>
    ) : (
      ""
    );
    const beds = isCommercial ? (
      ""
    ) : (
      <h2 className={Style.fields}>
        Beds <span className={Style.accent}>{unit.bedrooms}</span>
      </h2>
    );
    const baths = isCommercial ? (
      ""
    ) : (
      <h2 className={Style.fields}>
        Baths <span className={Style.accent}>{unit.bathrooms}</span>
      </h2>
    );
    const distances =
      isCommercial || !["waterloo"].includes(property.city)
        ? ""
        : [
            <h2 key="description_title" className={Style.fields}>
              Distances
            </h2>,
            <p key="description" className={Style.description}>
              Waterloo University – {property.distanceToWaterlooU}
            </p>,
            <p key="description" className={Style.description}>
              Laurier University – {property.distanceToLaurierU}
            </p>,
            <p key="description" className={Style.description}>
              Conestoga College – {property.distanceToConestogaCollege}
            </p>,
            <p key="description" className={Style.description}>
              Uptown Waterloo – {property.distanceToUptownWaterloo}
            </p>,
            <p key="description" className={Style.description}>
              Conestoga Mall – {property.distanceToConestogaMall}
            </p>,
          ];
    const description =
      unit.description.length > 1
        ? [
            <h2 key="description_title" className={Style.fields}>
              About
            </h2>,
            <p key="description" className={Style.description}>
              {unit.description}
            </p>,
          ]
        : "";

    let dateAvailable = "";
    if (unit.availabilityDate) {
      dateAvailable = (
        <h2 className={Style.fields}>
          Available{" "}
          <span className={Style.accent}>
            {moment(unit.availabilityDate.substring(0, 10)).format(
              "MMMM DD, YYYY"
            )}
          </span>
        </h2>
      );
    }

    const utilitiesChips = unit.utilitiesIncluded.map(utility => (
      <Chip key={utility} label={utility.replace(/_/g, " ")} />
    ));

    const utilities =
      utilitiesChips.length > 0
        ? [
            <h2 className={Style.fields} key="utilitiesTitle">
              Utilities Included{" "}
            </h2>,
            <ChipSet key="utilitiesChips">{utilitiesChips}</ChipSet>,
          ]
        : "";

    const featuresChips = [];

    property.features.forEach(feature =>
      featuresChips.push(
        <Chip key={feature} label={feature.replace(/_/g, " ")} />
      )
    );

    unit.features.forEach(feature =>
      featuresChips.push(
        <Chip key={feature} label={feature.replace(/_/g, " ")} />
      )
    );

    const features =
      featuresChips.length > 0
        ? [
            <h2 className={Style.fields} key="featuresTitle">
              Features{" "}
            </h2>,
            <ChipSet key="featuresChips">{featuresChips}</ChipSet>,
          ]
        : "";

    const images = [];

    property.media
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .reverse()
      .forEach(media => {
        images.push({
          src: [IMAGE_URL, media.handle].join(""),
        });
      });

    unit.media
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .reverse()
      .forEach(media => {
        images.push({
          src: [IMAGE_URL, media.handle].join(""),
        });
      });

    return [
      <div key="map" className={Style.map}>
        <MapDataView center={property.location} data={[property]} />
      </div>,
      <div
        key="container"
        className={[Style.container, this.props.className].join(" ")}
      >
        <div className={Style.media}>
          <img
            src={this.mediaURLAccessor(unit, property)}
            alt={property.address}
          />
          <div className={Style.buttons}>
            <Button
              raised
              theme={["secondaryBg", "textPrimaryOnSecondary"]}
              className={Style.button}
              onClick={() => this.openLightBox()}
            >
              View More Photos
            </Button>
            {unit.virtualTourURL.length > 0 ? (
              <a
                href={unit.virtualTourURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  raised
                  theme={["secondaryBg", "textPrimaryOnSecondary"]}
                  className={Style.button}
                >
                  Virtual Tour
                </Button>
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={Style.content}>
          <h1 className={Style.title}>
            {property.address} {property.city}
          </h1>
          <h2 className={Style.subTitle}>{unit.type}</h2>
          {rent}
          {floors}
          {beds}
          {baths}
          {dateAvailable}
          {utilities}
          {features}
          {distances}
          {description}
        </div>
      </div>,
      <Lightbox
        key="Lightbox"
        images={images}
        currentImage={this.state.lightBoxCurrentImage}
        isOpen={this.state.isLightBoxOpen}
        onClose={() => this.closeLightBox()}
        onClickPrev={() => this.lightBoxPrevImage()}
        onClickNext={() => this.lightBoxNextImage()}
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
        {false ? ( // isCommercial ? (
          <a href={`mailto:${config.contacts.leasing.commercial}`}>
            <Button
              key="cta-button"
              raised
              theme={["secondaryBg", "textPrimaryOnSecondary"]}
              className={Style.cta}
            >
              Book
              <br />
              Tour
            </Button>
          </a>
        ) : (
          /*           <Link
            to={`/${config.models.inquiries.name}?interested_in=${
              property.address
            }`}
          > */
          <Button
            key="cta-button"
            raised
            theme={["secondaryBg", "textPrimaryOnSecondary"]}
            className={Style.cta}
            onClick={() => form.open()}
          >
            Book
            <br />
            Tour
          </Button>
          /* </Link> */
        )}
      </ReactCSSTransitionGroup>,
    ];
  }
}

export const Property = Datum(dataQuery)(PropertyWithoutData);
