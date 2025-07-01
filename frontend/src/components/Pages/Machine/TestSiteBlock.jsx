import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";

const TestSiteBlock = ({ machineId, testSiteNumber, machineData }) => {
  const navigate = useNavigate();
  const [testSitePoints, setTestSitePoints] = React.useState([]);
  const [siteStatus, setSiteStatus] = React.useState("active");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (machineData) {
      const site = machineData.testSites.find(
        (site) => site.testSiteNumber === testSiteNumber
      );
      if (site) {
        setTestSitePoints(site.points || []);
        setSiteStatus(site.status || "active");
      }
    }
  }, []);

  const handleSeeMore = () => {
    // Redirect to the test site details page
    if (currentUser.role === "admin") {
      navigate(`/admin/machine/${machineId}/${testSiteNumber}`, {
        state: { machine: machineData, testSitePoints },
      });
    } else {
      navigate(`/supervisor/machine/${machineId}/${testSiteNumber}`, {
        state: { machine: machineData, testSitePoints },
      });
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-10 items-start self-center px-7 pt-2.5 pb-5 mt-11 w-full rounded-3xl max-w-[1104px] max-md:px-5 max-md:mt-10 max-md:max-w-full
    ${
      siteStatus === "inactive"
        ? "bg-gray-400 opacity-70"
        : "bg-[#FF9822B2] bg-opacity-70"
    }`}
    >
      <div className="flex-auto self-start max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full text-lg font-medium text-white max-md:mt-10">
              <div className="z-10 gap-2.5 self-stretch text-3xl font-bold">
                Test Site {testSiteNumber}
              </div>
              <div className="mt-1 text-base font-semibold text-white">
                Status:{" "}
                <span
                  className={
                    siteStatus === "active" ? "text-green-200" : "text-red-200"
                  }
                >
                  {siteStatus.charAt(0).toUpperCase() + siteStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          {testSitePoints.map((point, index) => (
            <div
              key={index}
              className={`px-12 w-full rounded-xl max-md:px-5 ${
                siteStatus === "inactive" ? "bg-gray-300" : "bg-amber-500"
              }`}
            >
              <div className="z-10 gap-2.5 self-stretch p-2.5">
                {point.pointName}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="self-end px-7 py-2 mt-28 text-lg font-semibold text-black whitespace-nowrap bg-white rounded-3xl max-md:px-5 max-md:mt-10"
        onClick={handleSeeMore}
        style={{ cursor: "pointer" }}
      >
        SEE
      </div>
    </div>
  );
};

export default TestSiteBlock;
