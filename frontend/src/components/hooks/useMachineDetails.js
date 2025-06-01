// src/hooks/useMachineDetails.js
import { useState, useEffect } from "react";
import axios from "axios";

const useMachineDetails = (id) => {
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createdByUser, setCreatedByUser] = useState(null);
  const [assignedEngineerUser, setAssignedEngineerUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/machines/${id}`);
        setMachine(data);

        const [creatorRes, engineerRes] = await Promise.all([
          data.createdBy ? axios.get(`http://localhost:8080/api/v1/users/${data.createdBy}`) : Promise.resolve({ data: null }),
          data.assignedEngineer ? axios.get(`http://localhost:8080/api/v1/users/${data.assignedEngineer}`) : Promise.resolve({ data: null }),
        ]);

        setCreatedByUser(creatorRes.data);
        setAssignedEngineerUser(engineerRes.data);
      } catch (err) {
        setError("Failed to fetch machine details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { machine, loading, error, createdByUser, assignedEngineerUser };
};

export default useMachineDetails;
