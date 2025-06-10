import React from "react";
import arrow from "../../../assets/blackArrow.svg";

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex gap-2.5 items-center max-sm:gap-2">
      <img src={arrow} alt="arrow" />
      <span className="ml-2.5 text-base font-bold text-black max-md:text-sm max-sm:ml-2 max-sm:text-sm">
        {label} :
      </span>
      <span className="ml-2 text-base font-bold text-zinc-600 max-md:text-sm max-sm:ml-1.5 max-sm:text-sm">
        {value}
      </span>
    </div>
  );
};
export default DetailRow;
