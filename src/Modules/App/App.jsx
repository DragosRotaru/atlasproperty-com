import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from '../Header/Header';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Login from '../Login/Login';
import Properties from '../Properties/Properties';
import Property from '../Property/Property';

class App extends Component {
  render() {
    return ([
      <Header key="header" />,
      <Switch key="switch" >
        <Route path="/properties" component={ Properties } />
        <Route path="/properties/:property" component={ Property } />
        <Route path="/about" exact component={ About } />
        <Route path="/contact" component={ Contact } />
        <Route path="/login" component={ Login } />
        <Route path="/" component={ Home } /> { /* must be last */ }
      </Switch>,
    ]);
  }
}

export default App;
