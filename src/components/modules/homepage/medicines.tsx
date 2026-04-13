import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

const Medicines = async () => {
  const { data } = await medicineService.getMedicines();
  return (
    <div className="py-8 bg-[#faf8f4] my-10 border">
      <h1 className="text-3xl w-11/14 mx-auto font-bold">
        Medicines: {data.length}{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 w-11/14 mx-auto">
        {data.map((medicine: Medicine) => (
          <MediCard key={medicine.medicine_id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default Medicines;
