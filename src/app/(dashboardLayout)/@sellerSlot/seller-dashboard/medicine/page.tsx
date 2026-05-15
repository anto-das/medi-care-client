import { medicineService } from "@/service/medicine.service";

const page = async () => {
  const { data } = await medicineService.getMedicines();
  return <div>this is medicine page... : {data.length} </div>;
};

export default page;
