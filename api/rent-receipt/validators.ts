import joi, { ValidationErrorItem } from "joi";
import { entityValidator } from "../entity";
import { RentReceiptStatus, RentReceipt } from "./models";

export const rentReceiptValidator = (rentReceipt: RentReceipt) => {
  const entityErrors = entityValidator(rentReceipt);
  const schema = joi.object({
    status: joi.string().valid(Object.values(RentReceiptStatus)),
    startDate: joi
      .string()
      .isoDate()
      .required(),
    endDate: joi
      .string()
      .isoDate()
      .required(),
    rent: joi
      .number()
      .min(0)
      .max(10000)
      .required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi
      .string()
      .email()
      .required(),
    address: joi.string().required(),
    phone: joi.string().allow(null),
    unit: joi.string().allow(null),
    room: joi.string().allow(null),
    message: joi.string().allow(null),
  });
  const result = schema.validate(rentReceipt);
  const rentReceiptErrors = result.error.details;
  const errors: ValidationErrorItem[] = [];
  if (entityErrors.length > 0) {
    errors.push(...entityErrors);
  }
  if (rentReceiptErrors.length > 0) {
    errors.push(...rentReceiptErrors);
  }
  return errors;
};
