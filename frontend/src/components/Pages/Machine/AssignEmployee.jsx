import React, { useState, useEffect } from "react";
import SearchBar from "../../ui/SearchBar";
import EmployeeList from "./EmployeeList";
import Button from "../../ui/Button";
import { fetchEmployees } from "../../api/machine";

function AssignEmployee({ onSelectEngineer }) {
  const [assignedEmployee, setAssignedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
      console.log("Fetched employees:", data);
    };
    getEmployees();
  }, []);

  const handleAssign = (id) => {
    setAssignedEmployee(id);
  };

  return (
    <div className="w-[600px] max-h-[700px] bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
        {employees.map((emp) => (
          <EmployeeList
            key={emp._id}
            name={emp.name}
            id={emp._id}
            email={emp.email}
            phoneNumber={emp.phoneNumber}
            isAssigned={assignedEmployee === emp._id}
            onAssign={handleAssign}
          />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <div onClick={() => onSelectEngineer(assignedEmployee)}>
          <Button text="Done" className="text-xl w-[100px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export default AssignEmployee;
