import { injectable } from "inversify";
import { Inquiry } from "./model";
import { CreateInquiryDTO } from "./dto";
import { InquiryRepository } from "./repository";
import { Mail } from "../../utilities";
import { Config } from "../../config";
import { BaseService } from "../base";

@injectable()
export class InquiryService extends BaseService<
  Inquiry,
  CreateInquiryDTO,
  null
> {
  constructor(
    repo: InquiryRepository,
    model: Inquiry,
    private mail: Mail,
    private config: Config
  ) {
    super(repo, model);
  }
  async create(data: CreateInquiryDTO): Promise<Inquiry> {
    try {
      const inquiry = new Inquiry(data);
      const errors = inquiry.validate();
      if (errors.length === 0) {
        await this.repo.create(inquiry);
        this.mail.send({
          to: this.config.contacts.leasing,
          from: {
            name: `${inquiry.firstName} ${inquiry.lastName}`,
            email: inquiry.email,
          },
          subject: `[Inquiry] ${inquiry.type} – 
          ${inquiry.firstName} ${inquiry.lastName} `,
          html: `<ul>
          <li>First Name: ${inquiry.firstName}</li>
          <li>Last Name: ${inquiry.lastName}</li>
          <li>Email: ${inquiry.email}</li>
          <li>Phone: ${inquiry.phone}</li>
          <li>Preferred Contact: ${inquiry.preferredContact}</li>
          <li>Type: ${inquiry.type}</li>
          <li>Number of People: ${inquiry.numTenants}</li>
          <li>Move In Date: ${new Date(
            inquiry.startDate
          ).toLocaleDateString()}</li>
          <li>Preferred Lease Term: ${inquiry.leaseTerm}</li>
          ${inquiry.school ? `<li>School: ${inquiry.school}</li>` : "s"}
          <li>Message: ${inquiry.message}</li>
          <li>Interested In: ${inquiry.interestedIn}</li>
          </ul>`,
        });
        return inquiry;
      } else {
        throw new Error(errors[0].message);
      }
    } catch (error) {
      throw new Error("Could Not Create Inquiry");
    }
  }
}
