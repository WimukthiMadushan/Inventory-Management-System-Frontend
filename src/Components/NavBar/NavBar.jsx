import { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
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
  const [drawerVisible, setDrawerVisible] = useState(false);

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
      await axios.post(`${API_URL}/User/signup`, values);
      setActiveTab("login");
      toast.success("Signup successful. Please log in.");
    } catch (err) {
      console.error("Signup failed", err);
      toast.error(err.response?.data || "Signup failed. Please try again.");
    }
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  const menuLinks = (
    <>
      {userId && role === "admin" && (
        <>
          <Link to="/" onClick={() => setDrawerVisible(false)}>
            Home
          </Link>
          <Link
            to={`/main-inventory/${MainInventoryID}`}
            onClick={() => setDrawerVisible(false)}
          >
            Main Inventory
          </Link>
          <Link to="/sites" onClick={() => setDrawerVisible(false)}>
            Work Sites
          </Link>
          <Link to="/users" onClick={() => setDrawerVisible(false)}>
            Users
          </Link>
          <Link to="/summary" onClick={() => setDrawerVisible(false)}>
            Summary
          </Link>
        </>
      )}
      {userId && role === "manager" && (
        <Link to="/sites" onClick={() => setDrawerVisible(false)}>
          Work Sites
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between flex-wrap">
        {/* Left - Logo and Desktop Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-gray-800 hover:text-gray-900"
          >
            <img src={Logo} alt="Logo" className="h-10 w-10 mr-2" />
            <span>Inventory</span>
          </Link>

          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {menuLinks}
          </div>
        </div>

        {/* Right - User Controls or Login */}
        <div className="hidden md:flex items-center space-x-4">
          {userId ? (
            <div className="flex items-center space-x-4">
              <div className="text-right leading-tight">
                <div className="text-gray-700 font-semibold">Hi, {name}!</div>
                <div className="text-sm text-gray-500 capitalize">{role}</div>
              </div>
              <Button
                className="border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                className="border-[#5B7BF9] text-[#5B7BF9] hover:text-white hover:bg-blue-600"
                onClick={() => showModal("login")}
              >
                Login
              </Button>
              <Button
                type="primary"
                className="bg-[#5B7BF9] hover:bg-blue-700"
                onClick={() => showModal("signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile - Hamburger Icon */}
        <div className="md:hidden">
          <MenuOutlined
            className="text-xl text-gray-700 cursor-pointer"
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title="Navigation"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col space-y-4 text-base">
          {menuLinks}
          <hr />
          {userId ? (
            <>
              <div className="font-semibold text-gray-700">Hi, {name}</div>
              <Button
                danger
                block
                onClick={() => {
                  setDrawerVisible(false);
                  handleLogOut();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button block onClick={() => showModal("login")}>
                Login
              </Button>
              <Button type="primary" block onClick={() => showModal("signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Drawer>

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
