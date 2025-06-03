import React from "react";

const PhotoPoint = ({ pointNumber, photoUrl, className = "" }) => {
  return (
    <div
      className={`flex flex-col grow justify-center px-px py-0.5 text-lg font-medium text-white whitespace-nowrap rounded-3xl border-black border-dashed border-[3px] ${className}`}
    >
      <div className="flex flex-col p-5 w-full bg-amber-500 rounded-xl max-md:pr-5">
        <img
          src={photoUrl}
          className="object-contain z-10 self-end mt-0 max-w-full aspect-square w-[233px]"
          alt={`Point ${pointNumber} image`}
        />
      </div>
    </div>
  );
};

export default PhotoPoint;
