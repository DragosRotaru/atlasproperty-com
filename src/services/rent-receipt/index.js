import axios from "axios";
import {
  type RentReceipt,
  type RentReceiptInput,
  type Response,
} from "../../models";
import { config } from "../../config";

const ENDPOINT = config.models.rentReceipts.api;

export class RentReceiptService {
  async getAll(): Response<RentReceipt[]> {
    try {
      const response = await axios.request({
        method: "get",
        url: ENDPOINT,
        withCredentials: config.security.withCredentials,
      });
      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: error.response.data };
    }
  }
  async create(rentReceiptInput: RentReceiptInput): Response<RentReceipt> {
    try {
      const response = await axios.request({
        method: "post",
        url: ENDPOINT,
        data: rentReceiptInput,
      });
      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: error.response.data };
    }
  }
  async getById(id: string): Response<RentReceipt> {
    try {
      const response = await axios.request({
        method: "get",
        url: `${ENDPOINT}/${id}`,
        withCredentials: config.security.withCredentials,
      });
      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: error.response.data };
    }
  }
  async update(id: string, rentReceipt: RentReceipt): Response<RentReceipt> {
    try {
      const response = await axios.request({
        method: "put",
        url: `${ENDPOINT}/${id}`,
        withCredentials: config.security.withCredentials,
        data: rentReceipt,
      });
      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: error.response.data };
    }
  }
}
