import React from "react";
import { useState } from "react";
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
      <div className="flex mb-6">
        <div className="flex justify-between bg-white p-2 w-[100vw] py-3 px-[2rem] rounded-lg shadow-md">
          <Search
            placeholder="Search item..."
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
              type="default"
              className="bg-[#F5F5F5] hover:bg-gray-200 transition duration-300"
              onClick={() => setIsSendModalVisible(true)}
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmM4YzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kLWljb24gbHVjaWRlLXNlbmQiPjxwYXRoIGQ9Ik0xNC41MzYgMjEuNjg2YS41LjUgMCAwIDAgLjkzNy0uMDI0bDYuNS0xOWEuNDk2LjQ5NiAwIDAgMC0uNjM1LS42MzVsLTE5IDYuNWEuNS41IDAgMCAwLS4wMjQuOTM3bDcuOTMgMy4xOGEyIDIgMCAwIDEgMS4xMTIgMS4xMXoiLz48cGF0aCBkPSJtMjEuODU0IDIuMTQ3LTEwLjk0IDEwLjkzOSIvPjwvc3ZnPg=="
                alt=""
                className="w-4 h-4"
              />
              Send Items
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
