// @flow
import React, { Component } from "react";
import Lightbox from "react-images";
import Style from "./style.css";
import icon from "./icon.png";

const images = [
  {
    src: require("./six_ontario_pictures/building-1.jpg")
  },
  {
    src: require("./six_ontario_pictures/building-2.jpg")
  },
  {
    src: require("./six_ontario_pictures/living-1.jpg")
  },
  {
    src: require("./six_ontario_pictures/living-2.jpg")
  },
  {
    src: require("./six_ontario_pictures/living-3.jpg")
  },
  {
    src: require("./six_ontario_pictures/kitchen-1.jpg")
  },
  {
    src: require("./six_ontario_pictures/kitchen-2.jpg")
  },
  {
    src: require("./six_ontario_pictures/bedroom-1.jpg")
  },
  {
    src: require("./six_ontario_pictures/bedroom-2.jpg")
  },
  {
    src: require("./six_ontario_pictures/bedroom-3.jpg")
  },
  {
    src: require("./six_ontario_pictures/bathroom-1.jpg")
  },
  {
    src: require("./six_ontario_pictures/bathroom-2.jpg")
  },
  {
    src: require("./six_ontario_pictures/bathroom-3.jpg")
  },
];

type State = {
  isLightBoxOpen: boolean,
  lightBoxCurrentImage: number
};

class Development extends Component<void, State> {
  constructor() {
    super();
    this.state = {
      isLightBoxOpen: false,
      lightBoxCurrentImage: 0
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
        lightBoxCurrentImage: prevState.lightBoxCurrentImage + 1
      };
    });
  }
  lightBoxPrevImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        lightBoxCurrentImage: prevState.lightBoxCurrentImage - 1
      };
    });
  }
  render() {
    return [
      <div key="main" className={Style.container}>
        <div key="hero" className={Style.hero}>
          <h1>Development Management</h1>
        </div>
        <div key="background" className={Style.blueBackground}>
          <div className={Style.whiteForeground}>
            <div className={Style.heading}>
              <div>
                <div className={Style.text}>
                  <div className={Style.icon} />
                  <h2>Projects</h2>
                </div>
                <p>
                  Value Creation Through Building Stabilization.
                  <br />
                  Physical Improvements • Operational Efficiency Optimization •
                  Rent Roll Optimization
                </p>
              </div>
            </div>
            <div className={Style.content}>
              <a target="_blank" href="https://www.brch.ca/">
                <div className={Style.brch}>
                  <h2>Brch Social</h2>
                  <p>Waterloo, Ontario</p>
                </div>
              </a>
              <a target="_blank" href="https://www.thebradshaw.ca/">
                <div className={Style.bradshaw}>
                  <h2>The Bradshaw Lofts</h2>
                  <p>Stratford, Ontario</p>
                </div>
              </a>
              <div
                onClick={() => this.openLightBox()}
                className={Style.sixOntario}
              >
                <h2>6 Ontario Street</h2>
                <p>Stratford, Ontario</p>
              </div>
              <a target="_blank" href="https://www.twothirtystratford.com/">
                <div className={Style.twoThirty}>
                  <h2>Two Thirty</h2>
                  <p>Stratford, Ontario</p>
                </div>
              </a>
            </div>
          </div>
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
      />
    ];
  }
}

export default Development;
