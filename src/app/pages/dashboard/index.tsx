/** @format */

import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { GetUserOverview } from "../../../api/account";

import { formatCurrency } from "../../../utils/formatting";
import { PageTitle } from "../../components/typography";
import { useGetAccounts } from "../../queries";
import { RootState } from "../../store";
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";

const Dashboard: FunctionComponent = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const displayName = useSelector((state: RootState) => state.user.displayName);

  const { data: accounts } = useGetAccounts(userId);
  const { data: overview } = useQuery(["userOverview", accounts], () => GetUserOverview(accounts));

  return (
    <>
      <PageTitle>Hello {displayName}</PageTitle>
      <p className="font-small text-gray-400">Welcome back!</p>

      <section className="my-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-lg">OVERVIEW</p>
          <div className="flex flex-row">
            {/* <button className="p-2 w-8 bg-gray-100 rounded-lg mr-4 font-semibold text-gray-400">
              D
            </button>
            <button className="p-2 w-8 bg-gray-100 rounded-lg mr-4 font-semibold text-gray-400">
              W
            </button> */}
            <button className="p-2 w-10 bg-gray-100 rounded-lg font-semibold">
              All
            </button>
          </div>
        </div>

        <div className="flex sm:flex-row">
          <div className="h-32 w-full md:float-left p-4 mr-8 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Income</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(overview?.income)}
              </p>
            </div>
          </div>

          <div className="h-32 w-full md:float-left p-4 mr-8 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Expenses</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(overview?.expenses)}
              </p>
            </div>
          </div>

          <div className="h-32 w-full md:float-left p-4 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Net Worth</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(overview?.netWorth)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <p className="font-bold text-lg mb-4">ACCOUNTS</p>

        <div className="flex flex-wrap md:justify-between">
          {accounts?.map(({ balance, bank, name }, idx) => (
            <div
              key={idx}
              className={`h-64 md:w-5/12 lg:w-64 md:h-64 p-4 ${
                idx !== accounts.length - 1 ? "lg:mr-8" : ""
              } mb-8 bg-gray-100 rounded-lg`}
            >
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-lg font-semibold">{name}</p>
                <p
                  className={`text-3xl font-semibold mb-4`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
