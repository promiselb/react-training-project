import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAccounts } from "../../../hooks/useAccounts";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import { updateAccount, deleteAccount } from "../accountsThunks";
import Reloading from "../../../components/Reloading";

const AccountDetail = () => {
  useChangeTitle("Account Details");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountsArray, loading, error } = useAccounts();
  const account = accountsArray.find((a) => String(a.id) === String(id));
  const bookingsArray = useSelector(
    (state) => state.bookings?.bookingsArray || []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    string_bookingsIds: "",
    array_BookingsIds: [],
  });

  const relatedBookings = bookingsArray.filter(
    (b) =>
      String(b.accountId) === String(account.id) ||
      (Array.isArray(account.array_BookingsIds) &&
        account.array_BookingsIds.includes(Number(b.id)))
  );

  useEffect(() => {
    if (account) {
      setFormData({
        username: account.username || "",
        email: account.email || "",
        phoneNumber: account.phoneNumber || "",
        role: account.role || "",
        string_bookingsIds: Array.isArray(account.array_BookingsIds)
          ? account.array_BookingsIds.join(",")
          : "",
        array_BookingsIds: Array.isArray(account.array_BookingsIds)
          ? account.array_BookingsIds.slice()
          : [],
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "string_bookingsIds") {
      const parts = value
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p !== "");
      const numericIds = parts.filter((p) => /^\d+$/.test(p)).map(Number);

      setFormData((prev) => ({
        ...prev,
        string_bookingsIds: value,
        array_BookingsIds: numericIds,
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      formData.string_bookingsIds.trim() &&
      formData.array_BookingsIds.length === 0
    ) {
      toast.error(
        "Please provide valid numeric booking IDs or leave the field empty."
      );
      return;
    }

    const payload = {
      ...account,
      ...formData,
      array_BookingsIds: formData.array_BookingsIds || [],
    };

    try {
      await dispatch(updateAccount({ id: account.id, updatedAccountData: {...payload} })).unwrap();
      toast.success("✅ Account updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("❌ Failed to update account.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    try {
      await dispatch(deleteAccount(account.id)).unwrap();
      toast.success("🗑️ Account deleted successfully!");
      navigate("/dashboard/accounts");
    } catch (error) {
      toast.error("❌ Failed to delete account.");
    }
  };

  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (loading) return <Reloading loading />;
  if (!account)
    return <p className="p-6 text-gray-600">Account not found.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="border-b border-gray-300 pb-3">
        <h1 className="text-2xl font-bold">
          {account.username}{" "}
          <span className="text-gray-500 text-sm">#{account.id}</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Role: <span className="font-semibold text-gray-700">{account.role}</span>
        </p>
      </header>

      {/* Account Info / Edit Form */}
      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Email:</strong> {account.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {account.phoneNumber || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {account.role || "N/A"}
          </p>
          <p>
            <strong>Bookings Linked:</strong>{" "}
            {account.array_BookingsIds?.length || 0}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
          {/* username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="admin, user, etc."
            />
          </div>

          {/* Associated Bookings IDs */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Associated Bookings IDs (comma-separated)
            </label>
            <input
              type="text"
              name="string_bookingsIds"
              value={formData.string_bookingsIds || ""}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="e.g., 1,2,3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter booking IDs separated by commas. Only numeric IDs will be saved.
            </p>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Bookings Table */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Bookings for this account</h2>
        {relatedBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Booking ID</th>
                  <th className="p-2 text-left">Start Date</th>
                  <th className="p-2 text-left">End Date</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {relatedBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2">{b.id}</td>
                    <td className="p-2">{b.start_date}</td>
                    <td className="p-2">{b.end_date}</td>
                    <td className="p-2">{b.status}</td>
                    <td className="text-center p-2">
                      <Link
                        to={`/dashboard/bookings/${b.id}`}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition text-sm"
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
          <p className="text-gray-500">No bookings found for this account.</p>
        )}
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsEditing(true)}
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
};

export default AccountDetail;
