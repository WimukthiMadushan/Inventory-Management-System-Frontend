import React from "react";
import { Select } from "antd";
import Pagination from "../Pagination/Pagination";

const UsersTable = ({
  users,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
}) => {
  const handleItemsPerPageChange = (value) => {
    setLimit(Number(value));
    setCurrentPage(1);
  };

  const paginatedUsers = users;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          All Users In the Inventory
        </h1>
        <div>
          <label className="mr-2 font-medium">Items per page:</label>
          <Select
            value={limit}
            onChange={handleItemsPerPageChange}
            className="w-[4rem]"
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
            ]}
          />
        </div>
      </div>

      {paginatedUsers.length > 0 ? (
        <>
          <table className="min-w-full table-auto text-center border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-center">
              {paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 text-center"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        user.status === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => console.log("Edit", user._id)}
                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => console.log("Delete", user._id)}
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 space-x-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No users available to display.
        </div>
      )}
    </>
  );
};

export default UsersTable;
