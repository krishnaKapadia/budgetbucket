/** @format */
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  id: string;
};

const initialState: UserState = {
  id: "ed238f4b-ca4e-4eca-ae66-7ec9fdce3e28",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
