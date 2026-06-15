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

export const getCategories = async (options?: options) => {
  return await categoryService.getCategory(options);
};

export const addCategory = async (payload: {
  category_type: string;
  category_description: string;
}) => {
  return await categoryService.addCategory(payload);
};
