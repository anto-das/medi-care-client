"use server";

import { sellerService } from "@/service/seller.service";

interface options {
  cache?: RequestCache;
  revalidate?: number;
}
export const getSellerMedicines = async (options?: options) => {
  return await sellerService.getSellerMedicines(options);
};
export const getSellerOrders = async (options?: options) => {
  return await sellerService.getSellerOrders(options);
};
export const updateOrderStatus = async (id: string) => {
  return await sellerService.updateOrderStatus(id);
};
