import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-xs font-bold text-white bg-black rounded-3xl 
                 hover:bg-gray-800 transition-colors duration-200
                 min-w-[95px] h-[30px] 
                 sm:min-w-[85px] sm:h-7 sm:text-xs
                 xs:min-w-[75px] xs:h-[25px] xs:text-[10px]
                 flex items-center justify-center"
    >
      {text}
    </button>
  );
};

export default Button;
