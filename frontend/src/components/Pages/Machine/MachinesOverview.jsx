import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import DropdownButton from "../../ui/DropDownBtn";
import { fetchMachines } from "../../api/machine";

const MachinesOverview = () => {
  const [filters, setFilters] = useState({
    division: null,
    testSite: null,
    status: null,
  });
  const [searchMachine, setSearchMachine] = useState("");
  const [allMachines, setAllMachines] = useState([]);

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
        <Button
          text="+ Add Machine"
          className="text-xl"
          href="/admin/add-machine"
        />
      </div>

      <div className="overflow-x-auto rounded-lg">
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
                    to={`/admin/machine/${machine.id}`}
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
