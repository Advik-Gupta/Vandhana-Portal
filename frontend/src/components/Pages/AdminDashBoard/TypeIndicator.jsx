import * as React from "react";

function TypeIndicator({ color, label, className = "" }) {
  return (
    <div className={`flex max-w-full text-xs text-black ${className}`}>
      <div
        className={`flex shrink-0 my-auto ${color} rounded-full h-[27px] w-[27px]`}
      />
      <div className="gap-2.5 self-stretch p-2.5">{label}</div>
    </div>
  );
}

export default TypeIndicator;
