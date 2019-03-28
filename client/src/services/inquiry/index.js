import axios from "axios";
import { type Inquiry, type InquiryInput, type Response } from "../../models";
import { config } from "../../config";

const ENDPOINT = config.models.inquiries.api;

export class InquiryService {
  async create(InquiryInput: InquiryInput): Response<Inquiry> {
    try {
      const response = await axios.request({
        method: "post",
        url: ENDPOINT,
        data: InquiryInput,
      });
      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: error.response.data };
    }
  }
}
