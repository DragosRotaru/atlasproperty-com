import joi, { ValidationErrorItem } from "joi";
import { entityValidator } from "../entity";
import { User } from "./model";

export const userValidator = (user: User) => {
  const inheritedErrors = entityValidator(user);
  const schema = joi.object({});
  const result = schema.validate(user);
  const ownErrors = result.error.details;
  const errors: ValidationErrorItem[] = [];
  if (inheritedErrors.length > 0) {
    errors.push(...inheritedErrors);
  }
  if (ownErrors.length > 0) {
    errors.push(...ownErrors);
  }
  return errors;
};
