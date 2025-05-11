import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./Hooks/AuthContext.jsx";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import Sites from "./Pages/Sites/Sites";
import WorkStation from "./Pages/WorkStation/WorkStation";
import MainInventory from "./Pages/MainInventory/MainInventory";
import UsersPage from "./Pages/UsersPage/UsersPage";
import SummaryPage from "./Pages/SummaryPage/SummaryPage.jsx";

function App() {
  const { authState } = useAuth();
  const { userId, role } = authState;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      userId &&
      role === "manager" &&
      !location.pathname.startsWith("/sites")
    ) {
      navigate("/sites");
    }
  }, [userId, role, navigate, location.pathname]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {(role === "admin" || role === "manager") && (
          <Route
            path="/main-inventory/:worksiteId"
            element={<MainInventory />}
          />
        )}

        {userId && (role === "admin" || role === "manager") && (
          <>
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites/:id" element={<WorkStation />} />
          </>
        )}
        {role === "admin" && <Route path="/users" element={<UsersPage />} />}
        {role === "admin" && (
          <Route path="/summary" element={<SummaryPage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
