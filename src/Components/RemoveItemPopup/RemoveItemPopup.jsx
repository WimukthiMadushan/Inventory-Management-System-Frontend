import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const RemoveItemPopup = ({ open, onClose, onSubmit, defaultItemId, items }) => {
  const [form] = Form.useForm();
  const [selectedItemName, setSelectedItemName] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState(0);

  useEffect(() => {
    if (open && defaultItemId) {
      const selectedItem = items.find((item) => item._id === defaultItemId);
      setSelectedItemName(selectedItem ? selectedItem.itemName : "");
      setAvailableQuantity(selectedItem ? selectedItem.quantity : 0);
      form.setFieldsValue({ item: selectedItem?.itemName || "", quantity: 1 });
    }
  }, [defaultItemId, open, items, form]);

  const handleFinish = (values) => {
    onSubmit({ ...values, itemId: defaultItemId });
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Remove Stock from Item"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Remove"
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item label="Item Name" name="item">
          <Input disabled value={selectedItemName} />
        </Form.Item>

        <div className="mb-4 text-gray-600">
          <p>
            <strong>Available Quantity:</strong> {availableQuantity}
          </p>
        </div>

        <Form.Item
          label="Quantity to Remove"
          name="quantity"
          rules={[
            { required: true, message: "Enter quantity to remove" },
            {
              validator: (_, value) => {
                if (!value || value <= availableQuantity) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Cannot remove more than available quantity")
                );
              },
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RemoveItemPopup;
