import { injectable } from "inversify";
import { IService, IModel, IRepository } from "../../interfaces";

@injectable()
export abstract class BaseService<Model, CreateDTO, UpdateDTO>
  implements IService<Model, CreateDTO, UpdateDTO> {
  constructor(protected repo: IRepository<Model>, protected model: IModel) {}
  async getAll(): Promise<Model[]> {
    try {
      const entities = await this.repo.getAll();
      return entities;
    } catch (error) {
      throw new Error("Could Not Retrieve All Entities");
    }
  }
  async getById(id: string): Promise<Model | null> {
    try {
      const entities = await this.repo.getById(id);
      return entities;
    } catch (error) {
      throw new Error(`Could Not Retrieve Entity By ID ${id}`);
    }
  }
  async create(dto: CreateDTO): Promise<Model> {
    try {
      throw new Error("Not Implemeted Yet");
    } catch (error) {
      throw new Error(`Could Not Create Entity`);
    }
  }
  async updateById(id: string, dto: UpdateDTO): Promise<Model> {
    try {
      throw new Error("Not Implemeted Yet");
    } catch (error) {
      throw new Error(`Could Not Update Entity By Id`);
    }
  }
  async deleteById(id: string): Promise<null> {
    try {
      await this.repo.deleteById(id);
      return null;
    } catch (error) {
      throw new Error(`Could Not Delete Entity By ID ${id}`);
    }
  }
}
