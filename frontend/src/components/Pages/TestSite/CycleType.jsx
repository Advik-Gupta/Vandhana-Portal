import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";

const CycleType = ({
  text,
  id,
  machineId,
  testSiteNumber,
  pointNo,
  machineData,
  cycleData,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const handleCycleClick = () => {
    if (currentUser.role === "admin") {
      navigate(`/admin/upload-data/${machineId}/${testSiteNumber}/${pointNo}`, {
        state: {
          machine: machineData,
          cycleName: text,
          testSiteNumber,
          pointNo,
          cycleData,
        },
      });
    } else {
      navigate(
        `/supervisor/upload-data/${machineId}/${testSiteNumber}/${pointNo}`,
        {
          state: {
            machine: machineData,
            cycleName: text,
            testSiteNumber,
            pointNo,
            cycleData,
          },
        }
      );
    }
  };

  return (
    <div
      className="flex-1 px-16 bg-amber-500 rounded-xl max-md:px-5"
      onClick={handleCycleClick}
    >
      <h3 className=" gap-2.5 self-stretch py-2  pl-1  min-h-10 text-md font-medium text-white">
        {text}
      </h3>
    </div>
  );
};

export default CycleType;
