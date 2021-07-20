/** @format */

import * as Api from "../../api";
import { useQuery } from "react-query";

export function useGetTransactions(accountId: string) {
  return useQuery(["transactions", accountId], () =>
    Api.Transaction.Retrieve(accountId)
  );
}
