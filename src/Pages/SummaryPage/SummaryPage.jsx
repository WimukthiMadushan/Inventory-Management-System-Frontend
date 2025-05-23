import { useState, useEffect } from "react";
import axios from "axios";
import {
  InboxOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  StopOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import DetailsBox from "../../Components/DetailsBox/DetailsBox";
import FilterSection from "../../Components/FilterSection/FilterSection";
import TransactionSteps from "../../Components/TransactionSteps/TransactionSteps";

const API_URL = import.meta.env.VITE_API_URL;
const DAMAGE_REPAIR_ROOM_ID = import.meta.env.VITE_DAMAGE_REPAIR_ROOM_ID;
const TRASH_ROOM_ID = import.meta.env.VITE_TRASH_ROOM_ID;

const SummaryPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [itemsInTheRepair, setItemsInTheRepair] = useState(0);
  const [itemsInTheTrash, setItemsInTheTrash] = useState(0);
  const [itemsCategories, setItemsCategories] = useState([]);
  const [allManagers, setAllManagers] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allWorksites, setAllWorksites] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const loadTotalItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/Items/getItemsQuantity`);
      setTotalItems(res.data.totalQuantity);
    } catch (err) {
      console.error("Error fetching total items:", err);
    }
  };

  const loadItemsCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/Items/getItems`);
      setItemsCategories(res.data);
    } catch (err) {
      console.error("Error fetching items categories:", err);
    }
  };

  const loadAllManagers = async () => {
    try {
      const res = await axios.get(`${API_URL}/User/getmanagersCount`);
      setAllManagers(res.data.count);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  const loadAdmins = async () => {
    try {
      const res = await axios.get(`${API_URL}/User/getadminsCount`);
      setAdmins(res.data.count);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const loadAllUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/User/getallusers`);
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const loadAllWorksites = async () => {
    try {
      const res = await axios.get(`${API_URL}/Worksite/getSites`);
      setAllWorksites(res.data);
    } catch (err) {
      console.error("Error fetching worksites:", err);
    }
  };

  const loadItemsInTheRepair = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/Items/getItemsInRepair/${DAMAGE_REPAIR_ROOM_ID}`
      );
      setItemsInTheRepair(res.data.totalQuantity);
    } catch (err) {
      console.error("Error fetching items in repair:", err);
    }
  };

  const loadItemsInTheTrash = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/Items/getItemsInTrash/${TRASH_ROOM_ID}`
      );
      setItemsInTheTrash(res.data.totalQuantity);
    } catch (err) {
      console.error("Error fetching items in trash:", err);
    }
  };

  const handleSubmit = async (filters) => {
    const payload = {};
    if (filters.fromSite) payload.fromSite = filters.fromSite;
    if (filters.toSite) payload.toSite = filters.toSite;
    if (filters.user) payload.user = filters.user;
    if (filters.item) payload.item = filters.item;
    if (filters.dateRange?.length === 2) {
      payload.dateRange = filters.dateRange;
    }

    try {
      const res = await axios.post(
        `${API_URL}/Transaction/getTransactionsByFilter`,
        { filter: payload }
      );
      setTransaction(res.data.data);
    } catch (err) {
      console.error("Error fetching filtered transactions:", err);
    }
  };

  useEffect(() => {
    loadTotalItems();
    loadItemsCategories();
    loadAllManagers();
    loadAdmins();
    loadAllWorksites();
    loadAllUsers();
    loadItemsInTheRepair();
    loadItemsInTheTrash();
  }, []);

  // Maps
  const userMap = Object.fromEntries(allUsers.map((u) => [u._id, u.name]));
  const itemMap = Object.fromEntries(
    itemsCategories.map((i) => [i._id, i.itemName])
  );
  const siteMap = Object.fromEntries(
    allWorksites.map((s) => [s._id, s.workSiteName])
  );

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Top Summary Cards */}
      <div className="flex flex-wrap gap-6 px-4 py-6 justify-center md:justify-evenly max-w-screen-xl mx-auto">
        <DetailsBox
          icon={<InboxOutlined />}
          title="Total Items"
          subtitle="Total Items in stock"
          value={totalItems}
          iconBg="bg-green-100 text-green-500"
        />
        <DetailsBox
          icon={<AlertOutlined />}
          title="Item Categories"
          subtitle="Number of Item Categories"
          value={itemsCategories.length}
          iconBg="bg-orange-100 text-orange-500"
        />
        <DetailsBox
          icon={<ClockCircleOutlined />}
          title="All Managers"
          subtitle="Number of All Managers"
          value={allManagers}
          iconBg="bg-red-100 text-red-500"
        />
        <DetailsBox
          icon={<StopOutlined />}
          title="Admins"
          subtitle="Number of All Admins"
          value={admins}
          iconBg="bg-gray-200 text-gray-700"
        />
        <DetailsBox
          icon={<EnvironmentOutlined />}
          title="All Worksites"
          subtitle="Number of Active Worksites"
          value={allWorksites.length - 3}
          iconBg="bg-purple-100 text-purple-500"
        />
        <DetailsBox
          icon={<ToolOutlined />}
          title="Items in Repair"
          subtitle="Total items currently under repair"
          value={itemsInTheRepair}
          iconBg="bg-blue-100 text-blue-500"
        />

        <DetailsBox
          icon={<DeleteOutlined />}
          title="Items in Trash"
          subtitle="Total items in the trash"
          value={itemsInTheTrash}
          iconBg="bg-pink-100 text-pink-500"
        />
      </div>

      {/* Transaction History */}
      <div className="w-full px-4 mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Transaction History
        </h1>

        <div className="max-w-screen-xl mx-auto">
          <FilterSection
            workSites={allWorksites}
            users={allUsers}
            items={itemsCategories}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="mt-8 px-2 overflow-x-auto max-w-screen-xl mx-auto">
          <TransactionSteps
            transaction={transaction}
            userMap={userMap}
            itemMap={itemMap}
            siteMap={siteMap}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
