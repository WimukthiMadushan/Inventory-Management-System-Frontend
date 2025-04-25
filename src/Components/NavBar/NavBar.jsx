import React, { useState } from "react";
import { Button } from "antd";
import Logo from "./../../assets/Logo.png";
import { Link } from "react-router-dom";
import Login from "../Login/Login";

const NavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const showModal = (tab) => {
    setActiveTab(tab);
    setIsModalVisible(true);
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
            {["Home", "Work Sites"].map((link) => (
              <li
                key={link}
                className="hover:text-gray-800 transition duration-300 cursor-pointer"
              >
                <Link to={link === "Home" ? "/" : "/sites"}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-x-4">
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
        </div>
      </nav>

      <Login
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default NavBar;
