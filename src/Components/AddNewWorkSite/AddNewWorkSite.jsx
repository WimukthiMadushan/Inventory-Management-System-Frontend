import React from "react";
import { Form, Input, Select, Modal, Empty } from "antd";

const { Option } = Select;

const AddNewWorkSite = ({
  visible,
  onCancel,
  onSubmit,
  confirmLoading,
  workStationManagers = [], // default to empty array
}) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Work Site"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      okText="Add Site"
    >
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
          {workStationManagers.length > 0 ? (
            <Select placeholder="Select a manager">
              {workStationManagers.map((manager) => (
                <Option key={manager._id} value={manager._id}>
                  {manager.name}
                </Option>
              ))}
            </Select>
          ) : (
            <div className="border px-3 py-2 rounded text-gray-500 bg-gray-50">
              No managers available to assign
            </div>
          )}
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input.TextArea placeholder="Enter address (optional)" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewWorkSite;
