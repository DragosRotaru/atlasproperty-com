import { injectable } from "inversify";
import { Database, Logger } from "../../utilities";
import { IRepository, ICollection } from "../../interfaces";

@injectable()
export abstract class BaseRepository<Model> implements IRepository<Model> {
  protected name?: string;
  protected collection!: ICollection;
  constructor(private database: Database, protected logger: Logger) {}
  protected init(name: string) {
    this.name = name;
    this.collection = this.database.db.collection(name);
    this.logger.log(`${name} repository initialized`);
  }
  checkInit(): boolean {
    if (!this.collection) {
      throw new Error(
        "Repository Not Initialized, please call init() in Constructor"
      );
    } else {
      return true;
    }
  }
  async create(input: Model): Promise<Model> {
    this.checkInit();
    try {
      const response = await this.collection.insertOne(input);
      if (response.result.ok) {
        return input;
      } else {
        throw new Error("Repository Create Operation Failed");
      }
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  getAll(): Promise<Model[]> {
    this.checkInit();
    try {
      return this.collection.find({}).toArray();
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  getById(id: string): Promise<Model | null> {
    this.checkInit();
    try {
      return this.collection.findOne({ id });
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  getByUserId(userId: string): Promise<Model[]> {
    this.checkInit();
    try {
      return this.collection.find({ userId }).toArray();
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  async updateById(id: string, input: Model): Promise<Model> {
    this.checkInit();
    try {
      const response = await this.collection.updateOne(
        { id },
        { $set: { input } }
      );
      if (response.result.ok) {
        return input;
      } else {
        throw new Error("Repository Update Operation Failed");
      }
    } catch (error) {
      this.logger.log(error.toString());
      throw new Error("Database Error");
    }
  }
  deleteById(id: string): Promise<null> {
    this.checkInit();
    throw new Error("Method not implemented.");
  }
}
