import * as React from "react";

function DataCard({
  backgroundColor,
  title,
  subtitle,
  uploadedBy,
  date,
  className = "",
  missingImages,
  userRemarks,
}) {
  return (
    <div
      className={`flex flex-col gap-4 px-8 py-6 w-full ${backgroundColor} rounded-3xl shadow-lg max-md:px-5 ${className} cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
    >
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-black">
            Update For: <span className="font-bold">{title}</span>
          </h3>
          <p className="text-md text-gray-800 mt-1">{subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-white">{date}</p>
          <p className="text-sm font-medium text-white opacity-90 mt-1">
            Data uploaded by {uploadedBy}
          </p>
        </div>
      </div>

      {/* Missing Images */}
      {missingImages && (
        <div className="bg-white/60 p-4 rounded-xl text-red-800">
          <p className="font-semibold mb-2 flex items-center">
            ⚠️ <span className="ml-2">Missing Images:</span>
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed font-medium text-red-700">
            {missingImages}
          </p>
        </div>
      )}

      {/* Remarks */}
      {userRemarks && (
        <div className="bg-white/60 p-4 rounded-xl text-gray-800">
          <p className="font-semibold mb-2 flex items-center">
            📝 <span className="ml-2">Remarks:</span>
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {userRemarks}
          </p>
        </div>
      )}
    </div>
  );
}

export default DataCard;
