import { injectable } from "inversify";
import { InversifyExpressServer, getRouteInfo } from "inversify-express-utils";
import prettyjson from "prettyjson";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";

import { IoCContainer } from "../../ioc-container";
import { Config } from "../../config";
import { Logger } from "../logger";

@injectable()
export class Server {
  private config: Config;
  private logger: Logger;
  public server: InversifyExpressServer;
  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.server = new InversifyExpressServer(IoCContainer);
  }
  setConfig(): void {
    this.server.setConfig(app => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(
        cors({
          origin: this.config.security.origin,
          credentials: this.config.security.withCredentials,
        })
      );
      app.use(cookieParser());
      app.use(
        session({
          secret: this.config.security.secret,
          resave: false,
          saveUninitialized: true,
        })
      );
      app.use(helmet());
    });
  }
  start(): void {
    const app = this.server.build();
    const routeInfo = getRouteInfo(IoCContainer);
    console.log(prettyjson.render({ routes: routeInfo }));
    app.listen(this.config.api.port, (error: any) => {
      if (error) {
        this.logger.log("error", error);
      } else {
        this.logger.log(
          "info",
          `${this.config.name} API Initialized on ${this.config.api.port}`
        );
      }
    });
  }
}
