import React, { useState } from "react";
import { Modal, Form, Select, InputNumber } from "antd";

const { Option } = Select;

const sampleItems = [
  { id: 1, name: "Hammer", available: 15 },
  { id: 2, name: "Wrench", available: 8 },
  { id: 3, name: "Drill", available: 5 },
];

const workstations = Array.from(
  { length: 6 },
  (_, i) => `Workstation ${i + 1}`
);

const SendItems = ({ open, onCancel, onSend }) => {
  const [form] = Form.useForm();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const selectedItem = sampleItems.find((item) => item.id === selectedItemId);

  const handleSubmit = (values) => {
    onSend(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Send Items"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Send"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: "Please select an item" }]}
        >
          <Select
            placeholder="Select an item"
            onChange={(value) => setSelectedItemId(value)}
          >
            {sampleItems.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedItem && (
          <div className="mb-4 text-sm text-gray-600">
            Available: <strong>{selectedItem.available}</strong>
          </div>
        )}

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Enter quantity" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          label="From"
          name="from"
          rules={[{ required: true, message: "Select source workstation" }]}
        >
          <Select placeholder="Select source">
            {workstations.map((ws, i) => (
              <Option key={i} value={ws}>
                {ws}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="To"
          name="to"
          rules={[
            { required: true, message: "Select destination workstation" },
          ]}
        >
          <Select placeholder="Select destination">
            {workstations.map((ws, i) => (
              <Option key={i} value={ws}>
                {ws}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendItems;
