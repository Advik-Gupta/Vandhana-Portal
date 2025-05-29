import MachinesOverview from "./components/MachinesOverview";
import "./App.css";
import MachineDetail from "./components/MachineDetails/MachineDetail";
import AddMachine from "./components/AddMachine/AddMachine";
import DataUploadForm from "./components/DataUploadMachine/DataUploadForm";

function App() {
  return (
    <div className="font-[Montserrat]">
      {/* <AddMachine/> */}
      <DataUploadForm/>
      {/* <MachinesOverview/> */}
    </div>
  );
}

export default App;
