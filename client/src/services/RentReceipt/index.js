import axios from "axios";
import {
  config,
  type RentReceipt,
  type RentReceiptInput,
} from "../../../../common/src";

const ENDPOINT = config.models.rentReceipts.api;

export class RentReceiptService {
  async getAll(): Promise<Array<RentReceipt>> {
    return axios.get({
      url: ENDPOINT,
      withCredentials: true,
    });
  }
  async create(rentReceiptInput: RentReceiptInput): Promise<RentReceipt> {
    return axios.post({
      url: ENDPOINT,
      data: rentReceiptInput,
    });
  }
  async getById(id: string): Promise<RentReceipt> {
    return axios.get({
      url: `${ENDPOINT}/${id}`,
      withCredentials: true,
    });
  }
  async update(id: string, rentReceipt: RentReceipt): Promise<RentReceipt> {
    return axios.put({
      url: `${ENDPOINT}/${id}`,
      withCredentials: true,
      data: rentReceipt,
    });
  }
}
