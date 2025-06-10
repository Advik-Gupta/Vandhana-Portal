import "./App.css";

import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { Routes, Route, useNavigate } from "react-router-dom";

import MachinesOverview from "./components/Pages/Machine/MachinesOverview";
import MachineDetail from "./components/Pages/Machine/MachineDetail";
import AddMachine from "./components/Pages/Machine/AddMachine";
import DataUploadForm from "./components/DataUploadMachine/DataUploadForm";
import Login from "./components/Pages/Auth/Login";
import Signup from "./components/Pages/Auth/Signup";
import AdminProtectedRoutes from "./components/Pages/Admin Protected/AdminProtected";
import Dashboard from "./components/Pages/Machine/Dashboard";
import TestSiteDetail from "./components/Pages/TestSite/TestSiteDetail";
import DataUploadedDetail from "./components/Pages/DataUploadedDetail/DataUploadDetail";
import EmployeeListDashBoard from "./components/Pages/Employee/EmployeeListDashBoard"
import HomePageAdmin from "./components/Pages/AdminDashBoard/HomePageAdmin";

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes className="font-[Montserrat]">
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/upload-data/:machineID/:testSiteNumber/:pointNumber"
        element={<DataUploadForm />}
      />
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<AdminProtectedRoutes />}>
        <Route path="/admin/machines" element={<MachinesOverview />} />
        <Route path="/admin/employees" element={<EmployeeListDashBoard />} />
        <Route path="/admin/add-machine" element={<AddMachine />} />
        <Route path="/admin/machine/:id" element={<MachineDetail />} />
        <Route
          path="/admin/machine/:id/:testSiteNumber"
          element={<TestSiteDetail />}
        />
        <Route
          path="/admin/upload-data/:machineID/:testSiteNumber/:pointNumber"
          element={<DataUploadedDetail />}
        />
      </Route>
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
