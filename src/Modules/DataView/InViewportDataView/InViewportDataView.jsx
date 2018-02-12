import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './InViewportDataView.css';

class InViewportDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 699,
      inViewportIndex: window.innerWidth <= 699 ? 0 : -1,
    };
    this.updateDimensions = () => {
      if (window.innerWidth <= 699 && !this.state.isMobile) {
        this.setState({ isMobile: true });
        window.addEventListener('scroll', this.handleScroll);
      } else if (window.innerWidth > 699 && this.state.isMobile) {
        this.setState({ isMobile: false });
        window.removeEventListener('scroll', this.handleScroll);
      }
    };
    this.handleScroll = () => {
      const domRect = this.container.getBoundingClientRect();
      const newInViewIndex =
      -Math.floor(domRect.top / (domRect.height / (this.container.children.length)));
      if (this.state.inViewportIndex !== newInViewIndex) {
        this.setState({ inViewportIndex: newInViewIndex });
      }
    };
  }
  componentDidMount() {
    if (window.innerWidth <= 699) {
      window.addEventListener('scroll', this.handleScroll);
    }
    window.addEventListener('resize', this.updateDimensions);
  }

  // Assumes every object in data prop contains unique id
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.className !== this.props.className ||
      nextProps.data.length !== this.props.data.length ||
      nextProps.dataViewGenerator !== this.props.dataViewGenerator ||
      nextState.inViewportIndex !== this.state.inViewportIndex
    ) {
      return true;
    }
    const keysA = [...new Set(this.props.data.map(datum => this.props.keyAccessor(datum)))];
    const keysB = new Set(nextProps.data.map(datum => this.props.keyAccessor(datum)));
    if (keysA.filter(datum => !keysB.has(datum)).length > 0) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    return (
      <div
        className={ [Style.container, this.props.className].join(' ') }
        ref={ (container) => { this.container = container; } }
      >
        { this.props.dataViewGenerator(this.props.data, this.state.inViewportIndex) }
      </div>
    );
  }
}
InViewportDataView.propTypes = {
  dataViewGenerator: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyAccessor: PropTypes.func.isRequired,
};
InViewportDataView.defaultProps = {
  className: '',
};

export default InViewportDataView;
