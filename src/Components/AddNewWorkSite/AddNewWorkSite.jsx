import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const managers = ["John Doe", "Alice Smith", "Mark Taylor", "Emily Johnson"];

const AddNewWorkSite = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.Item
        label="Work Site Name"
        name="name"
        rules={[{ required: true, message: "Please enter a site name" }]}
      >
        <Input placeholder="Enter work site name" />
      </Form.Item>

      <Form.Item
        label="Site Manager"
        name="manager"
        rules={[{ required: true, message: "Please select a site manager" }]}
      >
        <Select placeholder="Select a manager">
          {managers.map((manager, index) => (
            <Option key={index} value={manager}>
              {manager}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default AddNewWorkSite;
