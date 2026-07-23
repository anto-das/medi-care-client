"use client";
import { getCategories } from "@/app/actions/category.action";
import { getMedicine } from "@/app/actions/medicine.action";
import FilteredSection from "@/components/modules/medicine/filtered";

import MediCard from "@/components/ui/mediCard";

import { Medicine } from "@/types";
import { useEffect, useState } from "react";

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

  const filterMedicines = medicines?.filter(
    (medicine: Medicine) => medicine.approval_status === "APPROVED",
  );

  const fetchData = async () => {
    const categoryPromise = getCategories();
    const currentPayload = { ...payload };
    if (selectedCategories.length > 0) {
      currentPayload.category_name = selectedCategories;
    }
    if (searchMedi) {
      currentPayload.search = searchMedi;
    }
    const medicinePromise = getMedicine(currentPayload);
    const [catRes, medRes] = await Promise.all([
      categoryPromise,
      medicinePromise,
    ]);
    setCategories(catRes.data);
    setMedicines(medRes.data);
  };
  useEffect(() => {
    fetchData();
  }, [selectedCategories || searchMedi]);

  return (
    <div>
      <h1 className="text-3xl w-11/14 mx-auto lg:py-8  md:text-4xl lg:text-5xl font-bold">
        Browse Medicines
      </h1>
      <div className="border bg-[#faf8f4]">
        <div className="flex items-start justify-between gap-5 py-10 w-11/14 mx-auto ">
          {/* medicine search and filter sidebar */}
          <div className="border hidden md:hidden bg-white p-4 rounded-lg shadow-md lg:block w-1/5">
            <FilteredSection
              setSearchMedi={setSearchMedi}
              categories={categories}
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
          </div>
          {/* medicine list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  w-11/14 mx-auto">
            {filterMedicines?.map((medicine: Medicine) => (
              <MediCard key={medicine.medicine_id} medicine={medicine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;
