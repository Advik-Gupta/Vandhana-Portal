import React, { useState } from "react";
import SearchBar from "../../ui/SearchBar";
import EmployeeList from "./EmployeeList";
import Button from "../../ui/Button";

function AssignEmployee({ onSelectEngineer }) {
  const [assignedEmployee, setAssignedEmployee] = useState(null);

  const handleAssign = (id) => {
    setAssignedEmployee(id);
  };

  const employees = [
    { name: "Employee1", id: "111111" },
    { name: "Employee2", id: "222222" },
    { name: "Employee3", id: "333333" },
    { name: "Employee4", id: "444444" },
    { name: "Employee5", id: "555555" },
    { name: "Employee6", id: "666666" },
    { name: "Employee7", id: "777777" },
    { name: "Employee8", id: "888888" },
    { name: "Employee9", id: "999999" },
    { name: "Employee10", id: "101010" },
  ];

  return (
    <div className="w-[600px] max-h-[700px] bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
        {employees.map((emp) => (
          <EmployeeList
            key={emp.id + Math.random()}
            name={emp.name}
            id={emp.id}
            isAssigned={assignedEmployee === emp.id}
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
