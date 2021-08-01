/** @format */
import { useQuery } from "react-query";
import * as Api from "../../api";
import { Account } from "../../models/account";

export function useGetAccounts(userId: string, onSuccess?: (e: any) => void) {
  const options = {
    ...(onSuccess
      ? {
          onSuccess: (data) => onSuccess(data),
        }
      : {}),
  };

  return useQuery<Account[]>(
    "accounts",
    () => Api.Account.RetrieveForUser(userId),
    options
  );
}
