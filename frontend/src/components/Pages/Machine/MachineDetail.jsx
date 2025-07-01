import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { createTestSite } from "../../api/machine";

import TestSiteBlock from "./TestSiteBlock";
import dropdown from "../../../assets/dd2.png";
import useMachineDetails from "../../hooks/useMachineDetails";
import AssignEmployee from "./AssignEmployee";
import CycleTable from "./CycleTable";
import { UserContext } from "../../../contexts/user.context";

import { updateMachineData } from "../../api/machine";

function MachineDetail() {
  const { id } = useParams();
  const { machine, loading, error, createdByUser, assignedEngineerUser } =
    useMachineDetails(id);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showSiteInput, setShowSiteInput] = useState(false);
  const [siteInputValue, setSiteInputValue] = useState("");
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEngineerChange = async (selectedEngineerId) => {
    const response = await updateMachineData(id, {
      name: machine.name,
      engineerID: selectedEngineerId,
      machineType: machine.machineType,
    });
    // reload page if response is successful
    if (response) {
      currentUser.role === "admin"
        ? navigate(`/admin/machines`)
        : navigate(`/supervisor/machines`);
    } else {
      console.error("Failed to update machine with new engineer");
    }
    setShowAssignPopup(false);
  };

  const handleAddTestSite = async () => {
    if (!siteInputValue.trim()) {
      alert("Please enter a valid test site number.");
      return;
    }

    const newTestSiteNumber = `T${siteInputValue.trim()}`;
    const updatedMachine = await createTestSite(id, newTestSiteNumber);
    if (!updatedMachine) {
      console.error("Failed to add new test site");
      return;
    }

    let testPoints = [];

    const site = updatedMachine.testSites.find(
      (site) => site.testSiteNumber === newTestSiteNumber
    );
    testPoints = site ? site.points || [] : [];

    // Redirect to the new test site page
    if (currentUser.role === "admin") {
      navigate(`/admin/machine/${id}/${newTestSiteNumber}`, {
        state: { machine: updatedMachine, testSitePoints: testPoints },
      });
    } else {
      navigate(`/supervisor/machine/${id}/${newTestSiteNumber}`, {
        state: { machine: updatedMachine, testSitePoints: testPoints },
      });
    }

    // Reset state
    setSiteInputValue("");
    setShowSiteInput(false);
  };

  useEffect(() => {
    console.log("Machine details loaded:", machine);
  }, [machine]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  if (!machine) return null;

  return (
    <div className="mb-5 p-10">
      <div className="mb-2 text-4xl font-bold text-black md:text-6xl">
        {machine.name}
      </div>
      {showAssignPopup && (
        <div className="absolute inset-0 z-50 flex justify-center items-start pt-10">
          <div className="w-[700px]   rounded-2xl px-6">
            <AssignEmployee onSelectEngineer={handleEngineerChange} />
          </div>
        </div>
      )}
      <div className="z-10 gap-2.5 self-start p-2.5 -mt-3 text-2xl text-black">
        Created by: {createdByUser ? createdByUser.name : "Unknown"}
      </div>
      <div className="mt-6 mb-4">
        <div className="mt-6 mb-4">
          {!showSiteInput ? (
            <button
              className="px-6 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200"
              onClick={() => setShowSiteInput(true)}
            >
              + Add another test site
            </button>
          ) : (
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="px-4 py-2 border rounded-md w-80"
                placeholder="New site number (e.g. 3)"
                value={siteInputValue}
                onChange={(e) => setSiteInputValue(e.target.value)}
              />
              <button
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleAddTestSite}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setShowSiteInput(false);
                  setSiteInputValue("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-5 justify-between self-end px-16 py-3.5 mt-11 max-w-full text-3xl font-medium text-white bg-black rounded-3xl w-[1350px] mx-auto max-md:px-5 max-md:mt-10">
        <div className="gap-2.5 self-stretch p-2.5 max-md:max-w-full">
          Assigned Engineer -{" "}
          {assignedEngineerUser ? assignedEngineerUser.name : "Unknown"}
        </div>
        <button
          onClick={() => setShowAssignPopup((prev) => !prev)}
          className="flex absolute top-2/4 justify-center items-center bg-white rounded-xl -translate-y-2/4 h-[41px] right-[75px] w-[50px] mr-5"
          aria-label="Select engineer"
        >
          <img
            src={dropdown}
            alt="Dropdown"
            className="object-contain shrink-0 my-auto rounded-xl aspect-[1.22] w-[50px]"
          />
        </button>
      </div>

      <div className="mt-10">
        <CycleTable machine={machine} />
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto mt-10">
        {machine.testSites?.length > 0 ? (
          machine.testSites.map((site, idx) => (
            <TestSiteBlock
              key={site._id || idx}
              testSiteNumber={site.testSiteNumber}
              machineId={id}
              machineData={machine}
            />
          ))
        ) : (
          <div className="mt-8 text-xl text-gray-600">No test sites found.</div>
        )}
      </div>
    </div>
  );
}

export default MachineDetail;
