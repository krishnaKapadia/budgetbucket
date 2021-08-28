/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id: string;
  email: string;
  displayName: string;
};

const initialState: UserState = {
  id: null,
  email: null,
  displayName: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<any>) => {
      state.id = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<any>) => {
      state.email = action.payload;
      const displayName = action.payload.split('@')[0];
      state.displayName = displayName;
    }
  },
});
