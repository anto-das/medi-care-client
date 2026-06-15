import { env } from "@/env";
import { cookies } from "next/headers";

interface options {
  cache?: RequestCache;
  revalidate?: number;
}

export const categoryService = {
  addCategory: async (payload: {
    category_type: string;
    category_description: string;
  }) => {
    try {
      const cookie = await cookies();
      const allCookies = cookie.toString();
      const res = await fetch(`${env.BACKEND_URL}/api/category`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify(payload),
      });
      const { data } = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "internal server error", details: error },
      };
    }
  },
  getCategory: async (options?: options) => {
    try {
      const url = new URL(`${env.BACKEND_URL}/api/category`);
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
        error: { message: "Failed to fetch categories..", detail: error },
      };
    }
  },
};
