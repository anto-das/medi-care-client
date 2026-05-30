import { env } from "@/env";
import { UserStatus } from "@/types";
import { cookies } from "next/headers";

export const adminService = {
  getTotalUsers: async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        data: null,
        error: "Retrieved total users failed!",
        details: err,
      };
    }
  },
  updateUserStatus: async (status: UserStatus, id: string) => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify({ status: status }),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error: any) {
      return { data: null, error: error };
    }
  },
};
