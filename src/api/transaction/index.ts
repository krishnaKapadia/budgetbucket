/** @format */

import * as Models from "../../models";
import { apiClient } from "../init";

/**
 * Retrieve all transactions for a given account.
 * @param accountId to retrieve transactions for
 * @returns an array of transactions for the specified account.
 */
export async function Retrieve(
  accountId: string
): Promise<Models.Transaction[]> {
  const { data, error } = await apiClient
    .from("transaction")
    .select("*")
    .order("date", { ascending: false })
    .eq("accountId", accountId);

  if (error) {
    throw error;
  }

  return Promise.resolve(data);
}

/**
 * Creates a new transaction for a given account.
 * @param accountId to create the transaction for.
 * @param transaction entity to create.
 * @returns true if creation was successful.
 */
export async function Create(
  accountId: string,
  transaction: Models.Transaction
): Promise<boolean> {
  const { data, error } = await apiClient
    .from("transaction")
    .insert([{ ...transaction, accountId }]);

  if (error) {
    throw error;
  }

  return Promise.resolve(!!data);
}
