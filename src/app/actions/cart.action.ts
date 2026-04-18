"use server";

import { env } from "@/env";
import { cartService } from "@/service/cart.service";

export const addCart = async (id: string) => {
  const create = cartService.addToCart(id);
  console.log("create :",create)
};
