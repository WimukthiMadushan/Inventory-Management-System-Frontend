import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import EditWorkStationPopup from "../EditWorkStationPopup/EditWorkStationPopup";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { toast } from "react-toastify";

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

const SitesCollection = ({
  workstations,
  DeleteWorkStation,
  EditWorkStation,
  workStationManagers,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const { authState } = useAuth();
  const { role } = authState;

  const handleEdit = (id) => {
    setEditItemId(id);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleConfirm = () => {
    DeleteWorkStation(deleteItemId);
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleCloseEditModel = () => {
    setShowEditModal(false);
    setEditItemId(null);
  };

  const handleConfirmEditModel = (values) => {
    EditWorkStation(values);
    setShowEditModal(false);
    setEditItemId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-h-[60vh]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <h1 className="text-xl font-bold text-gray-800">All Workstations</h1>
        {workstations.length > 0 && (
          <span className="text-sm text-gray-600 font-semibold">
            Total Workstations: {workstations.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {workstations.map((station, index) => (
          <div
            key={station._id}
            className={`w-full rounded-xl shadow-md transition transform hover:scale-105 p-4 text-gray-800 font-semibold ${
              bgColors[index % bgColors.length]
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-center">
              <Link
                to={`/sites/${station._id}`}
                className="text-base truncate max-w-full"
              >
                {station.workSiteName}
              </Link>
              {role === "admin" && (
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(station._id)}
                    className="p-1 bg-blue-200 rounded-sm hover:bg-blue-100"
                  >
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wZW5jaWwtaWNvbiBsdWNpZGUtcGVuY2lsIj48cGF0aCBkPSJNMjEuMTc0IDYuODEyYTEgMSAwIDAgMC0zLjk4Ni0zLjk4N0wzLjg0MiAxNi4xNzRhMiAyIDAgMCAwLS41LjgzbC0xLjMyMSA0LjM1MmEuNS41IDAgMCAwIC42MjMuNjIybDQuMzUzLTEuMzJhMiAyIDAgMCAwIC44My0uNDk3eiIvPjxwYXRoIGQ9Im0xNSA1IDQgNCIvPjwvc3ZnPg=="
                      alt="Edit"
                      className="w-5 h-5"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(station._id)}
                    className="p-1 bg-red-200 rounded-sm hover:bg-red-100"
                  >
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmFzaC1pY29uIGx1Y2lkZS10cmFzaCI+PHBhdGggZD0iTTMgNmgxOCIvPjxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiLz48cGF0aCBkPSJNOCA2VjRjMC0xIDEtMiAyLTJoNGMxIDAgMiAxIDIgMnYyIi8+PC9zdmc+"
                      alt="Delete"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {workstations.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No workstations found.
        </div>
      )}

      <DeleteConfirmationPopup
        open={showDeleteModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
      <EditWorkStationPopup
        workStationManagers={workStationManagers}
        workstations={workstations}
        editItemId={editItemId}
        open={showEditModal}
        onClose={handleCloseEditModel}
        onSubmit={handleConfirmEditModel}
      />
    </div>
  );
};

export default SitesCollection;
