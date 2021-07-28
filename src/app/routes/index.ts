/** @format */

import { lazy } from "react";

const Accounts = lazy(() => import("../pages/accounts"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const routes: Array<{
  path: string;
  component: any;
}> = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/accounts",
    component: Accounts,
  },
];

export default routes;
