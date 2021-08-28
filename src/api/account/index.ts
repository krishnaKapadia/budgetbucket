/** @format */
import { getAccountStats } from "../../app/pages/accounts/utils";
import * as Models from "../../models";
import { apiClient } from "../init";
import * as Transaction from '../transaction';
/**
 * Retrieve all accounts that a given user owns.
 * @param userId that owns the accounts.
 * @returns an array of accounts that are owned by the specified user.
 */

export async function RetrieveForUser(
  userId: string
): Promise<Models.Account[]> {
  const { data, error } = await apiClient
    .from("account")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw error;
  }

  return Promise.resolve(data);
}

/**
 * Retrieve an account that matches a given id.
 * @param accountId of the account.
 * @returns the matching account if found.
 */

export async function Retrieve(accountId: string): Promise<Models.Account> {
  const { data, error } = await apiClient
    .from("account")
    .select("*")
    .eq("id", accountId);

  if (error) {
    throw error;
  }

  return Promise.resolve(data[0]);
}

/**
 * Creates a new account for a given user.
 * @param userId to create account for.
 * @param account entity to create.
 * @returns true if creation was successful.
 */
export async function Create(
  userId: string,
  account: Models.Account
): Promise<boolean> {
  const { data, error } = await apiClient
    .from("account")
    .insert([{ ...account, userId }]);

  if (error) {
    throw error;
  }

  return Promise.resolve(!!data);
}

export async function UpdateBalance(
  accountId: string,
  balance: number
): Promise<Models.Account> {
  try {
    const account = await Retrieve(accountId);
    const newBalance = account.balance + balance;

    const { data, error } = await apiClient
      .from("account")
      .update({ balance: newBalance })
      .match({ id: accountId });

    if (error) {
      throw error;
    }

    return Promise.resolve(data[0]);
  } catch (error) {
    throw error;
  }
}


export async function GetUserOverview(accounts: Models.Account[]): Promise<any> {
  let income = 0, expenses = 0, netWorth = 0;
  const promises = [];

  if(accounts) {
    for(var account of accounts) {
      promises.push(Transaction.Retrieve(account.id));
    }

    const responses = await Promise.all(promises);


    for(var resIndex in responses) {
      const account = accounts[resIndex];
      const transactions = responses[resIndex];

      const { totalIncome, totalExpenses } = getAccountStats(account, transactions);
      income += totalIncome;
      expenses += totalExpenses;
      netWorth += account.balance;
    }
  }

  return { income, expenses, netWorth };
}