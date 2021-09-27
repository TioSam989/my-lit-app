import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Products } from "../../domain/buyingList";

export const buyingList = createSlice({
  name: "buying-list",
  reducers: {
    addProduct(state, { payload }: PayloadAction<Product>) {
      state.push(payload);
    },
  },
  initialState: [] as Products,
});

export const { addProduct } = buyingList.actions;

export default buyingList.reducer;
