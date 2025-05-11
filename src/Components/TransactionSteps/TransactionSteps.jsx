import React from "react";
import {
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const TransactionSteps = ({ transaction = [], userMap }) => {
  if (!transaction.length) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No transactions found for the selected filters.
      </p>
    );
  }

  // Sort by date descending
  const sortedTransactions = [...transaction].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="px-6 mt-8 max-w-4xl mx-auto pb-[2rem]">
      <div className="relative border-l-2 border-blue-200 ml-4">
        {sortedTransactions.map((tx, index) => (
          <div key={tx._id} className="mb-10 ml-6 relative">
            <span className="absolute -left-4 top-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <p className="text-sm text-blue-500 mb-2 flex items-center gap-2">
                <ClockCircleOutlined />{" "}
                {new Date(tx.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-1 flex items-center gap-2">
                <UserOutlined className="text-gray-500" />
                <span className="font-medium">
                  {userMap[tx.userId] || "Unknown User"}
                </span>
              </p>
              <p className="text-gray-600 flex items-start gap-2">
                <FileTextOutlined className="mt-1 text-gray-500" />
                <span>{tx.description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSteps;
