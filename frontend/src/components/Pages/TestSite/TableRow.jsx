import React from 'react';
import { useState, useEffect } from "react";

function TableRow({ field, value, isEven, isLast, onChange }) {
  const bgColor = isEven ? "bg-gray-200" : "bg-white";
  const borderClass = isLast ? "" : "border-b border-gray-200";
  const [rowVal, setRowVal] = useState(value);

  useEffect(() => {
    setRowVal(value); 
  }, [value]);

  const handleRowVal = (e) => {
    const newValue = e.target.value;
    setRowVal(newValue);
    onChange(newValue); 
  };

  return (
    <div
      className={`flex justify-between items-center px-10 p-1 w-full ${bgColor} ${borderClass} max-sm:px-5`}
    >
      <span className="text-lg text-black max-md:text-lg max-sm:text-base">
        {field}
      </span>
      <span className="text-lg text-black max-md:text-lg max-sm:text-base">
        <input
          type="text"
          value={rowVal}
          onChange={handleRowVal}
        />
      </span>
    </div>
  );
}

export default TableRow;
