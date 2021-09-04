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
    path: "/app/buckets/e197a6bf-67af-42e4-8db4-ef0306ec964c",
    icon: "BucketIcon",
    name: "Buckets",
  }
];
