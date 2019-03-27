import { injectable } from "inversify";
import { Database, Logger } from "../../utilities";
import { BaseRepository } from "../base";
import { Inquiry } from "./model";

@injectable()
export class InquiryRepository extends BaseRepository<Inquiry> {
  constructor(database: Database, logger: Logger) {
    super(database, logger);
    this.init("inquiries");
  }
}
