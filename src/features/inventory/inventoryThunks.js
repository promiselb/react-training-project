import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
    "inventory/fetchItems",
    async () => {
        try {
            const res = await fetch('/api/items/');
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
);

export const addItem = createAsyncThunk(
    "inventory/addItem",
    async (newItemData) => {
        try {
            const res = await fetch('/api/items/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItemData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
);

export const updateItem = createAsyncThunk(
    "inventory/updateItem",
    async ({id, updatedItemData}) => {
        try {
            const res = await fetch(`/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItemData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
);

export const deleteItem = createAsyncThunk(
    "inventory/deleteItem",
    async (id) => {
        try {
            await fetch(`/api/items/${id}`, {
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