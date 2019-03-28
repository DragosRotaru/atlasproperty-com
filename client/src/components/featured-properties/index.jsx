import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardPrimaryAction, CardMedia } from "@rmwc/card";
import { Loading } from "../loading";
import { graphql } from "react-apollo";
import Style from "./style.css";
import dataQuery from "./query.gql";

type Props = {
  data: {
    allProperties?: Array<any>,
    error?: {},
    loading: boolean,
  },
};
class FeaturedPropertiesWithoutData extends Component<Props> {
  constructor(props) {
    super(props);
    this.mediaURLAccessor = property => {
      let result = "";
      property.media.forEach(media => {
        if (media.isFeatured) {
          result = media.handle;
        }
      });
      if (result) {
        return [
          "https://media.graphcms.com/resize=w:800/compress/",
          result,
        ].join("");
      }
      return "";
    };

    this.unitToGridItem = (property, grid) => {
      const lowestPrice = Math.min(
        ...property.units.map(unit => unit.price / unit.bedrooms)
      );
      const price = Math.floor(lowestPrice);
      const gridItem = (
        <Link
          key={property.id}
          href
          to={["properties", property.id, property.units[0].id].join("/")}
        >
          <Card className={Style.gridItem}>
            <CardPrimaryAction>
              <div className={Style.cornerRibbon}>
                {property.imageBanner ? property.imageBanner : "Top Pick"}
              </div>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: `url(${this.mediaURLAccessor(property)})`,
                }}
              />
              <div style={{ padding: "1em" }}>
                <h2>Starting at ${price} / bed</h2>
                <h3>
                  {property.address}, {property.city}
                </h3>
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
      return <Loading />;
    }
    if (this.props.data.error !== undefined) {
      return <div>{this.props.data.error.toString()}</div>;
    }

    const grid = [];
    this.props.data.allProperties
      .slice()
      .filter(property => property.isFeatured)
      .filter(property => property.zoning === "Residential")
      .sort((a, b) => a.priority - b.priority)
      .reverse()
      .slice(0, 3)
      .forEach(property => {
        this.unitToGridItem(property, grid);
      });

    return (
      <div className={Style.container}>
        <div className={Style.grid}>{grid}</div>
      </div>
    );
  }
}

export const FeaturedProperties = graphql(dataQuery)(
  FeaturedPropertiesWithoutData
);
