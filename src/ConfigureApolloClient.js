import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { defaults, resolvers } from './Content/Content';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const stateLink = withClientState({ resolvers, cache, defaults });

const httpLink = new HttpLink({
  uri: 'https://api.graphcms.com/simple/v1/atlaswebsite',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink]),
});

export default client;
