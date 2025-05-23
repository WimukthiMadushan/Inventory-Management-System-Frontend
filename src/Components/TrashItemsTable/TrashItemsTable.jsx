import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Select } from "antd";

const { Option } = Select;

const TrashItemsTable = ({
  items,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleItemsPerPageChange = (value) => {
    setLimit(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h1 className="text-xl font-bold text-gray-800">Items In the Trash</h1>
        <div className="flex items-center space-x-2">
          <label className="font-medium">Items per page:</label>
          <Select
            value={String(limit)}
            onChange={handleItemsPerPageChange}
            className="w-[5rem]"
          >
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="15">15</Option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto text-center border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">From Site</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {items.map((item) => (
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
                  {item.fromSite?.workSiteName || "N/A"}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.updatedAt.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

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

export default TrashItemsTable;
