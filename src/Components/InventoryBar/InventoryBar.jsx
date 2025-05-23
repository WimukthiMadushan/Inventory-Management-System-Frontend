import { useState } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const InventoryBar = ({
  items,
  name,
  onNameChange,
  onSearch,
  workstations,
  Site,
  onSiteChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    onSearch(searchText);
  };
  return (
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
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
          <Select
            placeholder="Select site"
            value={Site}
            onChange={onSiteChange}
            className="w-full md:w-[200px]"
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          >
            {workstations.map((ws) => (
              <Option key={ws._id} value={ws._id}>
                {ws.workSiteName}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Name"
            value={name}
            onChange={onNameChange}
            className="w-full md:w-[200px]"
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          >
            {items.map((item) => (
              <Option key={item._id} value={item.itemName}>
                {item.itemName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default InventoryBar;
