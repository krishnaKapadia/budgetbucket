/** @format */
import * as Models from "../../models";
import { apiClient } from "../init";

/**
 * Retrieve all accounts that a given user owns.
 * @param userId that owns the accounts.
 * @returns an array of accounts that are owned by the specified user.
 */
export async function Retrieve(userId: string): Promise<Models.Account[]> {
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
