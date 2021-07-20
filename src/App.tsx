/** @format */

import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Layout = lazy(() => import("./app/containers/layout"));

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/app" component={Layout} />
          <Redirect exact from="/" to="/app" />
        </Switch>
      </Router>
    </>
  );
}
export default App;
