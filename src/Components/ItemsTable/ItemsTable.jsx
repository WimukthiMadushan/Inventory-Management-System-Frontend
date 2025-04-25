import React, { useState } from "react";
import { Select, Modal } from "antd";
import Pagination from "./../Pagination/Pagination";
import AddItemPopup from "./../AddItemPopup/AddItemPopup";
import EditItemPopup from "./../EditItemPopup/EditItemPopup";

const sampleItems = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  inStock: i % 3 !== 0,
  quantity: Math.floor(Math.random() * 20),
}));

const ItemsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const totalPages = Math.ceil(sampleItems.length / itemsPerPage);

  const handleIncrease = (id) => console.log("Increase", id);
  const handleDecrease = (id) => console.log("Decrease", id);
  const handleEdit = (id) => {
    const item = sampleItems.find((it) => it.id === id);
    setItemToEdit(item);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    const item = sampleItems.find((it) => it.id === id);
    Modal.confirm({
      title: `Delete ${item.name}?`,
      content:
        "Are you sure you want to delete this item? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("Deleted:", item);
        // Place deletion logic here (e.g., setItems or API call)
      },
    });
  };

  const handleAddItem = (id) => {
    setSelectedItemId(id);
    setShowAddModal(true);
  };

  const handleAddSubmit = (values) => {
    console.log("Add Item Submit:", values);
    setShowAddModal(false);
  };
  const handleEditSubmit = (updatedItem) => {
    console.log("Updated Item:", updatedItem);
    setShowEditModal(false);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sampleItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          All Items In the Inventory
        </h1>
        <div>
          <label className="mr-2 font-medium">Items per page:</label>
          <Select
            value={itemsPerPage}
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

      <table className="min-w-full table-auto text-center border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 text-center">
          <tr>
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
            <tr key={item.id} className="border-t border-gray-200 text-center">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">
                {item.inStock ? (
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
              <td className="px-4 py-2">2023-10-01</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => handleAddItem(item.id)}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                >
                  Add Item
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
                    onClick={() => handleDelete(item.id)}
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Add Item Modal */}
      <AddItemPopup
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        defaultItemId={selectedItemId}
        items={sampleItems}
      />
      <EditItemPopup
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        item={itemToEdit}
      />
    </div>
  );
};

export default ItemsTable;
