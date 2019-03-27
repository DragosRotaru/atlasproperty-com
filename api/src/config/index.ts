import { injectable } from "inversify";

const URL = "http://localhost";
const NAME = "service-atlasproperty-com";
const API_PORT = 8000;
const CLIENT_PORT = 8080;

@injectable()
export class Config {
  name: string;
  api: {
    port: number;
    url: string;
  };
  client: {
    port: number;
    url: string;
  };
  db: {
    url: string;
  };
  security: {
    secret: string;
    origin: string;
    withCredentials: boolean;
  };
  sendGrid: {
    apiKey: string;
  };
  contacts: {
    [key: string]: {
      name: string;
      email: string;
    };
  };
  constructor() {
    this.name = NAME;
    this.api = {
      port: API_PORT,
      url: `${URL}:${API_PORT}`,
    };
    this.client = {
      port: CLIENT_PORT,
      url: `${URL}:${CLIENT_PORT}`,
    };
    this.db = { url: "mongodb://localhost:27017" };
    this.security = {
      secret: "povjewfpovejmfwxjf-xwefj-piwfx-epo",
      origin: this.client.url,
      withCredentials: true,
    };
    this.sendGrid = {
      apiKey:
        "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",
    };
    this.contacts = {
      admin: {
        name: "Atlas IT Admin",
        email: "administrator@atlasproperty.com",
      },
      office: {
        name: "Atlas Office Admin",
        email: "dragos@rotaru.co",
      },
      leasing: {
        name: "Atlas Leasing",
        email: "dragos@rotaru.co",
      },
    };
  }
}
