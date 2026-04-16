import { getMedicines } from "@/app/actions/medicine.action";
import MediCard from "@/components/ui/mediCard";

import { Medicine } from "@/types";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Medicines = async () => {
  const { data } = await getMedicines();

  return (
    <div className="py-8 bg-[#faf8f4] my-10 border">
      <div className="w-11/18  mx-auto my-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl  font-bold">
          Popular Medicines
        </h1>
        <p className="text-lg text-[#8da197] mt-2">
          Most ordered by customers this week
        </p>
      </div>
      <div className="flex justify-end w-11/18 mx-auto">
        <Link href={'/medicine'} className="flex items-center text-[#838a85] border-[#dde8e2] rounded bg-[#faf8f4] gap-2 p-2 border">
          view all <FaArrowRight />{" "}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 w-11/18 mx-auto">
        {data.map((medicine: Medicine) => (
          <MediCard key={medicine.medicine_id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default Medicines;
