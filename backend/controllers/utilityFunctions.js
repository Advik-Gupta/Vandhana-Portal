export const getRandomFutureDate = (daysAhead = 180) => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAhead) + 1; // 1 to daysAhead
  now.setDate(now.getDate() + randomDays);
  return now;
};

export const generatePoints = (testSiteName) => {
  const points = [];
  for (let i = 1; i <= 6; i++) {
    points.push({
      pointName: `${testSiteName}.${i}`,
    });
  }
  return points;
};

export const generateTestSites = (num) => {
  const testSites = [];
  for (let i = num; i <= num + 11; i++) {
    testSites.push({
      testSiteNumber: `T${i}`,
      division: "N/A",
      curveType: "N/A",
      curveNumber: null,
      degreeOfCurve: 0,
      section: "N/A",
      station: "N/A",
      line: "Up",
      kmFrom: 0,
      kmTo: 0,
      gmt: 0,
      nextGrindingDueDate: new Date(),
      nextRepaintingDueDate: new Date(),
      currentGrindingCycle: 0,
      currentRepaintingCycle: 0,
      points: generatePoints(`T${i}`),
    });
  }
  return testSites;
};
