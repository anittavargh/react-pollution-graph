import React from "react";

import { NavBar, Footer, Loading } from "./components";
import { Home, Graph } from "./views";

import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import { Route, Switch } from "react-router-dom";
import './redux';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/graph" component={Graph} />
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
