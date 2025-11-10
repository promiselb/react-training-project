import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInventory } from "../../../hooks/useInventory";
import { useBookings } from  "../../../hooks/useBookings";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import { useDispatch } from "react-redux";
import { updateItem, deleteItem } from "../inventoryThunks";
import { toast } from "react-toastify";
import Reloading from "../../../components/Reloading";

const InventoryDetail = () => {
  
  const { id } = useParams();
  useChangeTitle(`Inventory Detail ${id}`);
  const dispatch = useDispatch();

  const {items, loading, error} = useInventory();
  const {bookingsArray, loadingBookings, errorBookings} = useBookings()

  const item = items.find( (item) => String(item.id) ===  id);
  
  const numeric_id = Number(id);
  const itemBookingsIds = (bookingsArray ?? []).filter(
    (b) => b.array_itemsIds.includes(numeric_id))
    .map(b => b.id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(item);

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setFormData(item);};
  
  if (loadingBookings || loading) return <Reloading loading />;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (errorBookings) return <p className="p-6 text-red-500">Error: {errorBookings}</p>;
  if (!item) return <p className="p-6 text-red-500">Item not found.</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Deleting item:", id);

      const f1 = async() => {
        try {
          const res =  await dispatch(deleteItem(numeric_id)).unwrap();
          console.log("Delete result:", res);
          toast.success("Item deleted successfully!");
        } catch (error) {
          console.error("Delete failed:", error);
          toast.error("Failed to delete item.");
        }
        };

      f1();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updating item:", formData);

    const { name, description, price, isAvailable, imageUrl, category, brand } = formData;
    // Simple validation
    if (!name || !description || !price || !category || !brand) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const updatedItem = {
      id: id,
      name,
      description,
      price: Number(price),
      isAvailable,
      imageUrl,
      category,
      brand,
    };

    const f1 = async() => {
      try {
        const res =  await dispatch(updateItem({id, updatedItemData: updatedItem})).unwrap();
        console.log("Update result:", res);
        toast.success("Item updated successfully!");
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update item.");
      }
    };

    f1();
    setIsEditing(false);
  };
  
  return (
    <div>

      <div className="p-6 space-y-6">
      {/* Header */}
      <header className="border-b border-gray-300 pb-3">
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-gray-500 text-sm">ID: {id}</p>
      </header>

      {/* Image */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-64 h-64 object-cover rounded-xl border"
        />
      )}

      {/* Details or Edit form */}
      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          {/* <p><strong>Item ID:</strong> {item.id}</p> */}
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Available:</strong> {item.isAvailable ? "Yes" : "No"}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Brand:</strong> {item.brand}</p>
        </div>
      ) : (
        <form className="grid grid-cols-2 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Name"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Price"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded col-span-2"
            placeholder="Description"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Category"
          />
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Brand"
          />
          <div className="col-span-2 flex gap-3">
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

      {/* Bookings History Table */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Booking History</h2>
        {itemBookingsIds.length > 0 ? (
          <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Booking ID</th>
                <th className="text-left p-2">User ID</th>
                <th className="text-left p-2">Start Date</th>
                <th className="text-left p-2">End Date</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {itemBookingsIds.map(
                (bId) => {
                  const booking = bookingsArray.find((b) => String(b.id) === String(bId));
                  console.log("Rendering booking:", booking);
                  if (!booking) return null;
                  return (
                
                <tr key={booking.id} className="border-t">
                  <td className="p-2">
                    <Link className="text-green-500 underline" 
                    to={`/dashboard/bookings/${booking.id}`}>
                    {booking.id}
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link className="text-green-500 underline" 
                    to={`/dashbaord/accounts/${booking.accountId}`}>
                      {booking.accountId}
                    </Link>
                  </td>
                  <td className="p-2">{booking.start_date}</td>
                  <td className="p-2">{booking.end_date}</td>
                  <td className={`p-2 font-semibold
                      ${booking.status === "confirmed"
                        ? "text-green-600"
                        : booking.status === "pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                      }`}>
                    {booking.status}
                  </td>
                </tr>
                  )}
                )
              }
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No bookings for this item yet.</p>
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

  </div>
  );
};

export default InventoryDetail;
