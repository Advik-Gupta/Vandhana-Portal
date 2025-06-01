import React, { useState, useEffect } from "react";
import TestSiteBlock from "./TestSiteBlock";
import dropdown from "../../../assets/dd2.png";
import axios from "axios";
import { useParams } from "react-router-dom";

function MachineDetail() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createdByUser, setCreatedByUser] = useState(null);
  const [assignedEngineerUser, setAssignedEngineerUser] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/machines/${id}`
        );
        setMachine(response.data);

        // Fetch user details
        if (response.data.createdBy) {
          const userRes = await axios.get(
            `http://localhost:8080/api/v1/users/${response.data.createdBy}`
          );
          setCreatedByUser(userRes.data);
        }
        if (response.data.assignedEngineer) {
          const engRes = await axios.get(
            `http://localhost:8080/api/v1/users/${response.data.assignedEngineer}`
          );
          setAssignedEngineerUser(engRes.data);
        }
      } catch (err) {
        setError("Failed to fetch machine details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMachine();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!machine) {
    return null;
  }

  return (
    <div className="mb-5">
      <div className="z-10 gap-2.5 self-start p-2.5 -mt-3 text-2xl text-black">
        Created by : {createdByUser ? createdByUser.name : "Unknown"}
      </div>
      <div className="flex flex-wrap gap-5 justify-between self-end px-16 py-3.5 mr-3 mt-11 max-w-full text-3xl font-medium text-white bg-black rounded-3xl w-[1350px] max-md:px-5 max-md:mt-10">
        <div className="gap-2.5 self-stretch p-2.5 max-md:max-w-full">
          Assigned Engineer -{" "}
          {assignedEngineerUser ? assignedEngineerUser.name : "Unknown"}
        </div>
        <img
          src={dropdown}
          className="object-contain shrink-0 my-auto rounded-xl aspect-[1.22] w-[50px]"
        />
      </div>

      {/* Render TestSiteBlock for each test site */}
      {machine.testSites && machine.testSites.length > 0 ? (
        machine.testSites.map((site, idx) => (
          <TestSiteBlock
            key={site._id || idx}
            title={`Test Site ${site.testSiteNumber}`}
          />
        ))
      ) : (
        <div className="mt-8 text-xl text-gray-600">No test sites found.</div>
      )}
    </div>
  );
}

export default MachineDetail;
