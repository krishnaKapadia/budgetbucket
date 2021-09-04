/** @format */

import { lazy } from "react";

const Accounts = lazy(() => import("../pages/accounts"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Buckets = lazy(() => import("../pages/buckets"));

const routes: Array<{
  path: string;
  component: any;
  exact?: boolean;
}> = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/accounts",
    component: Accounts,
    exact: false,
  },
  {
    path: '/buckets/:id',
    component: Buckets,
    exact: false
  },
  {
    path: '/buckets',
    component: Buckets,
    exact: false
  }
];

export default routes;
