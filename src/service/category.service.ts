import { env } from "@/env";


interface options {
  cache?: RequestCache;
  revalidate?: number;
}

export const categoryService = {
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
