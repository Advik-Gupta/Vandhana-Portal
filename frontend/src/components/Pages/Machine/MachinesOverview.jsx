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
  const [searchMachine,setSearchMachine] = useState("");
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleSearchMachineChange = (e)=>{
    setSearchMachine(e.target.value)
    console.log(allMachines)
  }
  // const filteredMachines = allMachines.filter((machine) => {
  //   return (
  //     (!filters.division || machine.division === filters.division) &&
  //     (!filters.testSite || machine.testSite === filters.testSite) &&
  //     (!filters.status || machine.status === filters.status)
  //   );
  // });

  const filteredMachines = allMachines.filter((machine) => {
  const matchesFilters =
    (!filters.division || machine.division === filters.division) &&
    (!filters.testSite || machine.testSite === filters.testSite) &&
    (!filters.status || machine.status === filters.status);

  const search = searchMachine.trim().toLowerCase();
  const matchesSearch =
    !search || (
      machine.name?.toLowerCase().includes(search) ||
      machine.id?.toString().toLowerCase().includes(search)
    );

  return matchesFilters && matchesSearch;
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
            {filteredMachines.map((machine,index) => (
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
                <td className="py-2 px-4">{machine.section}</td>
                <td className="py-2 px-4">{machine.station}</td>
                <td className="py-2 px-4">
                  {machine.kmFrom} - {machine.kmTo}
                </td>
                <td className="py-2 px-4">{machine.division}</td>
                <td className="py-2 px-4">{machine.dueDate}</td>
                <td className="py-2 px-4">{machine.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachinesOverview;
