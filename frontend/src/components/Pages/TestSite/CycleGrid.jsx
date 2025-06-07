import React, { useState, useEffect } from "react";

import CycleType from "./CycleType";

const CycleGrid = ({ id, machineId, testSiteNumber, pointNo, machineData }) => {
  const [pointData, setPointData] = useState(null);
  const [grindCycles, setGrindCycles] = useState([]);
  const [repaintCycles, setRepaintCycles] = useState([]);

  useEffect(() => {
    const testSiteData = machineData?.testSites?.find(
      (site) => site.testSiteNumber === testSiteNumber
    );
    const pointDataToStore = testSiteData?.points?.find(
      (point) => point.pointName === pointNo
    );
    console.log("point:", pointDataToStore);
    setPointData(pointDataToStore);
    setGrindCycles(pointDataToStore?.grindCycles || []);
    setRepaintCycles(pointDataToStore?.repaintCycles || []);
  }, []);

  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex flex-wrap gap-8 items-start text-sm font-small text-white max-md:max-w-full">
        {Object.entries(grindCycles).map(([cycleId, cycle]) => (
          <CycleType
            key={cycleId}
            text={`Grind Cycle ${cycleId}`}
            id={id}
            machineId={machineId}
            testSiteNumber={testSiteNumber}
            pointNo={pointNo}
            cycleData={cycle}
            machineData={machineData}
          />
        ))}
        {Object.entries(repaintCycles).map(([cycleId, cycle]) => (
          <CycleType
            key={cycleId}
            text={`Repaint Cycle ${cycleId}`}
            id={id}
            machineId={machineId}
            testSiteNumber={testSiteNumber}
            pointNo={pointNo}
            cycleData={cycle}
            machineData={machineData}
          />
        ))}
      </div>
    </section>
  );
};

export default CycleGrid;
