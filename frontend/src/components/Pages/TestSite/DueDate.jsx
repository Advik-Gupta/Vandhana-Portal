import * as React from "react";
// import checkBox from '../../../assets/checkedbox.svg'
function DueDate({ label, showCheckbox, date }) {
  return (
    <div className="rounded-none max-w-[466px]  mt-3">
      <div className="flex flex-col pt-1 pr-14 pb-2 pl-4 w-full h-[110px] bg-black rounded-3xl">
        <label className="gap-2.5 self-start px-1 py-2.5 text-lg font-small text-white">
          {label}
        </label>
        <div className="flex gap-3 justify-between ">
          <span className="flex shrink-0 self-start text-2xl  max-w-full bg-white rounded-xl h-[35px] w-[291px] px-3 border-0 outline-none">
            {date}
          </span>
          {/* {showCheckbox && (
            <img
              src={checkBox}
              className="object-contain shrink-0 w-12 aspect-square"
              alt=""
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default DueDate;
