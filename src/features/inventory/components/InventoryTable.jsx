import { Link } from "react-router-dom";

const InventoryTable = ({ items }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Available</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Brand</th>
            <th className="py-3 px-4 text-center">Manage</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4 font-medium">{item.name}</td>
              <td className="py-3 px-4">{item.description}</td>
              <td className="py-3 px-4">${item.price}</td>
              <td className="py-3 px-4">
                {item.isAvailable ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </td>
              <td className="py-3 px-4">{item.category}</td>
              <td className="py-3 px-4">{item.brand}</td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`${item.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
