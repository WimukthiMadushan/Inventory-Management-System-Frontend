import React, { useEffect } from "react";
import { Modal, Form, Select, InputNumber } from "antd";

const { Option } = Select;

const AddItemPopup = ({ open, onClose, onSubmit, defaultItemId, items }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && defaultItemId) {
      form.setFieldsValue({ item: defaultItemId, quantity: 1 });
    }
  }, [defaultItemId, open, form]);

  const handleFinish = (values) => {
    onSubmit(values);
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
        <Form.Item label="Item" name="item" rules={[{ required: true }]}>
          <Select disabled>
            {items.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
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
