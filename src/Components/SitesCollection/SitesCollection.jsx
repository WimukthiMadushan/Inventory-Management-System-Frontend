import React from "react";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Tailwind's soft background colors
const bgColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-cyan-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-red-100",
  "bg-lime-100",
  "bg-amber-100",
];

const workstations = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Work Station ${String(i + 1).padStart(2, "0")}`,
}));

const SitesCollection = () => {
  const handleEdit = (id) => {
    console.log("Edit Workstation", id);
    // Add your edit modal or redirect here
  };

  const handleDelete = (id) => {
    console.log("Delete Workstation", id);
    // Add your confirmation or delete logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">All Workstations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {workstations.map((station, index) => (
          <div
            key={station.id}
            className={`w-full h-full rounded-xl shadow-md transition duration-200 transform hover:scale-105 p-4 text-gray-800 font-semibold ${
              bgColors[index % bgColors.length]
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <Link to={`/sites/${station.id}`}>
                <span>{station.name}</span>
              </Link>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(station.id)}
                  className="p-1 bg-blue-200 rounded-sm hover:bg-blue-100  cursor-pointer"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wZW5jaWwtaWNvbiBsdWNpZGUtcGVuY2lsIj48cGF0aCBkPSJNMjEuMTc0IDYuODEyYTEgMSAwIDAgMC0zLjk4Ni0zLjk4N0wzLjg0MiAxNi4xNzRhMiAyIDAgMCAwLS41LjgzbC0xLjMyMSA0LjM1MmEuNS41IDAgMCAwIC42MjMuNjIybDQuMzUzLTEuMzJhMiAyIDAgMCAwIC44My0uNDk3eiIvPjxwYXRoIGQ9Im0xNSA1IDQgNCIvPjwvc3ZnPg=="
                    alt="Edit Icon"
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => handleDelete(station.id)}
                  className="p-1 bg-red-200 rounded-sm hover:bg-red-100 cursor-pointer"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmFzaC1pY29uIGx1Y2lkZS10cmFzaCI+PHBhdGggZD0iTTMgNmgxOCIvPjxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiLz48cGF0aCBkPSJNOCA2VjRjMC0xIDEtMiAyLTJoNGMxIDAgMiAxIDIgMnYyIi8+PC9zdmc+"
                    alt="Delete Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitesCollection;
