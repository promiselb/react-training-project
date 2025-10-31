import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useInventory } from "../../../hooks/useInventory";
import { selectBookings } from "../../bookings/bookingsSlice";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import Reloading from "../../../components/Reloading";

const InventoryDetail = () => {
  
  const { id } = useParams();
  useChangeTitle(`Inventory Detail ${id}`);
  
  const dispatch = useDispatch();
  const {items, loading, error} = useInventory();

  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  
  const bookings = useSelector(selectBookings);
  

  const item = items.find( (item) => String(item.id) === String(id) );
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(item);
  const itemBookingsIds = []
  //  bookings.filter(
  //   (b) => b.array_itemsIds.includes(id))
  //   .map(b => b.id);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Deleting item:", id);
      // TODO: implement delete API
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated item:", formData);
    setIsEditing(false);
    // TODO: send update request to backend
  };
  console.log("Bookings from Redux:", bookings);
  if (!item) return <p className="p-6 text-red-500">Item not found.</p>;

  return (
    <div>
    { loading ? (
      <Reloading loading={loading} />
    ) : (
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
              {itemBookingsIds.map((bId) => (
                <tr key={bId} className="border-t">
                  <td className="p-2">{bId}</td>
                  <td className="p-2">
                    <Link to={`dashbaord/accounts/${bookings[bId].accountId}`}>{bookings[bId].accountId}
                    </Link>
                  </td>
                  <td className="p-2">{bookings[bId].start_date}</td>
                  <td className="p-2">{bookings[bId].end_date}</td>
                  <td className="p-2">{bookings[bId].status}</td>
                </tr>
              ))}
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
    )
  }

  </div>
  );
};

export default InventoryDetail;
