/** @format */

import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Auth as SupabaseAuth } from "@supabase/ui";

import { apiClient } from "./api/init";
import { Slices } from "./app/store";

const Layout = lazy(() => import("./app/containers/layout"));
const Auth = lazy(() => import("./app/pages/auth"));

function App() {
  const dispatch = useDispatch();
  const auth = SupabaseAuth.useUser();

  const isLoggedIn = !!auth.session && !!auth.user;

  useEffect(() => {
    const { data: listener } = apiClient.auth.onAuthStateChange(
      (_event, session) => {
        console.log(session);

        dispatch(Slices.UserSlice.actions.setUserId(session?.user?.id));
      }
    );

    return () => listener?.unsubscribe();
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/app" component={Layout} />
            <Redirect from="/" to={"/app"} />
          </Switch>
        </Router>
      </>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/app"
            render={() => (isLoggedIn ? <Layout /> : <Redirect to="/auth" />)}
          />
          <Route path="/auth" component={Auth} />
          <Redirect from="/" to={isLoggedIn ? "/app" : "/auth"} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
