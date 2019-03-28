import { Entity } from "../entity";
import { CreateUserDTO } from "./dtos";
import { userValidator } from "./validator";

export class User extends Entity {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  constructor(createDTO: CreateUserDTO) {
    super();
    this.username = createDTO.username;
    this.email = createDTO.email;
    this.firstName = createDTO.firstName;
    this.lastName = createDTO.lastName;
    this.passwordHash = createDTO.password;
  }
  validate() {
    return userValidator(this);
  }
}
