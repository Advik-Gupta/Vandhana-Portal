import React, { useState } from "react";
import axios from "axios"; // or use fetch

 function IssuesList() {
  const issues = [
    "Incomplete grind cycle data",
    "Site location unclear",
    "Other (mentioned in comment)",
  ];

  const [selectedIssues, setSelectedIssues] = useState([]);

  const handleCheckboxChange = (issue) => {
    setSelectedIssues((prev) =>
      prev.includes(issue)
        ? prev.filter((i) => i !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = async () => {
    try {
      // Replace with your  endpoint
      console.log(selectedIssues)
      const response = await axios.post("/api/issues", {
        issues: selectedIssues,
      });
      console.log("Successfully submitted:", response.data);
      alert("Issues submitted successfully!");
    } catch (error) {
      console.error("Error submitting issues:", error);
      alert("Failed to submit issues.");
    }
  };

  return (
    <section className="w-full">
      <h2 className="mt-9 text-white text-lg font-semibold">
        Issues Detected (if any):
      </h2>
      <ul className="mt-3 space-y-2">
        {issues.map((issue, index) => (
          <li key={index} className="flex items-center gap-2 text-sm font-light">
            <input
              type="checkbox"
              id={`issue-${index}`}
              className="w-4 h-4 accent-orange-500"
              checked={selectedIssues.includes(issue)}
              onChange={() => handleCheckboxChange(issue)}
            />
            <label
              htmlFor={`issue-${index}`}
              className="text-white text-base font-medium"
            >
              {issue}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all"
      >
        Submit Issues
      </button>
    </section>
  );
}
export default IssuesList