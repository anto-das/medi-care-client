import { env } from "@/env";

export const categoryService = {
  getCategory: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/category");
      const data = await res.json();

      return data.data;
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch categories..", detail: error },
      };
    }
  },
};
