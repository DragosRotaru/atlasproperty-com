import { injectable } from "inversify";
import { inquiryValidator } from "./validator";
import { CreateInquiryDTO } from "./dto";
import { BaseModel } from "../base";

export enum ContactOptions {
  PHONE = 0,
  EMAIL = 1,
}

export enum InquiryType {
  STUDENT = 0,
  PROFESSIONAL = 1,
  PARENT = 2,
}

export enum SchoolOptions {
  LAURIER = 0,
  WATERLOO = 1,
  OTHER = 2,
}

export enum LeaseTermOptions {
  FOUR_MONTHS = 0,
  EIGHT_MONTHS = 1,
  TWELVE_MONTHS = 2,
}

@injectable()
export class Inquiry extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: ContactOptions;
  type: InquiryType;
  numTenants: number;
  startDate: string;
  leaseTerm: LeaseTermOptions;
  school?: SchoolOptions;
  message?: string;
  interestedIn?: string;
  constructor(createDTO: CreateInquiryDTO) {
    super();
    this.firstName = createDTO.firstName;
    this.lastName = createDTO.lastName;
    this.email = createDTO.email;
    this.phone = createDTO.phone;
    this.preferredContact = createDTO.preferredContact;
    this.type = createDTO.type;
    this.numTenants = createDTO.numTenants;
    this.startDate = createDTO.startDate;
    this.leaseTerm = createDTO.leaseTerm;
    this.school = createDTO.school;
    this.message = createDTO.message;
    this.interestedIn = createDTO.interestedIn;
  }
  validate() {
    return inquiryValidator(this);
  }
}
