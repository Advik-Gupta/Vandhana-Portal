import * as React from "react";

function TableHeader() {
  return (
    <header className="flex justify-between items-center px-10 w-full bg-black rounded-3xl h-[71px] max-sm:px-5">
      <h2 className="text-2xl font-bold text-white max-md:text-2xl max-sm:text-lg">
        Field
      </h2>
      <h2 className="text-2xl font-bold text-white max-md:text-2xl max-sm:text-lg">
        Value
      </h2>
    </header>
  );
}

export default TableHeader;
