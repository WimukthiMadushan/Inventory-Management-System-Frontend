import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import Sites from "./Pages/Sites/Sites";
import WorkStation from "./Pages/WorkStation/WorkStation";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/:id" element={<WorkStation />} />
      </Routes>
    </div>
  );
}

export default App;
