import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import { fetchRawMachines } from "../../api/machine";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allMachines, setAllMachines] = useState([]);

  const [showUploadUI, setShowUploadUI] = useState(false);
  const [machine, setMachine] = useState("");
  const [testSite, setTestSite] = useState("");
  const [point, setPoint] = useState("");
  const [cycle, setCycle] = useState("");
  const [cycleNumber, setCycleNumber] = useState("");
  const [chosenMachineData, setChosenMachineData] = useState(null);

  useEffect(() => {
    fetchRawMachines()
      .then((data) => {
        setAllMachines(data);
        console.log("Fetched machines:", data);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
      });
  }, []);

  const machines = allMachines.map((machine) => machine.name);
  const testSites =
    allMachines
      .find((machineToFind) => machineToFind.name === machine)
      ?.testSites.map((site) => site.testSiteNumber) || [];
  const points =
    allMachines
      .find((machineToFind) => machineToFind.name === machine)
      ?.testSites.find((site) => site.testSiteNumber === testSite)
      ?.points.map((pointToFind) => pointToFind.pointName) || [];
  const cycles = ["Grind", "Repaint"];
  const cycleNumbers = ["1", "2", "3", "4", "5"];

  const toggleUploadUI = () => setShowUploadUI((prev) => !prev);

  const handleMachineChange = (e) => {
    setMachine(e.target.value);
    const chosenMachine = allMachines.find(
      (machineToFind) => machineToFind.name === e.target.value
    );
    setChosenMachineData(chosenMachine);
  };

  return (
    <div className="min-h-screen p-10 bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-lg mb-10">Your upcoming site visits and tasks</p>

      <div className="flex justify-center">
        <button
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90"
          onClick={toggleUploadUI}
        >
          Upload Data
        </button>
      </div>

      {showUploadUI && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white border shadow-xl rounded-3xl p-8 w-full max-w-md">
            {/* Dropdowns */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Choose Machine</label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={machine}
                onChange={handleMachineChange}
              >
                <option value="">-- Select Machine --</option>
                {machines.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Choose Test Site
              </label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={testSite}
                onChange={(e) => setTestSite(e.target.value)}
              >
                <option value="">-- Select Site --</option>
                {testSites.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Choose Point</label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              >
                <option value="">-- Select Point --</option>
                {points.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Choose Cycle</label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
              >
                <option value="">-- Select Cycle --</option>
                {cycles.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Choose Cycle Number
              </label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={cycleNumber}
                onChange={(e) => setCycleNumber(e.target.value)}
              >
                <option value="">-- Select Cycle Number --</option>
                {cycleNumbers.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Button */}
            <Button
              text="Upload Data"
              className="w-full"
              href={`/upload-data/${chosenMachineData?._id}/${testSite}/${
                point.split(".")[1]
              }`}
              dataToPass={{
                cycle: cycle,
                cycleNumber: cycleNumber,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
