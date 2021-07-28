/** @format */

import React, { useState, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AccountSlice } from "../../../store/slices";
import * as Queries from "../../../queries";
import * as Models from "../../../../models";
import { RootState } from "../../../store";
import { AddAccountModal } from "../../modals/accounts";

const AccountsAside: FunctionComponent = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.id);
  const selectedAccount = useSelector(
    (state: RootState) => state.accountsPage.activeAccount
  );
  const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);

  const { data: accounts } = Queries.useGetAccounts(userId, (data) =>
    dispatch(AccountSlice.actions.setAccounts(data))
  );

  const toggleAddAccountModal = () =>
    setAddAccountModalOpen(!isAddAccountModalOpen);
  const toggleSelectedAccount = (account: Models.Account) =>
    dispatch(AccountSlice.actions.setActiveAccount(account));

  return (
    <div className="animate__animated animate__fadeInLeft">
      <aside className="pl-10 pr-10 flex-shrink-0 hidden overflow-y-auto bg-grey-200 lg:block">
        <section>
          <div className=" mt-16 font-bold text-sm">
            <h3>ACCOUNTS</h3>
          </div>

          <ul className="mt-4 list-disc">
            {accounts?.map((a) => (
              <li
                key={a.id}
                onClick={() => toggleSelectedAccount(a)}
                className={`select-none flex items-center px-10 py-3 text-gray-500 ${
                  a.id === selectedAccount?.id
                    ? "bg-green-100 font-semibold"
                    : ""
                }  cursor-pointer hover:text-gray-800 transition-colors duration-150`}
              >
                {`${a.name} ${a.bank ? `- ${a.bank}` : ""}`}
              </li>
            ))}

            <li
              className="flex items-center py-3 text-gray-500 cursor-pointer transition-colors duration-150"
              onClick={() => setAddAccountModalOpen(!isAddAccountModalOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-black">Add another</p>
            </li>
          </ul>
        </section>
      </aside>

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        closeModal={toggleAddAccountModal}
      />
    </div>
  );
};
export default AccountsAside;
