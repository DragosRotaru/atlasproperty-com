// @flow
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import createBrowserHistory from 'history/createBrowserHistory';
import Client from './ConfigureApolloClient';
import Style from './App.css';

// Containers
import Tenants from './Containers/Tenants/Tenants';
import Solutions from './Containers/Solutions/Solutions';
import Properties from './Containers/Properties/Properties';
import Property from './Containers/Property/Property';
import Contact from './Containers/Contact/Contact';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';

const history = createBrowserHistory();

class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={ Client }>
        <Router history={ history }>
          <div className={ Style.container }>
            <Header key="header" />
            <Switch key="switch" >
              <Route path="/solutions" exact component={ Solutions } />
              <Route path="/properties" exact component={ Properties } />
              <Route path="/properties/:id/:unitId" component={ Property } />
              <Route path="/contact" component={ Contact } />
              <Route path="/tenants" exact component={ Tenants } />
              <Route path="/" component={ Home } /> { /* must be last */ }
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
