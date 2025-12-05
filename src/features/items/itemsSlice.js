import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./itemsThunks";

const initialState = {
    itemsArray:
     [],
    error: null,
    loading: false,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsArray = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const selectItems = (state) => state.items;

export { selectItems };
export default itemsSlice.reducer;
