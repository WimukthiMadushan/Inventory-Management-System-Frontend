import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import AddNewItem from "./../AddNewItem/AddNewItem";
import SendItems from "./../SendItems/SendItems";
import { useAuth } from "./../../Hooks/AuthContext.jsx";

const { Search } = Input;

const Bar = ({
  loadItems,
  onSearch,
  worksiteId,
  items,
  workstations,
  onSend,
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSendModalVisible, setIsSendModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { authState } = useAuth();
  const { userId, role } = authState;

  const handleAddNew = (values) => {
    setIsAddModalVisible(false);
    loadItems();
  };

  const handleSend = (values) => {
    onSend(values);
    setIsSendModalVisible(false);
  };
  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <>
      <div className="mb-6 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-lg shadow-md w-full">
          {/* Search Input */}
          <Search
            placeholder="Search item..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-[500px]"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />

          {/* Buttons (Admin Only) */}
          {userId && role === "admin" && (
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
              <Button
                type="default"
                className="bg-[#F5F5F5] hover:bg-gray-200 transition duration-300 w-full md:w-auto"
                onClick={() => setIsSendModalVisible(true)}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmM4YzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kLWljb24gbHVjaWRlLXNlbmQiPjxwYXRoIGQ9Ik0xNC41MzYgMjEuNjg2YS41LjUgMCAwIDAgLjkzNy0uMDI0bDYuNS0xOWEuNDk2LjQ5NiAwIDAgMC0uNjM1LS42MzVsLTE5IDYuNWEuNS41IDAgMCAwLS4wMjQuOTM3bDcuOTMgMy4xOGEyIDIgMCAwIDEgMS4xMTIgMS4xMXoiLz48cGF0aCBkPSJtMjEuODU0IDIuMTQ3LTEwLjk0IDEwLjkzOSIvPjwvc3ZnPg=="
                  alt=""
                  className="w-4 h-4 inline-block mr-1"
                />
                Send Items
              </Button>

              <Button
                type="primary"
                className="bg-[#5B7BF9] hover:bg-blue-700 transition duration-300 w-full md:w-auto"
                onClick={() => setIsAddModalVisible(true)}
              >
                + Add New Item
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        title="Add New Item"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <AddNewItem onSubmit={handleAddNew} worksiteId={worksiteId} />
      </Modal>

      {/* Send Items Modal */}
      <SendItems
        items={items}
        workstations={workstations}
        worksiteId={worksiteId}
        open={isSendModalVisible}
        onCancel={() => setIsSendModalVisible(false)}
        onSend={handleSend}
      />
    </>
  );
};

export default Bar;
