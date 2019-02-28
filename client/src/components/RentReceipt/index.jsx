import React, { Component } from "react";
import DayPicker from "react-day-picker";
import { Card } from "@rmwc/card";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { RentReceiptService } from "../../services";
import { type RentReceiptInput } from "../../../../common";
import { Loading } from "../Loading";
import Style from "./style.css";

type State = RentReceiptInput & {
  loading: boolean,
  success: boolean,
  error: string,
};

export class RentReceipt extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.rentReceiptService = new RentReceiptService();
    this.onSubmit = async () => {
      try {
        const rentReceiptInput = this.state;
        rentReceiptInput.loading = undefined;
        rentReceiptInput.error = undefined;
        rentReceiptInput.success = undefined;
        this.setState({ loading: true });
        const response = await this.rentReceiptService.create(rentReceiptInput);
        this.setState({ loading: false, success: true });
      } catch (error) {
        this.setState({ loading: false, error: error.toString() });
      }
    };
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className={Style.container}>
        <Card className={Style.card}>
          <div className={Style.section}>
            <h2>Request a Rent Receipt</h2>
          </div>
          <div className={Style.section}>
            <TextField
              label="First Name"
              className={Style.field}
              fullwidth
              required
              onChange={event => {
                this.setState({ firstName: event.target.value });
              }}
            />
            <TextField
              label="Last Name"
              className={Style.field}
              fullwidth
              required
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
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <TextField
              label="Phone Number"
              className={Style.field}
              fullwidth
              required
              onChange={event => {
                this.setState({ phoneNumber: event.target.value });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Building Address"
              required
              className={Style.field}
              fullwidth
              onChange={event => {
                this.setState({ address: event.target.value });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Unit #"
              className={Style.field}
              fullwidth
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            />
            <TextField
              label="Room #"
              className={Style.field}
              fullwidth
              onChange={event => {
                this.setState({ room: event.target.value });
              }}
            />
            <TextField
              label="Monthly Rent Amount"
              className={Style.field}
              fullwidth
              onChange={event => {
                this.setState({ rent: event.target.value });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Start Date"
              className={Style.field}
              fullwidth
              type="date"
              onChange={event => {
                this.setState({ startDate: event.target.value });
              }}
            />
            <TextField
              label="End Date"
              className={Style.field}
              fullwidth
              type="date"
              onChange={event => {
                this.setState({ startDate: event.target.value });
              }}
            />
          </div>
          <br />
          <br />
          {this.state.error ? (
            <div className={Style.error}>{this.state.error}</div>
          ) : (
            ""
          )}
          {this.state.success ? (
            <div className={Style.error}>Form Sent Successfully</div>
          ) : (
            ""
          )}
          <br />
          <br />
          <div className={Style.buttons}>
            <Button
              ripple
              raised
              onClick={this.onSubmit}
              disabled={this.state.success}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
