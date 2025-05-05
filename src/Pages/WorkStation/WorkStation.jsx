import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemsTableOfSite from "../../Components/ItemsTableOfSite/ItemsTableOfSite";
import { useParams } from "react-router-dom";
import { WorkStationBar } from "./../../Components/WorkStatationBar/WorkStationBar";

const API_URL = import.meta.env.VITE_API_URL;

const WorkStation = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

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

  const handleSearch = async (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <WorkStationBar onSearch={handleSearch} />
      <ItemsTableOfSite
        items={items}
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default WorkStation;
