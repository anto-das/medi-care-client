"use server";

import { env } from "@/env";
import { cartService } from "@/service/cart.service";

export const addCart = async ({
  id,
  guest_id,
}: {
  id: string;
  guest_id?: string;
}) => {
  const create = cartService.addToCart({ id, guest_id });
  return create;
};
