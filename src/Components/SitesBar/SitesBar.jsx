import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import AddNewWorkSite from "./../AddNewWorkSite/AddNewWorkSite";

const { Search } = Input;

const SitesBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handleAddSite = (values) => {
    console.log("New Work Site:", values);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex mb-6">
        <div className="flex justify-between bg-white p-2 w-[100vw] py-3 px-[2rem] rounded-lg shadow-md">
          <Search
            placeholder="Search Workstations...."
            allowClear
            onSearch={onSearch}
            style={{
              width: 500,
              border: "0.5px solid #d9d9d9",
              borderRadius: "8px",
            }}
          />
          <Button
            type="default"
            className="border-gray-800 border-2"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Work Site
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Work Site"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => document.getElementById("submit-worksite-btn").click()}
        okText="Add"
      >
        <AddNewWorkSite
          onSubmit={(values) => {
            handleAddSite(values);
          }}
        />
        {/* Hidden trigger button to handle form submit from outside */}
        <button
          id="submit-worksite-btn"
          type="submit"
          style={{ display: "none" }}
          form="worksite-form"
        />
      </Modal>
    </>
  );
};

export default SitesBar;
