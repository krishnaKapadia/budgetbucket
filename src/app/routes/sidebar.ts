/** @format */

type RouteBase = {
  path?: string;
  name: string;
  icon?: string;
  exact?: boolean;
};

export interface RouteData extends RouteBase {
  routes?: RouteData[];
}

export const routes: Array<RouteData> = [
  {
    path: "/app/dashboard",
    icon: "HomeIcon",
    name: "Home",
  },
  {
    path: "/app/accounts",
    icon: "MoneyIcon",
    name: "Clients",
  },
  {
    path: "/app/buckets",
    icon: "BucketIcon",
    name: "Buckets",
  }
];
