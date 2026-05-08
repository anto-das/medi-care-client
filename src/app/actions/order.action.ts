"use server";

import { orderService } from "@/service/order.service";

export const getFirstOrder = async (email: string) => {
  const order = await orderService.getFirstOrder(email);

  return order;
};
