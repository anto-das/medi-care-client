import { ArrowRightIcon } from "lucide-react";
import React from "react";

const Prescription = () => {
  return (
    <div className="bg-gradient-to-r from-[#1a4731] to-[#0f4b3c] w-11/12 mx-auto p-8 rounded-2xl flex flex-col lg:flex-row justify-between md:justify-center items-center gap-10 py-20">
      <div className="flex flex-col lg:flex-row md:flex-row items-center gap-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl">📋</h1>
        <div className="lg:w-5xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold ">
            Have a prescription?
          </h1>
          <p className="text-[#95aaa0] font-light">
            Upload your doctor's prescription and get medicines delivered within
            2 hours in major cities.
          </p>
        </div>
      </div>
      <button className="flex items-center justify-center bg-white rounded-xl w-full lg:w-1/8 md:w-full p-4 text-lg text-[#1a4731]">
        Upload Prescription <ArrowRightIcon />{" "}
      </button>
    </div>
  );
};

export default Prescription;
