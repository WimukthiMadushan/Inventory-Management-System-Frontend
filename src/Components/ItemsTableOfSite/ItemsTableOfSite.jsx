import React from "react";
import Pagination from "../Pagination/Pagination";

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
  const paginatedItems = items;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Items Assigned to This Site
        </h1>
      </div>

      <table className="min-w-full table-auto text-center border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 text-center">
          <tr>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Stock Quantity</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {paginatedItems && paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 text-center"
              >
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ItemsTableOfSite;
