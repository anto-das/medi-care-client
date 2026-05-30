"use server";

import { sellerService } from "@/service/seller.service";
import { orderStatus } from "@/types";

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
export const updateOrderStatus = async (id: string, status: orderStatus) => {
  return await sellerService.updateOrderStatus(id, status);
};
export const getDayWiseWeeklyRevenue = async () => {
  return await sellerService.getDayWiseWeeklyRevenue();
};
export const deleteOrder = async (id: string) => {
  return await sellerService.deleteOrder(id);
};

export const updateMedicine = async (
  id: string,
  payload: {
    price: number;
    stock_quantity: number;
  },
) => {
  return await sellerService.updateMedicine(id, payload);
};

export const deleteMedicine = async (id: string) => {
  return await sellerService.deleteMedicine(id);
};
