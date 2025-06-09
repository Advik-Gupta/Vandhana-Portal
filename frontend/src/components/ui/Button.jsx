import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ text, className, href, dataToPass }) {
  const navigate = useNavigate();
  return (
    <button
      className={`bg-black text-white p-2 mt-4 rounded ${className}`}
      onClick={() => {
        console.log(`Navigating to: ${href}`);
        if (dataToPass) {
          console.log(`Data to pass: ${JSON.stringify(dataToPass)}`);
          navigate(href, { state: { ...dataToPass } });
        } else {
          navigate(href);
        }
      }}
      type="button"
    >
      {text}
    </button>
  );
}

export default Button;
