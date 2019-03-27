import { injectable } from "inversify";
import { IRepository } from "../../common";
import { RentReceipt } from "./models";
import { Database, Logger } from "../../providers";
import { Collection } from "mongodb";

@injectable()
export class RentReceiptRepository implements IRepository<RentReceipt> {
  private name: string = "rent-receipts";
  private db: Collection;
  private logger: Logger;
  constructor(database: Database, logger: Logger) {
    this.logger = logger;
    if (database.db) {
      this.db = database.db.collection(this.name);
    } else {
      throw new Error("Database not initialized yet");
    }
  }
  async create(input: RentReceipt): Promise<RentReceipt> {
    try {
      const response = await this.db.insertOne(input);
      if (response.result.ok) {
        return input;
      } else {
        throw new Error("RentReceiptRepository Create Operation Failed");
      }
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  getAll(): Promise<RentReceipt[]> {
    try {
      return this.db.find({}).toArray();
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  getById(id: string): Promise<RentReceipt | null> {
    try {
      return this.db.findOne({ id });
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  async updateById(id: string, input: RentReceipt): Promise<RentReceipt> {
    try {
      const response = await this.db.updateOne({ id }, { $set: { input } });
      if (response.result.ok) {
        return input;
      } else {
        throw new Error("RentReceiptRepository Update Operation Failed");
      }
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  deleteById(id: string): Promise<RentReceipt> {
    throw new Error("Method not implemented.");
  }
}
