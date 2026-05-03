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

  getOrders: async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    try {
      const result = fetch(`${env.BACKEND_URL}/api/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
      });
      const data = await (await result).json();
      // console.log("service order response: ",await data)
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error };
    }
  },
};
