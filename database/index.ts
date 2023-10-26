import BrowserDatabaseClient from "./BrowserDatabaseClient";
import ServerDatabaseClient from "./ServerDatabaseClient";

const browserDatabaseClient = () => new BrowserDatabaseClient();
const serverDatabaseClient = () => new ServerDatabaseClient();

export { browserDatabaseClient, serverDatabaseClient };
