import { Button, message } from "antd";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MainInventoryID = import.meta.env.VITE_MAIN_INVENTORY_ID;

const HomePage = () => {
  const { authState } = useAuth();
  const { userId, role } = authState;
  const navigate = useNavigate();

  //dummy

  const handleGetStarted = () => {
    if (!userId) {
      toast.info("Please log in to continue.", { position: "bottom-right" });
      return;
    }

    if (role === "manager") {
      navigate("/sites");
    } else if (role === "admin") {
      navigate("/main-inventory/" + MainInventoryID);
    } else {
      message.error("Unauthorized role");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f0f2f5] px-6 py-16">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Inventory Management System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Simplify and streamline your stock tracking process with our intuitive
          and powerful inventory system.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
          alt="Inventory Illustration"
          className="w-48 h-48 mb-10"
        />
        <Button type="primary" size="large" onClick={handleGetStarted}>
          Get Started
        </Button>
      </main>

      {/* Footer */}
      <footer className="mt-10 py-6 bg-white w-full text-center shadow-inner">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Aura Digital Labs. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
