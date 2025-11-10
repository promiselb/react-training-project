import { useState } from "react";
import { useDispatch } from "react-redux";
import { useChangeTitle } from "../../../hooks/useChangeTitle";
import { useAccounts } from "../../../hooks/useAccounts"; // similar to useInventory
import { addAccount } from "../accountsThunks"; // same pattern as inventoryThunks
import AccountsTable from "../components/AccountsTable";
import Reloading from "../../../components/Reloading";
import { toast } from "react-toastify";

const AccountsPage = () => {
  useChangeTitle("Accounts Page");
  const { accountsArray, loading, error } = useAccounts();
  const dispatch = useDispatch();

  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleWritingToggle = () => {
    setIsWriting((prev) => !prev);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { username, email, password, confirmPassword, phoneNumber } = formData;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const newAccount = {
      id: Date.now(),
      username,
      email,
      password,
      phoneNumber,
      array_BookingsIds: [],
    };

    const f1 = async () => {
      try {
        const res = await dispatch(addAccount(newAccount)).unwrap();
        console.log("Account added:", res);
        toast.success("Account created successfully!");
      } catch (error) {
        console.error("Adding account failed:", error);
        toast.error("Failed to create account.");
      }
    };

    f1();
    setIsWriting(false);
  };

  return loading ? (
    <Reloading loading={loading} />
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-4">Accounts List</h1>
      <AccountsTable accounts={accountsArray} />
      <br />

      <button
        onClick={handleWritingToggle}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95"
      >
        + Add Account
      </button>

      {isWriting && (
        <form id="new-account" className="grid grid-cols-2 gap-4 mt-4">
          {/* username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Enter name"
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
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Enter phone number"
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
      )}
    </div>
  );
};

export default AccountsPage;
