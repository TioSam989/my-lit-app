import { configureStore } from "@reduxjs/toolkit";
import { buyingList, user } from "./slices";

export const store = configureStore({
  reducer: {
    buyingList,
    user,
  },
});

(window as any).store = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
