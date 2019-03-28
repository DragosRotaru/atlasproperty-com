import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Loading } from "../loading";
import { Tile } from "../tile";
import { Summary } from "../summary";
import { ViewPort } from "../view-port";
import doggy from "./doggy.jpg";
import Style from "./style.css";

const query = gql`
  {
    allTeamMembers {
      id
      name
      title
      email
      priority
      portrait {
        handle
        mimeType
      }
    }
  }
`;

type Props = {
  data: {
    allTeamMembers: Array<{
      id: string,
      name: string,
      title: string,
      email: string,
      priority: number,
      portrait: {
        handle: string,
        mimeType: string,
      },
    }>,
    error: {},
    loading: boolean,
  },
  className: string,
};

class TeamWithoutData extends Component<Props> {
  customGrid = (data, inViewportIndex) => {
    const tileOptions = {
      size: "small",
      color: "image-white",
      interaction: "low",
    };
    const summaryOptions = {
      underline: "underline",
      align: "right",
    };
    const tiles = [];
    const temp = [].concat(data);
    temp.sort((a, b) => {
      if (a.priority < b.priority) {
        return -1;
      } else if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    });
    temp.forEach((teamMember, i) => {
      const email = ["mailto:", teamMember.email].join("");
      const tile = (
        <Tile
          {...tileOptions}
          key={teamMember.id}
          href={email}
          mediaURL={this.mediaURLAccessor(teamMember)}
          mimeType={this.mimeTypeAccessor(teamMember)}
          active={i === inViewportIndex}
        >
          <Summary
            {...summaryOptions}
            className={Style.summary}
            title={teamMember.name}
            description={teamMember.title}
          />
        </Tile>
      );
      tiles.push(tile);
    });
    return tiles;
  };
  mediaURLAccessor = teamMember => {
    if (teamMember.portrait !== null) {
      return [
        "https://media.graphcms.com/resize=w:800/compress/",
        teamMember.portrait.handle,
      ].join("");
    }
    return doggy;
  };
  mimeTypeAccessor = teamMember => {
    if (teamMember.portrait !== null) {
      return teamMember.portrait.mimeType;
    }
    return "image/jpeg";
  };
  render() {
    if (this.props.data.loading === true) {
      return <Loading />;
    }
    if (this.props.data.error !== undefined) {
      return <div>{this.props.data.error.toString()}</div>;
    }
    return (
      <div className={Style.container}>
        <h1>Our Team</h1>
        <ViewPort
          className={[
            Style.grid,
            this.props.className ? this.props.className : "",
          ].join(" ")}
          data={this.props.data.allTeamMembers}
          keyAccessor={person => person.id}
          dataViewGenerator={(data, inViewportIndex) =>
            this.customGrid(data, inViewportIndex)
          }
        />
      </div>
    );
  }
}

export const Team = graphql(query)(TeamWithoutData);
