import React from 'react';
import CycleGrid from './CycleGrid';

const ImageDetail = ({pointNo,id}) => {
  return (
    <main className=" mt-8 rounded-none max-w-[642px]">
      <section className="px-8 pt-6 pb-9 w-full rounded-3xl bg-[#FF9822B2] bg-opacity-70 max-md:px-5 max-md:max-w-full">
        <header className="flex gap-3 max-w-full w-[298px]">
      <h1 className="gap-2.5 self-stretch py-1 pr-px pl-0.5 text-4xl font-bold text-white min-h-[49px]">
        Point {pointNo}
      </h1>
      <p className="gap-2.5 self-stretch p-2.5 my-auto text-xl text-black font-[275]">
        (Click to enlarge)
      </p>
    </header>
        <div className="mt-7 ">
          <CycleGrid id={id} />
        </div>
      </section>
    </main>
  );
};

export default ImageDetail;
