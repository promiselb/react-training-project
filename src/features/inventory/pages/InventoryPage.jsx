// src/components/Inventory.jsx
import { useSelector, useDispatch } from 'react-redux';
// import { sellItem, addItem } from '../inventorySlice';
import InventoryTable from '../components/InventoryTable';
import { useInventory } from '../../../hooks/useInventory';

function InventoryPage() {
  const { items, loading, error } = useInventory()
  const dispatch = useDispatch();
  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'Headphones', quantity: 3 };
    dispatch(addItem(newItem));
  };

 return (
  <>
    <h1 className="text-3xl font-bold mb-4">Inventory Page</h1>
    <InventoryTable items={items} />
    <button
      onClick={handleAddItem}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95">
      + Add Item
  </button>

  </>
  );
}

export default InventoryPage