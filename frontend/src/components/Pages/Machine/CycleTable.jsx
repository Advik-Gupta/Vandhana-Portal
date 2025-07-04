import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const CycleTable = ({ machine }) => {
  const [cycleType, setCycleType] = useState(null); // 'grindCycles' | 'repaintCycles'
  const [selectedCycleIndex, setSelectedCycleIndex] = useState(null);
  const [selectedTestSiteIdx, setSelectedTestSiteIdx] = useState(null); // index of selected test site

  const columnHeaders = [
    { label: "DPT", field: "dptTest" },
    { label: "TOP VIEW", field: "topView" },
    { label: "GAUGE VIEW", field: "gaugeView" },
    { label: "LONGITUDINAL VIEW", field: "longitudinalView" },
    { label: "CONTACT BAND", field: "contactBand" },
    { label: "STAR GAUGE", field: "starGauge" },
    { label: "MINIPROF", field: "miniprof" },
    { label: "ROUGHNESS", field: "roughness" },
    { label: "HARDNESS", field: "hardness" },
  ];

  const getAvailableCycles = (type) => {
    const indices = new Set();
    machine.testSites.forEach((site) =>
      site.points.forEach((point) => {
        const cycles = point?.[type] || {};
        Object.keys(cycles).forEach((key) => indices.add(Number(key)));
      })
    );
    return [...indices].sort((a, b) => a - b);
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    const cycleLabel =
      (cycleType === "grindCycles" ? "Grind Cycle - " : "Repaint Cycle - ") +
      selectedCycleIndex;
    const testSiteLabel = `T${80 + selectedTestSiteIdx}`;
    const testSiteFolder = zip.folder(cycleLabel)?.folder(testSiteLabel);

    const site = machine.testSites[selectedTestSiteIdx];

    for (let pointIdx = 0; pointIdx < site.points.length; pointIdx++) {
      const point = site.points[pointIdx];
      const cycleData = point?.[cycleType]?.[selectedCycleIndex];
      const pointLabel = `${testSiteLabel}.${pointIdx + 1}`;
      const pointFolder = testSiteFolder?.folder(pointLabel);

      for (const { field } of columnHeaders) {
        const preImages = cycleData?.pre?.[field] ?? [];
        const postImages = cycleData?.post?.[field] ?? [];

        const preFolder = pointFolder?.folder(field)?.folder("pre");
        const postFolder = pointFolder?.folder(field)?.folder("post");

        // Fetch and add PRE images
        if (preImages.length > 0) {
          for (let i = 0; i < preImages.length; i++) {
            const url = preImages[i];
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error("Bad response");
              const blob = await response.blob();
              const filename = decodeURIComponent(
                url.split("/").pop()?.split("?")[0] ||
                  `image_${i + 1}${getExtension(blob.type)}`
              );
              preFolder?.file(filename, blob);
            } catch (err) {
              console.warn(`Failed to fetch PRE image: ${url}`, err);
            }
          }
        } else {
          preFolder?.file(".empty", "");
        }

        // Fetch and add POST images
        if (postImages.length > 0) {
          for (let i = 0; i < postImages.length; i++) {
            const url = postImages[i];
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error("Bad response");
              const blob = await response.blob();
              const filename = decodeURIComponent(
                url.split("/").pop()?.split("?")[0] ||
                  `image_${i + 1}${getExtension(blob.type)}`
              );
              postFolder?.file(filename, blob);
            } catch (err) {
              console.warn(`Failed to fetch POST image: ${url}`, err);
            }
          }
        } else {
          postFolder?.file(".empty", "");
        }
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${cycleLabel}_${testSiteLabel}.zip`);
  };

  function getExtension(mimeType) {
    const map = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
    };
    return map[mimeType] || "";
  }

  const availableCycles = cycleType ? getAvailableCycles(cycleType) : [];

  return (
    <div className="w-full">
      {/* Cycle Type Buttons */}
      <div className="flex gap-4 mb-4">
        {["grindCycles", "repaintCycles"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setCycleType(type);
              setSelectedCycleIndex(null);
              setSelectedTestSiteIdx(null);
            }}
            className={`px-4 py-2 rounded font-semibold ${
              cycleType === type
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 hover:bg-yellow-300"
            }`}
          >
            {type === "grindCycles" ? "Grind Cycles" : "Repaint Cycles"}
          </button>
        ))}
      </div>

      {/* Cycle Index Buttons */}
      {cycleType && (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableCycles.length > 0 ? (
            availableCycles.map((index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCycleIndex(index);
                  setSelectedTestSiteIdx(null);
                }}
                className={`px-3 py-1.5 text-sm rounded ${
                  selectedCycleIndex === index
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 hover:bg-yellow-300"
                }`}
              >
                {cycleType === "grindCycles" ? "Grind" : "Repaint"} Cycle -{" "}
                {index}
              </button>
            ))
          ) : (
            <span className="text-sm italic text-gray-500">
              No cycles found.
            </span>
          )}
        </div>
      )}

      {/* Test Site Buttons */}
      {selectedCycleIndex !== null && (
        <div className="flex flex-wrap gap-2 mb-6">
          {machine.testSites.map((site, siteIdx) => (
            <button
              key={siteIdx}
              onClick={() => setSelectedTestSiteIdx(siteIdx)}
              className={`px-3 py-1.5 text-sm rounded ${
                selectedTestSiteIdx === siteIdx
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-100 hover:bg-yellow-300"
              }`}
            >
              Test Site T{80 + siteIdx}
            </button>
          ))}
        </div>
      )}

      {/* Table */}

      {selectedTestSiteIdx !== null && (
        <>
          <table className="table-auto border-collapse w-full text-center text-sm">
            <thead>
              <tr>
                <th
                  className="bg-yellow-400 text-black font-bold"
                  colSpan={1 + columnHeaders.length * 2}
                >
                  {cycleType === "grindCycles" ? "Grind" : "Repaint"} Cycle -{" "}
                  {selectedCycleIndex} | Test Site T{80 + selectedTestSiteIdx}
                </th>
              </tr>
              <tr>
                <th rowSpan={2} className="border px-2 py-1">
                  Point
                </th>
                {columnHeaders.map(({ label }) => (
                  <th key={label} colSpan={2} className="border px-2 py-1">
                    {label}
                  </th>
                ))}
              </tr>
              <tr>
                {columnHeaders.map(({ field }) => (
                  <>
                    <th key={`${field}_pre`} className="border px-2 py-1">
                      Pre
                    </th>
                    <th key={`${field}_post`} className="border px-2 py-1">
                      Post
                    </th>
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              {machine.testSites[selectedTestSiteIdx].points.map(
                (point, pointIdx) => {
                  const cycleData = point?.[cycleType]?.[selectedCycleIndex];

                  return (
                    <tr key={`point-${pointIdx}`}>
                      <td className="border px-2 py-1 font-medium">
                        {`T${80 + selectedTestSiteIdx}.${pointIdx + 1}`}
                      </td>

                      {columnHeaders.map(({ field }) => {
                        const pre = cycleData?.pre?.[field] ?? [];
                        const post = cycleData?.post?.[field] ?? [];

                        return (
                          <>
                            <td
                              key={`${field}_pre`}
                              className={`border px-2 py-1 ${
                                pre.length === 0 ? "bg-red-100" : ""
                              }`}
                            >
                              {pre.length > 0 ? "Available" : "N/A"}
                            </td>
                            <td
                              key={`${field}_post`}
                              className={`border px-2 py-1 ${
                                post.length === 0 ? "bg-red-100" : ""
                              }`}
                            >
                              {post.length > 0 ? "Available" : "N/A"}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div className="mt-6">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Download Data
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CycleTable;
