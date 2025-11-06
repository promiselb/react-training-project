import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookings = createAsyncThunk(
    "bookings/fetchBookings",
    async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }   
    }
)

export const addBooking = createAsyncThunk(
    "bookings/addBooking",
    async (newBookingData) => {
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBookingData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
)

export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async ({id, updatedItemData: updatedBookingData}) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBookingData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
);

export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (id) => {
        try {
            await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id),
            });
            return id;
        } catch (err) {
            throw err;
        }
    }
);