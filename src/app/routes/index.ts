/** @format */

import { lazy } from "react";

const Accounts = lazy(() => import("../pages/accounts"));

const routes: Array<{
  path: string;
  component: any;
}> = [
  {
    path: "/accounts",
    component: Accounts,
  },
];

export default routes;
