import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import {
  InboxOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  StopOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import DetailsBox from "../../Components/DetailsBox/DetailsBox";
import FilterSection from "../../Components/FilterSection/FilterSection";
import TransactionSteps from "../../Components/TransactionSteps/TransactionSteps";

const API_URL = import.meta.env.VITE_API_URL;

const SummaryPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [itemsCategories, setItemsCategories] = useState([]);
  const [allManagers, setAllManagers] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allWorksites, setAllWorksites] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const loadTotalItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/Items/getItemsQuantity`);
      setTotalItems(response.data.totalQuantity);
    } catch (error) {
      console.error("Error fetching total items:", error);
    }
  };
  const loadItemsCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/Items/getItems`);
      setItemsCategories(response.data);
    } catch (error) {
      console.error("Error fetching items categories:", error);
    }
  };
  const loadAllManagers = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/getmanagersCount`);
      setAllManagers(response.data.count);
    } catch (error) {
      console.error("Error fetching all managers:", error);
    }
  };
  const loadAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/getadminsCount`);
      setAdmins(response.data.count);
    } catch (error) {
      console.error("Error fetching all admins:", error);
    }
  };
  const loadAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/getallusers`);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };
  const loadAllWorksites = async () => {
    try {
      const response = await axios.get(`${API_URL}/Worksite/getSites`);
      setAllWorksites(response.data);
    } catch (error) {
      console.error("Error fetching all worksites:", error);
    }
  };
  const handleSubmit = async (filters) => {
    const payload = {};

    if (filters.fromSite) payload.fromSite = filters.fromSite;
    if (filters.toSite) payload.toSite = filters.toSite;
    if (filters.user) payload.user = filters.user;
    if (filters.item) payload.item = filters.item;
    if (filters.dateRange && filters.dateRange.length === 2) {
      payload.dateRange = filters.dateRange;
    }

    console.log("Filters Selected:", payload);

    try {
      const response = await axios.post(
        `${API_URL}/Transaction/getTransactionsByFilter`,
        {
          filter: payload,
        }
      );
      setTransaction(response.data.data);
      console.log("Filtered transactions:", response.data.data);
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
    }
  };
  useEffect(() => {
    loadTotalItems();
    loadItemsCategories();
    loadAllManagers();
    loadAdmins();
    loadAllWorksites();
    loadAllUsers();
  }, []);

  const userMap = Object.fromEntries(allUsers.map((u) => [u._id, u.name]));
  const itemMap = Object.fromEntries(
    itemsCategories.map((i) => [i._id, i.itemName])
  );
  const siteMap = Object.fromEntries(
    allWorksites.map((s) => [s._id, s.workSiteName])
  );

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex flex-wrap gap-6 p-6 justify-evenly">
          <DetailsBox
            icon={<InboxOutlined />}
            title="Total Items"
            subtitle="Total Items in stock"
            value={totalItems}
            iconBg="bg-green-100 text-green-500"
          />
          <DetailsBox
            icon={<AlertOutlined />}
            title="Items Categories"
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
            value={allWorksites.length - 1}
            iconBg="bg-purple-100 text-purple-500"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center mt-6">
            Transaction History
          </h1>
          <div className="flex flex-wrap gap-6 p-6 justify-center mt-4">
            <FilterSection
              workSites={allWorksites}
              users={allUsers}
              items={itemsCategories}
              onSubmit={handleSubmit}
            />
          </div>
          <div>
            <TransactionSteps
              transaction={transaction}
              userMap={userMap}
              itemMap={itemMap}
              siteMap={siteMap}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryPage;
