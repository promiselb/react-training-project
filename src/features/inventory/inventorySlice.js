import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Laptop', quantity: 5 },
  { id: 2, name: 'Phone', quantity: 10 },
];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    sellItem: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { sellItem, addItem } = inventorySlice.actions;
export default inventorySlice.reducer;
