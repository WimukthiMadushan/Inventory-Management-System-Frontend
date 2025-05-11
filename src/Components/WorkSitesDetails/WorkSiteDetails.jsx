import React from "react";
import {
  EnvironmentOutlined,
  UserOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const WorkSiteDetails = ({ worksite }) => {
  if (!worksite) {
    return (
      <div className="bg-white p-4 w-full rounded-md shadow-sm mb-4">
        <p className="text-gray-500 text-center">No worksite selected.</p>
      </div>
    );
  }

  const managerName =
    typeof worksite.workSiteManager === "object"
      ? worksite.workSiteManager.name
      : worksite.workSiteManager;

  return (
    <div className="bg-white px-4 py-3 w-full rounded-md shadow-sm mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <EnvironmentOutlined className="text-gray-500" />
        Work Site Details
      </h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <HomeOutlined className="text-gray-500" />
          <p>
            <strong>Name:</strong> {worksite.workSiteName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <IdcardOutlined className="text-gray-500" />
          <p>
            <strong>Address:</strong> {worksite.address}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <UserOutlined className="text-gray-500" />
          <p>
            <strong>Manager:</strong> {managerName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkSiteDetails;
