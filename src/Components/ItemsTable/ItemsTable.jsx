import React, { useState } from "react";
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

  const handleIncrease = (id) => {
    console.log("Increase", id);
    handleIncreaseItemByOne(id);
  };
  const handleDecrease = (id) => {
    handleDecreaseItemByOne(id);
  };
  const handleDelete = (id) => {
    console.log("Delete", id);
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    console.log("Confirmed Delete:", deleteItemId);
    DeleteItem(deleteItemId);
    setShowDeleteModal(false);
  };
  const handleAddItem = (id) => {
    setSelectedItemId(id);
    setShowAddModal(true);
  };
  const handleAddSubmit = (values) => {
    console.log("Add Item Submit:", values);
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
    const item = items.find((it) => it.id === id);
    setItemToEdit(item);
    setShowEditModal(true);
  };
  const handleEditSubmit = (updatedItem) => {
    console.log("Updated Item:", updatedItem);
    setShowEditModal(false);
    EditItem(updatedItem);
  };
  const handleItemsPerPageChange = (value) => {
    setLimit(Number(value));
    setCurrentPage(1);
  };

  const paginatedItems = items;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          All Items In the Inventory
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

      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No items available in the inventory.
        </div>
      ) : (
        <table className="min-w-full table-auto text-center border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th>Image</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Stock Quantity</th>
              <th className="px-4 py-2">Last Updated</th>
              <th className="px-4 py-2">Controls</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center">
            {paginatedItems.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 text-center"
              >
                <td className="px-4 py-2 cursor-pointer">
                  <div className="flex justify-center items-center h-full">
                    {item.image ? (
                      <img
                        className="w-[3rem] h-auto object-contain"
                        src={item.image}
                        alt="Image"
                        onClick={() => setPreviewImage(item.image)}
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">
                  {item.quantity > 0 ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.lastUpdated}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleIncrease(item._id)}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrease(item._id)}
                    className="px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleAddItem(item._id)}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                  >
                    Remove Item
                  </button>
                </td>
                <td>
                  <div className="flex space-x-2 justify-center">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

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
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-md shadow-xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-1 right-1 text-gray-600 hover:text-black text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14LWljb24gbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+"
                alt="Cross Icon"
              />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[80vw] max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsTable;
