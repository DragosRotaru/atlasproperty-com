import ApolloClient from "apollo-boost";
import { config } from "../../config";

export const apolloClient = new ApolloClient({
  uri: config.graphql.url,
  credentials: "same-origin",
});
