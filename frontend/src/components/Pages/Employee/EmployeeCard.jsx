import React from "react";
import Button from "./Button";
import profileIcon from "../../../assets/profileIcon.svg";
import DetailRow from "./DetailRow";

const EmployeeCard = ({
  name = "Employee 4",
  _id = "111111",
  role = "Technician",
  phoneNumber = "1234567890",
}) => {
  const onAccessChange = (type) => {};
  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <div className="shrink-0 h-auto w-[400px] sm:w-[360px] xs:w-[320px] bg-[#D9D9D9] rounded-3xl p-6 sm:p-5 xs:p-4 flex flex-col justify-between gap-4">
      <header className="flex gap-7 sm:gap-5 xs:flex-col xs:gap-3">
        <img
          src={profileIcon}
          alt="profileIcon"
          className="w-14 sm:w-12 xs:w-10"
        />
        <div className="flex flex-col gap-2 xs:gap-1">
          <h1 className="text-2xl font-bold text-black sm:text-xl xs:text-lg">
            {name}
          </h1>
          <p className="text-xl text-black sm:text-lg xs:text-base break-words">
            {_id}
          </p>
        </div>
      </header>
      <section className="flex flex-col gap-2 xs:gap-4">
        <DetailRow label="Role" value={role} />
        <DetailRow label="Contact" value={phoneNumber} />
      </section>

      <div className="flex flex-col gap-2 xs:gap-4">
        <Button
          text="Give Admin Access"
          onClick={() => onAccessChange("admin")}
        />
        <Button
          text="Give Supervisor Access"
          onClick={() => onAccessChange("supervisor")}
        />
        <Button text="Edit" onClick={onEdit} />
        <Button text="Delete" onClick={onDelete} />
      </div>
    </div>
  );
};

export default EmployeeCard;
