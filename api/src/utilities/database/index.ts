import { injectable } from "inversify";
import { MongoClient, Db } from "mongodb";
import { Logger } from "../logger";
import { Config } from "../../config";

@injectable()
export class Database {
  private client: MongoClient;
  public db!: Db;
  constructor(private config: Config, private logger: Logger) {
    this.client = new MongoClient(config.db.url, { useNewUrlParser: true });
  }
  async init() {
    await this.client.connect();
    this.logger.log("Database Initialized Successfully");
    this.db = this.client.db(this.config.name);
  }
}
