import "./App.css";

import { Routes, Route } from "react-router-dom";

import MachinesOverview from "./components/Pages/Machine/MachinesOverview";
import MachineDetail from "./components/Pages/Machine/MachineDetail";
import AddMachine from "./components/Pages/Machine/AddMachine";
import DataUploadForm from "./components/DataUploadMachine/DataUploadForm";
import Login from "./components/Pages/Auth/Login";
import Signup from "./components/Pages/Auth/Signup";
import AdminProtectedRoutes from "./components/Pages/Admin Protected/AdminProtected";
import Dashboard from "./components/Pages/Machine/Dashboard";
import TestSiteDetail from "./components/Pages/TestSite/TestSiteDetail";

function App() {
  return (
    <Routes className="font-[Montserrat]">
      <Route path="/" element={<MachinesOverview />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/upload-data/:machineID/:testSiteNumber/:pointNumber"
        element={<DataUploadForm />}
      />
      <Route path="/admin" element={<AdminProtectedRoutes />}>
        <Route path="/admin/add-machine" element={<AddMachine />} />
        <Route path="/admin/machine/:id" element={<MachineDetail />} />
        <Route
          path="/admin/machine/:id/:testSiteNumber"
          element={<TestSiteDetail />}
        />
      </Route>
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
