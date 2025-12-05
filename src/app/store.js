import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from '../features/accounts/accountsSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import bookingsReducer from '../features/bookings/bookingsSlice';
import authReducer from '../features/auth/authSlice'
import itemsReducer from '../features/items/itemsSlice';
import paginatdItemsSlice from "../features/paginatedItems/paginatedItemsSlice";

export const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        inventory: inventoryReducer,
        bookings: bookingsReducer,
        auth: authReducer,
        items: itemsReducer,
        paginatdItems: paginatdItemsSlice,
    }
})
// const 

/*
createAction is a function that creates and returns an action object.
We typically use these so we don't have to write the action object by hand every time:
$ type must be of the form 
>> 'domain/eventName'
# payload can be any data type  (string, number, object, array, etc.) //! but not undefined
*/
const createAction = (type, payload) => {
    return {
        type,
        payload,
    }
}

// const addInventory