import { env } from "@/env";
import { orderStatus, SellerMedicine } from "@/types";
import { cookies } from "next/headers";
import { toast } from "sonner";

interface options {
  cache?: RequestCache;
  revalidate?: number;
}

export const sellerService = {
  postMedicine: async (medicine: SellerMedicine) => {
    const allCookies = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/seller/medicine`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies.toString(),
        },
        body: JSON.stringify(medicine),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: err },
      };
    }
  },
  getSellerMedicines: async (options?: options) => {
    try {
      const allCookies = await cookies();
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config, tags: ["medicines"] };
      const res = await fetch(`${env.BACKEND_URL}/api/seller/medicine`, {
        headers: {
          Cookie: allCookies.toString(),
        },
        ...config,
      });
      const { data } = await res.json();
  
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: error },
      };
    }
  },
  getSellerOrders: async (options?: options) => {
    try {
      const allCookies = await cookies();
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config, tags: ["medicines"] };
      const res = await fetch(`${env.BACKEND_URL}/api/seller/orders`, {
        headers: {
          Cookie: allCookies.toString(),
        },
        ...config,
      });
      const { data } = await res.json();
     
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: error },
      };
    }
  },
  getSellerSingleOrders: async (options?: options) => {
    try {
      const allCookies = await cookies();
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config, tags: ["medicines"] };
      const res = await fetch(`${env.BACKEND_URL}/api/seller/orders/solo`, {
        headers: {
          Cookie: allCookies.toString(),
        },
        ...config,
      });
      const { data } = await res.json();
      
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: error },
      };
    }
  },
  updateOrderStatus: async (id: string, status: orderStatus) => {
    const allCookies = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/seller/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies.toString(),
        },

        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },

  updateMedicine: async (
    id: string,
    payload: {
      price: number;
      stock_quantity: number;
    },
  ) => {
    const allCookies = (await cookies()).toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/seller/medicine/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
     
      return { data };
    } catch (error: any) {
      toast.error("something wrong in service");
    }
  },

  getDayWiseWeeklyRevenue: async () => {
    const allCookies = await cookies();
    try {
      const res = await fetch(
        `${env.BACKEND_URL}/api/seller/revenue/day-wise`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Cookie: allCookies.toString(),
          },
        },
      );
      const data = res.json();
      return data;
    } catch (error) {
      return {
        data: null,
        error: "retrieved weekly sale report failed!",
        detail: error,
      };
    }
  },

  deleteOrder: async (id: string) => {
    const cookie = await cookies();
    const allCookies = cookie.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/seller/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
      });
      const data = res.json();
      
      return data;
    } catch (error) {
      return { data: null, error };
    }
  },

  deleteMedicine: async (id: string) => {
    const cookie = await cookies();
    const allCookies = cookie.toString();
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/seller/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
      });
      const data = res.json();
      return data;
    } catch (error) {
      return { data: null, error };
    }
  },
};
