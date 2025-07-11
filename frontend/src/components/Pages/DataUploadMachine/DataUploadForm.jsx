import React, { useState, useEffect, useContext, useMemo } from "react";
import ViewSection from "./ViewSection";
import { UserContext } from "../../../contexts/user.context";

import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { processImage, sendToModel } from "./imagePreProcessor";

function DataUploadForm() {
  const { machineID, testSiteNumber, pointNumber } = useParams();
  const [machineName, setMachineName] = useState("");
  const [testSite, setTestSite] = useState(testSiteNumber);
  const { currentUser } = useContext(UserContext);

  const [unuploadedNotice, setUnuploadedNotice] = useState("");
  const [userRemarks, setUserRemarks] = useState("");
  const [ohePoleNumber, setOhePoleNumber] = useState("");
  const [firstUpload, setFirstUpload] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const location = useLocation();
  const { cycle, cycleNumber, grindingDate, dataType } = location.state || {};

  const sectionTitles = useMemo(
    () => [
      { title: "DPT Test", type: "image" },
      { title: "Top View", type: "image" },
      { title: "Gauge View", type: "image" },
      { title: "Longitudinal View", type: "image" },
      { title: "Contact Band", type: "image" },
      { title: "Roughness", type: "number" },
      { title: "Hardness", type: "number" },
      { title: "Star Gauge", type: "image" },
      { title: "Miniprof", type: "image" },
    ],
    []
  );

  const [fileData, setFileData] = useState(
    sectionTitles.reduce((acc, { title, type }) => {
      if (type === "number") {
        acc[title] = { pre: "", post: "" };
      } else {
        acc[title] = { pre: null, post: null };
      }
      return acc;
    }, {})
  );

  useEffect(() => {
    console.log(cycle, cycleNumber, grindingDate, dataType);
    const fetchMachineName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/machines/${machineID}`
        );
        setMachineName(response.data.name);
        const site = response.data.testSites.find(
          (site) => site.testSiteNumber === testSiteNumber
        );
        setTestSite(site);

        const currentPoint = site.points.find(
          (point) => point.pointName === `${testSiteNumber}.${pointNumber}`
        );

        if (cycle === "Grind") {
          if (!currentPoint.grindCycles[cycleNumber - 1]) {
            setFirstUpload(true);
            setShowWarning(true);
          } else {
            setFirstUpload(false);
          }
        }

        if (cycle === "Repaint") {
          if (!currentPoint.repaintCycles[cycleNumber - 1]) {
            setFirstUpload(true);
            setShowWarning(true);
          } else {
            setFirstUpload(false);
          }
        }
      } catch (error) {
        console.error("Error fetching machine name:", error);
      }
    };
    fetchMachineName();
  }, []);

  useEffect(() => {
    const missingLines = sectionTitles
      .map(({ title, type }) => {
        if (type === "number") {
          const missingTypes = [];
          if (!fileData[title]?.pre?.trim()) missingTypes.push("pre");
          if (!fileData[title]?.post?.trim()) missingTypes.push("post");

          if (missingTypes.length > 0) {
            return `- ${title} (${missingTypes.join(", ")})`;
          }
          return null;
        }

        const missingTypes = [];
        if (!fileData[title]?.pre) missingTypes.push("pre");
        if (!fileData[title]?.post) missingTypes.push("post");

        if (missingTypes.length > 0) {
          return `- ${title} (${missingTypes.join(", ")})`;
        }

        return null;
      })
      .filter(Boolean);

    if (missingLines.length > 0) {
      setUnuploadedNotice(
        `Images or values not uploaded for these fields:\n${missingLines.join(
          "\n"
        )}\n\n`
      );
    } else {
      setUnuploadedNotice("");
    }
  }, [fileData, sectionTitles]);

  function getProcessingRules(section, type) {
    const verticalSections = ["Longitudinal View", "Star Gauge"];
    const isMiniprofBan = section === "Miniprof" && type === "pre";

    if (isMiniprofBan) {
      return { skipAll: true };
    }

    const aspectRatio = verticalSections.includes(section) ? 0.5 : 2;
    const rotate = !verticalSections.includes(section); // only rotate if NOT vertical
    const skipModel = verticalSections.includes(section); // don't send Longitudinal/Star Gauge to model

    return {
      skipAll: false,
      skipModel,
      aspectRatio,
      rotate,
    };
  }

  const handlePreChange = async (section, file) => {
    const { skipAll, skipModel, aspectRatio, rotate } = getProcessingRules(
      section,
      "pre"
    );

    try {
      const processedFile = skipAll
        ? file
        : await processImage(file, aspectRatio, rotate);

      const finalFile =
        skipAll || skipModel ? processedFile : await sendToModel(processedFile);

      setFileData((prev) => ({
        ...prev,
        [section]: { ...prev[section], pre: finalFile },
      }));
    } catch (err) {
      console.error(err);
      alert("Error processing pre file: " + err.message);
    }
  };

  const handlePostChange = async (section, file) => {
    const { skipAll, skipModel, aspectRatio, rotate } = getProcessingRules(
      section,
      "post"
    );

    try {
      const processedFile = skipAll
        ? file
        : await processImage(file, aspectRatio, rotate);

      const finalFile =
        skipAll || skipModel ? processedFile : await sendToModel(processedFile);

      setFileData((prev) => ({
        ...prev,
        [section]: { ...prev[section], post: finalFile },
      }));
    } catch (err) {
      console.error(err);
      alert("Error processing post file: " + err.message);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting data...");
    console.log("Machine ID:", machineID);
    console.log("Test Site Number:", testSiteNumber);
    console.log("Point Number:", pointNumber);

    const formData = new FormData();
    Object.entries(fileData).forEach(([section, data]) => {
      if ("pre" in data && typeof data.pre === "string") {
        // It's a number field
        if (data.pre) formData.append(`${section}_pre`, data.pre);
        if (data.post) formData.append(`${section}_post`, data.post);
      } else {
        // It's an image field
        if (data.pre)
          formData.append(`${section}_pre`, data.pre, data.pre.name);
        if (data.post)
          formData.append(`${section}_post`, data.post, data.post.name);
      }
    });

    try {
      console.log("Sending form data to server...");
      formData.append("machineId", machineID);
      formData.append("testSiteNumber", testSiteNumber); // example
      formData.append("pointNumber", pointNumber);
      if (cycle === "Repaint") {
        formData.append("cycleType", "repaintCycles");
      } else {
        formData.append("cycleType", "grindCycles");
      }
      formData.append("cycleNumber", cycleNumber);
      // customerName, zone, location, line, curveType, curveNumber, rail
      formData.append("customerName", "IR");
      formData.append("zone", "WR");
      formData.append("location", testSite.station);
      formData.append("line", testSite.line.toUpperCase());
      formData.append("curveNumber", testSite.curveNumber);
      formData.append("rail", testSite.curveType);
      formData.append("ohePoleNumber", ohePoleNumber);
      formData.append("uploadedBy", currentUser._id);
      formData.append("grindingDate", grindingDate);

      const res = await axios
        .post(
          `http://localhost:8080/api/v1/machines/${machineID}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(async (response) => {
          if (response.status === 201) {
            console.log("Data uploaded successfully");
          }
          const notify = await axios.post(
            `http://localhost:8080/api/v1/notifications/send?to=admin+supervisor`,
            {
              message: `Data for ${cycle} cycle ${cycleNumber} of - ${machineName} {${machineID}}, ${testSiteNumber}, ${pointNumber} has been updated by ${
                currentUser._id
              } + ${unuploadedNotice + userRemarks}`,
              type:
                cycle === "Repaint"
                  ? "repaintingCycleUpdate"
                  : "grindingCycleUpdate",
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (notify.status === 201) {
            console.log("Notification sent successfully");
          }
        })
        .catch((error) => {
          console.error("Error uploading data:", error);
          throw new Error("Failed to upload data");
        });

      alert("Data uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <main className="flex overflow-hidden flex-col items-start px-11 pt-7 pb-16 bg-white max-md:px-5 self-center">
      <header className="flex self-stretch max-md:max-w-full">
        <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit max-md:max-w-full">
          <h1 className="gap-2.5 self-start p-2.5 text-5xl font-bold text-black max-md:text-4xl text-center">
            {machineName} - {testSiteNumber}
          </h1>
          <div className="flex z-10 flex-col pl-1.5 mt-0 w-full max-md:max-w-full">
            <h2 className="gap-2.5 self-start p-2.5 text-2xl text-black">
              Point {testSiteNumber}.{pointNumber}
            </h2>
          </div>
        </div>
      </header>

      {sectionTitles.map(({ title, type }) =>
        type === "number" ? (
          <div
            key={title}
            className="flex flex-col gap-4 mt-7 ml-3 w-full px-10 py-4 font-semibold bg-[#E9E9E9] rounded-xl max-w-[1307px] max-md:px-5 max-md:max-w-full"
          >
            <label className="text-3xl text-black">{title}</label>
            <div className="flex flex-wrap gap-8 text-lg">
              <div
                className={`flex flex-col ${
                  dataType === "post" ? "hidden" : ""
                }`}
              >
                <label className="mb-1 text-gray-700">Pre Value</label>
                <input
                  type="number"
                  step="any"
                  placeholder={`Enter Pre ${title}`}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-lg w-60"
                  value={fileData[title].pre}
                  onChange={(e) =>
                    setFileData((prev) => ({
                      ...prev,
                      [title]: { ...prev[title], pre: e.target.value },
                    }))
                  }
                />
              </div>
              <div
                className={`flex flex-col ${
                  dataType === "pre" ? "hidden" : ""
                }`}
              >
                <label className="mb-1 text-gray-700">Post Value</label>
                <input
                  type="number"
                  step="any"
                  placeholder={`Enter Post ${title}`}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-lg w-60"
                  value={fileData[title].post}
                  onChange={(e) =>
                    setFileData((prev) => ({
                      ...prev,
                      [title]: { ...prev[title], post: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          dataType && (
            <ViewSection
              key={title}
              title={title}
              className="mt-7 ml-2.5"
              prePhoto={fileData[title].pre}
              postPhoto={fileData[title].post}
              onPreChange={handlePreChange}
              onPostChange={handlePostChange}
              isMiniprof={title === "Miniprof"}
              dataType={dataType}
            />
          )
        )
      )}
      <div className="w-full mt-10 px-4">
        <label className="text-xl font-semibold text-black block mb-2">
          Remarks
        </label>
        <div className="bg-gray-100 text-gray-700 p-4 rounded-t-lg whitespace-pre-line">
          {unuploadedNotice}
        </div>
        <textarea
          className="w-full p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="You can type additional remarks here...Why are the absent files not uploaded? What is the reason for the upload?"
          value={userRemarks}
          onChange={(e) => setUserRemarks(e.target.value)}
          rows={4}
        />
      </div>

      <div className="w-full mt-10 px-4">
        <label className="text-xl font-semibold text-black block mb-2">
          OHE Pole Number
        </label>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter OHE pole number (e.g. 2(8-10))"
          value={ohePoleNumber}
          onChange={(e) => setOhePoleNumber(e.target.value)}
        />
      </div>

      {firstUpload && showWarning && (
        <div className="w-full mt-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl text-black">
          <h3 className="text-2xl font-semibold mb-2">
            You're about to start uploading data on:{" "}
            {grindingDate.toLocaleDateString("en-GB")}
          </h3>
          <p className="mb-4">
            You are initiating the upload process for point{" "}
            <strong>
              {testSiteNumber}.{pointNumber}
            </strong>
            . Once you upload the <strong>pre</strong> data, you must complete
            uploading the <strong>post</strong> data within{" "}
            <strong>10 days</strong>. You will not be allowed to upload post
            data after that.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowWarning(false)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg"
            >
              I Understand, Proceed
            </button>
            <button
              onClick={() => (window.location.href = "/")} // or use navigate("/")
              className="px-6 py-2 bg-gray-300 text-black rounded-lg text-lg"
            >
              I'm Not Ready
            </button>
          </div>
        </div>
      )}

      {(!firstUpload || !showWarning) && (
        <button
          onClick={handleSubmit}
          className="self-center mt-10 px-10 py-3 bg-black text-white rounded-3xl text-2xl"
        >
          Submit All Files
        </button>
      )}
    </main>
  );
}

export default DataUploadForm;
