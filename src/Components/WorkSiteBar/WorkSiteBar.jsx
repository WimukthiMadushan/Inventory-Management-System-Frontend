import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import SendItems from "../SendItems/SendItems";
import AddNewWorkSite from "../AddNewWorkSite/AddNewWorkSite";

const { Search } = Input;

const API_URL = import.meta.env.VITE_API_URL;

const WorkSiteBar = ({ onSearch, loadWorkStations, workStationManagers }) => {
  const [isAddWorkStationModalVisible, setIsAddWorkStationModalVisible] =
    useState(false);
  const [searchText, setSearchText] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };
  const handleAddWorkSite = async (values) => {
    setAddLoading(true);
    const payload = {
      workSiteName: values.name,
      address: values.address || "",
      workSiteManager: values.manager,
    };
    try {
      const response = await axios.post(`${API_URL}/WorkSite/addSite`, payload);
      console.log("Server response:", response.data);
      loadWorkStations();
    } catch (error) {
      console.error(
        "Error adding work site:",
        error.response?.data || error.message
      );
    } finally {
      setIsAddWorkStationModalVisible(false);
      setAddLoading(false);
      setSearchText("");
    }
  };

  return (
    <>
      <div className="flex mb-6">
        <div className="flex justify-between bg-white p-2 w-[100vw] py-3 px-[2rem] rounded-lg shadow-md">
          <Search
            placeholder="Search Work Sites..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 500,
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              className="bg-[#F5F5F5] hover:bg-gray-200 transition duration-300"
              onClick={() => setIsAddWorkStationModalVisible(true)}
            >
              + Add WorkStations
            </Button>
          </div>
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
