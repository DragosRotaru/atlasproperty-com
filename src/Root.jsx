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

const SEGMENT_DEV_ID = '1z4719htsDR8bcCM0gewNIwwTvxbmMZl';
const SEGMENT_PROD_APP_ID = 'DevUW5byHV7rPWZmtDe2R7zDY36iI2Az';

const history = createBrowserHistory();

/* eslint-disable */
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
analytics.load(SEGMENT_PROD_APP_ID);
analytics.page();
}}();
/* eslint-enable */

ReactDOM.render(
  <ApolloProvider client={ Client }>
    <Router history={ history }>
      <Route path="/" component={ App } />
    </Router>
  </ApolloProvider>,
  document.getElementById('mount'),
);
