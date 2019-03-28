import { injectable } from "inversify";
import sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { ResponseError } from "@sendgrid/helpers/classes";
import { Config } from "../../config";
import { Logger } from "../logger";
import { ClientResponse } from "@sendgrid/client/src/response";

@injectable()
export class Mail {
  constructor(config: Config, logger: Logger) {
    sendgrid.setApiKey(config.sendGrid.apiKey);
    this.send = sendgrid.send;
    logger.log("SendGrid Initialized Successfully");
  }
  send: (
    data: MailData,
    isMultiple?: boolean,
    cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void
  ) => Promise<[ClientResponse, {}]>;
}
