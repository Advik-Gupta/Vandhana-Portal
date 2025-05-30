import React, { useState } from "react";
import ViewSection from "./ViewSection";
import arrow from "../../assets/arrow.svg";
import axios from "axios";

function DataUploadForm() {
  const sectionTitles = [
    "DPT Test",
    "Top View",
    "Gauge View",
    "Longitudinal View",
    "Contact Band",
    "Roughness",
    "Hardness",
    "Star Gauge",
  ];

  const [fileData, setFileData] = useState(
    sectionTitles.reduce((acc, title) => {
      acc[title] = { pre: null, post: null };
      return acc;
    }, {})
  );
//   console.log("Initial File Data:", fileData); // Debugging line to check initial state

  const handlePreChange = (section, file) => {
    setFileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], pre: file },
    }));
    // console.log(`Updated Pre File for ${section}:`, file.name); // Debugging line to check pre file change
  };

  const handlePostChange = (section, file) => {
    setFileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], post: file },
    }));
  };

  const handleSubmit = async () => {
    // console.log("Submitting File Data:", fileData); // Debugging line to check file data before submission
    const formData = new FormData();
    Object.entries(fileData).forEach(([section, files]) => {
    //   console.log(section, files); // Debugging line to check each section's files
      if (files.pre) {
        formData.append(`${section}_pre`, files.pre);
      }
      if (files.post) {
        formData.append(`${section}_post`, files.post);
      }
    });
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload success!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <main className="flex overflow-hidden flex-col items-start px-11 pt-7 pb-16 bg-white max-md:px-5">
      <header className="flex self-stretch max-md:max-w-full">
        <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit max-md:max-w-full">
          <h1 className="gap-2.5 self-start p-2.5 text-5xl font-bold text-black w-[287px] max-md:text-4xl">
            Test Site 1
          </h1>
          <div className="flex z-10 flex-col pl-1.5 mt-0 w-full max-md:max-w-full">
            <h2 className="gap-2.5 self-start p-2.5 text-2xl text-black">
              Point 1
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
        />
      ))}

      <button
        onClick={handleSubmit}
        className="self-center mt-10 px-10 py-3 bg-black text-white rounded-3xl text-2xl"
      >
        Submit All Files
      </button>

      <img className="self-end mt-10" src={arrow} alt="arrow" />
    </main>
  );
}

export default DataUploadForm;
