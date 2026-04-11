"use server";

import { medicineService } from "@/service/medicine.service";

export const getMedicines = async () => {
  return await medicineService.getMedicines();
};
