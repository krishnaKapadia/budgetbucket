/** @format */
import React, { FunctionComponent } from "react";
import { NavLink, Route } from "react-router-dom";

import { routes } from "../../routes/sidebar";
import * as Icons from "../../assets/icons";

function Icon({ icon, ...props }: any) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

export const SidebarContent: FunctionComponent = () => {
  return (
    <div className="py-4 text-gray-500">
      <div className="flex flex-col text-black font-bold text-xl justify-center items-center py-4">
        <p style={{ color: "#08a88a" }}>BB</p>
      </div>

      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <div />
          ) : (
            <li className="relative px-6 py-2 mb-2" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex justify-center items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                activeClassName="text-gray-800"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 right-0 w-1 bg-black rounded-tl-lg rounded-bl-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-6 h-6"
                  aria-hidden="true"
                  icon={route.icon}
                />
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
