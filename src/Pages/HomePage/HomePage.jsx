import React from "react";
import Bar from "../../Components/Bar/Bar";
import ItemsTable from "../../Components/ItemsTable/ItemsTable";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <Bar />
      <ItemsTable />
    </div>
  );
};

export default HomePage;
