import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, addAccount, updateAccount, deleteAccount } from './accountsThunks';

const initialState = {
  accountsArray: [],
  loading: false,
  error: null
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
    reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => { 
    builder
    // You can handle async actions here if need
    // Fetch Accounts
        .addCase(fetchAccounts.pending, (state) => {
            state.loading = true;
            state.error = null;   
        })
        .addCase(fetchAccounts.fulfilled, (state, action) => {
            state.loading = false;
            state.accountsArray = action.payload;
        })
        .addCase(fetchAccounts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Add Account
        .addCase(addAccount.fulfilled, (state, action) => {
            state.accountsArray.push(action.payload);
        })
        
        // Update Account
        .addCase(updateAccount.fulfilled, (state, action) => {
            const index = state.accountsArray.findIndex(account => account.id === action.payload.id);
            if (index !== -1) {
                state.accountsArray[index] = action.payload;
            } 
        })

        // Delete Account
        .addCase(deleteAccount.fulfilled, (state, action) => {
            state.accountsArray = state.accountsArray.filter(account => account.id !== action.payload);
        })
    }
});

export const selectAccounts = (state) => state.accounts;
export default accountsSlice.reducer;
    