import { injectable } from "inversify";
import moment from "moment";
import uuid from "uuid/v4";
import { baseValidator } from "./validator";
import { IModel } from "../../interfaces";

@injectable()
export abstract class BaseModel implements IModel {
  isValid: boolean | null = null;
  id: string;
  createdAt: string;
  modifiedAt: string;
  constructor() {
    this.id = uuid();
    const timestamp = moment().toISOString();
    this.createdAt = timestamp;
    this.modifiedAt = timestamp;
  }
  validate() {
    const errors = baseValidator(this);
    if (errors.length > 0) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    return errors;
  }
}
