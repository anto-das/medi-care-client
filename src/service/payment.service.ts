import { env } from "@/env";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

export const handlePaymentService = {
  createPaymentSession: async (carts: CartItem[], order_id: string) => {
    const cookie = await cookies();
    const allCookies = cookie.toString();
    try {
      const body = {
        medicines: carts,
        order_id,
      };
      const res = await fetch(`${env.BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const session = await res.json();
      return session;
    } catch (error) {
      return { data: null, error: error };
    }
  },
  getSessionData: async (session_id: string): Promise<any> => {
    if (!session_id) null;
    const cookie = await cookies();
    const allCookies = cookie.toString();
    try {
      const res = await fetch(
        `${env.BACKEND_URL}/create-checkout-session/payment?session_id=${session_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Cookie: allCookies,
          },
        },
      );
      const data = await res.json();
      // console.log(data);
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: "something went wrong", details: error };
    }
  },
};
