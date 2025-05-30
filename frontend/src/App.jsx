import "./App.css";

import { Routes, Route } from "react-router-dom";

import MachinesOverview from "./components/Pages/Machine/MachinesOverview";
import MachineDetail from "./components/Pages/Machine/MachineDetail";
import AddMachine from "./components/Pages/Machine/AddMachine";
import DataUploadForm from "./components/DataUploadMachine/DataUploadForm";

function App() {
  return (
    <Routes className="font-[Montserrat]">
      <Route path="/" element={<MachinesOverview />} />
      <Route path="/machine/:id" element={<MachineDetail />} />
      <Route path="/add-machine" element={<AddMachine />} />
      <Route
        path="/upload-data/:machineID/:testSiteNumber/:pointNumber"
        element={<DataUploadForm />}
      />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
