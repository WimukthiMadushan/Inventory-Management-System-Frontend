import { Modal, Form, Select, InputNumber, Input, message } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const STORE_ROOM_ID = import.meta.env.VITE_MAIN_INVENTORY_ID;
const REPAIR_ROOM_ID = import.meta.env.VITE_DAMAGE_REPAIR_ROOM_ID;

const SendToRepairModal = ({ open, onCancel, items, onSend }) => {
  const [form] = Form.useForm();
  const [selectedItemId, setSelectedItemId] = useState();

  const selectedItem = items.find((item) => item._id === selectedItemId);
  const availableQuantity = selectedItem?.quantity || 0;

  const handleSubmit = (values) => {
    if (values.quantity > availableQuantity) {
      message.error("Cannot send more than available quantity");
      return;
    }

    onSend({
      item: values.item,
      quantity: values.quantity,
      from: STORE_ROOM_ID,
      to: REPAIR_ROOM_ID,
    });

    form.resetFields();
    setSelectedItemId(null);
    onCancel();
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setSelectedItemId(null);
    }
  }, [open, form]);

  return (
    <Modal
      title="Send Item to Repair"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Send"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Item */}
        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: "Please select an item" }]}
        >
          <Select
            placeholder="Select item"
            onChange={setSelectedItemId}
            showSearch
            allowClear
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

        {selectedItem && (
          <div className="mb-2 text-sm text-gray-600">
            Available: <strong>{availableQuantity}</strong>
          </div>
        )}

        {/* Quantity */}
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Enter quantity" },
            {
              validator: (_, value) =>
                value <= availableQuantity
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Cannot send more than available quantity")
                    ),
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        {/* From (fixed + hidden) */}
        <Form.Item name="from" initialValue="Store Room" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="From">
          <Input disabled value="Store Room" />
        </Form.Item>

        {/* To (fixed Repair) */}
        <Form.Item name="to" initialValue="Repair" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="To">
          <Input disabled value="Repair" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendToRepairModal;
