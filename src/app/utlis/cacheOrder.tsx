"use server";
import { orderService } from "@/service/order.service";
import { cache } from "react";

export const getOrders = cache(async (allCookies: string) => {
  const { data } = await orderService.getOrders();
  return data.data;
});
