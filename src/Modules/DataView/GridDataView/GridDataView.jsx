import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tile, TileOptions, TileStyle } from '../../DatumView/TileDatumView/TileDatumView';
import { Summary, SummaryOptions } from '../../DatumView/SummaryDatumView/SummaryDatumView';
import Style from './GridDataView.css';

class GridDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 699,
      inViewIndex: window.innerWidth <= 699 ? 0 : -1,
    };
    this.tile = (datum, tileOptions, summaryOptions, active) => (
      <Tile
        { ...tileOptions }
        key={ this.props.keyAccessor(datum) }
        to={ this.props.toAccessor(datum) }
        media={ this.props.mediaAccessor(datum) }
        accessibility={ this.props.accessibilityAccessor(datum) }
        className={ this.props.tileClassName }
        tileType={ this.props.tileType }
        active={ active }
      ><Summary
        { ...summaryOptions }
        title={ datum.title }
        description={ datum.description }
        keywords={ datum.keywords }
        className={ this.props.summaryClassName }
        summaryType={ this.props.summaryType }
      />
      </Tile>
    );
    this.random = () => this.props.data.map((datum, i) => {
      const tileOptions = {};
      const summaryOptions = {};
      Object.keys(TileOptions).forEach((key) => {
        tileOptions[key] = TileOptions[key][Math.floor(Math.random() * TileOptions[key].length)];
      });
      Object.keys(SummaryOptions).forEach((key) => {
        summaryOptions[key] =
        SummaryOptions[key][Math.floor(Math.random() * SummaryOptions[key].length)];
      });
      return this.tile(datum, tileOptions, summaryOptions, i === this.state.inViewIndex);
    });
    this.cycle = () => {
      const tiles = [];
      const tileOptions = {
        options: {},
        index: {},
      };
      const summaryOptions = {
        options: {},
        index: {},
      };
      Object.keys(TileOptions).forEach((key) => {
        tileOptions.index[key] = 0;
      });
      Object.keys(SummaryOptions).forEach((key) => {
        summaryOptions.index[key] = 0;
      });
      this.props.data.forEach((datum, i) => {
        Object.keys(TileOptions).forEach((key) => {
          tileOptions.options[key] =
          TileOptions[key][tileOptions.index[key] % TileOptions[key].length];
          tileOptions.index[key] += 1;
        });
        Object.keys(SummaryOptions).forEach((key) => {
          summaryOptions.options[key] =
          SummaryOptions[key][summaryOptions.index[key] % SummaryOptions[key].length];
          summaryOptions.index[key] += 1;
        });
        tiles.push(this.tile(
          datum,
          tileOptions.options,
          summaryOptions.options,
          i === this.state.inViewIndex,
        ));
      });
      return tiles;
    };
    this.custom = () => this.props.customGrid(
      this.props.data,
      this.tile,
      TileOptions,
      SummaryOptions,
      this.state.inViewIndex,
    );
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
      if (this.state.inViewIndex !== newInViewIndex) {
        this.setState({ inViewIndex: newInViewIndex });
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
      nextProps.tileClassName !== this.props.tileClassName ||
      nextProps.summaryClassName !== this.props.summaryClassName ||
      nextProps.gridType !== this.props.gridType ||
      nextProps.tileType !== this.props.tileType ||
      nextProps.summaryType !== this.props.summaryType ||
      nextProps.data.length !== this.props.data.length ||
      nextState.inViewIndex !== this.state.inViewIndex
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
        className={ [Style.grid, TileStyle[this.props.tileType], this.props.className].join(' ') }
        ref={ (container) => { this.container = container; } }
      >
        { this[this.props.gridType]() }
      </div>
    );
  }
}
GridDataView.propTypes = {
  className: PropTypes.string,
  tileClassName: PropTypes.string,
  summaryClassName: PropTypes.string,
  gridType: PropTypes.oneOf(['random', 'cycle', 'custom']),
  tileType: PropTypes.oneOf(['default']),
  summaryType: PropTypes.oneOf(['default']),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyAccessor: PropTypes.func.isRequired,
  toAccessor: PropTypes.func.isRequired,
  mediaAccessor: PropTypes.func,
  accessibilityAccessor: PropTypes.func,
  customGrid: PropTypes.func,
};
GridDataView.defaultProps = {
  className: '',
  tileClassName: '',
  summaryClassName: '',
  gridType: 'random',
  tileType: 'default',
  summaryType: 'default',
  mediaAccessor: undefined,
  accessibilityAccessor: undefined,
  customGrid: undefined,
};

export default GridDataView;
