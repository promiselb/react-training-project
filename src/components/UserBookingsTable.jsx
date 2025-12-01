import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { print_array_itemsIds } from "../utils/renderingHelpFunctions";
import { selectBookings } from "../features/bookings/bookingsSlice";

const UserBookingsTable = (array_BookingsIds) => {
    
//   const bookingsState = useSelector(selectBookings);

//   const userBookings =
//     bookingsState.bookingsArray.filter((b) => array_BookingsIds.includes(b.id)) || [];
  const userBookings = array_BookingsIds || [];
  console.log("UserBookingsTable - userBookings:", userBookings, typeof userBookings);

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
          <th className="border p-2">View</th>
        </tr>
      </thead>
      <tbody>
        {/* {userBookings.map((booking) => (
          <tr key={booking.id}>
            <td className="border p-2">{booking.id}</td>
            <td className="border p-2">{print_array_itemsIds(booking.array_itemsIds)}</td>
            <td className="border p-2">${booking.total}</td>
            <td className="border p-2">
                    {booking.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                    ) : booking.status === "confirmed" ? (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                    ) : (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                    )}
            </td>
            <td className="border p-2 text-blue-600">
              <Link to={`/bookings/${booking.id}`}>Open</Link>
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default UserBookingsTable;
