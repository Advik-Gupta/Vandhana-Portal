import * as React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import DueDate from "./DueDate";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useState, useEffect } from "react";

function DataTable() {
  const initialData = [
    { field: "GMT/Year", value: "37.65" },
    { field: "Division/Railway", value: "UMB/NR" },
    { field: "Curve Type", value: "Tangent" },
    { field: "Curve no/ Degree", value: "Nil" },
    { field: "Section", value: "KKDE–UMB" },
    { field: "Station", value: "UMB" },
    { field: "KM From", value: "191.507" },
    { field: "KM To", value: "191.827" },
    { field: "Pre-Grind Date", value: "5/2/2024" },
    { field: "Grinding Date", value: "7/2/2024" },
    { field: "Post-Grind Date", value: "8/2/2024" },
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
    console.log("Saved Data:", rowData);
    alert("Changes saved!");
    setInitialRowData(rowData.map((item) => ({ ...item }))); // deep clone
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[857px] mt-5 max-sm:p-2.5">
        <div className="relative w-full max-w-[857px]">
          <div className="overflow-hidden w-full rounded-3xl">
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
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

export default DataTable;
