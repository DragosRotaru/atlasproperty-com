import {
  ContactOptions,
  InquiryType,
  LeaseTermOptions,
  SchoolOptions,
} from "./model";

export type CreateInquiryDTO = {
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
};
