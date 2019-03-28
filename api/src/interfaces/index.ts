import { Collection } from "mongodb";
import { ValidationErrorItem } from "joi";

export interface IRepository<Model> {
  create(input: Model): Promise<Model>;
  getAll(): Promise<Model[]>;
  getById(id: string): Promise<Model | null>;
  updateById(id: string, input: Model): Promise<Model>;
  deleteById(id: string): Promise<null>;
}

export interface IService<Model, CreateDTO, UpdateDTO> {
  create(input: CreateDTO): Promise<Model>;
  getAll(): Promise<Model[]>;
  getById(id: string): Promise<Model | null>;
  updateById(id: string, input: UpdateDTO): Promise<Model>;
  deleteById(id: string): Promise<null>;
}

export interface IModel extends IEntity, IValidatable {}

export interface INewable {
  new (...args: any[]): any;
}

export interface IEntity {
  id: any;
}

export interface IValidatable {
  isValid: boolean | null;
  validate(): ValidationErrorItem[];
}

export interface ICollection extends Collection {}
