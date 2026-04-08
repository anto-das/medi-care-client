import { userService } from "@/service/user.service";

export const user = async () => {
  const { data } = await userService.getSession();
  return data;
};
