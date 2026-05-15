import AddMedicineForm from "@/components/modules/dashboard/seller/addMedicineForm";
import { categoryService } from "@/service/category.service";

const page = async () => {
  return (
    <div>
      <AddMedicineForm />
    </div>
  );
};

export default page;
