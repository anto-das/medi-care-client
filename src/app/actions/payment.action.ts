"use server";

import { handlePaymentService } from "@/service/payment.service";
import { CartItem } from "@/types";

export const handlePayment = async (carts: CartItem[], order_id: string) => {
  return await handlePaymentService.createPaymentSession(carts,order_id);
};

export const getSessionData = async (session_id: string) => {
  return await handlePaymentService.getSessionData(session_id);
};
