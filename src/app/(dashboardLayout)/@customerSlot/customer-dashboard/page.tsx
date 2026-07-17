import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { ApprovalStatus, Medicine } from "@/types";

const DashboardMedicinePage = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await medicineService.getMedicines(undefined, {
    revalidate: 10,
  });
  const filteredMedicines = data?.filter(
    (medicine: Medicine) => medicine.approval_status === "APPROVED",
  );

  return (
    <div className="bg-[#f7faf9] p-5 min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  w-11/14 mx-auto">
        {filteredMedicines?.map((medicine: Medicine) => (
          <MediCard key={medicine.medicine_id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default DashboardMedicinePage;
