import React from "react";
import SitesBar from "../../Components/SitesBar/SitesBar";
import SitesCollection from "../../Components/SitesCollection/SitesCollection";
import ItemsTable from "../../Components/ItemsTable/ItemsTable";

const Sites = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <SitesBar />
      <SitesCollection />
    </div>
  );
};

export default Sites;
