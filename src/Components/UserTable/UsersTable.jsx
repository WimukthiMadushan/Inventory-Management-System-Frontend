import { useState } from "react";
import { Select } from "antd";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";

const UsersTable = ({
  users,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
  DeleteUser,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    DeleteUser(deleteUserId);
    setShowDeleteModal(false);
  };

  const handleItemsPerPageChange = (value) => {
    setLimit(Number(value));
    setCurrentPage(1);
  };

  const paginatedUsers = users;

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-xl font-bold text-gray-800">
          All Users In the Inventory
        </h1>
        <div className="flex items-center space-x-2">
          <label className="font-medium">Items per page:</label>
          <Select
            value={limit}
            onChange={handleItemsPerPageChange}
            className="w-[5rem]"
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
            ]}
          />
        </div>
      </div>

      {/* Table Section */}
      {paginatedUsers.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="border-t border-gray-200"
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
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      {/* Delete Modal */}
      <DeleteConfirmationPopup
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default UsersTable;
