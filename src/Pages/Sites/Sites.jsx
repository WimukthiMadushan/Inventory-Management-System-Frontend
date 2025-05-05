import React, { useState, useEffect } from "react";
import SitesCollection from "../../Components/SitesCollection/SitesCollection";
import axios from "axios";
import WorkSiteBar from "../../Components/WorkSiteBar/WorkSiteBar";
import SitesSkelton from "../../Components/Skelton/SitesSkelton";

const API_URL = import.meta.env.VITE_API_URL;
const MainInventoryID = import.meta.env.VITE_MAIN_INVENTORY_ID;

const Sites = () => {
  const [workstations, setWorkstations] = useState([]);
  const [workStationManagers, setWorkStationManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadWorkStationManagers = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/getmanagers`);
      //console.log("Work Station Managers:", response.data);
      setWorkStationManagers(response.data);
    } catch (error) {
      console.error("Error loading work station managers:", error);
      setError("Failed to load work station managers");
    }
  };
  useEffect(() => {
    loadWorkStationManagers();
  }, []);

  const loadWorkStations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/WorkSite/getSites?search=${searchTerm}`
      );
      const filteredWorkstations = response.data.filter(
        (workstation) => workstation._id !== MainInventoryID
      );
      setWorkstations(filteredWorkstations);
    } catch (error) {
      console.error("Error loading workstations:", error);
      setError("Failed to load workstations");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadWorkStations();
  }, [searchTerm]);

  const handleSearch = async (value) => {
    setSearchTerm(value);
  };
  const handleDeleteWorkStation = async (id) => {
    console.log("Delete Workstation", id);
    try {
      await axios.delete(`${API_URL}/WorkSite/deleteSite/${id}`);
      setWorkstations((prevWorkstations) =>
        prevWorkstations.filter((workstation) => workstation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting workstation:", error);
      setError("Failed to delete workstation");
    }
  };
  const handleEditWorkStation = async (values) => {
    console.log("Edit Workstation", values);
    try {
      await axios.put(`${API_URL}/WorkSite/updateSite/${values._id}`, values);
      setWorkstations((prevWorkstations) =>
        prevWorkstations.map((workstation) =>
          workstation._id === values._id
            ? { ...workstation, ...values }
            : workstation
        )
      );
    } catch (error) {
      console.error("Error editing workstation:", error);
      setError("Failed to edit workstation");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <WorkSiteBar
        onSearch={handleSearch}
        loadWorkStations={loadWorkStations}
        workStationManagers={workStationManagers}
      />
      {loading ? (
        <SitesSkelton count={6} />
      ) : (
        <SitesCollection
          workStationManagers={workStationManagers}
          workstations={workstations}
          DeleteWorkStation={handleDeleteWorkStation}
          EditWorkStation={handleEditWorkStation}
        />
      )}
    </div>
  );
};

export default Sites;
