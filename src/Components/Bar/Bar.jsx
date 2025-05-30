import { useState } from "react";
import { Button, Input, Modal } from "antd";
import AddNewItem from "./../AddNewItem/AddNewItem";
import SendItems from "./../SendItems/SendItems";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import SendToTrashModal from "../SendToTrashModal/SendToTrashModal.jsx";
import SendToRepairModal from "../SendToRepairModal/SendToRepairModal.jsx";

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
  const [isTrashModalVisible, setIsTrashModalVisible] = useState(false);
  const [isRepairModalVisible, setIsRepairModalVisible] = useState(false);

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
                onClick={() => setIsRepairModalVisible(true)}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNiY2I4YjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1yZXBlYXQyLWljb24gbHVjaWRlLXJlcGVhdC0yIj48cGF0aCBkPSJtMiA5IDMtMyAzIDMiLz48cGF0aCBkPSJNMTMgMThIN2EyIDIgMCAwIDEtMi0yVjYiLz48cGF0aCBkPSJtMjIgMTUtMyAzLTMtMyIvPjxwYXRoIGQ9Ik0xMSA2aDZhMiAyIDAgMCAxIDIgMnYxMCIvPjwvc3ZnPg=="
                  alt=""
                  className="w-4 h-4 inline-block mr-1"
                />
                Send to Repair
              </Button>
              <Button
                type="default"
                className="bg-[#F5F5F5] hover:bg-gray-200 transition duration-300 w-full md:w-auto"
                onClick={() => setIsTrashModalVisible(true)}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNiY2I4YjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmFzaDItaWNvbiBsdWNpZGUtdHJhc2gtMiI+PHBhdGggZD0iTTMgNmgxOCIvPjxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiLz48cGF0aCBkPSJNOCA2VjRjMC0xIDEtMiAyLTJoNGMxIDAgMiAxIDIgMnYyIi8+PGxpbmUgeDE9IjEwIiB4Mj0iMTAiIHkxPSIxMSIgeTI9IjE3Ii8+PGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjE3Ii8+PC9zdmc+"
                  alt=""
                  className="w-4 h-4 inline-block mr-1"
                />
                Send to Trash
              </Button>
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
      <SendToTrashModal
        open={isTrashModalVisible}
        onCancel={() => setIsTrashModalVisible(false)}
        items={items}
        onSend={onSend}
      />

      <SendToRepairModal
        open={isRepairModalVisible}
        onCancel={() => setIsRepairModalVisible(false)}
        items={items}
        onSend={onSend}
      />
    </>
  );
};

export default Bar;
