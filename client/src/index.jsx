import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Style from "./style.css";
import {
  Tenants,
  Management,
  Development,
  Properties,
  Property,
  Team,
  Contact,
  Home,
  Header,
} from "./Components";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "https://api.graphcms.com/simple/v1/atlaswebsite",
    credentials: "same-origin",
  }),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <div className={Style.container}>
          <Header key="header" />
          <Switch key="switch">
            <Route path="/properties" exact component={Properties} />
            <Route path="/properties/:id/:unitId" component={Property} />
            <Route path="/management" exact component={Management} />
            <Route path="/development" exact component={Development} />
            <Route path="/team" exact component={Team} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/tenants" exact component={Tenants} />
            <Route path="/" component={Home} /> {/* must be last */}
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
