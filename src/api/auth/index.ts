/** @format */
import { apiClient } from "../init";

export async function signOut(callback: () => void) {
  const res = await apiClient.auth.signOut();
  callback();
}
