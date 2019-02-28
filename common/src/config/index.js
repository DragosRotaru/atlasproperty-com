const URL = "http://localhost";

const API_PORT = 8000;
const API_VERSION = 1.0;
const API_URL = `${URL}:${API_PORT}/v${String(API_VERSION)}`

const CLIENT_PORT = 8080;
const CLIENT_URL = `${URL}:${CLIENT_PORT}`;

export const config = {
  name: "service-atlasproperty-com",
  client: { port: CLIENT_PORT, url: CLIENT_URL },
  graphql: {
    url: "https://api.graphcms.com/simple/v1/atlaswebsite",
  },
  api: {
    port: API_PORT,
    url: API_URL,
    version: API_VERSION,
  },
  db: { url: "mongodb://localhost:27017" },
  models: {
    auth: {
      name: "auth",
      api: `${API_URL}/auth`,
      client: `${CLIENT_URL}/auth`,
    },
    rentReceipts: {
      name: "rent-receipts",
      api: `${API_URL}/rent-receipts`,
      client: `${CLIENT_URL}/rent-receipts`,
    }
  }
  contacts: {
    admin: {
      name: "Atlas IT Admin",
      email: "administrator@atlasproperty.com"
    },
    office: {
      name: "Atlas Office Admin",
      email: "admin@atlasproperty.com"
    }
  }
};