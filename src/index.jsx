import "babel-polyfill";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Style from "./style.css";
import { apolloClient } from "./apollo-client";
import {
  Dashboard,
  Login,
  Tenants,
  Management,
  Development,
  Properties,
  Property,
  Team,
  Contact,
  Home,
  Header,
} from "./components";
import { config } from "./config";

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <div className={Style.container}>
        <Switch key="switch">
          <Fragment>
            <Header key="header" />
            <Route path="/properties" exact component={Properties} />
            <Route path="/properties/:id/:unitId" exact component={Property} />
            <Route path="/management" exact component={Management} />
            <Route path="/development" exact component={Development} />
            <Route path="/team" exact component={Team} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/tenants" exact component={Tenants} />
            <Route path="/" exact component={Home} />
          </Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
