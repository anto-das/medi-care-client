"use server";

import { medicineService } from "@/service/medicine.service";
import { sellerService } from "@/service/seller.service";
import { SellerMedicine } from "@/types";
import { updateTag } from "next/cache";
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

export const postMedicine = async (medicine: SellerMedicine) => {
  const result = await sellerService.postMedicine(medicine);
  updateTag("medicines");
  return result;
};
