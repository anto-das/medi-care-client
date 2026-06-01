"use client";
import { getCategories } from "@/app/actions/category.action";
import { getMedicine } from "@/app/actions/medicine.action";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import MediCard from "@/components/ui/mediCard";
import { authClient } from "@/lib/auth-client";

import { Medicine } from "@/types";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Categories {
  category_id: string;
  category_type: string;
}

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [searchMedi, setSearchMedi] = useState<string>("");
  const payload = {
    search: "",
    category_name: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryPromise = getCategories();
      const currentPayload = { ...payload };
      if (selectedCategories.length > 0) {
        currentPayload.category_name = selectedCategories;
      }
      if (searchMedi) {
        currentPayload.search = searchMedi;
      }
      const medicinePromise = getMedicine(currentPayload, {
        revalidate: 10,
      });
      const [catRes, medRes] = await Promise.all([
        categoryPromise,
        medicinePromise,
      ]);
      setCategories(catRes.data);
      setMedicines(medRes.data);
    };

    fetchData();
  }, [selectedCategories || searchMedi]);

  const handleCategories = (categoryType: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(categoryType);
    } else {
      setSelectedCategories("");
    }
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchMedi(value);
  }, 400);
  // console.log("categoires:  ",categories)
  return (
    <div>
      <h1 className="text-3xl w-11/14 mx-auto lg:py-8  md:text-4xl lg:text-5xl font-bold">
        Browse Medicines
      </h1>
      <div className="border bg-[#faf8f4]">
        <div className="flex items-start justify-between gap-5 py-10 w-11/14 mx-auto ">
          {/* medicine search and filter sidebar */}
          <div className="border hidden md:hidden bg-white p-4 rounded-lg shadow-md lg:block w-1/5">
            {/* categories div */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">Categories</h1>
              <FieldGroup>
                <Input
                  placeholder="🔍Search medicines,brands and more..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className=" rounded-md bg-[#f8fdfb] border focus:shadow-none focus:text-lg w-full placeholder:text-lg p-5"
                />
                {categories?.map((category: any, index: any) => (
                  <Field orientation="horizontal" key={index}>
                    <Checkbox
                      id={category.category_type}
                      name={category.category_type}
                      checked={selectedCategories === category.category_type}
                      onCheckedChange={(checked: boolean) =>
                        handleCategories(category.category_type, checked)
                      }
                      className="data-[state=checked]:bg-[#0b5e4e] data-[state=checked]:border-[#0b5e4e] data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor={category.category_type}
                      className="text-md text-gray-500 uppercase"
                    >
                      {category.category_type}
                    </label>
                  </Field>
                ))}
              </FieldGroup>
            </div>
          </div>
          {/* medicine list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  w-11/14 mx-auto">
            {medicines?.map((medicine: Medicine) => (
              <MediCard key={medicine.medicine_id} medicine={medicine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;

// "use client";

// import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";

//

// function MedicineFilter() {
//   // সিলেক্টেড ক্যাটাগরিগুলো এই অ্যারেতে থাকবে
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   const handleCheckboxChange = (categoryId: string, checked: boolean) => {
//     if (checked) {
//       // যদি চেক করা হয়, তবে অ্যারেতে অ্যাড হবে
//       setSelectedCategories((prev) => [...prev, categoryId]);
//     } else {
//       // আনচেক করলে অ্যারে থেকে রিমুভ হবে
//       setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
//     }
//   };

//   console.log("Selected Filters:", selectedCategories);

//   return (
//     <div className="space-y-4 p-4 border rounded-lg w-64">
//       <h3 className="font-bold">Filter by Category</h3>
//       {categories.map((category) => (
//         <div key={category.id} className="flex items-center space-x-2">
//           <Checkbox
//             id={category.id}
//             checked={selectedCategories.includes(category.id)}
//             onCheckedChange={(checked: boolean) =>
//               handleCheckboxChange(category.id, checked)
//             }
//           />
//           <label
//             htmlFor={category.id}
//             className="text-sm font-medium cursor-pointer"
//           >
//             {category.label}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MedicineFilter;
