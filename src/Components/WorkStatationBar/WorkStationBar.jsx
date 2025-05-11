import React, { useState } from "react";
import { Button, Input } from "antd";
import SendItems from "../SendItems/SendItems";

const { Search } = Input;

export const WorkStationBar = ({
  onSearch,
  items,
  workstations,
  worksiteId,
  onSend,
}) => {
  const [isSendModalVisible, setIsSendModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleSend = (values) => {
    console.log("Send Item Submitted:", values);
    onSend(values);
    setIsSendModalVisible(false);
  };

  return (
    <>
      <div className="mb-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 gap-4 rounded-lg shadow-md w-full">
          <Search
            placeholder="Search item..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-[400px]"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />
          <div className="w-full md:w-auto flex justify-end">
            <Button
              type="default"
              className="w-full md:w-auto flex items-center gap-2 bg-[#F5F5F5] hover:bg-gray-200 transition duration-300"
              onClick={() => setIsSendModalVisible(true)}
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmM4YzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kLWljb24gbHVjaWRlLXNlbmQiPjxwYXRoIGQ9Ik0xNC41MzYgMjEuNjg2YS41LjUgMCAwIDAgLjkzNy0uMDI0bDYuNS0xOWEuNDk2LjQ5NiAwIDAgMC0uNjM1LS42MzVsLTE5IDYuNWEuNS41IDAgMCAwLS4wMjQuOTM3bDcuOTMgMy4xOGEyIDIgMCAwIDEgMS4xMTIgMS4xMXoiLz48cGF0aCBkPSJtMjEuODU0IDIuMTQ3LTEwLjk0IDEwLjkzOSIvPjwvc3ZnPg=="
                alt=""
                className="w-4 h-4"
              />
              <span>Send Items</span>
            </Button>
          </div>
        </div>
      </div>

      <SendItems
        open={isSendModalVisible}
        onCancel={() => setIsSendModalVisible(false)}
        onSend={handleSend}
        items={items}
        workstations={workstations}
        worksiteId={worksiteId}
      />
    </>
  );
};
