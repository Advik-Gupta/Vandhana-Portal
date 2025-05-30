// src/api/machines.js
import client from "./client";

export const fetchMachines = async () => {
  console.log("i am reaching here");

  try {
    const response = await client.get('/machines');

    const machines = Array.isArray(response.data)
      ? response.data
      : response.data.machines || [];

    const formattedData = [];

    machines.forEach((machine) => {
      machine.testSites.forEach((testSite) => {
        formattedData.push({
          id: machine._id,
          name: machine.name,
          testSite: testSite.testSiteNumber,
          section: testSite.section,
          station: testSite.station,
          kmFrom: testSite.kmFrom,
          kmTo: testSite.kmTo,
          division: testSite.division,
          dueDate: machine.nextGrindingDueDate || "N/A",
        });
      });
    });
    console.log(formattedData[0])

    return formattedData;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const addMachine = async (machineData) => {
  try {
    console.log(machineData)
    const response = await client.post('/machines', machineData);
    return response.data;
  } catch (error) {
    console.error("Error adding machine:", error);
    throw error;
  }
};
