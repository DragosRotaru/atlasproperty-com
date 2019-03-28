import {
  controller,
  httpGet,
  httpDelete,
  requestParam,
  BaseHttpController,
  requestBody,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { IService } from "../../interfaces";

@controller("base")
export abstract class BaseController<
  Model,
  CreateDTO,
  UpdateDTO
> extends BaseHttpController {
  constructor(protected service: IService<Model, CreateDTO, UpdateDTO>) {
    super();
  }
  @httpGet("/")
  async onGetAll() {
    try {
      const result = await this.service.getAll();
      return this.json(result, 200);
    } catch (error) {
      return this.statusCode(400);
    }
  }
  @httpGet("/:id")
  async onGetById(@requestParam("id") id: string) {
    try {
      const result = await this.service.getById(id);
      return this.json(result, 200);
    } catch (error) {
      return this.statusCode(400);
    }
  }
  @httpPost("/")
  async onCreate(@requestBody() body: CreateDTO) {
    try {
      const result = await this.service.create(body);
      return this.json(result, 200);
    } catch (error) {
      return this.statusCode(400);
    }
  }
  @httpPut("/:id")
  async onUpdate(
    @requestParam("id") id: string,
    @requestBody() body: UpdateDTO
  ) {
    try {
      const result = await this.service.updateById(id, body);
      return this.json(result, 200);
    } catch (error) {
      return this.statusCode(400);
    }
  }
  @httpDelete("/:id")
  async onDelete(@requestParam("id") id: string) {
    try {
      const result = await this.service.deleteById(id);
      return this.json(result, 200);
    } catch (error) {
      return this.statusCode(400);
    }
  }
}
