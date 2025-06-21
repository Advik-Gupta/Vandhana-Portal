import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import DueDate from "./DueDate";
import ImageDetail from "./ImageDetail";

import { updateTestSiteData } from "../../api/machine";

function TestSiteDetail() {
  const [points, setPoints] = useState([]);
  const { id, testSiteNumber } = useParams();
  const location = useLocation();
  const { machine, testSitePoints } = location.state || {};
  const [isActive, setIsActive] = useState(machine.testSiteActive);
  const [currentTestSite, setCurrentTestSite] = useState(null);

  useEffect(() => {
    const pointsToUse = [];

    const currentSite = machine.testSites.filter(
      (site) => site.testSiteNumber === testSiteNumber
    );

    setCurrentTestSite(currentSite[0]);

    currentSite[0].status === "active" ? setIsActive(true) : setIsActive(false);

    testSitePoints?.forEach((point) => {
      pointsToUse.push({
        id: point._id,
        pointNo: point.pointName,
      });
    });

    setPoints(pointsToUse);
  }, [testSitePoints]);

  const handleToggle = async () => {
    const updatedTestSiteData = {
      ...currentTestSite,
      status: isActive ? "inactive" : "active",
    };
    updateTestSiteData(id, testSiteNumber, updatedTestSiteData);

    setIsActive(!isActive);
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-2 text-4xl font-bold text-black md:text-6xl">
          {machine.name} - {testSiteNumber}
        </div>
        <div className="mb-4 text-lg text-black md:text-2xl">
          Created by : User({machine.createdBy})
        </div>
        <Button
          text="Return to Machine"
          href={`/admin/machine/${id}`}
          className="mb-6 w-full rounded-xl text-lg md:w-[200px] md:text-xl"
        />
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-md">
          <div>
            <p className="text-lg font-medium text-gray-800">
              Test Site Status:{" "}
              <span className={isActive ? "text-green-600" : "text-red-600"}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </p>
          </div>

          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              isActive ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <DataTable
              machineId={id}
              testSiteNumber={testSiteNumber}
              machineData={machine}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DueDate
              label="Last Grinding Due Date"
              showCheckbox
              date="12/11/2025"
            />
            <DueDate label="New Grinding Due Date" date="12/11/2025" />
            <DueDate
              label="Last Repairing Due Date"
              showCheckbox
              date="12/11/2025"
            />
            <DueDate label="New Repairing Due Date" date="12/11/2025" />
          </div>
        </div>
      </div>
      {Array.from({ length: Math.ceil(points.length / 2) }, (_, i) => (
        <div key={i} className="mx-auto max-w-7xl px-4 mt-8">
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            {points.slice(i * 2, i * 2 + 2).map((point) => (
              <div key={point.id} className="w-full md:w-1/2">
                <ImageDetail
                  pointNo={point.pointNo}
                  id={point.id}
                  machineId={id}
                  testSiteNumber={testSiteNumber}
                  machineData={machine}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestSiteDetail;
