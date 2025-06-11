import * as React from "react";
import { useNavigate } from "react-router-dom";

function DataCard({
  backgroundColor,
  title,
  subtitle,
  uploadedBy,
  date,
  className = "",
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 px-8 py-5 w-full ${backgroundColor} rounded-3xl shadow-lg max-md:px-5 ${className} cursor-pointer transition-all duration-300 hover:scale-105`}
    >
      {/* Left section */}
      <div className="flex flex-col text-black">
        <h3 className="text-2xl leading-snug">
          Update For: <span className="font-bold">{title}</span>
        </h3>
        <p className="text-md text-gray-800 mt-2">{subtitle}</p>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end text-white text-right sm:items-end sm:text-right max-sm:items-start max-sm:text-left">
        <p className="text-base font-semibold">{date}</p>
        <p className="text-sm font-medium mt-2 opacity-90">
          Data uploaded by {uploadedBy}
        </p>
      </div>
    </div>
  );
}

export default DataCard;
