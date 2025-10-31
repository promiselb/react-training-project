// src/features/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBookings } from '../../utils/fetchFunctions';

const initialState = await fetchBookings() || [
  { id: 1, itemName: 'Laptop' },
  { id: 2, itemName: 'Phone' },
];

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      // example booking: { id: 1, itemName: 'Laptop' }
      state.push(action.payload);
    },
    
    cancelBooking: (state, action) => {
      // Return new filtered array = immutable update
      return state.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;

export const selectBookings = (state) => state.bookings;

export default bookingSlice.reducer;
