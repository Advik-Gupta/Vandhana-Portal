"use client";
import * as React from "react";
import checkedBox from "../../../assets/checkedbox.svg"

function DueDate() {
  return (
    <div className="rounded-none max-w-[466px] mt-3">
      <div className="flex flex-col pt-1 pr-14 pb-2 pl-4 w-full bg-black rounded-3xl">
        <label className="gap-2.5 self-start px-1 py-2.5 text-lg font-small text-white">
          Last Grinding Due Date
        </label>
        <div className="flex gap-5 justify-between ">
          <input
            type="date"
            className="flex shrink-0 self-start  max-w-full bg-white rounded-xl h-[35px] w-[291px] px-3 border-0 outline-none"
          />
          <img
            src={checkedBox}
            className="object-contain shrink-0 w-12 aspect-square"
            alt="checkedbox"
          />
        </div>
      </div>
    </div>
  );
}

export default DueDate;
