import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from '../Header/Header';
import Tenants from '../Tenants/Tenants';
import Solutions from '../Solutions/Solutions';
import Properties from '../Properties/Properties';
import Property from '../Property/Property';
import Contact from '../Contact/Contact';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return ([
      <Header key="header" />,
      <Switch key="switch" >
        <Route path="/solutions" exact component={ Solutions } />
        <Route path="/properties" exact component={ Properties } />
        <Route path="/properties/:id" component={ Property } />
        <Route path="/contact" component={ Contact } />
        <Route path="/tenants" exact component={ Tenants } />
        <Route path="/" component={ Home } /> { /* must be last */ }
      </Switch>,
    ]);
  }
}

export default App;
