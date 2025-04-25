import React from "react";
import { Form, Input, Button } from "antd";

const AddNewItem = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} form={form}>
      <Form.Item
        label="Item Name"
        name="itemName"
        rules={[{ required: true, message: "Please enter the item name" }]}
      >
        <Input placeholder="Enter item name" />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please enter quantity" }]}
      >
        <Input type="number" placeholder="Enter quantity" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewItem;
