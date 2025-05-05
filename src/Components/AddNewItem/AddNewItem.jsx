import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const AddNewItem = ({ onSubmit, worksiteId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setLoading(true);
    const completeValues = {
      ...values,
      workSiteId: worksiteId,
    };
    console.log("Form submitted with values:", completeValues);
    try {
      const response = await axios.post(
        "http://localhost:3000/Items/addItem",
        completeValues
      );
      console.log("Server response:", response.data);
      message.success("Item added successfully!");
      form.resetFields();
      onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
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

      <Form.Item label="Work Site">
        <Input value="Main Inventory" disabled />
      </Form.Item>

      {/* Hidden field to actually submit "Main Inventory" */}
      <Form.Item name="workSite" initialValue="Main Inventory" hidden>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={loading}
        >
          {loading ? "Adding Item..." : "Add Item"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewItem;
