const URL = "http://localhost";

const API_PORT = 8000;
const API_URL = `${URL}:${API_PORT}`;

const CLIENT_PORT = 8080;
const CLIENT_URL = `${URL}:${CLIENT_PORT}`;

export const config = {
  graphql: {
    url: "https://api.graphcms.com/simple/v1/atlaswebsite",
  },
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
    },
    inquiries: {
      name: "inquiries",
      api: `${API_URL}/inquiries`,
      client: `${CLIENT_URL}/inquiries`,
    },
  },
  contacts: {
    admin: {
      name: "Atlas IT Admin",
      email: "administrator@atlasproperty.com",
    },
    office: {
      name: "Atlas Office Admin",
      email: "dragos@rotaru.co",
    },
    leasing: {
      commercial: "marc@atlaspropery.com",
      name: "Atlas Leasing",
      email: "dragos@rotaru.co",
    },
  },
  security: {
    withCredentials: true,
  },
};
