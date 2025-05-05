import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Hooks/AuthContext.jsx";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import Sites from "./Pages/Sites/Sites";
import WorkStation from "./Pages/WorkStation/WorkStation";
import MainInventory from "./Pages/MainInventory/MainInventory";
import UsersPage from "./Pages/UsersPage/UsersPage";

function App() {
  const { authState } = useAuth();
  const { userId, role } = authState;

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main-inventory/:worksiteId" element={<MainInventory />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/:id" element={<WorkStation />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
