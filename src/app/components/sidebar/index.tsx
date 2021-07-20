/** @format */

import React, { FunctionComponent } from "react";

import { DesktopSidebar } from "./desktopSidebar";
import { MobileSidebar } from "./mobileSidebar";

export const Sidebar: FunctionComponent = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};
