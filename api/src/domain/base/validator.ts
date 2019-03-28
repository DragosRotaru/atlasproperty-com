import joi from "joi";
import { IModel } from "../../interfaces";

export const baseValidator = (entity: IModel) => {
  const schema = joi.object({
    id: joi.string().required(),
    createdAt: joi.string().required(),
    modifiedAt: joi.string().required(),
  });
  const { error } = schema.validate(entity);
  return error.details;
};
