"use client";
import React from 'react';

const CycleType = ({ text }) => {
  return (
    <article className="flex-1 px-16 bg-amber-500 rounded-xl max-md:px-5">
      <h3 className=" gap-2.5 self-stretch py-2  pl-1  min-h-10 text-md font-medium text-white">
        {text}
      </h3>
    </article>
  );
};

export default CycleType;
