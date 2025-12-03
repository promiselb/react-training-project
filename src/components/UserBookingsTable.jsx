import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { print_array_itemsIdsProfilePage } from "../utils/renderingHelpFunctions";
import { selectBookings } from "../features/bookings/bookingsSlice";
import { useBookings } from "../hooks/useBookings";
import Reloading from "./Reloading";

const UserBookingsTable = ({ array_BookingsIds}) => {
    
    if (!array_BookingsIds || array_BookingsIds.length === 0) {
        return <p>No bookings associated with this user.</p>;
    }

    const {bookingsArray, loading, error} = useBookings()

    if (loading) return <Reloading />;
    if (error) return <p>Error loading bookings: {error}</p>;
  
    const userBookings = bookingsArray.filter(
        booking => array_BookingsIds.includes(String(booking.id))
    ) || [];

  if (userBookings.length === 0)
    return <p>No bookings found.</p>;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Booking ID</th>
          <th className="border p-2">Items IDs </th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Start Date</th>
          <th className="border p-2">End Date</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {userBookings.map((booking) => (
          <tr key={booking.id}>
            {/* // TODO: Create a page where the user can see each booking individually
            */}
            <td className="border p-2">{booking.id}</td> 
            <td className="border p-2">{print_array_itemsIdsProfilePage(booking.array_itemsIds)}</td>
            <td className="border p-2">${booking.total}</td>
            <td className="border p-2">{booking.start_date}</td>
            <td className="border p-2">{booking.end_date}</td>
            <td className="border p-2">
                    {booking.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                    ) : booking.status === "confirmed" ? (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                    ) : (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                    )}
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserBookingsTable;

