"use server";

import { cartService } from "@/service/cart.service";
import { userService } from "@/service/user.service";

export const addCart = async ({
  id,
  guest_id,
  quantity,
}: {
  id: string;
  guest_id?: string;
  quantity: number;
}) => {
  const { data } = await userService.getSession();
  const user_id = data?.user.id;
  console.log({ user_id, id, guest_id });
  const create = cartService.addToCart({ id, guest_id, user_id,quantity });
  return create;
};

export const getCart = async (payload: {
  user_id?: string;
  guest_id: string;
}) => {
  const data = cartService.getCartItems(payload);
  return data;
};

export const updateCartQuantity = async (cart_id: string, quantity: number) => {
  try {
    const res = await cartService.updateCartQuantity(cart_id, quantity);
    return res;
  } catch (error) {
    console.error("Failed to update quantity:", error);
  }
};

export const deleteAll = async (payload: {
  guest_id: string;
  user_id?: string;
}) => {
  const res = await cartService.deleteAll(payload);
  return res;
};

export const deleteCartItem = async (id: string) => {
  const res = await cartService.deleteCartItem(id);
  return res;
};
