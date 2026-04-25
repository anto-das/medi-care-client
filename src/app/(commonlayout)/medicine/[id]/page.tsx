import MedicineDetailsClient from "@/components/ui/medicineDetail";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

// export const dynamicParams = true; // true | false
export async function generateStaticParams() {
  const { data } = await medicineService.getMedicines();
  return data
    .map((medicine: Medicine) => ({ id: medicine.medicine_id }))
    .slice(0, 3);
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await medicineService.getMedicineById(id);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      <MedicineDetailsClient medicine={data} />
    </main>
  );
};

export default page;
