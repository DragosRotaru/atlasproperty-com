import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// External Imports
import { Card, CardPrimaryAction, CardMedia } from 'rmwc/Card';

// Library Imports
import Loading from '../../Modules/Loading/Loading';
import DataSet from '../../Modules/DataSet/DataSet';

// Project Specific Imports
import Style from './FeaturedProperties.css';
import dataQuery from './FeaturedProperties.gql';

class FeaturedProperties extends Component {
  constructor(props) {
    super(props);
    this.mediaURLAccessor = (property) => {
      let result = '';
      property.media.forEach((media) => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });
      return ['https://media.graphcms.com/resize=w:800/compress/', result].join('');
    };

    this.unitToGridItem = (property, grid) => {
      const price = Math.floor(Math.min(...property.units.map(unit => unit.price / unit.bedrooms)));
      const gridItem = (
        <Link key={ property.id } href to="properties">
          <Card className={ Style.gridItem }>
            <CardPrimaryAction>
              { property.isFeatured ? <div className={ Style.cornerRibbon }>{ property.imageBanner ? property.imageBanner : 'Top Pick'}</div> : '' }
              <CardMedia
                sixteenByNine
                style={ {
                  backgroundImage:
                    `url(${this.mediaURLAccessor(property)})`,
                } }
              />
              <div style={ { padding: '1em' } }>
                <h2>Starting at ${ price } / bed</h2>
                <h3>{ property.address }, { property.city }</h3>
              </div>
            </CardPrimaryAction>
          </Card>
        </Link>
      );
      grid.push(gridItem);
    };
  }
  render() {
    if (this.props.data.loading === true) {
      return (<Loading />);
    }
    if (this.props.data.error !== undefined) {
      return (<div>{ this.props.data.error.toString() }</div>);
    }

    const grid = [];
    this.props.data.allProperties
      .slice()
      .filter(property => property.isFeatured)
      .sort((a, b) => a.priority - b.priority)
      .reverse()
      .slice(0, 4)
      .forEach((property) => {
        this.unitToGridItem(property, grid);
      });

    return (
      <div className={ Style.container }>
        <div className={ Style.grid }>{grid}</div>
      </div>
    );
  }
}
FeaturedProperties.propTypes = {
  data: PropTypes.shape({
    allProperties: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default DataSet(dataQuery)(FeaturedProperties);
