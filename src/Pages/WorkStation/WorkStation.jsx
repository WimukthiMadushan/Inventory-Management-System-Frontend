import { useState, useEffect } from "react";
import axios from "axios";
import ItemsTableOfSite from "../../Components/ItemsTableOfSite/ItemsTableOfSite";
import { useParams } from "react-router-dom";
import { WorkStationBar } from "./../../Components/WorkStatationBar/WorkStationBar";
import TableSkelton from "../../Components/Skelton/TableSkelton";
import { toast } from "react-toastify";
import WorkSiteDetails from "../../Components/WorkSitesDetails/WorkSiteDetails";
import { useAuth } from "../../Hooks/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const WorkStation = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [workstations, setWorkstations] = useState([]);
  const [worksite, setWorkSite] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const { authState } = useAuth();
  const { userId } = authState;

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/Items/getItemsPagination?worksiteId=${id}&page=${page}&limit=${limit}&search=${searchTerm}`
      );
      const data = response.data;
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [searchTerm, page, limit]);

  const loadWorkSitesById = async () => {
    try {
      const response = await axios.get(`${API_URL}/WorkSite/getSite/${id}`);
      setWorkSite(response.data);
    } catch (error) {
      console.error("Error fetching worksite by ID:", error);
      setError("Failed to fetch worksite");
    }
  };

  const loadWorkstations = async () => {
    try {
      const response = await axios.get(`${API_URL}/WorkSite/getSites`);
      setWorkstations(response.data);
    } catch (error) {
      console.error("Error fetching workstations:", error);
    }
  };
  useEffect(() => {
    loadWorkstations();
    loadWorkSitesById();
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    setPage(1);
  };
  const handleSend = async (values) => {
    //console.log("Send Item Submitted:", values);
    try {
      await axios.post(`${API_URL}/Items/sendItemToStoreRoom`, {
        itemId: values.item,
        from: values.from,
        to: values.to,
        quantity: values.quantity,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems
          .map((item) =>
            item._id === values.item
              ? { ...item, quantity: item.quantity - values.quantity }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
      toast.success("Item sent successfully");
    } catch (error) {
      console.error("Error sending items:", error);
      setError("Failed to send items");
      toast.error("Failed to send items");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <WorkStationBar
        onSearch={handleSearch}
        items={items}
        workstations={workstations}
        worksiteId={id}
        onSend={handleSend}
      />
      <WorkSiteDetails worksite={worksite} />
      {loading ? (
        <TableSkelton rows={5} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ItemsTableOfSite
          items={items.filter((item) => item.quantity > 0)}
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          limit={limit}
          workstations={workstations}
          setLimit={setLimit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default WorkStation;
