import { useState } from "react";
import { useDispatch } from "react-redux";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import { useInventory } from "../../../hooks/useInventory";
import { addItem } from "../inventoryThunks";
import InventoryTable from "../components/InventoryTable";
import Reloading from "../../../components/Reloading";
import { toast } from "react-toastify";

// TODO: verifyInputs once utility exists
const InventoryPage = () => {
  useChangeTitle("Inventory Page");
  const { items, loading, error } = useInventory();
  const dispatch = useDispatch();

  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: true,
    imageUrl: "",
    category: "",
    brand: "",
  });

  const handleWritingToggle = () => {
    setIsWriting((prev) => !prev);
    setFormData({
      name: "",
      description: "",
      price: "",
      isAvailable: true,
      imageUrl: "",
      category: "",
      brand: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Numeric validation for price
    if (name === "price" && value < 0) {
      toast.error("Price cannot be negative.");
      return;
    }

    // Handle checkbox separately
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const { name, description, price, isAvailable, imageUrl, category, brand } = formData;

    // Simple validation
    if (!name || !description || !price || !category || !brand) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const newItem = {
      id: Date.now(),
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
        const res = await dispatch(addItem(newItem)).unwrap();
        console.log("Adding result:", res);
        toast.success("Item added successfully!");
      } catch (error) {
        console.error("Adding failed:", error);
        toast.error("Failed to add item.");
      }
    };

    f1();
    setIsWriting(false);
  };

  return loading ? (
    <Reloading loading={loading} />
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-4">Inventory List</h1>
      <InventoryTable items={items} />
      <br />

      <button
        onClick={handleWritingToggle}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95"
      >
        + Add Item
      </button>

      {isWriting && (
        <form id="new-item" className="grid grid-cols-2 gap-4 mt-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Item name"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Category (e.g., Camera)"
              required
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Brand</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Brand (e.g., Canon)"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Price per day"
              min="0"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="https://example.com/img.jpg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border rounded resize-y"
              placeholder="Enter item description"
              rows={3}
              required
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <label className="text-sm font-medium text-gray-600">
              Available for Booking
            </label>
          </div>

          {/* Image preview (only if valid URL entered) */}
            {formData.imageUrl && (
              <div className="col-span-2 flex flex-col items-start mt-2">
                <label className="text-sm font-medium text-gray-600 mb-1">Preview:</label>
                <img
                  src={formData.imageUrl}
                  alt={formData.name || "Item preview"}
                  className="w-48 h-48 object-cover border rounded-lg shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                    toast.error("Invalid image URL or image not found.");
                  }}
                />
              </div>
            )}

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
              onClick={handleWritingToggle}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InventoryPage;


// import { useChangeTitle } from '../../../hooks/useChangeTitle';
// import { useDispatch } from 'react-redux';
// import InventoryTable from '../components/InventoryTable';
// import { useInventory } from '../../../hooks/useInventory';
// import { addItem } from '../inventoryThunks';

// function InventoryPage() {
//   useChangeTitle('Inventory Page');
//   const { items, loading, error } = useInventory()
//   const dispatch = useDispatch();
//   const handleAddItem = () => {
//     const newItem = { id: Date.now(), name: 'Headphones', quantity: 3 };
//     dispatch(addItem(newItem));
//   };

//  return (
//   <>
//     <h1 className="text-3xl font-bold mb-4">Inventory Page</h1>
//     <InventoryTable items={items} />
//     <br />
//     <button
//       onClick={handleAddItem}
//       className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 active:scale-95">
//       + Add Item
//     </button>

//   </>
//   );
// }

// export default InventoryPage