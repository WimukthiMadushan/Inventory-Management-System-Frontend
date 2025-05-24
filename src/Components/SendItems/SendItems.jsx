import { useState } from "react";
import { Modal, Form, Select, InputNumber, message, Input } from "antd";

const { Option } = Select;

const SendItems = ({
  open,
  onCancel,
  onSend,
  items,
  worksiteId,
  workstations,
}) => {
  const [form] = Form.useForm();
  const [selectedItemId, setSelectedItemId] = useState();

  const selectedItem = items.find((item) => item._id === selectedItemId);
  const availableQuantity = selectedItem?.quantity || 0;

  const sourceWorkstation = workstations.find((ws) => ws._id === worksiteId);
  //console.log("Source Workstation:", sourceWorkstation);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    if (values.from === values.to) {
      message.error("Source and destination cannot be the same");
      return;
    }
    onSend(values);
    form.resetFields();
    setSelectedItemId(null);
    onCancel();
  };

  return (
    <Modal
      title="Send Items"
      open={open}
      onCancel={() => {
        form.resetFields();
        setSelectedItemId(null);
        onCancel();
      }}
      onOk={() => form.submit()}
      okText="Send"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Item Selection */}
        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: "Please select an item" }]}
        >
          <Select
            placeholder="Select an item"
            onChange={(value) => setSelectedItemId(value)}
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {items.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.itemName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Show Available Quantity */}
        {selectedItem && (
          <div className="mb-4 text-sm text-gray-600">
            Available: <strong>{availableQuantity}</strong>
          </div>
        )}

        {/* Quantity Input */}
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Enter quantity" },
            {
              validator: (_, value) => {
                if (!value || value <= availableQuantity) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Cannot send more than available quantity")
                );
              },
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        {/* From (disabled, pre-filled) */}
        <Form.Item
          name="from"
          initialValue={sourceWorkstation?._id}
          rules={[{ required: true, message: "Source workstation required" }]}
          hidden
        >
          <Input />
        </Form.Item>

        {/* Display field for user */}
        <Form.Item label="From">
          <Input
            disabled
            value={sourceWorkstation?.workSiteName || "Unknown"}
          />
        </Form.Item>

        {/* To (destination) */}
        <Form.Item
          label="To"
          name="to"
          rules={[
            { required: true, message: "Select destination workstation" },
          ]}
        >
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Select destination"
          >
            {workstations
              .filter((ws) => ws._id !== worksiteId)
              .map((ws) => (
                <Option key={ws._id} value={ws._id}>
                  {ws.workSiteName}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendItems;
