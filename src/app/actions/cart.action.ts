"use server";

import { env } from "@/env";
import { cartService } from "@/service/cart.service";
import { userService } from "@/service/user.service";

export const addCart = async ({
  id,
  guest_id,
}: {
  id: string;
  guest_id?: string;
}) => {
  const { data } = await userService.getSession();
  const user_id = data?.user.id;
  const create = cartService.addToCart({ id, guest_id, user_id });
  return create;
};
