/** @format */

import * as Models from "../../models";
import { apiClient } from "../init";

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
