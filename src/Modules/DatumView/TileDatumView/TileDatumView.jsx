import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './TileDatumView.css';

const TileOptions = {
  size: ['large', 'medium', 'small'],
  color: ['video-white', 'image-white', 'accent-white', 'primary-white', 'white-accent'],
  interaction: ['high', 'low', 'static'],
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.playVideo = () => {
      this.video.play();
    };
    this.pauseVideo = () => {
      this.video.pause();
    };
  }
  componentDidMount() {
    if (this.props.color === 'video-white' && ['video/webm', 'video/mp4', 'video/ogg'].indexOf(this.props.mimeType) > -1 && this.props.active) {
      this.playVideo();
    } else if (this.props.color === 'video-white' && ['video/webm', 'video/mp4', 'video/ogg'].indexOf(this.props.mimeType) > -1 && !this.props.active) {
      this.pauseVideo();
    }
  }
  render() {
    if (this.props.color === 'image-white' && (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.props.mimeType) > -1)) {
      return (
        <div
          className={ [
            Style.container,
            Style[this.props.size],
            Style[this.props.color],
            Style[this.props.interaction],
            Style[this.props.active ? 'active' : 'inactive'],
            this.props.className,
          ].join(' ') }
        >
          <img src={ this.props.mediaURL } alt={ this.props.accessibility } />
          { this.props.children }
        </div>
      );
    } else if (this.props.color === 'video-white' && ['video/webm', 'video/mp4', 'video/ogg'].indexOf(this.props.mimeType) > -1) {
      return (
        <div
          className={ [
            Style.container,
            Style[this.props.size],
            Style[this.props.color],
            Style[this.props.interaction],
            Style[this.props.active ? 'active' : 'inactive'],
            this.props.className,
          ].join(' ') }
          onMouseOver={ this.playVideo }
          onMouseOut={ this.pauseVideo }
          onFocus={ this.playVideo }
          onBlur={ this.pauseVideo }
        >
          <video ref={ (video) => { this.video = video; } } muted loop>
            <track kind="captions" src={ this.props.accessibility } />
            <source src={ this.props.mediaURL } type={ this.props.mimeType } />
            Your browser doesnt support HTML5 video
          </video>
          { this.props.children }
        </div>
      );
    }
    return (
      <div
        className={ [
          Style.container,
          Style[this.props.size],
          Style[this.props.color],
          Style[this.props.interaction],
          Style[this.props.active ? 'active' : 'inactive'],
          this.props.className,
        ].join(' ') }
      >
        { this.props.children }
      </div>
    );
  }
}
Tile.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  mediaURL: PropTypes.string,
  mimeType: PropTypes.string,
  accessibility: PropTypes.string,
  size: PropTypes.oneOf(TileOptions.size),
  color: PropTypes.oneOf(TileOptions.color),
  interaction: PropTypes.oneOf(TileOptions.interaction),
  className: PropTypes.string,
  active: PropTypes.bool,
};
Tile.defaultProps = {
  children: 'hello world',
  to: '',
  mediaURL: '',
  mimeType: '',
  accessibility: '',
  size: 'small',
  color: 'primary-white',
  interaction: 'static',
  className: '',
  active: false,
};

const TileGridStyle = Style;

export { Tile, TileOptions, TileGridStyle };
