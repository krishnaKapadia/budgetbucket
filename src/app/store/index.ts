/** @format */
import { configureStore } from "@reduxjs/toolkit";

import * as Slices from "./slices";

export const Store = configureStore({
  reducer: {
    [Slices.AccountSlice.name]: Slices.AccountSlice.reducer,
    [Slices.UserSlice.name]: Slices.UserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;

export { Slices };
