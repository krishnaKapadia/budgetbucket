/** @format */

import React, { useState, useEffect, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@geist-ui/react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

import { formatCurrency } from "../../../utils/formatting";
import { PageTitle } from "../../components/typography";
import { useGetAccounts } from "../../queries";
import { RootState } from "../../store";
import { getCurrencyStyle } from "../../../utils/formatting/index";

const Dashboard: FunctionComponent = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const { data: accounts } = useGetAccounts(userId);
  const name = "Krishna";

  return (
    <>
      <PageTitle>Hello {name}</PageTitle>
      <p className="font-small text-gray-400">Welcome back!</p>

      <section className="my-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-lg">OVERVIEW</p>
          {/* <div className="flex flex-row">
            <button className="p-2 w-8 bg-gray-100 rounded-lg mr-4 font-semibold text-gray-400">
              D
            </button>
            <button className="p-2 w-8 bg-gray-100 rounded-lg mr-4 font-semibold text-gray-400">
              W
            </button>
            <button className="p-2 w-8 bg-gray-100 rounded-lg font-semibold">
              M
            </button>
          </div> */}
        </div>

        <div className="flex sm:flex-row">
          <div className="h-32 w-full md:float-left p-4 mr-8 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Income</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(12536)}
              </p>
            </div>
          </div>

          <div className="h-32 w-full md:float-left p-4 mr-8 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Expenses</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(12536)}
              </p>
            </div>
          </div>

          <div className="h-32 w-full md:float-left p-4 mb-8 bg-gray-100 rounded-lg">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">Net Worth</p>
              <p className={`text-3xl font-semibold mb-4`}>
                {formatCurrency(12536)}
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
              className={`h-64 md:w-5/12 lg:w-64 md:h-64 p-4 ${
                idx !== accounts.length - 1 ? "lg:mr-8" : ""
              } mb-8 bg-gray-100 rounded-lg`}
            >
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-lg font-semibold">{name}</p>
                <p
                  className={`text-3xl font-semibold mb-4 ${getCurrencyStyle(
                    balance
                  )}`}
                >
                  {formatCurrency(balance)}
                </p>

                <div className="">
                  <Sparklines data={[5, 10, 5, 20, 15, 5, 8, 10]}>
                    <SparklinesLine
                      color="blue"
                      style={{ strokeWidth: 3, fill: "none" }}
                    />
                  </Sparklines>
                </div>
              </div>
              {/* <p className="text-lg font-semibold text-gray-500">{name}</p>
              <p className="text-3xl font-semibold">
                {formatCurrency(balance)}
              </p> */}
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-5 gap-8">
          {accounts?.map(({ balance, bank, name }) => (
            <div className="flex flex-col items-center justify-between w-80 h-80 p-4 mr-8 bg-gray-100 rounded-lg">
              <p className="">{name}</p>
              <p className="text-xl font-semibold">${balance}</p>
            </div>
          ))}
        </div> */}
      </section>
    </>
  );
};

export default Dashboard;
