import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authThunks";
import { updateAccount } from "../features/accounts/accountsThunks";
import { useChangeTitle } from "../hooks/useChangeTitle";
import UserBookingsTable from "../components/UserBookingsTable";
import { validateConfirmPassword, validatePassword } from "../utils/accountValidationFunctions";
import Reloading from "../components/Reloading";
import { toast } from "react-toastify"

const ProfilePage = () => {
  useChangeTitle("Dashboard - Profile");
  const { user, loading, error, isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (loading) return <Reloading />;
  if (!isAuthenticated) return <p>You are not logged in.</p>;
  if (!user) return <p>No user found.</p>;
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword(newPassword)) return validatePassword(newPassword);
    if (validateConfirmPassword(newPassword, confirmNewPassword)) return validateConfirmPassword(newPassword, confirmNewPassword);

    const f1 = async () => {
        try {
            const data = {
                ...user,
                password: newPassword
            }
            const res = await dispatch(updateAccount(
                {
                    id: user.id,
                    updatedAccountData: data
                }
            )).unwrap();
            console.log("Updated Password:", newPassword);
            toast.success("✅ Account Password Updated successfully!");
            setNewPassword("");
        } catch (err) {
            console.error("Password Update failed:", error);
            toast.error("Failed to Update Password.");
        } finally {
            setIsChangingPassword(false);
        }
      };
      f1();
    }
    

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* USER INFO */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Account Information</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber || "No phone nb"}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>

        {!isChangingPassword ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setIsChangingPassword(true)}
          >
            Change Password
          </button>
        ) : (
            <>
           <p><strong>Current Password:</strong> {user.password}</p>
          <form onSubmit={handlePasswordSubmit} className="mt-3 flex gap-3">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="Confirm New password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setIsChangingPassword(false)}
            >
              Cancel
            </button>
          </form>
          </>
        )}
      </div>

      {/* USER BOOKINGS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <UserBookingsTable array_BookingsIds={user.array_BookingsIds} />
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
