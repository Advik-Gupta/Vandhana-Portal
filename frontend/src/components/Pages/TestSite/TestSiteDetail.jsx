import React from "react";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import DueDate from "./DueDate";
import ImageDetail from "./ImageDetail";

function TestSiteDetail() {
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
            <DueDate />
            <DueDate />
            <DueDate />
            <DueDate />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
          <div className="w-full md:w-1/2">
            <ImageDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestSiteDetail;
