import * as React from "react";
import TableHeader from "../TestSite/TableHeader";
import TableRow from "./TableRow";

function DataTable() {
  const rowData = [
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

  return (
    <div className=" flex">
      <div className="flex w-[857px]  mt-5 max-sm:p-2.5">
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
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DataTable;
