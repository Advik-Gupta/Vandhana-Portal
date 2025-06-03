import * as React from "react";
import { useParams } from "react-router-dom";

import StatusHeader from "./StatusHeader";
import IssuesList from "./IssuesList";
import ActionButton from "./ActionButton";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import PhotoDetail from "./PhotoDetail";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DataUploadedDetail() {
  const [feedback, setFeedback] = useState("");
  const { machineID } = useParams();
  const location = useLocation();
  const { machine, cycleName, testSiteNumber, pointNo, cycleData } =
    location.state || {};

  useEffect(() => {
    console.log(cycleData);
  }, []);

  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const onApproveButton = () => {};
  const onRequestReupload = () => {};
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-2 text-6xl font-bold text-black md:text-6xl">
          {machine?.name} - {testSiteNumber} - {pointNo}
        </div>
        <div className="mb-4 text-lg text-black md:text-2xl">
          Data for {cycleName} | Uploaded by : User(
          {cycleData["post"]["uploadBy"]})
        </div>
        <Button
          text="Return to Site"
          href={`/admin/machine/${machineID}/${testSiteNumber}`}
          className="mb-6 w-full rounded-xl text-lg md:w-[200px] md:text-xl"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <DataTable />
          </div>
          <section className="flex flex-col items-start self-end px-10 pt-8 pb-16 max-w-full text-lg font-semibold bg-black rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[403px] max-md:px-5">
            <StatusHeader />
            <div>
              <section className="w-full">
                <h2 className="mt-10 text-white">Remarks / Feedback :</h2>
                <input
                  type="text"
                  value={feedback}
                  onChange={handleFeedback}
                  className="mt-2 w-full px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your feedback..."
                />
              </section>
            </div>
            <IssuesList />
            <ActionButton
              onApprove={onApproveButton}
              onReupload={onRequestReupload}
            />
          </section>
        </div>
        <PhotoDetail cycleData={cycleData} />
      </div>
    </div>
  );
}

export default DataUploadedDetail;
