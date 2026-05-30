"use server";

import { adminService } from "@/service/admin.service";
import { UserStatus } from "@/types/status";

export const getTotalUsers = async () => {
  return await adminService.getTotalUsers();
};

export const updateUserStatus = async (status: UserStatus, id: string) => {
  return await adminService.updateUserStatus(status, id);
};
