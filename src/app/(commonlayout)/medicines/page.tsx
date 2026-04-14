// "use client";
// import { getMedicines } from "@/app/actions/medicine.action";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Field, FieldGroup } from "@/components/ui/field";
// import MediCard from "@/components/ui/mediCard";
// import { medicineService } from "@/service/medicine.service";
// import { Medicine } from "@/types";
// import React, { useEffect, useState } from "react";

// const MedicinePage = () => {
//   const [data, setData] = useState([]);
//   const [category, setCategory] = useState<string>("");
//   console.log("category: ", category);
//   useEffect(() => {
//     (async () => {
//       const { data } = await getMedicines();
//       setData(data);
//     })();
//   }, []);
//   // console.log("Medicines:", data); // Log the entire response data to the console
//   // console.log("Medicines:", data.data); // Log the medicines data to the console
//   return (
//     <div>
//       <h1 className="text-3xl w-11/14 mx-auto lg:py-8  md:text-4xl lg:text-5xl font-bold">
//         Browse Medicines
//       </h1>
//       <div className="border bg-[#faf8f4]">
//         <div className="flex items-start justify-between gap-5 py-10 w-11/14 mx-auto ">
//           {/* medicine search and filter sidebar */}
//           <div className="border hidden md:hidden bg-white p-4 rounded-lg shadow-md lg:block w-1/5">
//             {/* categories div */}
//             <div className="space-y-4">
//               <h1 className="text-lg font-bold">Categories</h1>
//               <FieldGroup>
//                 <Field orientation="horizontal">
//                   <Checkbox
//                     id="category-1"
//                     name="pain killer"
//                     onClick={() => setCategory("painkiller")}
//                     className="data-[state=checked]:bg-[#0b5e4e] data-[state=checked]:border-[#0b5e4e] data-[state=checked]:text-white"
//                   />
//                   <label htmlFor="category-1" className="text-md text-gray-500">
//                     Pain Killer
//                   </label>
//                 </Field>
//                 <Field orientation="horizontal">
//                   <Checkbox
//                     id="antibiotics"
//                     name="pain killer"
//                     onClick={() => setCategory("antibiotics")}
//                     className="data-[state=checked]:bg-[#0b5e4e] data-[state=checked]:border-[#0b5e4e] data-[state=checked]:text-white"
//                   />
//                   <label
//                     htmlFor="antibiotics"
//                     className="text-md text-gray-500"
//                   >
//                     Antibiotics
//                   </label>
//                 </Field>
//               </FieldGroup>
//             </div>
//           </div>
//           {/* medicine list */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  w-11/14 mx-auto">
//             {data?.map((medicine: Medicine) => (
//               <MediCard key={medicine.medicine_id} medicine={medicine} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicinePage;

"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  { id: "tablet", label: "Tablet" },
  { id: "syrup", label: "Syrup" },
  { id: "capsule", label: "Capsule" },
];

function MedicineFilter() {
  // সিলেক্টেড ক্যাটাগরিগুলো এই অ্যারেতে থাকবে
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      // যদি চেক করা হয়, তবে অ্যারেতে অ্যাড হবে
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      // আনচেক করলে অ্যারে থেকে রিমুভ হবে
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  console.log("Selected Filters:", selectedCategories);

  return (
    <div className="space-y-4 p-4 border rounded-lg w-64">
      <h3 className="font-bold">Filter by Category</h3>
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={category.id}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(category.id, checked)
            }
          />
          <label
            htmlFor={category.id}
            className="text-sm font-medium cursor-pointer"
          >
            {category.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MedicineFilter;
