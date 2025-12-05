import { createAsyncThunk } from "@reduxjs/toolkit";
import { NUMBER_OF_ITEMS } from "./paginatedItemsSlice";

export const fetchPaginatedItems = createAsyncThunk(
  "items/fetchItemsByPageAndPerPage",
  async ({ page, perPage }) => {
    try {
        const res = await fetch(`/api/items?_page=${page}&_per_page=${perPage}`);
        const data = await res.json(); 
        // const totalCount = res.headers.get("X-Total-Count"); // JSON server pagination header
        const totalCount = NUMBER_OF_ITEMS; // Temporary fix for total count
        const totalPages = Math.ceil(totalCount / perPage) || 6;
        const reurnvalue = { 
            items: data.data,
            totalPages: totalPages
         }
       return reurnvalue; 
   } catch (err) {
        throw err;
    }
  }
);