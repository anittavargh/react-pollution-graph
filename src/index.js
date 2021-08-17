import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { Provider } from 'react-redux';
import store from './redux/index';




ReactDOM.render(
  <Router>
    <Provider store={store}>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
    </Provider>
  </Router>,
  document.getElementById("root")
);

