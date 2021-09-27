import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../domain/user";

export const user = createSlice({
  name: "user",
  reducers: {
    login(state, { payload: userName }: PayloadAction<string>) {
      state.name = userName;
      state.isLogged = true;
    },
    logout(state) {
      state.name = "anonymous";
      state.isLogged = false;
    },
  },
  initialState: {
    name: "Anonymous",
    isLogged: false,
  } as User,
});

export const { login, logout } = user.actions;

export default user.reducer;
