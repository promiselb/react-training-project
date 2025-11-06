import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, updateItem, deleteItem } from "./inventoryThunks";
import { useSelector } from 'react-redux';


const initialState = {
  items: [],
  loading: false,
  error: null,
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // You can handle async actions here if needed

    // Fetch Items
    .addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Add Item
    .addCase(addItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    })

    // Update Item
    .addCase(updateItem.fulfilled, (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      } 
    })

    // Delete Item
    .addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  }
});

export const selectInventory = (state) => state.inventory;

export default inventorySlice.reducer;
