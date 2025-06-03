import React from "react";
import dropUp from "../../../assets/du.svg";

function StatusHeader() {
  return (
    <header className="flex gap-5 justify-between items-start px-2.5 max-w-full text-black bg-white rounded-xl w-[157px]">
      <p className="gap-2.5 self-start p-2.5">Status</p>
      <img className="mt-4" src={dropUp} alt="Status indicator" />
    </header>
  );
}
export default StatusHeader;
