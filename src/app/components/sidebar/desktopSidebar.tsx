/** @format */

import React, { FunctionComponent } from "react";

import { SidebarContent } from "./sidebarContent";
import { Aside } from "./aside";

export const DesktopSidebar: FunctionComponent = () => {
  return (
    <>
      <aside className="z-30 flex-shrink-0 hidden w-24 overflow-y-auto bg-white lg:block">
        <SidebarContent />
      </aside>
      <Aside />
    </>
  );
};
