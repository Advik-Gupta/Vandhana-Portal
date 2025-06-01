import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ text, className, href }) {
  const navigate = useNavigate();


  return (
    <button
      className={`bg-black text-white p-2 mt-4 rounded ${className}`}
      onClick={()=>{navigate(href)}}
      type="button"
      
    >
      {text} 
    </button>
  );
}

export default Button;