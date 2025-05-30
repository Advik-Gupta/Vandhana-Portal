import React, { useState } from "react";
import arrow from "../../../assets/arrow.svg";
import dd2 from "../../../assets/dd2.png"; // Assuming you have an arrow SVG for the next button

const AddMachine = () => {
  const [machineName, setMachineName] = useState("");
  // const [engineer, setEngineer] = useState("");
  const handleMachineNameChange = (e) => {
    setMachineName(e.target.value);
  };
  return (
    <div className="relative mx-auto my-0 w-full bg-white h-[1024px] max-w-[1440px] max-md:h-auto max-md:min-h-screen max-md:max-w-[991px] max-sm:max-w-screen-sm font-['Montserrat']">
      <header className="flex justify-between items-center px-11 pt-7 pb-0 max-md:px-8 max-md:pt-5 max-md:pb-0 max-sm:px-5 max-sm:pt-4 max-sm:pb-0">
        <h1 className="text-5xl font-bold text-black max-md:text-4xl max-sm:text-3xl">
          Add machine
        </h1>
      </header>

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

        <section className="mb-16 max-sm:mb-10">
          <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px] max-md:w-full max-md:max-w-[800px] max-sm:h-[70px]">
            <label className="ml-12 text-3xl text-white max-md:ml-8 max-md:text-2xl max-sm:ml-5 max-sm:text-lg">
              Assign Engineer
            </label>
            <button
              className="flex absolute top-2/4 justify-center items-center bg-white rounded-xl -translate-y-2/4 h-[41px] right-[75px] w-[50px] max-md:right-[50px] max-sm:right-5 max-sm:h-[30px] max-sm:w-[35px]"
              aria-label="Select engineer"
            >
              <img src={dd2} alt="" />
            </button>
          </div>
        </section>

        <section className="mb-16 max-sm:mb-10">
          <div className="flex relative items-center bg-black rounded-3xl h-[84px] w-[1292px] max-md:w-full max-md:max-w-[800px] max-sm:h-[70px]">
            <label className="ml-12 text-3xl text-white max-md:ml-8 max-md:text-2xl max-sm:ml-5 max-sm:text-lg">
              Enter Details
            </label>
            <button
              className="flex absolute top-2/4 justify-center items-center bg-white rounded-xl -translate-y-2/4 h-[41px] right-[75px] w-[50px] max-md:right-[50px] max-sm:right-5 max-sm:h-[30px] max-sm:w-[35px]"
              aria-label="Enter details"
            >
              <img src={dd2} alt="" />
            </button>
          </div>
        </section>
      </main>

      <footer className="flex gap-96 justify-center items-center mt-40 max-md:flex-col max-md:gap-24 max-md:mt-20 max-sm:gap-8 max-sm:px-5 max-sm:py-0 max-sm:mt-16">
        <button className="flex justify-center items-center text-3xl text-white bg-black rounded-3xl h-[84px] w-[316px] max-md:text-2xl max-sm:text-lg max-sm:h-[60px] max-sm:w-[250px]">
          Generate Test Sites
        </button>
        <button
          className="shrink-0 h-[84px] w-[84px] max-sm:h-[60px] max-sm:w-[60px]"
          aria-label="Next"
        >
          <img src={arrow} alt="" />
        </button>
      </footer>
    </div>
  );
};

export default AddMachine;
