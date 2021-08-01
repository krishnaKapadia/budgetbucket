/** @format */
import React, { FunctionComponent, useState } from "react";
import { Input } from "@windmill/react-ui";
import { Divider } from "@geist-ui/react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import * as Formatting from "../../../utils/formatting";
import {
  getCategoryEmoji,
  getCategoryName,
} from "../../../constants/categories";

import * as Queries from "../../queries";
import { PageTitle } from "../../components/typography";
import * as Modals from "../../components/modals";
import { SearchIcon } from "../../assets/icons";
import { RootState } from "../../store";
import * as Utils from "./utils";

const Accounts: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [isAddTransactionModalOpen, setAddTransactionModalOpen] =
    useState(false);

  const activeAccount = useSelector(
    (state: RootState) => state.accountsPage.activeAccount
  );

  const { data } = Queries.useGetTransactions(activeAccount?.id);

  const { totalIncome, totalExpenses } = Utils.getAccountStats(
    activeAccount,
    data
  );
  const expensesByCategory = Utils.getCategorySpendSummary(data);

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:flex-1">
          <div className="inline-flex items-center justify-between mb-6 w-full">
            <PageTitle>
              {activeAccount?.name} - {activeAccount?.bank}
            </PageTitle>
            <div
              onClick={() =>
                setAddTransactionModalOpen(!isAddTransactionModalOpen)
              }
              className="cursor-pointer shadow-l w-12 h-12 rounded-full bg-purple-600 transition-colors hover:bg-purple-700 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>

          <div className="relative w-full mr-6 focus-within:text-purple-500 mb-8">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>

            <Input
              className="pl-8 text-gray-700 bg-gray-100 rounded-lg w-full"
              style={{ border: "none" }}
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-gray-400">Total Income</p>
              <p className="text-xl font-semibold">
                {Formatting.formatCurrency(totalIncome)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <p className="text-xl font-semibold">
                {Formatting.formatCurrency(Math.abs(totalExpenses))}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400" style={{ textAlign: "end" }}>
                Balance
              </p>
              <p className="text-xl font-semibold">
                {Formatting.formatCurrency(activeAccount?.balance)}
              </p>
            </div>
          </div>

          <Divider />

          <p className="font-semibold text-lg mb-4">Daily transactions</p>

          {data?.map(({ amount, recipient, categoryId, date, note }, idx) => {
            if (
              !isEmpty(searchTerm) &&
              !recipient?.toLowerCase().includes(searchTerm) &&
              !note?.toLowerCase().includes(searchTerm) &&
              !getCategoryName(categoryId).toLowerCase().includes(searchTerm)
            ) {
              return null;
            }

            return (
              <div
                key={idx}
                className="inline-flex justify-between items-center w-full py-4 border-b border-gray-100"
              >
                <div>
                  <p>{recipient || note || getCategoryName(categoryId)}</p>
                  <p className="text-sm text-gray-400">
                    {Formatting.formatDate(date)}
                  </p>
                </div>

                <div>
                  <p
                    className={`text-md font-medium ${Formatting.getCurrencyStyle(
                      amount
                    )}`}
                  >
                    {Formatting.formatCurrency(amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:w-30 lg:ml-6 lg:pl-2 mt-8 w-full">
          <div className="inline-flex items-center justify-between mb-6 w-full">
            <p className="font-medium text-xl mb-4">Monthly Overview</p>
          </div>

          <div className="flex flex-col mb-8 w-full">
            <p className="font-light text-lg mb-4">Expenses by category</p>

            {Object.keys(expensesByCategory).map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center">
                  <i className={`em ${getCategoryEmoji(c)} mr-4`} />
                  <div>
                    <p className="text-sm text-gray-600">
                      {getCategoryName(c)}
                    </p>
                    <p className="text-xl font-semibold">
                      {Formatting.formatCurrency(
                        Math.abs(expensesByCategory[c])
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {Math.round(
                      Math.abs(expensesByCategory[c] / totalExpenses) * 100
                    )}
                    %
                  </p>
                </div>
              </div>
            ))}

            {/* <div className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <i className="em em-wine_glass mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Groceries</p>
                  <p className="text-xl font-semibold">$120.56</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">42%</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Modals.AddTransactionModal
        closeModal={() => {
          setAddTransactionModalOpen(!isAddTransactionModalOpen);
        }}
        isOpen={isAddTransactionModalOpen}
      />
    </>
  );
};

export default Accounts;
