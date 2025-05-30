import { useState } from "react";
import Button from "./Button";
import axios from "axios";

const UploadCard = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload", // your backend upload endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="h-[100vh] p-4 flex flex-col justify-center content-center">
      <h1 className="text-6xl font-bold text-center mt-4">Dashboard</h1>
      <div className="p-6 bg-gray-300 rounded-lg shadow-lg w-100 h-[50%] m-auto flex flex-col justify-around">
        <h2 className="text-2xl font-bold mb-4 py-2 bg-black rounded-sm text-center text-white">
          Latest updates
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center my-5">
            <span className="text-gray-600">•</span>
            <span className="ml-2 text-gray-800">
              Data required for Test site no TOC
            </span>
          </li>
          {/* ... other list items ... */}
        </ul>

        {/* File input */}
        <input type="file" onChange={handleFileChange} className="my-4" />

        {/* Upload button */}
        <Button text="Upload Data" handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default UploadCard;
