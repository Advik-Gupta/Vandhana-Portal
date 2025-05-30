import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MachinesOverview from "./components/MachinesOverview";
import UploadCard from "./components/ui/UploadCard";
import './App.css';

function App() {
  return (
    <Router>
      <div className="font-[Montserrat]">
        <Routes>
          <Route path="/" element={<UploadCard />} />
          <Route path="/machines" element={<MachinesOverview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
