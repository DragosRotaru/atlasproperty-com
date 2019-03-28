import React, { Component } from "react";
import Lightbox from "react-images";
import Style from "./style.css";
import icon from "./icon.png";

const images = [
  {
    src: require("./six_ontario_pictures/building-1.jpg"),
  },
  {
    src: require("./six_ontario_pictures/building-2.jpg"),
  },
  {
    src: require("./six_ontario_pictures/living-1.jpg"),
  },
  {
    src: require("./six_ontario_pictures/living-2.jpg"),
  },
  {
    src: require("./six_ontario_pictures/living-3.jpg"),
  },
  {
    src: require("./six_ontario_pictures/kitchen-1.jpg"),
  },
  {
    src: require("./six_ontario_pictures/kitchen-2.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bedroom-1.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bedroom-2.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bedroom-3.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bathroom-1.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bathroom-2.jpg"),
  },
  {
    src: require("./six_ontario_pictures/bathroom-3.jpg"),
  },
];

const secondImages = [
  {
    src: require("./dalhousie/image-1.jpg"),
  },
  {
    src: require("./dalhousie/image-2.jpg"),
  },
  {
    src: require("./dalhousie/image-3.jpg"),
  },
  {
    src: require("./dalhousie/image-4.jpg"),
  },
  {
    src: require("./dalhousie/image-5.png"),
  },
];

const thirdImages = [
  {
    src: require("./otterville/image-1.jpg"),
  },
  {
    src: require("./otterville/image-2.jpg"),
  },
  {
    src: require("./otterville/image-3.jpg"),
  },
  {
    src: require("./otterville/image-4.jpg"),
  },
  {
    src: require("./otterville/image-5.jpg"),
  },
  {
    src: require("./otterville/image-6.jpg"),
  },
  {
    src: require("./otterville/image-7.jpg"),
  },
  {
    src: require("./otterville/image-8.jpg"),
  },
];

type State = {
  isLightBoxOpen: boolean,
  isSecondLightBoxOpen: boolean,
  isThirdLightBoxOpen: boolean,
  lightBoxCurrentImage: number,
  secondLightBoxCurrentImage: number,
  thirdLightBoxCurrentImage: number,
};

export class Development extends Component<void, State> {
  constructor() {
    super();
    this.state = {
      isLightBoxOpen: false,
      isSecondLightBoxOpen: false,
      isThirdLightBoxOpen: false,
      lightBoxCurrentImage: 0,
      secondLightBoxCurrentImage: 0,
      thirdLightBoxCurrentImage: 0,
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
  openSecondLightBox() {
    this.setState({ isSecondLightBoxOpen: true });
  }
  closeSecondLightBox() {
    this.setState({ isSecondLightBoxOpen: false });
  }
  secondLightBoxNextImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        secondLightBoxCurrentImage: prevState.secondLightBoxCurrentImage + 1,
      };
    });
  }
  secondLightBoxPrevImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        secondLightBoxCurrentImage: prevState.secondLightBoxCurrentImage - 1,
      };
    });
  }
  openThirdLightBox() {
    this.setState({ isThirdLightBoxOpen: true });
  }
  closeThirdLightBox() {
    this.setState({ isThirdLightBoxOpen: false });
  }
  thirdLightBoxNextImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        thirdLightBoxCurrentImage: prevState.thirdLightBoxCurrentImage + 1,
      };
    });
  }
  thirdLightBoxPrevImage() {
    this.setState(prevState => {
      return {
        ...prevState,
        thirdLightBoxCurrentImage: prevState.thirdLightBoxCurrentImage - 1,
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
              <div className={Style.kingJohn}>
                <h2>King & John</h2>
                <p>Waterloo, Ontario</p>
              </div>
              <div className={Style.sherbourne}>
                <h2>256 Sherbourne</h2>
                <p>Toronto, Ontario</p>
              </div>
              <div className={Style.colborne}>
                <h2>Colborne</h2>
                <p>Brantford, Ontario</p>
              </div>
              <div
                onClick={() => this.openSecondLightBox()}
                className={Style.dalhousieBratford}
              >
                <h2>Dalhousie</h2>
                <p>Brantford, Ontario</p>
              </div>
              <div
                onClick={() => this.openThirdLightBox()}
                className={Style.otterville}
              >
                <h2>Main St.</h2>
                <p>Otterville, Ontario</p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <Lightbox
        key="FirstLightbox"
        images={images}
        currentImage={this.state.lightBoxCurrentImage}
        isOpen={this.state.isLightBoxOpen}
        onClose={() => this.closeLightBox()}
        onClickPrev={() => this.lightBoxPrevImage()}
        onClickNext={() => this.lightBoxNextImage()}
        backdropClosesModal
      />,
      <Lightbox
        key="SecondLightbox"
        images={secondImages}
        currentImage={this.state.secondLightBoxCurrentImage}
        isOpen={this.state.isSecondLightBoxOpen}
        onClose={() => this.closeSecondLightBox()}
        onClickPrev={() => this.secondLightBoxPrevImage()}
        onClickNext={() => this.secondLightBoxNextImage()}
        backdropClosesModal
      />,
      <Lightbox
        key="ThirdLightbox"
        images={thirdImages}
        currentImage={this.state.thirdLightBoxCurrentImage}
        isOpen={this.state.isThirdLightBoxOpen}
        onClose={() => this.closeThirdLightBox()}
        onClickPrev={() => this.thirdLightBoxPrevImage()}
        onClickNext={() => this.thirdLightBoxNextImage()}
        backdropClosesModal
      />,
    ];
  }
}
