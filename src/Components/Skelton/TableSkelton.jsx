import React from "react";

const TableSkelton = ({ rows = 5 }) => {
  const skeletonRow = (
    <tr className="border-t border-gray-200 text-center">
      {Array(6)
        .fill()
        .map((_, i) => (
          <td key={i} className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-3/4" />
          </td>
        ))}
    </tr>
  );

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-300 bg-gray-200 rounded w-48 h-6 animate-pulse" />
        <div className="w-[8rem] h-6 bg-gray-200 rounded animate-pulse" />
      </div>

      <table className="min-w-full table-auto text-center border border-gray-200">
        <thead className="bg-gray-100 text-gray-400 text-center">
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
          {Array(rows)
            .fill()
            .map((_, i) => (
              <React.Fragment key={i}>{skeletonRow}</React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkelton;
