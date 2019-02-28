import axios from "axios";
import { apolloClient } from "../ApolloClient";
import { config } from "../../../../common/src";

const ENDPOINT = config.models.auth.api;

export interface IAuthService {
  constructor(): void;
  isLoggedIn(): boolean;
  getUserID(): string;
  login(): void;
  logout(): void;
}
export class AuthService implements IAuthService {
  constructor(cookieName: string): void {}
  isLoggedIn(): boolean {
    return localStorage.getItem("userID") !== null;
  }
  login(username: string, password: string): void {
    axios
      .request({
        method: "post",
        url: `${ENDPOINT}/login`,
        data: {
          username,
          password,
        },
        withCredentials: true,
      })
      .then(res => {
        localStorage.setItem("userID", res.data.id);
        window.location.replace("/");
      })
      .catch(err => alert("Incorrect Credentials"));
  }
  logout(): void {
    axios
      .post(`${ENDPOINT}/logout`)
      .then(res => {
        localStorage.removeItem("userID");
        apolloClient.resetStore();
        window.location.replace("/login");
      })
      .catch(err => alert(err.toString()));
  }
}
