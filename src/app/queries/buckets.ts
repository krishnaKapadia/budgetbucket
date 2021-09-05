/** @format */
import { useQuery } from "react-query";

import * as Models from "../../models";
import * as Api from "../../api";

export function useGetBuckets(userId: string) {
  return useQuery<Models.Bucket[]>(["buckets", userId], () =>
    Api.Bucket.Retrieve(userId)
  );
}
