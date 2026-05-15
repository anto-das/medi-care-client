"use client";
import { updateCartQuantity } from "../actions/cart.action";

export const updateQuantity = async (cart_id: string, quantity: number) => {
  await updateCartQuantity(cart_id, quantity);
};
