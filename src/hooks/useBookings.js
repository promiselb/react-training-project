import { useDispatch, useSelector } from "react-redux";
import { selectBookings } from "../features/bookings/bookingsSlice";
import { fetchBookings } from "../features/bookings/bookingsThunks";
import { useEffect } from "react";

export const useBookings = () => {
    const dispatch = useDispatch();
    const { bookingsArray, loading, error } = useSelector(selectBookings) || {};

   useEffect(() => {
        if (bookingsArray.length === 0 && !loading) {
            dispatch(fetchBookings());
        }
    }, [dispatch, bookingsArray.length, loading]);
    return { bookingsArray, loading, error };
}
