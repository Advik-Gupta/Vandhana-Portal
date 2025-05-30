import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ text, className, handleClick, href }) {
  const navigate = useNavigate();

  const onClick = (e) => {
    if (handleClick) {
      handleClick(e);
    }
    if (href) {
      navigate(href);
    }
  };

  return (
    <button
      className={`bg-black text-white p-2 mt-4 rounded ${className}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}

export default Button;