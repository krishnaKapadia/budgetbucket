/** @format */
import React, { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

import AccountsAside from "./accountsAside";

export const Aside: FunctionComponent = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/app/accounts":
      return <AccountsAside />;

    default:
      return null;
  }
};
