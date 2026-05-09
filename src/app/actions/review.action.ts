"use server";

import { reviewService } from "@/service/review.service";

export const postReview = async (payload: {
  customer_email: string;
  customer_name: string;
  order_id: string;
  user_location: string;
  rating: number;
  comment: string;
}) => {
  const result = await reviewService.postReview(payload);
  return result;
};
