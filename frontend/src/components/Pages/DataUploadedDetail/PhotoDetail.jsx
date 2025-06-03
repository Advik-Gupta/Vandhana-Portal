import React from "react";
import PhotoPoint from "./PhotoPoint";

const PhotoDetail = () => {
  const pointNumbers = [1, 2]; 

 
  const rows = [];
  for (let i = 0; i < pointNumbers.length; i += 2) {
    rows.push(pointNumbers.slice(i, i + 2));
  }

  return (
    <main className="mt-10 mb-20 max-md:px-5 max-md:pt-15">
      <section className="flex flex-col items-start pt-6 pb-14 pl-8 w-full rounded-3xl bg-amber-500 max-md:px-5 max-md:max-w-full">
        <header className="flex max-w-full w-[354px]">
          <h1 className="gap-2.5 self-stretch px-2.5 py-1 text-4xl font-bold text-white whitespace-nowrap min-h-[49px]">
            Photos
          </h1>
          <p className="gap-2.5 self-start p-2.5 text-xl text-black font-[275]">
            (Click to enlarge)
          </p>
        </header>

        <div className="mt-7 ml-3.5 max-w-full w-[717px] flex flex-col gap-5">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-5 max-md:flex-col">
              {row.map((pointNumber) => (
                <div key={pointNumber} className="w-6/12 max-md:w-full">
                  <PhotoPoint pointNumber={pointNumber} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PhotoDetail;
