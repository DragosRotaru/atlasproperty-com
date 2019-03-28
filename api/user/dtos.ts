export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type UserLoginDTO = {
  username: string;
  password: string;
};
