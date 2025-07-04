// src/components/api/machine.js
import client from "./client";

export const fetchRawMachines = async () => {
  try {
    const response = await client.get("/machines");
    const machines = Array.isArray(response.data)
      ? response.data
      : response.data.machines || [];

    return machines;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const fetchMachines = async () => {
  try {
    const response = await client.get("/machines");
    const machines = Array.isArray(response.data)
      ? response.data
      : response.data.machines || [];

    const formattedData = [];

    machines.forEach((machine) => {
      machine.testSites?.forEach((testSite) => {
        formattedData.push({
          id: machine._id,
          name: machine.name,
          testSite: testSite.testSiteNumber,
          section: testSite.section,
          station: testSite.station,
          kmFrom: testSite.kmFrom,
          kmTo: testSite.kmTo,
          division: testSite.division,
          nextGrindingDueDate: testSite.nextGrindingDueDate,
          nextRepaintingDueDate: testSite.nextRepaintingDueDate,
        });
      });
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const addMachine = async (machineData) => {
  try {
    const response = await client.post("/machines", machineData);
    return response.data;
  } catch (error) {
    console.error("Error adding machine:", error);
    throw error;
  }
};

export const fetchMachineById = async (id) => {
  try {
    const response = await client.get(`/machines/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching machine with id ${id}:`, error);
    throw error;
  }
};

export const updateTestSiteData = async (
  machineId,
  testSiteNumber,
  updatedData
) => {
  try {
    const response = await client.put(
      `/machines/${machineId}/${testSiteNumber}`,
      {
        updatedTestSiteData: {
          ...updatedData,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating test site data for machine ${machineId} and test site ${testSiteNumber}:`,
      error
    );
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await client.get("/users");
    const employees = [];
    response.data.forEach((user) => {
      if (
        user.role === "engineer" ||
        user.role === "machineManager" ||
        user.role === "fleetManager"
      ) {
        employees.push({
          ...user,
        });
      }
    });
    return employees;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updatePointStatus = async (
  machineId,
  testSiteNumber,
  pointNo,
  status,
  cycleName = null,
  cycleId = null,
  feedback = null
) => {
  try {
    const cycleType = cycleName.toLowerCase().startsWith("grind")
      ? "grindCycles"
      : "repaintCycles";

    const response = await client.put(
      `/machines/${machineId}/${testSiteNumber}/${pointNo}`,
      {
        status,
        cycleId,
        cycleType,
        feedback,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating point status for machine ${machineId}, test site ${testSiteNumber}, point ${pointNo}:`,
      error
    );
    throw error;
  }
};

export const createTestSite = async (machineId, newTestSiteNumber) => {
  try {
    const response = await client.put(`/machines/${machineId}`, {
      testSiteNumber: newTestSiteNumber,
    });
    return response.data.machine;
  } catch (error) {
    console.error(`Error creating test site for machine ${machineId}:`, error);
    throw error;
  }
};

export const updateMachineData = async (machineId, updatedData) => {
  try {
    const response = await client.patch(`/machines/${machineId}`, {
      ...updatedData,
    });
    return response.data.machine;
  } catch (error) {
    console.error(`Error updating machine ${machineId}:`, error);
    throw error;
  }
};
