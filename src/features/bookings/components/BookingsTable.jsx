import { Link } from "react-router-dom";
import { print_array_itemsIds } from "../../../utils/renderingHelpFunctions";

const BookingsTable = ({ bookings }) => {
    
    return (
        <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Customer ID</th>
                <th className="py-3 px-4 text-left">Items IDs</th>
                <th className="py-3 px-4 text-left">Start Date</th>
                <th className="py-3 px-4 text-left">End Date</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
            </tr>
            </thead>

            <tbody>
            {bookings.map((booking) => (
                <tr
                key={booking.id}
                className="border-t hover:bg-gray-50 transition-colors"
                >
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">
                    <Link 
                        to={`/accounts/${booking.accountId}`}
                        className="text-blue-600 hover:underline"
                    >
                    {booking.accountId}
                    </Link>
                </td>
                <td className="py-3 px-4">
                    {print_array_itemsIds(booking.array_itemsIds)}
                </td>
                <td className="py-3 px-4">{booking.start_date}</td>
                <td className="py-3 px-4">{booking.end_date}</td>
                <td className="py-3 px-4">${booking.total}</td>
                <td className="py-3 px-4">
                    {booking.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                    ) : booking.status === "confirmed" ? (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                    ) : (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                    )}
                </td>

                <td className="px-4 py-2 text-center">
                    <Link
                    to={`${booking.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                    Manage
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default BookingsTable;
