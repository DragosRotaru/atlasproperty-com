import { IoCContainer } from "./ioc-container";
import { Server, Database } from "./utilities";

(async () => {
  const database = IoCContainer.get(Database);
  await database.init();
  const server = IoCContainer.get(Server);
  server.start();
})();
