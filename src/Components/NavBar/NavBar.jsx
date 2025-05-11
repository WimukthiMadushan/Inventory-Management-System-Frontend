import { useState } from "react";
import { Button } from "antd";
import Logo from "./../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const MainInventoryID = import.meta.env.VITE_MAIN_INVENTORY_ID;

const NavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { authState, logout, login } = useAuth();
  const { userId, role, name } = authState;

  const showModal = (tab) => {
    setActiveTab(tab);
    setIsModalVisible(true);
  };
  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/User/signin`, values);
      login(res.data.token);
      setIsModalVisible(false);
      toast.success("Login successful");
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (values) => {
    try {
      const res = await axios.post(`${API_URL}/User/signup`, values);
      login();
      setActiveTab("login");
      toast.success("Signup successful. Please log in.");
    } catch (err) {
      console.error("Signup failed", err);
      toast.error(err.response?.data || "Signup failed. Please try again.");
    }
  };
  const handleLogOut = async () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-12">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-gray-900"
            >
              <img src={Logo} alt="Logo" className="h-10 w-10" />
              <span>Inventory</span>
            </Link>
          </div>

          <ul className="flex space-x-6 text-gray-700 font-medium">
            {userId && role === "admin" && (
              <>
                <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                  <Link to={`/main-inventory/${MainInventoryID}`}>
                    Main Inventory
                  </Link>
                </li>
                <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                  <Link to="/sites">Work Sites</Link>
                </li>
                <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                  <Link to="/users">Users</Link>
                </li>
                <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                  <Link to="/summary">Summary</Link>
                </li>
              </>
            )}

            {userId && role === "manager" && (
              <li className="hover:text-gray-800 transition duration-300 cursor-pointer">
                <Link to="/sites">Work Sites</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="space-x-4">
          {userId ? (
            <div className="flex items-center space-x-4">
              <div className="text-right leading-tight">
                <div className="text-gray-700 font-semibold">Hi, {name}!</div>
                <div className="text-sm text-gray-500">
                  <span className="capitalize">{role}</span>
                </div>
              </div>
              <Button
                className="border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition duration-300"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                className="border-[#5B7BF9] text-[#5B7BF9] hover:text-white hover:bg-blue-600 transition duration-300"
                onClick={() => showModal("login")}
              >
                Login
              </Button>
              <Button
                type="primary"
                className="bg-[#5B7BF9] hover:bg-blue-700 transition duration-300"
                onClick={() => showModal("signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>

      <Login
        loading={loading}
        setLoading={setLoading}
        isVisible={isModalVisible}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default NavBar;
