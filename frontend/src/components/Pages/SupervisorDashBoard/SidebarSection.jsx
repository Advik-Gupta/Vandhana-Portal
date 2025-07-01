import * as React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../../assets/arrow.svg";

function SidebarSection({ items }) {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-start px-8 pt-8 pb-12 mx-auto w-full text-2xl font-semibold text-black bg-gray-200 rounded-3xl max-md:px-5 max-md:mt-10">
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex gap-px w-full">
            <h2 className="gap-2.5 self-stretch p-2.5 w-[199px]">
              {item.title}
            </h2>
            <button
              onClick={() => {
                navigate(`${item.navigate}`);
              }}
            >
              <img
                src={arrow}
                className="object-contain shrink-0 my-auto aspect-square w-[46px]"
                alt={`arrow`}
              />
            </button>
          </div>
          {index < items.length - 1 && (
            <div className="shrink-0 mt-5 ml-3 max-w-full h-px border border-black border-solid w-[266px] max-md:ml-2.5" />
          )}
        </div>
      ))}
    </section>
  );
}

export default SidebarSection;
