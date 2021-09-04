/** @format */

import React, {
  lazy,
  Suspense,
  useContext,
  useEffect,
  FunctionComponent,
} from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { ThemedSuspense } from "../components/themedSuspense";
import { SidebarContext } from "../context/sidebar";
import routes from "../routes";

const Page404 = lazy(() => import("../pages/404"));

const Layout: FunctionComponent = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full bg-white overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <Suspense fallback={<ThemedSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  const { path, exact = true, component: Component } = route;

                  return Component ? (
                    <Route
                      key={i}
                      exact={exact}
                      path={`/app${path}`}
                      render={(props: any) => <Component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect exact from="/app" to="/app/buckets" />
                <Route component={Page404} />
              </Switch>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
