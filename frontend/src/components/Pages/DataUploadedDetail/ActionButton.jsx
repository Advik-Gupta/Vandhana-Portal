import React from "react";

function ActionButton({onApprove,onReupload}) {
  return (
    <div className="flex gap-8 mt-9 ml-3 text-xs font-bold max-md:ml-2.5">
      <button onClick={onApprove} className="flex flex-col justify-center px-10 py-px whitespace-nowrap bg-green-400 rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
        <span className="gap-2.5 self-stretch p-2.5">Approve</span>
      </button>
      <button onClick={onReupload} className="flex flex-col justify-center px-3.5 py-px bg-red-600 rounded-3xl">
        <span className="gap-2.5 self-stretch p-2.5">Request Reupload</span>
      </button>
    </div>
  );
}
export default ActionButton;
