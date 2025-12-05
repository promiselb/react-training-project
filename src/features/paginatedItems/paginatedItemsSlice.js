import { createSlice } from "@reduxjs/toolkit";
import { fetchPaginatedItems } from "./paginatedItemsThunks";

export const NUMBER_OF_ITEMS = 6;

const initialState = {
    paginatedItemsArray:
     [],
    page: 1,
    perPage: 3,
    totalPages: NUMBER_OF_ITEMS,
    error: null,
    loading: false,
}

const paginatdItemsSlice = createSlice({
  name: "paginatdItems",
  initialState,
  reducers: {
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.paginatedItemsArray = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});



export const selectPaginatedItems = (state) => state.paginatdItems;

export const { setPerPage , setPage } = paginatdItemsSlice.actions;

export default paginatdItemsSlice.reducer;
