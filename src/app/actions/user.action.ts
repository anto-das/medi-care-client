"use server";

import { userService } from "@/service/user.service";

export const getUserInfo = async () => {
  return await userService.getSession();
};
