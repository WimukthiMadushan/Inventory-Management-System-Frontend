import { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import AddNewWorkSite from "../AddNewWorkSite/AddNewWorkSite";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { toast } from "react-toastify";

const { Search } = Input;
const API_URL = import.meta.env.VITE_API_URL;

const WorkSiteBar = ({ onSearch, loadWorkStations, workStationManagers }) => {
  const [isAddWorkStationModalVisible, setIsAddWorkStationModalVisible] =
    useState(false);
  const [searchText, setSearchText] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const { authState } = useAuth();
  const { userId, role } = authState;

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleAddWorkSite = async (values) => {
    setAddLoading(true);
    const payload = {
      workSiteName: values.name,
      address: values.address || "",
      workSiteManager: values.manager,
      userId: userId,
    };
    try {
      const response = await axios.post(`${API_URL}/WorkSite/addSite`, payload);
      console.log("Server response:", response.data);
      loadWorkStations();
      toast.success("Work site added successfully!");
    } catch (error) {
      console.error(
        "Error adding work site:",
        error.response?.data || error.message
      );
      toast.error("Failed to add work site. Please try again.");
    } finally {
      setIsAddWorkStationModalVisible(false);
      setAddLoading(false);
      setSearchText("");
    }
  };

  return (
    <>
      <div className="mb-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-md w-full">
          {/* Search Bar */}
          <Search
            placeholder="Search Work Sites..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-[400px]"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />

          {/* Add Button (Admin only) */}
          {userId && role === "admin" && (
            <div className="w-full md:w-auto flex justify-end">
              <Button
                type="primary"
                className="bg-[#5B7BF9] hover:bg-blue-700 transition duration-300 w-full md:w-auto"
                onClick={() => setIsAddWorkStationModalVisible(true)}
              >
                + Add WorkStations
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddNewWorkSite
        workStationManagers={workStationManagers}
        visible={isAddWorkStationModalVisible}
        onCancel={() => setIsAddWorkStationModalVisible(false)}
        onSubmit={handleAddWorkSite}
        confirmLoading={addLoading}
      />
    </>
  );
};

export default WorkSiteBar;
