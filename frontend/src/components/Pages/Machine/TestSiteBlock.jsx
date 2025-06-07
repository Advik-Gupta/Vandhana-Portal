import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestSiteBlock = ({ machineId, testSiteNumber, machineData }) => {
  const navigate = useNavigate();
  const [testSitePoints, setTestSitePoints] = React.useState([]);

  useEffect(() => {
    if (machineData) {
      const site = machineData.testSites.find(
        (site) => site.testSiteNumber === testSiteNumber
      );
      if (site) {
        setTestSitePoints(site.points || []);
      }
    }
  }, []);

  const handleSeeMore = () => {
    navigate(`/admin/machine/${machineId}/${testSiteNumber}`, {
      state: { machine: machineData, testSitePoints: testSitePoints },
    });
  };

  // <div className="px-12 w-full bg-amber-500 rounded-xl max-md:px-5">
  //               <div className="z-10 gap-2.5 self-stretch p-2.5">T1.5</div>
  //             </div>

  return (
    <div className="flex flex-wrap gap-10 items-start self-center px-7 pt-2.5 pb-5 mt-11 w-full rounded-3xl bg-[#FF9822B2] bg-opacity-70 max-w-[1104px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex-auto self-start max-md:max-w-full" space={67}>
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full text-lg font-medium text-white max-md:mt-10">
              <div className="z-10 gap-2.5 self-stretch p-1 text-3xl font-bold">
                Test Site {testSiteNumber}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {testSitePoints.map((point, index) => (
            <div
              key={index}
              className="px-12 w-full bg-amber-500 rounded-xl max-md:px-5"
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
