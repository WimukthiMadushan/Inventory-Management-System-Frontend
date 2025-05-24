import { useEffect, useState } from "react";
import axios from "axios";
import UsersBar from "../../Components/UsersBar/UsersBar";
import UsersTable from "../../Components/UserTable/UsersTable";
import { toast } from "react-toastify";
import TableSkelton from "../../Components/Skelton/TableSkelton";

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
      //console.log(response);
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
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      setIsAddUserVisible(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user");
      toast.error(error.response?.data || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
  };
  const DeleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/User/deleteuser/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);

      // Check for known backend error messages
      if (error.response?.status === 400) {
        toast.info(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.warn("User not found.");
      } else {
        toast.error("Failed to delete user.");
      }
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <TableSkelton rows={5} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <UsersTable
          users={users}
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          setCurrentPage={setPage}
          DeleteUser={DeleteUser}
        />
      )}
    </div>
  );
};

export default UsersPage;
