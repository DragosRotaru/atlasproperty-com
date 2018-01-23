// Core Library Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import createBrowserHistory from 'history/createBrowserHistory';

// Root level Imports
import Client from './ConfigureApolloClient';
import App from './Modules/App/App';
import Style from './Style.css';

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={ Client }>
    <Router history={ history }>
      <Route path="/" component={ App } />
    </Router>
  </ApolloProvider>,
  document.getElementById('mount'),
);
