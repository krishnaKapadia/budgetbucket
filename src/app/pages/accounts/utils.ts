/** @format */
import * as Models from "../../../models";

export function getAccountStats(
  account: Models.Account,
  transactions: Models.Transaction[]
) {
  let totalIncome = 0,
    totalExpenses = 0;

  transactions?.forEach(({ amount }) => {
    if (amount > 0) {
      totalIncome += amount;
    } else if (amount < 0) {
      totalExpenses += amount;
    }
  });

  return {
    totalIncome,
    totalExpenses,
    totalNet: account?.balance + totalIncome - totalExpenses,
  };
}

export function getCategorySpendSummary(transactions: Models.Transaction[]) {
  let dataByCategory = {};

  transactions?.forEach(({ categoryId, amount }) => {
    if (amount > 0) {
      return;
    }

    if (dataByCategory[categoryId]) {
      dataByCategory[categoryId] += amount;
    } else {
      dataByCategory[categoryId] = amount;
    }
  });

  return dataByCategory;
}

export function calculateCategoryPercentage() {}
