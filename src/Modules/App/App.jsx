import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from '../Header/Header';
import Tenants from '../Tenants/Tenants';
import Owners from '../Owners/Owners';
import Company from '../Company/Company';
import Properties from '../Properties/Properties';
import Property from '../Property/Property';
import Contact from '../Contact/Contact';
import Login from '../Login/Login';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return ([
      <Header key="header" />,
      <Switch key="switch" >
        <Route path="/tenants" exact component={ Tenants } />
        <Route path="/owners" exact component={ Owners } />
        <Route path="/company" exact component={ Company } />
        <Route path="/properties" exact component={ Properties } />
        <Route path="/properties/:id" component={ Property } />
        <Route path="/contact" component={ Contact } />
        <Route path="/login" component={ Login } />
        <Route path="/" component={ Home } /> { /* must be last */ }
      </Switch>,
    ]);
  }
}

export default App;
