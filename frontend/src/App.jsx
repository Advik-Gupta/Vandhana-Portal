import "./App.css";

import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import MachinesOverview from "./components/Pages/Machine/MachinesOverview";
import MachineDetail from "./components/Pages/Machine/MachineDetail";
import AddMachine from "./components/Pages/Machine/AddMachine";
import DataUploadForm from "./components/Pages/DataUploadMachine/DataUploadForm";
import Login from "./components/Pages/Auth/Login";
import Signup from "./components/Pages/Auth/Signup";
import ChangePassword from "./components/Pages/Auth/ChangePassword";
import AdminProtectedRoutes from "./components/Pages/AdminProtected/AdminProtected";
import SupervisorProtectedRoutes from "./components/Pages/SupervisorProtected/SupervisorProtectedRoutes";
import Dashboard from "./components/Pages/Engineer/Dashboard";
import TestSiteDetail from "./components/Pages/TestSite/TestSiteDetail";
import DataUploadedDetail from "./components/Pages/DataUploadedDetail/DataUploadDetail";
import EmployeeListDashBoard from "./components/Pages/Employee/EmployeeListDashBoard";
import HomePageAdmin from "./components/Pages/AdminDashBoard/HomePageAdmin";
import HomePageSupervisor from "./components/Pages/SupervisorDashBoard/HomepageSupervisor";

function App() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role === "supervisor") {
        navigate("/supervisor/home");
      } else if (currentUser.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    }
  }, [currentUser]);

  return (
    <>
      {currentUser ? <Navbar /> : <></>}
      <Routes className="font-[Montserrat]">
        <Route path="/login" element={<Login />} />
        {currentUser && (
          <Route path="/change-password" element={<ChangePassword />} />
        )}
        <Route
          path="/upload-data/:machineID/:testSiteNumber/:pointNumber"
          element={<DataUploadForm />}
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/home" element={<HomePageAdmin />} />
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
        <Route path="/supervisor" element={<SupervisorProtectedRoutes />}>
          <Route path="/supervisor/home" element={<HomePageSupervisor />} />
          <Route path="/supervisor/machines" element={<MachinesOverview />} />
          <Route path="/supervisor/machine/:id" element={<MachineDetail />} />
          <Route
            path="/supervisor/machine/:id/:testSiteNumber"
            element={<TestSiteDetail />}
          />
          <Route
            path="/supervisor/upload-data/:machineID/:testSiteNumber/:pointNumber"
            element={<DataUploadedDetail />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
