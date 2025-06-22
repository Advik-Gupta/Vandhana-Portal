import React, { useState, useEffect, useContext } from "react";
import ViewSection from "./ViewSection";
import { UserContext } from "../../contexts/user.context";

import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
// import { set } from "mongoose";

function DataUploadForm() {
  const { machineID, testSiteNumber, pointNumber } = useParams();
  const [machineName, setMachineName] = useState("");
  const [testSite, setTestSite] = useState(testSiteNumber);
  const { currentUser } = useContext(UserContext);

  const [unuploadedNotice, setUnuploadedNotice] = useState("");
  const [userRemarks, setUserRemarks] = useState("");

  const location = useLocation();
  const { cycle, cycleNumber } = location.state || {};

  const sectionTitles = [
    "DPT Test",
    "Top View",
    "Gauge View",
    "Longitudinal View",
    "Contact Band",
    "Roughness",
    "Hardness",
    "Star Gauge",
    "Miniprof",
  ];

  const [fileData, setFileData] = useState(
    sectionTitles.reduce((acc, title) => {
      acc[title] = { pre: null, post: null };
      return acc;
    }, {})
  );

  useEffect(() => {
    console.log(cycle, cycleNumber);
    const fetchMachineName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/machines/${machineID}`
        );
        setMachineName(response.data.name);
        setTestSite(
          response.data.testSites.find(
            (site) => site.testSiteNumber === testSiteNumber
          )
        );
      } catch (error) {
        console.error("Error fetching machine name:", error);
      }
    };
    fetchMachineName();
  }, []);

  useEffect(() => {
    const missingLines = sectionTitles
      .map((title) => {
        const missingTypes = [];
        if (!fileData[title].pre) missingTypes.push("pre");
        if (!fileData[title].post) missingTypes.push("post");

        if (missingTypes.length > 0) {
          return `- ${title} (${missingTypes.join(", ")})`;
        }

        return null;
      })
      .filter(Boolean);

    if (missingLines.length > 0) {
      setUnuploadedNotice(
        `Images not uploaded for these fields:\n${missingLines.join("\n")}\n\n`
      );
    } else {
      setUnuploadedNotice("");
    }
  }, [fileData, sectionTitles]);

  const handlePreChange = (section, file) => {
    setFileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], pre: file },
    }));
  };

  const handlePostChange = (section, file) => {
    setFileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], post: file },
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting data...");
    console.log("Machine ID:", machineID);
    console.log("Test Site Number:", testSiteNumber);
    console.log("Point Number:", pointNumber);

    const formData = new FormData();
    Object.entries(fileData).forEach(([section, files]) => {
      if (files.pre) {
        formData.append(`${section}_pre`, files.pre, files.pre.name);
      }
      if (files.post) {
        formData.append(`${section}_post`, files.post, files.post.name);
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
      formData.append("ohePoleNumber", "2(8-10)");
      formData.append("uploadedBy", currentUser._id);

      const res = await axios.post(
        `http://localhost:8080/api/v1/machines/${machineID}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const notify = await axios.post(
        `http://localhost:8080/api/v1/notifications/send?to=admin`,
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

      alert("Upload success!");
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

      {sectionTitles.map((title) => (
        <ViewSection
          key={title}
          title={title}
          className="mt-7 ml-2.5"
          prePhoto={fileData[title].pre}
          postPhoto={fileData[title].post}
          onPreChange={handlePreChange}
          onPostChange={handlePostChange}
          isMiniprof={title === "Miniprof" ? true : false}
        />
      ))}
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

      <button
        onClick={handleSubmit}
        className="self-center mt-10 px-10 py-3 bg-black text-white rounded-3xl text-2xl"
      >
        Submit All Files
      </button>
    </main>
  );
}

export default DataUploadForm;
