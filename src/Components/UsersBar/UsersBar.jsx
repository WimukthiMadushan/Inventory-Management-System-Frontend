import { Button, Input } from "antd";
import React, { useState } from "react";
import AddUserPopup from "../AddUserPopup/AddUserPopup";
import { useAuth } from "./../../Hooks/AuthContext.jsx";

const { Search } = Input;

const UsersBar = ({
  AddUsers,
  isAddUserVisible,
  setIsAddUserVisible,
  loading,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");
  const { authState } = useAuth();
  const { userId, role } = authState;

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleAddUser = async (values) => {
    console.log("Add User:", values);
    AddUsers(values);
  };

  return (
    <>
      <div className="mb-6 px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-4 rounded-lg shadow-md w-full">
          <Search
            placeholder="Search Users..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-[400px]"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />

          {userId && role === "admin" && (
            <div className="w-full md:w-auto flex justify-end">
              <Button
                type="primary"
                className="w-full md:w-auto bg-[#5B7BF9] hover:bg-blue-700 transition duration-300"
                onClick={() => setIsAddUserVisible(true)}
              >
                + Add Users
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddUserPopup
        visible={isAddUserVisible}
        onCancel={() => setIsAddUserVisible(false)}
        onSubmit={handleAddUser}
        confirmLoading={loading}
      />
    </>
  );
};

export default UsersBar;
