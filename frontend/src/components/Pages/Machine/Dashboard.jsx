import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../ui/Button";

const Dashboard = () => {
  const [showUploadUI, setShowUploadUI] = useState(false);

  const toggleUploadUI = () => {
    setShowUploadUI((prev) => !prev);
  };

  return (
    <div className="min-h-screen p-10 bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-lg mb-10">Your upcoming site visits and tasks</p>

      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90"
          onClick={toggleUploadUI}
        >
          Upload Data
        </button>
      </div>

      {/* Upload Popup UI */}
      {showUploadUI && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white border shadow-xl rounded-3xl p-8 w-full max-w-md">
            {[
              "Choose Machine",
              "Choose Test Site",
              "Choose Point",
              "Choose Cycle",
            ].map((label, index) => (
              <div key={index} className="mb-4">
                <button className="w-full bg-black text-white px-4 py-3 rounded-xl text-left flex justify-between items-center">
                  {label}
                  <span className="transform rotate-90">&#9654;</span>
                </button>
              </div>
            ))}
            <Button  text="Upload Data" href="/upload-data/:machineID/:testSiteNumber/:pointNumber"/>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
