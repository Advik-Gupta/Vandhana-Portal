import React from "react";
import TestSiteBlock from "./TestSiteBlock";
import arrow from "../../../assets/arrow.svg";
import dropdown from "../../../assets/dd2.png";

function MachineDetail() {
  return (
    <div className="flex overflow-hidden flex-col px-11 pt-7 pb-16 bg-gray-200 max-md:px-5">
      <div className="gap-2.5 self-start p-2.5 text-6xl font-bold text-black max-md:text-4xl">
        Machine Name
      </div>
      <div className="z-10 gap-2.5 self-start p-2.5 -mt-3 text-2xl text-black">
        Created by : Person A
      </div>
      <div className="flex flex-wrap gap-5 justify-between self-end px-16 py-3.5 mr-3 mt-11 max-w-full text-3xl font-medium text-white bg-black rounded-3xl w-[1350px] max-md:px-5 max-md:mt-10">
        <div className="gap-2.5 self-stretch p-2.5 max-md:max-w-full">
          Assigned Engineer - Person B
        </div>
        <img
          src={dropdown}
          className="object-contain shrink-0 my-auto rounded-xl aspect-[1.22] w-[50px]"
        />
      </div>

      {/* Reusable Blocks */}
      <TestSiteBlock title="Test Site 1" />
      <TestSiteBlock title="Test Site 2" />
      <TestSiteBlock title="Test Site 3" />
      <TestSiteBlock title="Test Site 4" />

      <img
        src={arrow}
        className="object-contain self-end mt-80 mr-36 aspect-square w-[84px] max-md:mt-10 max-md:mr-2.5"
        alt="Arrow Icon"
      />
    </div>
  );
}

export default MachineDetail;
