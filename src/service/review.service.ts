import { env } from "@/env";
import { cookies } from "next/headers";

export const reviewService = {
  postReview: async (payload: {
    customer_email: string;
    customer_name: string;
    order_id: string;
    user_location: string;
    rating: number;
    comment: string;
  }) => {
    // console.log(payload)
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const result = await fetch(`${env.BACKEND_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify(payload),
      });
      return await result.json();
    } catch (err: any) {
      console.log(err);
      return { data: null, error: "your review don't added", details: err };
    }
  },
};
