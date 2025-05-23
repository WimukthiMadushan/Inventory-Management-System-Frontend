import { useEffect, useState } from "react";
import axios from "axios";
import TrashBar from "../../Components/TrashBar/TrashBar";
import TrashItemsTable from "../../Components/TrashItemsTable/TrashItemsTable";
import TableSkelton from "../../Components/Skelton/TableSkelton";
import { useAuth } from "../../Hooks/AuthContext";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const TRASH_ROOM_ID = import.meta.env.VITE_TRASH_ROOM_ID;

const Trash = () => {
  const [workstations, setWorkstations] = useState([]);
  const [selectedSite, setSelectedSite] = useState();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const { authState } = useAuth();
  const { userId } = authState;

  const loadWorkstations = async () => {
    try {
      const response = await axios.get(`${API_URL}/WorkSite/getSites`);
      setWorkstations(
        response.data.filter((site) => site._id !== TRASH_ROOM_ID)
      );
    } catch (error) {
      console.error("Error fetching workstations:", error);
    }
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/Items/getItemsFromSiteAndWorkSite`,
        {
          fromSite: selectedSite || null,
          worksiteId: TRASH_ROOM_ID,
        },
        {
          params: { search: searchTerm || "", page, limit },
        }
      );
      setItems(response.data.items);
      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching paginated items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkstations();
  }, []);

  useEffect(() => {
    loadItems();
  }, [selectedSite, searchTerm, page, limit]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleSend = async (values) => {
    console.log("Send Item Submitted:", values);
    try {
      await axios.post(`${API_URL}/Items/sendItemToStoreRoom`, {
        itemId: values.item,
        from: values.from,
        to: values.to,
        quantity: values.quantity,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === values.item
            ? { ...item, quantity: item.quantity - values.quantity }
            : item
        )
      );
      toast.success("Item sent successfully!");
    } catch (error) {
      console.error("Error sending items:", error);
      toast.error("Failed to send items");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <TrashBar
        fromSite={selectedSite}
        onFromSiteChange={setSelectedSite}
        onSearch={handleSearch}
        onSend={handleSend}
        workstations={workstations}
        items={items}
      />
      {loading ? (
        <TableSkelton />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          {items.length > 0 ? (
            <TrashItemsTable
              items={items}
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
              limit={limit}
              setLimit={setLimit}
            />
          ) : (
            <p>No items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Trash;
