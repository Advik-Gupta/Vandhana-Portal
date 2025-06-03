import * as React from "react";
import StatusHeader from "./StatusHeader";
import IssuesList from "./IssuesList";
import ActionButton from "./ActionButton";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import PhotoDetail from "./PhotoDetail";
function DataUploadedDetail() {
  const onApproveButton =()=>{

  }
  const onRequestReupload =()=>{
    
  }
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-2 text-6xl font-bold text-black md:text-6xl">
          Machine Name - Test Site No - Point Name
        </div>
        <div className="mb-4 text-lg text-black md:text-2xl">
          Data for Grind Cycle 1 | Uploaded by : Person A
        </div>
        <Button
          text="Return to Site"
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
                  className="mt-2 w-full px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your feedback..."
                />
              </section>
            </div>
            <IssuesList />
            <ActionButton onApprove = {onApproveButton} onReupload = {onRequestReupload} />
          </section>
        </div>
        <PhotoDetail />
      </div>
    </div>
  );
}

export default DataUploadedDetail;
