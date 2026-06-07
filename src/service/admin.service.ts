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
  getAllSellers: async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/admin/sellers`, {
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
        error: "Retrieved all sellers failed!",
        details: err,
      };
    }
  },
  getAllOrders: async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/order`, {
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
        error: "Retrieved all orders failed!",
        details: err,
      };
    }
  },
  getAllMedicines: async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/medicine`, {
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
        error: "Retrieved all medicines failed!",
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
  updateMedicineApprovalStatus: async (
    medicineId: string,
    newStatus: string,
  ) => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(
        `${env.BACKEND_URL}/api/admin/sellers/${medicineId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Cookie: allCookies,
          },
          body: JSON.stringify({ approval_status: newStatus }),
        },
      );
      const data = await res.json();
      return { data: data, error: null };
    } catch (error: any) {
      return { data: null, error: error };
    }
  },
  updateUserRole: async (newRole: string, email: string) => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/admin/update-role`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify({ role: newRole, email }),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error: any) {
      return { data: null, error: error };
    }
  },
};
