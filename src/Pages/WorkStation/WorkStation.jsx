import React from "react";
import WorkSiteBar from "../../Components/WorkSiteBar/WorkSiteBar";
import ItemsTable from "../../Components/ItemsTable/ItemsTable";

const WorkStation = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <WorkSiteBar />
      <ItemsTable />
    </div>
  );
};

export default WorkStation;
