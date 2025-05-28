import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import DropdownButton from "./ui/DropDownBtn";
import axios from "axios";

const MachinesOverview = () => {
  const [filters, setFilters] = useState({
    division: null,
    testSite: null,
    status: null,
  });

  const [allMachines, setAllMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      axios
        .get("http://localhost:8080/api/v1/machines") // your backend endpoint
        .then((response) => {
          const finalMachineData = [];

          response.data.forEach((machine) => {
            machine.testSites.forEach((testSite) => {
              finalMachineData.push({
                id: machine._id,
                name: machine.name,
                testSite: testSite.testSiteNumber,
                section: testSite.section,
                station: testSite.station,
                kmFrom: testSite.kmFrom,
                kmTo: testSite.kmTo,
                division: testSite.division,
                dueDate: machine.nextGrindingDueDate || "N/A",
              });
            });
          });

          setAllMachines(finalMachineData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchMachines();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredMachines = allMachines.filter((machine) => {
    return (
      (!filters.division || machine.division === filters.division) &&
      (!filters.testSite || machine.testSite === filters.testSite) &&
      (!filters.status || machine.status === filters.status)
    );
  });

  return (
    <div className="bg-gray-200 p-9 h-[100vh]">
      <h1 className="text-6xl font-bold text-center mb-4">Machines Overview</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by machine name or ID..."
          className="bg-gray-300 rounded p-2 w-100"
        />
        <Button text="+ Add Machine" className="text-xl" />
      </div>

      <div className="mb-4 flex justify-end">
        <DropdownButton
          text="Division"
          type="division"
          onSelect={handleFilterChange}
        />
        <DropdownButton text="Site" type="site" onSelect={handleFilterChange} />
        <DropdownButton
          text="Status"
          type="status"
          onSelect={handleFilterChange}
        />
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4 text-left">Machine Name</th>
              <th className="py-2 px-4 text-left">Test Site No.</th>
              <th className="py-2 px-4 text-left">Section</th>
              <th className="py-2 px-4 text-left">Station</th>
              <th className="py-2 px-4 text-left">KM From - KM To</th>
              <th className="py-2 px-4 text-left">Division</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMachines.map((machine) => (
              <tr key={machine.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{machine.name}</td>
                <td className="py-2 px-4">{machine.testSite}</td>
                <td className="py-2 px-4">{machine.section}</td>
                <td className="py-2 px-4">{machine.station}</td>
                <td className="py-2 px-4">
                  {machine.kmFrom} - {machine.kmTo}
                </td>
                <td className="py-2 px-4">{machine.division}</td>
                <td className="py-2 px-4">{machine.dueDate}</td>
                <td className="py-2 px-4">
                  <span
                  // className={
                  //   machine.status === "Done"
                  //     ? "text-green-500"
                  //     : "text-red-500"
                  // }
                  >
                    {/* {machine.status} */} Status
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachinesOverview;
