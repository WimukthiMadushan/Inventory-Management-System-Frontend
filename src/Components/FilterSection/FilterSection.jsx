import { useState } from "react";
import { Select, DatePicker, Card, Row, Col, Button } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterSection = ({ workSites, users, items, onSubmit }) => {
  const [fromSite, setFromSite] = useState(null);
  const [toSite, setToSite] = useState(null);
  const [user, setUser] = useState(null);
  const [item, setItem] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const handleSubmit = () => {
    console.log("Filters Selected:");
    console.log({
      fromSite,
      toSite,
      user,
      item,
      dateRange: dateRange?.map((d) => d.format("YYYY-MM-DD")) ?? null,
    });
    onSubmit({
      fromSite,
      toSite,
      user,
      item,
      dateRange: dateRange?.map((d) => d.format("YYYY-MM-DD")) ?? null,
    });
  };

  return (
    <Card className="rounded-2xl shadow-lg p-6 bg-white w-[90%] mx-auto mt-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium mb-1">From Site</label>
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="Select Site"
            className="w-full"
            onChange={setFromSite}
          >
            {workSites.map((site) => (
              <Option key={site._id} value={site._id}>
                {site.workSiteName}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium mb-1">To Site</label>
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="Select Site"
            className="w-full"
            onChange={setToSite}
          >
            {workSites.map((site) => (
              <Option key={site._id} value={site._id}>
                {site.workSiteName}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium mb-1">User</label>
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="Select User"
            className="w-full"
            onChange={setUser}
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium mb-1">Item</label>
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="Select Item"
            className="w-full"
            onChange={setItem}
          >
            {items.map((item) => (
              <Option key={item._id} value={item.itemName}>
                {item.itemName}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={12}>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <RangePicker
            className="w-full"
            size="middle"
            value={dateRange}
            onChange={setDateRange}
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            allowClear
          />
        </Col>

        <Col xs={24} md={12} className="flex items-end justify-end mt-[1.5rem]">
          <Button
            type="primary"
            className="w-full md:w-auto mt-4 md:mt-0"
            onClick={handleSubmit}
          >
            Apply Filters
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterSection;
