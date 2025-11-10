import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from '../features/accounts/accountsSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import bookingsReducer from '../features/bookings/bookingsSlice';

const initialState = {
    
}

export const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        inventory: inventoryReducer,
        bookings: bookingsReducer,
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