import { injectable } from "inversify";
import debug from "debug";
import { Config } from "../../config";

@injectable()
export class Logger {
  constructor(config: Config) {
    const logger = debug(config.name);
    this.log = logger;
  }
  log: (...args: any[]) => any;
}
