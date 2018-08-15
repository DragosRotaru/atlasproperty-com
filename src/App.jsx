// @flow
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import createBrowserHistory from 'history/createBrowserHistory';
import Client from './ConfigureApolloClient';
import Style from './App.css';

// Containers
import Tenants from './Containers/Tenants';
import Management from './Containers/Management';
import Development from './Containers/Development';
import Properties from './Containers/Properties';
import Property from './Containers/Property';
import Team from './Containers/Team';
import Contact from './Containers/Contact';
import Home from './Containers/Home';
import Header from './Containers/Header';

const history = createBrowserHistory();

class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={ Client }>
        <Router history={ history }>
          <div className={ Style.container }>
            <Header key="header" />
            <Switch key="switch" >
              <Route path="/properties" exact component={ Properties } />
              <Route path="/properties/:id/:unitId" component={ Property } />
              <Route path="/management" exact component={ Management } />
              <Route path="/development" exact component={ Development } />
              <Route path="/team" component={ Team } />
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
