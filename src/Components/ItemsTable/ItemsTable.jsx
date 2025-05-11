import { useState } from "react";
import { Select } from "antd";
import Pagination from "./../Pagination/Pagination";
import AddItemPopup from "./../AddItemPopup/AddItemPopup";
import RemoveItemPopup from "./../RemoveItemPopup/RemoveItemPopup";
import EditItemPopup from "./../EditItemPopup/EditItemPopup";
import DeleteConfirmationPopup from "./../DeleteConfirmationPopup/DeleteConfirmationPopup";

const ItemsTable = ({
  items,
  handleIncreaseItemByOne,
  handleDecreaseItemByOne,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
  IncreaseItem,
  DecreaseItem,
  EditItem,
  DeleteItem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleIncrease = (id) => handleIncreaseItemByOne(id);
  const handleDecrease = (id) => handleDecreaseItemByOne(id);

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    DeleteItem(deleteItemId);
    setShowDeleteModal(false);
  };

  const handleAddItem = (id) => {
    setSelectedItemId(id);
    setShowAddModal(true);
  };
  const handleAddSubmit = (values) => {
    setShowAddModal(false);
    IncreaseItem(values);
  };

  const handleRemoveItem = (id) => {
    setSelectedItemId(id);
    setShowRemoveModal(true);
  };
  const handleRemoveSubmit = (values) => {
    setShowRemoveModal(false);
    DecreaseItem(values);
  };

  const handleEdit = (id) => {
    const item = items.find((it) => it._id === id);
    setItemToEdit(item);
    setShowEditModal(true);
  };
  const handleEditSubmit = (updatedItem) => {
    setShowEditModal(false);
    EditItem(updatedItem);
  };

  const handleItemsPerPageChange = (value) => {
    setLimit(Number(value));
    setCurrentPage(1);
  };

  const paginatedItems = items;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          All Items In the Inventory
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

      {/* Table */}
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No items available in the inventory.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-center border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-center text-sm">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Availability</th>
                <th className="px-4 py-2">Stock Quantity</th>
                <th className="px-4 py-2">Last Updated</th>
                <th className="px-4 py-2">Controls</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {paginatedItems.map((item) => (
                <tr key={item._id} className="border-t border-gray-200">
                  <td className="px-4 py-2 cursor-pointer">
                    <div className="flex justify-center items-center">
                      {item.image ? (
                        <img
                          className="w-12 h-12 object-contain"
                          src={item.image}
                          alt="Item"
                          onClick={() => setPreviewImage(item.image)}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.lastUpdated}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-1 justify-center mt-[0.9rem]">
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleAddItem(item._id)}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
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
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modals */}
      <AddItemPopup
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        defaultItemId={selectedItemId}
        items={items}
      />
      <RemoveItemPopup
        open={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onSubmit={handleRemoveSubmit}
        defaultItemId={selectedItemId}
        items={items}
      />
      <EditItemPopup
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        item={itemToEdit}
      />
      <DeleteConfirmationPopup
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-md shadow-xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-1 right-1 text-gray-600 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsTable;
