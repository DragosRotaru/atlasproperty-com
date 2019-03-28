import React, { Component } from "react";
import DayPicker from "react-day-picker";
import { Card } from "@rmwc/card";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { InquiryService } from "../../services";
import { type InquiryInput } from "../../models";
import { Loading } from "../loading";
import Style from "./style.css";

type Props = {
  match: {
    params: {
      id: string,
      interestedIn: string,
    },
  },
  history: {
    goBack: () => any,
  },
  location: {
    search: string,
  },
  className: string,
};

type State = InquiryInput & {
  loading: boolean,
  success?: boolean,
  error?: string,
};

export class Inquiry extends Component<Props, State> {
  inquiryService: InquiryService = new InquiryService();
  constructor(props: any) {
    super(props);
    const id = this.props.match.params.id;
    const initialSearchQuery = new URLSearchParams(props.location.search);
    const interestedIn = initialSearchQuery.get("interested_in");
    this.state = {
      loading: false,
      interestedIn,
    };
    console.log(interestedIn);
  }
  onSubmit = async () => {
    const inquiryInput = this.state;
    this.setState({ loading: true, error: false });
    const { result, error } = await this.inquiryService.create(inquiryInput);
    if (error) {
      if (error.isJoi) {
        error.details[0].message;
        this.setState({
          loading: false,
          error: error.details[0].message,
        });
      } else {
        this.setState({
          loading: false,
          error: error.toString(),
        });
      }
    } else {
      this.setState({ ...result, loading: false, success: true });
    }
  };
  onGoBack = async () => {
    this.props.history.goBack();
  };
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.success) {
      return (
        <div className={Style.container}>
          <Card className={Style.card}>
            <div className={Style.section}>
              <h2>Form has been submitted successfuly</h2>
            </div>
            <div className={Style.buttons}>
              <Button ripple raised onClick={this.onGoBack}>
                Back
              </Button>
            </div>
          </Card>
        </div>
      );
    }
    return (
      <div className={Style.container}>
        <Card className={Style.card}>
          <div className={Style.section}>
            <h2>Inquiry</h2>
          </div>
          <div className={Style.section}>
            <TextField
              label="First Name"
              className={Style.field}
              fullwidth
              required
              value={this.state.firstName || ""}
              onChange={event => {
                this.setState({ firstName: event.target.value });
              }}
            />
            <TextField
              label="Last Name"
              className={Style.field}
              fullwidth
              required
              value={this.state.lastName || ""}
              onChange={event => {
                this.setState({ lastName: event.target.value });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Email"
              required
              className={Style.field}
              fullwidth
              value={this.state.email || ""}
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <TextField
              label="Phone"
              className={Style.field}
              fullwidth
              value={this.state.phone || ""}
              onChange={event => {
                this.setState({
                  phone: event.target.value,
                });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Move In Date"
              className={Style.field}
              fullwidth
              required
              type="date"
              value={this.state.startDate || ""}
              onChange={event => {
                this.setState({ startDate: event.target.value });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Message"
              textarea
              className={Style.textArea}
              fullwidth
              required
              value={this.state.message || ""}
              onChange={event => {
                this.setState({ message: event.target.value });
              }}
            />
          </div>
          {this.state.error ? (
            <div className={Style.error}>{this.state.error}</div>
          ) : (
            ""
          )}
          <div className={Style.buttons}>
            <Button
              ripple
              raised
              theme={["secondaryBg", "textPrimaryOnSecondary"]}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
            <Button ripple raised onClick={this.onGoBack}>
              Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
