import React from "react";
import { useState, useEffect } from "react";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

import { updateTestSiteData } from "../../api/machine";

function DataTable({ machineId, testSiteNumber, machineData }) {
  const testSite = machineData?.testSites?.find(
    (site) => site.testSiteNumber === testSiteNumber
  );

  const initialData = [
    { field: "GMT/Year", value: testSite.gmt || "" },
    { field: "Division/Railway", value: testSite.division || "" },
    { field: "Curve Type", value: testSite.curveType || "" },
    { field: "Curve no/ Degree", value: testSite.degreeOfCurve || "" },
    { field: "Section", value: testSite.section || "" },
    { field: "Station", value: testSite.station || "" },
    { field: "KM From", value: testSite.kmFrom || "" },
    { field: "KM To", value: testSite.kmTo || "" },
    { field: "Next Grind Date", value: testSite.nextGrindingDueDate || "" },
    {
      field: "Next Repaint Date",
      value: testSite.nextRepaintingDueDate || "",
    },
  ];

  const [rowData, setRowData] = useState(
    initialData.map((item) => ({ ...item }))
  );
  const [initialRowData, setInitialRowData] = useState(
    initialData.map((item) => ({ ...item }))
  );
  const [isChanged, setIsChanged] = useState(false);

  const handleRowChange = (index, newValue) => {
    const updatedRows = rowData.map((item, i) =>
      i === index ? { ...item, value: newValue } : item
    );
    setRowData(updatedRows);
  };

  useEffect(() => {
    const isEqual = JSON.stringify(rowData) === JSON.stringify(initialRowData);
    setIsChanged(!isEqual);
  }, [rowData, initialRowData]);

  const handleSave = () => {
    const updatedTestSiteData = {
      gmt: rowData[0].value,
      division: rowData[1].value,
      curveType: rowData[2].value,
      degreeOfCurve: rowData[3].value,
      section: rowData[4].value,
      station: rowData[5].value,
      kmFrom: rowData[6].value,
      kmTo: rowData[7].value,
      nextGrindingDueDate: rowData[8].value ? new Date(rowData[8].value) : null,
      nextRepaintingDueDate: rowData[9].value
        ? new Date(rowData[9].value)
        : null,
    };
    updateTestSiteData(machineId, testSiteNumber, updatedTestSiteData);
    alert("Changes saved!");
    setInitialRowData(rowData.map((item) => ({ ...item }))); // deep clone
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-0">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden w-full rounded-3xl shadow-md">
            <TableHeader />
            {rowData.map((row, index) => (
              <TableRow
                key={index}
                field={row.field}
                value={row.value}
                isEven={index % 2 !== 0}
                isLast={index === rowData.length - 1}
                onChange={(newValue) => handleRowChange(index, newValue)}
              />
            ))}
          </div>
        </div>
      </div>

      {isChanged && (
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm md:text-base"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

export default DataTable;
