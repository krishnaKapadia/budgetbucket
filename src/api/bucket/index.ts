/** @format */
import * as Models from "../../models";
import { apiClient } from "../init";

/**
 * Retrieved a list of buckets for a given user.
 * @param userId the user whose buckets are to be retrieved.
 * @returns Array of <Bucket>
 */
export async function Retrieve(userId: string): Promise<Models.Bucket[]> {
  if (!userId) {
    return Promise.reject();
  }

  const { data, error } = await apiClient
    .from("bucket")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw error;
  }

  return Promise.resolve(data);
}

export async function Create(
  userId: string,
  bucket: Models.Bucket
): Promise<boolean> {
  if (!userId) {
    return Promise.reject();
  }

  const { data, error } = await apiClient
    .from("bucket")
    .insert([{ ...bucket, userId }]);

  if (error) {
    throw error;
  }

  return Promise.resolve(!!data);
}
