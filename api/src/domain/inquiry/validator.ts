import joi, { ValidationErrorItem } from "joi";
import { baseValidator } from "../base";
import {
  ContactOptions,
  InquiryType,
  LeaseTermOptions,
  SchoolOptions,
  Inquiry,
} from "./model";

export const inquiryValidator = (inquiry: Inquiry) => {
  const entityErrors = baseValidator(inquiry);
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi
      .string()
      .email()
      .required(),
    phone: joi.string().required(),
    preferredContact: joi
      .number()
      .allow(Object.values(ContactOptions))
      .required(),
    type: joi
      .number()
      .allow(Object.values(InquiryType))
      .required(),
    numTenants: joi.number().required(),
    startDate: joi
      .string()
      .isoDate()
      .required(),
    leaseTerm: joi
      .number()
      .allow(Object.values(LeaseTermOptions))
      .required(),
    school: joi.string().allow([...Object.values(SchoolOptions), null]),
    message: joi.string().allow(null),
  });
  const result = schema.validate(inquiry);
  const inquiryErrors = result.error.details;
  const errors: ValidationErrorItem[] = [];
  if (entityErrors.length > 0) {
    errors.push(...entityErrors);
  }
  if (inquiryErrors.length > 0) {
    errors.push(...inquiryErrors);
  }
  return errors;
};
