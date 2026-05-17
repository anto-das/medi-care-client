import { env } from "@/env";
import { cookies } from "next/headers";

export interface SellerMedicine {
  medi_img: string;
  medicine_name: string;
  generic_name: string;
  strength: string;
  unit_type: string;
  stock_quantity: number;
  price: number;
  categoryId: string;
  manufacturer: string;
  description: string;
}

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
      // console.log(data)
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
      // console.log(data)
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: error },
      };
    }
  },
};
