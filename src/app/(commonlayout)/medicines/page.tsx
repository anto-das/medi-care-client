import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";
import React from "react";

const MedicinePage = async () => {
  const { data } = await medicineService.getMedicines();
  // console.log("Medicines:", data); // Log the entire response data to the console
  // console.log("Medicines:", data.data); // Log the medicines data to the console
  return (
    <div className="w-11/13 mx-auto">
      <h1 className="text-3xl py-4  md:text-4xl lg:text-5xl font-bold">
        Browse Medicines
      </h1>
      <div className="flex items-start justify-between">
        {/* medicine search and filter sidebar */}
        <div className="border border-red-500 hidden lg:block">
          <h1>Search and Filter</h1>
        </div>
        {/* medicine list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 w-11/14 mx-auto border">
          {data.map((medicine: Medicine) => (
            <MediCard key={medicine.medicine_id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;
