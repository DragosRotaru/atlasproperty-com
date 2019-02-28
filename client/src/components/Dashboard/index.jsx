import React, { Component } from "react";
import { RentReceiptService } from "../../services";
import {
  config,
  RentReceiptStatus,
  type RentReceipt,
} from "../../../../common/src";
import { ListCard } from "../ListCard";
import Style from "./style.css";
import { Loading } from "../Loading";

type State = {
  loading: boolean,
  error: string,
  rentReceipts: Array<RentReceipt>,
};

export class Dashboard extends Component<{}, State> {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.rentReceiptService = new RentReceiptService();
    this.rentReceiptService
      .getAll()
      .then(rentReceipts => {
        this.setState({ rentReceipts, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.toString(), loading: false });
      });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return [
      ListCard(
        RentReceiptStatus.REQUESTED,
        this.state.rentReceipts
          .filter(
            rentReceipt => rentReceipt.status === RentReceiptStatus.REQUESTED
          )
          .map(rentReceipt => ({
            id: rentReceipt.id,
            title: `${rentReceipt.firsName} ${rentReceipt.lastName}`,
            link: `/${config.models.rentReceipts.name}/${rentReceipt.id}`,
            icon: "done",
          }))
      ),
      ListCard(
        RentReceiptStatus.APPROVED,
        this.state.rentReceipts
          .filter(
            rentReceipt => rentReceipt.status === RentReceiptStatus.APPROVED
          )
          .map(rentReceipt => ({
            id: rentReceipt.id,
            title: `${rentReceipt.firsName} ${rentReceipt.lastName}`,
            link: `/${config.models.rentReceipts.name}/${rentReceipt.id}`,
          }))
      ),
      ListCard(
        RentReceiptStatus.DECLINED,
        this.state.rentReceipts
          .filter(
            rentReceipt => rentReceipt.status === RentReceiptStatus.DECLINED
          )
          .map(rentReceipt => ({
            id: rentReceipt.id,
            title: `${rentReceipt.firsName} ${rentReceipt.lastName}`,
            link: `/${config.models.rentReceipts.name}/${rentReceipt.id}`,
          }))
      ),
    ];
  }
}
