"use server";
import { orderService } from "@/service/order.service";
// import { toast } from "sonner";

export const createOrder = async ({
  subtotal,
  orderedItems,
}: {
  subtotal: number;
  orderedItems: any;
}) => {
  try {
    const result = await orderService.createOrder(subtotal, orderedItems);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
