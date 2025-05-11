import { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const AddNewItem = ({ onSubmit, worksiteId }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [form] = Form.useForm();

  const { authState } = useAuth();
  const { userId } = authState;

  const handleImageUpload = async ({ file }) => {
    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setImageUrl(response.data.secure_url);
      setUploadSuccess(true);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      message.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    const completeValues = {
      ...values,
      workSiteId: worksiteId,
      image: imageUrl,
      userId: userId,
    };

    //console.log("Form submitted with values:", completeValues);
    try {
      const response = await axios.post(
        "http://localhost:3000/Items/addItem",
        completeValues
      );
      toast.success("Item added successfully!");
      form.resetFields();
      setImageUrl(null);
      onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} form={form}>
      <Form.Item label="Upload Image">
        {!imageUrl ? (
          <>
            <Upload
              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"
              disabled={uploading || !!imageUrl}
            >
              <Button
                icon={<UploadOutlined />}
                loading={uploading}
                type={uploadSuccess ? "default" : "primary"}
                className={
                  uploadSuccess
                    ? "bg-green-100 text-green-700 border-green-400"
                    : ""
                }
              >
                {uploadSuccess
                  ? "Image Uploaded"
                  : uploading
                  ? "Uploading..."
                  : "Upload Image"}
              </Button>
            </Upload>
            <div className="text-gray-500 text-sm mt-1 ml-1">
              *Image upload is optional
            </div>
          </>
        ) : (
          <div className="mt-2 relative inline-block">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="rounded shadow"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={() => {
                setImageUrl(null);
                setUploadSuccess(false);
              }}
              className="absolute top-[-8px] right-[-8px] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow cursor-pointers"
              title="Remove Image"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14LWljb24gbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+"
                alt="Close"
                className="cursor-pointer"
              />
            </button>
          </div>
        )}
      </Form.Item>

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
