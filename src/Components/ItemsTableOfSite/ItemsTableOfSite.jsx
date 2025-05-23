import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Select } from "antd";

const ItemsTableOfSite = ({
  items,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
  workstations,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleItemsPerPageChange = (value) => {
    setLimit(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Items Assigned to This Site
        </h1>

        <div className="flex items-center gap-2">
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

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-center border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Stock Quantity</th>
              <th className="px-4 py-2">Arrived From</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {items && items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} className="border-t border-gray-200">
                  <td className="px-4 py-2 cursor-pointer">
                    <div className="flex justify-center items-center">
                      {item.image ? (
                        <img
                          className="w-[3rem] h-auto object-contain"
                          src={item.image}
                          alt="Item"
                          onClick={() => setPreviewImage(item.image)}
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">
                    {workstations.find((ws) => ws._id === item.fromSite)
                      ?.workSiteName || "Enter To Store"}
                  </td>

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
                  <td className="px-4 py-2">{item.updatedAt.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-gray-400 italic">
                  No items found for this site.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-md shadow-xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-1 right-1 text-gray-600 hover:text-black text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
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

export default ItemsTableOfSite;
