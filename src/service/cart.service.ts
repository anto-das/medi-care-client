import { env } from "process";

export const cartService = {
  addToCart: async (payload: {
    id: string;
    guest_id?: string;
    user_id?: string;
  }) => {
    try {
      const result = fetch(`${env.BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      return (await result).json();
    } catch (error) {
      console.log(error);
    }
  },
};
