/** @format */
import { apiClient } from "../init";

/**
 * Registers a user to the service
 * @returns boolean based on success
 */
export async function register(
  email: string,
  password: string
): Promise<boolean> {
  const res = apiClient.auth.signUp({
    email: "",
    password: "",
  });
  return Promise.resolve(true);
}

export async function signOut(callback: () => void) {
  const res = await apiClient.auth.signOut();
  callback();
}
