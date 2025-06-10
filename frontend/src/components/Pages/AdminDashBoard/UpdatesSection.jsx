import * as React from "react";
import arrow from "../../../assets/blackArrow.svg";
function UpdatesSection({ updates }) {
  return (
    <section className="flex flex-col items-start pt-6 pr-16 pb-11 pl-6 mx-auto mt-10 w-full text-xs font-light text-black bg-gray-200 rounded-3xl max-md:px-5 max-md:mt-10">
      <h2 className="gap-2.5 self-stretch p-2.5 text-2xl font-semibold">
        Latest updates
      </h2>

      {updates.map((update, index) => (
        <div key={index} className="mt-3 ml-2.5 first:mt-3">
          <div className="flex gap-2">
            <div className="flex shrink-0 self-start rounded-full bg-neutral-400 h-[9px] w-[9px]" />
            <p className="basis-auto">{update.text}</p>
          </div>
          <button>
            {update.isRejected && (
              <div className="flex gap-1 mt-1 ml-7 text-xs whitespace-nowrap text-zinc-600 max-md:ml-2.5">
                <span className="underline">Reupload</span>

                <img
                  src={arrow}
                  className="object-contain shrink-0 self-start w-2 mt-1 aspect-square"
                  alt="Reupload icon"
                />
              </div>
            )}
          </button>
        </div>
      ))}
    </section>
  );
}

export default UpdatesSection;
