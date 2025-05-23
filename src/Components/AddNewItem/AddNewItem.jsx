import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const VITE_API_URL = import.meta.env.VITE_API_URL;
const MAIN_INVENTORY_ID = import.meta.env.VITE_MAIN_INVENTORY_ID;

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
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    const { itemSubCategory, itemType, date } = values;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const itemName = itemType
      ? `${itemSubCategory || "Item"}-${itemType}-${formattedDate}`
      : `${itemSubCategory || "Item"}-${formattedDate}`;

    const completeValues = {
      ...values,
      itemName,
      workSiteId: MAIN_INVENTORY_ID,
      image: imageUrl,
      userId,
      date: dayjs(date).format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.post(
        `${VITE_API_URL}/Items/addItem`,
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
    <Form
      layout="vertical"
      onFinish={handleFinish}
      form={form}
      initialValues={{ date: dayjs(), workSite: "Store Room" }}
    >
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
        label="Category"
        name="itemCategory"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select category">
          <Option value="Reusable">Reusable</Option>
          <Option value="Tools">Tools</Option>
          <Option value="Consumable">Consumable</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Item Sub Category"
        name="itemSubCategory"
        rules={[{ required: true, message: "Please enter item sub-category" }]}
      >
        <Input placeholder="Enter sub-category" />
      </Form.Item>

      <Form.Item label="Item Type (Optional)" name="itemType">
        <Input placeholder="Enter item type (optional)" />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please enter quantity" }]}
      >
        <InputNumber
          placeholder="Enter quantity"
          min={0}
          step={1}
          precision={0} // ensures integer input
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Price Per Item"
        name="pricePerItem"
        rules={[{ required: true, message: "Please enter price per item" }]}
      >
        <InputNumber
          placeholder="Enter price"
          min={0}
          step={0.01}
          precision={2}
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please select date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item rules={[{ required: true }]} name="workSite">
        <Input value="Main Inventory" disabled />
      </Form.Item>

      <Form.Item name="workSite" placeholder="Store Room" hidden>
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
