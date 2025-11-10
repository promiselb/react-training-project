import React from "react";
import { useNavigate } from "react-router-dom";

const AccountsTable = ({ accounts }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/dashboard/accounts/${id}`);
  };

  if (!accounts || accounts.length === 0) {
    return (
      <p className="text-gray-600 italic mt-4">
        No accounts found. Add a new one to get started.
      </p>
    );
  }

  const roleColors = {
    admin: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    client: "bg-blue-100 text-blue-800 border border-blue-300",
    default: "bg-red-100 text-red-800 border border-red-300",
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mt-4">
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone Number</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {accounts.map((account) => {
            const colorClass =
              roleColors[account.role?.toLowerCase()] || roleColors.default;
            return (
            <tr
              key={account.id}
              className="border-b hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-2">{account.id}</td>
              <td className="px-4 py-2 font-medium">{account.username}</td>
              <td className="px-4 py-2">{account.email}</td>
              <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
                  >
                    {account.role}
                  </span>
                </td>
              <td className="px-4 py-2">
                {account.phoneNumber || <span className="text-gray-400 italic">N/A</span>}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleView(account.id)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 active:scale-95"
                >
                  Manage
                </button>
              </td>
            </tr>
          )}
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
