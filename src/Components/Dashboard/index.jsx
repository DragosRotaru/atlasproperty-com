import React, { Component } from "react";
import { RentReceiptService } from "../../services";
import { type RentReceipt, RentReceiptStatus } from "../../models";
import { config } from "../../config";
import { ListCard } from "../list-card";
import { Loading } from "../loading";
import Style from "./style.css";

type State = {
  loading: boolean,
  error?: string,
  rentReceipts?: RentReceipt[],
};

export class Dashboard extends Component<{}, State> {
  rentReceiptService: RentReceiptService = new RentReceiptService();
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rentReceipts: [],
    };
  }
  componentDidMount() {
    this.rentReceiptService.getAll().then(({ result, error }) => {
      if (error) {
        this.setState({ error: error.toString(), loading: false });
      } else {
        this.setState({ rentReceipts: result, loading: false });
      }
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <div className={Style.container}>{this.state.error}</div>;
    }
    return (
      <div className={Style.container}>
        {ListCard(
          RentReceiptStatus.REQUESTED,
          this.state.rentReceipts
            .filter(
              rentReceipt => rentReceipt.status === RentReceiptStatus.REQUESTED
            )
            .map(rentReceipt => ({
              id: rentReceipt._id,
              title: `${rentReceipt.address} – ${rentReceipt.firstName} ${
                rentReceipt.lastName
              }`,
              link: `/${config.models.rentReceipts.name}/${rentReceipt._id}`,
              icon: "inbox",
            }))
        )}
        {ListCard(
          RentReceiptStatus.APPROVED,
          this.state.rentReceipts
            .filter(
              rentReceipt => rentReceipt.status === RentReceiptStatus.APPROVED
            )
            .map(rentReceipt => ({
              id: rentReceipt._id,
              title: `${rentReceipt.address} – ${rentReceipt.firstName} ${
                rentReceipt.lastName
              }`,
              link: `/${config.models.rentReceipts.name}/${rentReceipt._id}`,
              icon: "done",
            }))
        )}
        {ListCard(
          RentReceiptStatus.DECLINED,
          this.state.rentReceipts
            .filter(
              rentReceipt => rentReceipt.status === RentReceiptStatus.DECLINED
            )
            .map(rentReceipt => ({
              id: rentReceipt._id,
              title: `${rentReceipt.address} – ${rentReceipt.firstName} ${
                rentReceipt.lastName
              }`,
              link: `/${config.models.rentReceipts.name}/${rentReceipt._id}`,
              icon: "close",
            }))
        )}
      </div>
    );
  }
}
