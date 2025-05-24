import { useState, useEffect } from "react";
import SitesCollection from "../../Components/SitesCollection/SitesCollection";
import axios from "axios";
import WorkSiteBar from "../../Components/WorkSiteBar/WorkSiteBar";
import SitesSkelton from "../../Components/Skelton/SitesSkelton";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const STORE_ROOM_ID = import.meta.env.VITE_MAIN_INVENTORY_ID;
const DAMAGE_REPAIR_ROOM_ID = import.meta.env.VITE_DAMAGE_REPAIR_ROOM_ID;
const TRASH_ROOM_ID = import.meta.env.VITE_TRASH_ROOM_ID;

const Sites = () => {
  const [workstations, setWorkstations] = useState([]);
  const [workStationManagers, setWorkStationManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { authState } = useAuth();
  const { userId } = authState;

  const loadWorkStationManagers = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/getmanagers`);
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

      const excludedIds = [STORE_ROOM_ID, DAMAGE_REPAIR_ROOM_ID, TRASH_ROOM_ID];

      const filteredWorkstations = response.data.filter(
        (workstation) => !excludedIds.includes(workstation._id)
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
    //console.log("Delete Workstation", id);
    try {
      await axios.delete(`${API_URL}/WorkSite/deleteSite/${id}`, {
        data: { userId: userId },
      });
      setWorkstations((prevWorkstations) =>
        prevWorkstations.filter((workstation) => workstation._id !== id)
      );
      toast.success("Workstation deleted successfully");
    } catch (error) {
      console.error("Error deleting workstation:", error);
      setError("Failed to delete workstation");
      toast.error("Failed to delete workstation");
    }
  };
  const handleEditWorkStation = async (values) => {
    //console.log("Edit Workstation", values);
    try {
      await axios.put(`${API_URL}/WorkSite/updateSite/${values._id}`, {
        ...values,
        userId: userId,
      });
      setWorkstations((prevWorkstations) =>
        prevWorkstations.map((workstation) =>
          workstation._id === values._id
            ? { ...workstation, ...values }
            : workstation
        )
      );
      toast.success("Workstation updated successfully");
    } catch (error) {
      console.error("Error editing workstation:", error);
      setError("Failed to edit workstation");
      toast.error("Failed to edit workstation");
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
