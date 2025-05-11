import { useEffect, useMemo } from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const EditWorkStationPopup = ({
  open,
  onClose,
  onSubmit,
  workstations,
  editItemId,
  workStationManagers,
}) => {
  const [form] = Form.useForm();

  const managersList = workStationManagers || [];

  const defaultValues = useMemo(() => {
    const workstation = workstations.find((item) => item._id === editItemId);
    return workstation || null;
  }, [workstations, editItemId]);

  useEffect(() => {
    if (open && defaultValues) {
      form.setFieldsValue({
        workSiteName: defaultValues.workSiteName || "",
        workSiteManager: defaultValues.workSiteManager || "",
      });
    }
  }, [open, defaultValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ _id: defaultValues._id, ...values });
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    console.log("Cancelled");
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit Workstation"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
    >
      <Form form={form} layout="vertical" name="editWorkstationForm">
        <Form.Item
          name="workSiteName"
          label="Workstation Name"
          rules={[
            { required: true, message: "Please enter a workstation name" },
          ]}
        >
          <Input placeholder="Enter workstation name" />
        </Form.Item>
        <Form.Item
          name="workSiteManager"
          label="Workstation Manager"
          rules={[{ required: true, message: "Please select a manager" }]}
        >
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Select a manager"
          >
            {managersList.map((manager) => (
              <Option key={manager._id} value={manager._id}>
                {manager.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditWorkStationPopup;
