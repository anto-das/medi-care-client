"use server";
import { orderService } from "@/service/order.service";

export const handleConfirmOrder = async ({
  subtotal,
  orderedItems,
}: {
  subtotal: number;
  orderedItems: any;
}) => {
  const result = await orderService.createOrder(subtotal, orderedItems);
  console.log(result);
};
