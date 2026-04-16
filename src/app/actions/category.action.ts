"use server";

import { categoryService } from "@/service/category.service";

interface params {
  search?: string;
  category_name?: string;
  price: string;
}

interface options {
  cache?: RequestCache;
  revalidate?: number;
}

export const getCategories = async (param?: params, options?: options) => {
  return await categoryService.getCategory(param, options);
};
