import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const getBuyingList = (s: RootState) => s.buyingList;
export const getUser = (s: RootState) => s.user;
export const buyingListSelector = createSelector(
  getBuyingList,
  getUser,
  (buyingList, user) => ({ buyingList, user }),
);
