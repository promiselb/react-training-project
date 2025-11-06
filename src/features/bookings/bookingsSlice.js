// src/features/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBookings, addBooking, updateBooking, deleteBooking } from './bookingsThunks';

const initialState = {
  bookingsArray: [],
  loading: false,
  error: null
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    // You can handle async actions here if needed

    // Fetch Bookings
    .addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingsArray = action.payload;
    })
    .addCase(fetchBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Add Booking
    .addCase(addBooking.fulfilled, (state, action) => {
      state.bookingsArray.push(action.payload);
    })

    // Update Booking
    .addCase(updateBooking.fulfilled, (state, action) => {
      const index = state.bookingsArray.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookingsArray[index] = action.payload;
      } 
    })

    // Delete Booking
    .addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookingsArray = state.bookingsArray.filter(booking => booking.id !== action.payload);
    });
  }
});

export const selectBookings = (state) => state.bookings;

export default bookingsSlice.reducer;
