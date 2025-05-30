import React from "react";

function Button({ text, className, handleClick }) {
  return (
    <button
      className={`bg-black text-white p-2 mt-4 rounded ${className}`}
      onClick={handleClick} 
    >
      {text}
    </button>
  );
}

export default Button;
