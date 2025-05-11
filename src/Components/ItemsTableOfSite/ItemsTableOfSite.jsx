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
  loading,
  error,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleItemsPerPageChange = (value) => {
    setLimit(value);
    setCurrentPage(1);
  };
  console.log("ItemsTableOfSite", items);

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Items Assigned to This Site
        </h1>

        {/* Items per page dropdown */}
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

      <table className="min-w-full table-auto text-center border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 text-center">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Stock Quantity</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {items && items.length > 0 ? (
            items.map((item) => (
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
                <td className="px-4 py-2">{item.quantity}</td>
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
                <td className="px-4 py-2">{item.lastUpdated}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-gray-400 italic">
                No items found for this site.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
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

export default ItemsTableOfSite;
