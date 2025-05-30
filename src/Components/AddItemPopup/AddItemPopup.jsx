import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const AddItemPopup = ({ open, onClose, onSubmit, defaultItemId, items }) => {
  const [form] = Form.useForm();
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (open && defaultItemId) {
      const selectedItem = items.find((item) => item._id === defaultItemId);
      setSelectedItemName(selectedItem ? selectedItem.itemName : "");
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
      title="Add Stock to Item"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Add"
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item label="Item Name" name="item">
          <Input disabled value={selectedItemName} />
        </Form.Item>

        <Form.Item
          label="Quantity to Add"
          name="quantity"
          rules={[{ required: true, message: "Enter quantity" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItemPopup;
