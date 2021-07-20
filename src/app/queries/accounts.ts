/** @format */
import { useQuery } from "react-query";
import * as Api from "../../api";

export function useGetAccounts(userId: string, onSuccess?: (e: any) => void) {
  const options = {
    ...(onSuccess
      ? {
          onSuccess: (data) => onSuccess(data),
        }
      : {}),
  };

  return useQuery("accounts", () => Api.Account.Retrieve(userId), options);
}
