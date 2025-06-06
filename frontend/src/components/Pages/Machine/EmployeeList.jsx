import React from "react";
import Button from "../../ui/Button";

function EmployeeList({ name, id, email, phoneNumber, isAssigned, onAssign }) {
  return (
    <div className="flex flex-wrap gap-5 justify-between items-center mt-2 w-full text-base whitespace-nowrap max-md:mr-2 max-md:max-w-full">
      <p className="self-stretch my-auto">{name}</p>
      <p className="gap-2.5 self-stretch my-auto">{email}</p>
      <div onClick={() => onAssign(id)}>
        <Button
          text={isAssigned ? "Assigned" : "Assign"}
          className={`text-xl w-[100px] rounded-3xl self-stretch my-auto ${
            isAssigned ? "bg-green-500" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default EmployeeList;
