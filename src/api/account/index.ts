/** @format */
import * as Models from "../../models";
import { apiClient } from "../init";

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
