import { env } from "@/env";

import { cookies } from "next/headers";

interface params {
  search?: string;
  category_name?: string;
  price?: string;
}

interface options {
  cache?: RequestCache;
  revalidate?: number;
}

export const medicineService = {
  postMedicine: async (medicine: any) => {
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
  getMedicines: async (params?: params, options?: options) => {
    try {
      const url = new URL(`${env.BACKEND_URL}/api/medicine`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      // console.log("url", url);
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config, tags: ["medicines"] };
      const res = await fetch(url.toString(), config);
      const { data } = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines", details: error },
      };
    }
  },
  getMedicineById: async (id: string) => {
    const res = await fetch(`${env.BACKEND_URL}/api/medicine/${id}`);
    return await res.json();
  },
};
