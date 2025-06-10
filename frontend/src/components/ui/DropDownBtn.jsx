import React, { useEffect, useState } from "react";
import { machines as op } from "../../../data/data";
import { fetchEmployees } from "../api/machine";

const DropdownButton = ({ text, type, onSelect, source = "machines" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(type, option === type ? null : option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (source === "machines" && type) {
      const uniqueValues = [...new Set(op.map((item) => item[type]))];
      setOptions([type,...uniqueValues]);
    }

    if (source === "employees" && type) {
      const getEmployeeData = async () => {
        const data = await fetchEmployees();
        setEmployeesData(data);
        const uniqueValues = [...new Set(data.map((item) => item[type]))];
        setOptions(uniqueValues);
      };
      getEmployeeData();
    }
  }, [type, source]);

  return (
    <div className="dropdown bg-black text-white mx-2 rounded relative w-32">
      <button
        className="bg-black text-white p-3 z-10 rounded w-full"
        onClick={toggleDropdown}
      >
        {text}
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-white text-black rounded shadow-lg w-full z-20 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="text-center hover:bg-gray-200 cursor-pointer p-2"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
