import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Bar from "../../Components/Bar/Bar";
import ItemsTable from "../../Components/ItemsTable/ItemsTable";
import TableSkelton from "../../Components/Skelton/TableSkelton";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const MainInventory = () => {
  const { worksiteId } = useParams();
  const [items, setItems] = useState([]);
  const [workstations, setWorkstations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState();

  const { authState } = useAuth();
  const { userId } = authState;

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/Items/getItemsPagination`, {
        params: { worksiteId, page, limit, search },
      });
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
  }, [worksiteId, page, limit, search]);

  const loadAllItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Items/getItems`
      );
      //console.log("All items response:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
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
  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleIncreaseItemByOne = async (id) => {
    try {
      await axios.put(`${API_URL}/Items/increaseQuantityByOne`, {
        itemId: id,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error("Error increasing item:", error);
      setError("Failed to increase item");
    }
  };
  const handleDecreaseItemByOne = async (id) => {
    try {
      await axios.put(`${API_URL}/Items/decreaseQuantityByOne`, {
        itemId: id,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (error) {
      console.error("Error decreasing item:", error);
      setError("Failed to decrease item");
    }
  };
  const IncreaseItem = async (value) => {
    try {
      await axios.put(`${API_URL}/Items/increaseQuantity`, {
        itemId: value.itemId,
        quantity: value.quantity,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === value.itemId
            ? { ...item, quantity: item.quantity + value.quantity }
            : item
        )
      );
      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item");
      toast.error("Failed to add item");
    }
  };
  const DecreaseItem = async (value) => {
    try {
      await axios.put(`${API_URL}/Items/decreaseQuantity`, {
        itemId: value.itemId,
        quantity: value.quantity,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === value.itemId
            ? { ...item, quantity: item.quantity - value.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item");
    }
  };
  const EditItem = async (value) => {
    console.log("EditItem", value);
    try {
      await axios.put(`${API_URL}/Items/updateItem/${value._id}`, {
        itemName: value.name,
        quantity: value.quantity,
        worksiteId: worksiteId,
        userId: userId,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === value._id
            ? { ...item, itemName: value.name, quantity: value.quantity }
            : item
        )
      );
      toast.success("Item updated successfully!");
    } catch (error) {
      console.error("Error editing item:", error);
      setError("Failed to edit item");
      toast.error("Failed to edit item");
    }
  };
  const DeleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/Items/deleteItem/${id}`, {
        data: {
          worksiteId: worksiteId,
          userId: userId,
        },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item");
      toast.error("Failed to delete item");
    }
  };
  const handleSend = async (values) => {
    //console.log("Send Item Submitted:", values);
    try {
      await axios.post(`${API_URL}/Items/sendItem`, {
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
      setError("Failed to send items");
      toast.error("Failed to send items");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <Bar
        loadItems={loadItems}
        onSearch={handleSearch}
        worksiteId={worksiteId}
        items={items}
        workstations={workstations}
        onSend={handleSend}
      />
      {loading ? (
        <TableSkelton rows={5} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ItemsTable
          items={items}
          handleIncreaseItemByOne={handleIncreaseItemByOne}
          handleDecreaseItemByOne={handleDecreaseItemByOne}
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          IncreaseItem={IncreaseItem}
          DecreaseItem={DecreaseItem}
          EditItem={EditItem}
          DeleteItem={DeleteItem}
        />
      )}
    </div>
  );
};

export default MainInventory;
