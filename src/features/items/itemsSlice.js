import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./itemsThunks";

const initialState = {
    itemsArray:
     [],
    page: 1,
    perPage: 3,
    totalPages: 100,
    error: null,
    loading: false,
}

const itemsSlice = createSlice({
  name: "items",
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
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsArray = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const selectItems = (state) => state.items;

export { selectItems };

export const { setPerPage , setPage } = itemsSlice.actions;
export default itemsSlice.reducer;
