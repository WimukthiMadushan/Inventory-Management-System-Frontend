import React from "react";

const DetailsBox = ({ icon, title, subtitle, value, iconBg }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 w-full min-w-[240px] max-w-sm flex-1">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${iconBg} mr-3 text-xl`}>{icon}</div>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
    </div>
  );
};

export default DetailsBox;
