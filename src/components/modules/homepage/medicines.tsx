import { getMedicines } from "@/app/actions/medicine.action";
import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

const Medicines = async () => {
  const { data } = await getMedicines();

  return (
    <div className="py-8 bg-[#faf8f4] my-10 border">
      <div className="w-11/12  mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl  font-bold">
          Popular Medicines medicines: {data.length}{" "}
        </h1>
        <p className="text-lg text-[#8da197] mt-2">
          Most ordered by customers this week
        </p>
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
