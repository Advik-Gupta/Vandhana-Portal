import React, { useEffect, useState } from "react";
import { machines as op } from "../../../data/data";

const DropdownButton = ({ text, type, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(type, option); 
    setIsOpen(false);
  };

  useEffect(() => {
    if (type) {
      const uniqueValues = [...new Set(op.map((item) => item[type]))];
      setOptions(uniqueValues);
    }
  }, [type]);

  return (
    <div className="dropdown bg-black text-white mx-2 rounded relative w-32">
      <button
        className="bg-black text-white p-3 z-10 rounded w-full"
        onClick={toggleDropdown}
      >
        {text}
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-white text-black rounded shadow-lg w-full z-20">
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
