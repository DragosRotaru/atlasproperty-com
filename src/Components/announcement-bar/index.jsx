import React, { Component } from "react";
import { graphql } from "react-apollo";
import moment from "moment";
import { SimpleDialog } from "@rmwc/dialog";
import Debug from "debug";
import { style } from "./style.css";
import dataQuery from "./query.gql";

const debug = Debug("AnnouncementBar");

type Props = {
  data: {
    announcements: Array<{
      title: string,
      details: ?string,
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
  }
  closeAnnouncement = () => {
    this.setState({ open: false });
  };
  openDialog = () => {
    this.setState({ dialogOpen: true });
  };
  render() {
    if (this.props.data.loading) {
      debug("Announcements Loading");
      return "";
    }
    if (this.props.data.error) {
      debug(this.props.data.error.toString());
      return "";
    }
    if (!this.state.open) {
      return "";
    }
    if (this.props.data.announcements.length === 0) {
      return "";
    }

    let latest;

    this.props.data.announcements.reverse().forEach(announcement => {
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
        className={[style.container, this.state.open ? "" : style.closed].join(
          " "
        )}
        onClick={hasDialog ? this.openDialog : this.closeAnnouncement}
        onKeyDown={hasDialog ? this.openDialog : this.closeAnnouncement}
        tabIndex={0}
        role="button"
      >
        <span className={style.announcement} role="alert">
          {latest.title}
        </span>
      </div>,
    ];
  }
}

export const AnnouncementBar = graphql(dataQuery)(AnnouncementBarWithoutData);
