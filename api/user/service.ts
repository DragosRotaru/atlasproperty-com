import { injectable } from "inversify";
import bcrypt from "bcrypt";
import { UserRepository } from "./repository";
import { UserLoginDTO } from "./dtos";
import { User } from "./model";

@injectable()
export class UserService {
  private repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  async login(dto: UserLoginDTO): Promise<User | null> {
    const user = await this.repo.getByUsername(dto.username);
    if (!user) {
      return null;
    }
    const passwordIsValid = await this.checkPassword(
      dto.password,
      user.passwordHash
    );
    if (passwordIsValid) {
      return user;
    }
    return null;
  }
  async deserialize(username: string): Promise<User | null> {
    return this.repo.getByUsername(username);
  }
  serialize(user: User): string {
    return user.username;
  }
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 20);
  }
  private checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
