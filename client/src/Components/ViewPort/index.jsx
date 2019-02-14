import React, { Component } from "react";
import Style from "./style.css";

type Props = {
  dataViewGenerator: (data: any, index: number) => any,
  keyAccessor: () => string,
  data: Array<any>,
  className?: string,
  maxWidth?: number,
  minWidth?: number,
};
type State = {
  correctSize: number,
  inViewportIndex: number,
};

export class ViewPort extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.checkCorrectSize = () =>
      window.innerWidth <= this.props.maxWidth &&
      window.innerWidth >= this.props.minWidth;
    this.state = {
      correctSize: this.checkCorrectSize(),
      inViewportIndex: this.checkCorrectSize() ? 0 : -1,
    };
    this.updateDimensions = () => {
      if (this.checkCorrectSize()) {
        this.setState(prevState => {
          const nextState = prevState;
          nextState.correctSize = true;
          return nextState;
        });
        window.addEventListener("scroll", this.handleScroll);
      } else if (this.state.correctSize) {
        this.setState(prevState => {
          const nextState = prevState;
          nextState.correctSize = false;
          return nextState;
        });
        window.removeEventListener("scroll", this.handleScroll);
      }
    };
    this.handleScroll = () => {
      const domRect = this.container.getBoundingClientRect();
      const newInViewIndex = -Math.floor(
        domRect.top / (domRect.height / this.container.children.length)
      );
      if (this.state.inViewportIndex !== newInViewIndex) {
        this.setState(prevState => {
          const nextState = prevState;
          nextState.inViewportIndex = newInViewIndex;
          return nextState;
        });
      }
    };
  }
  componentDidMount() {
    if (this.checkCorrectSize()) {
      window.addEventListener("scroll", this.handleScroll);
    }
    window.addEventListener("resize", this.updateDimensions);
  }

  // Assumes every object in data prop contains unique id
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.className !== this.props.className ||
      nextProps.data.minWidth !== this.props.minWidth ||
      nextProps.data.maxWidth !== this.props.maxWidth ||
      nextProps.data.length !== this.props.data.length ||
      nextProps.dataViewGenerator !== this.props.dataViewGenerator ||
      nextState.inViewportIndex !== this.state.inViewportIndex
    ) {
      return true;
    }
    const keysA = [
      ...new Set(this.props.data.map(datum => this.props.keyAccessor(datum))),
    ];
    const keysB = new Set(
      nextProps.data.map(datum => this.props.keyAccessor(datum))
    );
    if (keysA.filter(datum => !keysB.has(datum)).length > 0) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div
        className={[Style.container, this.props.className].join(" ")}
        ref={container => {
          this.container = container;
        }}
      >
        {this.props.dataViewGenerator(
          this.props.data,
          this.state.inViewportIndex
        )}
      </div>
    );
  }
}
ViewPort.defaultProps = {
  className: "",
  maxWidth: 800,
  minWidth: 0,
};
