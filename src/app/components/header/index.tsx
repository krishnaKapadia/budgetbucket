/** @format */

import React, { useContext, useState, FunctionComponent } from "react";
import { Avatar, Dropdown, DropdownItem } from "@windmill/react-ui";
import swal from "sweetalert";

import { MenuIcon, OutlineLogoutIcon } from "../../assets/icons";
import { SidebarContext } from "../../context";

export const Header: FunctionComponent = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="z-40 py-4 bg-white">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
            >
              <Avatar
                className="align-middle"
                src="https://picsum.photos/200/300"
              />
            </button>

            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem
                onClick={() =>
                  swal(
                    "See you next time!",
                    "You have been successfully logged out!",
                    "success"
                  )
                }
              >
                <OutlineLogoutIcon className="w-4 h-4 mr-3" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
};
