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
      <div className="flex mb-6">
        <div className="flex justify-between bg-white p-2 w-[100vw] py-3 px-[2rem] rounded-lg shadow-md">
          <Search
            placeholder="Search Users..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 500,
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />
          {userId && role === "admin" && (
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                className="bg-[#5B7BF9] hover:bg-blue-700 transition duration-300"
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
