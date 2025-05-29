import React from "react";

const TestSiteBlock = ({ title }) => {
  return (
    <div className="flex flex-wrap gap-10 items-start self-center px-7 pt-2.5 pb-5 mt-11 w-full rounded-3xl bg-[#FF9822B2] bg-opacity-70 max-w-[1104px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex-auto self-start max-md:max-w-full" space={67}>
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full text-lg font-medium text-white max-md:mt-10">
              <div className="z-10 gap-2.5 self-stretch p-1 text-3xl font-bold">
                {title}
              </div>
              <div className="px-12 mt-3.5 ml-2.5 w-full whitespace-nowrap bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.1</div>
              </div>
              <div className="px-12 mt-3.5 ml-2.5 w-full whitespace-nowrap bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.2</div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="grow mt-14 text-lg font-medium text-white whitespace-nowrap max-md:mt-10">
              <div className="px-12 w-full bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.3</div>
              </div>
              <div className="px-12 mt-4 w-full bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.4</div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="grow mt-14 text-lg font-medium text-white whitespace-nowrap max-md:mt-10">
              <div className="px-12 w-full bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.5</div>
              </div>
              <div className="px-12 mt-4 w-full bg-amber-500 rounded-xl max-md:px-5">
                <div className="z-10 gap-2.5 self-stretch p-2.5">T1.6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-end px-7 pt-2 pb-5 mt-28 text-lg font-semibold text-black whitespace-nowrap bg-white rounded-3xl max-md:px-5 max-md:mt-10">
        SEE
      </div>
    </div>
  );
};

export default TestSiteBlock;
