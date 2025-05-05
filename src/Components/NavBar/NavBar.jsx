import React, { useState } from "react";
import { Button } from "antd";
import Logo from "./../../assets/Logo.png";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const MainInventoryID = import.meta.env.VITE_MAIN_INVENTORY_ID;

const NavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { authState, logout, login } = useAuth();
  const { userId, role } = authState;

  const showModal = (tab) => {
    setActiveTab(tab);
    setIsModalVisible(true);
  };
  const handleSignIn = async (values) => {
    try {
      const res = await axios.post(`${API_URL}/User/signin`, values);
      login(res.data.token);
      setIsModalVisible(false);
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  const handleSignUp = async (values) => {
    try {
      const res = await axios.post(`${API_URL}/User/signup`, values);
      login();
      setIsModalVisible(false);
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800 cursor-pointer">
            <img src={Logo} alt="Logo" className="h-10 w-10" />
            <span>Inventory</span>
          </div>

          <ul className="flex space-x-6 text-gray-700 font-medium">
            {[
              { name: "Home", path: "/" },
              {
                name: "Main Inventory",
                path: "/main-inventory/" + MainInventoryID,
              },
              { name: "Work Sites", path: "/sites" },
              { name: "Users", path: "/users" },
            ].map((link) => (
              <li
                key={link.name}
                className="hover:text-gray-800 transition duration-300 cursor-pointer"
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-x-4">
          {userId ? (
            <>
              <span className="text-gray-600 font-medium mr-2">
                Role: {role}
              </span>
              <Button
                className="border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition duration-300"
                onClick={logout}
              >
                Logout
              </Button>
            </>
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
