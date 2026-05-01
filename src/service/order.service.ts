import { env } from "@/env";
import { cookies } from "next/headers";

interface orderedItems {
  medicine_id: string;
  quantity: number;
  price: number;
}
[];

export const orderService = {
  createOrder: async (subtotal: number, orderedItems: any) => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const result = await fetch(`${env.BACKEND_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify({
          total_bill: subtotal,
          orderItems: orderedItems,
        }),
      });
      return await result.json();
    } catch (error) {
      console.log(error);
      return { data: null };
    }
  },
};
