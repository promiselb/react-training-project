import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ page, perPage }) => {
    try {
        const res = await fetch(`/api/items?_page=${page}&_per_page=${perPage}`);
        const data = await res.json(); 
        const totalCount = res.headers.get("X-Total-Count"); // JSON server pagination header
        console.log("Total Count from Header:", totalCount);
        const totalPages = Math.ceil(totalCount / perPage) || 6;
        const reurnvalue = { 
            items: data.data,
            totalPages: totalPages
         }
       console.log("Fetched Items Data:", reurnvalue);
       return reurnvalue; 
   } catch (err) {
        throw err;
    }
  }
);