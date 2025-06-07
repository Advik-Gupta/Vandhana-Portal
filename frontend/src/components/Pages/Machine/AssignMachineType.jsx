import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import MachineTypesList from "./MachineTypesList";

function AssignMachineType({ onSelectMachineType }) {
  const [assignedType, setAssignedType] = useState(null);

  const machineTypes = ["RGI96", "SRGM", "LRG", "FM", "CMRL (VRA)"];

  const handleAssign = (id) => {
    setAssignedType(id);
  };

  return (
    <div className="w-[600px] max-h-[700px] bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
        {machineTypes.map((type) => (
          <MachineTypesList
            key={type}
            name={type}
            isAssigned={assignedType === type}
            onAssign={handleAssign}
          />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <div onClick={() => onSelectMachineType(assignedType)}>
          <Button text="Done" className="text-xl w-[100px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export default AssignMachineType;
