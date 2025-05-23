import { Select } from "antd";
import Pagination from "../Pagination/Pagination";

const InventoryTable = ({
  items,
  currentPage,
  setCurrentPage,
  totalPages,
  limit,
  setLimit,
  setPreviewImage,
}) => {
  const handleItemsPerPageChange = (value) => {
    setLimit(parseInt(value));
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
            value={String(limit)}
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

      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No items available in the inventory.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-center text-sm">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Item Name</th>
                  <td className="px-4 py-2">Item Category</td>
                  <th className="px-4 py-2">Availability</th>
                  <th className="px-4 py-2">Stock Quantity</th>
                  <th className="px-4 py-2">Work Site</th>
                  <th className="px-4 py-2">Price Per Item (Rs.)</th>
                  <th className="px-4 py-2">Last Updated</th>
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
                            onClick={() =>
                              setPreviewImage && setPreviewImage(item.image)
                            }
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">{item.itemName}</td>
                    <td className="px-4 py-2">{item.itemCategory}</td>
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
                    <td className="px-4 py-2">{item.workSite}</td>
                    <td className="px-4 py-2">{item.pricePerItem}</td>
                    <td className="px-4 py-2">
                      {item.updatedAt?.split("T")[0]}
                    </td>
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
        </>
      )}
    </div>
  );
};

export default InventoryTable;
