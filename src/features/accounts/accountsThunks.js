import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccounts = createAsyncThunk(
    "accounts/fetchAccounts",
    async () => {
        try {
            const res = await fetch('/api/accounts');
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
)

export const addAccount = createAsyncThunk(
    "accounts/addAccount",
    async (newAccountData) => {
        try {
            const res = await fetch('/api/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAccountData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
)

export const updateAccount = createAsyncThunk(
    "accounts/updateAccount",
    async ({id, updatedAccountData}) => {
        try {
            const res = await fetch(`/api/accounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedAccountData),
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
);

export const deleteAccount = createAsyncThunk(
    "accounts/deleteAccount",
    async (id) => {
        try {
            await fetch(`/api/accounts/${id}`, {
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

// returns true if credentials are provided, false otherwise
export const loginAccount = createAsyncThunk(
    "accounts/loginAccount",
    async (credentials) => {
        return !!credentials
        // try {
        //     const res = await fetch('/api/accounts/login', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(credentials),
        //     });
        //     const data = await res.json();
        //     return data;
        // } catch (err) {
        //     throw err;
        // }
    }
);