import React, { useState, useEffect } from "react";
import DropdownButton from "../../ui/DropDownBtn";
import { fetchEmployees } from "../../api/machine";
import EmployeeCard from "./EmployeeCard";

const EmployeeListDashBoard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [filters, setFilters] = useState({
    role: null,
    site: null,
    status: null,
  });
  const [searchEmp, setSearchEmp] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      const searchLower = searchEmp.toLowerCase();

      const filtered = data.filter(
        (u) =>
          u.name.toLowerCase().includes(searchLower) ||
          u._id.toString().toLowerCase().includes(searchLower)
      );

      setEmployees(filtered);
      console.log("Fetched employees:", data);
    };

    getEmployees();
  }, [searchEmp]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleSearchEmp = (e) => {
    setSearchEmp(e.target.value);
  };
  const filteredEmployees = employees.filter((employee) => {
    return (
      (!filters.role || employee.role === filters.role) &&
      (!filters.site || employee.site === filters.site) &&
      (!filters.status || employee.status === filters.status)
    );
  });

  return (
    <div className="bg-gray-200 p-6 md:p-9 min-h-screen">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
        Employee Directory
      </h1>
      <p className="text-lg md:text-xl font-medium mb-3 md:mb-4">
        View and manage all registered employees
      </p>

      <div className="mb-3 md:mb-4 flex flex-col sm:flex-row justify-between gap-2">
        <input
          type="text"
          value={searchEmp}
          onChange={handleSearchEmp}
          placeholder="Search by employee name or ID..."
          className="bg-gray-300 rounded p-2 w-full sm:w-1/2"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${selectedEmployee ? "w-full lg:w-2/3" : "w-full"}`}>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white text-sm sm:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-100 overflow-y-auto"
                  >
                    <td className="py-2 px-4">{employee.name}</td>
                    <td className="py-2 px-4">{employee._id}</td>
                    <td className="py-2 px-4">{employee.role}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          console.log(employee);
                          setSelectedEmployee(employee);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        View/Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedEmployee && (
          <div className="w-full lg:w-1/3">
            <EmployeeCard {...selectedEmployee} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeListDashBoard;
