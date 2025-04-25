import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const EditItemPopup = ({ open, onClose, onSubmit, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && item) {
      form.setFieldsValue({
        name: item.name,
        quantity: item.quantity,
      });
    }
  }, [item, open, form]);

  const handleFinish = (values) => {
    onSubmit({ ...item, ...values }); // Keep original item ID
    form.resetFields();
  };

  return (
    <Modal
      title="Edit Item"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Update"
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Item Name"
          name="name"
          rules={[{ required: true, message: "Please enter item name" }]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="quantity"
          rules={[{ required: true, message: "Enter stock quantity" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditItemPopup;
