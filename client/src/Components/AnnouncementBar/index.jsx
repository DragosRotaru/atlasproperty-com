import React, { Component } from "react";
import { graphql } from "react-apollo";
import moment from "moment";
import { SimpleDialog } from "@rmwc/dialog";
import Debug from "debug";
import Style from "./style.css";
import dataQuery from "./query.gql";

const debug = Debug("AnnouncementBar");

type Props = {
  data: {
    allAnnouncements: Array<{
      title: string,
      description: ?string,
      expiryDate: ?string,
    }>,
    error: {},
    loading: boolean,
  },
};

type State = {
  open: boolean,
  dialogOpen: boolean,
};

class AnnouncementBarWithoutData extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dialogOpen: false,
    };
    this.closeAnnouncement = () => {
      this.setState({ open: false });
    };
    this.openDialog = () => {
      this.setState({ dialogOpen: true });
    };
  }
  render() {
    if (this.props.data.loading) {
      debug("Announcements Loading");
      return "";
    }
    if (this.props.data.error !== undefined) {
      debug(this.props.data.error.toString());
      return "";
    }
    if (!this.state.open) {
      return "";
    }
    if (this.props.data.allAnnouncements.length === 0) {
      return "";
    }

    let latest;

    this.props.data.allAnnouncements.reverse().forEach(announcement => {
      if (moment(announcement.expiryDate) - moment() > 0) {
        latest = announcement;
      }
    });
    let dialog = "";
    let hasDialog = false;
    if (latest) {
      hasDialog = true;
      dialog = (
        <SimpleDialog
          key="dialog"
          title={latest.title}
          body={latest.details}
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false, open: false })}
          cancelLabel="Ok"
          acceptLabel=""
        />
      );
    }
    return [
      this.state.dialogOpen ? dialog : "",
      <div
        key="bar"
        className={[Style.container, this.state.open ? "" : Style.closed].join(
          " "
        )}
        onClick={hasDialog ? this.openDialog : this.closeAnnouncement}
        onKeyDown={hasDialog ? this.openDialog : this.closeAnnouncement}
        tabIndex={0}
        role="button"
      >
        <span className={Style.announcement} role="alert">
          {latest.title}
        </span>
      </div>,
    ];
  }
}

export const AnnouncementBar = graphql(dataQuery)(AnnouncementBarWithoutData);
