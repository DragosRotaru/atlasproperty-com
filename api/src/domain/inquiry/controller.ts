import { controller, httpPost, requestBody } from "inversify-express-utils";
import { BaseController } from "../base";
import { CreateInquiryDTO } from "./dto";
import { Inquiry } from "./model";
import { InquiryService } from "./service";

@controller("/inquiries")
export class InquiryController extends BaseController<
  Inquiry,
  CreateInquiryDTO,
  null
> {
  constructor(protected service: InquiryService) {
    super(service);
  }
  @httpPost("/")
  async onCreate(@requestBody() body: CreateInquiryDTO) {
    try {
      const result = await this.service.create(body);
      return this.json(result, 201);
    } catch (err) {
      return this.statusCode(400);
    }
  }
}
