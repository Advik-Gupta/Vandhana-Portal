import React from "react";

const PhotoPoint = ({ pointNumber, className = "" }) => {
  return (
    <div
      className={`flex flex-col grow justify-center px-px py-0.5 text-lg font-medium text-white whitespace-nowrap rounded-3xl border-black border-dashed border-[3px] ${className}`}
    >
      <div className="flex flex-col pr-14 pb-3 pl-2 w-full bg-amber-500 rounded-xl max-md:pr-5">
        <div className="flex z-10 gap-2.5 justify-center items-center self-start px-2.5 py-7 mt-0 min-h-[78px]">
          <p className="self-stretch my-auto">Point{pointNumber}</p>
        </div>
        <img
          src=""
          className="object-contain z-10 self-end mt-0 max-w-full aspect-square w-[233px]"
          alt={`Point ${pointNumber} image`}
        />
      </div>
    </div>
  );
};

export default PhotoPoint;
