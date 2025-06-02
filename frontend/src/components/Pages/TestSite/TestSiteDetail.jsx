import React,{useState,useEffect}from "react";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import DueDate from "./DueDate";
import ImageDetail from "./ImageDetail";

function TestSiteDetail() {
   const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      const backendData = [
        { id: 1, pointNo: 1 },
        { id: 2, pointNo: 2 },
        { id: 3, pointNo: 3 },
        { id: 4, pointNo: 4 },
        { id: 5, pointNo: 5 },
        { id: 6, pointNo: 6 },
      ];
      setPoints(backendData);
    };

    fetchPoints();
  }, []);
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-2 text-4xl font-bold text-black md:text-6xl">
          Machine Name - Test Site No
        </div>
        <div className="mb-4 text-lg text-black md:text-2xl">
          Uploaded by : Person A
        </div>
        <Button
          text="Return to Machine"
          className="mb-6 w-full rounded-xl text-lg md:w-[200px] md:text-xl"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <DataTable />
          </div>
          <div className="w-full md:w-1/3">
            <DueDate label="Last Grinding Due Date" showCheckbox date="12/11/2025"/>
            <DueDate label="New Grinding Due Date" date="12/11/2025" />
            <DueDate label="Last Repairing Due Date" showCheckbox date="12/11/2025" />
            <DueDate label="New Repairing Due Date" date="12/11/2025" />
          </div>
        </div>
      </div>
      {Array.from({ length: Math.ceil(points.length / 2) }, (_, i) => (
        <div key={i} className="mx-auto max-w-7xl px-4 mt-8">
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            {points.slice(i * 2, i * 2 + 2).map((point) => (
              <div key={point.id} className="w-full md:w-1/2">
                <ImageDetail pointNo={point.pointNo} id={point.id}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestSiteDetail;
