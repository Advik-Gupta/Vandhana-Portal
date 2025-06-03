import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ text, className, href ,onClick}) {
  const navigate = useNavigate();

  const handleClick = () =>{
    if(href){
      navigate(href)
    }

    if(onClick){
      onClick();
    }

  }


  return (
    <button
      className={`bg-black text-white p-2 mt-4 rounded ${className}`}
      onClick={handleClick}
      type="button"
      
    >
      {text} 
    </button>
  );
}

export default Button;