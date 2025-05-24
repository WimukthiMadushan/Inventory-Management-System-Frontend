import { useState, useEffect } from "react";
import InventoryBar from "../../Components/InventoryBar/InventoryBar";
import TableSkelton from "../../Components/Skelton/TableSkelton";
import InventoryTable from "../../Components/InventoryTable/InventoryTable";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [allItems, SetAllItems] = useState([]);
  const [workstations, setWorkstations] = useState([]);
  const [selectedSite, setSelectedSite] = useState();
  const [name, setName] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/Items/getItemsPagination`, {
        params: {
          page,
          limit,
          search,
          ...(name && { name }),
          ...(selectedSite && { worksiteId: selectedSite }),
        },
      });
      //console.log("Items response:", response.data.items);
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
    loadItems();
  }, [name, selectedSite, page, limit, search]);

  const loadAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/Items/getItems`);
      //console.log("All items response:", response.data);
      SetAllItems(response.data);
    } catch (error) {
      console.error("Error fetching all items:", error);
    }
  };
  useEffect(() => {
    loadAllItems();
  }, []);

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
  }, []);

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };
  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <InventoryBar
        items={allItems}
        onSearch={handleSearch}
        workstations={workstations}
        Site={selectedSite}
        onSiteChange={setSelectedSite}
        onNameChange={setName}
        name={name}
      />
      {loading ? (
        <TableSkelton rows={5} />
      ) : (
        <InventoryTable
          items={items}
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </div>
  );
};

export default Inventory;
