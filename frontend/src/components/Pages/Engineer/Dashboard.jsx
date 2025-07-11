import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../../contexts/user.context";
import Button from "../../ui/Button";
import { fetchRawMachines } from "../../api/machine";
import UpdatesSection from "./Updates";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const [allMachines, setAllMachines] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [showUploadUI, setShowUploadUI] = useState(false);
  const [machine, setMachine] = useState("");
  const [testSite, setTestSite] = useState("");
  const [point, setPoint] = useState("");
  const [cycle, setCycle] = useState("");
  const [cycleNumber, setCycleNumber] = useState("");
  const [grindingDate, setGrindingDate] = useState(null);
  const [dataType, setDataType] = useState("");
  const [chosenMachineData, setChosenMachineData] = useState(null);

  const [otherUpdates, setOtherUpdates] = useState(null);

  useEffect(() => {
    console.log("User context:", currentUser);
    fetchRawMachines()
      .then((data) => {
        const assignedMachines = data.filter(
          (machine) => machine.assignedEngineer === currentUser._id
        );
        if (assignedMachines.length === 0) {
          console.warn("No machines assigned to the current user.");
        }
        setAllMachines(assignedMachines);
        console.log("Fetched machines:", assignedMachines);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
      });
  }, [currentUser]);

  const machines = allMachines.map((machine) => machine.name);
  const testSites =
    allMachines
      .find((machineToFind) => machineToFind.name === machine)
      ?.testSites.map((site) => {
        if (site.status === "active") {
          return site.testSiteNumber;
        }
        return null;
      }) || [];
  const points =
    allMachines
      .find((machineToFind) => machineToFind.name === machine)
      ?.testSites.find((site) => site.testSiteNumber === testSite)
      ?.points.map((pointToFind) => pointToFind.pointName) || [];
  const cycles = ["Grind", "Repaint"];

  const grindCycleNumbers = Array.from(
    {
      length:
        (allMachines
          .find((machineToFind) => machineToFind.name === machine)
          ?.testSites.find((site) => site.testSiteNumber === testSite)
          ?.currentGrindingCycle || 1) + 1,
    },
    (_, i) => i + 1
  );
  const repaintCycleNumbers = Array.from(
    {
      length:
        (allMachines
          .find((machineToFind) => machineToFind.name === machine)
          ?.testSites.find((site) => site.testSiteNumber === testSite)
          ?.currentRepaintingCycle || 1) + 1,
    },
    (_, i) => i + 1
  );

  const toggleUploadUI = () => setShowUploadUI((prev) => !prev);

  const handleMachineChange = (e) => {
    setMachine(e.target.value);
    setTestSite("");
    setPoint("");
    setCycle("");
    setCycleNumber("");
    setChosenMachineData(null);
    const chosenMachine = allMachines.find(
      (machineToFind) => machineToFind.name === e.target.value
    );
    setChosenMachineData(chosenMachine);
  };

  function formatNotification(notification) {
    const { createdAt, message } = notification;

    // Main message match (handles the required 7 fields)
    const mainMatch = message.match(
      /Data for (\w+) cycle (\d+) of - ([^{,]+) \{([^}]+)\}, ([^,]+), (\d+) has been updated by (\w+)/
    );

    if (!mainMatch) {
      console.warn("Unrecognized notification message:", message);
      return null;
    }

    const [
      _,
      cycleType,
      cycleNumber,
      title,
      machineID,
      testSite,
      pointNumber,
      uploaderId,
    ] = mainMatch;

    // Split the message by "+" to extract extra remarks, if any
    const parts = message.split(" + ");
    const extraInfo = parts[1]?.trim(); // May be undefined

    let missingImages = null;
    let userRemarks = null;

    if (extraInfo) {
      const splitParts = extraInfo.split("\n\n");
      missingImages = splitParts[0]?.trim() || null;
      userRemarks = splitParts.slice(1).join("\n\n").trim() || null;
    }

    const pointName = `${testSite}.${pointNumber}`;

    const dateObj = new Date(createdAt);
    const formattedDate = dateObj
      .toLocaleDateString("en-GB")
      .split("/")
      .map((part, i) => (i === 2 ? part.slice(-2) : part))
      .join("/");

    return {
      type: cycleType === "Grind" ? "grinding" : "repainting",
      title: title.trim(),
      subtitle: `Test site No ${testSite} > ${pointName} > ${cycleType} Cycle ${cycleNumber}`,
      uploadedBy: `${uploaderId}`,
      date: formattedDate,
      url: `/admin/upload-data/${machineID}/${testSite}/${pointNumber}`,
      missingImages,
      userRemarks,
    };
  }

  function onCycleNumberChoice(e) {
    const newCycleNumber = e.target.value;
    const allPointsData = allMachines
      .find((machineToFind) => machineToFind.name === machine)
      ?.testSites.find((site) => site.testSiteNumber === testSite)?.points;

    let cycleGrindingDate = null;
    cycleGrindingDate =
      cycle === "Grind"
        ? (cycleGrindingDate = allPointsData.find(
            (pointToFind) => pointToFind.pointName === point
          )?.grindCycles?.[newCycleNumber]?.grindingDate)
        : (cycleGrindingDate = allPointsData.find(
            (pointToFind) => pointToFind.pointName === point
          )?.repaintCycles?.[newCycleNumber]?.grindingDate);

    setCycleNumber(newCycleNumber);
    setGrindingDate(cycleGrindingDate ? new Date(cycleGrindingDate) : null);
  }

  useEffect(() => {
    currentUser?.notifications?.reverse().map((notification) => {
      if (notification.type === "info" || notification.type === "warning") {
        if (otherUpdates && otherUpdates.length >= 10) {
          setOtherUpdates((prev) => {
            const newUpdates = [...(prev || [])];
            newUpdates.shift();
            return [...newUpdates, notification];
          });
        } else {
          setOtherUpdates((prev) => [...(prev || []), notification]);
        }
      } else {
        setDataUpdates((prev) => [
          ...(prev || []),
          formatNotification(notification),
        ]);
      }
    });
  }, [currentUser]);

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
                onChange={(e) => (
                  setTestSite(e.target.value),
                  setPoint(""),
                  setCycle(""),
                  setCycleNumber("")
                )}
              >
                <option value="">-- Select Site --</option>
                {testSites.map((item, idx) => (
                  <>
                    {item === null ? null : (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    )}
                  </>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Choose Point</label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={point}
                onChange={(e) => (
                  setPoint(e.target.value), setCycle(""), setCycleNumber("")
                )}
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
                onChange={(e) => (setCycle(e.target.value), setCycleNumber(""))}
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
                onChange={onCycleNumberChoice}
              >
                <option value="">-- Select Cycle Number --</option>
                {(cycle === "Grind"
                  ? grindCycleNumbers
                  : repaintCycleNumbers
                ).map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Choose Grinding Date
              </label>
              {!grindingDate ? (
                <DatePicker
                  selected={grindingDate}
                  onChange={(date) => setGrindingDate(date)}
                  className="w-full border rounded-xl px-4 py-3"
                  placeholderText="Select Grinding Date"
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()} // Prevent future dates
                  value={grindingDate}
                />
              ) : (
                <div className="flex flex-row items-center justify-between">
                  <DatePicker
                    selected={grindingDate}
                    onChange={(date) => setGrindingDate(date)}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholderText="Select Grinding Date"
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()} // Prevent future dates
                    disabled
                  />
                  <p>Already set!!</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Choose Data Type
              </label>
              <select
                className="w-full border rounded-xl px-4 py-3"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
              >
                <option value="">-- Select Data Type --</option>
                <option value="pre">Pre Data</option>
                <option value="post">Post Data</option>
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
                grindingDate: grindingDate,
                dataType: dataType,
              }}
            />
          </div>
        </div>
      )}

      <div className="ml-5 flex flex-col gap-6 max-md:ml-0 max-md:w-full">
        {otherUpdates && otherUpdates.length > 0 ? (
          <UpdatesSection updates={otherUpdates} />
        ) : (
          <div className="text-gray-500 text-center mt-5">
            No updates available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
