import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInventory } from "../../../hooks/useInventory";
import { useBookings } from  "../../../hooks/useBookings";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import Reloading from "../../../components/Reloading";

const BookingDetail = () => {

  const { id } = useParams();
  useChangeTitle(`Booking Detail ${id}`);

  const { bookingsArray, loadingBookings, errorBookings } = useBookings();
  const { items, loading, error } = useInventory();

  const booking = bookingsArray.find((b) => String(b.id) === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(booking);

  if (loadingBookings || loading) return <Reloading loading />;
  if (errorBookings) return <p className="p-6 text-red-500">Error: {errorBookings}</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!booking) return <p className="p-6 text-red-500">Booking not found.</p>;

  const associatedItems =
    items?.filter((item) =>
      booking.array_itemsIds?.includes(Number(item.id))
    ) ?? [];

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated booking:", formData);
    setIsEditing(false);
    // TODO: send update request to backend
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      console.log("Deleting booking:", id);
      // TODO: implement delete API
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="border-b border-gray-300 pb-3">
        <h1 className="text-2xl font-bold">Booking #{booking.id}</h1>
        <p className="text-gray-500 text-sm">
          User ID:{" "}
          <Link
            to={`/dashboard/accounts/${booking.accountId}`}
            className="text-indigo-600 underline"
          >
            {booking.accountId}
          </Link>
        </p>
      </header>

      {/* Booking Info / Edit Form */}
      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Start Date:</strong> {booking.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {booking.end_date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                booking.status === "confirmed"
                  ? "text-green-600"
                  : booking.status === "pending"
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              {booking.status}
            </span>
          </p>
          <p>
            <strong>Total Price:</strong> ${booking.total ?? "—"}
          </p>
          <p>
            <strong>Payment Method:</strong> {booking.payment_method ?? "N/A"}
          </p>
          {/* <p>
            <strong>Created At:</strong>{" "}
            {new Date(booking.start_date).toLocaleString()}
            {booking.start_date }
          </p> */}
        </div>
              ) : (
        <form className="grid grid-cols-2 gap-4">
          {/* Account ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Account ID
            </label>
            <input
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Account ID"
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Payment Method
            </label>
            <input
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Payment Method"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Total */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Total
            </label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Total"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 mt-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}


      {/* Associated Items Table */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Associated Items</h2>
        {associatedItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Brand</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Available</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {associatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.brand}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">
                      {item.isAvailable ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="text-center p-2">
                      <Link
                        to={`/dashboard/inventory/${item.id}`}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No items linked to this booking.</p>
        )}
      </section>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookingDetail