import { useState } from 'react'
import { useChangeTitle } from '../../../hooks/useChangeTitle';
import { useBookings } from '../../../hooks/useBookings';
import { useInventory } from '../../../hooks/useInventory';
import { selectInventory } from '../../inventory/inventorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { addBooking } from '../bookingsThunks';
import BookingsTable from '../components/BookingsTable';
import Reloading from '../../../components/Reloading';
import { verifyBookingsInput } from '../../../utils/verifyFunctions';
import { stringIdsToArrayNumbersIds, getItemFromInventoryById } from '../../../utils/helperFunctions';
import { toast } from 'react-toastify';

// TODO: fix time and do the rest of the fields and other things
const BookingsPage = () => {
  useChangeTitle('Bookings Page');
  const { bookingsArray, loading, error} = useBookings();
  const inventory = useInventory();
  const dispatch = useDispatch();

  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    accountId: null,
    string_itemsIds: "",
    ids: [],
    payment_method: null,
    start_date: new Date().toLocaleDateString("sv-SE").replace("T"," "),
    end_date: null,
    status: "",
    total: 0
  });

  

  /* Calculate sum based on associated items IDs
    returns sum of prices of associated items
  */
  const calculateSum = (array_itemsIds) => {
  
    // ✅ Step 2: Extract prices from inventory
    const itemsPrices = array_itemsIds
      .map(id => {
        const item = inventory.items.find(i => i.id === id);
        return Number(item.price);
      })

    // ✅ Step 3: Compute total sum safely
    const total = itemsPrices.reduce((sum, price) => sum + price, 0);

    return total;
  };

  const handleWritingToggle = () => {
    setIsWriting(prev => !prev);
    setFormData({
      accountId: null,
      string_itemsIds: "",
      ids: [],
      payment_method: null,
      start_date: new Date().toLocaleDateString("sv-SE").replace("T"," "),
      end_date: null,
      status: "",
      total: 0
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "string_itemsIds") { 
      const {ids, error } = stringIdsToArrayNumbersIds(value);
      console.log("Parsed IDs:", ids, "Error:", error);
      if (ids) {
        try { // throw new Error(`Item with ID ${id} not found in inventory.`)
          const validsIds = ids.filter( id => {
            const item = getItemFromInventoryById(inventory.items, id);
            return !!item;
          })
          const newTotal = calculateSum(validsIds);

          setFormData((prev) => ({ ...prev, total: newTotal, ids: validsIds }));
        } catch (err) {
          console.error(err);
          toast.error(`Validation error: ${err}`);
          setFormData((prev) => ({ ...prev, total: 0 }));
        }
      } else {
        console.error(`Error in Items IDs: ${error}`);
        toast.error(`Error in Items IDs: ${error}`);
        setFormData((prev) => ({ ...prev, total: 0 }));
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("New booking:", formData);
    setIsWriting(false);

    // TODO: send new booking request to backend

    //* Validation is simple because it is basic right now
    const isValidFormData = verifyBookingsInput(formData);

    if (!isValidFormData) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    
    const newBooking = {
      id: Date.now(), // Temporary ID generation
      accountId: formData.accountId,
      array_itemsIds: formData.ids,
      payment_method: formData.payment_method,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status,
      total: formData.total
    }

    dispatch(addBooking(
      newBooking
    ));

    const f1 = async() => {
      try {
        const res =  await dispatch(addBooking(newBooking)).unwrap();
        console.log("Adding result:", res);
        toast.success("Booking added successfully!");
      } catch (error) {
        console.error("Adding failed:", error);
        toast.error("Failed to add booking.");
      }
    };
    
    f1();
  };

  return loading ? (
    <Reloading loading={loading} />
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bookings List</h1>
      <BookingsTable bookings={bookingsArray} />
      <br />
      <button
        onClick={handleWritingToggle}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95">
        + Add Booking
      </button>
      <br />
      { isWriting  
        ? (<form id="new-booking" className="grid grid-cols-2 gap-4">
          {/* Account ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Account ID
            </label>
            <input
              name="accountId"
              value={formData.accountId || ""}
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
              value={formData.payment_method || ""}
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
              value={(formData.start_date ?? new Date().toLocaleDateString("sv-SE").replace("T"," ")) || ""}
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
              value={formData.end_date || ""}
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
              value={formData.status || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Total */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Total
            </label>
            <input
              readOnly 
              type="number"
              name="total"
              value={formData.total || 0}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Total"
            />
          </div>

          {/* Associated Items IDs */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Associated Items IDs
            </label>
            <input
              type="text"
              name="string_itemsIds"
              value={formData.string_itemsIds || ""}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Please enter only Items IDs separated by commas (e.g. 1,2,3,45)"
               pattern="^[0-9]+(,[0-9]+)*$" 
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
              onClick={handleWritingToggle}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
      </form>
      ) : ("")
      }
    </div>
  )
}

export default BookingsPage