import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import Button from "../../ui/Button";
import DropdownButton from "../../ui/DropDownBtn";
import { fetchMachines } from "../../api/machine";
import { UserContext } from "../../../contexts/user.context";

const MachinesOverview = () => {
  const [searchMachine, setSearchMachine] = useState("");
  const [allMachines, setAllMachines] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchMachines()
      .then((data) => {
        setAllMachines(data);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
      });
  }, []);

  const handleSearchMachineChange = (e) => {
    setSearchMachine(e.target.value);
    console.log(allMachines);
  };

  const filteredMachines = allMachines.filter((machine) => {
    const search = searchMachine.trim().toLowerCase();
    const matchesSearch =
      !search ||
      machine.name?.toLowerCase().includes(search) ||
      machine.id?.toString().toLowerCase().includes(search);

    return matchesSearch;
  });

  console.log("Search value:", searchMachine);
  console.log("Filtered results:", filteredMachines);

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Machines");

    // Define main table headers
    sheet.columns = [
      { header: "Machine Name", key: "name", width: 30 },
      { header: "Test Site No.", key: "testSite", width: 20 },
      { header: "Grinding Due Date", key: "grinding", width: 25 },
      { header: "Repainting Due Date", key: "repainting", width: 25 },
    ];

    const getColor = (dueDate) => {
      if (!dueDate) return null;
      const date = new Date(dueDate);
      const today = new Date();
      const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
      if (isNaN(diff)) return null;
      if (diff < 0) return "FF0000"; // Red
      if (diff <= 15) return "FFA500"; // Orange
      if (diff <= 60) return "FFFF00"; // Yellow
      return "00FF00"; // Green
    };

    // Add data rows
    filteredMachines.forEach((machine) => {
      const grindDate = machine.nextGrindingDueDate
        ? new Date(machine.nextGrindingDueDate).toISOString().split("T")[0]
        : "N/A";
      const repaintDate = machine.nextRepaintingDueDate
        ? new Date(machine.nextRepaintingDueDate).toISOString().split("T")[0]
        : "N/A";

      const row = sheet.addRow({
        name: machine.name,
        testSite: machine.testSite,
        grinding: grindDate,
        repainting: repaintDate,
      });

      const grindColor = getColor(machine.nextGrindingDueDate);
      const repaintColor = getColor(machine.nextRepaintingDueDate);

      if (grindColor) {
        row.getCell("grinding").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: grindColor },
        };
      }

      if (repaintColor) {
        row.getCell("repainting").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: repaintColor },
        };
      }
    });

    // Style header
    sheet.getRow(1).font = { bold: true };

    // Add legend (starting from column F)
    const legendStartRow = 2;
    const legendCol1 = "F";
    const legendCol2 = "G";

    const legendItems = [
      { label: "Due Date Passed", color: "FF0000" },
      { label: "15 Days to Due Date", color: "FFA500" },
      { label: "1 Month to Due Date", color: "FFFF00" },
      { label: "2 Month to Due Date", color: "00FF00" },
    ];

    legendItems.forEach((item, index) => {
      const rowIndex = legendStartRow + index;
      const labelCell = `${legendCol1}${rowIndex}`;
      const colorCell = `${legendCol2}${rowIndex}`;

      sheet.getCell(labelCell).value = item.label;
      sheet.getCell(labelCell).font = { bold: true };

      sheet.getCell(colorCell).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: item.color },
      };
    });

    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "MachinesOverview_Styled_WithLegend.xlsx");
  };

  return (
    <div className="bg-gray-200 p-9 min-h-[100vh]">
      <h1 className="text-6xl font-bold text-center mb-4">Machines Overview</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          value={searchMachine}
          onChange={handleSearchMachineChange}
          placeholder="Search by machine name or ID..."
          className="bg-gray-300 rounded p-2 w-100"
        />
        {currentUser?.role === "admin" ? (
          <>
            <Button
              text="+ Add Machine"
              className="text-xl"
              href="/admin/add-machine"
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-300"></div>
              <span>Due in 1–2 months</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-300"></div>
              <span>Due in 1 month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-300"></div>
              <span>Due in 15 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-red-600 font-semibold">Overdue</span>
            </div>
          </div>
          <button
            onClick={handleDownload} // define this function in your component
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow"
          >
            Download
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4 text-left">Machine Name</th>
              <th className="py-2 px-4 text-left">Test Site No.</th>
              <th className="py-2 px-4 text-left">Grinding Due Date</th>
              <th className="py-2 px-4 text-left">Repainting Due Date</th>
              {/* <th className="py-2 px-4 text-left">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredMachines.map((machine, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4">
                  <Link
                    to={
                      currentUser?.role === "admin"
                        ? `/admin/machine/${machine.id}`
                        : `/supervisor/machine/${machine.id}`
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {machine.name}
                  </Link>
                </td>
                <td className="py-2 px-4">{machine.testSite}</td>
                <td
                  className={`py-2 px-4 text-sm font-normal rounded ${(() => {
                    const date = new Date(machine.nextGrindingDueDate);
                    if (isNaN(date)) return "";
                    const today = new Date();
                    const diff = Math.ceil(
                      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    if (diff < 0) return "bg-red-500 text-white"; // Overdue
                    if (diff <= 15) return "bg-orange-300"; // 0–15 days
                    if (diff <= 60) return "bg-yellow-300"; // 16–60 days
                    return "bg-green-300"; // > 60 days
                  })()}`}
                >
                  {machine.nextGrindingDueDate
                    ? `${
                        new Date(machine.nextGrindingDueDate)
                          .toISOString()
                          .split("T")[0]
                      }  (${Math.ceil(
                        (new Date(machine.nextGrindingDueDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days till due date)`
                    : "N/A"}
                </td>
                <td
                  className={`py-2 px-4 text-sm font-normal rounded ${(() => {
                    const date = new Date(machine.nextRepaintingDueDate);
                    if (isNaN(date)) return "";
                    const today = new Date();
                    const diff = Math.ceil(
                      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    if (diff < 0) return "bg-red-500 text-white"; // Overdue
                    if (diff <= 15) return "bg-orange-300"; // 0–15 days
                    if (diff <= 60) return "bg-yellow-300"; // 16–60 days
                    return "bg-green-300"; // > 60 days
                  })()}`}
                >
                  {machine.nextRepaintingDueDate
                    ? `${
                        new Date(machine.nextRepaintingDueDate)
                          .toISOString()
                          .split("T")[0]
                      }  (${Math.ceil(
                        (new Date(machine.nextRepaintingDueDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days till due date)`
                    : "N/A"}
                </td>

                {/* <td className="py-2 px-4">{machine.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachinesOverview;
