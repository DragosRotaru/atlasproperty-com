import { injectable } from "inversify";
import { EntityRepository } from "../entity";
import { User } from "./model";

@injectable()
export class UserRepository extends EntityRepository<User> {
  public name: string = "users";
}
