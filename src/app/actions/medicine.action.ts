"use server";

import { medicineService } from "@/service/medicine.service";
interface Params {
  search?: string;
  category_name?: string;
  price?: string;
}

interface Options {
  cache?: RequestCache;
  revalidate?: number;
}
export const getMedicine = async (payload?: Params, options?: Options) => {
  return await medicineService.getMedicines(payload, options);
};
