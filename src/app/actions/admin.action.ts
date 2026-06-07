"use server";

import { adminService } from "@/service/admin.service";
import { UserStatus } from "@/types/status";

export const getTotalUsers = async () => {
  return await adminService.getTotalUsers();
};

export const updateUserStatus = async (status: UserStatus, id: string) => {
  return await adminService.updateUserStatus(status, id);
};

export const updateMedicineApprovalStatus = async (
  medicineId: string,
  newStatus: string,
) => {
  return await adminService.updateMedicineApprovalStatus(
    medicineId.toString(),
    newStatus,
  );
};

export const updateUserRole = async (newRole: string, email: string) => {
  return await adminService.updateUserRole(newRole, email);
};
