import React, { useState } from "react";
import arrow from "../../../assets/arrow.svg";
import dd2 from "../../../assets/dd2.png";
import AssignEmployee from "./AssignEmployee";
import { addMachine } from "../../api/machine";
const AddMachine = () => {
  const [machineName, setMachineName] = useState("");
  const [testSiteRange, setTestSiteRange] = useState("");
  const [engineerId, setEngineerId] = useState(null);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const handleMachineNameChange = (e) => {
    setMachineName(e.target.value);
  };
  const handleTestSiteRangeChange = (e) => {
    setTestSiteRange(e.target.value);
  };
  const handleEngineerChange = (id) => {
    setEngineerId(id);
    setShowAssignPopup(false);
  };
  const handleSubmit = async () => {
    if (!machineName || !engineerId || !testSiteRange) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const machineData = {
      name: machineName,
      engineerID: engineerId,
      testSiteRangeStart: testSiteRange,
    };

    try {
      const response = await addMachine(machineData);
      console.log("Machine created successfully:", response);
      alert("Machine created successfully!");
      // Optionally reset form fields
      setMachineName("");
      setEngineerId(null);
      setTestSiteRange("");
    } catch (error) {
      console.error("Failed to create machine:", error);
      alert("Error creating machine. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="relative mx-auto my-0 w-full  h-[1024px] max-w-[1440px] max-md:h-auto max-md:min-h-screen max-md:max-w-[991px] max-sm:max-w-screen-sm font-['Montserrat']">
        <header className="flex justify-between items-center px-11 pt-7 pb-0 max-md:px-8 max-md:pt-5 max-md:pb-0 max-sm:px-5 max-sm:pt-4 max-sm:pb-0">
          <h1 className="text-6xl font-bold text-black max-md:text-4xl max-sm:text-3xl">
            Add machine
          </h1>
        </header>
        {showAssignPopup && (
          <div className="absolute inset-0 z-50 flex justify-center items-start pt-10">
            <div className="w-[700px]   rounded-2xl px-6">
              <AssignEmployee onSelectEngineer={handleEngineerChange} />
            </div>
          </div>
        )}
        <main className="px-16 py-0 mt-16 max-md:px-8 max-md:py-0 max-md:mt-10 max-sm:px-5 max-sm:py-0 max-sm:mt-8">
          <section className="mb-16 max-sm:mb-10">
            <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px] max-md:w-full max-md:max-w-[800px] max-sm:h-[70px]">
              <label className="ml-12 text-3xl text-white max-md:ml-8 max-md:text-2xl max-sm:ml-5 max-sm:text-lg">
                Machine ID
              </label>
              <div className="absolute text-3xl text-white right-[87px] top-[13px] max-md:text-2xl max-md:right-[60px] max-sm:top-2.5 max-sm:right-5 max-sm:text-lg">
                12345
              </div>
            </div>
          </section>

          <section className="mb-16 max-sm:mb-10">
            <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px] max-md:w-full max-md:max-w-[800px] max-sm:h-[70px]">
              <label
                htmlFor="machineName"
                className="ml-12 text-3xl text-white max-md:ml-8 max-md:text-2xl max-sm:ml-5 max-sm:text-lg"
              >
                Machine Name
              </label>
              <input
                type="text"
                id="machineName"
                value={machineName}
                onChange={handleMachineNameChange}
                className="absolute right-12 top-2/4 bg-white rounded-xl -translate-y-2/4 h-[41px] w-[273px] max-md:right-[30px] max-md:w-[200px] max-sm:right-5 max-sm:h-[30px] max-sm:w-[120px]"
                aria-label="Enter machine name"
              />
            </div>
          </section>
          <section className="mb-16">
            <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px]">
              <label className="ml-12 text-3xl text-white">
                Assign Engineer
              </label>
              <button
                onClick={() => setShowAssignPopup(prev=>!prev)}
                className="flex absolute top-2/4 justify-center items-center bg-white rounded-xl -translate-y-2/4 h-[41px] right-[75px] w-[50px]"
                aria-label="Select engineer"
              >
                <img src={dd2} alt="dropdown" />
              </button>
              {engineerId && (
                <div className="absolute text-white text-xl right-[140px]">
                  Assigned: {engineerId}
                </div>
              )}
            </div>
          </section>

          <section className="mb-16 max-sm:mb-10">
            <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px] max-md:w-full max-md:max-w-[800px] max-sm:h-[70px]">
              <label
                htmlFor="testsiterange"
                className="ml-12 text-3xl text-white max-md:ml-8 max-md:text-2xl max-sm:ml-5 max-sm:text-lg"
              >
                Test Site Range Starts
              </label>
              <input
                type="text"
                id="testsiterange"
                value={testSiteRange}
                onChange={handleTestSiteRangeChange}
                className="absolute right-12 top-2/4 bg-white rounded-xl -translate-y-2/4 h-[41px] w-[273px] max-md:right-[30px] max-md:w-[200px] max-sm:right-5 max-sm:h-[30px] max-sm:w-[120px]"
                aria-label="Enter machine name"
              />
            </div>
          </section>
        </main>

        <footer className="flex gap-96 justify-center items-center mt-20 max-md:flex-col max-md:gap-24 max-md:mt-20 max-sm:gap-8 max-sm:px-5 max-sm:py-0 max-sm:mt-16">
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center text-3xl text-white bg-black rounded-3xl h-[84px]
           w-[516px] max-md:text-2xl max-sm:text-lg max-sm:h-[60px] max-sm:w-[250px]"
          >
            Generate Test Sites and Create Machines
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddMachine;
