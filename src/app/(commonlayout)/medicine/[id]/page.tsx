import MedicineDetailsClient from "@/components/ui/medicineDetail";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

export async function generateStaticParams() {
  try {
    const response = await medicineService.getMedicines();

    // ডাটা ডিফেন্সিভ চেক (যদি ডাটা না থাকে বা খালি অ্যারে হয়)
    if (!response || !response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data
      .map((medicine: Medicine) => ({ id: String(medicine.medicine_id) })) // ID অবশ্যই string হতে হবে
      .slice(0, 3);
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // এরর খেলেও খালি অ্যারে রিটার্ন করবে, বিল্ড আটকাবে না
  }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const { data } = await medicineService.getMedicineById(id);

    if (!data) {
      return (
        <main className="max-w-7xl mx-auto p-4 md:p-8 text-center">
          Medicine Not Found
        </main>
      );
    }

    return (
      <main className="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen">
        <MedicineDetailsClient medicine={data} />
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-7xl mx-auto p-4 md:p-8 text-center">
        Error loading medicine details
      </main>
    );
  }
};

export default page;
