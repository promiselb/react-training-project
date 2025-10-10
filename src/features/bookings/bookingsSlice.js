import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.push(action.payload);
    },
    cancelBooking: (state, action) => {
      return state.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
