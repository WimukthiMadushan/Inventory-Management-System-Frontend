import React from "react";
import { Modal } from "antd";

const DeleteConfirmationPopup = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={open}
      onOk={onConfirm}
      onCancel={onClose}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default DeleteConfirmationPopup;
