import * as React from "react";

function DataCard({
  backgroundColor,
  title,
  subtitle,
  uploadedBy,
  date,
  className = "",
}) {
  return (
    <div
      className={`flex flex-wrap justify-between px-11 py-3 w-full ${backgroundColor} rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 ${className}`}
    >
      <div className="flex flex-col grow text-black w-fit max-md:w-full max-md:mb-4">
        <div className="flex flex-col justify-center p-1 text-xl font-medium w-[150px] max-md:w-full">
          <h3 className="py-2.5">{title}</h3>
        </div>
        <p className="py-2.5 text-base font-light">{subtitle}</p>
      </div>

      <div className="flex flex-col items-end text-white whitespace-nowrap max-md:items-start max-md:text-left">
        <p className="text-xl font-bold">{date}</p>
        <p className="text-xl mt-16 max-md:mt-4">{uploadedBy}</p>
      </div>
    </div>
  );
}

export default DataCard;
