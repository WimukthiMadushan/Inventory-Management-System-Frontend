import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersBar from "../../Components/UsersBar/UsersBar";
import UsersTable from "../../Components/UserTable/UsersTable";

const API_URL = import.meta.env.VITE_API_URL;

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/User/getusersbypagination`, {
        params: { page, limit, search: searchText },
      });
      console.log(response);
      setUsers(response.data.users);
      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, [page, limit, searchText]);

  const AddUsers = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/User/signup`, values);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setIsAddUserVisible(false);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#F5F7F9]">
      <UsersBar
        AddUsers={AddUsers}
        isAddUserVisible={isAddUserVisible}
        setIsAddUserVisible={setIsAddUserVisible}
        loading={loading}
        onSearch={handleSearch}
      />
      <UsersTable
        users={users}
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default UsersPage;
