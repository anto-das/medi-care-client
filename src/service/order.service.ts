import { env } from "@/env";

interface orderedItems {
  medicine_id: string;
  quantity: number;
  price: number;
}
[];

export const orderService = {
  createOrder: async (subtotal: number, orderedItems: any) => {
    try {
      const result = fetch(`${env.BACKEND_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          total_bill: subtotal,
          ordereItems: orderedItems,
        }),
      });
      return { result, error: null };
    } catch (error) {
        console.log(error)
      return { data: null };
    }
  },
};
