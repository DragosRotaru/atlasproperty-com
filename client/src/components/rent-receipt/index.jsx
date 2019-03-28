import React, { Component } from "react";
import DayPicker from "react-day-picker";
import { Card } from "@rmwc/card";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { RentReceiptService } from "../../services";
import { type RentReceiptInput, RentReceiptStatus } from "../../models";
import { Loading } from "../loading";
import Style from "./style.css";

type Props = {
  match: {
    params: {
      id: string,
    },
  },
  history: {
    goBack: () => any,
  },
  className: string,
};

type State = RentReceiptInput & {
  showModal: boolean,
  editMode: boolean,
  loading: boolean,
  success?: boolean,
  error?: string,
};

export class RentReceipt extends Component<Props, State> {
  rentReceiptService: RentReceiptService = new RentReceiptService();
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      editMode: true,
      loading: true,
    };
    const id = this.props.match.params.id;
    if (id) {
      this.rentReceiptService.getById(id).then(({ result, error }) => {
        if (error) {
          this.setState({ error: error.toString(), loading: false });
        } else {
          this.setState({ ...result, loading: false });
        }
      });
    } else {
      this.state.editMode = false;
      this.state.loading = false;
    }
  }
  onSubmit = async () => {
    const rentReceiptInput = this.state;
    this.setState({ loading: true, error: false });
    const { result, error } = await this.rentReceiptService.create(
      rentReceiptInput
    );
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
  onApprove = async () => {
    this.setState({ loading: true, error: false });
    const { result, error } = await this.rentReceiptService.update(
      this.state._id,
      {
        ...this.state,
        status: RentReceiptStatus.APPROVED,
      }
    );
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
  onDecline = async () => {
    this.setState({ showModal: true });
  };
  onDeclineCancel = async () => {
    this.setState({ showModal: false, message: undefined });
  };
  onDeclineConfirm = async () => {
    this.setState({ loading: true, error: false });
    const { result, error } = await this.rentReceiptService.update(
      this.state._id,
      {
        ...this.state,
        status: RentReceiptStatus.DECLINED,
      }
    );
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
  isDisabled = () => {
    return (
      this.state.status && this.state.status !== RentReceiptStatus.REQUESTED
    );
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
    if (this.state.showModal) {
      return (
        <div className={Style.container}>
          <Card className={Style.card}>
            <div className={Style.title}>
              <h2>Confirm Decline</h2>
              <p>
                Provide the tenant with reason for declining and further
                instructions (will be sent via email).
              </p>
            </div>
            <div className={Style.section}>
              <TextField
                label="Message"
                textarea
                className={Style.field}
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
                onClick={this.onDeclineConfirm}
                disabled={this.state.success}
              >
                Send
              </Button>
              <Button
                ripple
                raised
                onClick={this.onDeclineCancel}
                disabled={this.state.success}
              >
                Cancel
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
            <h2>Rent Receipt</h2>
          </div>
          <div className={Style.section}>
            <TextField
              label="First Name"
              className={Style.field}
              fullwidth
              required
              disabled={this.isDisabled()}
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
              disabled={this.isDisabled()}
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
              disabled={this.isDisabled()}
              value={this.state.email || ""}
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <TextField
              label="Phone"
              className={Style.field}
              fullwidth
              disabled={this.isDisabled()}
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
              label="Building Address"
              required
              className={Style.field}
              fullwidth
              disabled={this.isDisabled()}
              value={this.state.address || ""}
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
              disabled={this.isDisabled()}
              value={this.state.unit || ""}
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            />
            <TextField
              label="Room #"
              className={Style.field}
              fullwidth
              disabled={this.isDisabled()}
              value={this.state.room || ""}
              onChange={event => {
                this.setState({ room: event.target.value });
              }}
            />
            <TextField
              label="Monthly Rent Amount"
              className={Style.field}
              fullwidth
              required
              disabled={this.isDisabled()}
              value={this.state.rent || ""}
              onChange={event => {
                this.setState({
                  rent: Number(event.target.value.replace(/[^0-9.]/g, "")),
                });
              }}
            />
          </div>
          <div className={Style.section}>
            <TextField
              label="Start Date"
              className={Style.field}
              fullwidth
              required
              type="date"
              disabled={this.isDisabled()}
              value={this.state.startDate || ""}
              onChange={event => {
                this.setState({ startDate: event.target.value });
              }}
            />
            <TextField
              label="End Date"
              className={Style.field}
              fullwidth
              required
              type="date"
              disabled={this.isDisabled()}
              value={this.state.endDate || ""}
              onChange={event => {
                this.setState({ endDate: event.target.value });
              }}
            />
          </div>
          {this.state.status === RentReceiptStatus.DECLINED ? (
            <div className={Style.section}>
              <TextField
                label="Message"
                textarea
                className={Style.textArea}
                fullwidth
                required
                disabled={this.isDisabled()}
                value={this.state.message || ""}
                onChange={event => {
                  this.setState({ message: event.target.value });
                }}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.error ? (
            <div className={Style.error}>{this.state.error}</div>
          ) : (
            ""
          )}
          <div className={Style.buttons}>
            {this.state.editMode ? (
              [
                <Button
                  key="accept"
                  ripple
                  raised
                  theme={["secondaryBg", "textPrimaryOnSecondary"]}
                  disabled={this.isDisabled()}
                  onClick={this.onApprove}
                >
                  Accept
                </Button>,
                <Button
                  key="decline"
                  ripple
                  raised
                  disabled={this.isDisabled()}
                  onClick={this.onDecline}
                >
                  Decline
                </Button>,
              ]
            ) : (
              <Button
                ripple
                raised
                theme={["secondaryBg", "textPrimaryOnSecondary"]}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }
}
