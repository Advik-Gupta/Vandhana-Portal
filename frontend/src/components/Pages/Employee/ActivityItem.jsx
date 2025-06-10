import React from "react";
import bulletPoint from "../../../assets/bulletPoint.svg";
const ActivityItem = ({ text }) => {
  return (
    <div className="flex gap-1 items-center max-sm:gap-2">
      <img src={bulletPoint} alt="bulletPoint" />
      <p className="text-base font-medium text-white max-md:text-sm max-sm:text-xs">
        {text}
      </p>
    </div>
  );
};
export default ActivityItem;
