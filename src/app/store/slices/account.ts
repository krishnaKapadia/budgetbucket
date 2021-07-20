/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Models from "../../../models";

export type AccountState = {
  activeAccount: Models.Account;
  accounts: Models.Account[];
};

const initialState: AccountState = {
  activeAccount: null,
  accounts: [],
};

export const AccountSlice = createSlice({
  name: "accountsPage",
  initialState,
  reducers: {
    setActiveAccount: (state, action: PayloadAction<Models.Account>) => {
      state.activeAccount = action.payload;
    },
    setAccounts: (state, action: PayloadAction<Models.Account[]>) => {
      state.accounts = action.payload;
      if (!!!state.activeAccount) {
        state.activeAccount = action.payload[0];
      }
    },
  },
});
