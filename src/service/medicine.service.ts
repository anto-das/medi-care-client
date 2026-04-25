import { env } from "@/env";

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
