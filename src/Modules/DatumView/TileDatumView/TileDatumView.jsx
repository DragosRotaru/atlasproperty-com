import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Style from './TileDatumView.css';

const TileOptions = {
  size: ['large', 'medium', 'small'],
  color: ['video-white', 'image-white', 'accent-white', 'primary-white', 'white-accent'],
  interaction: ['high', 'low'],
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
    const mediaFileExtension = this.props.media.split('.').pop().toLowerCase();
    if (this.props.color === 'video-white' && ['webm', 'mp4', 'ogg'].indexOf(mediaFileExtension) > -1 && this.props.active) {
      this.playVideo();
    } else if (this.props.color === 'video-white' && ['webm', 'mp4', 'ogg'].indexOf(mediaFileExtension) > -1 && !this.props.active) {
      this.pauseVideo();
    }
  }
  render() {
    const mediaFileExtension = this.props.media.split('.').pop().toLowerCase();
    if (this.props.color === 'image-white' && (['jpg', 'jpeg', 'png', 'gif'].indexOf(mediaFileExtension) > -1)) {
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
          <Link to={ this.props.to } >
            <img src={ this.props.media } alt={ this.props.accessibility } />
            { this.props.children }
          </Link>
        </div>
      );
    } else if (this.props.color === 'video-white' && ['webm', 'mp4', 'ogg'].indexOf(mediaFileExtension) > -1) {
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
          <Link to={ this.props.to } >
            <video ref={ (video) => { this.video = video; } } muted loop>
              <track kind="captions" src={ this.props.accessibility } />
              <source src={ this.props.media } type={ ['video/', mediaFileExtension].join('') } />
              Your browser doesnt support HTML5 video
            </video>
            { this.props.children }
          </Link>
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
        <Link to={ this.props.to } >
          { this.props.children }
        </Link>
      </div>
    );
  }
}
Tile.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  media: PropTypes.string,
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
  media: '',
  accessibility: '',
  size: 'small',
  color: 'primary-white',
  interaction: 'static',
  className: '',
  active: false,
};

const TileStyle = Style;

export { Tile, TileOptions, TileStyle };
