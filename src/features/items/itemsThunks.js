import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async () => {
        try {
            const res = await fetch('/api/items')
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
)